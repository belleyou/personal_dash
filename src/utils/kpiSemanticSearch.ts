import { KPIRecord } from "../data/kpiMasterData";

// Expanded RevOps, GTM, Finance, Product, and Sales domain ontology
const DOMAIN_SYNONYMS: Record<string, string[]> = {
  // Velocity, Speed & Latency
  velocity: ["speed", "cycle length", "cycle time", "duration", "time to close", "latency", "turnaround", "acceleration", "days to win"],
  speed: ["velocity", "cycle length", "first touch", "response time", "sla", "latency", "ramp time", "acceleration", "turnaround"],
  latency: ["response time", "first touch", "delay", "lag", "sla", "turnaround time", "queue time", "lead response"],
  time: ["cycle", "duration", "length", "days", "hours", "sla", "age", "aging", "ramp"],
  cycle: ["sales cycle", "deal duration", "close time", "velocity", "length", "stages", "pipeline velocity"],

  // Churn, Retention & Customer Health
  churn: ["retention", "renewal", "attrition", "lost", "cancellation", "cancellations", "downgrade", "drop-off", "logo churn", "revenue churn", "grr", "nrr", "unhappy"],
  retention: ["churn", "renewal", "nrr", "grr", "net retention", "gross retention", "renewal rate", "expansion", "stickiness"],
  renewal: ["retention", "contract end", "churn", "renewal rate", "grr", "nrr", "renewal forecast", "expansion"],
  attrition: ["churn", "customer loss", "account loss", "logo loss", "cancellation"],

  // Slippage, Hygiene, Leaks & Data Quality
  slippage: ["push rate", "close date change", "delayed deals", "forecast miss", "stale pipeline", "pipeline leak", "push", "date slippage"],
  leak: ["slippage", "drop-off", "leakage", "funnel loss", "disqualification", "stale", "revenue leak", "lost opportunity"],
  hygiene: ["data quality", "duplicate", "freshness", "stale", "cleanliness", "missing fields", "orphan leads", "lead matching", "crm hygiene"],
  duplicate: ["deduplication", "dedupe", "same email", "same phone", "matching records", "lead collision", "contact match", "data cleaning", "redundant"],
  stale: ["inactive", "dormant", "untouched", "no activity", "aging", "decay", "cold leads", "neglected deals"],

  // Productivity, Performance & Quotas
  productivity: ["quota attainment", "activities per rep", "rep efficiency", "calls per day", "pipeline created", "win rate by rep", "ramp time", "sales capacity"],
  performance: ["attainment", "quota", "achievement", "win rate", "conversion rate", "efficiency", "scorecard", "rep rank"],
  quota: ["attainment", "target", "goal", "sales capacity", "achievement", "plan", "quota coverage"],
  ramp: ["onboarding", "time to productivity", "new hire ramp", "first deal", "enablement", "ramp time"],
  capacity: ["headcount", "quota coverage", "rep capacity", "sales planning", "territory coverage", "rep bandwidth"],

  // Unit Economics, ROI & Financial Efficiency
  cac: ["customer acquisition cost", "cost per lead", "payback period", "marketing efficiency", "magic number", "spend efficiency", "cpl", "cpc"],
  payback: ["cac payback", "months to recover", "unit economics", "cash recovery", "break-even", "ltv cac ratio"],
  roi: ["return on investment", "spend efficiency", "pipeline to spend", "pipeline per dollar", "marketing roi", "ad spend efficiency"],
  ltv: ["customer lifetime value", "lifetime value", "clv", "acv", "arr per customer", "customer value"],
  margin: ["gross margin", "contribution margin", "partner margin", "profitability", "discounting", "net margin"],
  discount: ["discount rate", "discount percentage", "price realization", "margin erosion", "deal discount", "average discount"],

  // Expansion, Upsell & Growth
  expansion: ["upsell", "cross-sell", "nrr", "expansion arr", "expansion mrr", "account growth", "seat expansion", "tier upgrade"],
  upsell: ["expansion", "cross-sell", "add-on", "upgrade", "growth", "expansion revenue"],
  cross_sell: ["cross sell", "multi product", "product expansion", "add-on product", "bundle"],

  // Forecast & Predictability
  forecast: ["predictability", "commit", "best case", "pipeline coverage", "forecast accuracy", "close date", "weighted pipeline", "quarter end"],
  accuracy: ["forecast accuracy", "variance", "error rate", "integrity", "predictability", "forecast deviation"],
  predictability: ["forecast accuracy", "coverage ratio", "pipeline linearity", "commit consistency"],

  // Channels, Partners & Indirect GTM
  partner: ["channel", "reseller", "alliance", "deal registration", "partner margin", "co-sell", "indirect sales", "distributor"],
  channel: ["partner", "indirect", "alliances", "deal reg", "partner portal", "distributor sales"],
  deal_reg: ["deal registration", "partner lead", "partner deal", "channel conflict", "lead protection"],

  // Leads, Qualification & Inbound/Outbound
  qualification: ["mql", "sql", "sal", "lead score", "qualification rate", "acceptance rate", "disqualification", "fit score", "intent score"],
  sla: ["service level agreement", "response time", "first touch latency", "routing speed", "assignment time", "follow up time"],
  conversion: ["win rate", "stage conversion", "lead to opp", "opp to close", "funnel pass through", "close rate"],
  routing: ["lead assignment", "territory routing", "round robin", "sla", "auto assignment", "speed to lead"],

  // Pipeline & Funnel
  pipeline: ["deal flow", "opportunities", "funnel", "coverage ratio", "pipeline generation", "inflow", "waterfall", "staged deals"],
  funnel: ["conversion", "drop off", "stage progression", "top of funnel", "middle of funnel", "bottom of funnel", "pass through rate"],
  waterfall: ["pipeline movement", "created", "won", "lost", "pushed", "pulled", "increased", "decreased"]
};

// Pre-calculated Intent Vector Keywords for RevOps Domains
export const SEMANTIC_INTENT_PRESETS = [
  {
    id: "velocity_cycle",
    label: "⚡ Deal Velocity & Latency",
    query: "deal cycle length pipeline velocity response time speed to close",
    description: "Measure sales acceleration, sales cycle length, and lead response SLA."
  },
  {
    id: "dedupe_hygiene",
    label: "🛡️ Duplicate & CRM Hygiene",
    query: "duplicate rate lead matching orphan leads data quality cleanliness stale contacts",
    description: "Detect duplicate contacts/leads and CRM data cleanliness."
  },
  {
    id: "churn_retention",
    label: "📉 Churn Risk & Net Retention",
    query: "customer churn gross retention net revenue retention renewal rate customer health",
    description: "Analyze logo churn, GRR, NRR, and renewal predictability."
  },
  {
    id: "rep_quota",
    label: "🎯 Rep Attainment & Productivity",
    query: "quota attainment win rate by rep activities per rep ramp time sales capacity",
    description: "Track rep quota attainment, activity output, and ramp time."
  },
  {
    id: "unit_economics",
    label: "💰 CAC Payback & Unit Economics",
    query: "customer acquisition cost payback period ltv cac ratio marketing roi pipeline spend",
    description: "Evaluate CAC payback, marketing efficiency, and LTV."
  },
  {
    id: "partner_channel",
    label: "🤝 Partner & Channel Margins",
    query: "partner deal registration channel revenue partner margin indirect sales discount",
    description: "Analyze channel partner performance, deal reg, and margins."
  },
  {
    id: "forecast_integrity",
    label: "🔮 Forecast Accuracy & Slippage",
    query: "forecast accuracy commit coverage close date push rate deal slippage weighted pipeline",
    description: "Measure forecast variance, push rates, and deal slippage."
  }
];

export interface SemanticSearchResult {
  kpi: KPIRecord;
  score: number; // 0 to 100
  matchConfidence: "Very High" | "High" | "Moderate" | "Related";
  matchedTokens: string[];
  semanticReason: string;
}

// Tokenizer and normalizer
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1);
}

// Expand query tokens using domain synonyms
function expandQueryWithSynonyms(tokens: string[]): { expandedTokens: Set<string>; synonymMap: Map<string, string> } {
  const expanded = new Set<string>(tokens);
  const synonymMap = new Map<string, string>();

  for (const token of tokens) {
    // Check direct synonyms
    if (DOMAIN_SYNONYMS[token]) {
      DOMAIN_SYNONYMS[token].forEach((syn) => {
        tokenize(syn).forEach((st) => {
          expanded.add(st);
          synonymMap.set(st, token);
        });
      });
    }

    // Check partial key matches (e.g., "velocities" -> "velocity", "retentive" -> "retention")
    for (const [key, synList] of Object.entries(DOMAIN_SYNONYMS)) {
      if (token.startsWith(key.slice(0, 4)) || key.startsWith(token.slice(0, 4))) {
        synList.forEach((syn) => {
          tokenize(syn).forEach((st) => {
            expanded.add(st);
            synonymMap.set(st, key);
          });
        });
      }
    }
  }

  return { expandedTokens: expanded, synonymMap };
}

// Pre-computed searchable representations for each KPI
interface IndexedKPI {
  kpi: KPIRecord;
  metricTokens: Set<string>;
  purposeTokens: Set<string>;
  dimensionTokens: Set<string>;
  functionTokens: Set<string>;
  allTokens: Set<string>;
  rawCorpus: string;
}

let cachedIndex: IndexedKPI[] | null = null;

function getOrBuildIndex(kpis: KPIRecord[]): IndexedKPI[] {
  if (cachedIndex && cachedIndex.length === kpis.length) {
    return cachedIndex;
  }

  cachedIndex = kpis.map((kpi) => {
    const metricTokens = new Set(tokenize(kpi.metric));
    const purposeTokens = new Set(tokenize(kpi.analysisPurpose));
    const dimensionTokens = new Set(tokenize(kpi.dimensions));
    const functionTokens = new Set(tokenize(kpi.function));
    const objectTokens = new Set(tokenize(kpi.object));
    const dataSourcesTokens = new Set(tokenize(kpi.dataSources));

    const allTokens = new Set([
      ...metricTokens,
      ...purposeTokens,
      ...dimensionTokens,
      ...functionTokens,
      ...objectTokens,
      ...dataSourcesTokens,
      kpi.id.toLowerCase(),
      kpi.type.toLowerCase()
    ]);

    const rawCorpus = `${kpi.id} ${kpi.metric} ${kpi.function} ${kpi.object} ${kpi.dimensions} ${kpi.analysisPurpose} ${kpi.dataSources} ${kpi.bestVisualization}`.toLowerCase();

    return {
      kpi,
      metricTokens,
      purposeTokens,
      dimensionTokens,
      functionTokens,
      allTokens,
      rawCorpus
    };
  });

  return cachedIndex;
}

/**
 * Executes a high-precision semantic search over the 157 KPI Master dataset
 */
export function searchKpisSemantically(
  query: string,
  kpis: KPIRecord[],
  options?: {
    threshold?: number;
    maxResults?: number;
  }
): SemanticSearchResult[] {
  if (!query || !query.trim()) {
    return kpis.map((kpi) => ({
      kpi,
      score: 100,
      matchConfidence: "Very High",
      matchedTokens: [],
      semanticReason: "Exact master catalog record"
    }));
  }

  const rawQuery = query.trim().toLowerCase();
  const rawTokens = tokenize(rawQuery);
  if (rawTokens.length === 0) {
    return [];
  }

  const index = getOrBuildIndex(kpis);
  const { expandedTokens, synonymMap } = expandQueryWithSynonyms(rawTokens);

  const results: SemanticSearchResult[] = [];

  for (const item of index) {
    let score = 0;
    const matchedTokens: string[] = [];
    const reasons: string[] = [];

    // 1. Exact string matches & KPI ID Match (Highest weight: 40-50 pts)
    if (item.kpi.id.toLowerCase() === rawQuery || item.kpi.id.toLowerCase().replace("-", "") === rawQuery.replace("-", "")) {
      score += 60;
      reasons.push(`Exact KPI ID match (${item.kpi.id})`);
      matchedTokens.push(item.kpi.id);
    } else if (item.rawCorpus.includes(rawQuery)) {
      score += 35;
      reasons.push("Exact phrase matched in metric or purpose");
    }

    // 2. Metric Title Direct & Stem Matches (Weight: up to 35 pts)
    let metricHits = 0;
    for (const token of rawTokens) {
      if (item.metricTokens.has(token)) {
        metricHits += 1;
        matchedTokens.push(token);
      } else {
        // Prefix match on metric tokens
        for (const mt of item.metricTokens) {
          if (mt.startsWith(token) || (token.length > 3 && token.startsWith(mt))) {
            metricHits += 0.8;
            matchedTokens.push(mt);
            break;
          }
        }
      }
    }
    if (rawTokens.length > 0) {
      score += (metricHits / rawTokens.length) * 35;
    }

    // 3. Analysis Purpose & Concept Context Hits (Weight: up to 25 pts)
    let purposeHits = 0;
    for (const token of rawTokens) {
      if (item.purposeTokens.has(token)) {
        purposeHits += 1;
        if (!matchedTokens.includes(token)) matchedTokens.push(token);
      }
    }
    score += Math.min(25, purposeHits * 8);

    // 4. Function, Object & Dimension Hits (Weight: up to 15 pts)
    for (const token of rawTokens) {
      if (item.functionTokens.has(token) || item.dimensionTokens.has(token)) {
        score += 6;
        if (!matchedTokens.includes(token)) matchedTokens.push(token);
      }
    }

    // 5. Semantic Expansion & Synonym Matching (Weight: up to 30 pts)
    let semanticSynonymHits = 0;
    for (const expToken of expandedTokens) {
      if (!rawTokens.includes(expToken) && item.allTokens.has(expToken)) {
        semanticSynonymHits += 1;
        const originToken = synonymMap.get(expToken);
        if (originToken && !reasons.includes(`Concept match: "${originToken}" → ${expToken}`)) {
          reasons.push(`Concept: "${originToken}" ↔ ${expToken}`);
        }
        if (!matchedTokens.includes(expToken)) {
          matchedTokens.push(expToken);
        }
      }
    }
    score += Math.min(30, semanticSynonymHits * 6);

    // Filter threshold
    const minThreshold = options?.threshold ?? 8;
    if (score >= minThreshold) {
      // Normalize score to max 100
      const finalScore = Math.min(100, Math.round(score));
      
      let matchConfidence: "Very High" | "High" | "Moderate" | "Related" = "Related";
      if (finalScore >= 75) matchConfidence = "Very High";
      else if (finalScore >= 50) matchConfidence = "High";
      else if (finalScore >= 25) matchConfidence = "Moderate";

      const semanticReason =
        reasons.length > 0
          ? reasons.slice(0, 2).join(" • ")
          : matchedTokens.length > 0
          ? `Matched RevOps terms: ${matchedTokens.slice(0, 3).join(", ")}`
          : "Relevant semantic domain match";

      results.push({
        kpi: item.kpi,
        score: finalScore,
        matchConfidence,
        matchedTokens: Array.from(new Set(matchedTokens)),
        semanticReason
      });
    }
  }

  // Sort descending by semantic relevance score
  results.sort((a, b) => b.score - a.score);

  if (options?.maxResults) {
    return results.slice(0, options.maxResults);
  }

  return results;
}

export interface GeminiSearchResponse {
  results: SemanticSearchResult[];
  mode: "gemini-embedding-2-preview" | "deterministic-vector-projection" | "local-vector-engine";
  geminiModel?: string;
  latencyMs: number;
}

/**
 * Searches the 157 KPI Library using server-side Gemini Embeddings vector engine
 * with automatic fallback to local semantic search.
 */
export async function searchKpisWithGemini(
  query: string,
  kpis: KPIRecord[],
  options?: { maxResults?: number }
): Promise<GeminiSearchResponse> {
  const startTime = Date.now();
  if (!query || !query.trim()) {
    const defaultList = searchKpisSemantically("", kpis, options);
    return {
      results: defaultList,
      mode: "local-vector-engine",
      latencyMs: 0,
    };
  }

  try {
    const res = await fetch("/api/gemini/semantic-search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: query.trim(), topK: options?.maxResults || 157 }),
    });

    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }

    const data = await res.json();
    if (data.success && Array.isArray(data.results)) {
      // Map server response to SemanticSearchResult
      const mappedResults: SemanticSearchResult[] = data.results.map((r: any) => {
        const kpi = kpis.find((k) => k.id === (r.kpi?.id || r.kpiId)) || r.kpi;
        return {
          kpi,
          score: r.score,
          matchConfidence: r.matchConfidence as any,
          matchedTokens: r.matchedTokens || [],
          semanticReason: r.semanticReason || "Gemini Vector Similarity Fit",
        };
      }).filter((item: any) => item.kpi);

      return {
        results: mappedResults,
        mode: data.mode || "gemini-embedding-2-preview",
        geminiModel: data.geminiModel,
        latencyMs: data.latencyMs || (Date.now() - startTime),
      };
    }
  } catch (error) {
    console.warn("Gemini semantic search API request failed, using client vector engine:", error);
  }

  // Fallback to local semantic search engine
  const localResults = searchKpisSemantically(query, kpis, options);
  return {
    results: localResults,
    mode: "local-vector-engine",
    latencyMs: Date.now() - startTime,
  };
}

