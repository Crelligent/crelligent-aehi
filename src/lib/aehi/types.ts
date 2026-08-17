export interface AEHIEdition {
  edition: string;
  publicationDate: string;
  sampleSize: number;
  methodology: string;
  partners: string[];
  reportPdfUrl: string;
  overallScore: number;
  topQuartileThreshold: number;
  bottomQuartileThreshold: number;
  primaryConstraintLayer: OSLayer;
  primaryConstraintPercent: number;
  overallLayerScores: LayerScores;
  keyFindings: string[];
  sectors: AEHISector[];
  historicalTrend: TrendPoint[];
  sectorAdvisors: SectorAdvisor[];
}

export type OSLayer = 'L1' | 'L2' | 'L3' | 'L4' | 'L5';

export interface LayerScores {
  l1: number;
  l2: number;
  l3: number;
  l4: number;
  l5: number;
}

export interface AEHISector {
  name: string;
  slug: string;
  score: number;
  trend: number;
  sampleSize: number;
  primaryConstraint: OSLayer;
  layerScores: LayerScores;
  topQuartileScore: number;
  medianScore: number;
  bottomQuartileScore: number;
  geographicBreakdown: {
    lagos: number;
    abuja: number;
    other: number;
  };
}

export interface TrendPoint {
  edition: string;
  score: number;
  date: string;
}

export interface SectorAdvisor {
  name: string;
  sector: string;
  title: string;
}

export type ScoreStatus = 'healthy' | 'at-risk' | 'critical';
