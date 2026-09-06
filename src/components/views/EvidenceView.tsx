import React, { useState, useMemo } from 'react';
import { matchesText } from '../../i18n/translate';
import { claims, corpusStats } from '../../data';
import {
  CONFIDENCE_TIERS,
  CONFIDENCE_LABEL,
  OUTCOME_LEVELS,
  OUTCOME_LABEL,
  type EvidenceLetter,
} from '../../data/normalize';
import { ConfidenceTag } from '../common/ConfidenceTag';
import { OutcomeTierBadge } from '../common/OutcomeTierBadge';
import { EntityRail } from '../common/EntityRail';
import { EvidenceLandscape } from '../charts/EvidenceLandscape';
import type { ViewType } from '../../types';
import { Search, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

interface Props {
  initialFilterDomain?: string;
  initialFilterMechanism?: string;
  onNavigate: (view: ViewType, param?: string) => void;
}

type Filters = {
  domain: string;
  geo: string;
  causal: string;
  wording: string;
  confidence: string;
  outcome: string;
  category: string;
};

const EMPTY: Filters = {
  domain: 'ALL', geo: 'ALL', causal: 'ALL', wording: 'ALL', confidence: 'ALL', outcome: 'ALL', category: 'ALL',
};

export const EvidenceView: React.FC<Props> = ({ initialFilterDomain, initialFilterMechanism, onNavigate }) => {
  const [search, setSearch] = useState(initialFilterMechanism ?? '');
  const [f, setF] = useState<Filters>({ ...EMPTY, domain: initialFilterDomain ?? 'ALL' });
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const set = (key: keyof Filters, value: string) =>
    setF((prev) => ({ ...prev, [key]: prev[key] === value ? 'ALL' : value }));

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return claims.filter((c) => {
      const d = c.derived;

      if (q && !matchesText(`${c.claim} ${c.claim_id} ${c.author_year} ${c.original_study} ${c.outcome_dv} ${c.mechanism_cluster}`, q)) {
        return false;
      }
      if (f.domain !== 'ALL' && !c.source_domains.includes(f.domain)) return false;
      if (f.geo === 'ID' && d.indonesia !== 'YES') return false;
      if (f.geo === 'GLOBAL' && d.indonesia === 'YES') return false;
      if (f.causal !== 'ALL' && d.causal !== f.causal) return false;
      if (f.wording !== 'ALL' && d.wording !== f.wording) return false;
      if (f.confidence !== 'ALL' && d.confidenceTier !== f.confidence) return false;
      if (f.outcome !== 'ALL' && String(d.outcome) !== f.outcome) return false;
      if (f.category !== 'ALL' && !d.letters.includes(f.category as EvidenceLetter)) return false;
      return true;
    });
  }, [search, f]);

  /** The landscape bands drive the same filter state the dropdowns do. */
  const onSegment = (band: string, id: string) => {
    if (band === 'category') set('category', id);
    else if (band === 'confidence') set('confidence', id);
    else if (band === 'outcome') set('outcome', id);
    else if (band === 'design') {
      if (id === 'causal') set('causal', 'YES');
      else if (id === 'wording') set('wording', 'YES');
      else if (id === 'indonesia') set('geo', 'ID');
      else setF({ ...EMPTY });
    }
  };

  const activeSegments: Record<string, string> = {
    category: f.category,
    confidence: f.confidence,
    outcome: f.outcome,
    design: f.causal === 'YES' ? 'causal' : f.wording === 'YES' ? 'wording' : f.geo === 'ID' ? 'indonesia' : '',
  };

  const dirty = JSON.stringify(f) !== JSON.stringify(EMPTY) || search !== '';

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      <header className="border-b border-stone-800 pb-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 font-mono border border-emerald-500/20"
            style={{ fontSize: 'var(--t-micro)' }}>
            Claim ledger
          </span>
          <span className="font-mono text-stone-400 tabular-nums" style={{ fontSize: 'var(--t-micro)' }}>
            {corpusStats.totalClaims} catalogued claims
          </span>
        </div>
        <h1 className="font-serif font-bold text-stone-100" style={{ fontSize: 'var(--t-h1)', lineHeight: 1.1 }}>
          Evidence Browser
        </h1>
        <p className="text-stone-400 mt-1.5 max-w-2xl" style={{ fontSize: 'var(--t-small)' }}>
          The empirical grounding behind every claim, filterable by domain, design, locale, confidence and what was actually measured.
        </p>
      </header>

      <div className="p-4 bg-amber-950/20 border border-amber-800/40 rounded-xl flex items-start gap-3 text-amber-200"
        style={{ fontSize: 'var(--t-small)' }}>
        <AlertCircle size={17} className="text-amber-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-amber-300">The binding constraint.</strong>{' '}
          Of {corpusStats.totalClaims} claims, <strong>{corpusStats.wordingTested} manipulated wording</strong> while
          holding other elements constant ({corpusStats.wordingPartly} did so partly), and{' '}
          <strong>{corpusStats.indonesianWordingTested} of those were Indonesian</strong>. The rest are observational,
          correlational, or multi-component interventions. Mechanism evidence is not tested copywriting.
        </p>
      </div>

      <EvidenceLandscape all={claims} filtered={filtered} onSegment={onSegment} activeSegments={activeSegments} />

      {/* ── filters ─────────────────────────────────────────── */}
      <div className="space-y-3 bg-stone-950 p-4 rounded-xl border border-stone-800">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-2.5 text-stone-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search claims by keyword, author, study, mechanism id…"
            className="w-full bg-stone-900 text-stone-200 pl-9 pr-3 py-2 rounded-lg border border-stone-800 focus:outline-none focus:border-amber-500/50"
            style={{ fontSize: 'var(--t-small)' }}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2 border-t border-stone-900">
          <Select label="Domain" value={f.domain} onChange={(v) => setF({ ...f, domain: v })}
            options={[['ALL', 'All domains'], ['D1', 'D1 Global comms'], ['D2', 'D2 Indonesian comms'], ['D3', 'D3 Global manosphere'], ['D4', 'D4 SEA manosphere'], ['D5', 'D5 Framing'], ['D6', 'D6 Moral comms'], ['D7', 'D7 Indo masculinity']]} />

          <Select label="Geography" value={f.geo} onChange={(v) => setF({ ...f, geo: v })}
            options={[['ALL', 'All regions'], ['ID', `Indonesia (${corpusStats.indonesian})`], ['GLOBAL', 'Global / Western']]} />

          <Select label="Design" value={f.causal} onChange={(v) => setF({ ...f, causal: v })}
            options={[['ALL', 'All designs'], ['YES', `Causal / experimental (${corpusStats.causal})`], ['PARTLY', 'Partly causal'], ['NO', 'Correlational / qualitative']]} />

          <Select label="Wording tested" accent value={f.wording} onChange={(v) => setF({ ...f, wording: v })}
            options={[['ALL', 'All studies'], ['YES', `Manipulated (${corpusStats.wordingTested})`], ['PARTLY', `Partly (${corpusStats.wordingPartly})`], ['NO', 'Not manipulated']]} />

          <Select label="Confidence" value={f.confidence} onChange={(v) => setF({ ...f, confidence: v })}
            options={[['ALL', 'All confidence'], ...CONFIDENCE_TIERS.map((t) => [t, CONFIDENCE_LABEL[t]] as [string, string])]} />

          <Select label="Outcome" value={f.outcome} onChange={(v) => setF({ ...f, outcome: v })}
            options={[['ALL', 'All outcomes'], ...OUTCOME_LEVELS.map((l) => [String(l), OUTCOME_LABEL[l]] as [string, string]), ['0', OUTCOME_LABEL[0]]]} />
        </div>

        <div className="flex items-center justify-between font-mono text-stone-400 pt-1" style={{ fontSize: 'var(--t-micro)' }}>
          <span className="tabular-nums">Showing {filtered.length} of {corpusStats.totalClaims}</span>
          {dirty && (
            <button onClick={() => { setF({ ...EMPTY }); setSearch(''); }} className="text-amber-400 hover:text-amber-300 underline">
              Reset all filters
            </button>
          )}
        </div>
      </div>

      {/* ── claims ──────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <p className="text-center text-stone-500 py-12" style={{ fontSize: 'var(--t-small)' }}>
          No claim in the ledger matches this combination. That absence is itself a finding worth noting.
        </p>
      ) : (
        <div className="space-y-3">
          {filtered.map((c) => {
            const isExpanded = expandedId === c.claim_id;
            const d = c.derived;
            return (
              <article
                key={c.claim_id}
                className={`rounded-xl border transition overflow-hidden ${
                  isExpanded ? 'bg-stone-900 border-stone-600' : 'bg-stone-900/60 hover:bg-stone-900 border-stone-800/90'
                }`}
              >
                <div
                  onClick={() => setExpandedId(isExpanded ? null : c.claim_id)}
                  className="p-4 cursor-pointer flex items-start justify-between gap-3"
                >
                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="font-mono font-bold px-2 py-0.5 rounded bg-stone-800 text-amber-300 border border-stone-700"
                        style={{ fontSize: 'var(--t-micro)' }}>
                        {c.claim_id}
                      </span>
                      <span className="font-mono text-stone-400" style={{ fontSize: 'var(--t-micro)' }}>{c.author_year}</span>
                      <ConfidenceTag confidence={c.confidence} />
                      <OutcomeTierBadge level={d.outcome} outcomeDv={c.outcome_dv} />
                      {d.indonesia === 'YES' && (
                        <span className="px-1.5 py-0.5 rounded bg-teal-950 text-teal-300 font-mono border border-teal-800"
                          style={{ fontSize: 'var(--t-micro)' }}>Indonesia</span>
                      )}
                      {d.wording === 'YES' && (
                        <span className="px-1.5 py-0.5 rounded font-mono border font-semibold"
                          style={{ fontSize: 'var(--t-micro)', background: 'var(--ord-6)', color: 'var(--ord-ink-light)', borderColor: 'var(--ord-6)' }}>
                          Wording manipulated
                        </span>
                      )}
                      {d.nonInferential && (
                        <span className="px-1.5 py-0.5 rounded bg-stone-800 text-stone-400 font-mono border border-stone-700"
                          style={{ fontSize: 'var(--t-micro)' }}
                          title="Category D or E: observed pattern or industry practice. Never convert into psychological fact.">
                          {d.letters.join('/')} · not psychological fact
                        </span>
                      )}
                    </div>

                    <p className="font-medium text-stone-100 leading-snug" style={{ fontSize: 'var(--t-body)' }}>
                      {c.claim}
                    </p>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-stone-400" style={{ fontSize: 'var(--t-micro)' }}>
                      <span><strong className="text-stone-300">Study:</strong> {c.original_study}</span>
                      <span><strong className="text-stone-300">Sample:</strong> {c.sample_size} ({c.population})</span>
                      <span><strong className="text-stone-300">Design:</strong> {c.research_design}</span>
                    </div>
                  </div>

                  {isExpanded
                    ? <ChevronUp size={16} className="text-stone-400 shrink-0 mt-1" />
                    : <ChevronDown size={16} className="text-stone-400 shrink-0 mt-1" />}
                </div>

                {isExpanded && (
                  <div className="px-4 pb-4 pt-3 border-t border-stone-800/80 bg-stone-950/60 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      <Field label="Predictor (IV)" value={c.predictor_iv} tone="var(--cat-1)" />
                      <Field label="Outcome (DV)" value={c.outcome_dv} tone="var(--cat-3)" />
                      <Field label="Effect size" value={c.effect_size || 'Not quantified'} tone="var(--ord-5)" mono />
                      <Field label="Direction" value={c.direction} tone="var(--cat-2)" />
                    </div>

                    <div className="p-3 bg-stone-900/80 rounded-lg border border-stone-800">
                      <span className="font-mono text-stone-400 uppercase tracking-wider block mb-1" style={{ fontSize: 'var(--t-micro)' }}>
                        Limitations and caveats
                      </span>
                      <p className="text-stone-300 leading-relaxed" style={{ fontSize: 'var(--t-small)' }}>
                        {c.limitations || 'No specific limitations noted.'}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-stone-400" style={{ fontSize: 'var(--t-micro)' }}>
                      <span>Domains: <strong className="text-stone-200">{c.source_domains}</strong></span>
                      <span>Causal: <strong style={{ color: d.causal === 'YES' ? 'var(--status-positive)' : undefined }}>{c.causal}</strong></span>
                      <span>Replicated: <strong className="text-stone-200">{c.replicated}</strong></span>
                      <span>Cluster: <strong className="text-stone-200">{c.mechanism_cluster}</strong></span>
                      <span>Specificity: <strong className="text-stone-200">{c.male_specificity_class}</strong></span>
                    </div>

                    <EntityRail entityId={c.claim_id} onNavigate={onNavigate} />
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

const Select: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: [string, string][];
  accent?: boolean;
}> = ({ label, value, onChange, options, accent }) => (
  <label className="block">
    <span
      className="block font-mono uppercase tracking-wider mb-1"
      style={{ fontSize: 'var(--t-micro)', color: accent ? 'var(--accent)' : 'var(--chart-label)' }}
    >
      {label}
    </span>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-stone-900 text-stone-300 border rounded p-1.5"
      style={{ fontSize: 'var(--t-micro)', borderColor: accent ? 'color-mix(in oklab, var(--accent) 45%, transparent)' : 'var(--chart-grid)' }}
    >
      {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
    </select>
  </label>
);

const Field: React.FC<{ label: string; value: string; tone: string; mono?: boolean }> = ({ label, value, tone, mono }) => (
  <div className="p-2.5 bg-stone-900/80 rounded-lg border border-stone-800">
    <span className="font-mono uppercase tracking-wider block" style={{ fontSize: 'var(--t-micro)', color: tone }}>
      {label}
    </span>
    <p className={`text-stone-200 mt-0.5 ${mono ? 'font-mono' : ''}`} style={{ fontSize: 'var(--t-small)' }}>
      {value || 'N/A'}
    </p>
  </div>
);
