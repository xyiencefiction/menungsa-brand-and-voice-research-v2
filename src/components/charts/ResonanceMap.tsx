import React, { useState } from 'react';
import type { ResonanceState } from '../../types';
import { confidenceTier, CONFIDENCE_RANK } from '../../data/normalize';
import { tierFill, tierStroke, scaleLinear } from './chartUtils';
import { SvgLabel } from './SvgLabel';

interface Props {
  states: ResonanceState[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

/** Named in the resonance playbook as outcomes to avoid producing, not to calibrate. */
const AVOID = ['Anger and outrage', 'Shame', 'Threat', 'Defensiveness', 'Skepticism', 'Embarrassment'];

const W = 780;
const H = 470;
const M = { top: 46, right: 26, bottom: 74, left: 214 };

/**
 * Eleven target states, and the region of the space that is deliberately empty.
 *
 * The instruction this figure exists to carry is that emotional intensity is not the
 * objective. Plotting the states against arousal makes that visible as a shape: nothing
 * Menungsa aims for sits in the high-arousal column, and the states that would sit there
 * are the ones listed underneath as outcomes to avoid producing. A bar chart of eleven
 * states would have hidden exactly that.
 */
export const ResonanceMap: React.FC<Props> = ({ states, selectedId, onSelect }) => {
  const [hover, setHover] = useState<ResonanceState | null>(null);
  const x = scaleLinear(1, 3, M.left, W - M.right);
  const rows = [...states].sort(
    (a, b) => CONFIDENCE_RANK[confidenceTier(b.confidence)] - CONFIDENCE_RANK[confidenceTier(a.confidence)],
  );
  const rowH = (H - M.top - M.bottom) / rows.length;
  const active = hover ?? rows.find((r) => r.id === selectedId) ?? null;

  return (
    <div className="rounded-xl border border-stone-800 bg-stone-950 overflow-hidden">
      <header className="px-5 py-3.5 border-b border-stone-800">
        <h3 className="font-serif font-semibold text-stone-100" style={{ fontSize: 'var(--t-h3)' }}>
          What to aim for, and how hard
        </h3>
        <p className="text-stone-400 mt-0.5" style={{ fontSize: 'var(--t-small)' }}>
          Ordered by how well the underlying mechanism is evidenced. Hover a state for the way it backfires.
        </p>
      </header>

      <div className="p-4 overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block" style={{ minWidth: 700 }}
          role="img" aria-label="Eleven target emotional states plotted against arousal level, with the high-arousal region empty">
          <title>Emotional resonance target states by arousal</title>

          {/* the empty column is the argument */}
          <rect
            x={x(2.5)} y={M.top - 14} width={W - M.right - x(2.5)} height={H - M.top - M.bottom + 18}
            fill="var(--chart-muted)" opacity={0.16}
          />
          <SvgLabel x={x(2.5)} y={M.top - 30} width={W - M.right - x(2.5)} height={18}
            align="center" lines={1} tone="warn">
            deliberately empty
          </SvgLabel>

          <g className="chart-grid">
            {[1, 2, 3].map((v) => (
              <line key={v} x1={x(v)} y1={M.top - 14} x2={x(v)} y2={H - M.bottom + 4} />
            ))}
          </g>
          {[['Low arousal', 1], ['Moderate', 2], ['High arousal', 3]].map(([label, v]) => (
            <SvgLabel key={String(label)} x={(x(v as number)) - 60} y={H - M.bottom + 10} width={120} height={18}
              align="center" lines={1}>
              {label}
            </SvgLabel>
          ))}

          {rows.map((s, i) => {
            const y = M.top + i * rowH + rowH / 2;
            const isActive = active?.id === s.id;
            const dim = active && !isActive ? 0.3 : 1;
            const tier = confidenceTier(s.confidence);
            const cx = x(s.arousal === 'MODERATE' ? 2 : 1);
            return (
              <g key={s.id} className="chart-mark-interactive" opacity={dim}
                onMouseEnter={() => setHover(s)}
                onMouseLeave={() => setHover(null)}
                onClick={() => onSelect(s.id)}
                role="button" tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(s.id); } }}
                aria-label={`${s.state}, ${s.arousal.toLowerCase()} arousal, via ${s.mechanismId}`}
              >
                <rect x={0} y={y - rowH / 2} width={W} height={rowH} fill="transparent" />
                <SvgLabel x={6} y={y - rowH / 2 + 2} width={M.left - 20} height={rowH - 4}
                  align="end" tone={isActive ? 'strong' : 'label'} lines={2}>
                  {s.state}
                </SvgLabel>
                <line x1={M.left} y1={y} x2={cx} y2={y} stroke="var(--chart-axis)" strokeWidth={1} opacity={0.45} />
                <circle
                  cx={cx} cy={y} r={isActive ? 9 : 7}
                  fill={tierFill(tier)} stroke={tierStroke(tier) ?? 'var(--chart-surface)'} strokeWidth={2}
                  className="chart-mark"
                />
                <text x={cx + 16} y={y + 4} className="chart-tick">{s.mechanismId}</text>
              </g>
            );
          })}
        </svg>
      </div>

      {active && (
        <div className="px-5 py-3 border-t border-stone-800 bg-stone-900/40 space-y-1">
          <span className="font-mono text-stone-500 uppercase tracking-wider" style={{ fontSize: 'var(--t-micro)' }}>
            {active.id} · works through
          </span>
          <p className="text-stone-200 leading-relaxed" style={{ fontSize: 'var(--t-small)' }}>{active.workThrough}</p>
          <p className="leading-relaxed" style={{ fontSize: 'var(--t-small)', color: 'var(--cat-2)' }}>
            Backfires as: {active.backfireRisk}
          </p>
        </div>
      )}

      <div className="px-5 py-3 border-t border-stone-800 space-y-1.5">
        <span className="font-mono uppercase tracking-wider" style={{ fontSize: 'var(--t-micro)', color: 'var(--cat-2)' }}>
          States to avoid producing
        </span>
        <div className="flex flex-wrap gap-1.5">
          {AVOID.map((a) => (
            <span key={a} className="px-2 py-0.5 rounded border"
              style={{ fontSize: 'var(--t-micro)', borderColor: 'var(--cat-2)', color: 'var(--cat-2)' }}>
              {a}
            </span>
          ))}
        </div>
      </div>

      <footer className="px-5 py-3 border-t border-stone-800 text-stone-500" style={{ fontSize: 'var(--t-micro)' }}>
        <span className="font-mono uppercase tracking-wider">Does not represent</span> measured emotional response.
        Arousal here is a design target taken from the resonance playbook, not a rating anyone collected. The
        confidence ordering is inherited from the mechanism behind each state, not from a test of the state itself.
      </footer>
    </div>
  );
};
