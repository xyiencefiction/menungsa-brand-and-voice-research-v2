import React, { useState } from 'react';
import { brandValues, playbookRules } from '../../data';
import type { ViewType } from '../../types';
import { 
  Compass, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Anchor, 
  Scale, 
  SlidersHorizontal 
} from 'lucide-react';

interface Props {
  onNavigate: (view: ViewType) => void;
}

const VALUE_ICONS = [Compass, ShieldCheck, Anchor, Scale];

export const VoiceFoundationsView: React.FC<Props> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeValueId, setActiveValueId] = useState<string>(brandValues[0]?.id ?? 'V01');

  const categories = [
    { id: 'all', label: 'Semua Aturan' },
    { id: 'REGULATION', label: 'Pengendalian Emosi' },
    { id: 'REGISTER', label: 'Ragam Bahasa & Kata Ganti' },
    { id: 'FRAMING', label: 'Maskulinitas & Martabat' },
    { id: 'AUDIENCE_DEFENSE', label: 'Mencegah Resistensi' },
  ];

  const filteredRules = playbookRules.filter((r) => {
    if (selectedCategory === 'all') return true;
    return r.category === selectedCategory;
  });

  const activeValue = brandValues.find((v) => v.id === activeValueId) ?? brandValues[0];

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Header */}
      <section className="relative overflow-hidden rounded-2xl border border-stone-800 bg-gradient-to-b from-stone-900/80 to-stone-950 p-6 md:p-10">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-mono font-medium text-amber-300">
            <Sparkles size={13} />
            <span>PANDUAN PRAKTIS PENULIS & KREATOR</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-serif tracking-tight text-stone-100">
            Karakter & Dasar Suara Menungsa
          </h1>
          <p className="text-sm md:text-base leading-relaxed text-stone-300">
            Menungsa berbicara dengan nada <strong>tenang, jujur, membumi, dan tidak menggurui</strong>. Kami tidak memosisikan diri sebagai figur otoritas moral yang menghakimi, bukan pula teman khayalan yang berpura-pura akrab. Kami hadir sebagai pendamping yang menghormati kedaulatan dan harga diri pembaca.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => onNavigate('studio')}
              className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-xs font-medium text-stone-950 transition hover:bg-amber-400 font-sans cursor-pointer shadow-sm"
            >
              <span>Buka Studio Contoh Tulisan</span>
              <ArrowRight size={14} />
            </button>
            <button
              onClick={() => onNavigate('sandbox')}
              className="inline-flex items-center gap-2 rounded-lg border border-stone-700 bg-stone-900/60 px-4 py-2.5 text-xs font-medium text-stone-200 transition hover:bg-stone-800 hover:text-white font-sans cursor-pointer"
            >
              <span>Uji Draf Kalimat Anda</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4 Core Pillars of Writing */}
      <section className="space-y-6">
        <div>
          <h2 className="text-lg md:text-xl font-serif text-stone-100 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            4 Pilar Nilai Menungsa dalam Praktik Menulis
          </h2>
          <p className="text-xs md:text-sm text-stone-400 mt-1">
            Prinsip utama yang memandu setiap pilihan kata, ritme kalimat, dan pendekatan emosional.
          </p>
        </div>

        {/* Value selector pills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {brandValues.map((val, idx) => {
            const Icon = VALUE_ICONS[idx % VALUE_ICONS.length];
            const isSelected = val.id === activeValueId;
            return (
              <button
                key={val.id}
                onClick={() => setActiveValueId(val.id)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-amber-500/60 bg-amber-500/10 text-stone-100 shadow-md ring-1 ring-amber-500/30'
                    : 'border-stone-800 bg-stone-900/40 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon size={16} className={isSelected ? 'text-amber-400' : 'text-stone-500'} />
                  <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400/80">
                    {val.id}
                  </span>
                </div>
                <div className="font-serif text-sm md:text-base font-medium text-stone-100">
                  {val.value}
                </div>
                <div className="text-xs text-stone-400 mt-1 line-clamp-2">
                  {val.voiceTrait}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Value Deep Dive Card */}
        {activeValue && (
          <div className="rounded-xl border border-stone-800 bg-stone-900/50 p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2 md:col-span-1 border-b md:border-b-0 md:border-r border-stone-800 pb-4 md:pb-0 md:pr-6">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
                  Definisi & Karakter Suara
                </span>
                <h3 className="text-xl font-serif text-stone-100">{activeValue.value}</h3>
                <p className="text-xs md:text-sm text-stone-300 leading-relaxed">
                  {activeValue.voiceTrait}
                </p>
                <div className="pt-2">
                  <span className="text-[11px] font-mono text-stone-400 block mb-1">POSISI DI NADA MENUNGSA:</span>
                  <p className="text-xs text-stone-300 bg-stone-950/60 p-2.5 rounded-lg border border-stone-800/80">
                    {activeValue.spectrum.positionNote}
                  </p>
                </div>
              </div>

              <div className="space-y-4 md:col-span-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* DO */}
                  <div className="rounded-lg border border-emerald-500/20 bg-emerald-950/20 p-4 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider">
                      <CheckCircle2 size={15} />
                      <span>Yang Dianjurkan (Do)</span>
                    </div>
                    {activeValue.dos.map((d, i) => (
                      <div key={i} className="text-xs text-stone-200 border-t border-emerald-900/40 pt-2 space-y-1">
                        <div className="font-serif italic text-emerald-300">"{d.example}"</div>
                        <div className="text-[11px] text-stone-400 leading-normal">{d.why}</div>
                      </div>
                    ))}
                  </div>

                  {/* DON'T */}
                  <div className="rounded-lg border border-rose-500/20 bg-rose-950/20 p-4 space-y-2">
                    <div className="flex items-center gap-2 text-rose-400 text-xs font-mono font-semibold uppercase tracking-wider">
                      <XCircle size={15} />
                      <span>Yang Dilarang (Don't)</span>
                    </div>
                    {activeValue.donts.map((d, i) => (
                      <div key={i} className="text-xs text-stone-200 border-t border-rose-900/40 pt-2 space-y-1">
                        <div className="font-serif italic text-rose-300">"{d.example}"</div>
                        <div className="text-[11px] text-stone-400 leading-normal">{d.why}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-stone-400 bg-stone-950/40 p-3 rounded-lg border border-stone-800/60">
                  <strong className="text-stone-300">Batas Keberlakuan:</strong> {activeValue.boundaryCondition}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* The Golden Do's & Don'ts Playbook */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-lg md:text-xl font-serif text-stone-100 flex items-center gap-2">
              <SlidersHorizontal size={18} className="text-amber-400" />
              Aturan Emas Penulisan (Do's & Don'ts Playbook)
            </h2>
            <p className="text-xs md:text-sm text-stone-400 mt-1">
              Prinsip operasional cepat untuk memastikan naskah Anda bebas dari jebakan bumerang.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1 rounded-full text-xs font-mono transition cursor-pointer ${
                  selectedCategory === c.id
                    ? 'bg-stone-200 text-stone-950 font-medium'
                    : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Playbook Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRules.map((rule) => (
            <div
              key={rule.id}
              className="rounded-xl border border-stone-800 bg-stone-900/40 p-5 space-y-4 hover:border-stone-700 transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400">
                    {rule.id} · {rule.category}
                  </span>
                  <h3 className="text-base font-serif font-medium text-stone-100 mt-0.5">
                    {rule.action}
                  </h3>
                </div>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed">
                {rule.rationale}
              </p>

              <div className="space-y-2 pt-2 border-t border-stone-800/80">
                <div className="rounded-lg bg-emerald-950/20 border border-emerald-500/20 p-2.5 text-xs text-emerald-200 space-y-1">
                  <div className="flex items-center gap-1.5 font-semibold text-emerald-400 text-[11px] font-mono">
                    <CheckCircle2 size={13} />
                    <span>CONTOH PENULISAN BENAR:</span>
                  </div>
                  <p className="font-serif italic text-stone-200">"{rule.doExamples[0]?.example}"</p>
                  <p className="text-[11px] text-stone-400">{rule.doExamples[0]?.why}</p>
                </div>

                <div className="rounded-lg bg-rose-950/20 border border-rose-500/20 p-2.5 text-xs text-rose-200 space-y-1">
                  <div className="flex items-center gap-1.5 font-semibold text-rose-400 text-[11px] font-mono">
                    <XCircle size={13} />
                    <span>HINDARI BENTUK INI:</span>
                  </div>
                  <p className="font-serif italic text-stone-200">"{rule.dontExamples[0]?.example}"</p>
                  <p className="text-[11px] text-stone-400">{rule.dontExamples[0]?.why}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
