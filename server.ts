import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { KPI_MASTER_DATA, KPIRecord } from "./src/data/kpiMasterData";
import { KPI_EMBEDDING_CATALOG, cosineSimilarity, getKpiEmbeddingText } from "./src/data/kpiEmbeddings";
import { runFullLibraryDiagnostics, diagnoseKPIFormula, DiagnosticLanguage } from "./src/utils/kpiFormulaDiagnostic";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Gemini Client
let genAI: GoogleGenAI | null = null;
const apiKey = process.env.GEMINI_API_KEY || "";

if (apiKey) {
  genAI = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// In-memory cache for KPI embeddings
const kpiVectorCache = new Map<string, number[]>();

// Pre-computed fallback vector signatures for 157 KPIs using normalized lexical & categorical hashing
function computeDeterministicVector(text: string, dim: number = 768): number[] {
  const vec = new Array(dim).fill(0);
  const words = text.toLowerCase().replace(/[^\w\s]/g, " ").split(/\s+/).filter(Boolean);
  
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    let hash = 0;
    for (let c = 0; c < word.length; c++) {
      hash = (hash << 5) - hash + word.charCodeAt(c);
      hash |= 0;
    }
    const idx = Math.abs(hash) % dim;
    const sign = (hash & 1) === 0 ? 1 : -1;
    vec[idx] += sign * (1 + (word.length / 5));
    // Cross-dimension blending
    const secondaryIdx = Math.abs(hash * 31) % dim;
    vec[secondaryIdx] += sign * 0.5;
  }
  
  // Normalize vector
  let norm = 0;
  for (let i = 0; i < dim; i++) {
    norm += vec[i] * vec[i];
  }
  if (norm > 0) {
    const sqrtNorm = Math.sqrt(norm);
    for (let i = 0; i < dim; i++) {
      vec[i] /= sqrtNorm;
    }
  }
  return vec;
}

// Ensure all 157 KPIs have baseline vector representation
for (const item of KPI_EMBEDDING_CATALOG) {
  if (!kpiVectorCache.has(item.kpiId)) {
    kpiVectorCache.set(item.kpiId, computeDeterministicVector(item.vectorSummary));
  }
}

// Health Check API
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    geminiConfigured: Boolean(apiKey),
    kpiCatalogCount: KPI_MASTER_DATA.length,
    vectorStoreCount: kpiVectorCache.size,
  });
});

// Semantic Search Endpoint using Gemini Embeddings
app.post("/api/gemini/semantic-search", async (req: Request, res: Response) => {
  const startTime = Date.now();
  try {
    const { query, topK = 157 } = req.body;

    if (!query || typeof query !== "string" || !query.trim()) {
      return res.json({
        success: true,
        mode: "master-catalog",
        query: "",
        latencyMs: 0,
        results: KPI_MASTER_DATA.map((kpi) => ({
          kpiId: kpi.id,
          score: 100,
          matchConfidence: "Very High",
          matchedTokens: [],
          semanticReason: "Master catalog default view",
        })),
      });
    }

    const trimmedQuery = query.trim();
    let queryEmbedding: number[] | null = null;
    let engineMode = "local-vector-engine";
    let modelName = "deterministic-vector-projection";

    // Attempt to generate real-time vector embedding using Gemini
    if (genAI && apiKey) {
      try {
        const embedResponse = await genAI.models.embedContent({
          model: "gemini-embedding-2-preview",
          contents: trimmedQuery,
        });

        const responseAny = embedResponse as any;
        const values = responseAny?.embedding?.values || responseAny?.embeddings?.[0]?.values;
        if (Array.isArray(values) && values.length > 0) {
          queryEmbedding = values;
          engineMode = "gemini-embedding-2-preview";
          modelName = "gemini-embedding-2-preview";
        }
      } catch (err: any) {
        console.warn("Gemini embedding API call fallback to vector projection:", err?.message);
      }
    }

    // Fallback to high-dimensional deterministic vector if Gemini is unavailable
    if (!queryEmbedding) {
      queryEmbedding = computeDeterministicVector(trimmedQuery);
    }

    // Perform vector cosine similarity search across all 157 KPIs
    const scoredList: Array<{
      kpi: KPIRecord;
      score: number;
      rawSimilarity: number;
      matchConfidence: string;
      matchedTokens: string[];
      semanticReason: string;
    }> = [];

    const queryTerms = trimmedQuery.toLowerCase().split(/\s+/).filter((w: string) => w.length > 1);

    for (const kpi of KPI_MASTER_DATA) {
      const kpiVec = kpiVectorCache.get(kpi.id) || computeDeterministicVector(getKpiEmbeddingText(kpi));
      const sim = cosineSimilarity(queryEmbedding, kpiVec);

      // Hybrid boost for exact term hits in title, purpose or object
      let lexicalBoost = 0;
      const matchedTokens: string[] = [];
      const kpiText = `${kpi.id} ${kpi.metric} ${kpi.function} ${kpi.object} ${kpi.analysisPurpose} ${kpi.dataSources}`.toLowerCase();

      for (const term of queryTerms) {
        if (kpiText.includes(term)) {
          matchedTokens.push(term);
          if (kpi.metric.toLowerCase().includes(term)) lexicalBoost += 0.15;
          else if (kpi.id.toLowerCase().includes(term)) lexicalBoost += 0.25;
          else lexicalBoost += 0.08;
        }
      }

      const combinedScore = Math.min(1.0, sim * 0.75 + Math.min(0.35, lexicalBoost));
      const normalizedScore = Math.min(100, Math.max(12, Math.round(combinedScore * 100)));

      let matchConfidence = "Related";
      if (normalizedScore >= 80) matchConfidence = "Very High";
      else if (normalizedScore >= 60) matchConfidence = "High";
      else if (normalizedScore >= 40) matchConfidence = "Moderate";

      const semanticReason =
        matchedTokens.length > 0
          ? `Intent alignment on '${matchedTokens.slice(0, 3).join(", ")}' (${kpi.function} → ${kpi.object})`
          : `High vector proximity to ${kpi.analysisPurpose.slice(0, 60)}...`;

      scoredList.push({
        kpi,
        score: normalizedScore,
        rawSimilarity: Math.round(sim * 1000) / 1000,
        matchConfidence,
        matchedTokens,
        semanticReason,
      });
    }

    // Sort descending by relevance score
    scoredList.sort((a, b) => b.score - a.score);

    const latencyMs = Date.now() - startTime;

    return res.json({
      success: true,
      mode: engineMode,
      geminiModel: modelName,
      query: trimmedQuery,
      latencyMs,
      totalMatches: scoredList.length,
      results: scoredList.slice(0, topK),
    });
  } catch (error: any) {
    console.error("Semantic search error:", error);
    return res.status(500).json({
      success: false,
      error: error?.message || "Semantic search failed",
    });
  }
});

// Run Formula Diagnostics API
app.get("/api/diagnostics/run", (_req: Request, res: Response) => {
  try {
    const summary = runFullLibraryDiagnostics();
    res.json({
      success: true,
      summary,
    });
  } catch (error: any) {
    console.error("Diagnostics error:", error);
    res.status(500).json({
      success: false,
      error: error?.message || "Diagnostic run failed",
    });
  }
});

// Run single KPI diagnostic API
app.post("/api/diagnostics/kpi", (req: Request, res: Response) => {
  try {
    const { kpiId, language } = req.body;
    const kpi = KPI_MASTER_DATA.find((k) => k.id === kpiId);
    if (!kpi) {
      return res.status(404).json({ success: false, error: `KPI '${kpiId}' not found` });
    }

    const diagResult = diagnoseKPIFormula(kpi, (language || "SOQL") as DiagnosticLanguage);
    res.json({
      success: true,
      result: diagResult,
    });
  } catch (error: any) {
    console.error("Single KPI diagnostic error:", error);
    res.status(500).json({
      success: false,
      error: error?.message || "Diagnostic execution failed",
    });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
