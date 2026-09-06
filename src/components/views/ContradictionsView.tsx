import React, { useState } from 'react';
import { contradictions, domains } from '../../data';
import type { ViewType } from '../../types';
import { AlertTriangle, CheckCircle2, Split } from 'lucide-react';
import { getFigure, type FigureInfo } from '../common/FigureModal';
import { ContradictionMap } from '../charts/ContradictionMap';
import { EntityChip } from '../common/EntityChip';
import { SourceFigureLink } from '../common/SourceFigureLink';
import { EntityRail } from '../common/EntityRail';

interface Props {
  initialContradictionId?: string;
  onOpenFigure: (fig: FigureInfo) => void;
  onNavigate: (view: ViewType, param?: string) => void;
}

export const ContradictionsView: React.FC<Props> = ({
  initialContradictionId,
  onOpenFigure,
  onNavigate,
}) => {
  const [selectedId, setSelectedId] = useState<string>(initialContradictionId || 'X01');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const selectedContradiction = contradictions.find(c => c.id === selectedId) || contradictions[0];

  const filteredContradictions = contradictions.filter((c) => {
    if (filterStatus === 'ALL') return true;
    const unresolved = c.status.toUpperCase().includes('UNRESOLVED');
    return filterStatus === 'UNRESOLVED' ? unresolved : !unresolved;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="border-b border-stone-800 pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 font-mono text-xs border border-purple-500/20">
              Boundary Condition Analysis (X01–X12)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
            Contradictions & Boundary Conditions
          </h1>
          <p className="text-stone-400 text-xs sm:text-sm mt-1 max-w-3xl">
            Deconstructs 12 apparent contradictions across the literature. 11 dissolve upon decomposing the underlying variables; 1 remains an unresolved ethical and empirical tension.
          </p>
        </div>

        <SourceFigureLink figure={getFigure('fig-09')} onOpenFigure={onOpenFigure} className="shrink-0" />
      </div>

      <ContradictionMap
        contradictions={contradictions}
        domains={domains}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />

      {/* Tension Banner (X10 Spotlight) */}
      <div className="p-4 bg-rose-950/20 border border-rose-900/40 rounded-xl flex items-start gap-3 text-xs text-rose-200">
        <AlertTriangle size={18} className="text-rose-400 shrink-0 mt-0.5" />
        <div className="space-y-1 leading-relaxed">
          <strong className="font-mono text-rose-300 uppercase text-[11px] block">
            The Single Unresolved Tension: Masculinity Accommodation vs. Expansion (X10)
          </strong>
          <p>
            Does reframing help-seeking as "strength" reduce self-stigma, or does it preserve the very premise that men must constantly prove strength to have dignity? No study in the corpus measures short-term engagement and long-term norm change together. Current science does not resolve this; it requires an explicit organizational value stance.
          </p>
        </div>
      </div>

      {/* Main Layout: List on left, Interactive Deep Branching on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Contradiction Selector */}
        <div className="lg:col-span-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-stone-400 px-1 pb-1">
            <span>Contradictions ({filteredContradictions.length} of {contradictions.length})</span>
            <span className="text-[10px] text-amber-400">Click to interrogate</span>
          </div>

          {/* The status filter existed in state but was never rendered, and the list ignored it. */}
          <div className="flex items-center gap-1.5 pb-1">
            {(['ALL', 'RESOLVED', 'UNRESOLVED'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-2.5 py-1 rounded font-mono transition ${
                  filterStatus === s ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-stone-900 text-stone-400 hover:text-stone-200'
                }`}
                style={{ fontSize: 'var(--t-micro)' }}
              >
                {s === 'ALL' ? 'All' : s === 'RESOLVED' ? 'Resolved' : 'Unresolved'}
              </button>
            ))}
          </div>

          <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
            {filteredContradictions.map((c) => {
              const isSelected = selectedId === c.id;
              const isUnresolved = c.status.includes('UNRESOLVED');

              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedId(c.id)}
                  className={`p-3 rounded-xl border transition cursor-pointer text-xs ${
                    isSelected
                      ? 'bg-purple-950/40 border-purple-500/60 shadow-sm'
                      : isUnresolved
                      ? 'bg-rose-950/10 border-rose-900/30 hover:border-rose-700/50'
                      : 'bg-stone-900/60 hover:bg-stone-900 border-stone-800'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-mono text-xs font-bold text-amber-300">{c.id}</span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${
                      isUnresolved 
                        ? 'bg-rose-950 text-rose-300 border-rose-800 font-bold'
                        : 'bg-stone-800 text-stone-400 border-stone-700'
                    }`}>
                      {isUnresolved ? 'UNRESOLVED' : 'RESOLVED'}
                    </span>
                  </div>

                  <p className="text-stone-200 font-medium leading-snug line-clamp-2">
                    {c.apparent_contradiction}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep Branching & Decomposition Panel */}
        <div className="lg:col-span-8 space-y-5">
          <div className="p-6 bg-stone-900 border border-stone-700 rounded-2xl shadow-xl space-y-6">
            {/* Header info */}
            <div className="flex items-start justify-between border-b border-stone-800 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {selectedContradiction.id}
                  </span>
                  <span className={`text-xs font-mono px-2 py-0.5 rounded border ${
                    selectedContradiction.status.includes('UNRESOLVED')
                      ? 'bg-rose-950 text-rose-300 border-rose-800 font-bold'
                      : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                  }`}>
                    {selectedContradiction.status}
                  </span>
                </div>
                <h2 className="text-lg font-serif font-bold text-stone-100 mt-2">
                  {selectedContradiction.apparent_contradiction}
                </h2>
              </div>
            </div>

            {/* Side-by-side Evidence Split */}
            <div className="space-y-2">
              <span className="font-mono text-stone-400 uppercase text-[10px] tracking-wider block">
                Evidence on Each Side of the Dispute:
              </span>
              <div className="p-3.5 bg-stone-950 rounded-xl border border-stone-800 text-xs text-stone-300 leading-relaxed font-sans">
                {selectedContradiction.evidence_on_each_side}
              </div>
            </div>

            {/* Why it looks like a contradiction */}
            <div className="space-y-2">
              <span className="font-mono text-amber-400 uppercase text-[10px] tracking-wider block">
                Why It Appears as a Contradiction:
              </span>
              <div className="p-3.5 bg-amber-950/20 rounded-xl border border-amber-900/40 text-xs text-amber-200 leading-relaxed font-sans">
                {selectedContradiction.why_it_looks_like_a_contradiction}
              </div>
            </div>

            {/* The Distinguishing Boundary Variable (Core Solution) */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-sky-400">
                <Split size={15} />
                <span className="font-mono uppercase text-[10px] tracking-wider font-semibold">
                  Actual Distinguishing Boundary Variable:
                </span>
              </div>
              <div className="p-4 bg-sky-950/25 rounded-xl border border-sky-800/50 text-xs text-sky-100 leading-relaxed font-sans space-y-2">
                <p className="font-semibold text-sm text-sky-200">
                  {selectedContradiction.actual_distinguishing_variable}
                </p>
                <p className="text-stone-300">
                  {selectedContradiction.boundary_condition}
                </p>
              </div>
            </div>

            {/* Applied Design Implication */}
            <div className="p-4 bg-emerald-950/20 border border-emerald-800/40 rounded-xl space-y-1.5 text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400" />
                <span className="font-mono text-emerald-300 font-semibold uppercase text-[10px]">
                  Applied Communication & Voice Implication:
                </span>
              </div>
              <p className="text-emerald-100 leading-relaxed font-sans">
                {selectedContradiction.design_implication}
              </p>
            </div>

            {/* Metadata Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-stone-800 text-[11px] font-mono text-stone-400">
              <span className="flex flex-wrap items-center gap-1">
                <span>Source domains:</span>
                {selectedContradiction.source_domains
                  .split(/[;,]/)
                  .map((d) => d.trim())
                  .filter(Boolean)
                  .map((d) => (
                    <EntityChip key={d} id={d} onNavigate={onNavigate} />
                  ))}
              </span>
              <span>Confidence: <strong className="text-stone-300">{selectedContradiction.confidence}</strong></span>
            </div>
          </div>

          <EntityRail entityId={selectedContradiction.id} onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
};
