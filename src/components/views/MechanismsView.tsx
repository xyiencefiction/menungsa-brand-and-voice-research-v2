import React, { useState } from 'react';
import { matchesText } from '../../i18n/translate';
import { mechanisms, claims, confidenceTier, CONFIDENCE_TIERS, CONFIDENCE_LABEL } from '../../data';
import type { Mechanism, ViewType } from '../../types';
import { ConfidenceTag } from '../common/ConfidenceTag';
import { EntityRail } from '../common/EntityRail';
import { AlertOctagon, Search, ArrowRight, X, Info } from 'lucide-react';
import { getFigure, type FigureInfo } from '../common/FigureModal';
import { MechanismModel } from '../charts/MechanismModel';
import { SourceFigureLink } from '../common/SourceFigureLink';

interface Props {
  initialSelectedId?: string;
  onOpenFigure: (fig: FigureInfo) => void;
  onNavigateToEvidence: (mechanismId: string) => void;
  onNavigate: (view: ViewType, param?: string) => void;
}

export const MechanismsView: React.FC<Props> = ({
  initialSelectedId,
  onOpenFigure,
  onNavigateToEvidence,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState<string>('ALL');
  const [selectedStrength, setSelectedStrength] = useState<string>('ALL');
  const [activeMechanism, setActiveMechanism] = useState<Mechanism | null>(() => {
    if (initialSelectedId) {
      return mechanisms.find(m => m.mechanism_id === initialSelectedId) || null;
    }
    return null;
  });

  const filteredMechanisms = mechanisms.filter(m => {
    const matchesSearch = matchesText(`${m.mechanism} ${m.mechanism_id} ${m.psychological_mechanism} ${m.appraisal}`, searchQuery);

    const matchesClass = selectedClass === 'ALL' || m.male_specificity_class.toUpperCase().includes(selectedClass);
    // Substring matching sent MODERATE-STRONG rows into the STRONG bucket; compare tiers.
    const matchesStrength = selectedStrength === 'ALL' || confidenceTier(m.evidence_strength) === selectedStrength;

    return matchesSearch && matchesClass && matchesStrength;
  });

  const getClassBadgeStyle = (cls: string) => {
    const c = cls.toUpperCase();
    if (c.includes('MALE-DIFFERENTIATED')) return 'bg-rose-950 text-rose-300 border-rose-800';
    if (c.includes('INDONESIA')) return 'bg-teal-950 text-teal-300 border-teal-800';
    if (c.includes('SOCIAL-CONTEXT')) return 'bg-amber-950 text-amber-300 border-amber-800';
    return 'bg-blue-950 text-blue-300 border-blue-800'; // General
  };

  const relatedClaims = activeMechanism
    ? claims.filter((c) => c.mechanism_cluster.includes(activeMechanism.mechanism_id))
    : [];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="border-b border-stone-800 pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 font-mono text-xs border border-sky-500/20">
              The 20 Derived Mechanisms (M01–M20)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
            Psychological Mechanism Explorer
          </h1>
          <p className="text-stone-400 text-xs sm:text-sm mt-1 max-w-3xl">
            Derived across 7 research domains. Traces message features through cognitive appraisal, psychological mechanism, emotional response, and behavioral outcome.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <SourceFigureLink figure={getFigure('fig-02')} onOpenFigure={onOpenFigure} />
          <SourceFigureLink figure={getFigure('fig-04')} onOpenFigure={onOpenFigure} />
        </div>
      </div>

      <MechanismModel
        mechanisms={mechanisms}
        selectedId={activeMechanism?.mechanism_id}
        onSelect={(id) => setActiveMechanism(mechanisms.find((m) => m.mechanism_id === id) ?? null)}
      />

      {/* Mandatory Scientific Guardrail Card */}
      <div className="p-4 bg-stone-900/60 border border-stone-800 rounded-xl flex items-start gap-3 text-xs text-stone-300">
        <Info size={18} className="text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1 leading-relaxed">
          <span className="font-mono text-stone-200 font-semibold uppercase text-[11px] block">
            Mandatory Specificity Rule:
          </span>
          <p>
            <em className="text-amber-200">"Would this principle still make sense if the audience were not male?"</em> Only <strong>3 of 20 mechanisms</strong> are empirically male-differentiated—and even those are moderated by subjective gender identity centrality, not biological sex. Most what works for men works for all humans.
          </p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-stone-950 p-3 rounded-xl border border-stone-800">
        <div className="relative w-full sm:w-72">
          <Search size={15} className="absolute left-3 top-2.5 text-stone-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter mechanisms..."
            className="w-full bg-stone-900 text-stone-200 pl-9 pr-3 py-1.5 text-xs rounded-lg border border-stone-800 focus:outline-none focus:border-amber-500/50"
          />
        </div>

        {/* Specificity Class Filter */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-[11px] font-mono text-stone-400 uppercase mr-1">Class:</span>
          {['ALL', 'GENERAL', 'SOCIAL-CONTEXT', 'MALE-DIFFERENTIATED', 'INDONESIA'].map(cls => (
            <button
              key={cls}
              onClick={() => setSelectedClass(cls)}
              className={`px-2 py-1 rounded text-[10px] font-mono whitespace-nowrap transition ${
                selectedClass === cls
                  ? 'bg-amber-500 text-stone-950 font-bold'
                  : 'bg-stone-900 hover:bg-stone-800 text-stone-400'
              }`}
            >
              {cls}
            </button>
          ))}
        </div>

        {/* Evidence Strength Filter */}
        <div className="flex items-center gap-1.5 ml-auto overflow-x-auto">
          <span className="text-[11px] font-mono text-stone-400 uppercase mr-1">Strength:</span>
          {['ALL', ...CONFIDENCE_TIERS].map(str => (
            <button
              key={str}
              onClick={() => setSelectedStrength(str)}
              className={`px-2 py-1 rounded text-[10px] font-mono whitespace-nowrap transition ${
                selectedStrength === str
                  ? 'bg-sky-500 text-stone-950 font-bold'
                  : 'bg-stone-900 hover:bg-stone-800 text-stone-400'
              }`}
            >
              {str === 'ALL' ? 'ALL' : CONFIDENCE_LABEL[str as keyof typeof CONFIDENCE_LABEL]}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Mechanism Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMechanisms.map((mech) => (
          <div
            key={mech.mechanism_id}
            onClick={() => setActiveMechanism(mech)}
            className={`p-4 rounded-xl border transition cursor-pointer flex flex-col justify-between space-y-3 ${
              activeMechanism?.mechanism_id === mech.mechanism_id
                ? 'bg-stone-900 border-amber-500/60 shadow-lg shadow-amber-950/20'
                : 'bg-stone-900/60 hover:bg-stone-900 border-stone-800 hover:border-stone-700'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-stone-800 text-amber-300 border border-stone-700">
                  {mech.mechanism_id}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium border ${getClassBadgeStyle(mech.male_specificity_class)}`}>
                    {mech.male_specificity_class}
                  </span>
                  <ConfidenceTag confidence={mech.evidence_strength} />
                </div>
              </div>

              <h3 className="text-base font-semibold text-stone-100 font-serif leading-snug">
                {mech.mechanism}
              </h3>

              <div className="text-xs space-y-1.5 pt-1">
                <div className="flex items-start gap-1.5">
                  <span className="font-mono text-[10px] text-stone-400 uppercase shrink-0 mt-0.5">Perception:</span>
                  <span className="text-stone-300 italic">"{mech.perceived_social_meaning}"</span>
                </div>

                <div className="flex items-start gap-1.5">
                  <span className="font-mono text-[10px] text-stone-400 uppercase shrink-0 mt-0.5">Appraisal:</span>
                  <span className="text-stone-400">{mech.appraisal}</span>
                </div>
              </div>
            </div>

            {/* Failure Mode Warning Preview */}
            <div className="pt-2 border-t border-stone-800/80">
              <div className="p-2 bg-rose-950/20 border border-rose-900/30 rounded-lg flex items-start gap-2">
                <AlertOctagon size={13} className="text-rose-400 shrink-0 mt-0.5" />
                <span className="text-[11px] text-rose-300 line-clamp-1 leading-tight">
                  <strong className="font-mono uppercase text-[9px] block">Backfire risk:</strong>
                  {mech.failure_mode}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mechanism Deep Detail Modal / Drawer */}
      {activeMechanism && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/80 backdrop-blur-xs p-0 sm:p-4">
          <div className="bg-stone-900 border-l sm:border border-stone-700 w-full max-w-2xl h-full sm:h-[94vh] sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
            {/* Drawer Header */}
            <div className="px-6 py-4 border-b border-stone-800 flex items-center justify-between bg-stone-950/80">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-500/30">
                  {activeMechanism.mechanism_id}
                </span>
                <h3 className="text-lg font-serif font-bold text-stone-100">{activeMechanism.mechanism}</h3>
              </div>
              <button
                onClick={() => setActiveMechanism(null)}
                className="p-1.5 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-stone-200 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs font-sans">
              {/* Badges & Specificity */}
              <div className="flex flex-wrap items-center gap-2 pb-3 border-b border-stone-800">
                <span className={`px-2.5 py-1 rounded font-mono text-xs border ${getClassBadgeStyle(activeMechanism.male_specificity_class)}`}>
                  {activeMechanism.male_specificity_class}
                </span>
                <ConfidenceTag confidence={activeMechanism.evidence_strength} />
              </div>

              {/* Message Feature & Social Meaning */}
              <div className="space-y-2">
                <span className="font-mono text-stone-400 uppercase text-[10px] tracking-wider block">Message Feature (Syntax & Cue)</span>
                <p className="text-stone-200 bg-stone-950 p-3 rounded-lg border border-stone-800 leading-relaxed">
                  {activeMechanism.message_feature}
                </p>
              </div>

              <div className="space-y-2">
                <span className="font-mono text-amber-400 uppercase text-[10px] tracking-wider block">Audience Mental Monologue</span>
                <p className="text-amber-200 italic bg-amber-950/20 p-3 rounded-lg border border-amber-900/40 text-sm leading-relaxed">
                  {activeMechanism.perceived_social_meaning}
                </p>
              </div>

              {/* Mechanism Processing Chain */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-stone-950 rounded-lg border border-stone-800 space-y-1">
                  <span className="font-mono text-sky-400 uppercase text-[10px] block">Cognitive Appraisal</span>
                  <p className="text-stone-300 leading-relaxed">{activeMechanism.appraisal}</p>
                </div>
                <div className="p-3 bg-stone-950 rounded-lg border border-stone-800 space-y-1">
                  <span className="font-mono text-purple-400 uppercase text-[10px] block">Psychological Mechanism</span>
                  <p className="text-stone-300 leading-relaxed">{activeMechanism.psychological_mechanism}</p>
                </div>
                <div className="p-3 bg-stone-950 rounded-lg border border-stone-800 space-y-1">
                  <span className="font-mono text-emerald-400 uppercase text-[10px] block">Emotional Response</span>
                  <p className="text-stone-300 leading-relaxed">{activeMechanism.emotional_response}</p>
                </div>
                <div className="p-3 bg-stone-950 rounded-lg border border-stone-800 space-y-1">
                  <span className="font-mono text-teal-400 uppercase text-[10px] block">Relational Response</span>
                  <p className="text-stone-300 leading-relaxed">{activeMechanism.relational_response}</p>
                </div>
              </div>

              {/* Behavioral Possibility & Moderators */}
              <div className="p-3 bg-stone-950 rounded-lg border border-stone-800 space-y-1.5">
                <span className="font-mono text-amber-400 uppercase text-[10px] block">Behavioral Possibility Enabled</span>
                <p className="text-stone-200 leading-relaxed">{activeMechanism.behavioural_possibility}</p>
              </div>

              <div className="p-3 bg-stone-950 rounded-lg border border-stone-800 space-y-1.5">
                <span className="font-mono text-stone-400 uppercase text-[10px] block">Key Moderating Variables</span>
                <p className="text-stone-300 leading-relaxed">{activeMechanism.key_moderators}</p>
              </div>

              {/* Failure Mode Alert Box */}
              <div className="p-4 bg-rose-950/30 border border-rose-800/60 rounded-xl space-y-2">
                <div className="flex items-center gap-2">
                  <AlertOctagon size={16} className="text-rose-400" />
                  <span className="font-mono text-rose-300 font-bold uppercase text-xs">Failure Mode / Backfire Dynamics</span>
                </div>
                <p className="text-rose-200 leading-relaxed">{activeMechanism.failure_mode}</p>
              </div>

              <EntityRail entityId={activeMechanism.mechanism_id} onNavigate={(v, p) => { setActiveMechanism(null); onNavigate(v, p); }} />

              {/* Related Claims */}
              {relatedClaims.length > 0 && (
                <div className="pt-3 border-t border-stone-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-stone-400 uppercase text-[10px]">
                      Related Claims in Ledger ({relatedClaims.length})
                    </span>
                    <button
                      onClick={() => onNavigateToEvidence(activeMechanism.mechanism_id)}
                      className="text-amber-400 hover:text-amber-300 font-mono text-[11px] flex items-center gap-1"
                    >
                      <span>Explore all in Evidence Browser</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>
                  <div className="space-y-1.5 max-h-40 overflow-y-auto">
                    {relatedClaims.slice(0, 3).map((cl) => (
                      <div key={cl.claim_id} className="p-2 bg-stone-950 rounded border border-stone-800/80 text-[11px]">
                        <span className="font-mono text-amber-400 mr-2">{cl.claim_id}:</span>
                        <span className="text-stone-300">{cl.claim}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
