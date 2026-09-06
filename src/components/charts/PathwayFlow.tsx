import React, { useState } from 'react';
import type { Pathway } from '../../types';
import { ordinalStep } from './chartUtils';

interface Props {
  pathways: Pathway[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

const STAGES = ['state', 'appraisal', 'mechanism', 'emotion', 'linguistic'] as const;
type Stage = (typeof STAGES)[number];

const STAGE_LABEL: Record<Stage, string> = {
  state: 'Recipient state',
  appraisal: 'What he concludes',
  mechanism: 'Mechanism',
  emotion: 'Target feeling',
  linguistic: 'What the writing does',
};

const COLUMNS = 'repeat(5, minmax(180px, 1fr))';

/**
 * Seven audience states and the chain reverse-engineered for each.
 *
 * Sized by the browser rather than by a fixed viewBox. The cells hold whole sentences,
 * and the length of a sentence is not knowable in advance: the Indonesian rendering of
 * the same cell runs materially longer than the English one, so any row height chosen up
 * front clips one language or wastes space in the other. CSS grid removes the choice.
 *
 * The repetition is the finding. Every row has the same five-stage shape, nothing starts
 * from a feeling, and every row ends in something the writing has to do.
 */
export const PathwayFlow: React.FC<Props> = ({ pathways, selectedId, onSelect }) => {
  const [hover, setHover] = useState<{ id: string; stage: Stage } | null>(null);

  const textFor = (p: Pathway, stage: Stage) => {
    if (stage === 'state') return p.state;
    if (stage === 'appraisal') return p.appraisal;
    if (stage === 'mechanism') return `${p.mechanismName} (${p.mechanismId})`;
    if (stage === 'emotion') return `${p.emotion} · ${p.arousal.toLowerCase()} arousal`;
    return p.linguistic;
  };

  return (
    <div className="rounded-xl border border-stone-800 bg-stone-950 overflow-hidden">
      <header className="px-5 py-3.5 border-b border-stone-800">
        <h3 className="font-serif font-semibold text-stone-100" style={{ fontSize: 'var(--t-h3)' }}>
          From where he is to what the writing does
        </h3>
        <p className="text-stone-400 mt-0.5" style={{ fontSize: 'var(--t-small)' }}>
          Seven states, one chain shape. Click a row to open it.
        </p>
      </header>

      <div className="p-4 overflow-x-auto">
        <div style={{ minWidth: 940 }}>
          <div className="grid gap-x-4 pb-2" style={{ gridTemplateColumns: COLUMNS }}>
            {STAGES.map((stage) => (
              <span
                key={stage}
                className="font-mono uppercase tracking-wider text-stone-400"
                style={{ fontSize: 'var(--t-micro)' }}
              >
                {STAGE_LABEL[stage]}
              </span>
            ))}
          </div>

          <div className="space-y-2">
            {pathways.map((p) => {
              const isSelected = p.id === selectedId;
              const level = p.arousal === 'MODERATE' ? 4 : 2;
              return (
                <div
                  key={p.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`Pathway ${p.id}: ${p.state}`}
                  onClick={() => onSelect(p.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(p.id); }
                  }}
                  className="grid gap-x-4 items-stretch cursor-pointer rounded-lg chart-focusable"
                  style={{
                    gridTemplateColumns: COLUMNS,
                    background: isSelected ? 'var(--chart-grid)' : 'transparent',
                    padding: '2px',
                  }}
                >
                  {STAGES.map((stage) => {
                    const isMechanism = stage === 'mechanism';
                    const isHover = hover?.id === p.id && hover?.stage === stage;
                    return (
                      <div
                        key={stage}
                        onMouseEnter={() => setHover({ id: p.id, stage })}
                        onMouseLeave={() => setHover(null)}
                        className="rounded-lg px-3 py-2.5 leading-relaxed transition-colors"
                        style={{
                          background: isMechanism ? ordinalStep(level, 5) : 'var(--chart-surface)',
                          border: `${isHover ? 2 : 1}px solid ${isHover ? 'var(--accent)' : 'var(--chart-grid)'}`,
                          color: isMechanism ? 'var(--ord-ink-hi)' : 'var(--chart-label-strong)',
                          fontFamily: 'var(--font-mono)',
                          fontSize: 'var(--t-micro)',
                        }}
                      >
                        {textFor(p, stage)}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <footer className="px-5 py-3 border-t border-stone-800 text-stone-500" style={{ fontSize: 'var(--t-micro)' }}>
        <span className="font-mono uppercase tracking-wider">Does not represent</span> measured causal effects.
        Each chain is a synthesised hypothesis about how a state and a wording choice connect. No study in the
        corpus tested a full pathway end to end.
      </footer>
    </div>
  );
};
