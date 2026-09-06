import React, { useState } from 'react';
import type { Channel, ToneContext } from '../../types';
import { ordinalStep } from './chartUtils';
import { SvgLabel } from './SvgLabel';

interface Props {
  channels: Channel[];
  contexts: ToneContext[];
  selectedId?: string;
  onSelect: (channelId: string) => void;
}

type Cell = { state: 'RUNS' | 'AVOID' | 'UNSPECIFIED'; why?: string };

function cellFor(channel: Channel, contextId: string): Cell {
  const avoid = channel.avoidHere.find((a) => a.contextId === contextId);
  if (avoid) return { state: 'AVOID', why: avoid.why };
  if (channel.contextIds.includes(contextId)) return { state: 'RUNS' };
  return { state: 'UNSPECIFIED' };
}

const CELL = 34;
const ROW = 50;
const LEFT = 232;
const TOP = 76;

/**
 * Which communicative job runs on which surface, and the reason the axis exists.
 *
 * The organising variable down the left is not platform preference, it is exposure:
 * how visible the reader becomes to other people by responding. That is the response
 * cost mechanism, which is the most convergent finding in the corpus, so the rows are
 * ordered by it. A crossed cell is a documented objection, not an absence of guidance.
 */
export const ChannelMatrix: React.FC<Props> = ({ channels, contexts, selectedId, onSelect }) => {
  const [hover, setHover] = useState<{ channel: Channel; context: ToneContext; cell: Cell } | null>(null);
  const rows = [...channels].sort((a, b) => a.exposureLevel - b.exposureLevel);
  const W = LEFT + contexts.length * CELL + 90;
  const H = TOP + rows.length * ROW + 18;

  return (
    <div className="rounded-xl border border-stone-800 bg-stone-950 overflow-hidden">
      <header className="px-5 py-3.5 border-b border-stone-800">
        <h3 className="font-serif font-semibold text-stone-100" style={{ fontSize: 'var(--t-h3)' }}>
          Which job runs on which surface
        </h3>
        <p className="text-stone-400 mt-0.5" style={{ fontSize: 'var(--t-small)' }}>
          Rows are ordered by how visible responding makes him. Hover a cell for the reasoning; click a row to open the channel.
        </p>
      </header>

      <div className="p-4 overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto block"
          style={{ minWidth: W * 0.78 }}
          role="img"
          aria-label="Matrix of seven delivery channels against fourteen tone contexts"
        >
          <title>Channel by tone-context suitability matrix</title>

          {contexts.map((c, i) => (
            <text
              key={c.context_id}
              className="chart-tick"
              transform={`translate(${LEFT + i * CELL + CELL / 2}, ${TOP - 10}) rotate(-90)`}
              textAnchor="start"
            >
              {c.context_id}
            </text>
          ))}
          <SvgLabel x={LEFT + contexts.length * CELL + 12} y={TOP - 22} width={80} height={18} lines={1}>
            Exposure
          </SvgLabel>

          {rows.map((ch, r) => {
            const y = TOP + r * ROW;
            const isSelected = ch.id === selectedId;
            return (
              <g key={ch.id}>
                <rect
                  x={0} y={y} width={W} height={ROW}
                  fill={isSelected ? 'var(--chart-grid)' : 'transparent'}
                  opacity={isSelected ? 0.7 : 1}
                />
                <g
                  className="chart-mark-interactive"
                  onClick={() => onSelect(ch.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelect(ch.id);
                    }
                  }}
                  aria-label={`${ch.channel}, exposure ${ch.exposureLevel} of 5`}
                >
                  <rect x={0} y={y} width={LEFT - 8} height={ROW} fill="transparent" />
                  <SvgLabel x={8} y={y + 5} width={LEFT - 56} height={ROW - 10}
                    tone={isSelected ? 'strong' : 'label'} lines={3}>
                    {ch.channel}
                  </SvgLabel>
                  <text x={LEFT - 16} y={y + ROW / 2 + 4} textAnchor="end" className="chart-tick">
                    {ch.id}
                  </text>
                </g>

                {contexts.map((c, i) => {
                  const cell = cellFor(ch, c.context_id);
                  const cx = LEFT + i * CELL + CELL / 2;
                  const cy = y + ROW / 2;
                  const isHover = hover?.channel.id === ch.id && hover?.context.context_id === c.context_id;
                  return (
                    <g
                      key={c.context_id}
                      className="chart-mark-interactive"
                      onMouseEnter={() => setHover({ channel: ch, context: c, cell })}
                      onMouseLeave={() => setHover(null)}
                    >
                      <rect x={cx - CELL / 2} y={y} width={CELL} height={ROW} fill="transparent" />
                      {cell.state === 'RUNS' && (
                        <rect
                          x={cx - 11} y={cy - 11} width={22} height={22} rx={5}
                          fill={ordinalStep(5 - ch.exposureLevel + 1, 5)}
                          stroke={isHover ? 'var(--accent)' : 'none'}
                          strokeWidth={2}
                          className="chart-mark"
                        />
                      )}
                      {cell.state === 'AVOID' && (
                        <g stroke={isHover ? 'var(--accent)' : 'var(--cat-2)'} strokeWidth={2} strokeLinecap="round">
                          <line x1={cx - 7} y1={cy - 7} x2={cx + 7} y2={cy + 7} />
                          <line x1={cx + 7} y1={cy - 7} x2={cx - 7} y2={cy + 7} />
                        </g>
                      )}
                      {cell.state === 'UNSPECIFIED' && (
                        <circle cx={cx} cy={cy} r={2} fill="var(--chart-muted)" />
                      )}
                    </g>
                  );
                })}

                {/* exposure, the variable the whole axis is built on */}
                <g>
                  {[1, 2, 3, 4, 5].map((step) => (
                    <rect
                      key={step}
                      x={LEFT + contexts.length * CELL + 12 + (step - 1) * 11}
                      y={y + ROW / 2 - 6}
                      width={8} height={12} rx={2}
                      fill={step <= ch.exposureLevel ? 'var(--cat-2)' : 'var(--chart-muted)'}
                      opacity={step <= ch.exposureLevel ? 0.9 : 0.4}
                    />
                  ))}
                </g>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="px-5 py-3 border-t border-stone-800 flex flex-wrap items-center gap-4 text-stone-400"
        style={{ fontSize: 'var(--t-micro)' }}>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block w-3.5 h-3.5 rounded" style={{ background: 'var(--ord-5)' }} /> Runs here
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="font-bold" style={{ color: 'var(--cat-2)' }}>✕</span> Documented objection
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: 'var(--chart-muted)' }} /> No guidance recorded
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block w-2 h-3" style={{ background: 'var(--cat-2)' }} /> Exposure when responding
        </span>
      </div>

      {hover && (
        <div className="px-5 py-3 border-t border-stone-800 bg-stone-900/40 space-y-1">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="font-mono text-stone-500" style={{ fontSize: 'var(--t-micro)' }}>
              {hover.channel.id} × {hover.context.context_id}
            </span>
            <span className="text-stone-200" style={{ fontSize: 'var(--t-small)' }}>
              {hover.context.context}
            </span>
          </div>
          <p className="text-stone-300 leading-relaxed" style={{ fontSize: 'var(--t-small)' }}>
            {hover.cell.state === 'AVOID'
              ? hover.cell.why
              : hover.cell.state === 'RUNS'
                ? hover.channel.channelRule
                : 'No guidance was recorded for this pairing. That is an absence in the synthesis, not a permission.'}
          </p>
        </div>
      )}

      <footer className="px-5 py-3 border-t border-stone-800 text-stone-500" style={{ fontSize: 'var(--t-micro)' }}>
        <span className="font-mono uppercase tracking-wider">Does not represent</span> measured platform performance.
        Platform evidence in this corpus is weak and the Indonesian platform mapping is assertion rather than
        measurement. Exposure levels are analyst judgements about who can see a response, not observed rates.
      </footer>
    </div>
  );
};
