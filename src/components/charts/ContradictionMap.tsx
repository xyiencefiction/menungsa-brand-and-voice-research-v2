import React, { useState } from 'react';
import type { Contradiction, Domain } from '../../types';
import { ordinalStep } from './chartUtils';
import { SvgLabel } from './SvgLabel';

interface Props {
  contradictions: Contradiction[];
  domains: Domain[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

/** "RESOLVED BY DECOMPOSITION" carries the lesson; the word RESOLVED alone does not. */
function resolutionKind(status: string): string {
  const s = status.toUpperCase();
  if (s.startsWith('UNRESOLVED')) return 'Unresolved';
  const by = status.match(/RESOLVED\s*(?:BY|-)?\s*(.*)/i)?.[1]?.trim();
  if (!by) return 'Resolved';
  return by.charAt(0).toUpperCase() + by.slice(1).toLowerCase();
}

const ROW = 44;
const CELL = 34;
const LEFT = 330;
const TOP = 62;

/**
 * Twelve apparent contradictions, grouped by what was actually being conflated.
 *
 * The static figure listed them; the useful question is why eleven dissolve. Sorting by
 * the kind of resolution turns the list into a short taxonomy of conflations, and the
 * domain columns show the other half of the answer: almost every dispute spans several
 * domains, so the contradiction lives between literatures rather than inside one.
 */
export const ContradictionMap: React.FC<Props> = ({ contradictions, domains, selectedId, onSelect }) => {
  const [hover, setHover] = useState<Contradiction | null>(null);
  const rows = [...contradictions].sort((a, b) => {
    const au = a.status.toUpperCase().startsWith('UNRESOLVED') ? 1 : 0;
    const bu = b.status.toUpperCase().startsWith('UNRESOLVED') ? 1 : 0;
    return au - bu || resolutionKind(a.status).localeCompare(resolutionKind(b.status));
  });
  const W = LEFT + domains.length * CELL + 30;
  const H = TOP + rows.length * ROW + 16;
  const active = hover ?? contradictions.find((c) => c.id === selectedId) ?? null;

  return (
    <div className="rounded-xl border border-stone-800 bg-stone-950 overflow-hidden">
      <header className="px-5 py-3.5 border-b border-stone-800">
        <h3 className="font-serif font-semibold text-stone-100" style={{ fontSize: 'var(--t-h3)' }}>
          What was actually being conflated
        </h3>
        <p className="text-stone-400 mt-0.5" style={{ fontSize: 'var(--t-small)' }}>
          Grouped by the kind of variable that separates the two sides. Hover for the distinguishing variable.
        </p>
      </header>

      <div className="p-4 overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block" style={{ minWidth: 700 }}
          role="img" aria-label="Twelve contradictions grouped by resolution type against the seven research domains">
          <title>Contradictions and boundary conditions</title>

          {domains.map((d, i) => (
            <text key={d.id} x={LEFT + i * CELL + CELL / 2} y={TOP - 12} textAnchor="middle" className="chart-tick">
              {d.id}
            </text>
          ))}
          <SvgLabel x={12} y={TOP - 24} width={LEFT - 60} height={18} lines={1}>Resolved by</SvgLabel>

          {rows.map((c, r) => {
            const y = TOP + r * ROW;
            const unresolved = c.status.toUpperCase().startsWith('UNRESOLVED');
            const isActive = active?.id === c.id;
            const dim = active && !isActive ? 0.32 : 1;
            const spans = c.source_domains.split(/[;,]/).map((s) => s.trim().toUpperCase());
            const kind = resolutionKind(c.status);

            return (
              <g key={c.id} className="chart-mark-interactive" opacity={dim}
                onMouseEnter={() => setHover(c)}
                onMouseLeave={() => setHover(null)}
                onClick={() => onSelect(c.id)}
                role="button" tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(c.id); } }}
                aria-label={`${c.id}: ${kind}`}
              >
                <rect x={0} y={y} width={W} height={ROW - 4} rx={5}
                  fill={isActive ? 'var(--chart-grid)' : 'transparent'} />
                <SvgLabel x={12} y={y + 4} width={LEFT - 60} height={ROW - 12}
                  tone={unresolved ? 'warn' : 'strong'} lines={2}>
                  {kind}
                </SvgLabel>
                <text x={LEFT - 16} y={y + ROW / 2 + 1} textAnchor="end" className="chart-tick">
                  {c.id}
                </text>

                {domains.map((d, i) => {
                  const on = spans.includes(d.id.toUpperCase());
                  const cx = LEFT + i * CELL + CELL / 2;
                  const cy = y + ROW / 2 - 2;
                  if (!on) return <circle key={d.id} cx={cx} cy={cy} r={2} fill="var(--chart-muted)" />;
                  return unresolved ? (
                    <circle key={d.id} cx={cx} cy={cy} r={7} fill="none" stroke="var(--cat-2)" strokeWidth={2}
                      className="chart-mark" />
                  ) : (
                    <circle key={d.id} cx={cx} cy={cy} r={7} fill={ordinalStep(4, 5)} className="chart-mark" />
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>

      {active && (
        <div className="px-5 py-3 border-t border-stone-800 bg-stone-900/40 space-y-1">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="font-mono text-stone-500" style={{ fontSize: 'var(--t-micro)' }}>{active.id}</span>
            <span className="text-stone-200" style={{ fontSize: 'var(--t-small)' }}>{active.apparent_contradiction}</span>
          </div>
          <p className="text-stone-300 leading-relaxed" style={{ fontSize: 'var(--t-small)' }}>
            {active.actual_distinguishing_variable}
          </p>
        </div>
      )}

      <footer className="px-5 py-3 border-t border-stone-800 text-stone-500" style={{ fontSize: 'var(--t-micro)' }}>
        <span className="font-mono uppercase tracking-wider">Does not represent</span> independent disagreement.
        Domains share underlying literature, so a contradiction spanning four columns may rest on the same handful
        of studies read four ways. The hollow row is the one dispute the corpus does not resolve.
      </footer>
    </div>
  );
};
