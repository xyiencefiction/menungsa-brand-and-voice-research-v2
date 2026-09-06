import React, { useState, useMemo } from 'react';
import { 
  Sliders, 
  Sparkles, 
  CheckCircle2, 
  ShieldAlert,
  FileText,
  Search,
  BookOpen,
  Info,
  Copy,
  Check,
  RotateCcw
} from 'lucide-react';
import cheatsheetRaw from '../../data/copyCheatsheet.json';

interface CheatsheetEntry {
  term: string;
  category: 'moral' | 'cringe' | 'clinical' | 'imperative' | 'recommended';
  categoryLabel: string;
  severity: 'critical' | 'warning' | 'positive';
  impact: string;
  replacement: string;
}

const cheatsheet: CheatsheetEntry[] = cheatsheetRaw as CheatsheetEntry[];

// Pre-sort multi-word phrases by length descending to prioritize longer phrases
const MULTI_WORD_ENTRIES = cheatsheet
  .filter((e) => e.term.includes(' '))
  .sort((a, b) => b.term.length - a.term.length);

// Map single words for fast lookup
const SINGLE_WORD_MAP = new Map<string, CheatsheetEntry>();
cheatsheet
  .filter((e) => !e.term.includes(' '))
  .forEach((e) => {
    SINGLE_WORD_MAP.set(e.term.toLowerCase(), e);
  });

const PRESETS = [
  {
    id: 'scolding',
    label: '1. Naskah Menggurui (Bumerang Penolakan Moral)',
    text: 'Sebagai pria sejati, kamu wajib sadar bahwa memendam rasa sakit adalah dosa moral dan aib besar. Jangan jadi pengecut yang lari dari tanggung jawab, bertobatlah dan hadapi beban hidupmu sekarang juga!'
  },
  {
    id: 'cringe',
    label: '2. Naskah Klise Maskulin (Canggung & Cringe)',
    text: 'Bangkitlah wahai para pria alfa! Jangan biarkan dirimu menjadi cowok cemen yang mudah mengeluh. Taklukkan harimu dengan disiplin besi dan buktikan siapa pejantan tangguh sebenarnya di sini.'
  },
  {
    id: 'clinical',
    label: '3. Naskah Jargon Klinis & Perintah Agresif (Intimidatif)',
    text: 'Kamu sedang mengalami burnout akut dan trauma masa kecil yang belum sembuh. Jangan pura-pura kuat, segera tumpahkan semuanya, buka lukamu di sini dan konsultasi sekarang sebelum terlambat!'
  },
  {
    id: 'calibrated',
    label: '4. Naskah Terkalibrasi Menungsa (Membumi, Bersahaja & Aman)',
    text: 'Langkah pertama tidak harus langsung besar. Duduk sejenak di meja kerja, rapikan catatan tugas, dan nikmati secangkir kopi hangat. Tubuh kita memang butuh jeda sejenak untuk memulihkan tenaga.'
  }
];

const CATEGORY_TABS = [
  { id: 'all', label: 'Semua Kosakata', count: cheatsheet.length, color: 'text-stone-300' },
  { id: 'moral', label: '🔴 Penghakiman Moral', count: cheatsheet.filter(c => c.category === 'moral').length, color: 'text-rose-400' },
  { id: 'cringe', label: '🟠 Klise Maskulin', count: cheatsheet.filter(c => c.category === 'cringe').length, color: 'text-amber-400' },
  { id: 'clinical', label: '🟣 Jargon Klinis', count: cheatsheet.filter(c => c.category === 'clinical').length, color: 'text-purple-400' },
  { id: 'imperative', label: '🟡 Perintah Agresif', count: cheatsheet.filter(c => c.category === 'imperative').length, color: 'text-yellow-400' },
  { id: 'recommended', label: '🟢 Kata Membumi', count: cheatsheet.filter(c => c.category === 'recommended').length, color: 'text-emerald-400' },
];

export const CopySandboxView: React.FC = () => {
  const [inputText, setInputText] = useState<string>(PRESETS[0].text);
  const [selectedWord, setSelectedWord] = useState<CheatsheetEntry | null>(null);

  // Cheatsheet Browser State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [visibleCount, setVisibleCount] = useState<number>(36);
  const [copiedTerm, setCopiedTerm] = useState<string | null>(null);

  // Analysis Engine
  const analysis = useMemo(() => {
    const rawText = inputText.trim();
    if (!rawText) {
      return {
        total: 0,
        moralCount: 0,
        cringeCount: 0,
        clinicalCount: 0,
        imperativeCount: 0,
        recommendedCount: 0,
        density: 0,
        matches: [] as { entry: CheatsheetEntry; matchText: string }[],
        matchedCategories: { moral: 0, cringe: 0, clinical: 0, imperative: 0, recommended: 0 }
      };
    }

    const rawTokens = rawText.split(/\s+/).filter(Boolean);
    const total = rawTokens.length;

    const lower = rawText.toLowerCase();
    const matches: { entry: CheatsheetEntry; matchText: string }[] = [];
    const seenMatchTerms = new Set<string>();

    // 1. First pass: detect multi-word phrases
    MULTI_WORD_ENTRIES.forEach((entry) => {
      const phrase = entry.term;
      const index = lower.indexOf(phrase);
      if (index !== -1 && !seenMatchTerms.has(phrase)) {
        seenMatchTerms.add(phrase);
        matches.push({ entry, matchText: phrase });
      }
    });

    // 2. Second pass: detect single-word tokens
    rawTokens.forEach((token) => {
      const clean = token.toLowerCase().replace(/[^a-z0-9-]/gi, '');
      if (clean && SINGLE_WORD_MAP.has(clean)) {
        const entry = SINGLE_WORD_MAP.get(clean)!;
        if (!seenMatchTerms.has(clean)) {
          seenMatchTerms.add(clean);
          matches.push({ entry, matchText: token });
        }
      }
    });

    // Aggregate category counts
    const matchedCategories = {
      moral: 0,
      cringe: 0,
      clinical: 0,
      imperative: 0,
      recommended: 0
    };

    matches.forEach((m) => {
      if (m.entry.category in matchedCategories) {
        matchedCategories[m.entry.category as keyof typeof matchedCategories]++;
      }
    });

    const density = Math.min(100, Math.round((matchedCategories.moral / Math.max(1, total)) * 100));

    return {
      total,
      moralCount: matchedCategories.moral,
      cringeCount: matchedCategories.cringe,
      clinicalCount: matchedCategories.clinical,
      imperativeCount: matchedCategories.imperative,
      recommendedCount: matchedCategories.recommended,
      density,
      matches,
      matchedCategories
    };
  }, [inputText]);

  // Overall Tone Evaluation
  const evaluation = useMemo(() => {
    const { moralCount, cringeCount, clinicalCount, imperativeCount, recommendedCount, density, total } = analysis;

    if (total === 0) {
      return {
        status: 'EMPTY',
        title: 'Kotak Uji Masih Kosong',
        description: 'Tulis atau tempel draf naskah Anda di atas, atau pilih salah satu contoh naskah siap uji.',
        color: 'text-stone-400',
        bg: 'bg-stone-900/40 border-stone-800',
        advice: 'Pilih preset naskah atau ketik draf promosi/artikel yang ingin dievaluasi.'
      };
    }

    if (moralCount > 0 && density >= 25) {
      return {
        status: 'HIGH_MORAL',
        title: 'Terlalu Menggurui / Menghakimi (Risiko Tinggi Penolakan)',
        description: `Terdeteksi ${moralCount} kata bernada sanksi moral/keharusan mutlak. Gaya ini memicu resistensi batin (reactance) seketika pada pembaca pria dewasa.`,
        color: 'text-rose-400',
        bg: 'bg-rose-950/20 border-rose-500/30',
        advice: 'Ganti kata perintah normatif ("wajib", "harus", "dosa", "aib") dengan pengamatan wajar atau ritme harian yang dialami bersama.'
      };
    }

    if (cringeCount > 0) {
      return {
        status: 'CRINGE_ALERT',
        title: 'Terdeteksi Klise Maskulin & Manosphere (Cringe)',
        description: `Terdeteksi ${cringeCount} istilah klise seperti kasta maskulinitas ("alfa", "pejantan", "pria sejati"). Pembaca merasa canggung dan menganggap naskah tidak tulus.`,
        color: 'text-amber-400',
        bg: 'bg-amber-950/20 border-amber-500/30',
        advice: 'Hapus kasta dan hierarki maskulinitas. Langsung arahkan naskah pada keahlian nyata, penyelesaian masalah fungsional, dan tanggung jawab praktis.'
      };
    }

    if (clinicalCount > 0) {
      return {
        status: 'CLINICAL_ALERT',
        title: 'Jargon Klinis Prematur / Therapy-Speak Berlebih',
        description: `Terdeteksi ${clinicalCount} diagnosis medis atau label psikologis ("depresi", "trauma", "burnout"). Ini berisiko memicu rasa malu sosial (public shame) dicap abnormal.`,
        color: 'text-purple-400',
        bg: 'bg-purple-950/20 border-purple-500/30',
        advice: 'Bahasakan keluhan melalui rutinitas fisik nyata: jam istirahat yang kurang, ketegangan otot leher, atau tumpukan berkas kerja di kantor.'
      };
    }

    if (imperativeCount > 0) {
      return {
        status: 'IMPERATIVE_ALERT',
        title: 'Perintah Curhat Terlalu Agresif (Melanggar Batas Privasi)',
        description: `Terdeteksi ${imperativeCount} pemaksaan pengakuan ("buka hatimu", "tumpahkan semuanya"). Pria cenderung menutup diri jika dipaksa terbuka di ruang umum.`,
        color: 'text-yellow-400',
        bg: 'bg-yellow-950/20 border-yellow-500/30',
        advice: 'Beri ruang kendali penuh (agency): "Boleh datang, boleh sekadar duduk mendengarkan tanpa keharusan berbicara."'
      };
    }

    if (recommendedCount > 0 || (moralCount === 0 && cringeCount === 0 && clinicalCount === 0 && imperativeCount === 0)) {
      return {
        status: 'CALIBRATED',
        title: 'Aman, Membumi & Bermartabat (Selaras Suara Menungsa)',
        description: 'Naskah bebas dari sanksi moral yang menekan, bebas klise berlebihan, dan menghormati batas martabat serta kedaulatan pembaca.',
        color: 'text-emerald-400',
        bg: 'bg-emerald-950/20 border-emerald-500/30',
        advice: 'Draf naskah ini sudah matang dan sangat layak untuk dipublikasikan.'
      };
    }

    return {
      status: 'NEUTRAL',
      title: 'Perlu Pengamatan Konteks Lebih Lanjut',
      description: 'Naskah tidak memicu peringatan mayor, namun perhatikan alur kalimat agar tetap bersahaja dan menenangkan.',
      color: 'text-stone-300',
      bg: 'bg-stone-900/50 border-stone-800',
      advice: 'Pastikan kalimat penutup tidak terkesan memaksa pembaca mengambil keputusan secara tergesa-gesa.'
    };
  }, [analysis]);

  // Filtered Cheatsheet Items
  const filteredCheatsheet = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return cheatsheet.filter((item) => {
      const matchCat = activeCategory === 'all' || item.category === activeCategory;
      if (!matchCat) return false;
      if (!q) return true;
      return (
        item.term.toLowerCase().includes(q) ||
        item.impact.toLowerCase().includes(q) ||
        item.replacement.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, activeCategory]);

  const displayedCheatsheet = useMemo(() => {
    return filteredCheatsheet.slice(0, visibleCount);
  }, [filteredCheatsheet, visibleCount]);

  const handleCopyReplacement = (text: string, term: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTerm(term);
    setTimeout(() => setCopiedTerm(null), 2000);
  };

  const handleAppendToSandbox = (term: string) => {
    setInputText((prev) => (prev ? `${prev} ${term}` : term));
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <div className="border-b border-stone-800 pb-6 space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-mono font-medium text-amber-300">
          <Sliders size={13} />
          <span>SIMULATOR & KAMUS PENGUJI KATA</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-serif tracking-tight text-stone-100">
          Lab Uji Draf Naskah & Cheatsheet 9.700+ Kosakata
        </h1>
        <p className="text-xs md:text-sm text-stone-300 max-w-3xl leading-relaxed">
          Uji draf naskah Anda secara langsung dengan sistem pendeteksi hampir sepuluh ribu (9.700+) kata & frasa terkalibrasi. Temukan apakah tulisan Anda berpotensi memicu rasa bersalah (bumerang moral), klise maskulin canggung (cringe), intimidasi klinis, atau sudah selaras dengan gaya membumi Menungsa.
        </p>
      </div>

      {/* SECTION 1: MAIN WORKSPACE (LIVE TESTER) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Text Input & Presets */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-stone-300 flex items-center gap-1.5 font-semibold">
              <FileText size={14} className="text-amber-400" />
              Kotak Uji Draf Naskah:
            </span>
            <span className="text-[11px] font-mono text-stone-400">
              {analysis.total} Kata • Terdeteksi {analysis.matches.length} Istilah
            </span>
          </div>

          {/* Quick Presets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setInputText(p.text);
                  setSelectedWord(null);
                }}
                className={`text-left px-3 py-2 rounded-lg border text-xs font-sans transition cursor-pointer flex flex-col gap-0.5 ${
                  inputText === p.text
                    ? 'bg-amber-950/30 border-amber-500/50 text-amber-200'
                    : 'bg-stone-900/70 border-stone-800 text-stone-300 hover:border-stone-700 hover:text-stone-100'
                }`}
              >
                <span className="font-medium text-[11px] truncate">{p.label}</span>
                <span className="text-[10px] text-stone-400 line-clamp-1">
                  {p.text}
                </span>
              </button>
            ))}
          </div>

          {/* Textarea */}
          <div className="relative">
            <textarea
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                setSelectedWord(null);
              }}
              rows={8}
              placeholder="Ketik atau tempel draf naskah Anda di sini untuk diuji dengan 9.700+ kata cheatsheet..."
              className="w-full rounded-xl border border-stone-800 bg-stone-900/60 p-4 font-serif text-sm leading-relaxed text-stone-100 placeholder-stone-500 focus:border-amber-500/60 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
            />
            {inputText && (
              <button
                onClick={() => {
                  setInputText('');
                  setSelectedWord(null);
                }}
                className="absolute bottom-3 right-3 text-stone-400 hover:text-stone-200 text-xs font-mono px-2.5 py-1 rounded bg-stone-950/80 border border-stone-800 cursor-pointer flex items-center gap-1"
              >
                <RotateCcw size={12} />
                <span>Bersihkan</span>
              </button>
            )}
          </div>

          {/* Real-time Category Counter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono">
            <span className="text-stone-400 font-sans">Deteksi:</span>
            <span className={`px-2 py-0.5 rounded border ${analysis.moralCount > 0 ? 'bg-rose-500/20 border-rose-500/40 text-rose-300' : 'bg-stone-900 border-stone-800 text-stone-500'}`}>
              Moral: {analysis.moralCount}
            </span>
            <span className={`px-2 py-0.5 rounded border ${analysis.cringeCount > 0 ? 'bg-amber-500/20 border-amber-500/40 text-amber-300' : 'bg-stone-900 border-stone-800 text-stone-500'}`}>
              Klise: {analysis.cringeCount}
            </span>
            <span className={`px-2 py-0.5 rounded border ${analysis.clinicalCount > 0 ? 'bg-purple-500/20 border-purple-500/40 text-purple-300' : 'bg-stone-900 border-stone-800 text-stone-500'}`}>
              Klinis: {analysis.clinicalCount}
            </span>
            <span className={`px-2 py-0.5 rounded border ${analysis.imperativeCount > 0 ? 'bg-yellow-500/20 border-yellow-500/40 text-yellow-300' : 'bg-stone-900 border-stone-800 text-stone-500'}`}>
              Agresif: {analysis.imperativeCount}
            </span>
            <span className={`px-2 py-0.5 rounded border ${analysis.recommendedCount > 0 ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-stone-900 border-stone-800 text-stone-500'}`}>
              Membumi: {analysis.recommendedCount}
            </span>
          </div>

          {/* Detected Keywords Interactive Badges */}
          {analysis.matches.length > 0 && (
            <div className="rounded-xl border border-stone-800 bg-stone-900/40 p-4 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-stone-300 font-semibold flex items-center gap-1.5">
                  <Sparkles size={13} className="text-amber-400" />
                  Kata Kunci yang Terdeteksi dalam Naskah (Klik untuk Telaah):
                </span>
                <span className="text-[10px] text-stone-400 font-mono">
                  {analysis.matches.length} kata
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
                {analysis.matches.map((m, idx) => {
                  const cat = m.entry.category;
                  const isSelected = selectedWord?.term === m.entry.term;
                  const badgeClasses = 
                    cat === 'moral' ? 'bg-rose-500/15 border-rose-500/40 text-rose-300 hover:bg-rose-500/25' :
                    cat === 'cringe' ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 hover:bg-amber-500/25' :
                    cat === 'clinical' ? 'bg-purple-500/15 border-purple-500/40 text-purple-300 hover:bg-purple-500/25' :
                    cat === 'imperative' ? 'bg-yellow-500/15 border-yellow-500/40 text-yellow-300 hover:bg-yellow-500/25' :
                    'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/25';

                  return (
                    <button
                      key={`${m.entry.term}-${idx}`}
                      onClick={() => setSelectedWord(m.entry)}
                      className={`px-2 py-1 rounded-md border text-[11px] font-mono transition cursor-pointer ${badgeClasses} ${
                        isSelected ? 'ring-2 ring-amber-400 font-bold' : ''
                      }`}
                    >
                      {cat === 'recommended' ? '✓' : '!'} "{m.entry.term}"
                    </button>
                  );
                })}
              </div>

              {/* Word Detail Inspector Panel */}
              {selectedWord && (
                <div className="mt-3 p-3.5 rounded-lg border border-stone-700 bg-stone-950 space-y-2 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-amber-300">
                        "{selectedWord.term}"
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-stone-900 border border-stone-700 text-stone-300 font-sans">
                        {selectedWord.categoryLabel}
                      </span>
                    </div>
                    <button
                      onClick={() => setSelectedWord(null)}
                      className="text-stone-400 hover:text-stone-200 text-xs cursor-pointer"
                    >
                      Tutup
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-rose-400 block font-semibold">
                        Dampak Psikologis pada Pembaca:
                      </span>
                      <p className="text-stone-300 mt-0.5 leading-relaxed">
                        {selectedWord.impact}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-emerald-400 block font-semibold">
                        Rekomendasi Solusi / Pengganti:
                      </span>
                      <p className="text-stone-300 mt-0.5 leading-relaxed">
                        {selectedWord.replacement}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Real-time Diagnostics */}
        <div className="lg:col-span-5 space-y-6">
          {/* Moral Density Meter */}
          <div className="rounded-xl border border-stone-800 bg-stone-900/50 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-stone-200 font-semibold">
                Kepadatan Nada Moral (Moral Density)
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
                  analysis.density >= 25
                    ? 'bg-rose-500'
                    : analysis.density >= 12
                    ? 'bg-amber-500'
                    : 'bg-emerald-500'
                }`}
              />
            </div>

            <div className="flex justify-between text-[10px] font-mono text-stone-400">
              <span>0% (Aman & Membumi)</span>
              <span>15% (Terukur)</span>
              <span>30%+ (Risiko Penolakan)</span>
            </div>
          </div>

          {/* Diagnosis Card */}
          <div className={`rounded-xl border p-5 space-y-3.5 ${evaluation.bg}`}>
            <div className="flex items-start gap-2.5">
              {evaluation.status === 'CALIBRATED' ? (
                <CheckCircle2 size={18} className={`${evaluation.color} shrink-0 mt-0.5`} />
              ) : evaluation.status === 'EMPTY' ? (
                <Info size={18} className={`${evaluation.color} shrink-0 mt-0.5`} />
              ) : (
                <ShieldAlert size={18} className={`${evaluation.color} shrink-0 mt-0.5`} />
              )}
              <div className="space-y-1">
                <h3 className={`text-sm font-serif font-semibold ${evaluation.color} leading-snug`}>
                  {evaluation.title}
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {evaluation.description}
                </p>
              </div>
            </div>

            <div className="pt-2.5 border-t border-stone-800/80 text-xs text-stone-300 space-y-1">
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block font-semibold">
                Rekomendasi Perbaikan:
              </span>
              <p className="leading-relaxed text-stone-200">
                {evaluation.advice}
              </p>
            </div>
          </div>

          {/* Golden Writing Checklist */}
          <div className="rounded-xl border border-stone-800 bg-stone-900/30 p-5 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-stone-400 font-semibold block">
              Daftar Periksa Sebelum Naskah Tayang:
            </span>
            <div className="space-y-2 text-xs text-stone-300">
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" className="mt-0.5 rounded border-stone-700 bg-stone-800 text-amber-500 focus:ring-0" />
                <span>Bebas dari sanksi moral & pendiktean mutlak ("harus", "wajib", "dosa").</span>
              </label>
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" className="mt-0.5 rounded border-stone-700 bg-stone-800 text-amber-500 focus:ring-0" />
                <span>Bebas dari klise hierarki maskulinitas ("pria sejati", "alfa", "pejantan").</span>
              </label>
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" className="mt-0.5 rounded border-stone-700 bg-stone-800 text-amber-500 focus:ring-0" />
                <span>Bebas dari pelabelan medis prematur dan pemaksaan curhat di ruang publik.</span>
              </label>
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" className="mt-0.5 rounded border-stone-700 bg-stone-800 text-amber-500 focus:ring-0" />
                <span>Menawarkan kedaulatan memilih (agency): pembaca bebas menentukan langkahnya sendiri.</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: MASTER CHEATSHEET EXPLORER (9,700+ WORDS) */}
      <div className="border-t border-stone-800 pt-10 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 uppercase tracking-wider">
              <BookOpen size={14} />
              <span>KAMUS BESAR KATA & FRASA NASKAH (9.700+ ENTRI)</span>
            </div>
            <h2 className="text-xl md:text-2xl font-serif text-stone-100">
              Kamus Cheatsheet Kosakata Menungsa
            </h2>
            <p className="text-xs md:text-sm text-stone-400 max-w-2xl">
              Telusuri ribuan kata dan frasa yang sudah dipetakan ke dalam lima kategori psikologis. Gunakan kamus ini untuk mencari alternatif kata yang lebih tenang, membumi, dan tidak memicu penolakan batin.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-stone-400 bg-stone-900 border border-stone-800 px-3 py-1.5 rounded-lg">
              Total Database: <strong className="text-amber-300 font-mono">{cheatsheet.length}</strong> Kata/Frasa
            </span>
          </div>
        </div>

        {/* Search Bar & Category Filters */}
        <div className="space-y-3">
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(36);
              }}
              placeholder="Cari kata, frasa, atau alasan risiko (contoh: wajib, alfa, trauma, bernapas, tidur)..."
              className="w-full rounded-xl border border-stone-800 bg-stone-900/80 pl-10 pr-4 py-2.5 text-xs md:text-sm text-stone-100 placeholder-stone-500 focus:border-amber-500/60 focus:outline-none focus:ring-1 focus:ring-amber-500/30 font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-stone-400 hover:text-stone-200"
              >
                Hapus
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
            {CATEGORY_TABS.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveCategory(tab.id);
                    setVisibleCount(36);
                  }}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-sans whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-stone-800 border-stone-600 text-stone-100 font-medium'
                      : 'bg-stone-900/50 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                  }`}
                >
                  <span className={tab.color}>{tab.label}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-stone-950 text-stone-400">
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between text-xs text-stone-400 font-mono">
          <span>
            Menemukan <strong className="text-stone-200">{filteredCheatsheet.length}</strong> kosakata
            {searchQuery ? ` untuk "${searchQuery}"` : ''}
          </span>
          <span>
            Menampilkan {Math.min(displayedCheatsheet.length, filteredCheatsheet.length)} dari {filteredCheatsheet.length}
          </span>
        </div>

        {/* Cheatsheet Grid Cards */}
        {filteredCheatsheet.length === 0 ? (
          <div className="rounded-xl border border-stone-800 bg-stone-900/30 p-12 text-center space-y-2">
            <p className="text-sm font-serif text-stone-300">
              Tidak ada kata yang cocok dengan kata pencarian "{searchQuery}".
            </p>
            <p className="text-xs text-stone-500">
              Coba gunakan kata dasar atau pilih kategori lain di atas.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {displayedCheatsheet.map((item, idx) => {
              const isRecommended = item.category === 'recommended';
              const borderClass = 
                item.category === 'moral' ? 'hover:border-rose-500/40' :
                item.category === 'cringe' ? 'hover:border-amber-500/40' :
                item.category === 'clinical' ? 'hover:border-purple-500/40' :
                item.category === 'imperative' ? 'hover:border-yellow-500/40' :
                'hover:border-emerald-500/40';

              const tagBg = 
                item.category === 'moral' ? 'bg-rose-500/10 text-rose-300 border-rose-500/30' :
                item.category === 'cringe' ? 'bg-amber-500/10 text-amber-300 border-amber-500/30' :
                item.category === 'clinical' ? 'bg-purple-500/10 text-purple-300 border-purple-500/30' :
                item.category === 'imperative' ? 'bg-yellow-500/10 text-yellow-300 border-yellow-500/30' :
                'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';

              return (
                <div
                  key={`${item.term}-${idx}`}
                  className={`rounded-xl border border-stone-800/80 bg-stone-900/40 p-4 space-y-3 transition duration-150 flex flex-col justify-between ${borderClass}`}
                >
                  <div className="space-y-2">
                    {/* Header: Term and Category */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-0.5">
                        <span className="text-sm font-serif font-semibold text-stone-100 block">
                          "{item.term}"
                        </span>
                        <span className={`inline-block text-[10px] font-mono px-2 py-0.5 rounded border ${tagBg}`}>
                          {item.categoryLabel}
                        </span>
                      </div>

                      <button
                        onClick={() => handleAppendToSandbox(item.term)}
                        title="Sisipkan kata ini ke Kotak Uji Naskah"
                        className="text-[10px] font-mono px-2 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-stone-100 transition cursor-pointer border border-stone-700"
                      >
                        + Uji Kata
                      </button>
                    </div>

                    {/* Impact / Reason */}
                    <div className="text-xs text-stone-400 leading-relaxed">
                      <span className="text-[10px] font-mono uppercase text-stone-500 block font-semibold">
                        {isRecommended ? 'Alasan Direkomendasikan:' : 'Dampak Penolakan / Risiko:'}
                      </span>
                      <p className="text-stone-300 text-[11px] mt-0.5">
                        {item.impact}
                      </p>
                    </div>
                  </div>

                  {/* Recommendation / Alternative */}
                  <div className="pt-2 border-t border-stone-800/80 flex items-start justify-between gap-2 text-xs">
                    <div className="space-y-0.5 flex-1">
                      <span className="text-[10px] font-mono uppercase text-amber-400 block font-semibold">
                        {isRecommended ? 'Karakter Kalimat:' : 'Saran Solusi:'}
                      </span>
                      <p className="text-[11px] text-stone-300 leading-snug">
                        {item.replacement}
                      </p>
                    </div>

                    <button
                      onClick={() => handleCopyReplacement(item.replacement, item.term)}
                      title="Salin saran solusi"
                      className="p-1 rounded text-stone-400 hover:text-stone-200 transition shrink-0 cursor-pointer"
                    >
                      {copiedTerm === item.term ? (
                        <Check size={13} className="text-emerald-400" />
                      ) : (
                        <Copy size={13} />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Load More Button */}
        {displayedCheatsheet.length < filteredCheatsheet.length && (
          <div className="pt-4 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 36)}
              className="px-6 py-2.5 rounded-xl bg-stone-900 border border-stone-700 hover:border-amber-500/50 text-stone-200 hover:text-amber-300 font-mono text-xs transition cursor-pointer"
            >
              Tampilkan 36 Kata Berikutnya ({filteredCheatsheet.length - displayedCheatsheet.length} tersisa)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
