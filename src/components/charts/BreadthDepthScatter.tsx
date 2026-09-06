import React, { useMemo, useState } from 'react';
import { intersections, confidenceTier, CONFIDENCE_LABEL, type ConfidenceTier } from '../../data';
import { scaleLinear, ticks, tierFill, tierStroke, jitter } from './chartUtils';
import { Table2, ScatterChart } from 'lucide-react';

interface Props {
  selectedId?: string;
  onSelect: (mechanismId: string) => void;
}

const W = 760;
const H = 420;
const M = { top: 34, right: 108, bottom: 56, left: 62 };

/**
 * Domain breadth against unique underlying studies, the corpus's central epistemic
 * claim: recurrence is not strength.
 *
 * These two numbers previously sat as adjacent text columns in a table, so comparing
 * twenty pairs was left to the reader. As position they separate immediately: M06
 * (autonomy / reactance) sits low-left yet carries the heaviest fill, narrow but
 * strongest; M01 (response cost) sits far right yet lightest, wide but weakest.
 */
export const BreadthDepthScatter: React.FC<Props> = ({ selectedId, onSelect }) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [showTable, setShowTable] = useState(false);

  const points = useMemo(() => {
    const rows = intersections.map((r) => ({
      id: r.mechanism_id,
      name: r.mechanism.split('/')[0].trim(),
      breadth: parseInt(r.domain_breadth_moderate_or_above, 10),
      studies: parseInt(r.unique_underlying_studies, 10),
      tier: confidenceTier(r.evidence_strength),
      verbatim: r.evidence_strength,
      note: r.interpretation_note,
    }));

    // Coincident coordinates are themselves a finding: five mechanisms share (4, 6).
    const groups = new Map<string, typeof rows>();
    for (const row of rows) {
      const key = `${row.breadth}:${row.studies}`;
      groups.set(key, [...(groups.get(key) ?? []), row]);
    }

    return rows.map((row) => {
      const key = `${row.breadth}:${row.studies}`;
      const group = groups.get(key)!;
      const offset = jitter(group.indexOf(row), group.length, group.length > 2 ? 13 : 9);
      return { ...row, ...offset, groupSize: group.length };
    });
  }, []);

  const breadths = points.map((p) => p.breadth);
  const studies = points.map((p) => p.studies);
  const x = scaleLinear(Math.min(...breadths) - 0.5, Math.max(...breadths) + 0.5, M.left, W - M.right);
  const y = scaleLinear(Math.min(...studies) - 1, Math.max(...studies) + 1, H - M.bottom, M.top);

  const xTicks = ticks(Math.min(...breadths), Math.max(...breadths));
  const yTicks = ticks(Math.ceil(Math.min(...studies) / 2) * 2, Math.max(...studies), 2);

  // Label only the extremes and the two points that carry the argument.
  const LABELLED = new Set(['M04', 'M09', 'M02', 'M01', 'M06', 'M10', 'M11', 'M16', 'M18']);
  const active = hovered ?? selectedId ?? null;
  const activePoint = points.find((p) => p.id === active);

  const legend: { tier: ConfidenceTier; label: string }[] = [
    { tier: 'PROMISING', label: 'Tentative' },
    { tier: 'MODERATE', label: 'Moderate' },
    { tier: 'MODERATE-STRONG', label: 'Mod–strong' },
    { tier: 'STRONG', label: 'Strong' },
    { tier: 'MIXED', label: 'Mixed' },
  ];

  return (
    <div className="rounded-xl border border-stone-800 bg-stone-950 overflow-hidden">
      <header className="px-5 py-3.5 border-b border-stone-800 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h3 className="font-serif font-semibold text-stone-100" style={{ fontSize: 'var(--t-h3)' }}>
            Breadth does not predict strength
          </h3>
          <p className="text-stone-400 mt-0.5" style={{ fontSize: 'var(--t-small)' }}>
            Each mechanism placed by how many domains support it against how many unique studies stand behind it.
          </p>
        </div>
        <button
          onClick={() => setShowTable((s) => !s)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 font-mono transition shrink-0"
          style={{ fontSize: 'var(--t-micro)' }}
        >
          {showTable ? <ScatterChart size={13} /> : <Table2 size={13} />}
          <span>{showTable ? 'Show plot' : 'Show table'}</span>
        </button>
      </header>

      {showTable ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left" style={{ fontSize: 'var(--t-small)' }}>
            <thead>
              <tr className="border-b border-stone-800 font-mono text-stone-400 uppercase" style={{ fontSize: 'var(--t-micro)' }}>
                <th className="p-2.5">Mechanism</th>
                <th className="p-2.5 text-right">Breadth</th>
                <th className="p-2.5 text-right">Studies</th>
                <th className="p-2.5">Evidence strength</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60">
              {[...points]
                .sort((a, b) => b.breadth - a.breadth || b.studies - a.studies)
                .map((p) => (
                  <tr
                    key={p.id}
                    onClick={() => onSelect(p.id)}
                    className="cursor-pointer hover:bg-stone-900/60"
                  >
                    <td className="p-2.5">
                      <span className="font-mono text-amber-400 mr-2">{p.id}</span>
                      <span className="text-stone-200">{p.name}</span>
                    </td>
                    <td className="p-2.5 text-right font-mono text-stone-300 tabular-nums">{p.breadth} / 7</td>
                    <td className="p-2.5 text-right font-mono text-stone-300 tabular-nums">{p.studies}</td>
                    <td className="p-2.5 text-stone-400">{p.verbatim}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="relative">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block" role="img"
            aria-label="Scatter plot of twenty mechanisms: domain breadth against unique underlying studies">
            <title>Domain breadth against unique underlying studies, 20 mechanisms</title>

            <g className="chart-grid">
              {xTicks.map((t) => (
                <line key={`vx${t}`} x1={x(t)} y1={M.top} x2={x(t)} y2={H - M.bottom} />
              ))}
              {yTicks.map((t) => (
                <line key={`hy${t}`} x1={M.left} y1={y(t)} x2={W - M.right} y2={y(t)} />
              ))}
            </g>

            {xTicks.map((t) => (
              <text key={`xt${t}`} x={x(t)} y={H - M.bottom + 20} textAnchor="middle" className="chart-tick">{t}</text>
            ))}
            {yTicks.map((t) => (
              <text key={`yt${t}`} x={M.left - 12} y={y(t) + 4} textAnchor="end" className="chart-tick">{t}</text>
            ))}

            <text x={(M.left + W - M.right) / 2} y={H - 14} textAnchor="middle" className="chart-axis-label">
              domains with support at moderate or above
            </text>
            <text x={18} y={(M.top + H - M.bottom) / 2} textAnchor="middle" className="chart-axis-label"
              transform={`rotate(-90 18 ${(M.top + H - M.bottom) / 2})`}>
              unique studies after dedup
            </text>

            {/* Legend: identity is never carried by colour alone, so the tier is named. */}
            <g>
              <text x={M.left} y={18} className="chart-axis-label">evidence</text>
              {legend.map((l, i) => {
                const cx = M.left + 66 + i * 96;
                return (
                  <g key={l.tier}>
                    <circle cx={cx} cy={14} r={5} fill={tierFill(l.tier)} stroke={tierStroke(l.tier)} strokeWidth={tierStroke(l.tier) ? 2.5 : 0} />
                    <text x={cx + 9} y={18} className="chart-axis-label">{l.label}</text>
                  </g>
                );
              })}
            </g>

            {points.map((p) => {
              const cx = x(p.breadth) + p.dx;
              const cy = y(p.studies) + p.dy;
              const isActive = active === p.id;
              const stroke = tierStroke(p.tier);
              return (
                <g key={p.id}>
                  {/* Hit area larger than the mark, per minimum target size. */}
                  <circle
                    cx={cx} cy={cy} r={13} fill="transparent"
                    className="chart-mark-interactive chart-focusable"
                    tabIndex={0}
                    role="button"
                    aria-label={`${p.id} ${p.name}, ${p.breadth} domains, ${p.studies} studies, ${CONFIDENCE_LABEL[p.tier]}`}
                    onMouseEnter={() => setHovered(p.id)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(p.id)}
                    onBlur={() => setHovered(null)}
                    onClick={() => onSelect(p.id)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(p.id); } }}
                  />
                  <circle
                    cx={cx} cy={cy} r={isActive ? 8 : 6}
                    fill={tierFill(p.tier)}
                    stroke={stroke ?? 'var(--chart-surface)'}
                    strokeWidth={stroke ? 2.5 : 2}
                    pointerEvents="none"
                  />
                  {isActive && (
                    <circle cx={cx} cy={cy} r={13} fill="none" stroke="var(--accent)" strokeWidth={1.5} pointerEvents="none" />
                  )}
                </g>
              );
            })}

            {points.filter((p) => LABELLED.has(p.id)).map((p) => {
              const cx = x(p.breadth) + p.dx;
              const cy = y(p.studies) + p.dy;
              const toRight = p.breadth <= 4;
              return (
                <text
                  key={`l${p.id}`}
                  x={cx + (toRight ? 12 : -12)}
                  y={cy + 4}
                  textAnchor={toRight ? 'start' : 'end'}
                  className="chart-mark-label"
                  pointerEvents="none"
                >
                  {p.id}
                </text>
              );
            })}
          </svg>

          {activePoint && (
            <div className="absolute left-4 bottom-4 max-w-sm p-3 rounded-lg bg-stone-900 border border-stone-700 shadow-xl pointer-events-none"
              style={{ fontSize: 'var(--t-small)' }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono font-bold text-amber-300" style={{ fontSize: 'var(--t-micro)' }}>{activePoint.id}</span>
                <span className="text-stone-100 font-medium">{activePoint.name}</span>
              </div>
              <div className="font-mono text-stone-400 tabular-nums" style={{ fontSize: 'var(--t-micro)' }}>
                {activePoint.breadth} of 7 domains · {activePoint.studies} unique studies · {CONFIDENCE_LABEL[activePoint.tier]}
              </div>
              {activePoint.groupSize > 1 && (
                <div className="mt-1.5 text-stone-400" style={{ fontSize: 'var(--t-micro)' }}>
                  Shares this exact coordinate with {activePoint.groupSize - 1} other mechanism{activePoint.groupSize > 2 ? 's' : ''}.
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <footer className="px-5 py-3 border-t border-stone-800 text-stone-400" style={{ fontSize: 'var(--t-micro)' }}>
        <span className="font-mono uppercase tracking-wider text-stone-500">Does not represent</span>{' '}
        effect size. Both axes are counts, not magnitudes; no effect size was measured for these mechanisms,
        and a wide, well-populated position says nothing on its own about how well a message will work.
      </footer>
    </div>
  );
};
