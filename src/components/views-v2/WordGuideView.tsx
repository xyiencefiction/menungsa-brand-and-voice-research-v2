import React, { useState } from 'react';
import { 
  BookOpen, 
  Users, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface RegisterItem {
  id: string;
  name: string;
  authorityLevel: number;
  intimacyLevel: number;
  socialRelationship: string;
  impression: string;
  risks: string;
  contexts: string;
  example: string;
}

const REGISTERS: RegisterItem[] = [
  {
    id: 'kamu',
    name: 'kamu',
    authorityLevel: 3,
    intimacyLevel: 3,
    socialRelationship: 'Langsung, hangat, dan setara. Standar bawaan organisasi Menungsa.',
    impression: 'Menyapa langsung tanpa kepalsuan akrab yang berlebihan.',
    risks: 'Dapat terasa terlalu menuntut jika dipadukan dengan kalimat perintah ("kamu harus").',
    contexts: 'Semua kanal publik dan privat: feed media sosial, carousel, artikel, panduan ringkas.',
    example: 'Ketika tubuhmu memberi sinyal lelah, dengarkan.'
  },
  {
    id: 'Anda',
    name: 'Anda',
    authorityLevel: 4,
    intimacyLevel: 1,
    socialRelationship: 'Formal, menghormati jarak sosial, dan menjaga kesantunan profesional.',
    impression: 'Tertib, klinis, dan menghormati batasan privasi tinggi.',
    risks: 'Terasa kaku dan berjarak jika digunakan dalam obrolan empati santai.',
    contexts: 'Layanan konsultasi medis resmi, formulir pendaftaran klinik, syarat & ketentuan hukum.',
    example: 'Jadwal konsultasi Anda telah terkonfirmasi untuk hari Selasa pukul 14.00.'
  },
  {
    id: 'kita',
    name: 'kita',
    authorityLevel: 2,
    intimacyLevel: 4,
    socialRelationship: 'Inklusif dan merangkul; menempatkan penulis dan pembaca dalam satu perahu.',
    impression: 'Rasa senasib dan kebersamaan biologis manusiawi.',
    risks: 'Terdengar sok tahu atau memaksakan asumsi jika pembaca tidak sedang mengalami hal tersebut.',
    contexts: 'Pembahasan ritme fisiologis tubuh, fenomena sosial umum, atau refleksi kemanusiaan.',
    example: 'Tubuh kita memang butuh jeda setelah bekerja berhari-hari tanpa henti.'
  },
  {
    id: 'kami',
    name: 'kami',
    authorityLevel: 3,
    intimacyLevel: 2,
    socialRelationship: 'Penutur jamak atas nama institusi resmi Menungsa.',
    impression: 'Jujur bahwa pesan ini datang dari sebuah lembaga, bukan teman khayalan.',
    risks: 'Dapat terasa dingin jika dipakai berlebihan tanpa menyapa pembaca.',
    contexts: 'Pernyataan kebijakan organisasi, transparansi program, dan pelaporan kegiatan.',
    example: 'Kami di Menungsa menyiapkan ruang ini agar teman-teman bisa rehat sejenak.'
  },
  {
    id: 'gue / lo',
    name: 'gue / lo',
    authorityLevel: 1,
    intimacyLevel: 5,
    socialRelationship: 'Akrab, kasual, dan personal antarteman sebaya.',
    impression: 'Percakapan riil anak muda di ranah privat.',
    risks: 'Sangat berbahaya jika dipakai akun anonim institusi (terdengar canggung dan dibuat-buat).',
    contexts: 'HANYA boleh jika penulis adalah individu bernama nyata yang menulis esai personal atas nama sendiri.',
    example: 'Waktu usaha gue tutup dua tahun lalu, rasanya bangun tidur aja susah banget.'
  },
  {
    id: 'pria / laki-laki',
    name: 'pria / laki-laki',
    authorityLevel: 3,
    intimacyLevel: 2,
    socialRelationship: 'Penanda identitas gender faktual.',
    impression: 'Objektif dan ilmiah.',
    risks: 'Memicu kejenuhan (gender fatigue) jika terus diulang-ulang di setiap kalimat.',
    contexts: 'Pembahasan isu biologi pria (kardiovaskular, hormon tidur) atau peran sosial kebapakan.',
    example: 'Pria dewasa sering menunda pemeriksaan kesehatan hingga gejala fisik terasa mengganggu.'
  }
];

interface EthicalAlternativeItem {
  functionName: string;
  psychologicalNeed: string;
  whyCompelling: string;
  harmfulVersion: string;
  ethicalAlternative: string;
  keyPrinciple: string;
}

const ETHICAL_ALTERNATIVES: EthicalAlternativeItem[] = [
  {
    functionName: 'Kepastian & Kejelasan Arah Hidup',
    psychologicalNeed: 'Kebutuhan akan kejelasan struktur hidup dan panduan logis saat menghadapi kerumitan karier serta relasi.',
    whyCompelling: 'Meredakan kebingungan akut; mengubah situasi sosial yang rumit menjadi aturan main yang tampak teratur.',
    harmfulVersion: 'Doktrin mutlak Red Pill, teori evolusi pseudo-biologis, generalisasi kebencian pada wanita, dan fatalisme blackpill.',
    ethicalAlternative: 'Menyediakan peta psikologi dan dinamika sosial yang realistis dengan kejujuran terukur. Menyebutkan kesulitan nyata tanpa menciptakan musuh khayalan.',
    keyPrinciple: 'Memberikan struktur yang realistis dan terkalibrasi, bukan aturan mutlak palsu.'
  },
  {
    functionName: 'Pengakuan Beban & Rasa Didengar',
    psychologicalNeed: 'Kebutuhan untuk merasa dipahami dan terbebas dari rasa malu saat belum mampu memenuhi ekspektasi sosial.',
    whyCompelling: 'Meringankan beban rasa gagal pribadi dengan menegaskan bahwa sistem dan realitas hidup memang berat.',
    harmfulVersion: 'Memanfaatkan luka batin menjadi kebencian kolektif, menyalahkan wanita, menyalahkan keluarga, atau mendendam pada lingkungan.',
    ethicalAlternative: 'Memvalidasi beratnya beban peran pria modern, ketidakpastian ekonomi, dan kesepian batin TANPA menyediakan kambing hitam.',
    keyPrinciple: 'Validasi rasa lelah dan kesulitan hidupnya, jangan pernah memvalidasi kebenciannya.'
  },
  {
    functionName: 'Keahlian Nyata, Martabat & Harga Diri',
    psychologicalNeed: 'Kebutuhan akan rasa berharga, dihormati kawan sebaya, dan memiliki kompetensi yang nyata dirasakan.',
    whyCompelling: 'Menggantikan rasa rendah diri dengan hierarki pencapaian fisik, finansial, dan rasa bangga sebagai pria.',
    harmfulVersion: 'Konsep dominasi "Pria Nilai Tinggi (High-Value Man)", merendahkan pria lain yang berpenghasilan rendah, dan obsesi fisik superfisial.',
    ethicalAlternative: 'Menambatkan martabat pada kecakapan hidup dewasa, pertumbuhan diri mandiri, ketrampilan karya nyata, serta tanggung jawab etis pada keluarga dan komunitas.',
    keyPrinciple: 'Membangun keahlian dan rasa bernilai tanpa perlu membanding-bandingkan kasta sosial.'
  },
  {
    functionName: 'Kedaulatan Diri & Kemampuan Bertindak',
    psychologicalNeed: 'Kebutuhan untuk keluar dari rasa tak berdaya dan memegang kendali atas jalan hidup melalui tindakan nyata.',
    whyCompelling: 'Tindakan nyata memulihkan motivasi dan kedaulatan diri; menolak mentalitas korban yang pasif.',
    harmfulVersion: 'Disiplin brutal (toxic grindset), menyalahkan orang yang lelah sebagai orang bermental cengeng, dan mengabaikan keterbatasan ekonomi riil.',
    ethicalAlternative: 'Menawarkan langkah-langkah awal yang ringan dan terjangkau, sambil tetap berempati secara jujur pada keterbatasan ekonomi nyata.',
    keyPrinciple: 'Kemandirian bertindak yang dipadukan dengan empati pada realitas hidup.'
  },
  {
    functionName: 'Rasa Memiliki & Persaudaraan Sejati',
    psychologicalNeed: 'Kebutuhan akan lingkungan pertemanan sebaya yang aman, di mana ia diterima apa adanya tanpa kecemasan performa.',
    whyCompelling: 'Menyediakan tempat berlindung dari kesepian sosial yang dialami banyak pria dewasa.',
    harmfulVersion: 'Kelompok berbasis permusuhan bersama (us vs them), menguji kemaskulinan anggota dengan merundung mereka yang terlihat lembut.',
    ethicalAlternative: 'Membangun wadah pria yang berakar pada aktivitas bersama (olahraga rekreasional, hobi karya, saling bantu), di mana kebersamaan tumbuh berdampingan secara wajar.',
    keyPrinciple: 'Persaudaraan yang membebaskan, bukan sekte yang menguji kesetiaan dengan kebencian.'
  },
  {
    functionName: 'Makna Hidup & Tanggung Jawab Luhur',
    psychologicalNeed: 'Kebutuhan untuk memiliki tujuan hidup yang lebih besar dari diri sendiri dan menjadi sosok yang berguna bagi sesama.',
    whyCompelling: 'Menjawab kehampaan eksistensial dengan panggilan untuk melindungi dan merawat orang-orang terkasih.',
    harmfulVersion: 'Glorifikasi kekerasan fisik, retorika perang suci, fantasi dominasi agresif, dan sindrom pahlawan yang angkuh.',
    ethicalAlternative: 'Menghidupkan kembali kebajikan pria melalui kesabaran mengayomi, ketenangan menghadapi krisis, dan kontribusi nyata yang merawat keluarga serta lingkungan.',
    keyPrinciple: 'Kepahlawanan dalam kesabaran merawat, bukan dalam agresi menaklukkan.'
  }
];

export const WordGuideView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pronouns' | 'gender' | 'alternatives'>('pronouns');
  const [selectedRegisterId, setSelectedRegisterId] = useState<string>('kamu');

  // Quick Decision Assistant state
  const [speakerType, setSpeakerType] = useState<'institution' | 'person'>('institution');
  const [privacyType, setPrivacyType] = useState<'public' | 'private'>('public');

  const getRecommendedPronoun = () => {
    if (speakerType === 'institution') {
      return privacyType === 'public'
        ? {
            pronoun: 'kamu',
            firstPerson: 'kami',
            note: 'Standar bawaan organisasi: santun, langsung, hangat, tanpa berpura-pura menjadi teman tongkrongan.',
          }
        : {
            pronoun: 'kamu / Anda',
            firstPerson: 'kami',
            note: 'Gunakan kamu untuk pendampingan hangat, atau Anda jika konteksnya layanan medis resmi Puskesmas/klinik.',
          };
    } else {
      return privacyType === 'public'
        ? {
            pronoun: 'kamu / Anda',
            firstPerson: 'saya',
            note: 'Jika penulis bernama nyata menulis esai publik, gunakan saya dan sapa pembaca dengan kamu.',
          }
        : {
            pronoun: 'lo',
            firstPerson: 'gue',
            note: 'Gue/lo sah HANYA jika dua individu bernama nyata berbicara dalam obrolan santai di ranah privat.',
          };
    }
  };

  const recommendation = getRecommendedPronoun();
  const activeRegister = REGISTERS.find((r) => r.id === selectedRegisterId) ?? REGISTERS[0];

  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div className="border-b border-stone-800 pb-6 space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-mono font-medium text-amber-300">
          <BookOpen size={13} />
          <span>KAMUS RAGAM & PILIHAN KATA</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-serif tracking-tight text-stone-100">
          Panduan Pilihan Kata, Sapaan & Kata Ganti
        </h1>
        <p className="text-xs md:text-sm text-stone-300 max-w-3xl leading-relaxed">
          Pilihan kata ganti dan sapaan pria menentukan apakah pembaca merasa dihormati atau justru merasa dihakimi. Gunakan panduan praktis ini untuk memastikan pilihan kata naskah Anda selalu tepat sasaran.
        </p>

        {/* Tab Switcher */}
        <div className="flex flex-wrap gap-2 pt-2">
          <button
            onClick={() => setActiveTab('pronouns')}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'pronouns'
                ? 'bg-stone-200 text-stone-950 font-semibold'
                : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200'
            }`}
          >
            <Users size={14} />
            <span>1. Kata Ganti (Kamu, Anda, Kita, Gue)</span>
          </button>
          <button
            onClick={() => setActiveTab('gender')}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'gender'
                ? 'bg-stone-200 text-stone-950 font-semibold'
                : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200'
            }`}
          >
            <ShieldCheck size={14} />
            <span>2. Sapaan Pria & Maskulinitas</span>
          </button>
          <button
            onClick={() => setActiveTab('alternatives')}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'alternatives'
                ? 'bg-stone-200 text-stone-950 font-semibold'
                : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200'
            }`}
          >
            <Sparkles size={14} />
            <span>3. Padanan Etis (Anti-Bumerang)</span>
          </button>
        </div>
      </div>

      {/* TAB 1: PRONOUNS */}
      {activeTab === 'pronouns' && (
        <div className="space-y-8">
          {/* Quick Decision Tool */}
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-5 md:p-6 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-semibold uppercase">
              <Sparkles size={15} />
              <span>Asisten Pemilihan Kata Ganti Cepat</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-stone-200 font-medium block mb-1.5">Siapa yang berbicara di naskah ini?</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSpeakerType('institution')}
                    className={`p-3 rounded-lg border text-left cursor-pointer transition ${
                      speakerType === 'institution'
                        ? 'border-amber-500 bg-amber-500/20 text-stone-100 font-semibold'
                        : 'border-stone-800 bg-stone-900 text-stone-400'
                    }`}
                  >
                    🏢 Organisasi Menungsa
                  </button>
                  <button
                    onClick={() => setSpeakerType('person')}
                    className={`p-3 rounded-lg border text-left cursor-pointer transition ${
                      speakerType === 'person'
                        ? 'border-amber-500 bg-amber-500/20 text-stone-100 font-semibold'
                        : 'border-stone-800 bg-stone-900 text-stone-400'
                    }`}
                  >
                    ✍️ Individu Bernama Nyata
                  </button>
                </div>
              </div>

              <div>
                <label className="text-stone-200 font-medium block mb-1.5">Di mana naskah ini akan diterbitkan?</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setPrivacyType('public')}
                    className={`p-3 rounded-lg border text-left cursor-pointer transition ${
                      privacyType === 'public'
                        ? 'border-amber-500 bg-amber-500/20 text-stone-100 font-semibold'
                        : 'border-stone-800 bg-stone-900 text-stone-400'
                    }`}
                  >
                    📢 Ruang Terbuka (Medsos, Web)
                  </button>
                  <button
                    onClick={() => setPrivacyType('private')}
                    className={`p-3 rounded-lg border text-left cursor-pointer transition ${
                      privacyType === 'private'
                        ? 'border-amber-500 bg-amber-500/20 text-stone-100 font-semibold'
                        : 'border-stone-800 bg-stone-900 text-stone-400'
                    }`}
                  >
                    🔒 Ruang Tertutup (WA, DM, Chat)
                  </button>
                </div>
              </div>
            </div>

            {/* Recommendation Result */}
            <div className="rounded-lg bg-stone-900 border border-stone-800 p-4 text-xs space-y-1.5">
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block font-semibold">
                Rekomendasi Kata Ganti yang Disarankan:
              </span>
              <div className="flex flex-wrap items-center gap-3 text-stone-100 font-medium text-sm">
                <span>Orang Pertama: <strong className="text-amber-300 font-serif text-base">{recommendation.firstPerson}</strong></span>
                <span>·</span>
                <span>Orang Kedua: <strong className="text-amber-300 font-serif text-base">{recommendation.pronoun}</strong></span>
              </div>
              <p className="text-stone-300 pt-1 leading-relaxed">{recommendation.note}</p>
            </div>
          </div>

          {/* Pronoun Details Cards */}
          <div className="space-y-4">
            <h3 className="text-sm font-mono text-stone-400 uppercase tracking-wider font-semibold">
              Katalog Lengkap Kata Ganti Bahasa Indonesia:
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {REGISTERS.map((reg) => (
                <button
                  key={reg.id}
                  onClick={() => setSelectedRegisterId(reg.id)}
                  className={`p-3 rounded-xl border text-center transition cursor-pointer ${
                    selectedRegisterId === reg.id
                      ? 'border-amber-500 bg-amber-500/20 text-stone-100 font-semibold ring-1 ring-amber-500/40'
                      : 'border-stone-800 bg-stone-900/50 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                  }`}
                >
                  <div className="font-serif text-lg text-stone-100">{reg.name}</div>
                  <div className="text-[10px] font-mono text-stone-400 mt-0.5">
                    Otoritas {reg.authorityLevel} · Intim {reg.intimacyLevel}
                  </div>
                </button>
              ))}
            </div>

            {/* Active Register Deep Dive */}
            {activeRegister && (
              <div className="rounded-xl border border-stone-800 bg-stone-900/40 p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                  <div>
                    <span className="text-xs font-mono text-amber-400 uppercase font-semibold">Kata Ganti:</span>
                    <h4 className="text-2xl font-serif text-stone-100">{activeRegister.name}</h4>
                  </div>
                  <div className="text-right text-xs font-mono text-stone-400">
                    <div>Tingkat Otoritas: {activeRegister.authorityLevel}/5</div>
                    <div>Tingkat Keintiman: {activeRegister.intimacyLevel}/5</div>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs text-stone-300 leading-relaxed">
                  <div><strong className="text-stone-200">Hubungan Sosial:</strong> {activeRegister.socialRelationship}</div>
                  <div><strong className="text-stone-200">Kesan yang Muncul:</strong> {activeRegister.impression}</div>
                  <div><strong className="text-stone-200">Contoh Kalimat:</strong> <span className="font-serif italic text-amber-300 text-sm">"{activeRegister.example}"</span></div>
                  <div><strong className="text-stone-200">Kanal yang Tepat:</strong> {activeRegister.contexts}</div>
                  <div className="text-rose-300/90 pt-1 border-t border-stone-800/80">
                    <strong className="text-rose-400">Risiko Jika Salah Tempat:</strong> {activeRegister.risks}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: GENDER ADDRESS */}
      {activeTab === 'gender' && (
        <div className="space-y-6">
          <div className="rounded-xl border border-stone-800 bg-stone-900/40 p-6 space-y-5">
            <div>
              <h3 className="text-lg font-serif text-stone-100">Kapan Menggunakan "Pria", "Laki-laki", atau Tanpa Label?</h3>
              <p className="text-xs md:text-sm text-stone-300 leading-relaxed mt-1">
                Penelitian empiris menunjukkan bahwa pria dewasa sering merasa jenuh atau defensif ketika sebuah pesan terus-menerus mendikte identitas gender mereka. Prioritaskan tindakan nyata daripada label maskulinitas.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-5 space-y-2.5 text-xs">
                <div className="text-emerald-400 font-mono font-semibold uppercase flex items-center gap-1.5">
                  <CheckCircle2 size={15} />
                  <span>Langsung ke Tindakan (Paling Aman)</span>
                </div>
                <p className="text-stone-300 leading-relaxed">
                  Tidak perlu menyebut kata "pria" sama sekali jika pesannya tentang rutinitas sehari-hari atau ritme kerja.
                </p>
                <div className="font-serif italic text-emerald-300 pt-2 border-t border-emerald-900/40 leading-snug">
                  "Menghadapi tumpukan pekerjaan setelah akhir pekan memang menguras energi."
                </div>
              </div>

              <div className="rounded-xl border border-amber-500/20 bg-amber-950/20 p-5 space-y-2.5 text-xs">
                <div className="text-amber-400 font-mono font-semibold uppercase flex items-center gap-1.5">
                  <CheckCircle2 size={15} />
                  <span>Sapaan "Pria" Terkalibrasi</span>
                </div>
                <p className="text-stone-300 leading-relaxed">
                  Gunakan ketika konteksnya spesifik berhubungan dengan biologi pria atau peran sosial kebapakan.
                </p>
                <div className="font-serif italic text-amber-300 pt-2 border-t border-amber-900/40 leading-snug">
                  "Pria di atas 30 tahun sering mengalami penurunan ritme tidur alami."
                </div>
              </div>

              <div className="rounded-xl border border-rose-500/20 bg-rose-950/20 p-5 space-y-2.5 text-xs">
                <div className="text-rose-400 font-mono font-semibold uppercase flex items-center gap-1.5">
                  <AlertCircle size={15} />
                  <span>Label "Pria Sejati" (DILARANG)</span>
                </div>
                <p className="text-stone-300 leading-relaxed">
                  Label "Real Men", "Cowok Tangguh", atau "Alfa" langsung dicap sebagai hal yang canggung (cringe) dan manipulatif.
                </p>
                <div className="font-serif italic text-rose-300 pt-2 border-t border-rose-900/40 leading-snug">
                  "✕ Pria sejati adalah pria yang berani menangis dan meminta tolong."
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ETHICAL ALTERNATIVES */}
      {activeTab === 'alternatives' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-base md:text-lg font-serif text-stone-100">
              Kamus Padanan Etis: Mengubah Klise Bumerang Menjadi Bahasa yang Memberdayakan
            </h3>
            <p className="text-xs md:text-sm text-stone-300 mt-1 leading-relaxed">
              Banyak istilah maskulinitas agresif sebenarnya berakar dari kebutuhan psikologis yang nyata (seperti ingin merasa berdaya, dihormati kawan sebaya, atau memiliki arah hidup). Menungsa memenuhi kebutuhan mendasar tersebut tanpa racun kebencian atau moralitas palsu.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {ETHICAL_ALTERNATIVES.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-stone-800 bg-stone-900/40 p-5 md:p-6 space-y-4 hover:border-stone-700 transition"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-semibold text-amber-400 uppercase">
                      Fungsi Psikologis:
                    </span>
                    <span className="text-base font-serif font-medium text-stone-100">
                      {item.functionName}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-stone-300 bg-stone-950/40 p-3 rounded-lg border border-stone-800/60 leading-relaxed">
                  <strong className="text-stone-200">Kebutuhan Dasar:</strong> {item.psychologicalNeed}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Harmful / Cringe */}
                  <div className="rounded-lg border border-rose-500/20 bg-rose-950/15 p-4 space-y-2">
                    <div className="flex items-center gap-1.5 text-rose-400 font-mono font-semibold uppercase text-[11px]">
                      <AlertCircle size={14} />
                      <span>Cara Bumerang / Agresif (Manosphere)</span>
                    </div>
                    <p className="text-stone-300 leading-relaxed">
                      {item.harmfulVersion}
                    </p>
                  </div>

                  {/* Ethical / Menungsa */}
                  <div className="rounded-lg border border-emerald-500/20 bg-emerald-950/15 p-4 space-y-2">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-mono font-semibold uppercase text-[11px]">
                      <CheckCircle2 size={14} />
                      <span>Padanan Etis Suara Menungsa</span>
                    </div>
                    <p className="text-stone-100 leading-relaxed font-medium">
                      {item.ethicalAlternative}
                    </p>
                  </div>
                </div>

                <div className="rounded-lg bg-stone-950/70 p-3.5 border border-stone-800/80 text-xs text-stone-300 flex items-center gap-2">
                  <strong className="text-amber-400 font-mono text-[11px] uppercase shrink-0">Prinsip Emas:</strong>
                  <span className="text-stone-200 italic font-serif text-sm">{item.keyPrinciple}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
