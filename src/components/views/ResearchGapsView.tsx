import React, { useState } from 'react';
import { Term } from '../common/Term';
import { researchGaps, corpusStats } from '../../data';
import type { ViewType } from '../../types';
import { AlertTriangle, ExternalLink, FlaskConical } from 'lucide-react';
import { getFigure, type FigureInfo } from '../common/FigureModal';
import { EvidenceFunnel } from '../charts/EvidenceFunnel';

interface Props {
  onOpenFigure: (fig: FigureInfo) => void;
  onNavigate: (view: ViewType, param?: string) => void;
}

export const ResearchGapsView: React.FC<Props> = ({ onOpenFigure, onNavigate }) => {
  const [selectedExperiment, setSelectedExperiment] = useState<number>(0);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="border-b border-stone-800 pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 font-mono text-xs border border-rose-500/20">
              Appendix D & Future Research Agenda
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
            Evidence Gaps & Scientific Humility
          </h1>
          <p className="text-stone-400 text-xs sm:text-sm mt-1 max-w-3xl">
            Documents what the research does NOT know. Distinguishes empirically verified facts from deductive hypotheses, and outlines the urgent randomized trials needed in Indonesia.
          </p>
        </div>

        <button
          onClick={() => onOpenFigure(getFigure('fig-11'))}
          className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 text-xs font-mono flex items-center gap-1.5 transition shrink-0"
        >
          <ExternalLink size={13} className="text-amber-400" />
          <span>View Figure 11: Evidence Funnel</span>
        </button>
      </div>

      {/* The Central Epistemic Limitation Banner */}
      <div className="p-5 bg-rose-950/30 border border-rose-800/60 rounded-2xl space-y-2 text-rose-200">
        <div className="flex items-center gap-2">
          <AlertTriangle size={18} className="text-rose-400 shrink-0" />
          <strong className="font-mono text-rose-300 uppercase" style={{ fontSize: 'var(--t-micro)' }}>
            The single largest gap in the entire literature
          </strong>
        </div>
        <p className="text-rose-100 font-serif leading-relaxed" style={{ fontSize: 'var(--t-lead)' }}>
          {researchGaps.primaryConstraint}
        </p>
        <p className="text-rose-300 leading-relaxed pt-1" style={{ fontSize: 'var(--t-small)' }}>
          {corpusStats.sourceDocuments} documents, roughly 155,000 words, {corpusStats.domains} research domains, and{' '}
          {corpusStats.indonesianWordingTested} studies that manipulated Indonesian wording while holding other factors
          constant. Every wording recommendation in this synthesis is a{' '}
          <strong>hypothesis derived from mechanism evidence collected elsewhere</strong>. This must govern how Menungsa
          allocates its research resources.
        </p>
      </div>

      {/* Counted from the ledger, so the terminal zero is a result rather than an assertion. */}
      <EvidenceFunnel onDrill={(stage) => onNavigate('evidence', stage === 'indonesia' ? 'D7' : undefined)} />

      {/* 3 Tiers of Gaps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
        {/* Tier 1 */}
        <div className="p-5 bg-stone-900 border border-stone-700 rounded-2xl space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-mono font-bold uppercase text-xs border-b border-stone-800 pb-2">
            <span>Tier 1: Gaps That Block Confident Action Now</span>
          </div>
          <div className="space-y-3">
            {researchGaps.tier1.map((gap, idx) => (
              <div key={idx} className="p-3 bg-stone-950 rounded-xl border border-stone-800 space-y-1">
                <h4 className="font-semibold text-stone-200 text-xs">{gap.title}</h4>
                <p className="text-stone-400 text-[11px] leading-snug">{gap.impact}</p>
                {gap.solution && (
                  <span className="text-[10px] font-mono text-emerald-400 block pt-1">
                    ➔ Next Step: {gap.solution}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tier 2 */}
        <div className="p-5 bg-stone-900 border border-stone-700 rounded-2xl space-y-3">
          <div className="flex items-center gap-2 text-sky-400 font-mono font-bold uppercase text-xs border-b border-stone-800 pb-2">
            <span>Tier 2: Gaps That Limit Scientific Interpretation</span>
          </div>
          <div className="space-y-3">
            {researchGaps.tier2.map((gap, idx) => (
              <div key={idx} className="p-3 bg-stone-950 rounded-xl border border-stone-800 space-y-1">
                <h4 className="font-semibold text-stone-200 text-xs">{gap.title}</h4>
                <p className="text-stone-400 text-[11px] leading-snug">{gap.impact}</p>
              </div>
            ))}

            <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 space-y-1">
              <h4 className="font-semibold text-stone-200 text-xs">Under-Corpused Natural Male Conversation</h4>
              <p className="text-stone-400 text-[11px] leading-snug">
                Brand captions and ad slogans are abundant in research. Natural recordings of Indonesian men talking organically in warkop or sports groups are almost nonexistent in scholarly corpora.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Tool: 4 Priority Wording Experiments */}
      <div className="p-6 bg-stone-900 border border-amber-500/40 rounded-2xl space-y-5 shadow-xl">
        <div className="flex items-center justify-between border-b border-stone-800 pb-3">
          <div className="flex items-center gap-2">
            <FlaskConical size={18} className="text-amber-400" />
            <h3 className="text-base font-serif font-bold text-stone-100">
              The wording tests this corpus is missing
            </h3>
          </div>
          <span className="text-xs font-mono text-stone-400">Ready for Execution</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
          {researchGaps.factorialExperiments.map((exp, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedExperiment(idx)}
              className={`p-3 rounded-xl border text-left text-xs transition ${
                selectedExperiment === idx
                  ? 'bg-amber-500 text-stone-950 font-bold border-amber-400'
                  : 'bg-stone-950 text-stone-300 hover:text-stone-100 border-stone-800'
              }`}
            >
              <span className="font-mono text-[10px] block opacity-80">Test {idx + 1}</span>
              <span className="truncate block mt-0.5">{exp.name}</span>
            </button>
          ))}
        </div>

        {/* Selected Experiment Spec */}
        <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 space-y-4 text-xs">
          <h4 className="font-mono text-amber-300 uppercase font-bold text-xs">
            {researchGaps.factorialExperiments[selectedExperiment].name}
          </h4>

          <div className="space-y-1.5">
            <div className="space-y-1 pb-1">
              <span className="font-mono text-stone-400 uppercase text-[10px] block">
                The versions that would be compared:
              </span>
              <p className="text-stone-400 leading-relaxed" style={{ fontSize: 'var(--t-micro)' }}>
                Each line below is the same message written a different way. A{' '}
                <Term id="G10">factorial test</Term> shows them to randomly assigned readers and compares the
                results, so the effect of the wording can be separated from everything else.{' '}
                <strong className="text-amber-300">None of these has been run.</strong>
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {researchGaps.factorialExperiments[selectedExperiment].conditions.map((cond, cIdx) => (
                <div key={cIdx} className="p-2.5 bg-stone-900 rounded-lg border border-stone-800 text-stone-200 font-serif">
                  {cond}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-stone-800/80">
            <span className="font-mono text-sky-400 uppercase text-[10px] block">Primary Measurable Outcomes:</span>
            <div className="flex flex-wrap gap-2">
              {researchGaps.factorialExperiments[selectedExperiment].measures.map((m, mIdx) => (
                <span key={mIdx} className="px-2.5 py-1 rounded bg-stone-900 text-stone-300 font-mono text-[11px] border border-stone-800">
                  ✓ {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
