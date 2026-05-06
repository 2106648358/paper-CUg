import type { Indicators, Project } from '@/types';
import { DIMENSION_IDS, RI_TABLE } from './thesisData';

export function powerIteration(
  matrix: number[][],
  maxIter: number = 100,
  tolerance: number = 1e-10
): { eigenvalue: number; eigenvector: number[] } {
  const n = matrix.length;
  let v = new Array(n).fill(1 / n);
  for (let iter = 0; iter < maxIter; iter++) {
    const newV = matrix.map((row) =>
      row.reduce((sum, val, j) => sum + val * v[j], 0)
    );
    const norm = Math.sqrt(newV.reduce((sum, val) => sum + val * val, 0));
    const normalizedV = newV.map((x) => x / norm);
    let diff = 0;
    for (let i = 0; i < n; i++) diff += Math.abs(normalizedV[i] - v[i]);
    v = normalizedV;
    if (diff < tolerance) break;
  }
  const Av = matrix.map((row) =>
    row.reduce((sum, val, j) => sum + val * v[j], 0)
  );
  const eigenvalue = Av.reduce((sum, val, i) => sum + val * v[i], 0);
  const sum = v.reduce((a, b) => a + b, 0);
  return { eigenvalue, eigenvector: v.map((x) => x / sum) };
}

export function calcConsistency(matrix: number[][], lambdaMax: number) {
  const n = matrix.length;
  const CI = (lambdaMax - n) / (n - 1);
  const RI = RI_TABLE[n] || 1.26;
  const CR = CI / RI;
  return { CI: Math.round(CI * 10000) / 10000, CR: Math.round(CR * 10000) / 10000, passed: CR < 0.1 };
}

export function calcAHPWeights(matrix: number[][]) {
  const { eigenvalue, eigenvector } = powerIteration(matrix);
  const consistency = calcConsistency(matrix, eigenvalue);
  const weights: Record<string, number> = {};
  eigenvector.forEach((w, i) => {
    weights[DIMENSION_IDS[i]] = Math.round(w * 1000) / 1000;
  });
  return { weights, consistency: { lambdaMax: Math.round(eigenvalue * 1000) / 1000, ...consistency } };
}

export function normalizeData(data: number[][]): number[][] {
  const m = data[0].length;
  const normalized: number[][] = [];
  const mins: number[] = [];
  const maxs: number[] = [];
  for (let j = 0; j < m; j++) {
    const col = data.map((row) => row[j]);
    mins[j] = Math.min(...col);
    maxs[j] = Math.max(...col);
  }
  for (let i = 0; i < data.length; i++) {
    normalized[i] = [];
    for (let j = 0; j < m; j++) {
      const range = maxs[j] - mins[j];
      normalized[i][j] = range === 0 ? 1 : (data[i][j] - mins[j]) / range;
    }
  }
  return normalized;
}

export function calcEntropyWeights(data: number[][]): { entropy: number[]; weights: number[] } {
  const n = data.length;
  const m = data[0].length;
  const entropy: number[] = [];
  for (let j = 0; j < m; j++) {
    const col = data.map((row) => row[j]);
    const sum = col.reduce((a, b) => a + b, 0);
    if (sum === 0) { entropy[j] = 1; continue; }
    const p = col.map((x) => x / sum);
    let h = 0;
    for (const pij of p) { if (pij > 0) h -= pij * Math.log(pij); }
    entropy[j] = Math.round((h / Math.log(n)) * 1000) / 1000;
  }
  const d = entropy.map((h) => 1 - h);
  const sumD = d.reduce((a, b) => a + b, 0);
  const weights = sumD === 0 ? new Array(m).fill(1 / m) : d.map((di) => Math.round((di / sumD) * 1000) / 1000);
  return { entropy, weights };
}

export function calcEWMWeights(projects: Project[]) {
  const data = projects.map((p) => DIMENSION_IDS.map((id) => p.indicators[id as keyof Indicators]));
  const normalized = normalizeData(data);
  const { entropy, weights: weightsArr } = calcEntropyWeights(normalized);
  const entropyValues: Record<string, number> = {};
  const weights: Record<string, number> = {};
  DIMENSION_IDS.forEach((id, i) => {
    entropyValues[id] = entropy[i];
    weights[id] = weightsArr[i];
  });
  return { entropyValues, weights };
}

export function combineWeights(
  ahp: Record<string, number>,
  ewm: Record<string, number>,
  alpha: number
): Record<string, number> {
  const hybrid: Record<string, number> = {};
  for (const key of Object.keys(ahp)) {
    hybrid[key] = Math.round((alpha * ahp[key] + (1 - alpha) * ewm[key]) * 1000) / 1000;
  }
  return hybrid;
}

export function calcProjectScore(
  indicators: Indicators,
  weights: Record<string, number>
): number {
  let score = 0;
  for (const id of DIMENSION_IDS) {
    score += indicators[id as keyof Indicators] * (weights[id] || 0);
  }
  return Math.round(score * 1000) / 1000;
}

export function rankProjects(
  projects: { id: string; name: string; indicators: Indicators }[],
  weights: Record<string, number>
) {
  const scored = projects.map((p) => ({
    id: p.id,
    name: p.name,
    score: calcProjectScore(p.indicators, weights),
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored.map((p, i) => ({ ...p, rank: i + 1 }));
}

export function calcProbability(score: number, allScores: number[]): number {
  const avg = allScores.reduce((a, b) => a + b, 0) / allScores.length;
  const std = Math.sqrt(allScores.reduce((sum, s) => sum + Math.pow(s - avg, 2), 0) / allScores.length);
  if (std === 0) return 0.5;
  const z = (score - avg) / std;
  return Math.round((1 / (1 + Math.exp(-2 * z))) * 100) / 100;
}

export function getBreakdown(
  indicators: Indicators,
  weights: Record<string, number>
): Record<string, number> {
  const breakdown: Record<string, number> = {};
  for (const id of DIMENSION_IDS) {
    breakdown[id] = Math.round(indicators[id as keyof Indicators] * (weights[id] || 0) * 1000) / 1000;
  }
  return breakdown;
}

export function sensitivityAnalysis(
  projects: { id: string; name: string; indicators: Indicators }[],
  ahpWeights: Record<string, number>,
  ewmWeights: Record<string, number>,
  steps: number = 10
) {
  const results: { alpha: number; rankings: { id: string; rank: number; score: number }[] }[] = [];
  for (let step = 0; step <= steps; step++) {
    const alpha = Math.round((step / steps) * 100) / 100;
    const hybrid = combineWeights(ahpWeights, ewmWeights, alpha);
    const ranked = rankProjects(projects, hybrid);
    results.push({ alpha, rankings: ranked.map((p) => ({ id: p.id, rank: p.rank, score: p.score })) });
  }
  return results;
}
