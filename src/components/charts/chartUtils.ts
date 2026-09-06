import { CONFIDENCE_RANK, type ConfidenceTier } from '../../data/normalize';

/** Linear scale from a data domain to a pixel range. */
export function scaleLinear(d0: number, d1: number, r0: number, r1: number) {
  const span = d1 - d0 || 1;
  return (v: number) => r0 + ((v - d0) / span) * (r1 - r0);
}

export function ticks(from: number, to: number, step = 1): number[] {
  const out: number[] = [];
  for (let v = from; v <= to; v += step) out.push(v);
  return out;
}

/**
 * The ordinal ramp, read from the CSS contract so charts and badges can never drift.
 * Six steps, one hue, validated against the app surface for step separation and for
 * a light end that still clears the background.
 */
export const ORDINAL = ['var(--ord-1)', 'var(--ord-2)', 'var(--ord-3)', 'var(--ord-4)', 'var(--ord-5)', 'var(--ord-6)'];

/** Ordinal step for an n-level scale, 1-indexed. */
export function ordinalStep(level: number, levels: number): string {
  if (level <= 0) return 'var(--chart-muted)';
  const idx = Math.round(((level - 1) / Math.max(levels - 1, 1)) * (ORDINAL.length - 1));
  return ORDINAL[Math.min(Math.max(idx, 0), ORDINAL.length - 1)];
}

/**
 * Confidence tiers map onto the same ramp. MIXED sits off the scale: it is not weaker
 * evidence, it is contested evidence, so it is drawn hollow rather than dim.
 */
export function tierFill(tier: ConfidenceTier): string {
  if (tier === 'MIXED') return 'none';
  if (tier === 'OBSERVED' || tier === 'INFERENCE' || tier === 'UNCLASSIFIED') return 'var(--chart-muted)';
  return ordinalStep(CONFIDENCE_RANK[tier], 6);
}

export function tierStroke(tier: ConfidenceTier): string | undefined {
  return tier === 'MIXED' ? 'var(--ord-4)' : undefined;
}

/** Deterministic small offset so coincident points stay countable. */
export function jitter(index: number, count: number, radius = 12): { dx: number; dy: number } {
  if (count <= 1) return { dx: 0, dy: 0 };
  const angle = (index / count) * Math.PI * 2 - Math.PI / 2;
  return { dx: Math.cos(angle) * radius, dy: Math.sin(angle) * radius };
}

export type ChartMargin = { top: number; right: number; bottom: number; left: number };
