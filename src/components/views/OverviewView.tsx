import React from 'react';
import { Term } from '../common/Term';
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import type { ViewType } from '../../types';
import { domains, intersections, corpusStats } from '../../data';
import { getFigure, type FigureInfo } from '../common/FigureModal';
import { DomainRelationMap } from '../charts/DomainRelationMap';
import { SourceFigureLink } from '../common/SourceFigureLink';

interface Props {
  onNavigate: (view: ViewType, filterOrId?: string) => void;
  onOpenFigure: (fig: FigureInfo) => void;
}

export const OverviewView: React.FC<Props> = ({ onNavigate, onOpenFigure }) => {
  // Moved to src/data/domains.json; counts below come from the ledger, never hardcoded.
  const DOMAINS = domains;

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Top Banner & Title */}
      <div className="border-b border-stone-800 pb-6 space-y-3">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono">
          <Sparkles size={13} />
          <span>Interactive Synthesis & Knowledge System</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-100 tracking-tight">
          Menungsa Research Synthesis
        </h1>
        <p className="text-stone-300 text-base leading-relaxed max-w-4xl font-sans">
          A cross-report synthesis of male-facing verbal communication across 7 research domains, and its evidence-driven translation into an authentic voice strategy for an Indonesian men’s mental-health organisation.
        </p>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3.5 bg-stone-900/80 border border-stone-800 rounded-xl space-y-1">
          <span className="text-[11px] font-mono text-stone-400 uppercase block">Research Domains</span>
          <span className="text-2xl font-serif font-bold text-stone-100">{corpusStats.domains}</span>
          <span className="text-[10px] text-stone-400 block">D1 to D7</span>
        </div>

        <div className="p-3.5 bg-stone-900/80 border border-stone-800 rounded-xl space-y-1">
          <span className="text-[11px] font-mono text-stone-400 uppercase block">Corpus Source Material</span>
          <span className="text-2xl font-serif font-bold text-stone-100">{corpusStats.sourceDocuments}</span>
          <span className="text-[10px] text-stone-400 block">~155,000 words analyzed</span>
        </div>

        <div className="p-3.5 bg-stone-900/80 border border-stone-800 rounded-xl space-y-1">
          <span className="text-[11px] font-mono text-stone-400 uppercase block">Unique Studies</span>
          <span className="text-2xl font-serif font-bold text-stone-100">~120</span>
          <span className="text-[10px] text-stone-400 block">After <Term id="G03">deduplication</Term></span>
        </div>

        <div className="p-3.5 bg-stone-900/80 border border-stone-800 rounded-xl space-y-1">
          <span className="text-[11px] font-mono text-stone-400 uppercase block">Catalogued Claims</span>
          <span className="text-2xl font-serif font-bold text-amber-400">{corpusStats.totalClaims}</span>
          <span className="text-[10px] text-stone-400 block">In claim ledger matrix</span>
        </div>

        <div className="p-3.5 bg-stone-900/80 border border-stone-800 rounded-xl space-y-1">
          <span className="text-[11px] font-mono text-stone-400 uppercase block">Derived Mechanisms</span>
          <span className="text-2xl font-serif font-bold text-sky-400">{corpusStats.mechanisms}</span>
          <span className="text-[10px] text-stone-400 block">M01 to M20</span>
        </div>

        <div className="p-3.5 bg-rose-950/20 border border-rose-900/40 rounded-xl space-y-1">
          <span className="text-[11px] font-mono text-rose-400 uppercase block font-semibold">Indo Wording RCTs</span>
          <span className="text-2xl font-serif font-bold text-rose-300">{corpusStats.indonesianWordingTested}</span>
          <span className="text-[10px] text-rose-400/80 block">Binding limitation</span>
        </div>
      </div>

      {/* Core Syntheses / The 5 Foundational Principles */}
      <div className="bg-stone-900/50 border border-stone-800 rounded-xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-stone-800/80 pb-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} className="text-emerald-400" />
            <h3 className="text-sm font-semibold text-stone-100 uppercase tracking-wider font-mono">
              The 5 Core Empirical Realities
            </h3>
          </div>
          <span className="text-xs font-mono text-stone-400">Phase A & B Convergence</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
          <div className="p-3.5 bg-stone-950/70 border border-stone-800 rounded-lg space-y-1.5">
            <span className="font-mono text-amber-400 font-semibold text-[11px]">1. No Universal Male Tone of Voice</span>
            <p className="text-stone-300 leading-relaxed">
              The two highest-rigour reports independently confirm that men do not possess a biologically determined "male brain dialect." Responses vary by topic, peer norms, setting, stigma, and public visibility.
            </p>
          </div>

          <div className="p-3.5 bg-stone-950/70 border border-stone-800 rounded-lg space-y-1.5">
            <span className="font-mono text-emerald-400 font-semibold text-[11px]">2. Best-Evidenced Mechanism is General Human</span>
            <p className="text-stone-300 leading-relaxed">
              Controlling, freedom-threatening language reliably triggers psychological <Term id="G04">reactance</Term> (<em className="font-serif">r</em> = .20) and counterarguing across all humans. Only 3 of 20 mechanisms are empirically male-differentiated.
            </p>
          </div>

          <div className="p-3.5 bg-stone-950/70 border border-stone-800 rounded-lg space-y-1.5">
            <span className="font-mono text-sky-400 font-semibold text-[11px]">3. Engagement Is Not an Outcome</span>
            <p className="text-stone-300 leading-relaxed">
              Outrage maximizes social virality while actively depressing costly action (like petition signing). Agency and prosocial language show the exact opposite: modest reach but high behavioral conversion.
            </p>
          </div>

          <div className="p-3.5 bg-stone-950/70 border border-stone-800 rounded-lg space-y-1.5">
            <span className="font-mono text-purple-400 font-semibold text-[11px]">4. Lowering Response Cost &gt; Raising Emotional Intensity</span>
            <p className="text-stone-300 leading-relaxed">
              The single strongest cross-domain pattern is that effective male-facing communication removes the social friction and exposure cost of responding, rather than demanding high emotional vulnerability.
            </p>
          </div>

          <div className="p-3.5 bg-stone-950/70 border border-stone-800 rounded-lg space-y-1.5 md:col-span-2">
            <span className="font-mono text-teal-400 font-semibold text-[11px]">5. Indonesian Care is Relational, Not Individualist</span>
            <p className="text-stone-300 leading-relaxed">
              The autonomous help-seeker at the center of Western models does not transfer. In Indonesia, care is arranged relationally through households (wives, mothers, kin) and community acts simultaneously as both care and surveillance.
            </p>
          </div>
        </div>
      </div>

      <DomainRelationMap
        domains={domains}
        intersections={intersections}
        onSelect={(id) => onNavigate('evidence', id)}
      />

      {/* Explore by Research Question Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-serif font-bold text-stone-100">Explore by Core Research Question</h3>
            <p className="text-xs text-stone-400">Non-linear entry points into the visual knowledge system</p>
          </div>
          <SourceFigureLink figure={getFigure('fig-01')} onOpenFigure={onOpenFigure} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {/* Q1 */}
          <div 
            onClick={() => onNavigate('mechanisms')}
            className="p-4 bg-stone-900/60 hover:bg-stone-900 border border-stone-800 hover:border-amber-500/40 rounded-xl cursor-pointer transition space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800">M01–M20</span>
              <ArrowRight size={14} className="text-stone-500 group-hover:text-amber-400 group-hover:translate-x-1 transition" />
            </div>
            <h4 className="text-sm font-semibold text-stone-100 group-hover:text-amber-200 transition">
              “What psychological mechanisms repeatedly appear?”
            </h4>
            <p className="text-xs text-stone-400 line-clamp-2">
              Explore {corpusStats.mechanisms} unified mechanisms across response cost, agency, belonging, status, and emotional exposure.
            </p>
          </div>

          {/* Q2 */}
          <div 
            onClick={() => onNavigate('evidence')}
            className="p-4 bg-stone-900/60 hover:bg-stone-900 border border-stone-800 hover:border-amber-500/40 rounded-xl cursor-pointer transition space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">{corpusStats.totalClaims} Claims</span>
              <ArrowRight size={14} className="text-stone-500 group-hover:text-amber-400 group-hover:translate-x-1 transition" />
            </div>
            <h4 className="text-sm font-semibold text-stone-100 group-hover:text-amber-200 transition">
              “Which findings are strongly supported vs speculative?”
            </h4>
            <p className="text-xs text-stone-400 line-clamp-2">
              Filter {corpusStats.totalClaims} claims by methodology, causal status, sample size, outcome tier, and wording manipulation.
            </p>
          </div>

          {/* Q3 */}
          <div 
            onClick={() => onNavigate('indonesia')}
            className="p-4 bg-stone-900/60 hover:bg-stone-900 border border-stone-800 hover:border-amber-500/40 rounded-xl cursor-pointer transition space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-800">Indo Focus</span>
              <ArrowRight size={14} className="text-stone-500 group-hover:text-amber-400 group-hover:translate-x-1 transition" />
            </div>
            <h4 className="text-sm font-semibold text-stone-100 group-hover:text-amber-200 transition">
              “What appears particularly relevant to Indonesian men?”
            </h4>
            <p className="text-xs text-stone-400 line-clamp-2">
              Investigate the bapak trap, gotong royong surveillance, halus vs kasar, and structural JKN/Puskesmas friction.
            </p>
          </div>

          {/* Q4 */}
          <div 
            onClick={() => onNavigate('contradictions')}
            className="p-4 bg-stone-900/60 hover:bg-stone-900 border border-stone-800 hover:border-amber-500/40 rounded-xl cursor-pointer transition space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">{corpusStats.contradictions} Conflicts</span>
              <ArrowRight size={14} className="text-stone-500 group-hover:text-amber-400 group-hover:translate-x-1 transition" />
            </div>
            <h4 className="text-sm font-semibold text-stone-100 group-hover:text-amber-200 transition">
              “Where do the reports contradict each other and why?”
            </h4>
            <p className="text-xs text-stone-400 line-clamp-2">
              See how {corpusStats.contradictions - corpusStats.unresolvedContradictions} contradictions dissolve through boundary condition decomposition, plus the 1 unresolved tension (X10).
            </p>
          </div>

          {/* Q5 */}
          <div 
            onClick={() => onNavigate('manosphere')}
            className="p-4 bg-stone-900/60 hover:bg-stone-900 border border-stone-800 hover:border-amber-500/40 rounded-xl cursor-pointer transition space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">5 Functions</span>
              <ArrowRight size={14} className="text-stone-500 group-hover:text-amber-400 group-hover:translate-x-1 transition" />
            </div>
            <h4 className="text-sm font-semibold text-stone-100 group-hover:text-amber-200 transition">
              “What functions can be separated from manosphere ideology?”
            </h4>
            <p className="text-xs text-stone-400 line-clamp-2">
              Deconstruct certainty, validation, status, agency, and belonging into non-misogynistic ethical alternatives.
            </p>
          </div>

          {/* Q6 */}
          <div 
            onClick={() => onNavigate('voicelab')}
            className="p-4 bg-stone-900/60 hover:bg-stone-900 border border-stone-800 hover:border-amber-500/40 rounded-xl cursor-pointer transition space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">{corpusStats.toneContexts} Presets</span>
              <ArrowRight size={14} className="text-stone-500 group-hover:text-amber-400 group-hover:translate-x-1 transition" />
            </div>
            <h4 className="text-sm font-semibold text-stone-100 group-hover:text-amber-200 transition">
              “What tone configuration fits different mental-health jobs?”
            </h4>
            <p className="text-xs text-stone-400 line-clamp-2">
              Experiment with 10 tone dimensions across psychoeducation, storytelling, peer invitation, and crisis management.
            </p>
          </div>
        </div>
      </div>

      {/* The 7 Research Domains Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-stone-100 font-mono uppercase tracking-wide">
            The {corpusStats.domains} research domains in corpus
          </h3>
          <span className="text-xs text-stone-400">Click to view relevant evidence</span>
        </div>

        <div className="border border-stone-800 rounded-xl overflow-hidden divide-y divide-stone-800 bg-stone-950">
          {DOMAINS.map((domain) => (
            <div 
              key={domain.id}
              onClick={() => onNavigate('evidence', domain.id)}
              className="p-3 sm:px-4 sm:py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-stone-900/70 cursor-pointer transition"
            >
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded bg-stone-800 text-stone-300 font-mono text-xs font-bold shrink-0">
                  {domain.id}
                </span>
                <div>
                  <h4 className="text-sm font-medium text-stone-200">{domain.name}</h4>
                  <p className="text-xs text-stone-400">{domain.focus}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono shrink-0 pl-9 sm:pl-0">
                <span className="text-stone-400">{domain.studies} studies</span>
                <span className={`px-2 py-0.5 rounded ${
                  domain.reliability.includes('Highest') ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                  domain.reliability.includes('High') ? 'bg-teal-950 text-teal-300 border border-teal-800' :
                  'bg-amber-950 text-amber-300 border border-amber-800'
                }`}>
                  {domain.reliability}
                </span>
                <ArrowRight size={14} className="text-stone-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
