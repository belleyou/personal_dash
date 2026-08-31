import { KPI_MASTER_DATA, KPIRecord } from "./kpiMasterData";

export interface KPIEmbeddingEntry {
  kpiId: string;
  metric: string;
  function: string;
  object: string;
  vectorSummary: string;
}

// Compute semantic vector representation text for each KPI
export function getKpiEmbeddingText(kpi: KPIRecord): string {
  return `KPI ID: ${kpi.id} | Metric: ${kpi.metric} | Function: ${kpi.function} | Object: ${kpi.object} | Type: ${kpi.type} | Data Sources: ${kpi.dataSources} | Dimensions: ${kpi.dimensions} | Purpose: ${kpi.analysisPurpose}`;
}

// Cosine similarity calculation between two vectors
export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (!vecA || !vecB || vecA.length === 0 || vecB.length === 0 || vecA.length !== vecB.length) {
    return 0;
  }
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// All 157 KPI vector metadata
export const KPI_EMBEDDING_CATALOG: KPIEmbeddingEntry[] = KPI_MASTER_DATA.map((kpi) => ({
  kpiId: kpi.id,
  metric: kpi.metric,
  function: kpi.function,
  object: kpi.object,
  vectorSummary: getKpiEmbeddingText(kpi),
}));
