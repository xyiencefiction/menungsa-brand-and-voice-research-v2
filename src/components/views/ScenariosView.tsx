import React, { useState } from 'react';
import { scenarios, getEntity } from '../../data';
import type { ViewType } from '../../types';
import { IllustrativeBadge } from '../common/IllustrativeBadge';
import { EntityChip } from '../common/EntityChip';
import { EntityRail } from '../common/EntityRail';
import { AlertTriangle, Check, X, Columns } from 'lucide-react';

interface Props {
  initialScenarioId?: string;
  onNavigate: (view: ViewType, param?: string) => void;
}

/**
 * Copy blocks are rendered paragraph by paragraph so an annotation can point at the
 * exact clause it is about. The highlight is a substring match against the annotation's
 * own quoted fragment, which keeps the sample copy as one authored string rather than
 * a pre-split array that would drift from the annotations over time.
 */
const CopyBlock: React.FC<{ copy: string; highlight?: string; lang: string }> = ({ copy, highlight, lang }) => (
  <div className="space-y-2.5" lang={lang}>
    {copy.split('\n\n').map((para, i) => {
      const at = highlight ? para.indexOf(highlight) : -1;
      if (at === -1) {
        return (
          <p key={i} className="text-stone-200 leading-relaxed whitespace-pre-line" style={{ fontSize: 'var(--t-body)' }}>
            {para}
          </p>
        );
      }
      return (
        <p key={i} className="text-stone-200 leading-relaxed whitespace-pre-line" style={{ fontSize: 'var(--t-body)' }}>
          {para.slice(0, at)}
          <mark
            className="rounded px-0.5"
            style={{ background: 'color-mix(in oklab, var(--accent) 32%, transparent)', color: 'inherit' }}
          >
            {highlight}
          </mark>
          {para.slice(at + (highlight?.length ?? 0))}
        </p>
      );
    })}
  </div>
);

export const ScenariosView: React.FC<Props> = ({ initialScenarioId, onNavigate }) => {
  const [selectedId, setSelectedId] = useState<string>(
    scenarios.some((s) => s.id === initialScenarioId) ? initialScenarioId! : scenarios[0].id,
  );
  const [viewMode, setViewMode] = useState<'side-by-side' | 'worked' | 'weak'>('side-by-side');
  const [highlight, setHighlight] = useState<string | undefined>(undefined);
  const selected = scenarios.find((s) => s.id === selectedId) ?? scenarios[0];
  const channelName = getEntity(selected.channelId)?.label ?? selected.channelId;
  const contextName = getEntity(selected.contextId)?.label ?? selected.contextId;

  const swap = (id: string) => {
    setSelectedId(id);
    setHighlight(undefined);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      <header className="border-b border-stone-800 pb-5">
        <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-mono border border-amber-500/20"
          style={{ fontSize: 'var(--t-micro)' }}>
          Worked examples · SC1–SC5
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100 mt-1.5">
          Scenarios in Practice
        </h1>
        <p className="text-stone-400 mt-1.5 max-w-3xl" style={{ fontSize: 'var(--t-small)' }}>
          One full sample per channel and context pairing, with every clause traced back to the value it comes from.
          Two of these are the same communicative job on different surfaces, which is the clearest demonstration of
          what the channel axis is for.
        </p>
      </header>

      <div
        className="p-4 rounded-xl border flex items-start gap-3"
        style={{ borderColor: 'var(--cat-2)', background: 'color-mix(in oklab, var(--cat-2) 8%, transparent)' }}
      >
        <AlertTriangle size={17} className="shrink-0 mt-0.5" style={{ color: 'var(--cat-2)' }} />
        <p className="text-stone-200 leading-relaxed" style={{ fontSize: 'var(--t-small)' }}>
          <strong className="text-stone-100">No sentence on this page has been tested on Indonesian men.</strong>{' '}
          The corpus contains zero randomised wording experiments in Indonesia, so every sample below is an
          illustration of a mechanism, not approved copy. Use it as briefing material for a test, and read the tier
          badge on each one before reusing anything.
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {scenarios.map((s) => (
          <button
            key={s.id}
            onClick={() => swap(s.id)}
            className={`px-2.5 py-1.5 rounded-lg border transition text-left max-w-full ${
              s.id === selectedId
                ? 'bg-amber-500 text-stone-950 font-bold border-amber-400'
                : 'bg-stone-950 text-stone-300 hover:text-stone-100 border-stone-800'
            }`}
            style={{ fontSize: 'var(--t-micro)' }}
          >
            <span className="font-mono opacity-80">{s.id}</span>
            <span className="ml-1.5">{s.scenario}</span>
          </button>
        ))}
      </div>

      <article className="p-5 sm:p-6 bg-stone-900 border border-stone-700 rounded-2xl shadow-md space-y-5">
        <div className="space-y-3 border-b border-stone-800 pb-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h2 className="font-serif font-bold text-stone-100" style={{ fontSize: 'var(--t-h3)' }}>
              {selected.scenario}
            </h2>
            <IllustrativeBadge tier={selected.epistemicTier} />
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <EntityChip id={selected.channelId} onNavigate={onNavigate} />
            <span className="text-stone-600">×</span>
            <EntityChip id={selected.contextId} onNavigate={onNavigate} />
            {selected.valueIds.map((id) => (
              <EntityChip key={id} id={id} onNavigate={onNavigate} />
            ))}
          </div>
          <p className="text-stone-300 leading-relaxed" style={{ fontSize: 'var(--t-small)' }}>
            {selected.brief}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => { setViewMode('side-by-side'); setHighlight(undefined); }}
            className={`px-3 py-1.5 rounded-lg font-mono transition border ${
              viewMode === 'side-by-side'
                ? 'bg-amber-500/20 text-amber-200 border-amber-500/50'
                : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-stone-200'
            }`}
            style={{ fontSize: 'var(--t-micro)' }}
          >
            <Columns size={12} className="inline mr-1" />
            Side-by-side comparison
          </button>
          <button
            onClick={() => { setViewMode('worked'); setHighlight(undefined); }}
            className={`px-3 py-1.5 rounded-lg font-mono transition border ${
              viewMode === 'worked'
                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-700/50'
                : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-stone-200'
            }`}
            style={{ fontSize: 'var(--t-micro)' }}
          >
            <Check size={12} className="inline mr-1" />
            Worked version only
          </button>
          <button
            onClick={() => { setViewMode('weak'); setHighlight(undefined); }}
            className={`px-3 py-1.5 rounded-lg font-mono transition border ${
              viewMode === 'weak'
                ? 'bg-rose-500/15 text-rose-300 border-rose-700/50'
                : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-stone-200'
            }`}
            style={{ fontSize: 'var(--t-micro)' }}
          >
            <X size={12} className="inline mr-1" />
            What it usually looks like
          </button>
        </div>

        {viewMode === 'side-by-side' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Left: Anti-Pattern */}
            <div className="p-4 sm:p-5 rounded-xl border bg-rose-950/15 border-rose-900/40 space-y-4">
              <div className="flex items-center justify-between gap-2 border-b border-rose-900/40 pb-2.5">
                <span className="font-mono uppercase tracking-wider text-rose-300 font-bold" style={{ fontSize: 'var(--t-micro)' }}>
                  ✕ Critical Anti-Pattern
                </span>
                <span className="font-mono uppercase tracking-wider text-rose-400" style={{ fontSize: 'var(--t-micro)' }}>
                  Common Pitfalls
                </span>
              </div>
              <CopyBlock copy={selected.weak.copy} highlight={highlight} lang="id" />

              <div className="space-y-2 pt-2 border-t border-rose-900/30">
                <span className="font-mono uppercase tracking-wider text-stone-400 block" style={{ fontSize: 'var(--t-micro)' }}>
                  Why this fails (Hover to locate):
                </span>
                {selected.weak.problems.map((p, i) => (
                  <button
                    key={i}
                    onMouseEnter={() => setHighlight(p.example)}
                    onMouseLeave={() => setHighlight(undefined)}
                    onFocus={() => setHighlight(p.example)}
                    onBlur={() => setHighlight(undefined)}
                    className="w-full text-left p-2.5 rounded-lg bg-rose-950/30 border border-rose-900/40 hover:border-rose-700/70 transition space-y-1"
                  >
                    <p className="text-rose-200 leading-snug font-medium" style={{ fontSize: 'var(--t-small)' }} lang="id">
                      “{p.example}”
                    </p>
                    <p className="text-rose-200/70 leading-relaxed" style={{ fontSize: 'var(--t-micro)' }}>
                      {p.why}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Calibrated Menungsa Worked Version */}
            <div className="p-4 sm:p-5 rounded-xl border bg-stone-950 border-stone-800 space-y-4">
              <div className="flex items-center justify-between gap-2 border-b border-stone-800 pb-2.5">
                <span className="font-mono uppercase tracking-wider text-emerald-400 font-bold" style={{ fontSize: 'var(--t-micro)' }}>
                  ✓ Calibrated Menungsa Voice
                </span>
                <span className="font-mono uppercase tracking-wider text-stone-500" style={{ fontSize: 'var(--t-micro)' }}>
                  {channelName}
                </span>
              </div>
              <CopyBlock copy={selected.worked.copy} highlight={highlight} lang="id" />

              <div className="space-y-2 pt-2 border-t border-stone-800/80">
                <span className="font-mono uppercase tracking-wider text-stone-400 block" style={{ fontSize: 'var(--t-micro)' }}>
                  Line-by-line calibration (Hover to locate):
                </span>
                {selected.worked.annotations.map((a, i) => (
                  <button
                    key={i}
                    onMouseEnter={() => setHighlight(a.example)}
                    onMouseLeave={() => setHighlight(undefined)}
                    onFocus={() => setHighlight(a.example)}
                    onBlur={() => setHighlight(undefined)}
                    className="w-full text-left p-2.5 rounded-lg bg-stone-900 border border-stone-800 hover:border-stone-600 transition space-y-1.5"
                  >
                    <p className="text-stone-100 leading-snug font-medium" style={{ fontSize: 'var(--t-small)' }} lang="id">
                      “{a.example}”
                    </p>
                    <p className="text-stone-400 leading-relaxed" style={{ fontSize: 'var(--t-micro)' }}>
                      {a.why}
                    </p>
                    <EntityChip id={a.valueId} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            <div
              className={`lg:col-span-3 p-4 sm:p-5 rounded-xl border ${
                viewMode === 'weak' ? 'bg-rose-950/15 border-rose-900/40' : 'bg-stone-950 border-stone-800'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="font-mono uppercase tracking-wider text-stone-500" style={{ fontSize: 'var(--t-micro)' }}>
                  {channelName} · {contextName}
                </span>
                <span className="font-mono uppercase tracking-wider" style={{ fontSize: 'var(--t-micro)', color: 'var(--cat-2)' }}>
                  Illustrative
                </span>
              </div>
              <CopyBlock
                copy={viewMode === 'weak' ? selected.weak.copy : selected.worked.copy}
                highlight={highlight}
                lang="id"
              />
            </div>

            <div className="lg:col-span-2 space-y-2">
              <span className="font-mono uppercase tracking-wider text-stone-400 block" style={{ fontSize: 'var(--t-micro)' }}>
                {viewMode === 'weak' ? 'Why this fails' : 'Line by line'}
              </span>

              {viewMode === 'weak'
                ? selected.weak.problems.map((p, i) => (
                    <button
                      key={i}
                      onMouseEnter={() => setHighlight(p.example)}
                      onMouseLeave={() => setHighlight(undefined)}
                      onFocus={() => setHighlight(p.example)}
                      onBlur={() => setHighlight(undefined)}
                      className="w-full text-left p-3 rounded-lg bg-rose-950/25 border border-rose-900/40 hover:border-rose-700/60 transition space-y-1"
                    >
                      <p className="text-rose-100 leading-snug" style={{ fontSize: 'var(--t-small)' }} lang="id">
                        “{p.example}”
                      </p>
                      <p className="text-rose-200/70 leading-relaxed" style={{ fontSize: 'var(--t-micro)' }}>
                        {p.why}
                      </p>
                    </button>
                  ))
                : selected.worked.annotations.map((a, i) => (
                    <button
                      key={i}
                      onMouseEnter={() => setHighlight(a.example)}
                      onMouseLeave={() => setHighlight(undefined)}
                      onFocus={() => setHighlight(a.example)}
                      onBlur={() => setHighlight(undefined)}
                      className="w-full text-left p-3 rounded-lg bg-stone-950 border border-stone-800 hover:border-stone-600 transition space-y-1.5"
                    >
                      <p className="text-stone-200 leading-snug" style={{ fontSize: 'var(--t-small)' }} lang="id">
                        “{a.example}”
                      </p>
                      <p className="text-stone-400 leading-relaxed" style={{ fontSize: 'var(--t-micro)' }}>
                        {a.why}
                      </p>
                      <EntityChip id={a.valueId} />
                    </button>
                  ))}
            </div>
          </div>
        )}

        <div className="p-3.5 bg-stone-950 rounded-lg border border-stone-800 space-y-1.5">
          <span className="font-mono uppercase tracking-wider block" style={{ fontSize: 'var(--t-micro)', color: 'var(--cat-2)' }}>
            What this example does not establish
          </span>
          <p className="text-stone-300 leading-relaxed" style={{ fontSize: 'var(--t-small)' }}>
            {selected.notTested}
          </p>
        </div>
      </article>

      <EntityRail entityId={selected.id} onNavigate={onNavigate} />
    </div>
  );
};
