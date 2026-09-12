import React, { useState } from 'react';
import { Eye, Lock, Globe, CheckCircle2, XCircle, ShieldAlert } from 'lucide-react';

interface TabData {
  id: 'public' | 'private' | 'gender';
  label: string;
  title: string;
  description: string;
  doText: string;
  dontText: string;
  note: string;
}

const CONTEXT_TABS: TabData[] = [
  {
    id: 'public',
    label: 'Ruang publik',
    title: 'Ruang publik',
    description:
      'Berikan informasi dan pilihan tanpa meminta pengakuan pribadi. Jika percakapan membutuhkan keterbukaan lebih jauh, arahkan ke jalur yang lebih privat.',
    doText: 'Kalau belakangan ada yang terasa berbeda, kamu bisa cek beberapa tandanya di slide berikut.',
    dontText: 'Ceritakan masalah mentalmu di kolom komentar.',
    note: 'Di ruang publik, tindakan sederhana seperti memberi komentar dapat terasa lebih berisiko karena identitas dan respons seseorang dapat dilihat orang lain.',
  },
  {
    id: 'private',
    label: 'Ruang privat',
    title: 'Ruang privat',
    description:
      'Privat tidak otomatis berarti aman. Jelaskan batas privasi dan beri orang kendali atas seberapa jauh mereka ingin bercerita.',
    doText: 'Kalau kamu ingin cerita lebih jauh, kamu bisa mulai dari bagian yang terasa nyaman.',
    dontText: 'Kalau serius ingin pulih, ceritakan semuanya sekarang.',
    note: 'Ruang privat dapat mengurangi sorotan sosial, tetapi tetap tidak boleh dianggap sebagai izin untuk meminta keterbukaan penuh.',
  },
  {
    id: 'gender',
    label: 'Cek norma gender',
    title: 'Cek norma gender',
    description:
      'Jika suatu tindakan masih berpotensi dianggap ‘tidak laki-laki’, jangan menjadikan maskulinitas sebagai medan pembuktian. Fokuskan pesan pada kegunaan, pilihan, dan situasinya.',
    doText: 'Konsultasi bisa membantu kamu memahami apa yang belakangan berubah dan menentukan langkah berikutnya.',
    dontText: 'Cowok juga boleh kok ke psikolog—nggak usah malu jadi laki-laki yang sensitif.',
    note: 'Kalimat seperti ‘cowok juga boleh’ terlihat suportif, tetapi tetap dapat memperkuat anggapan bahwa tindakan tersebut pada dasarnya berada di luar norma laki-laki.',
  },
];

export const ContextCheck: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<'public' | 'private' | 'gender'>('public');

  const activeTab = CONTEXT_TABS.find((t) => t.id === activeTabId) ?? CONTEXT_TABS[0];

  return (
    <section className="space-y-8 rounded-2xl border border-stone-800 bg-stone-950/80 p-6 sm:p-8 shadow-xl">
      {/* A. Intro */}
      <div className="space-y-2 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-amber-500">
          <Eye size={13} />
          <span>CONTEXT CHECK</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100 leading-tight">
          Pertimbangkan siapa yang bisa melihat
        </h2>
        <p className="text-sm sm:text-base text-stone-300/90 font-sans leading-relaxed">
          Cara orang merespons sebuah pesan dapat berubah ketika tindakan atau pengalaman mereka terlihat oleh orang lain. Untuk topik yang masih membawa stigma atau norma gender tertentu, ruang publik dapat meningkatkan kekhawatiran akan penilaian sosial.
        </p>
      </div>

      {/* B. Prinsip Utama & Visual Continuum */}
      <div className="rounded-xl border border-stone-800/90 bg-stone-900/40 p-5 sm:p-6 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-[10.5px] font-mono uppercase tracking-wider text-amber-400 font-semibold block">
              Prinsip Utama
            </span>
            <blockquote className="text-base sm:text-lg font-serif italic text-amber-200/95 border-l-2 border-amber-500/70 pl-3 leading-snug">
              “Semakin publik dan semakin personal tindakannya, semakin rendah tuntutan untuk membuka diri.”
            </blockquote>
          </div>

          {/* Simple Visual Continuum (Privat -> Terlihat orang lain -> Publik + personal) */}
          <div className="lg:w-80 shrink-0 bg-stone-950/60 border border-stone-800/80 rounded-xl p-3.5 space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block">
              Spektrum Keterlihatan
            </span>
            <div className="flex items-center justify-between text-[11px] font-sans text-stone-300 relative">
              {/* Connecting line */}
              <div className="absolute top-1/2 left-3 right-3 h-0.5 bg-stone-700 -translate-y-1/2 -z-0" />

              <div className="relative z-10 flex flex-col items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-stone-950" />
                <span className="text-[10.5px] font-medium text-emerald-400">Privat</span>
              </div>

              <div className="relative z-10 flex flex-col items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-amber-500 ring-2 ring-stone-950" />
                <span className="text-[10.5px] font-medium text-amber-300">Terlihat orang lain</span>
              </div>

              <div className="relative z-10 flex flex-col items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-rose-500 ring-2 ring-stone-950" />
                <span className="text-[10.5px] font-medium text-rose-400">Publik + personal</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* C. Tiga Context Check Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-stone-800 bg-stone-900/30 p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-stone-300">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-stone-800 text-stone-200 text-[10px]">1</span>
            <span>Cek ruangnya</span>
          </div>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
            “Apakah respons pembaca akan terlihat oleh teman, keluarga, rekan kerja, pasangan, atau publik?”
          </p>
        </div>

        <div className="rounded-xl border border-stone-800 bg-stone-900/30 p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-stone-300">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-stone-800 text-stone-200 text-[10px]">2</span>
            <span>Cek biaya sosialnya</span>
          </div>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
            “Apakah tindakan yang kita ajak masih berpotensi dinilai memalukan, lemah, atau ‘tidak laki-laki’ dalam konteks audiens ini?”
          </p>
        </div>

        <div className="rounded-xl border border-stone-800 bg-stone-900/30 p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-stone-300">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-stone-800 text-stone-200 text-[10px]">3</span>
            <span>Sesuaikan ajakannya</span>
          </div>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
            “Semakin tinggi risiko penilaian sosial, semakin kecil tuntutan untuk mengungkapkan pengalaman pribadi di depan orang lain.”
          </p>
        </div>
      </div>

      {/* D. Interactive Context Examples */}
      <div className="space-y-4">
        {/* Selector Tabs */}
        <div role="tablist" aria-label="Pilihan Ruang dan Norma" className="flex flex-wrap gap-2">
          {CONTEXT_TABS.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTabId(tab.id)}
                className={`px-4 py-2 rounded-lg text-xs font-sans font-medium transition cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 font-semibold shadow-raised'
                    : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200 hover:bg-stone-850'
                }`}
              >
                {tab.id === 'public' && <Globe size={13} />}
                {tab.id === 'private' && <Lock size={13} />}
                {tab.id === 'gender' && <ShieldAlert size={13} />}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Panel */}
        <div className="rounded-xl border border-stone-800 bg-stone-900/50 p-5 space-y-4">
          <div className="space-y-1">
            <h3 className="text-lg font-serif font-semibold text-stone-100">{activeTab.title}</h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">{activeTab.description}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {/* DO */}
            <div className="rounded-lg bg-emerald-950/20 border border-emerald-500/30 p-3.5 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-emerald-400 text-xs uppercase tracking-wider">
                <CheckCircle2 size={14} />
                <span>DO</span>
              </div>
              <p className="font-serif italic text-emerald-200 text-xs sm:text-sm leading-snug">
                "{activeTab.doText}"
              </p>
            </div>

            {/* DON'T */}
            <div className="rounded-lg bg-rose-950/20 border border-rose-500/30 p-3.5 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-rose-400 text-xs uppercase tracking-wider">
                <XCircle size={14} />
                <span>DON'T</span>
              </div>
              <p className="font-serif italic text-rose-200 text-xs sm:text-sm leading-snug">
                "{activeTab.dontText}"
              </p>
            </div>
          </div>

          <p className="text-xs text-stone-400 bg-stone-950/50 p-3 rounded-lg border border-stone-800/80 leading-relaxed font-sans">
            {activeTab.note}
          </p>
        </div>
      </div>

      {/* E. Rangkuman / Takeaway */}
      <div className="rounded-xl border border-stone-800/80 bg-stone-950/60 p-5 space-y-3">
        <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
          Prinsip sederhananya
        </span>
        <div className="space-y-2 text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
          <p>
            “Di ruang publik, beri informasi dan pilihan tanpa meminta pengakuan pribadi. Jika percakapan membutuhkan keterbukaan lebih jauh, sediakan jalur yang lebih privat dan jelaskan batas privasinya.”
          </p>
          <p>
            “Jika tindakan yang kita ajak masih berpotensi dinilai sebagai ‘tidak laki-laki’, jangan memperkuat stereotip dengan mengatakan ‘cowok juga boleh…’. Fokuskan pesan pada kegunaan, pilihan, dan situasinya.”
          </p>
        </div>
        <div className="text-[11px] font-mono text-stone-500 pt-1 border-t border-stone-800/60">
          * Ini adalah contextual check, bukan aturan terpisah untuk setiap topik.
        </div>
      </div>
    </section>
  );
};
