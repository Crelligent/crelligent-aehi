import type { ScoreStatus } from './types';

export function getScoreStatus(score: number): ScoreStatus {
  if (score >= 65) return 'healthy';
  if (score >= 45) return 'at-risk';
  return 'critical';
}

export function getScoreColour(score: number): string {
  const status = getScoreStatus(score);
  if (status === 'healthy') return 'var(--aehi-lime)';
  if (status === 'at-risk') return 'var(--aehi-amber)';
  return 'var(--aehi-red)';
}

export function getLayerScoreColour(layerScore: number): string {
  if (layerScore >= 6.5) return 'var(--aehi-lime)';
  if (layerScore >= 4.0) return 'var(--aehi-amber)';
  return 'var(--aehi-red)';
}

export function formatTrend(trend: number): { text: string; colour: string } {
  if (trend > 0) return { text: `↑ +${trend} vs prev`, colour: 'var(--aehi-lime)' };
  if (trend < 0) return { text: `↓ ${trend} vs prev`, colour: 'var(--aehi-red)' };
  return { text: '→ flat', colour: 'var(--aehi-dim)' };
}

export const LAYER_LABELS: Record<string, { name: string; role: string }> = {
  l1: { name: 'Business Design',  role: 'The Kernel'   },
  l2: { name: 'Operating Model',  role: 'The Scheduler' },
  l3: { name: 'Technology',       role: 'Infrastructure'},
  l4: { name: 'Data & Intel',     role: 'Sensing Layer' },
  l5: { name: 'Governance',       role: 'Security Layer'},
};
