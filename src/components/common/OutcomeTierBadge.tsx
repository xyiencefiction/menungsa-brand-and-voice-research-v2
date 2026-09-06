import React from 'react';
import { OUTCOME_LABEL, type OutcomeLevel } from '../../data/normalize';

/**
 * The outcome ladder distinguishes what a study actually measured, from observed
 * practice up to a clinical endpoint.
 *
 * It used to receive `evidence_category`, whose values are the letters A–G, and match
 * them against words like "clinical" and "behavior". All 100 rows fell through to the
 * default and rendered a bare letter, so the ladder was inert and its filter matched
 * nothing. The level now arrives pre-derived from `outcome_dv`.
 */
const LEVEL_STYLE: Record<OutcomeLevel, string> = {
  6: 'var(--ord-6)',
  5: 'var(--ord-5)',
  4: 'var(--ord-4)',
  3: 'var(--ord-3)',
  2: 'var(--ord-2)',
  1: 'var(--ord-1)',
  0: 'transparent',
};

interface Props {
  level: OutcomeLevel;
  /** The measured variable, shown on hover so the classification stays auditable. */
  outcomeDv?: string;
  className?: string;
}

export const OutcomeTierBadge: React.FC<Props> = ({ level, outcomeDv, className = '' }) => {
  const unclassified = level === 0;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded border font-mono ${className}`}
      style={{
        borderColor: unclassified ? 'var(--chart-muted)' : LEVEL_STYLE[level],
        color: unclassified ? 'var(--chart-label)' : 'var(--chart-label-strong)',
        fontSize: 'var(--t-micro)',
      }}
      title={outcomeDv ? `Measured: ${outcomeDv}` : OUTCOME_LABEL[level]}
    >
      {!unclassified && (
        <span
          aria-hidden
          className="block rounded-[2px]"
          style={{ width: 8, height: 8, background: LEVEL_STYLE[level] }}
        />
      )}
      {OUTCOME_LABEL[level]}
    </span>
  );
};
