export interface Dimension {
  id: string;
  name: string;
  nameEn: string;
}

export interface Indicators {
  popularity: number;
  gender_equity: number;
  sustainability: number;
  inclusivity: number;
  innovation: number;
  safety: number;
}

export interface Project {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  yearAdded: number | null;
  yearRemoved?: number;
  indicators: Indicators;
  score?: number;
  rank?: number;
  probability?: number;
}

export interface WeightsResult {
  calculated: string;
  weights: Record<string, number>;
  consistency: {
    lambdaMax: number;
    CI: number;
    CR: number;
    passed: boolean;
  };
}

export interface EWMResult {
  entropyValues: Record<string, number>;
  weights: Record<string, number>;
}

export interface RankingItem {
  rank: number;
  projectId: string;
  name: string;
  score: number;
  probability?: number;
  breakdown?: Record<string, number>;
}

export type MethodType = 'ahp' | 'ewm' | 'hybrid';
