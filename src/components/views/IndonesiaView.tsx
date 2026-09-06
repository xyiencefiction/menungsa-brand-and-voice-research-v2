import React, { useState } from 'react';
import { indonesianStudies, indonesiaContrasts } from '../../data';
import { EpistemicBadge } from '../common/EpistemicBadge';
import { getFigure, type FigureInfo } from '../common/FigureModal';
import { IndonesiaContrastChart } from '../charts/IndonesiaContrastChart';
import { SourceFigureLink } from '../common/SourceFigureLink';

interface Props {
  onOpenFigure: (fig: FigureInfo) => void;
}

export const IndonesiaView: React.FC<Props> = ({ onOpenFigure }) => {
  const [activeTab, setActiveTab] = useState<'relational' | 'bapak' | 'halus' | 'brotherhood' | 'friction' | 'religion'>('relational');
  const [selectedContrastId, setSelectedContrastId] = useState<string>(indonesiaContrasts[0].id);

  // Moved to src/data/indonesianStudies.json so the D7 base is searchable like every other dataset.
  const INDONESIAN_STUDIES = indonesianStudies;

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="border-b border-stone-800 pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 font-mono text-xs border border-teal-500/20">
              Cultural Localisation & Sociological Analysis
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
            Indonesian Context Deep Dive
          </h1>
          <p className="text-stone-400 text-xs sm:text-sm mt-1 max-w-3xl">
            Grounds communication in Indonesian relational realities: the household division of care, the legal codification of provider identity, community surveillance, and institutional friction.
          </p>
        </div>

        <SourceFigureLink figure={getFigure('fig-10')} onOpenFigure={onOpenFigure} className="shrink-0" />
      </div>

      {/* Epistemic Badging Key */}
      <div className="p-4 bg-stone-900/70 border border-stone-800 rounded-xl space-y-2">
        <span className="font-mono text-stone-400 text-[10px] uppercase font-semibold block">
          How confident we are in each Indonesian finding:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <EpistemicBadge status="EMPIRICALLY SUPPORTED IN INDONESIA" />
          <EpistemicBadge status="PLAUSIBLE LOCAL MECHANISM" />
          <EpistemicBadge status="WESTERN / REGIONAL EXTRAPOLATION" />
          <EpistemicBadge status="SPECULATIVE / UNTESTED" />
        </div>
      </div>

      <IndonesiaContrastChart
        contrasts={indonesiaContrasts}
        selectedId={selectedContrastId}
        onSelect={setSelectedContrastId}
      />

      {/* The 6 Studies Table. The count and the wording gap stay open because both are
          decisions; the per-study provenance is folded away because it is not. */}
      <div className="p-4 bg-stone-900/40 border border-stone-800 rounded-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-xs font-mono uppercase font-bold text-stone-300 tracking-wider">
            The entire empirical base: {INDONESIAN_STUDIES.length} Indonesian studies
          </h3>
          <span className="text-[11px] font-mono text-amber-400">
            Notice: 0 manipulated communication or wording
          </span>
        </div>
        <details>
        <summary className="cursor-pointer text-stone-500 hover:text-stone-300 font-mono text-[11px]">
          Show the six studies, their designs and samples
        </summary>
        <div className="mt-2 border border-stone-800/80 rounded-lg overflow-x-auto bg-stone-950 text-xs">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-stone-800 font-mono text-[10px] text-stone-400 uppercase bg-stone-900/60">
                <th className="p-2.5">Study</th>
                <th className="p-2.5">Design</th>
                <th className="p-2.5">Sample / Population</th>
                <th className="p-2.5">Findings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60 font-sans">
              {INDONESIAN_STUDIES.map((s, idx) => (
                <tr key={idx} className="hover:bg-stone-900/50">
                  <td className="p-2.5 font-semibold text-stone-200">{s.author}</td>
                  <td className="p-2.5 text-stone-400 font-mono text-[11px]">{s.design}</td>
                  <td className="p-2.5 text-stone-300">{s.sample}</td>
                  <td className="p-2.5 text-stone-300">{s.findings}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </details>
      </div>

      {/* Interactive Tabs */}
      <div className="flex flex-wrap gap-1.5 border-b border-stone-800 pb-2">
        {[
          { id: 'relational', label: '1. Relational Care vs Solo Seeker' },
          { id: 'bapak', label: '2. The Bapak & Provider Trap' },
          { id: 'halus', label: '3. Halus vs Kasar Masculinity' },
          { id: 'brotherhood', label: '4. Nongkrong vs Curhat (Surveillance)' },
          { id: 'friction', label: '5. Material & Institutional Friction' },
          { id: 'religion', label: '6. Religion: Takdir vs Ngelakoni' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition ${
              activeTab === t.id
                ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                : 'bg-stone-900 hover:bg-stone-800 text-stone-400'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="p-6 bg-stone-900 border border-stone-700 rounded-2xl space-y-6">
        {/* 1. Relational Care */}
        {activeTab === 'relational' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-serif font-bold text-stone-100">
                Relational Care: The Household as the Primary Patient Unit
              </h3>
              <EpistemicBadge status="EMPIRICALLY SUPPORTED IN INDONESIA" />
            </div>

            <p className="text-stone-300 text-sm leading-relaxed">
              In Global North health frameworks, the individual is presumed to be an autonomous help-seeker who recognizes symptoms, weighs stigma, and books an appointment. In Indonesia, care is arranged <strong>relationally</strong> through households, kin, and mutual obligation.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 space-y-2">
                <span className="font-mono text-rose-400 font-semibold text-[11px] block">
                  Western Individual Help-Seeking Lens:
                </span>
                <p className="text-stone-300 leading-relaxed">
                  A man who relies on his wife or mother to manage his health is diagnosed as exhibiting "passive avoidance," "poor mental health literacy," or "toxic stoic denial."
                </p>
              </div>

              <div className="p-4 bg-teal-950/20 rounded-xl border border-teal-800/40 space-y-2">
                <span className="font-mono text-teal-300 font-semibold text-[11px] block">
                  Indonesian Relational Reality:
                </span>
                <p className="text-teal-100 leading-relaxed">
                  The household secures healthcare through its ordinary division of labor. Wives take over appointments, families pool savings to buy medication, and neighbours arrange transport.
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-stone-950 rounded-lg border border-stone-800 text-xs">
              <strong className="font-mono text-amber-300 block mb-1">Communication Implication for Menungsa:</strong>
              <p className="text-stone-300 leading-relaxed">
                Do not direct all communication exclusively to the isolated individual man. Create content specifically designed for wives, partners, and close peers who act as informal care navigators.
              </p>
            </div>
          </div>
        )}

        {/* 2. The Bapak Trap */}
        {activeTab === 'bapak' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-serif font-bold text-stone-100">
                The Bapak Figure & The Provider Trap
              </h3>
              <EpistemicBadge status="EMPIRICALLY SUPPORTED IN INDONESIA" />
            </div>

            <p className="text-stone-300 text-sm leading-relaxed">
              In Indonesia, the provider role (*pria mapan*) is not merely a cultural expectation—it is <strong>institutionally, legally, and religiously codified</strong> (UU No. 1/1974 Art. 31(3) & 34(1); Islamic *nafaqah*; customary *uang panai* and *seserahan*).
            </p>

            <div className="p-4 bg-rose-950/30 border border-rose-800/60 rounded-xl space-y-2 text-xs">
              <span className="font-mono text-rose-300 font-bold uppercase text-[11px] block">
                The Provider Trap: Why Provider Framing Backfires in Mental Health
              </span>
              <p className="text-rose-100 leading-relaxed">
                To be *bapak* is to always be a provider and to forfeit the very vulnerability that seeking help would expose. For an Indonesian man, admitting psychological distress is not only admitting personal weakness—it is <strong>failing at what a man is expected to bear for others</strong>.
              </p>
              <p className="text-rose-200 font-semibold pt-1">
                ➔ Consequently, provider framing is the WORST default entry frame for a mental-health organization, because the men most in crisis are disproportionately those currently failing to fulfill it.
              </p>
            </div>
          </div>
        )}

        {/* 3. Halus vs Kasar */}
        {activeTab === 'halus' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-serif font-bold text-stone-100">
                Halus (Refined) vs Kasar (Rough): The Prestigious Masculine Tone
              </h3>
              <EpistemicBadge status="PLAUSIBLE LOCAL MECHANISM" />
            </div>

            <p className="text-stone-300 text-sm leading-relaxed">
              Javanese and broader Indonesian masculine prestige is governed by the polarity between <em>halus</em> (refined, composed, emotionally stable) and <em>kasar</em> (rough, aggressive, undisciplined). The cultural archetype is the <strong>satria</strong>—powerful yet calm—in contrast to the <strong>jago</strong> (the neighborhood strongman).
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 space-y-1.5">
                <span className="font-mono text-emerald-400 font-semibold text-[11px] block">
                  The Halus Ideal (Prestigious / Composed):
                </span>
                <p className="text-stone-300 leading-relaxed">
                  Emotional restraint, composed voice, polite deference, dignity. Represented by Kahf's calm "Life is a Journey" narration.
                </p>
              </div>

              <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 space-y-1.5">
                <span className="font-mono text-amber-400 font-semibold text-[11px] block">
                  The Kasar Ideal (Loud / Aggressive):
                </span>
                <p className="text-stone-300 leading-relaxed">
                  Loud shouting, aggressive challenge copy, overtly confrontational rhetoric. Borrowing this register makes an organization sound crude or hyper-Westernized.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 4. Nongkrong vs Curhat */}
        {activeTab === 'brotherhood' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-serif font-bold text-stone-100">
                Nongkrong vs Curhat: Community as Care AND Surveillance
              </h3>
              <EpistemicBadge status="EMPIRICALLY SUPPORTED IN INDONESIA" />
            </div>

            <p className="text-stone-300 text-sm leading-relaxed">
              Indonesian male homosociality is everywhere (*warkop, pos ronda, gotong royong, futsal*). Yet, <strong>confiding is remarkably rare</strong>. Indonesian peer research strictly distinguishes <em>teman nongkrong</em> (friends you hang out with) from <em>teman curhat</em> (confidants you trust with personal hardship).
            </p>

            <div className="p-4 bg-amber-950/20 border border-amber-800/50 rounded-xl space-y-2 text-xs text-amber-200">
              <strong className="font-mono text-amber-300 block text-[11px] uppercase">
                The Surveillance Room Constraint:
              </strong>
              <p className="leading-relaxed">
                Gotong royong and rukun create wide social safety nets, but they also create <strong>mutual watchfulness</strong>. Collective male spaces affirm men as responsible providers; admitting distress in those rooms risks immediate family stigma and gossiping (*omongan tetangga*).
              </p>
              <p className="text-stone-300 leading-relaxed pt-1">
                ➔ Merely putting men in a room and asserting "brotherhood" does NOT create emotional safety—it puts them in a surveillance environment where silence is the safest strategy.
              </p>
            </div>
          </div>
        )}

        {/* 5. Friction */}
        {activeTab === 'friction' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-serif font-bold text-stone-100">
                Material and Institutional Friction (M14)
              </h3>
              <EpistemicBadge status="EMPIRICALLY SUPPORTED IN INDONESIA" />
            </div>

            <p className="text-stone-300 text-sm leading-relaxed">
              Before any message can persuade, it collides with severe structural health access barriers in Indonesia. Persuasive copy cannot fix an absent healthcare system.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 space-y-1">
                <span className="font-mono text-stone-400 text-[10px] uppercase block">Specialist Density</span>
                <span className="text-xl font-serif font-bold text-rose-400">~0.3</span>
                <span className="text-[10px] text-stone-400 block">Psychiatrists per 100k</span>
              </div>

              <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 space-y-1">
                <span className="font-mono text-stone-400 text-[10px] uppercase block">Treatment Gap</span>
                <span className="text-xl font-serif font-bold text-amber-400">~9%</span>
                <span className="text-[10px] text-stone-400 block">Depressed receive care</span>
              </div>

              <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 space-y-1">
                <span className="font-mono text-stone-400 text-[10px] uppercase block">Informal Labor</span>
                <span className="text-xl font-serif font-bold text-sky-400">~59%</span>
                <span className="text-[10px] text-stone-400 block">In informal employment</span>
              </div>

              <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 space-y-1">
                <span className="font-mono text-stone-400 text-[10px] uppercase block">Puskesmas Queue</span>
                <span className="text-xl font-serif font-bold text-stone-200">3–5 min</span>
                <span className="text-[10px] text-stone-400 block">Avg consult time</span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed bg-stone-950 p-3 rounded-lg border border-stone-800">
              <strong>The Cardinal Voice Rule:</strong> Never write a call-to-action like *"Cari bantuan sekarang"* without verifying that a working, affordable, and geographically reachable service actually exists. A CTA without a functioning pathway collapses organizational credibility.
            </p>
          </div>
        )}

        {/* 6. Religion */}
        {activeTab === 'religion' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-serif font-bold text-stone-100">
                Religious Coping: Takdir Fatalism vs Ngelakoni Active Management
              </h3>
              <EpistemicBadge status="EMPIRICALLY SUPPORTED IN INDONESIA" />
            </div>

            <p className="text-stone-300 text-sm leading-relaxed">
              Religion appears in 34% of Global South health-seeking studies compared to just 5% in the Global North. In Indonesia, faith is not an abstract ideology—it acts as an active explanatory framework that can either paralyze or mobilize.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 space-y-1.5">
                <span className="font-mono text-rose-400 font-semibold text-[11px] block">
                  Takdir (Passive Fatalism):
                </span>
                <p className="text-stone-300 leading-relaxed">
                  Viewing mental illness as divine punishment or unchangeable destiny delays medical treatment and lands as collective moral shame.
                </p>
              </div>

              <div className="p-4 bg-teal-950/20 rounded-xl border border-teal-800/40 space-y-1.5">
                <span className="font-mono text-teal-300 font-semibold text-[11px] block">
                  Ngelakoni (Active Coping):
                </span>
                <p className="text-teal-100 leading-relaxed">
                  Reframing medication adherence and psychological therapy as an active spiritual duty (*ikhtiar*) to endure and manage one's trials with dignity.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
