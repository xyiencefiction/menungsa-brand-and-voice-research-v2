import React, { useState, useMemo } from 'react';
import { 
  Sliders, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight,
  RotateCcw,
  ShieldAlert,
  FileText
} from 'lucide-react';

const MORAL_KEYWORDS = [
  'wajib', 'harus', 'kewajiban', 'dosa', 'moral', 'aib', 'malu', 'norma', 'kodrat', 'pria sejati',
  'pantas', 'bertobat', 'tulus', 'integritas', 'salah', 'benar', 'etika', 'hak', 'keadilan', 'pengecut',
  'duty', 'virtue', 'sin', 'shame', 'blame', 'justice', 'rights', 'evil', 'ought', 'must',
  'integrity', 'coward', 'ethical', 'obligation', 'guilt', 'scold', 'righteous'
];

const CRINGE_KEYWORDS = [
  'alfa', 'alpha', 'sigma', 'pejantan', 'pria sejati', 'real men', 'tulen', 'lemah', 'cemen', 'taklukkan'
];

const PRESETS = [
  {
    id: 'scolding',
    label: '1. Contoh Naskah Menggurui (Bumerang)',
    text: 'Sebagai pria sejati, kamu wajib sadar bahwa memendam rasa sakit adalah dosa moral dan aib besar. Jangan jadi pengecut yang lari dari tanggung jawab, bertobatlah dan hadapi beban hidupmu sekarang juga!'
  },
  {
    id: 'cringe',
    label: '2. Contoh Naskah Klise Alfa (Cringe)',
    text: 'Bangkitlah wahai para pria alfa! Jangan biarkan dirimu menjadi cowok cemen yang mudah mengeluh. Taklukkan harimu dengan disiplin besi dan buktikan siapa pria tangguh sebenarnya di sini.'
  },
  {
    id: 'calibrated',
    label: '3. Contoh Naskah Terkalibrasi Menungsa (Aman)',
    text: 'Langkah pertama tidak harus langsung besar. Duduk sejenak 10 menit, rapikan catatan tugas di meja kerja, dan atur ritme istirahatmu. Tubuh kita memang butuh jeda berkala untuk memulihkan energi setelah bekerja keras.'
  }
];

export const CopySandboxView: React.FC = () => {
  const [inputText, setInputText] = useState<string>(PRESETS[0].text);

  const analysis = useMemo(() => {
    const rawTokens = inputText.trim().split(/\s+/).filter(Boolean);
    const total = rawTokens.length;
    if (total === 0) {
      return { total: 0, moralCount: 0, cringeCount: 0, density: 0, detectedMoral: [], detectedCringe: [] };
    }

    const detectedMoral: string[] = [];
    const detectedCringe: string[] = [];

    rawTokens.forEach((t) => {
      const clean = t.toLowerCase().replace(/[^a-z0-9-]/gi, '');
      if (clean) {
        if (MORAL_KEYWORDS.some((kw) => clean === kw || clean.startsWith(kw) || clean.endsWith(kw))) {
          detectedMoral.push(t);
        }
        if (CRINGE_KEYWORDS.some((kw) => clean === kw || clean.startsWith(kw) || clean.endsWith(kw))) {
          detectedCringe.push(t);
        }
      }
    });

    const density = Math.min(100, Math.round((detectedMoral.length / total) * 100));
    return {
      total,
      moralCount: detectedMoral.length,
      cringeCount: detectedCringe.length,
      density,
      detectedMoral,
      detectedCringe,
    };
  }, [inputText]);

  const getToneEvaluation = (density: number, cringeCount: number) => {
    if (cringeCount > 0) {
      return {
        status: 'CRINGE_ALERT',
        title: 'Terdeteksi Klise Hiper-Maskulin (Berpotensi Dicemooh)',
        description: 'Penggunaan istilah seperti "alfa", "sigma", atau "pria sejati" memicu rasa canggung pada pria dewasa Indonesia. Pesan dianggap tidak tulus atau manipulatif.',
        color: 'text-amber-400',
        bg: 'bg-amber-950/20 border-amber-500/30',
        advice: 'Hapus sebutan identitas maskulinitas. Langsung arahkan naskah pada aktivitas fisik nyata atau ketrampilan fungsional.'
      };
    }
    if (density >= 35) {
      return {
        status: 'HIGH_MORAL',
        title: 'Terlalu Menggurui / Normatif (Risiko Tinggi Penolakan)',
        description: 'Tingginya kata-kata normatif (wajib, harus, dosa, aib) memicu mekanisme pertahanan diri pembaca (reactance). Pembaca merasa dihakimi daripada didukung.',
        color: 'text-rose-400',
        bg: 'bg-rose-950/20 border-rose-500/30',
        advice: 'Ganti kata perintah "kamu harus" dengan fakta fisiologis atau deskripsi keadaan yang umum dialami.'
      };
    }
    if (density >= 15) {
      return {
        status: 'BALANCED',
        title: 'Terukur & Berimbang (Memiliki Bobot Tanpa Menggurui)',
        description: 'Pesan memiliki ketegasan nilai namun diimbangi dengan konteks yang rasional dan membumi.',
        color: 'text-amber-300',
        bg: 'bg-amber-950/20 border-amber-500/30',
        advice: 'Pastikan kalimat penutup memberi ruang kendali (agency) pada pembaca untuk memutuskan langkah berikutnya.'
      };
    }
    return {
      status: 'CALIBRATED',
      title: 'Aman, Membumi & Fungsional (Gaya Suara Menungsa)',
      description: 'Naskah bebas dari doktrin moral yang kaku. Fokus pada tindakan konkret, deskripsi bodily rhythm, dan penghormatan pada kedaulatan pembaca.',
      color: 'text-emerald-400',
      bg: 'bg-emerald-950/20 border-emerald-500/30',
      advice: 'Draf ini sudah memenuhi standar kehangatan dan ketenangan Menungsa.'
    };
  };

  const evaluation = getToneEvaluation(analysis.density, analysis.cringeCount);

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="border-b border-stone-800 pb-6 space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-mono font-medium text-amber-300">
          <Sliders size={13} />
          <span>SIMULATOR & PENGUJI KALIMAT</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-serif tracking-tight text-stone-100">
          Lab Uji Naskah Interaktif (Live Copy Checker)
        </h1>
        <p className="text-xs md:text-sm text-stone-400 max-w-3xl leading-relaxed">
          Tempel atau ketik draf tulisan Anda di bawah ini untuk melihat apakah naskah Anda berpotensi memicu resistensi pembaca, terlampau menggurui, atau sudah selaras dengan suara membumi Menungsa.
        </p>
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Text Input & Presets */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-stone-300 flex items-center gap-1.5 font-semibold">
              <FileText size={14} className="text-amber-400" />
              Kotak Draf Naskah:
            </span>
            <span className="text-[11px] font-mono text-stone-400">
              {analysis.total} Kata
            </span>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap gap-1.5">
            {PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => setInputText(p.text)}
                className="px-2.5 py-1 rounded bg-stone-900 border border-stone-800 text-[11px] font-mono text-stone-400 hover:text-stone-200 hover:border-stone-700 transition cursor-pointer"
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="relative">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={8}
              placeholder="Ketik atau tempel draf naskah Anda di sini..."
              className="w-full rounded-xl border border-stone-800 bg-stone-900/60 p-4 font-serif text-sm leading-relaxed text-stone-100 placeholder-stone-500 focus:border-amber-500/60 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
            />
            {inputText && (
              <button
                onClick={() => setInputText('')}
                className="absolute bottom-3 right-3 text-stone-400 hover:text-stone-200 text-xs font-mono px-2 py-1 rounded bg-stone-950/80 border border-stone-800 cursor-pointer"
              >
                Bersihkan
              </button>
            )}
          </div>

          {/* Detected Keywords Tag Cloud */}
          {(analysis.detectedMoral.length > 0 || analysis.detectedCringe.length > 0) && (
            <div className="rounded-xl border border-stone-800 bg-stone-900/30 p-4 space-y-2 text-xs">
              <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400 block">
                Kata-kata Terdeteksi dalam Teks:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {analysis.detectedMoral.map((w, i) => (
                  <span key={`m-${i}`} className="px-2 py-0.5 rounded bg-rose-500/15 border border-rose-500/30 text-rose-300 font-mono text-[11px]">
                    moral: "{w}"
                  </span>
                ))}
                {analysis.detectedCringe.map((w, i) => (
                  <span key={`c-${i}`} className="px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-[11px]">
                    klise: "{w}"
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Real-time Diagnostics */}
        <div className="lg:col-span-5 space-y-6">
          {/* Moral Density Meter */}
          <div className="rounded-xl border border-stone-800 bg-stone-900/50 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-stone-300 font-semibold">
                Kepadatan Moral (Moral Density)
              </span>
              <span className="text-sm font-mono font-bold text-amber-400">
                {analysis.density}%
              </span>
            </div>

            {/* Visual Progress Bar */}
            <div className="h-3 w-full rounded-full bg-stone-950 overflow-hidden border border-stone-800 flex">
              <div
                style={{ width: `${Math.min(analysis.density, 100)}%` }}
                className={`transition-all duration-300 ${
                  analysis.density >= 35
                    ? 'bg-rose-500'
                    : analysis.density >= 15
                    ? 'bg-amber-500'
                    : 'bg-emerald-500'
                }`}
              />
            </div>

            <div className="flex justify-between text-[10px] font-mono text-stone-400">
              <span>0% (Aman & Membumi)</span>
              <span>20% (Terukur)</span>
              <span>40%+ (Menggurui)</span>
            </div>
          </div>

          {/* Diagnosis Card */}
          <div className={`rounded-xl border p-5 space-y-3 ${evaluation.bg}`}>
            <div className="flex items-start gap-2.5">
              {analysis.density >= 35 || analysis.cringeCount > 0 ? (
                <ShieldAlert size={18} className={evaluation.color} />
              ) : (
                <CheckCircle2 size={18} className={evaluation.color} />
              )}
              <div className="space-y-1">
                <h3 className={`text-sm font-serif font-semibold ${evaluation.color}`}>
                  {evaluation.title}
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {evaluation.description}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-stone-800/80 text-xs text-stone-300 space-y-1">
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block font-semibold">
                Rekomendasi Perbaikan:
              </span>
              <p className="leading-normal">
                {evaluation.advice}
              </p>
            </div>
          </div>

          {/* Golden Writing Checklist */}
          <div className="rounded-xl border border-stone-800 bg-stone-900/30 p-5 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-stone-400 font-semibold block">
              Daftar Periksa Sebelum Tayang (Checklist):
            </span>
            <div className="space-y-2 text-xs text-stone-300">
              <label className="flex items-start gap-2">
                <input type="checkbox" className="mt-0.5 rounded border-stone-700 bg-stone-800 text-amber-500 focus:ring-0" />
                <span>Tidak mendikte pembaca dengan kata "kamu harus" atau "kamu wajib".</span>
              </label>
              <label className="flex items-start gap-2">
                <input type="checkbox" className="mt-0.5 rounded border-stone-700 bg-stone-800 text-amber-500 focus:ring-0" />
                <span>Bebas dari label klise maskulinitas ("pria sejati", "alfa").</span>
              </label>
              <label className="flex items-start gap-2">
                <input type="checkbox" className="mt-0.5 rounded border-stone-700 bg-stone-800 text-amber-500 focus:ring-0" />
                <span>Menawarkan kendali (agency) berupa langkah awal yang berbiaya rendah.</span>
              </label>
              <label className="flex items-start gap-2">
                <input type="checkbox" className="mt-0.5 rounded border-stone-700 bg-stone-800 text-amber-500 focus:ring-0" />
                <span>Menjaga martabat pria jika dibaca di ruang terbuka / publik.</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
