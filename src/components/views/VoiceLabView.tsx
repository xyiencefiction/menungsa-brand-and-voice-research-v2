import React, { useMemo, useState } from 'react';
import { toneContexts, toneExemplars } from '../../data';
import type { ToneContext, ViewType } from '../../types';
import { ExternalLink, Check, X, RotateCcw, GitCompare, Eye, EyeOff, Copy, CheckCircle2 } from 'lucide-react';
import { getFigure, type FigureInfo } from '../common/FigureModal';
import { ToneMatrix, ToneSlope, TONE_DIMENSIONS, toneValue } from '../charts/ToneCharts';
import { EntityRail } from '../common/EntityRail';
import { ordinalStep } from '../charts/chartUtils';

interface Props {
  initialContextId?: string;
  onOpenFigure: (fig: FigureInfo) => void;
  onNavigate: (view: ViewType, param?: string) => void;
}

type Draft = Record<string, number>;

function draftFrom(ctx: ToneContext): Draft {
  return Object.fromEntries(TONE_DIMENSIONS.map((d) => [d.key as string, toneValue(ctx, d.key)]));
}

/** Sum of absolute ordinal steps between a draft and a preset. Used to name the nearest context. */
function distance(draft: Draft, ctx: ToneContext): number {
  return TONE_DIMENSIONS.reduce((n, d) => n + Math.abs(draft[d.key as string] - toneValue(ctx, d.key)), 0);
}

export const VoiceLabView: React.FC<Props> = ({ initialContextId, onOpenFigure, onNavigate }) => {
  const [primaryId, setPrimaryId] = useState(initialContextId ?? 'C01');
  const [compareId, setCompareId] = useState<string | null>(null);

  const primary = toneContexts.find((c) => c.context_id === primaryId) ?? toneContexts[0];
  const compare = compareId ? toneContexts.find((c) => c.context_id === compareId) ?? null : null;

  /**
   * The draft carries the context it was derived from, so switching preset resets the
   * sliders during render rather than through an effect and a second render pass.
   */
  const [draftState, setDraftState] = useState<{ id: string; values: Draft }>(
    () => ({ id: primary.context_id, values: draftFrom(primary) }),
  );
  const draft = draftState.id === primary.context_id ? draftState.values : draftFrom(primary);
  const setDraft = (values: Draft) => setDraftState({ id: primary.context_id, values });

  const edited = TONE_DIMENSIONS.some((d) => draft[d.key as string] !== toneValue(primary, d.key));

  /** Once the sliders move, the nearest documented context tells you what you have drifted into. */
  const nearest = useMemo(() => {
    if (!edited) return null;
    return [...toneContexts]
      .map((c) => ({ ctx: c, dist: distance(draft, c) }))
      .sort((a, b) => a.dist - b.dist)[0];
  }, [draft, edited]);

  const handleMatrixSelect = (id: string, additive: boolean) => {
    if (additive && id !== primaryId) setCompareId(id);
    else { setPrimaryId(id); setCompareId(null); }
  };

  const [showExemplars, setShowExemplars] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const currentExemplars = useMemo(
    () => toneExemplars.filter((e) => e.contextId === primary.context_id),
    [primary.context_id],
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      <header className="border-b border-stone-800 pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="inline-block px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 font-mono border border-rose-500/20 mb-2"
            style={{ fontSize: 'var(--t-micro)' }}>
            Phase B Applied Voice System · C01–C14
          </span>
          <h1 className="font-serif font-bold text-stone-100" style={{ fontSize: 'var(--t-h1)', lineHeight: 1.1 }}>
            Voice &amp; Tone Lab
          </h1>
          <p className="text-stone-400 mt-1.5 max-w-2xl" style={{ fontSize: 'var(--t-small)' }}>
            Voice is stable; tone calibrates to the communicative job. Load a preset, move the sliders, or hold shift to compare two contexts.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button onClick={() => onOpenFigure(getFigure('fig-06'))}
            className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 font-mono flex items-center gap-1.5 transition"
            style={{ fontSize: 'var(--t-micro)' }}>
            <ExternalLink size={13} className="text-amber-400" /><span>Fig 6</span>
          </button>
          <button onClick={() => onOpenFigure(getFigure('fig-07'))}
            className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 font-mono flex items-center gap-1.5 transition"
            style={{ fontSize: 'var(--t-micro)' }}>
            <ExternalLink size={13} className="text-sky-400" /><span>Fig 7</span>
          </button>
        </div>
      </header>

      <ToneMatrix
        contexts={toneContexts}
        selected={[primaryId, ...(compareId ? [compareId] : [])]}
        onSelect={handleMatrixSelect}
      />

      {compare && <ToneSlope a={primary} b={compare} />}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* sliders */}
        <section className="lg:col-span-7 p-5 bg-stone-900 border border-stone-700 rounded-xl space-y-4">
          <header className="flex items-start justify-between gap-3 border-b border-stone-800 pb-3">
            <div className="min-w-0">
              <span className="font-mono text-amber-400 font-bold uppercase block" style={{ fontSize: 'var(--t-micro)' }}>
                {primary.context_id}{edited && ' · edited'}
              </span>
              <h3 className="font-serif font-bold text-stone-100 truncate" style={{ fontSize: 'var(--t-h3)' }}>
                {primary.context}
              </h3>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {edited && (
                <button
                  onClick={() => setDraft(draftFrom(primary))}
                  className="px-2 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 font-mono flex items-center gap-1 border border-stone-700 transition"
                  style={{ fontSize: 'var(--t-micro)' }}
                >
                  <RotateCcw size={11} /> Reset
                </button>
              )}
              <button
                onClick={() => setCompareId(compareId ? null : toneContexts.find((c) => c.context_id !== primaryId)!.context_id)}
                className={`px-2 py-1 rounded font-mono flex items-center gap-1 border transition ${
                  compareId ? 'bg-amber-500/20 text-amber-200 border-amber-500/40' : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700'
                }`}
                style={{ fontSize: 'var(--t-micro)' }}
              >
                <GitCompare size={11} /> Compare
              </button>
            </div>
          </header>

          {compare && (
            <label className="flex items-center gap-2">
              <span className="font-mono text-stone-400 uppercase tracking-wider" style={{ fontSize: 'var(--t-micro)' }}>Against</span>
              <select
                value={compareId ?? ''}
                onChange={(e) => setCompareId(e.target.value)}
                className="flex-1 bg-stone-950 text-stone-200 border border-stone-800 rounded p-1.5"
                style={{ fontSize: 'var(--t-micro)' }}
              >
                {toneContexts.filter((c) => c.context_id !== primaryId).map((c) => (
                  <option key={c.context_id} value={c.context_id}>{c.context_id} · {c.context}</option>
                ))}
              </select>
            </label>
          )}

          <div className="p-3 bg-stone-950 rounded-lg border border-stone-800">
            <span className="font-mono text-stone-400 uppercase tracking-wider block mb-1" style={{ fontSize: 'var(--t-micro)' }}>
              Psychological job
            </span>
            <p className="text-stone-200 leading-relaxed" style={{ fontSize: 'var(--t-small)' }}>{primary.psychological_job}</p>
          </div>

          <div className="space-y-3.5 pt-1">
            {TONE_DIMENSIONS.map((dim) => {
              const key = dim.key as string;
              const val = draft[key] ?? 3;
              const preset = toneValue(primary, dim.key);
              const other = compare ? toneValue(compare, dim.key) : null;
              const moved = val !== preset;
              return (
                <div key={key} className="space-y-1">
                  <div className="flex items-center justify-between font-mono" style={{ fontSize: 'var(--t-micro)' }}>
                    <span className="text-stone-300 font-semibold">{dim.name}</span>
                    <span className="flex items-center gap-2">
                      {other !== null && (
                        <span className="px-1.5 py-0.5 rounded tabular-nums" style={{ background: 'var(--cat-1)', color: '#fff' }}>
                          {compare!.context_id} {other}
                        </span>
                      )}
                      {moved && <span className="text-stone-500 tabular-nums">preset {preset}</span>}
                      <span
                        className="px-1.5 py-0.5 rounded font-bold tabular-nums"
                        style={{ background: ordinalStep(val, 5), color: val >= 3 ? 'var(--ord-ink-light)' : 'var(--ord-ink-dark)' }}
                      >
                        {val} / 5
                      </span>
                    </span>
                  </div>
                  <input
                    type="range" min={1} max={5} step={1} value={val}
                    onChange={(e) => setDraft({ ...draft, [key]: parseInt(e.target.value, 10) })}
                    aria-label={`${dim.name}, ${dim.left} to ${dim.right}`}
                    className="w-full"
                  />
                  <div className="flex justify-between font-mono text-stone-500" style={{ fontSize: 'var(--t-micro)' }}>
                    <span>{dim.left}</span><span>{dim.right}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {nearest && (
            <div className="p-3 rounded-lg border" style={{ borderColor: 'color-mix(in oklab, var(--accent) 42%, transparent)', background: 'color-mix(in oklab, var(--accent) 9%, transparent)' }}>
              <span className="font-mono uppercase tracking-wider block mb-1" style={{ fontSize: 'var(--t-micro)', color: 'var(--accent)' }}>
                Nearest documented context
              </span>
              <p className="text-stone-200" style={{ fontSize: 'var(--t-small)' }}>
                Your configuration is closest to <strong>{nearest.ctx.context_id} · {nearest.ctx.context}</strong>
                {nearest.dist === 0 ? ', an exact match.' : ` (${nearest.dist} ordinal steps away).`}{' '}
                {nearest.ctx.context_id !== primary.context_id && (
                  <button onClick={() => setPrimaryId(nearest.ctx.context_id)} className="text-amber-400 hover:text-amber-300 underline">
                    Load its guidance
                  </button>
                )}
              </p>
            </div>
          )}
        </section>

        {/* guidance */}
        <div className="lg:col-span-5 space-y-4">
          <section className="p-5 bg-stone-900 border border-stone-700 rounded-xl space-y-2">
            <h4 className="flex items-center gap-2 font-mono uppercase font-bold border-b border-stone-800 pb-2"
              style={{ fontSize: 'var(--t-micro)', color: 'var(--status-positive)' }}>
              <Check size={15} /> Recommended execution
            </h4>
            <p className="text-stone-200 leading-relaxed" style={{ fontSize: 'var(--t-small)' }}>
              {primary.linguistic_properties}
            </p>
          </section>

          <section className="p-5 bg-stone-900 border rounded-xl space-y-2" style={{ borderColor: 'color-mix(in oklab, var(--status-critical) 38%, transparent)' }}>
            <h4 className="flex items-center gap-2 font-mono uppercase font-bold border-b border-stone-800 pb-2"
              style={{ fontSize: 'var(--t-micro)', color: 'var(--status-critical)' }}>
              <X size={15} /> Strictly avoid
            </h4>
            <p className="text-stone-200 leading-relaxed" style={{ fontSize: 'var(--t-small)' }}>{primary.avoid}</p>
          </section>

          <div className="p-4 bg-stone-950 border border-stone-800 rounded-xl">
            <span className="font-mono uppercase tracking-wider block mb-1" style={{ fontSize: 'var(--t-micro)', color: 'var(--accent)' }}>
              Implementation guardrail
            </span>
            <p className="text-stone-300 leading-relaxed" style={{ fontSize: 'var(--t-small)' }}>
              All illustrative copy stays in the licensed position. In high-risk or crisis scenarios (C07), drop informal
              humour and autonomy hedging and give direct, clinically unhedged instruction.
            </p>
          </div>

          <EntityRail entityId={primary.context_id} onNavigate={onNavigate} />
        </div>
      </div>

      {/* Real-World Writing Exemplars Section */}
      <section className="bg-stone-900 border border-stone-700 rounded-xl p-5 md:p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-amber-400 font-bold uppercase" style={{ fontSize: 'var(--t-micro)' }}>
                {primary.context_id} · Exemplar Library
              </span>
              <span className="px-2 py-0.5 rounded-full bg-stone-800 border border-stone-700 text-stone-300 font-mono text-xs">
                {currentExemplars.length} specimens
              </span>
            </div>
            <h3 className="font-serif font-bold text-stone-100" style={{ fontSize: 'var(--t-h3)' }}>
              Real-World Writing Exemplars
            </h3>
            <p className="text-stone-400 mt-0.5" style={{ fontSize: 'var(--t-small)' }}>
              Concrete copy demonstrations contrasting calibrated Menungsa voice against common anti-patterns for this specific tone setting.
            </p>
          </div>

          <button
            onClick={() => setShowExemplars(!showExemplars)}
            className={`px-3.5 py-1.5 rounded-lg font-mono text-xs flex items-center gap-2 border transition shrink-0 self-start sm:self-auto ${
              showExemplars
                ? 'bg-amber-500/20 text-amber-200 border-amber-500/40 hover:bg-amber-500/30'
                : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700'
            }`}
            aria-expanded={showExemplars}
          >
            {showExemplars ? <EyeOff size={14} /> : <Eye size={14} />}
            <span>{showExemplars ? 'Hide Exemplars' : 'Show Exemplars'}</span>
          </button>
        </div>

        {showExemplars && (
          <div className="space-y-5">
            <div className="p-3 bg-stone-950/60 rounded-lg border border-stone-800 text-xs text-stone-400 font-mono">
              <span className="text-amber-400 font-semibold">Calibrated Illustrative Exemplars:</span> These specimens translate the empirical mechanisms and slider tolerances of {primary.context_id} into applied Indonesian copy.
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {currentExemplars.map((ex) => (
                <div key={ex.id} className="p-5 rounded-xl border border-stone-800 bg-stone-950/70 space-y-4 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2 border-b border-stone-800/80 pb-2.5">
                      <span className="px-2.5 py-0.5 rounded bg-stone-900 border border-stone-700 text-stone-200 font-mono text-xs font-medium">
                        {ex.channel}
                      </span>
                      <button
                        onClick={() => handleCopy(ex.id, ex.worked.copy)}
                        className="px-2 py-1 rounded bg-stone-900 hover:bg-stone-800 text-stone-300 font-mono text-xs border border-stone-800 flex items-center gap-1.5 transition"
                        title="Copy calibrated text"
                      >
                        {copiedId === ex.id ? <CheckCircle2 size={12} className="text-emerald-400" /> : <Copy size={12} />}
                        <span>{copiedId === ex.id ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>

                    {/* Worked version */}
                    <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-800/40 space-y-1.5">
                      <span className="font-mono text-xs font-bold uppercase tracking-wider block" style={{ color: 'var(--status-positive)' }}>
                        ✓ Calibrated Menungsa Voice
                      </span>
                      <p className="text-stone-100 leading-relaxed whitespace-pre-line text-sm font-serif">
                        "{ex.worked.copy}"
                      </p>
                    </div>

                    {/* Weak version */}
                    <div className="p-4 rounded-lg bg-rose-950/20 border border-rose-800/40 space-y-1.5">
                      <span className="font-mono text-xs font-bold uppercase tracking-wider block" style={{ color: 'var(--status-critical)' }}>
                        ✕ Common Anti-Pattern
                      </span>
                      <p className="text-stone-300/80 leading-relaxed whitespace-pre-line text-sm italic">
                        "{ex.weak.copy}"
                      </p>
                    </div>
                  </div>

                  {/* Rationale */}
                  <div className="pt-2 border-t border-stone-800/80">
                    <span className="font-mono text-xs uppercase tracking-wider block mb-1 text-stone-500 font-semibold">
                      Linguistic Rationale &amp; Mechanism:
                    </span>
                    <p className="text-stone-300 text-xs leading-relaxed">
                      {ex.rationale}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
