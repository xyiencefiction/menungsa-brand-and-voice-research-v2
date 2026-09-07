import React, { useState } from 'react';
import type { Mechanism } from '../../types';
import { confidenceTier } from '../../data/normalize';
import { tierFill } from './chartUtils';

interface Props {
  mechanisms: Mechanism[];
  selectedId?: string;
  onSelect: (mechanismId: string) => void;
}

type StageKey =
  | 'message_feature'
  | 'appraisal'
  | 'psychological_mechanism'
  | 'emotional_response'
  | 'behavioural_possibility';

const STAGES: { key: StageKey; label: string }[] = [
  { key: 'message_feature', label: 'Message feature' },
  { key: 'appraisal', label: 'What he concludes' },
  { key: 'psychological_mechanism', label: 'Mechanism' },
  { key: 'emotional_response', label: 'Feeling' },
  { key: 'behavioural_possibility', label: 'What becomes possible' },
];

/**
 * Two gates decide whether anything upstream matters.
 *
 * Gate 1 is whether the speaker is credible enough to be processed at all; Gate 2 is
 * whether the action named at the end actually exists and is reachable. Both are drawn
 * as barriers between stages rather than as stages, because that is how they behave: a
 * closed gate does not weaken the chain, it nullifies everything before it.
 */
const GATES: Record<number, { id: string; label: string; note: string }> = {
  1: {
    id: 'M09',
    label: 'Gate 1 · credibility',
    note: 'If the speaker is not licensed to say this, the message is not processed on its merits at all. Nothing downstream runs.',
  },
  4: {
    id: 'M14',
    label: 'Gate 2 · access',
    note: 'If the step named at the end does not exist, is unaffordable or is gatekept, the whole chain resolves into nothing and the message becomes victim-blaming.',
  },
};

/** Five stage columns with a narrow barrier column before stages 1 and 4. */
const COLUMNS = 'minmax(150px,1fr) 30px minmax(150px,1fr) minmax(150px,1fr) minmax(150px,1fr) 30px minmax(150px,1fr)';

export const MechanismModel: React.FC<Props> = ({ mechanisms, selectedId, onSelect }) => {
  const [hoverGate, setHoverGate] = useState<number | null>(null);
  const [hoverStage, setHoverStage] = useState<StageKey | null>(null);
  const selected = mechanisms.find((m) => m.mechanism_id === selectedId) ?? mechanisms[0];
  const tier = confidenceTier(selected.evidence_strength);
  const mechanismFill = tierFill(tier);

  return (
    <div className="rounded-xl border border-stone-800 bg-stone-950 overflow-hidden">
      <header className="px-5 py-3.5 border-b border-stone-800">
        <h3 className="font-serif font-semibold text-stone-100" style={{ fontSize: 'var(--t-h3)' }}>
          The chain, and the two gates on it
        </h3>
        <p className="text-stone-400 mt-0.5" style={{ fontSize: 'var(--t-small)' }}>
          Pick a mechanism to trace it end to end. The two red barriers nullify everything upstream when closed.
        </p>
      </header>

      <div className="px-4 pt-4 flex flex-wrap gap-1">
        {mechanisms.map((m) => (
          <button
            key={m.mechanism_id}
            onClick={() => onSelect(m.mechanism_id)}
            className={`px-1.5 py-0.5 rounded font-mono border transition ${
              m.mechanism_id === selected.mechanism_id
                ? 'bg-[#af4d28] text-stone-100 font-semibold border-[#893412]'
                : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-stone-200'
            }`}
            style={{ fontSize: 'var(--t-micro)' }}
            title={m.mechanism}
          >
            {m.mechanism_id}
          </button>
        ))}
      </div>

      <div className="p-4 overflow-x-auto">
        <div style={{ minWidth: 900 }}>
          <div className="grid gap-x-2 pb-2" style={{ gridTemplateColumns: COLUMNS }}>
            {STAGES.map((stage, i) => (
              <React.Fragment key={stage.key}>
                {GATES[i] && <span aria-hidden />}
                <span
                  className="font-mono uppercase tracking-wider text-stone-400"
                  style={{ fontSize: 'var(--t-micro)' }}
                >
                  {stage.label}
                </span>
              </React.Fragment>
            ))}
          </div>

          <div className="grid gap-x-2 items-stretch" style={{ gridTemplateColumns: COLUMNS }}>
            {STAGES.map((stage, i) => {
              const gate = GATES[i];
              const isHover = hoverStage === stage.key;
              const isMechanism = stage.key === 'psychological_mechanism';
              return (
                <React.Fragment key={stage.key}>
                  {gate && (
                    <div
                      onMouseEnter={() => setHoverGate(i)}
                      onMouseLeave={() => setHoverGate(null)}
                      aria-label={gate.label}
                      className="flex flex-col items-center justify-center gap-1 cursor-help"
                    >
                      <span
                        className="rounded-full"
                        style={{
                          width: hoverGate === i ? 5 : 3.5,
                          flex: 1,
                          minHeight: 40,
                          background: 'var(--cat-2)',
                        }}
                      />
                      <span
                        className="font-mono"
                        style={{ fontSize: '9px', color: 'var(--cat-2)', writingMode: 'vertical-rl' }}
                      >
                        {gate.id}
                      </span>
                    </div>
                  )}
                  <div
                    onMouseEnter={() => setHoverStage(stage.key)}
                    onMouseLeave={() => setHoverStage(null)}
                    className="rounded-lg px-3 py-2.5 leading-relaxed transition-colors"
                    style={{
                      background: isMechanism && mechanismFill !== 'none' ? mechanismFill : 'var(--chart-surface)',
                      border: `${isHover ? 2 : 1}px solid ${isHover ? 'var(--accent)' : 'var(--chart-grid)'}`,
                      color: isMechanism && mechanismFill !== 'none' ? 'var(--ord-ink-hi)' : 'var(--chart-label-strong)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--t-micro)',
                    }}
                  >
                    {String(selected[stage.key])}
                  </div>
                </React.Fragment>
              );
            })}
          </div>

          <p className="pt-3 font-mono" style={{ fontSize: 'var(--t-micro)', color: 'var(--cat-2)' }}>
            Red barriers are gates, not stages: closed, they nullify everything to their left.
          </p>
          <p className="font-mono text-stone-500" style={{ fontSize: 'var(--t-micro)' }}>
            Mechanism block shading follows this mechanism's evidence strength.
          </p>
        </div>
      </div>

      <div className="px-5 py-3 border-t border-stone-800 bg-stone-900/40 space-y-1">
        {hoverGate !== null ? (
          <>
            <span className="font-mono uppercase tracking-wider" style={{ fontSize: 'var(--t-micro)', color: 'var(--cat-2)' }}>
              {GATES[hoverGate].label} · {GATES[hoverGate].id}
            </span>
            <p className="text-stone-200 leading-relaxed" style={{ fontSize: 'var(--t-small)' }}>
              {GATES[hoverGate].note}
            </p>
          </>
        ) : (
          <>
            <span className="font-mono text-stone-500 uppercase tracking-wider" style={{ fontSize: 'var(--t-micro)' }}>
              {selected.mechanism_id} · how it fails
            </span>
            <p className="text-stone-200 leading-relaxed" style={{ fontSize: 'var(--t-small)' }}>
              {selected.failure_mode}
            </p>
          </>
        )}
      </div>

      <footer className="px-5 py-3 border-t border-stone-800 text-stone-500" style={{ fontSize: 'var(--t-micro)' }}>
        <span className="font-mono uppercase tracking-wider">Does not represent</span> a tested structural model.
        The gates and the appraisals have solid support and the outcome separation is well evidenced, but the
        mechanism row is a synthesis. No study in the corpus estimated this chain as a whole.
      </footer>
    </div>
  );
};
