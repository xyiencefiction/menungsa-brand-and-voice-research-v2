import React, { useState } from 'react';
import { intersections, supportLevel, SUPPORT_LABEL, type SupportLevel } from '../../data';
import type { Intersection, ViewType } from '../../types';
import { Info, ExternalLink, ArrowRight, X } from 'lucide-react';
import { getFigure, type FigureInfo } from '../common/FigureModal';
import { BreadthDepthScatter } from '../charts/BreadthDepthScatter';
import { EntityRail } from '../common/EntityRail';
import { ordinalStep } from '../charts/chartUtils';

interface Props {
  onOpenFigure: (fig: FigureInfo) => void;
  onNavigateToMechanism: (id: string) => void;
  onNavigate: (view: ViewType, param?: string) => void;
}

const DOMAIN_HEADERS = [
  { id: 'D1', short: 'D1', full: 'D1: Global Adult-Male Verbal Communication' },
  { id: 'D2', short: 'D2', full: 'D2: Indonesian Adult-Male Verbal Communication' },
  { id: 'D3', short: 'D3', full: 'D3: Global Manosphere Subcultures' },
  { id: 'D4', short: 'D4', full: 'D4: Indonesian & SEA Manosphere' },
  { id: 'D5', short: 'D5', full: 'D5: Masculinity Framing & Labels' },
  { id: 'D6', short: 'D6', full: 'D6: Moralized Organizational Communication' },
  { id: 'D7', short: 'D7', full: 'D7: Indonesian Masculinity & Mental Health' },
];

/** Support level maps onto the shared ordinal ramp; "not addressed" stays off-scale. */
function cellFill(level: SupportLevel): string {
  return level === 0 ? 'var(--chart-muted)' : ordinalStep(level, 3);
}

export const CrossReportView: React.FC<Props> = ({ onOpenFigure, onNavigateToMechanism, onNavigate }) => {
  const [selected, setSelected] = useState<Intersection | null>(null);
  const [sortBy, setSortBy] = useState<'breadth' | 'studies' | 'id'>('breadth');

  const sorted = [...intersections].sort((a, b) => {
    if (sortBy === 'breadth') {
      return parseInt(b.domain_breadth_moderate_or_above, 10) - parseInt(a.domain_breadth_moderate_or_above, 10);
    }
    if (sortBy === 'studies') {
      return parseInt(b.unique_underlying_studies, 10) - parseInt(a.unique_underlying_studies, 10);
    }
    return a.mechanism_id.localeCompare(b.mechanism_id);
  });

  const domainTotals = DOMAIN_HEADERS.map((_, idx) =>
    intersections.reduce((n, row) => n + (levelsFor(row)[idx] >= 2 ? 1 : 0), 0),
  );

  const select = (id: string) => setSelected(intersections.find((i) => i.mechanism_id === id) ?? null);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      <header className="border-b border-stone-800 pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="inline-block px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-mono border border-amber-500/20 mb-2"
            style={{ fontSize: 'var(--t-micro)' }}>
            Cross-Report Convergence Matrix
          </span>
          <h1 className="font-serif font-bold text-stone-100" style={{ fontSize: 'var(--t-h1)', lineHeight: 1.1 }}>
            Mechanism × Research Domain
          </h1>
          <p className="text-stone-400 mt-1.5 max-w-2xl" style={{ fontSize: 'var(--t-small)' }}>
            Qualitative convergence across the seven domains. Encodes evidence classification, never invented effect sizes.
          </p>
        </div>

        <button
          onClick={() => onOpenFigure(getFigure('fig-02'))}
          className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 font-mono flex items-center gap-1.5 transition shrink-0"
          style={{ fontSize: 'var(--t-micro)' }}
        >
          <ExternalLink size={13} className="text-amber-400" />
          <span>Figure 2</span>
        </button>
      </header>

      <div className="p-4 bg-stone-900/60 border border-stone-800 rounded-xl flex items-start gap-3 text-stone-300"
        style={{ fontSize: 'var(--t-small)' }}>
        <Info size={17} className="text-amber-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-stone-100">Cross-domain recurrence is not probability of effectiveness.</strong>{' '}
          A claim appearing in six domains and resting on one qualitative study is a <em>wide, weak claim</em>.
          A claim appearing in one domain and resting on two meta-analyses is a <em>narrow, strong claim</em>.
          The plot below separates the two; the matrix beneath it shows where the support sits.
        </p>
      </div>

      <BreadthDepthScatter selectedId={selected?.mechanism_id} onSelect={select} />

      {/* ── the matrix ─────────────────────────────────────── */}
      <section className="rounded-xl border border-stone-800 bg-stone-950 overflow-hidden">
        <header className="px-5 py-3.5 border-b border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-serif font-semibold text-stone-100" style={{ fontSize: 'var(--t-h3)' }}>
              Where each mechanism is supported
            </h3>
            <p className="text-stone-400 mt-0.5" style={{ fontSize: 'var(--t-small)' }}>
              One ramp, because support level is ordered. Heavier cells carry stronger support.
            </p>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="font-mono text-stone-500 uppercase" style={{ fontSize: 'var(--t-micro)' }}>Sort</span>
            {([['breadth', 'Breadth'], ['studies', 'Studies'], ['id', 'ID']] as const).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSortBy(key)}
                className={`px-2 py-1 rounded font-mono transition ${
                  sortBy === key ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-stone-900 text-stone-400 hover:text-stone-200'
                }`}
                style={{ fontSize: 'var(--t-micro)' }}
              >
                {label}
              </button>
            ))}
          </div>
        </header>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse" style={{ fontSize: 'var(--t-small)' }}>
            <thead>
              <tr className="border-b border-stone-800 font-mono text-stone-400 uppercase" style={{ fontSize: 'var(--t-micro)' }}>
                <th className="p-3 text-left font-medium min-w-[220px]">Mechanism</th>
                <th className="p-2 text-right font-medium w-20" title="Domains with moderate or above support">Breadth</th>
                <th className="p-2 text-right font-medium w-20" title="Unique underlying studies after deduplication">Studies</th>
                {DOMAIN_HEADERS.map((d) => (
                  <th key={d.id} className="p-2 text-center font-medium w-14" title={d.full}>{d.short}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((row) => {
                const levels = levelsFor(row);
                const isSelected = selected?.mechanism_id === row.mechanism_id;
                return (
                  <tr
                    key={row.mechanism_id}
                    onClick={() => setSelected(row)}
                    className={`cursor-pointer transition ${isSelected ? 'bg-amber-500/10' : 'hover:bg-stone-900/60'}`}
                  >
                    <td className="p-3">
                      <span className="font-mono text-amber-400 font-bold mr-2" style={{ fontSize: 'var(--t-micro)' }}>
                        {row.mechanism_id}
                      </span>
                      <span className="text-stone-200">{row.mechanism.split('/')[0].trim()}</span>
                    </td>
                    <td className="p-2 text-right font-mono text-amber-300 tabular-nums">
                      {row.domain_breadth_moderate_or_above}/7
                    </td>
                    <td className="p-2 text-right font-mono text-stone-400 tabular-nums">
                      {row.unique_underlying_studies}
                    </td>
                    {levels.map((level, idx) => (
                      <td key={idx} className="p-1 align-middle">
                        <span
                          className="block h-6 rounded-[3px] mx-auto"
                          style={{ background: cellFill(level), width: 'calc(100% - 4px)' }}
                          title={`${DOMAIN_HEADERS[idx].full} — ${SUPPORT_LABEL[level]}`}
                          aria-label={`${DOMAIN_HEADERS[idx].id}: ${SUPPORT_LABEL[level]}`}
                        />
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="border-t border-stone-800 font-mono text-stone-500" style={{ fontSize: 'var(--t-micro)' }}>
                <td className="p-2.5" colSpan={3}>Mechanisms supported at moderate or above, per domain</td>
                {domainTotals.map((n, idx) => (
                  <td key={idx} className={`p-2 text-center tabular-nums ${n <= 6 ? 'text-amber-400 font-bold' : 'text-stone-400'}`}>
                    {n}
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="px-5 py-3 border-t border-stone-800 flex items-center gap-4 flex-wrap">
          <span className="font-mono text-stone-500 uppercase tracking-wider" style={{ fontSize: 'var(--t-micro)' }}>support</span>
          {([3, 2, 1, 0] as SupportLevel[]).map((l) => (
            <span key={l} className="flex items-center gap-1.5">
              <span className="block w-6 h-3 rounded-[2px]" style={{ background: cellFill(l) }} />
              <span className="text-stone-400" style={{ fontSize: 'var(--t-micro)' }}>{SUPPORT_LABEL[l]}</span>
            </span>
          ))}
        </div>

        <footer className="px-5 py-3 border-t border-stone-800 text-stone-500" style={{ fontSize: 'var(--t-micro)' }}>
          <span className="font-mono uppercase tracking-wider">Does not represent</span> independent replication.
          Domains share underlying literature, so a bright row can rest on the same handful of studies counted several times.
        </footer>
      </section>

      {selected && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 p-5 bg-stone-900 border border-stone-700 rounded-xl space-y-4">
            <div className="flex items-start justify-between gap-3 border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0"
                  style={{ fontSize: 'var(--t-micro)' }}>
                  {selected.mechanism_id}
                </span>
                <h3 className="font-serif font-bold text-stone-100 truncate" style={{ fontSize: 'var(--t-h3)' }}>
                  {selected.mechanism}
                </h3>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onNavigateToMechanism(selected.mechanism_id)}
                  className="px-2.5 py-1 font-mono rounded bg-stone-800 hover:bg-stone-700 text-amber-300 border border-stone-700 flex items-center gap-1 transition"
                  style={{ fontSize: 'var(--t-micro)' }}
                >
                  <span>Full mechanism</span>
                  <ArrowRight size={12} />
                </button>
                <button onClick={() => setSelected(null)} className="p-1 text-stone-400 hover:text-stone-200">
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Metric label="Domain breadth" value={`${selected.domain_breadth_moderate_or_above} of 7`} tone="amber" />
              <Metric label="Unique studies" value={selected.unique_underlying_studies} tone="sky" />
              <Metric label="Evidence strength" value={selected.evidence_strength.split('(')[0].trim()} tone="plain" />
            </div>

            <div className="p-3.5 bg-stone-950 rounded-lg border border-stone-800">
              <span className="font-mono text-amber-400 uppercase tracking-wider block mb-1" style={{ fontSize: 'var(--t-micro)' }}>
                Interpretation
              </span>
              <p className="text-stone-200 leading-relaxed" style={{ fontSize: 'var(--t-small)' }}>
                {selected.interpretation_note}
              </p>
            </div>
          </div>

          <EntityRail entityId={selected.mechanism_id} onNavigate={onNavigate} />
        </div>
      )}
    </div>
  );
};

function levelsFor(row: Intersection): SupportLevel[] {
  return [
    supportLevel(row.D1_global_male_comms),
    supportLevel(row.D2_indonesian_male_comms),
    supportLevel(row.D3_global_manosphere),
    supportLevel(row.D4_indonesian_sea_manosphere),
    supportLevel(row.D5_masculinity_framing),
    supportLevel(row.D6_moral_communication),
    supportLevel(row.D7_indonesia_masculinity_mh),
  ];
}

const Metric: React.FC<{ label: string; value: string; tone: 'amber' | 'sky' | 'plain' }> = ({ label, value, tone }) => (
  <div className="p-3 bg-stone-950 rounded-lg border border-stone-800">
    <span className="font-mono text-stone-500 uppercase tracking-wider block" style={{ fontSize: 'var(--t-micro)' }}>
      {label}
    </span>
    <p
      className="font-serif font-bold mt-1 leading-tight"
      style={{
        fontSize: 'var(--t-lead)',
        color: tone === 'amber' ? 'var(--ord-6)' : tone === 'sky' ? 'var(--cat-1)' : 'var(--chart-label-strong)',
      }}
    >
      {value}
    </p>
  </div>
);
