import React, { useState } from 'react';
import type { IndonesiaContrast } from '../../types';
import { scaleLinear } from './chartUtils';
import { SvgLabel } from './SvgLabel';

interface Props {
  contrasts: IndonesiaContrast[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

const STATUS_COLOR: Record<IndonesiaContrast['status'], string> = {
  CONVERGES: 'var(--ord-5)',
  DIVERGES: 'var(--cat-2)',
  GAP: 'var(--chart-muted)',
};

const ROW = 52;
const M = { top: 56, right: 152, bottom: 34, left: 310 };
const W = 800;

/**
 * What transfers from the global literature and what does not.
 *
 * Only four of these dimensions carry paired numbers, and those numbers are coding
 * frequencies across a 154-study synthesis rather than prevalence in any population.
 * Drawing the quantified rows as slopes and the rest as status markers keeps that
 * distinction visible: the chart shows where the corpus can count and where it can
 * only classify, instead of flattening both into one bar.
 */
export const IndonesiaContrastChart: React.FC<Props> = ({ contrasts, selectedId, onSelect }) => {
  const [hover, setHover] = useState<IndonesiaContrast | null>(null);
  const H = M.top + contrasts.length * ROW + M.bottom;
  const x = scaleLinear(0, 100, M.left, W - M.right);
  const active = hover ?? contrasts.find((c) => c.id === selectedId) ?? null;

  return (
    <div className="rounded-xl border border-stone-800 bg-stone-950 overflow-hidden">
      <header className="px-5 py-3.5 border-b border-stone-800">
        <h3 className="font-serif font-semibold text-stone-100" style={{ fontSize: 'var(--t-h3)' }}>
          What transfers, and what does not
        </h3>
        <p className="text-stone-400 mt-0.5" style={{ fontSize: 'var(--t-small)' }}>
          Four dimensions carry counts. The rest can only be classified. Hover any row for the reasoning.
        </p>
      </header>

      <div className="p-4 overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block" style={{ minWidth: 760 }}
          role="img" aria-label="Indonesian configuration compared with the global literature across eleven dimensions">
          <title>Indonesia versus global configuration</title>

          <text x={x(0)} y={M.top - 26} textAnchor="middle" className="chart-axis-label">Global North</text>
          <text x={x(100)} y={M.top - 26} textAnchor="middle" className="chart-axis-label">Global South</text>
          <g className="chart-grid">
            {[0, 25, 50, 75, 100].map((v) => (
              <line key={v} x1={x(v)} y1={M.top - 16} x2={x(v)} y2={H - M.bottom} />
            ))}
          </g>
          {[0, 50, 100].map((v) => (
            <text key={v} x={x(v)} y={M.top - 8} textAnchor="middle" className="chart-tick">{v}%</text>
          ))}

          {contrasts.map((c, i) => {
            const y = M.top + i * ROW + ROW / 2;
            const isActive = active?.id === c.id;
            const dim = active && !isActive ? 0.3 : 1;
            const quantified = typeof c.north === 'number' && typeof c.south === 'number';
            return (
              <g key={c.id} className="chart-mark-interactive" opacity={dim}
                onMouseEnter={() => setHover(c)}
                onMouseLeave={() => setHover(null)}
                onClick={() => onSelect(c.id)}
                role="button" tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(c.id); } }}
                aria-label={`${c.dimension}: ${c.status.toLowerCase()}`}
              >
                <rect x={0} y={y - ROW / 2} width={W} height={ROW} fill="transparent" />
                <SvgLabel x={8} y={y - ROW / 2 + 6} width={M.left - 24} height={ROW - 12}
                  align="end" tone={isActive ? 'strong' : 'label'} lines={3}>
                  {c.dimension}
                </SvgLabel>

                {quantified ? (
                  <>
                    <line x1={x(c.north!)} y1={y} x2={x(c.south!)} y2={y}
                      stroke={STATUS_COLOR[c.status]} strokeWidth={isActive ? 4 : 3} strokeLinecap="round" />
                    <circle cx={x(c.north!)} cy={y} r={5} fill="var(--chart-surface)"
                      stroke={STATUS_COLOR[c.status]} strokeWidth={2} className="chart-mark" />
                    <circle cx={x(c.south!)} cy={y} r={5} fill={STATUS_COLOR[c.status]} className="chart-mark" />
                    <text x={x(c.north!) - 9} y={y + 4} textAnchor="end" className="chart-tick">{c.north}</text>
                    <text x={x(c.south!) + 9} y={y + 4} className="chart-tick">{c.south}</text>
                  </>
                ) : (
                  <>
                    <line x1={M.left} y1={y} x2={W - M.right} y2={y}
                      stroke="var(--chart-grid)" strokeWidth={1} strokeDasharray="3 4" />
                    <text x={(M.left + W - M.right) / 2} y={y + 4} textAnchor="middle" className="chart-tick"
                      style={{ fill: 'var(--chart-label)' }}>
                      not counted, only classified
                    </text>
                  </>
                )}

                <rect x={W - M.right + 12} y={y - 9} width={118} height={18} rx={4}
                  fill={c.status === 'GAP' ? 'transparent' : STATUS_COLOR[c.status]}
                  stroke={c.status === 'GAP' ? 'var(--chart-label)' : 'none'}
                  strokeDasharray={c.status === 'GAP' ? '3 3' : undefined}
                  opacity={c.status === 'CONVERGES' ? 0.9 : 1} />
                <SvgLabel x={W - M.right + 12} y={y - 9} width={118} height={18} align="center" lines={1}
                  tone={c.status === 'GAP' ? 'label' : 'inkHi'} size={9.5}>
                  {c.status === 'CONVERGES' ? 'Transfers' : c.status === 'DIVERGES' ? 'Does not' : 'Evidence gap'}
                </SvgLabel>
              </g>
            );
          })}

          <SvgLabel x={M.left} y={H - 18} width={W - M.left - 12} height={16} lines={1} size={9.5}>
            Bars show how often each factor was coded, not how common it is in any population
          </SvgLabel>
        </svg>
      </div>

      {active && (
        <div className="px-5 py-3 border-t border-stone-800 bg-stone-900/40 space-y-1">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="font-mono text-stone-500" style={{ fontSize: 'var(--t-micro)' }}>{active.id}</span>
            <span className="text-stone-200" style={{ fontSize: 'var(--t-small)' }}>{active.dimension}</span>
          </div>
          <p className="text-stone-300 leading-relaxed" style={{ fontSize: 'var(--t-small)' }}>{active.note}</p>
        </div>
      )}

      <footer className="px-5 py-3 border-t border-stone-800 text-stone-500" style={{ fontSize: 'var(--t-micro)' }}>
        <span className="font-mono uppercase tracking-wider">Does not represent</span> prevalence.
        The percentages are how often a factor was coded across a 154-study synthesis, so a higher number means the
        literature discussed it more, not that more men experience it. Seven of the eleven rows carry no number at
        all, and that absence is drawn rather than filled in with an estimate.
      </footer>
    </div>
  );
};
