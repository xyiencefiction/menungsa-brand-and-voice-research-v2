import React, { useState } from 'react';
import { brandValues } from '../../data';
import type { ViewType } from '../../types';
import { ValueSpectrum } from '../charts/ValueSpectrum';
import { ConfidenceTag } from '../common/ConfidenceTag';
import { IllustrativeBadge } from '../common/IllustrativeBadge';
import { EntityChip } from '../common/EntityChip';
import { EntityRail } from '../common/EntityRail';
import { Check, X, Info } from 'lucide-react';

interface Props {
  initialValueId?: string;
  onNavigate: (view: ViewType, param?: string) => void;
}

/**
 * The six values are the join between the corpus and the brand snapshot, and every
 * applied surface downstream, the channel matrix and the worked scenarios, cites one
 * of these ids. They are a synthesis rather than a finding, so each carries the
 * research it rests on, the brand statement it answers to, and the condition under
 * which it stops applying.
 */
export const ValuesView: React.FC<Props> = ({ initialValueId, onNavigate }) => {
  const [selectedId, setSelectedId] = useState<string>(
    brandValues.some((v) => v.id === initialValueId) ? initialValueId! : brandValues[0].id,
  );
  const selected = brandValues.find((v) => v.id === selectedId) ?? brandValues[0];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      <header className="border-b border-stone-800 pb-5">
        <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-mono border border-amber-500/20"
          style={{ fontSize: 'var(--t-micro)' }}>
          Brand values · V1–V6
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100 mt-1.5">
          Values &amp; Voice
        </h1>
        <p className="text-stone-400 mt-1.5 max-w-3xl" style={{ fontSize: 'var(--t-small)' }}>
          Six values synthesised from the corpus and checked against the brand snapshot. Each one names a voice
          trait, the research it rests on, and the point at which it stops applying.
        </p>
      </header>

      <div className="p-4 bg-stone-900/60 border border-stone-800 rounded-xl flex items-start gap-3 text-stone-300"
        style={{ fontSize: 'var(--t-small)' }}>
        <Info size={17} className="text-amber-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-stone-100">Voice is stable; tone changes.</strong>{' '}
          These six do not move between contexts. What moves is the tone configuration in the Voice &amp; Tone Lab,
          and the delivery constraints in the Channels matrix. A value that changed by context would not be a value.
        </p>
      </div>

      <ValueSpectrum values={brandValues} selectedId={selectedId} onSelect={setSelectedId} />

      {/* value selector */}
      <div className="flex flex-wrap gap-1.5">
        {brandValues.map((v) => (
          <button
            key={v.id}
            onClick={() => setSelectedId(v.id)}
            className={`px-2.5 py-1.5 rounded-lg border transition text-left ${
              v.id === selectedId
                ? 'bg-amber-500 text-stone-950 font-bold border-amber-400'
                : 'bg-stone-950 text-stone-300 hover:text-stone-100 border-stone-800'
            }`}
            style={{ fontSize: 'var(--t-micro)' }}
          >
            <span className="font-mono opacity-80">{v.id}</span>
            <span className="ml-1.5">{v.value}</span>
          </button>
        ))}
      </div>

      {/* selected value */}
      <article className="p-5 sm:p-6 bg-stone-900 border border-stone-700 rounded-2xl shadow-md space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-stone-800 pb-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30"
                style={{ fontSize: 'var(--t-micro)' }}>
                {selected.id}
              </span>
              <h2 className="font-serif font-bold text-stone-100" style={{ fontSize: 'var(--t-h3)' }}>
                {selected.value}
              </h2>
            </div>
            <p className="text-stone-300 mt-2 leading-relaxed" style={{ fontSize: 'var(--t-body)' }}>
              <span className="font-mono text-stone-500 uppercase tracking-wider mr-2"
                style={{ fontSize: 'var(--t-micro)' }}>Our voice is</span>
              {selected.voiceTrait}
            </p>
          </div>
          <ConfidenceTag confidence={selected.confidence} verbatim />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3" style={{ fontSize: 'var(--t-small)' }}>
          <div className="p-3.5 bg-stone-950 rounded-lg border border-stone-800 space-y-1.5">
            <span className="font-mono text-amber-400 uppercase tracking-wider block" style={{ fontSize: 'var(--t-micro)' }}>
              What the research says
            </span>
            <p className="text-stone-300 leading-relaxed">{selected.researchBasis}</p>
            <div className="flex flex-wrap gap-1 pt-1.5">
              {selected.mechanismIds.map((id) => (
                <EntityChip key={id} id={id} onNavigate={onNavigate} />
              ))}
            </div>
          </div>

          <div className="p-3.5 bg-stone-950 rounded-lg border border-stone-800 space-y-1.5">
            <span className="font-mono text-sky-400 uppercase tracking-wider block" style={{ fontSize: 'var(--t-micro)' }}>
              What the brand says
            </span>
            <p className="text-stone-300 leading-relaxed">{selected.brandBasis}</p>
            <p className="text-stone-500 pt-1.5" style={{ fontSize: 'var(--t-micro)' }}>
              {selected.principleRef}
            </p>
          </div>
        </div>

        {/* do / don't */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono text-stone-400 uppercase tracking-wider" style={{ fontSize: 'var(--t-micro)' }}>
              How it sounds
            </span>
            <IllustrativeBadge tier={selected.confidence} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              {selected.dos.map((d, i) => (
                <div key={i} className="p-3.5 bg-emerald-950/25 border border-emerald-800/40 rounded-xl space-y-1.5">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-mono font-bold"
                    style={{ fontSize: 'var(--t-micro)' }}>
                    <Check size={14} />
                    <span>DO</span>
                  </div>
                  <p className="text-emerald-100 font-medium leading-snug" style={{ fontSize: 'var(--t-body)' }} lang="id">
                    “{d.example}”
                  </p>
                  <p className="text-emerald-200/70 leading-relaxed" style={{ fontSize: 'var(--t-micro)' }}>
                    {d.why}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              {selected.donts.map((d, i) => (
                <div key={i} className="p-3.5 bg-rose-950/25 border border-rose-800/40 rounded-xl space-y-1.5">
                  <div className="flex items-center gap-1.5 text-rose-400 font-mono font-bold"
                    style={{ fontSize: 'var(--t-micro)' }}>
                    <X size={14} />
                    <span>DON’T</span>
                  </div>
                  <p className="text-rose-100 font-medium leading-snug" style={{ fontSize: 'var(--t-body)' }} lang="id">
                    “{d.example}”
                  </p>
                  <p className="text-rose-200/70 leading-relaxed" style={{ fontSize: 'var(--t-micro)' }}>
                    {d.why}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-3.5 bg-stone-950 rounded-lg border border-stone-800 space-y-1.5">
          <span className="font-mono text-sky-400 uppercase tracking-wider block" style={{ fontSize: 'var(--t-micro)' }}>
            Where this value stops
          </span>
          <p className="text-stone-300 leading-relaxed" style={{ fontSize: 'var(--t-small)' }}>
            {selected.boundaryCondition}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="font-mono text-stone-500 uppercase tracking-wider mr-1" style={{ fontSize: 'var(--t-micro)' }}>
            Tone contexts where it does most work
          </span>
          {selected.contextIds.map((id) => (
            <EntityChip key={id} id={id} onNavigate={onNavigate} />
          ))}
        </div>
      </article>

      <EntityRail entityId={selected.id} onNavigate={onNavigate} />
    </div>
  );
};
