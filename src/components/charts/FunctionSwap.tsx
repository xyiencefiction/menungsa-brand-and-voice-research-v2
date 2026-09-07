import React, { useState } from 'react';
import type { ManosphereAlternative } from '../../types';
import { ordinalStep } from './chartUtils';

interface Props {
  alternatives: ManosphereAlternative[];
  selectedFunction?: string;
  onSelect: (functionName: string) => void;
}

/**
 * The same need, served two ways.
 *
 * Laid out with CSS rather than inside an SVG viewBox, and deliberately so. This figure
 * has no scale, no axis and nothing quantitative to encode: it is three columns of prose
 * with a line between them. Fitting prose into a fixed viewBox means guessing box
 * heights in advance, and a guess that is wrong in English is wrong differently in
 * Indonesian, where the same sentences run longer. Every version of that guess ended in
 * clipped text. Letting the browser size the rows removes the guess, so the boxes grow
 * to whatever the sentence needs in whatever language it is read in.
 *
 * The argument the layout has to carry is that the need in the middle is legitimate and
 * the two implementations are not equivalent. So the need is the spine, and the harmful
 * branch is drawn in the categorical warning role rather than anywhere on the evidence
 * ramp, because it is not a weaker version of the same thing.
 */
export const FunctionSwap: React.FC<Props> = ({ alternatives, selectedFunction, onSelect }) => {
  const [side, setSide] = useState<'both' | 'harmful' | 'ethical'>('both');
  const [hover, setHover] = useState<string | null>(null);

  const showHarmful = side !== 'ethical';
  const showEthical = side !== 'harmful';
  const cols = `${showHarmful ? '1fr 28px ' : ''}minmax(160px, 0.72fr)${showEthical ? ' 28px 1fr' : ''}`;

  return (
    <div className="rounded-xl border border-stone-800 bg-stone-950 overflow-hidden">
      <header className="px-5 py-3.5 border-b border-stone-800 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-serif font-semibold text-stone-100" style={{ fontSize: 'var(--t-h3)' }}>
            One need, two implementations
          </h3>
          <p className="text-stone-400 mt-0.5" style={{ fontSize: 'var(--t-small)' }}>
            The spine is the legitimate need. The branches are not equivalent options.
          </p>
        </div>
        <div className="flex gap-1">
          {(['both', 'harmful', 'ethical'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSide(s)}
              className={`px-2 py-1 rounded font-mono border transition ${
                side === s
                  ? 'bg-[#af4d28] text-stone-100 font-semibold border-[#893412]'
                  : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-stone-200'
              }`}
              style={{ fontSize: 'var(--t-micro)' }}
            >
              {s === 'both' ? 'Both' : s === 'harmful' ? 'Harmful only' : 'Ethical only'}
            </button>
          ))}
        </div>
      </header>

      <div className="p-4 space-y-2">
        {/* column headings */}
        <div
          className="swap-row hidden md:grid items-end pb-1"
          style={{ ['--swap-cols' as string]: cols }}
        >
          {showHarmful && (
            <>
              <span className="font-mono uppercase tracking-wider" style={{ fontSize: 'var(--t-micro)', color: 'var(--cat-2)' }}>
                Harmful implementation
              </span>
              <span />
            </>
          )}
          <span className="font-mono uppercase tracking-wider text-center text-stone-400" style={{ fontSize: 'var(--t-micro)' }}>
            Legitimate need
          </span>
          {showEthical && (
            <>
              <span />
              <span className="font-mono uppercase tracking-wider text-right" style={{ fontSize: 'var(--t-micro)', color: 'var(--ord-6)' }}>
                Ethical equivalent
              </span>
            </>
          )}
        </div>

        {alternatives.map((a) => {
          const isActive = selectedFunction === a.functionName || hover === a.functionName;
          const dim = (selectedFunction || hover) && !isActive ? 0.42 : 1;

          return (
            <div
              key={a.functionName}
              role="button"
              tabIndex={0}
              aria-label={`${a.functionName}: need is ${a.underlyingNeed}`}
              onMouseEnter={() => setHover(a.functionName)}
              onMouseLeave={() => setHover(null)}
              onClick={() => onSelect(a.functionName)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(a.functionName); }
              }}
              className="swap-row items-stretch cursor-pointer rounded-lg transition-opacity chart-focusable"
              style={{ opacity: dim, ['--swap-cols' as string]: cols }}
            >
              {showHarmful && (
                <>
                  <div
                    className="rounded-lg px-3 py-2.5 leading-relaxed"
                    style={{
                      border: '1.5px dashed var(--cat-2)',
                      color: 'var(--cat-2)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--t-micro)',
                    }}
                  >
                    {a.harmfulImplementation}
                  </div>
                  <div className="hidden md:flex items-center" aria-hidden>
                    <span className="w-full" style={{ height: 2, background: 'var(--cat-2)', opacity: 0.55 }} />
                  </div>
                </>
              )}

              <div
                className="rounded-lg px-3 py-2.5 flex flex-col items-center justify-center text-center gap-1"
                style={{
                  background: 'var(--chart-surface)',
                  border: `${isActive ? 2 : 1}px solid ${isActive ? 'var(--accent)' : 'var(--chart-grid)'}`,
                }}
              >
                <span
                  className="leading-snug"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-small)', color: 'var(--chart-label-strong)' }}
                >
                  {a.functionName}
                </span>
                <span className="font-mono text-stone-500" style={{ fontSize: 'var(--t-micro)' }}>
                  {a.mechanismId}
                </span>
              </div>

              {showEthical && (
                <>
                  <div className="hidden md:flex items-center" aria-hidden>
                    <span className="w-full" style={{ height: 2, background: ordinalStep(5, 5), opacity: 0.8 }} />
                  </div>
                  <div
                    className="rounded-lg px-3 py-2.5 leading-relaxed"
                    style={{
                      background: ordinalStep(4, 5),
                      color: 'var(--ord-ink-hi)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--t-micro)',
                    }}
                  >
                    {a.ethicalAlternative}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      <footer className="px-5 py-3 border-t border-stone-800 text-stone-500" style={{ fontSize: 'var(--t-micro)' }}>
        <span className="font-mono uppercase tracking-wider">Does not represent</span> a measured comparison.
        No study tested the ethical wording against the harmful wording. The claim here is about what function each
        one serves, and the harmful branch is drawn off the evidence ramp because it is not a weaker version of the
        same thing.
      </footer>
    </div>
  );
};
