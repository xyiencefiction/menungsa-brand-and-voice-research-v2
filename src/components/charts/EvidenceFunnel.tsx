import React from 'react';
import { claims, corpusStats } from '../../data';
import { ordinalStep } from './chartUtils';

interface Props {
  onDrill: (stage: string) => void;
}

/**
 * The narrowing from the whole ledger to zero Indonesian wording experiments.
 *
 * Every number is counted from the ledger rather than written into the component, so
 * the terminal zero is a result rather than an assertion. Drawn as graded bars rather
 * than a tapering funnel shape: a smooth taper flatters the drop, while bar length
 * stays proportional to the count.
 */
export const EvidenceFunnel: React.FC<Props> = ({ onDrill }) => {
  const maleRelevant = claims.filter((c) => c.male_specific.toUpperCase().startsWith('YES')).length;

  const stages = [
    { id: 'all', label: 'All catalogued claims', n: corpusStats.totalClaims, note: 'the full ledger' },
    { id: 'male', label: 'Male-relevant', n: maleRelevant, note: 'men studied or targeted' },
    { id: 'causal', label: 'Causal design', n: corpusStats.causal, note: 'experiment or RCT' },
    { id: 'wording', label: 'Wording manipulated', n: corpusStats.wordingTested, note: 'copy varied, other factors held' },
    { id: 'indonesia', label: 'Indonesian', n: corpusStats.indonesian, note: 'any design' },
    { id: 'both', label: 'Indonesian AND wording manipulated', n: corpusStats.indonesianWordingTested, note: 'the missing study' },
  ];

  const max = Math.max(...stages.map((s) => s.n));

  return (
    <section className="rounded-xl border border-stone-800 bg-stone-950 overflow-hidden">
      <header className="px-5 py-3.5 border-b border-stone-800">
        <h3 className="font-serif font-semibold text-stone-100" style={{ fontSize: 'var(--t-h3)' }}>
          Every wording recommendation rests on this gap
        </h3>
        <p className="text-stone-400 mt-0.5" style={{ fontSize: 'var(--t-small)' }}>
          Counted live from the claim ledger. Select a stage to open it in the evidence browser.
        </p>
      </header>

      <div className="p-5 space-y-2.5">
        {stages.map((s, i) => {
          const terminal = s.n === 0;
          return (
            <button
              key={s.id}
              onClick={() => onDrill(s.id)}
              className="w-full grid items-center gap-3 group text-left py-1 px-1.5 -mx-1.5 rounded hover:bg-stone-900 transition"
              style={{ gridTemplateColumns: 'minmax(140px, 232px) 1fr 3rem' }}
            >
              <span className="min-w-0">
                <span className="block text-stone-300 group-hover:text-stone-100 transition truncate" style={{ fontSize: 'var(--t-small)' }}>
                  {s.label}
                </span>
                <span className="block text-stone-500 truncate" style={{ fontSize: 'var(--t-micro)' }}>{s.note}</span>
              </span>

              <span className="relative block h-7 rounded" style={{ background: 'var(--chart-grid)' }}>
                {terminal ? (
                  // A visible zero line, so an empty bar is never mistaken for missing data.
                  <span className="absolute inset-y-0 left-0 block w-[3px] rounded-l" style={{ background: 'var(--status-critical)' }} />
                ) : (
                  <span
                    className="absolute inset-y-0 left-0 block rounded transition-[width] duration-300"
                    style={{ width: `${(s.n / max) * 100}%`, background: ordinalStep(stages.length - i, stages.length) }}
                  />
                )}
              </span>

              <span
                className="font-mono font-bold tabular-nums text-right"
                style={{
                  fontSize: terminal ? 'var(--t-h3)' : 'var(--t-body)',
                  color: terminal ? 'var(--status-critical)' : 'var(--chart-label-strong)',
                }}
              >
                {s.n}
              </span>
            </button>
          );
        })}
      </div>

      <footer className="px-5 py-3 border-t border-stone-800 text-stone-500" style={{ fontSize: 'var(--t-micro)' }}>
        <span className="font-mono uppercase tracking-wider">Does not represent</span> a sequence of exclusions.
        The stages are overlapping counts over the same ledger, not a pipeline in which each row passes through
        the one above it. The last row is the intersection of the two rows before it.
      </footer>
    </section>
  );
};
