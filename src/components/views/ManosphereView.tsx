import React, { useState } from 'react';
import { manosphereAlternatives } from '../../data';
import type { ManosphereAlternative } from '../../types';
import { ShieldCheck, ArrowRight, Check, X, Info } from 'lucide-react';
import { getFigure, type FigureInfo } from '../common/FigureModal';
import { FunctionSwap } from '../charts/FunctionSwap';
import { SourceFigureLink } from '../common/SourceFigureLink';

interface Props {
  onOpenFigure: (fig: FigureInfo) => void;
  onNavigateToMechanism: (id: string) => void;
}

export const ManosphereView: React.FC<Props> = ({ onOpenFigure, onNavigateToMechanism }) => {
  const [selectedFunction, setSelectedFunction] = useState<ManosphereAlternative>(manosphereAlternatives[0]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="border-b border-stone-800 pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-mono text-xs border border-amber-500/20">
              Domains D3 & D4 Analytical Deconstruction
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
            Manosphere: Functional Analysis Without Ideology
          </h1>
          <p className="text-stone-400 text-xs sm:text-sm mt-1 max-w-3xl">
            Separates the legitimate psychological needs that draw men to online masculinity content from the toxic, misogynistic ideologies that exploit them.
          </p>
        </div>

        <SourceFigureLink figure={getFigure('fig-12')} onOpenFigure={onOpenFigure} className="shrink-0" />
      </div>

      {/* Demographics & Prevalence Reality Check */}
      <div className="p-4 bg-stone-900/70 border border-stone-800 rounded-xl space-y-2 text-xs text-stone-300">
        <div className="flex items-center gap-2">
          <Info size={16} className="text-sky-400" />
          <strong className="font-mono text-stone-200 uppercase text-[11px]">
            The Empirical Audience Reality (Movember 2025 Study):
          </strong>
        </div>
        <p className="leading-relaxed">
          Most young men engage regularly with masculinity influencers, and those followers are <em>more</em> likely to be
          employed, educated, higher-income and partnered than non-followers, and equally lonely. They are not fringe
          "broken men"—they are mainstream men looking for practical maps that traditional institutions fail to supply.
        </p>
        <details className="pt-1">
          <summary className="cursor-pointer text-stone-500 hover:text-stone-300 font-mono" style={{ fontSize: 'var(--t-micro)' }}>
            Where these numbers come from
          </summary>
          <p className="leading-relaxed pt-1.5 text-stone-400" style={{ fontSize: 'var(--t-micro)' }}>
            A 3-country survey of 3,048 young men, of whom 63% engaged regularly. Survey provenance, not a
            copywriting decision: it establishes who the audience is, not what to say to them.
          </p>
        </details>
      </div>

      <FunctionSwap
        alternatives={manosphereAlternatives}
        selectedFunction={selectedFunction.functionName}
        onSelect={(name) => {
          const found = manosphereAlternatives.find((a) => a.functionName === name);
          if (found) setSelectedFunction(found);
        }}
      />

      {/* Function Selector Buttons */}
      <div className="space-y-2">
        <span className="font-mono text-xs text-stone-400 uppercase tracking-wider block">
          Select Core Value Proposition to Deconstruct:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {manosphereAlternatives.map((alt) => {
            const isSelected = selectedFunction.functionName === alt.functionName;
            return (
              <button
                key={alt.functionName}
                onClick={() => setSelectedFunction(alt)}
                className={`p-3 rounded-xl border text-left text-xs transition space-y-1 ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-500/60 shadow-sm'
                    : 'bg-stone-900/60 hover:bg-stone-900 border-stone-800'
                }`}
              >
                <span className="font-mono text-[10px] text-amber-400 block">{alt.mechanismId}</span>
                <h4 className="font-semibold text-stone-200 leading-tight">{alt.functionName}</h4>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5-Step Analytical Flow Container */}
      <div className="p-6 bg-stone-900 border border-stone-700 rounded-2xl space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-stone-800 pb-3">
          <div>
            <span className="font-mono text-[10px] text-amber-400 uppercase tracking-wider">
              Deconstructed Proposition:
            </span>
            <h3 className="text-xl font-serif font-bold text-stone-100">
              {selectedFunction.functionName}
            </h3>
          </div>
          <button
            onClick={() => onNavigateToMechanism(selectedFunction.mechanismId)}
            className="px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-mono border border-stone-700 transition flex items-center gap-1"
          >
            <span>Mechanism {selectedFunction.mechanismId}</span>
            <ArrowRight size={12} />
          </button>
        </div>

        {/* 4 Box Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
          {/* Legitimate Need */}
          <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 space-y-1.5">
            <span className="font-mono text-sky-400 uppercase text-[10px] font-semibold block">
              1. The Legitimate Underlying Human Need
            </span>
            <p className="text-stone-200 leading-relaxed font-medium">
              {selectedFunction.underlyingNeed}
            </p>
          </div>

          {/* Why Compelling */}
          <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 space-y-1.5">
            <span className="font-mono text-amber-400 uppercase text-[10px] font-semibold block">
              2. Why It Is Psychologically Compelling
            </span>
            <p className="text-stone-200 leading-relaxed font-medium">
              {selectedFunction.whyCompelling}
            </p>
          </div>

          {/* Harmful Implementation */}
          <div className="p-4 bg-rose-950/20 rounded-xl border border-rose-800/40 space-y-2">
            <div className="flex items-center gap-1.5 text-rose-400">
              <X size={15} />
              <span className="font-mono uppercase text-[10px] font-bold">
                3. The Manosphere’s Harmful Implementation
              </span>
            </div>
            <p className="text-rose-100 leading-relaxed font-sans">
              {selectedFunction.harmfulImplementation}
            </p>
          </div>

          {/* Ethical Alternative */}
          <div className="p-4 bg-emerald-950/20 rounded-xl border border-emerald-800/40 space-y-2">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <Check size={15} />
              <span className="font-mono uppercase text-[10px] font-bold">
                4. The Ethical Functional Alternative (Menungsa)
              </span>
            </div>
            <p className="text-emerald-100 leading-relaxed font-sans">
              {selectedFunction.ethicalAlternative}
            </p>
          </div>
        </div>

        {/* Guiding Principle */}
        <div className="p-4 bg-stone-950 rounded-xl border border-amber-500/30 flex items-center justify-between text-xs">
          <span className="text-stone-300">
            <strong className="font-mono text-amber-300 uppercase mr-2">Governing Rule:</strong>
            {selectedFunction.keyPrinciple}
          </span>
          <ShieldCheck size={18} className="text-amber-400 shrink-0 ml-2" />
        </div>
      </div>
    </div>
  );
};
