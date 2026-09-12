import React, { useState } from 'react';
import { Eye, Lock, Globe, CheckCircle2, XCircle, ShieldAlert } from 'lucide-react';
import { ComparisonTable } from '../common/ComparisonTable';
import { handleTablistKeys } from '../../utils/overlay';

interface DoDontPair {
  doText: string;
  doWhy?: string;
  dontText: string;
  dontWhy?: string;
}

interface TabData {
  id: 'public' | 'private' | 'gender';
  label: string;
  title: string;
  description: string;
  pairs: DoDontPair[];
  note: string;
}

const CONTEXT_TABS: TabData[] = [
  {
    id: 'public',
    label: 'Ruang publik',
    title: 'Ruang publik',
    description:
      'Berikan informasi dan pilihan tanpa meminta pengakuan pribadi. Jika percakapan membutuhkan keterbukaan lebih jauh, arahkan ke jalur yang lebih privat.',
    pairs: [
      {
        doText: 'Kalau belakangan ada yang terasa berbeda, kamu bisa cek beberapa tandanya di slide berikut.',
        doWhy: 'Memberi informasi dan opsi mandiri tanpa menuntut pembaca mengakui kerentanan diri di ruang terbuka.',
        dontText: 'Ceritakan masalah mentalmu di kolom komentar.',
        dontWhy: 'Mendesak pengakuan emosional berisiko tinggi di hadapan publik.',
      },
      {
        doText: 'Simpan postingan ini jika kamu atau rekanmu butuh kontak layanan sewaktu-waktu.',
        doWhy: 'Menyediakan retensi privat yang diskrit tanpa sorotan sosial.',
        dontText: 'Tag teman cowokmu yang kelihatannya butuh ke psikolog atau lagi rapuh.',
        dontWhy: 'Mempermalukan atau menandai kondisi orang lain di linimasa publik.',
      },
      {
        doText: 'Menurutmu, apa hal yang paling sering membuat seseorang ragu untuk mengambil jeda saat lelah?',
        doWhy: 'Mendorong refleksi berbasis topik umum yang aman dibahas bersama.',
        dontText: 'Pernah merasa gagal sebagai laki-laki? Tulis pengalaman terpurukmu di bawah.',
        dontWhy: 'Menjadikan kegagalan atau luka pribadi sebagai tontonan publik.',
      },
      {
        doText: 'Sesi bincang santai ini menyediakan opsi nama samaran dan kamera nonaktif demi kenyamanan.',
        doWhy: 'Menurunkan social cost dengan menjamin kendali privasi dan anonimitas peserta.',
        dontText: 'Buktikan kamu berani terbuka dan hadapi rasa takutmu dengan ikut siaran langsung ini.',
        dontWhy: 'Membingkai keterbukaan sebagai ajang uji nyali atau pembuktian keberanian.',
      },
    ],
    note: 'Di ruang publik, tindakan sederhana seperti memberi komentar dapat terasa lebih berisiko karena identitas dan respons seseorang dapat dilihat orang lain.',
  },
  {
    id: 'private',
    label: 'Ruang privat',
    title: 'Ruang privat',
    description:
      'Privat tidak otomatis berarti aman. Jelaskan batas privasi dan beri orang kendali atas seberapa jauh mereka ingin bercerita.',
    pairs: [
      {
        doText: 'Kalau kamu ingin cerita lebih jauh, kamu bisa mulai dari bagian yang terasa nyaman.',
        doWhy: 'Memberikan agensi penuh kepada pembaca untuk menentukan batas ceritanya sendiri.',
        dontText: 'Kalau serius ingin pulih, ceritakan semuanya sekarang.',
        dontWhy: 'Menuntut keterbukaan total dengan prasyarat yang menekan psikologis.',
      },
      {
        doText: 'Pesan dan identitasmu di kanal ini bersifat rahasia dan hanya diakses oleh konselor pendamping.',
        doWhy: 'Menegaskan batas privasi secara transparan dan profesional sebelum sesi dimulai.',
        dontText: 'Kamu wajib mengisi seluruh riwayat masa lalumu agar kami bisa memberikan solusi.',
        dontWhy: 'Memaksa pembongkaran riwayat trauma sebagai syarat mutlak bantuan.',
      },
      {
        doText: 'Tidak apa-apa kalau ada hal yang belum ingin kamu bahas hari ini. Kita bisa berhenti kapan saja.',
        doWhy: 'Memberikan izin eksplisit untuk jeda dan keluar tanpa rasa bersalah.',
        dontText: 'Jangan ditahan-tahan, tumpahkan dan tangisi semuanya di sini biar plong.',
        dontWhy: 'Memaksakan katarsis emosional yang dapat memicu rasa tidak aman atau kewalahan.',
      },
      {
        doText: 'Pesan ini sekadar menyapa berkala. Kamu tidak harus membalas sekarang kalau sedang butuh waktu.',
        doWhy: 'Follow-up rendah tekanan yang menghormati ritme dan ruang pribadi seseorang.',
        dontText: 'Kenapa kamu tiba-tiba menghilang? Menutup diri dari bantuan tidak akan menyelesaikan masalahmu.',
        dontWhy: 'Menghakimi keheningan seseorang sebagai bentuk kesalahan atau pembangkangan.',
      },
    ],
    note: 'Ruang privat dapat mengurangi sorotan sosial, tetapi tetap tidak boleh dianggap sebagai izin untuk meminta keterbukaan penuh.',
  },
  {
    id: 'gender',
    label: 'Cek norma gender',
    title: 'Cek norma gender',
    description:
      'Jika suatu tindakan masih berpotensi dianggap ‘tidak laki-laki’, jangan menjadikan maskulinitas sebagai medan pembuktian. Fokuskan pesan pada kegunaan, pilihan, dan situasinya.',
    pairs: [
      {
        doText: 'Konsultasi bisa membantu kamu memahami apa yang belakangan berubah dan menentukan langkah berikutnya.',
        doWhy: 'Fokus pada kegunaan praktis dan kejelasan langkah tanpa membawa beban gender.',
        dontText: 'Cowok juga boleh kok ke psikolog—nggak usah malu jadi laki-laki yang sensitif.',
        dontWhy: 'Secara tidak sengaja menegaskan bahwa mencari bantuan adalah anomali bagi laki-laki.',
      },
      {
        doText: 'Mengambil jeda saat tubuh lelah adalah cara menjaga ritme kerja agar tetap berfungsi optimal.',
        doWhy: 'Membingkai istirahat secara instrumental sebagai pemeliharaan kapasitas harian.',
        dontText: 'Laki-laki sejati bukan yang tahan banting, tapi yang berani mengakui dirinya rapuh.',
        dontWhy: 'Menggunakan klise "laki-laki sejati" untuk mendefinisikan ulang maskulinitas secara menggurui.',
      },
      {
        doText: 'Mendiskusikan masalah dengan pihak profesional memberi sudut pandang baru yang objektif.',
        doWhy: 'Menempatkan konsultasi setara dengan mencari masukan objektif atau second opinion.',
        dontText: 'Tunjukkan kejantananmu dengan berani jujur soal kesehatan mentalmu.',
        dontWhy: 'Menjadikan kesehatan mental sebagai standar uji maskulinitas baru.',
      },
      {
        doText: 'Rasa kewalahan atau sedih adalah respons wajar atas situasi berat yang sedang dihadapi siapa pun.',
        doWhy: 'Menormalisasi beban secara situasional dan manusiawi tanpa menyudutkan pembaca.',
        dontText: 'Zaman sekarang cowok jangan sok keras; buang gengsi dan ego toxic masculinity-mu.',
        dontWhy: 'Menggurui dengan jargon moralis yang justru memicu penolakan defensif.',
      },
    ],
    note: 'Kalimat seperti ‘cowok juga boleh’ terlihat suportif, tetapi tetap dapat memperkuat anggapan bahwa tindakan tersebut pada dasarnya berada di luar norma laki-laki.',
  },
];

/**
 * The three visibility positions, tied to the tabs that select them.
 *
 * This was three fixed dots on a line: decoration shaped like a chart, encoding
 * nothing and connected to nothing. Two of the three correspond to a tab, so the
 * highlight can follow the reader's choice; `gender` is a different axis
 * entirely, and when it is active no position is claimed rather than a wrong one
 * being lit.
 */
const VISIBILITY_POINTS: { tab: 'public' | 'private' | null; label: string; dot: string; tone: string }[] = [
  { tab: 'private', label: 'Privat', dot: 'bg-emerald-500', tone: 'text-emerald-700 dark:text-emerald-400' },
  { tab: null, label: 'Terlihat orang lain', dot: 'bg-amber-500', tone: 'text-amber-700 dark:text-amber-300' },
  { tab: 'public', label: 'Publik + personal', dot: 'bg-rose-500', tone: 'text-rose-700 dark:text-rose-400' },
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

      {/* B. Prinsip Utama */}
      <div className="rounded-xl border border-stone-800/90 bg-stone-900/40 p-5 sm:p-6">
        <div className="space-y-2 max-w-3xl">
          <span className="text-[10.5px] font-mono uppercase tracking-wider text-amber-500 dark:text-amber-400 font-semibold block">
            Prinsip Utama
          </span>
          <blockquote className="text-base sm:text-lg font-serif italic text-amber-800 dark:text-amber-200/95 border-l-2 border-amber-500/70 pl-3 leading-snug">
            “Semakin publik dan semakin personal tindakannya, semakin rendah tuntutan untuk membuka diri.”
          </blockquote>
        </div>
      </div>

      {/* C. Tiga Context Check Cards */}
      <ol className="cc-steps grid grid-cols-1 md:grid-cols-3 gap-4 list-none p-0 m-0">
        <li className="cc-step rounded-xl border border-stone-800 bg-stone-900/30 p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-stone-300">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-stone-800 text-stone-200 text-[10px]">1</span>
            <span>Cek ruangnya</span>
          </div>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
            “Apakah respons pembaca akan terlihat oleh teman, keluarga, rekan kerja, pasangan, atau publik?”
          </p>
        </li>

        <li className="cc-step rounded-xl border border-stone-800 bg-stone-900/30 p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-stone-300">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-stone-800 text-stone-200 text-[10px]">2</span>
            <span>Cek social cost</span>
          </div>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
            “Apakah tindakan yang kita ajak masih berpotensi dinilai memalukan, lemah, atau ‘tidak laki-laki’ dalam konteks audiens ini?”
          </p>
        </li>

        <li className="cc-step rounded-xl border border-stone-800 bg-stone-900/30 p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-stone-300">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-stone-800 text-stone-200 text-[10px]">3</span>
            <span>Sesuaikan ajakannya</span>
          </div>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
            “Semakin tinggi risiko penilaian sosial, semakin kecil tuntutan untuk mengungkapkan pengalaman pribadi di depan orang lain.”
          </p>
        </li>
      </ol>

      {/* D. Interactive Context Examples */}
      <div className="space-y-4">
        {/* The spectrum now sits directly above the control that moves it, so the
            highlight changing is visible in the same glance as the click. */}
        <div className="rounded-xl border border-stone-800/80 bg-stone-950/60 p-4 space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 block">
            Spektrum Keterlihatan
          </span>
          <div className="flex items-center justify-between text-[11px] font-sans relative">
            <div className="absolute top-[7px] left-3 right-3 h-0.5 bg-stone-800 -translate-y-1/2" aria-hidden="true" />
            {VISIBILITY_POINTS.map((point) => {
              const claimed = VISIBILITY_POINTS.some((p) => p.tab === activeTabId);
              const isActive = point.tab === activeTabId;
              return (
                <div
                  key={point.label}
                  className={`relative z-10 flex flex-col items-center gap-1 text-center transition-opacity duration-200 ${
                    !claimed ? 'opacity-70' : isActive ? 'opacity-100' : 'opacity-35'
                  }`}
                >
                  <span
                    className={`w-3 h-3 rounded-full ring-2 ring-stone-950 transition-transform duration-200 ${point.dot} ${
                      isActive ? 'scale-150' : ''
                    }`}
                  />
                  <span className={`text-[10.5px] font-medium ${point.tone}`}>{point.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selector Tabs */}
        <div
          role="tablist"
          aria-label="Pilihan Ruang dan Norma"
          onKeyDown={(e) => handleTablistKeys(e, (i) => setActiveTabId(CONTEXT_TABS[i].id))}
          className="flex flex-wrap gap-2"
        >
          {CONTEXT_TABS.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                role="tab"
                id={`context-tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls="context-tabpanel"
                tabIndex={isActive ? 0 : -1}
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
        <div
          role="tabpanel"
          id="context-tabpanel"
          aria-labelledby={`context-tab-${activeTab.id}`}
          className="rounded-xl border border-stone-800 bg-stone-900/50 p-5 space-y-4"
        >
          <div className="space-y-1">
            <h3 className="text-lg font-serif font-semibold text-stone-100">{activeTab.title}</h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">{activeTab.description}</p>
          </div>

          {/* Unified Comparison Table */}
          <ComparisonTable
            key={activeTab.id}
            className="cmp-stagger"
            positiveLabel={
              <>
                <CheckCircle2 size={14} className="shrink-0 text-emerald-400" />
                <span>DO (Sesuai Panduan)</span>
              </>
            }
            negativeLabel={
              <>
                <XCircle size={14} className="shrink-0 text-rose-500 dark:text-rose-400" />
                <span>DON'T (Perlu Dihindari)</span>
              </>
            }
            rows={activeTab.pairs.map((pair, idx) => ({
              id: `${activeTab.id}-${idx}`,
              positive: (
                <>
                  <p className="font-serif italic text-emerald-700 dark:text-emerald-200 leading-snug">
                    "{pair.doText}"
                  </p>
                  {pair.doWhy && (
                    <p className="text-[13px] text-stone-500 dark:text-stone-400 leading-relaxed font-sans">
                      {pair.doWhy}
                    </p>
                  )}
                </>
              ),
              negative: (
                <>
                  <p className="font-serif italic text-rose-700 dark:text-rose-200 leading-snug">
                    "{pair.dontText}"
                  </p>
                  {pair.dontWhy && (
                    <p className="text-[13px] text-stone-500 dark:text-stone-400 leading-relaxed font-sans">
                      {pair.dontWhy}
                    </p>
                  )}
                </>
              ),
            }))}
          />

          <p className="text-xs text-stone-400 bg-stone-950/50 p-3 rounded-lg border border-stone-800/80 leading-relaxed font-sans">
            {activeTab.note}
          </p>
        </div>
      </div>

      {/* E. Rangkuman / Takeaway */}
      <div className="rounded-xl border border-stone-800/80 bg-stone-950/60 p-5 space-y-3">
        <span className="text-[11px] font-mono uppercase tracking-wider text-amber-500 dark:text-amber-400 font-bold block">
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

