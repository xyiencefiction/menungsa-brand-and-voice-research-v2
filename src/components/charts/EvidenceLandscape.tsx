import React from 'react';
import type { DerivedClaim } from '../../data';
import {
  EVIDENCE_LETTER_LABEL,
  OUTCOME_LABEL,
  CONFIDENCE_LABEL,
  CONFIDENCE_TIERS,
  OUTCOME_LEVELS,
  type EvidenceLetter,
  type OutcomeLevel,
} from '../../data/normalize';
import { ordinalStep } from './chartUtils';

interface Band {
  key: string;
  title: string;
  note?: string;
  segments: Segment[];
}

interface Segment {
  id: string;
  label: string;
  total: number;
  shown: number;
  color: string;
  /** Marks the segments the corpus rules say must never become psychological fact. */
  flagged?: boolean;
}

interface Props {
  all: DerivedClaim[];
  filtered: DerivedClaim[];
  onSegment: (band: string, id: string) => void;
  activeSegments: Record<string, string>;
}

const LETTERS: EvidenceLetter[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

/**
 * The shape of the corpus, redrawn against whatever the filters currently select.
 *
 * The browser previously reported its filter state as the string "Showing N of 100",
 * which tells you how much is left but nothing about what kind of evidence it is. The
 * distribution is itself a finding: 21 of 100 claims are category D or E, exactly the
 * two categories the synthesis forbids converting into psychological fact.
 */
export const EvidenceLandscape: React.FC<Props> = ({ all, filtered, onSegment, activeSegments }) => {
  const shownIds = new Set(filtered.map((c) => c.claim_id));
  const count = (rows: DerivedClaim[], pred: (c: DerivedClaim) => boolean) => rows.filter(pred).length;

  const bands: Band[] = [
    {
      key: 'category',
      title: 'Evidence category',
      note: 'D and E are never converted into psychological fact',
      segments: LETTERS.map((letter, i) => ({
        id: letter,
        label: EVIDENCE_LETTER_LABEL[letter],
        total: count(all, (c) => c.derived.letters.includes(letter)),
        shown: count(all, (c) => c.derived.letters.includes(letter) && shownIds.has(c.claim_id)),
        color: ordinalStep(LETTERS.length - i, LETTERS.length),
        flagged: letter === 'D' || letter === 'E',
      })),
    },
    {
      key: 'confidence',
      title: 'Confidence tier',
      segments: CONFIDENCE_TIERS.map((tier, i) => ({
        id: tier,
        label: CONFIDENCE_LABEL[tier],
        total: count(all, (c) => c.derived.confidenceTier === tier),
        shown: count(all, (c) => c.derived.confidenceTier === tier && shownIds.has(c.claim_id)),
        color: ordinalStep(CONFIDENCE_TIERS.length - i, CONFIDENCE_TIERS.length),
      })).filter((s) => s.total > 0),
    },
    {
      key: 'outcome',
      title: 'Outcome measured',
      note: 'derived from the reported dependent variable',
      segments: [...OUTCOME_LEVELS, 0 as OutcomeLevel].map((level) => ({
        id: String(level),
        label: OUTCOME_LABEL[level],
        total: count(all, (c) => c.derived.outcome === level),
        shown: count(all, (c) => c.derived.outcome === level && shownIds.has(c.claim_id)),
        color: level === 0 ? 'var(--chart-muted)' : ordinalStep(level, 6),
      })).filter((s) => s.total > 0),
    },
    {
      key: 'design',
      title: 'Design and locale',
      segments: [
        {
          id: 'causal',
          label: 'Causal / experimental',
          total: count(all, (c) => c.derived.causal === 'YES'),
          shown: count(all, (c) => c.derived.causal === 'YES' && shownIds.has(c.claim_id)),
          color: 'var(--ord-6)',
        },
        {
          id: 'wording',
          label: 'Wording manipulated',
          total: count(all, (c) => c.derived.wording === 'YES'),
          shown: count(all, (c) => c.derived.wording === 'YES' && shownIds.has(c.claim_id)),
          color: 'var(--ord-5)',
        },
        {
          id: 'indonesia',
          label: 'Indonesia-specific',
          total: count(all, (c) => c.derived.indonesia === 'YES'),
          shown: count(all, (c) => c.derived.indonesia === 'YES' && shownIds.has(c.claim_id)),
          color: 'var(--ord-3)',
        },
        {
          id: 'neither',
          label: 'Neither causal nor Indonesian',
          total: count(all, (c) => c.derived.causal !== 'YES' && c.derived.indonesia !== 'YES'),
          shown: count(all, (c) => c.derived.causal !== 'YES' && c.derived.indonesia !== 'YES' && shownIds.has(c.claim_id)),
          color: 'var(--ord-1)',
        },
      ],
    },
  ];

  return (
    <section className="rounded-xl border border-stone-800 bg-stone-950 p-5 space-y-5">
      <header className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h3 className="font-serif font-semibold text-stone-100" style={{ fontSize: 'var(--t-h3)' }}>
            What the filter is cutting
          </h3>
          <p className="text-stone-400 mt-0.5" style={{ fontSize: 'var(--t-small)' }}>
            Filled length is the current selection; the faint remainder is what has been filtered out. Click any band to filter by it.
          </p>
        </div>
        <span className="font-mono text-stone-400 tabular-nums shrink-0" style={{ fontSize: 'var(--t-small)' }}>
          {filtered.length} / {all.length}
        </span>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {bands.map((band) => {
          const max = Math.max(...band.segments.map((s) => s.total), 1);
          return (
            <div key={band.key} className="space-y-2">
              <div className="flex items-baseline justify-between gap-3">
                <h4 className="font-mono uppercase tracking-wider text-stone-300" style={{ fontSize: 'var(--t-micro)' }}>
                  {band.title}
                </h4>
                {band.note && (
                  <span className="text-stone-500 text-right" style={{ fontSize: 'var(--t-micro)' }}>{band.note}</span>
                )}
              </div>

              <div className="space-y-1">
                {band.segments.map((seg) => {
                  const isActive = activeSegments[band.key] === seg.id;
                  const emptied = seg.shown === 0 && filtered.length !== all.length;
                  return (
                    <button
                      key={seg.id}
                      onClick={() => onSegment(band.key, seg.id)}
                      aria-pressed={isActive}
                      className={`w-full grid items-center gap-3 py-1 px-1.5 rounded text-left transition ${
                        isActive ? 'bg-amber-500/10 ring-1 ring-amber-500/40' : 'hover:bg-stone-900'
                      }`}
                      style={{ gridTemplateColumns: '132px 1fr 42px' }}
                    >
                      <span
                        className={`truncate ${seg.flagged ? 'text-amber-200' : emptied ? 'text-stone-600' : 'text-stone-300'}`}
                        style={{ fontSize: 'var(--t-micro)' }}
                        title={seg.label}
                      >
                        {seg.label}
                      </span>

                      <span className="relative block h-3 rounded-sm overflow-hidden" style={{ background: 'var(--chart-grid)' }}>
                        {/* Filtered-out remainder stays visible so the whole stays legible. */}
                        <span
                          className="absolute inset-y-0 left-0 block rounded-sm"
                          style={{ width: `${(seg.total / max) * 100}%`, background: seg.color, opacity: 0.22 }}
                        />
                        <span
                          className="absolute inset-y-0 left-0 block rounded-sm transition-[width] duration-200"
                          style={{ width: `${(seg.shown / max) * 100}%`, background: seg.color }}
                        />
                      </span>

                      <span
                        className={`font-mono tabular-nums text-right ${emptied ? 'text-stone-600' : 'text-stone-300'}`}
                        style={{ fontSize: 'var(--t-micro)' }}
                      >
                        {seg.shown === seg.total ? seg.total : `${seg.shown}/${seg.total}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-stone-500 border-t border-stone-800 pt-3" style={{ fontSize: 'var(--t-micro)' }}>
        <span className="font-mono uppercase tracking-wider">Does not represent</span> quality within a category.
        Bar length counts claims, not evidential weight: one meta-analysis and one single-site interview study each count once.
      </p>
    </section>
  );
};
