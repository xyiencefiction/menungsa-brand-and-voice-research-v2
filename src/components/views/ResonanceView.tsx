import React, { useState } from 'react';
import { pathways, resonanceStates } from '../../data';
import type { ViewType } from '../../types';
import { ArrowRight, AlertOctagon, Info } from 'lucide-react';
import { getFigure, type FigureInfo } from '../common/FigureModal';
import { EntityRail } from '../common/EntityRail';
import { PathwayFlow } from '../charts/PathwayFlow';
import { ResonanceMap } from '../charts/ResonanceMap';
import { SourceFigureLink } from '../common/SourceFigureLink';

interface Props {
  onOpenFigure: (fig: FigureInfo) => void;
  onNavigateToMechanism: (id: string) => void;
  onNavigate: (view: ViewType, param?: string) => void;
}

export const ResonanceView: React.FC<Props> = ({ onOpenFigure, onNavigateToMechanism, onNavigate }) => {
  const [selectedStateIndex, setSelectedStateIndex] = useState<number>(0);
  const [selectedResonanceId, setSelectedResonanceId] = useState<string>(resonanceStates[0].id);

  // Moved to src/data/pathways.json so it is searchable, linkable and filterable.
  const PATHWAYS = pathways;

  const current = PATHWAYS[selectedStateIndex];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="border-b border-stone-800 pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-mono text-xs border border-amber-500/20">
              Need → Reverse Engineered Pathway
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
            Emotional Resonance & Need-to-Response Flow
          </h1>
          <p className="text-stone-400 text-xs sm:text-sm mt-1 max-w-3xl">
            Derived from Section 25 of the Voice Strategy. Maps recipient states to exact communicative jobs, appraisals, and non-arousing resonance.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <SourceFigureLink figure={getFigure('fig-05')} onOpenFigure={onOpenFigure} />
          <SourceFigureLink figure={getFigure('fig-08')} onOpenFigure={onOpenFigure} />
        </div>
      </div>

      {/* Mandatory Scientific Guardrail Alert */}
      <div className="p-4 bg-stone-900/70 border border-stone-800 rounded-xl flex items-start gap-3 text-xs text-stone-300">
        <Info size={18} className="text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1 leading-relaxed">
          <strong className="font-mono text-amber-300 uppercase text-[11px] block">
            Emotional Resonance ≠ High Emotional Arousal:
          </strong>
          <p>
            Maximal emotional elicitation is <strong>not</strong> the goal. For 5 of the 7 rows below, high emotional intensity is either irrelevant or actively counterproductive. Psychoeducation, help-seeking, and crisis communication require <strong>calm, contained, low-arousal clarity</strong> to avoid triggering flight or panic.
          </p>
        </div>
      </div>

      <ResonanceMap
        states={resonanceStates}
        selectedId={selectedResonanceId}
        onSelect={setSelectedResonanceId}
      />

      <PathwayFlow
        pathways={PATHWAYS}
        selectedId={current.id}
        onSelect={(id) => setSelectedStateIndex(Math.max(0, PATHWAYS.findIndex((p) => p.id === id)))}
      />

      {/* Select Audience State */}
      <div className="space-y-2">
        <span className="font-mono text-xs text-stone-400 uppercase tracking-wider block">
          Select Audience State (7 Documented Pathways):
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {PATHWAYS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedStateIndex(idx)}
              className={`p-3 rounded-xl border text-left text-xs transition space-y-1 ${
                selectedStateIndex === idx
                  ? 'bg-amber-500/20 border-amber-500/60 shadow-sm'
                  : 'bg-stone-900/60 hover:bg-stone-900 border-stone-800'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-stone-400">
                <span>State {idx + 1}</span>
                <span className="text-amber-400">{p.mechanismId}</span>
              </div>
              <p className="font-medium text-stone-200 line-clamp-2 leading-snug">
                {p.state}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Pathway Chain Visualizer */}
      <div className="p-6 bg-stone-900 border border-stone-700 rounded-2xl space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-stone-800 pb-3">
          <div>
            <span className="font-mono text-[10px] text-amber-400 uppercase tracking-wider">Active State Pathway:</span>
            <h3 className="text-lg font-serif font-bold text-stone-100">{current.state}</h3>
          </div>
          <button
            onClick={() => onNavigateToMechanism(current.mechanismId)}
            className="px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-mono border border-stone-700 transition flex items-center gap-1"
          >
            <span>Mechanism {current.mechanismId}</span>
            <ArrowRight size={12} />
          </button>
        </div>

        {/* 6-Step Sequential Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
          {/* Step 1: Objective */}
          <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 space-y-1.5">
            <div className="flex items-center gap-1.5 text-sky-400">
              <span className="font-mono font-bold text-[10px] px-1.5 py-0.2 rounded bg-sky-950 border border-sky-800">1</span>
              <span className="font-mono uppercase text-[10px] font-semibold">Communicative Objective</span>
            </div>
            <p className="text-stone-200 leading-relaxed pt-1">{current.objective}</p>
          </div>

          {/* Step 2: Appraisal */}
          <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 space-y-1.5">
            <div className="flex items-center gap-1.5 text-amber-400">
              <span className="font-mono font-bold text-[10px] px-1.5 py-0.2 rounded bg-amber-950 border border-amber-800">2</span>
              <span className="font-mono uppercase text-[10px] font-semibold">Desired Appraisal</span>
            </div>
            <p className="text-amber-200 italic font-serif text-sm leading-relaxed pt-1">&ldquo;{current.appraisal}&rdquo;</p>
          </div>

          {/* Step 3: Mechanism */}
          <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 space-y-1.5">
            <div className="flex items-center gap-1.5 text-purple-400">
              <span className="font-mono font-bold text-[10px] px-1.5 py-0.2 rounded bg-purple-950 border border-purple-800">3</span>
              <span className="font-mono uppercase text-[10px] font-semibold">Primary Mechanism</span>
            </div>
            <p className="text-stone-200 font-semibold pt-1">{current.mechanismName}</p>
            <span className="font-mono text-[10px] text-purple-300 block">{current.mechanismId}</span>
          </div>

          {/* Step 4: Emotion & Relationship */}
          <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 space-y-1.5">
            <div className="flex items-center gap-1.5 text-teal-400">
              <span className="font-mono font-bold text-[10px] px-1.5 py-0.2 rounded bg-teal-950 border border-teal-800">4</span>
              <span className="font-mono uppercase text-[10px] font-semibold">Emotional / Relational Tone</span>
            </div>
            <p className="text-stone-200 leading-relaxed pt-1">{current.emotion}</p>
          </div>

          {/* Step 5: Linguistic Syntax */}
          <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 space-y-1.5 md:col-span-2">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <span className="font-mono font-bold text-[10px] px-1.5 py-0.2 rounded bg-emerald-950 border border-emerald-800">5</span>
              <span className="font-mono uppercase text-[10px] font-semibold">Linguistic & Copy Implementation</span>
            </div>
            <p className="text-emerald-100 leading-relaxed pt-1">{current.linguistic}</p>
          </div>
        </div>

        {/* Step 6: Failure Mode */}
        <div className="p-4 bg-rose-950/30 border border-rose-800/60 rounded-xl space-y-1.5 text-xs text-rose-200">
          <div className="flex items-center gap-2">
            <AlertOctagon size={16} className="text-rose-400" />
            <span className="font-mono text-rose-300 font-bold uppercase text-[10px]">Documented Failure Mode:</span>
          </div>
          <p className="leading-relaxed">{current.failureMode}</p>
        </div>

        <EntityRail entityId={current.mechanismId} onNavigate={onNavigate} />
      </div>
    </div>
  );
};
