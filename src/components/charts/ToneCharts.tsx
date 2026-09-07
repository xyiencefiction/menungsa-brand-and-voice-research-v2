import React, { useState } from 'react';
import type { ToneContext } from '../../types';
import { ordinalStep } from './chartUtils';

export interface ToneDimension {
  key: keyof ToneContext;
  name: string;
  short: string;
  left: string;
  right: string;
}

/** The ten ordinal axes of the tone space, shared by the matrix, the slopegraph and the sliders. */
export const TONE_DIMENSIONS: ToneDimension[] = [
  { key: 'authority_peerhood', name: 'Authority ↔ Peerhood', short: 'Auth', left: 'Institutional authority', right: 'Embedded peer' },
  { key: 'emotional_explicitness', name: 'Emotional explicitness', short: 'Emo', left: 'Coded / indirect', right: 'Named feelings' },
  { key: 'behavioural_explicitness', name: 'Behavioural explicitness', short: 'Behav', left: 'Open exploration', right: 'Concrete next step' },
  { key: 'agency_collectivity', name: 'Agency ↔ Collectivity', short: 'Agency', left: 'Individual agency', right: 'Relational / communal' },
  { key: 'seriousness_humour', name: 'Seriousness ↔ Humour', short: 'Humour', left: 'Grave / solemn', right: 'Irreverent / banter' },
  { key: 'gender_marking', name: 'Gender marking', short: 'Gender', left: 'Gender-unmarked', right: 'Explicitly masculine' },
  { key: 'moral_loading', name: 'Moral loading', short: 'Moral', left: 'Zero moral density', right: 'High moral density' },
  { key: 'cta_pressure', name: 'CTA pressure', short: 'CTA', left: 'Autonomy-preserving', right: 'Unambiguous directive' },
  { key: 'certainty', name: 'Certainty level', short: 'Certain', left: 'Openly uncertain', right: 'High certainty' },
  { key: 'register_formality', name: 'Register formality', short: 'Register', left: 'Formal standard ID', right: 'Colloquial vernacular' },
];

export function toneValue(ctx: ToneContext, key: keyof ToneContext): number {
  const parsed = parseInt(String(ctx[key] ?? ''), 10);
  return Number.isFinite(parsed) ? parsed : 3;
}

/* ── matrix ─────────────────────────────────────────────────── */

interface MatrixProps {
  contexts: ToneContext[];
  selected: string[];
  onSelect: (contextId: string, additive: boolean) => void;
}

/**
 * All 14 contexts by all 10 dimensions at once.
 *
 * The lab previously showed one context at a time as ten disabled sliders, so the
 * comparison that actually decides tone, what changes between two jobs, was the one
 * thing not visible. Seen together the columns speak: gender marking is suppressed
 * almost everywhere, and CTA pressure is low everywhere except the crisis row.
 */
export const ToneMatrix: React.FC<MatrixProps> = ({ contexts, selected, onSelect }) => {
  const [hover, setHover] = useState<{ ctx: ToneContext; dim: ToneDimension; v: number } | null>(null);

  return (
    <div className="rounded-xl border border-stone-800 bg-stone-950 overflow-hidden">
      <header className="px-5 py-3.5 border-b border-stone-800">
        <h3 className="font-serif font-semibold text-stone-100" style={{ fontSize: 'var(--t-h3)' }}>
          The whole tone space
        </h3>
        <p className="text-stone-400 mt-0.5" style={{ fontSize: 'var(--t-small)' }}>
          Heavier weight is further along each axis. Click a row to load it; click a second with shift to compare.
        </p>
      </header>

      <div className="overflow-x-auto p-5">
        <div className="min-w-[640px]">
          <div className="grid gap-1" style={{ gridTemplateColumns: `210px repeat(${TONE_DIMENSIONS.length}, 1fr)` }}>
            <span />
            {TONE_DIMENSIONS.map((d) => (
              <span
                key={d.key}
                className="font-mono text-stone-400 text-center pb-1.5 truncate"
                style={{ fontSize: 'var(--t-micro)' }}
                title={d.name}
              >
                {d.short}
              </span>
            ))}

            {contexts.map((ctx) => {
              const isSelected = selected.includes(ctx.context_id);
              return (
                <React.Fragment key={ctx.context_id}>
                  <button
                    onClick={(e) => onSelect(ctx.context_id, e.shiftKey)}
                    className={`text-left truncate pr-2 rounded transition ${
                      isSelected ? 'text-amber-300' : 'text-stone-300 hover:text-stone-100'
                    }`}
                    style={{ fontSize: 'var(--t-micro)' }}
                    title={`${ctx.context_id} · ${ctx.context}`}
                  >
                    <span className="font-mono text-stone-500 mr-1.5">{ctx.context_id}</span>
                    {ctx.context}
                  </button>

                  {TONE_DIMENSIONS.map((d) => {
                    const v = toneValue(ctx, d.key);
                    return (
                      <button
                        key={d.key}
                        onClick={(e) => onSelect(ctx.context_id, e.shiftKey)}
                        onMouseEnter={() => setHover({ ctx, dim: d, v })}
                        onMouseLeave={() => setHover(null)}
                        onFocus={() => setHover({ ctx, dim: d, v })}
                        onBlur={() => setHover(null)}
                        aria-label={`${ctx.context}, ${d.name}, level ${v} of 5`}
                        className="h-5 rounded-[3px] chart-focusable"
                        style={{
                          background: ordinalStep(v, 5),
                          outline: isSelected ? '1px solid var(--accent)' : 'none',
                          outlineOffset: '-1px',
                        }}
                      />
                    );
                  })}
                </React.Fragment>
              );
            })}
          </div>

          <div className="flex items-center justify-between gap-4 mt-4 pt-3 border-t border-stone-800 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="font-mono text-stone-500 uppercase tracking-wider" style={{ fontSize: 'var(--t-micro)' }}>level</span>
              {[1, 2, 3, 4, 5].map((l) => (
                <span key={l} className="flex items-center gap-1">
                  <span className="block w-5 h-3 rounded-[2px]" style={{ background: ordinalStep(l, 5) }} />
                  <span className="font-mono text-stone-400" style={{ fontSize: 'var(--t-micro)' }}>{l}</span>
                </span>
              ))}
            </div>
            <span className="font-mono text-stone-500" style={{ fontSize: 'var(--t-micro)' }}>
              {hover ? `${hover.ctx.context_id} · ${hover.dim.name} · ${hover.v}/5 — ${hover.v <= 2 ? hover.dim.left : hover.v >= 4 ? hover.dim.right : 'mid'}` : '1 = left pole · 5 = right pole'}
            </span>
          </div>
        </div>
      </div>

      <footer className="px-5 py-3 border-t border-stone-800 text-stone-500" style={{ fontSize: 'var(--t-micro)' }}>
        <span className="font-mono uppercase tracking-wider">Does not represent</span> tested wording.
        These are ordinal analyst coordinates for a communicative job, not copy that was trialled with readers.
      </footer>
    </div>
  );
};

/* ── slopegraph ─────────────────────────────────────────────── */

interface SlopeProps {
  a: ToneContext;
  b: ToneContext;
}

const SW = 560;
const SH = 330;
const SM = { top: 34, right: 150, bottom: 26, left: 150 };

/**
 * Two contexts across all ten dimensions. The slope of each line is the rule: what has
 * to change when moving from one communicative job to the other. A radar chart would
 * turn these ordinal steps into an area whose size depends on axis order, so this uses
 * paired positions on one shared scale instead.
 */
export const ToneSlope: React.FC<SlopeProps> = ({ a, b }) => {
  const [hover, setHover] = useState<string | null>(null);
  const yFor = (v: number) => SM.top + ((5 - v) / 4) * (SH - SM.top - SM.bottom);

  // Collision-avoidance nudge for left-column labels sharing the same value
  const leftNudge = new Map<string, number>();
  {
    const yGroups = new Map<number, string[]>();
    TONE_DIMENSIONS.forEach((d) => {
      const va = toneValue(a, d.key);
      const arr = yGroups.get(va) ?? [];
      arr.push(d.key);
      yGroups.set(va, arr);
    });
    yGroups.forEach((keys) => {
      if (keys.length <= 1) return;
      const mid = (keys.length - 1) / 2;
      keys.forEach((k, i) => leftNudge.set(k, (i - mid) * 14));
    });
  }

  // Same for right-column labels
  const rightNudge = new Map<string, number>();
  {
    const yGroups = new Map<number, string[]>();
    TONE_DIMENSIONS.forEach((d) => {
      const vb = toneValue(b, d.key);
      const arr = yGroups.get(vb) ?? [];
      arr.push(d.key);
      yGroups.set(vb, arr);
    });
    yGroups.forEach((keys) => {
      if (keys.length <= 1) return;
      const mid = (keys.length - 1) / 2;
      keys.forEach((k, i) => rightNudge.set(k, (i - mid) * 14));
    });
  }

  return (
    <div className="rounded-xl border border-stone-800 bg-stone-950 overflow-hidden">
      <header className="px-5 py-3.5 border-b border-stone-800">
        <h3 className="font-serif font-semibold text-stone-100" style={{ fontSize: 'var(--t-h3)' }}>
          What changes between the two
        </h3>
        <p className="text-stone-400 mt-0.5" style={{ fontSize: 'var(--t-small)' }}>
          Steep lines are the dimensions that have to move; flat lines are the ones that stay put.
        </p>
      </header>

      <div className="p-4 overflow-x-auto">
        <svg viewBox={`0 0 ${SW} ${SH}`} className="w-full h-auto block min-w-[520px]" role="img"
          aria-label={`Slopegraph comparing ${a.context} with ${b.context} across ten tone dimensions`}>
          <title>{`${a.context} compared with ${b.context}`}</title>

          <g className="chart-grid">
            {[1, 2, 3, 4, 5].map((v) => (
              <line key={v} x1={SM.left} y1={yFor(v)} x2={SW - SM.right} y2={yFor(v)} />
            ))}
          </g>
          {[1, 2, 3, 4, 5].map((v) => (
            <text key={`t${v}`} x={SM.left - 8} y={yFor(v) + 4} textAnchor="end" className="chart-tick">{v}</text>
          ))}

          <text x={SM.left} y={18} textAnchor="middle" className="chart-axis-label" style={{ fill: 'var(--accent)' }}>{a.context_id}</text>
          <text x={SW - SM.right} y={18} textAnchor="middle" className="chart-axis-label" style={{ fill: 'var(--cat-1)' }}>{b.context_id}</text>

          {TONE_DIMENSIONS.map((d) => {
            const va = toneValue(a, d.key);
            const vb = toneValue(b, d.key);
            const isHover = hover === d.key;
            const moved = va !== vb;
            return (
              <g
                key={d.key}
                onMouseEnter={() => setHover(d.key)}
                onMouseLeave={() => setHover(null)}
                className="chart-mark-interactive"
              >
                <line
                  x1={SM.left} y1={yFor(va)} x2={SW - SM.right} y2={yFor(vb)}
                  stroke="transparent" strokeWidth={14}
                />
                <line
                  x1={SM.left} y1={yFor(va)} x2={SW - SM.right} y2={yFor(vb)}
                  stroke={moved ? 'var(--ord-5)' : 'var(--chart-axis)'}
                  strokeWidth={isHover ? 3 : 2}
                  opacity={hover && !isHover ? 0.28 : 1}
                />
                <circle cx={SM.left} cy={yFor(va)} r={4} fill="var(--accent)" className="chart-mark" opacity={hover && !isHover ? 0.28 : 1} />
                <circle cx={SW - SM.right} cy={yFor(vb)} r={4} fill="var(--cat-1)" className="chart-mark" opacity={hover && !isHover ? 0.28 : 1} />

                <text
                  x={SM.left - 26} y={yFor(va) + 3.5 + (leftNudge.get(d.key) ?? 0)} textAnchor="end"
                  className="chart-mark-label"
                  opacity={hover && !isHover ? 0.3 : 1}
                >
                  {d.short}
                </text>
                <text
                  x={SW - SM.right + 12} y={yFor(vb) + 3.5 + (rightNudge.get(d.key) ?? 0)}
                  className="chart-mark-label"
                  opacity={hover && !isHover ? 0.3 : 1}
                >
                  {moved ? `${va}→${vb}` : `${va}`}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <footer className="px-5 py-3 border-t border-stone-800 text-stone-500" style={{ fontSize: 'var(--t-micro)' }}>
        <span className="font-mono uppercase tracking-wider">Does not represent</span> distance.
        The scale is ordinal, so a move from 1 to 2 is not necessarily the same size as a move from 4 to 5.
      </footer>
    </div>
  );
};
