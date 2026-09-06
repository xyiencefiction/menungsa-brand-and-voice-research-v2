import React, { useMemo, useState } from 'react';
import type { Domain, Intersection } from '../../types';
import { scaleLinear, ordinalStep } from './chartUtils';

interface Props {
  domains: Domain[];
  intersections: Intersection[];
  onSelect: (domainId: string) => void;
}

const FIELD: Record<string, keyof Intersection> = {
  D1: 'D1_global_male_comms',
  D2: 'D2_indonesian_male_comms',
  D3: 'D3_global_manosphere',
  D4: 'D4_indonesian_sea_manosphere',
  D5: 'D5_masculinity_framing',
  D6: 'D6_moral_communication',
  D7: 'D7_indonesia_masculinity_mh',
};

const W = 780;
const H = 320;
const BASE = 214;

/**
 * How much the seven domains overlap, drawn from what they actually cover.
 *
 * The relationship here is derived rather than given: an arc between two domains counts
 * the mechanisms both support at moderate or above. That is a real structural fact about
 * the corpus and it is not the same as shared studies, which is why the footer says so.
 * Arc thickness therefore measures agreement of coverage, and agreement of coverage is
 * exactly the thing this project keeps warning is not independent confirmation.
 */
export const DomainRelationMap: React.FC<Props> = ({ domains, intersections, onSelect }) => {
  const [hover, setHover] = useState<{ a: string; b: string; n: number } | null>(null);
  const [hoverNode, setHoverNode] = useState<string | null>(null);

  const { edges, maxWeight } = useMemo(() => {
    const supports = (row: Intersection, id: string) => {
      const v = String(row[FIELD[id]] ?? '');
      return v === 'STRONG_SUPPORT' || v === 'MODERATE_SUPPORT';
    };
    const out: { a: string; b: string; n: number }[] = [];
    for (let i = 0; i < domains.length; i++) {
      for (let j = i + 1; j < domains.length; j++) {
        const a = domains[i].id;
        const b = domains[j].id;
        const n = intersections.filter((row) => supports(row, a) && supports(row, b)).length;
        if (n > 0) out.push({ a, b, n });
      }
    }
    return { edges: out, maxWeight: Math.max(...out.map((e) => e.n), 1) };
  }, [domains, intersections]);

  const x = scaleLinear(0, domains.length - 1, 70, W - 70);
  const maxStudies = Math.max(...domains.map((d) => d.studies));
  const radius = (d: Domain) => 9 + (d.studies / maxStudies) * 13;
  const activeIds = hover ? [hover.a, hover.b] : hoverNode ? [hoverNode] : [];

  return (
    <div className="rounded-xl border border-stone-800 bg-stone-950 overflow-hidden">
      <header className="px-5 py-3.5 border-b border-stone-800">
        <h3 className="font-serif font-semibold text-stone-100" style={{ fontSize: 'var(--t-h3)' }}>
          How much the seven domains overlap
        </h3>
        <p className="text-stone-400 mt-0.5" style={{ fontSize: 'var(--t-small)' }}>
          Thicker arcs mean more mechanisms that both domains support. Hover an arc or a domain.
        </p>
      </header>

      <div className="p-4 overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block" style={{ minWidth: 620 }}
          role="img" aria-label="Arc diagram of shared mechanism coverage between the seven research domains">
          <title>Research-domain relationship map</title>

          {edges.map((e) => {
            const ai = domains.findIndex((d) => d.id === e.a);
            const bi = domains.findIndex((d) => d.id === e.b);
            const x1 = x(ai);
            const x2 = x(bi);
            const span = Math.abs(bi - ai);
            const lift = 26 + span * 30;
            const isActive = hover?.a === e.a && hover?.b === e.b;
            const related = activeIds.length > 0 && (activeIds.includes(e.a) || activeIds.includes(e.b));
            const dim = activeIds.length === 0 ? 1 : (isActive || related ? 1 : 0.12);
            return (
              <g key={`${e.a}-${e.b}`} className="chart-mark-interactive" opacity={dim}
                onMouseEnter={() => setHover(e)} onMouseLeave={() => setHover(null)}>
                <path
                  d={`M ${x1} ${BASE} Q ${(x1 + x2) / 2} ${BASE - lift} ${x2} ${BASE}`}
                  fill="none" stroke="transparent" strokeWidth={14}
                />
                <path
                  d={`M ${x1} ${BASE} Q ${(x1 + x2) / 2} ${BASE - lift} ${x2} ${BASE}`}
                  fill="none"
                  stroke={ordinalStep(Math.round((e.n / maxWeight) * 5) || 1, 5)}
                  strokeWidth={1 + (e.n / maxWeight) * 5}
                  opacity={isActive ? 1 : 0.75}
                />
              </g>
            );
          })}

          {domains.map((d, i) => {
            const isActive = activeIds.includes(d.id);
            return (
              <g key={d.id} className="chart-mark-interactive"
                onMouseEnter={() => setHoverNode(d.id)}
                onMouseLeave={() => setHoverNode(null)}
                onClick={() => onSelect(d.id)}
                role="button" tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(d.id); } }}
                aria-label={`${d.id} ${d.name}, ${d.studies} studies`}
              >
                <circle cx={x(i)} cy={BASE} r={radius(d)} fill="var(--chart-surface)"
                  stroke={isActive ? 'var(--accent)' : 'var(--ord-5)'} strokeWidth={isActive ? 3 : 2}
                  className="chart-mark" />
                <text x={x(i)} y={BASE + 4} textAnchor="middle" className="chart-tick"
                  style={{ fill: 'var(--chart-label-strong)' }}>{d.id}</text>
                <text x={x(i)} y={BASE + 34} textAnchor="middle" className="chart-tick">
                  {d.studies}
                </text>
                <text x={x(i)} y={BASE + 50} textAnchor="middle" className="chart-tick"
                  style={{ fill: 'var(--chart-label)' }}>
                  studies
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {(hover || hoverNode) && (
        <div className="px-5 py-3 border-t border-stone-800 bg-stone-900/40">
          {hover ? (
            <p className="text-stone-200 leading-relaxed" style={{ fontSize: 'var(--t-small)' }}>
              <span className="font-mono text-stone-500 mr-2">{hover.a} · {hover.b}</span>
              {hover.n} of 20 mechanisms are supported at moderate or above in both domains.
            </p>
          ) : (
            <p className="text-stone-200 leading-relaxed" style={{ fontSize: 'var(--t-small)' }}>
              <span className="font-mono text-stone-500 mr-2">{hoverNode}</span>
              {domains.find((d) => d.id === hoverNode)?.focus}
            </p>
          )}
        </div>
      )}

      <footer className="px-5 py-3 border-t border-stone-800 text-stone-500" style={{ fontSize: 'var(--t-micro)' }}>
        <span className="font-mono uppercase tracking-wider">Does not represent</span> independent confirmation,
        or shared studies. A thick arc means two domains talk about the same mechanisms, and they often do so while
        citing the same underlying literature. Node size is how many studies each domain contributed, before
        deduplication against the others.
      </footer>
    </div>
  );
};
