import React from 'react';
import { confidenceTier, CONFIDENCE_LABEL, CONFIDENCE_RANK, type ConfidenceTier } from '../../data/normalize';

/**
 * Confidence is an ordered scale, so it gets one ramp rather than six unrelated hues.
 * The previous version coloured each tier with a different hue (emerald / teal / blue /
 * amber / purple / rose), which made the tiers impossible to rank by eye and collided
 * with the green already used for DO in the playbook.
 */
const TIER_STYLE: Record<ConfidenceTier, { bg: string; ink: string; border: string }> = {
  STRONG: { bg: 'var(--ord-6)', ink: 'var(--ord-ink-hi)', border: 'var(--ord-6)' },
  'MODERATE-STRONG': { bg: 'var(--ord-5)', ink: 'var(--ord-ink-hi)', border: 'var(--ord-5)' },
  MODERATE: { bg: 'var(--ord-4)', ink: 'var(--ord-ink-hi)', border: 'var(--ord-4)' },
  PROMISING: { bg: 'var(--ord-3)', ink: 'var(--ord-ink-mid)', border: 'var(--ord-3)' },
  MIXED: { bg: 'var(--ord-2)', ink: 'var(--ord-ink-lo)', border: 'var(--ord-2)' },
  WEAK: { bg: 'var(--ord-1)', ink: 'var(--ord-ink-lo)', border: 'var(--ord-1)' },
  // Off-scale: these are not weaker evidence, they are a different kind of claim.
  OBSERVED: { bg: 'transparent', ink: 'var(--chart-label)', border: 'var(--chart-label)' },
  INFERENCE: { bg: 'transparent', ink: 'var(--chart-label)', border: 'var(--chart-label)' },
  UNCLASSIFIED: { bg: 'transparent', ink: 'var(--chart-label)', border: 'var(--chart-muted)' },
};

interface Props {
  confidence: string;
  /** Show the analyst's original prose instead of the normalised tier label. */
  verbatim?: boolean;
  className?: string;
}

export const ConfidenceTag: React.FC<Props> = ({ confidence, verbatim = false, className = '' }) => {
  const tier = confidenceTier(confidence);
  const style = TIER_STYLE[tier];
  const label = verbatim ? confidence : CONFIDENCE_LABEL[tier];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded border font-mono font-medium ${className}`}
      style={{
        background: style.bg,
        color: style.ink,
        borderColor: style.border,
        fontSize: 'var(--t-micro)',
      }}
      title={verbatim ? CONFIDENCE_LABEL[tier] : confidence}
    >
      <ConfidenceDots rank={CONFIDENCE_RANK[tier]} tier={tier} />
      {label}
    </span>
  );
};

/**
 * Secondary encoding: the tier is legible without colour, which matters both for
 * colour-vision deficiency and for the printed exports this corpus ends up in.
 */
const ConfidenceDots: React.FC<{ rank: number; tier: ConfidenceTier }> = ({ rank, tier }) => {
  if (tier === 'OBSERVED' || tier === 'INFERENCE' || tier === 'UNCLASSIFIED') return null;
  return (
    <span aria-hidden className="inline-flex items-center gap-[1.5px]">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <span
          key={i}
          className="block rounded-full"
          style={{
            width: 3,
            height: 3,
            background: i <= rank ? 'currentColor' : 'transparent',
            border: i <= rank ? 'none' : '1px solid currentColor',
            opacity: i <= rank ? 0.9 : 0.3,
          }}
        />
      ))}
    </span>
  );
};
