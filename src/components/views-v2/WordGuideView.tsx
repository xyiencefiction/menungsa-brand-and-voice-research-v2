import React, { useState } from 'react';
import { 
  Users, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles,
  Compass,
  Check,
  X,
  HeartHandshake
} from 'lucide-react';
import { RegisterMap } from '../charts/RegisterMap';
import { languageRegisters } from '../../data';

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
    impression: 'Menyapa langsung tanpa kepalsuan akrab yang berlebihan, menghormati otonomi pembaca.',
    risks: 'Dapat terasa mendikte jika dipadukan dengan kata kerja imperatif ("kamu harus", "kamu wajib").',
    contexts: 'Semua kanal publik dan privat: feed media sosial, carousel, esai pengantar, panduan ringkas.',
    example: 'Ketika tubuhmu memberi sinyal lelah yang tak kunjung reda, dengarkan.'
  },
  {
    id: 'Anda',
    name: 'Anda',
    authorityLevel: 5,
    intimacyLevel: 1,
    socialRelationship: 'Formal, menjaga jarak institusional, dan menghormati privasi profesional tinggi.',
    impression: 'Tertib, klinis, dan menghormati batasan hukum serta kerahasiaan medis.',
    risks: 'Terasa kaku, birokratis, dan dingin jika digunakan dalam narasi empati atau obrolan santai.',
    contexts: 'Formulir pendaftaran konseling resmi, syarat & ketentuan, pemberitahuan privasi, rujukan medis.',
    example: 'Jadwal konsultasi Anda telah terkonfirmasi untuk hari Selasa pukul 14.00 WIB.'
  },
  {
    id: 'kita',
    name: 'kita',
    authorityLevel: 2,
    intimacyLevel: 4,
    socialRelationship: 'Inklusif dan merangkul; menempatkan penulis dan pembaca dalam satu perahu pengalaman manusiawi.',
    impression: 'Rasa senasib biologis dan kebersamaan yang menenangkan.',
    risks: 'Terdengar sok tahu atau memaksakan asumsi jika pembaca sedang tidak mengalami beban tersebut.',
    contexts: 'Pembahasan ritme fisiologis tubuh, fenomena sosial bersama, atau refleksi kemanusiaan.',
    example: 'Tubuh kita memang butuh jeda berkala setelah bekerja berhari-hari tanpa henti.'
  },
  {
    id: 'kami',
    name: 'kami',
    authorityLevel: 3,
    intimacyLevel: 2,
    socialRelationship: 'Penutur jamak atas nama institusi resmi Menungsa.',
    impression: 'Jujur bahwa pesan ini datang dari sebuah lembaga, bukan teman khayalan yang berpura-pura nongkrong.',
    risks: 'Dapat terasa berjarak jika dipakai terus-menerus tanpa menyapa pembaca secara personal.',
    contexts: 'Pernyataan kebijakan organisasi, transparansi program, metodologi riset, dan laporan kegiatan.',
    example: 'Kami di Menungsa menyiapkan ruang ini agar kamu bisa beristirahat sejenak tanpa tuntutan.'
  },
  {
    id: 'gue',
    name: 'gue / gua',
    authorityLevel: 1,
    intimacyLevel: 5,
    socialRelationship: 'Solidaritas horizontal antarteman sebaya di ranah privat perkotaan.',
    impression: 'Percakapan riil anak muda yang autentik dan tanpa sekat.',
    risks: 'SANGAT FATAL jika dipakai akun resmi organisasi (terdengar canggung, pura-pura gaul, dan merusak kredibilitas institusi).',
    contexts: 'HANYA berhak digunakan oleh staf atau kreator yang menulis atas nama pribadi dan berwajah nyata.',
    example: 'Waktu usaha bengkel gue tutup dua tahun lalu, rasanya bangun tidur aja berat banget.'
  },
  {
    id: 'lo',
    name: 'lo / lu',
    authorityLevel: 1,
    intimacyLevel: 5,
    socialRelationship: 'Sapaan orang kedua akrab antarteman tongkrongan sebaya.',
    impression: 'Santai, tanpa basa-basi formal.',
    risks: 'Jika akun anonim organisasi menyapa pembaca dengan "lo/bro", pembaca merasa privasinya diterobos tanpa lisensi kedekatan.',
    contexts: 'Konten video kreator personal bernama jelas, dialog naskah teater/cerita fiksi.',
    example: 'Kalau hari ini lo belum sanggup cerita, nggak apa-apa, duduk aja dulu.'
  },
  {
    id: 'aku',
    name: 'aku',
    authorityLevel: 2,
    intimacyLevel: 4,
    socialRelationship: 'Intim, reflektif, kontemplatif batin, dan kejujuran personal.',
    impression: 'Ruang renungan puitis atau esai pengalaman hidup yang tenang.',
    risks: 'Bisa terdengar terlalu melankolis atau romantis jika dipakai dalam instruksi navigasi layanan.',
    contexts: 'Esai refleksi diri orang pertama, monolog video dokumenter, kisah pemulihan personal.',
    example: 'Bulan ketiga setelah toko tutup, aku masih sering bangun jam lima pagi menyeduh kopi di teras.'
  },
  {
    id: 'saya',
    name: 'saya',
    authorityLevel: 4,
    intimacyLevel: 1,
    socialRelationship: 'Penutur tunggal formal dengan martabat klinis dan kesantunan universal.',
    impression: 'Objektif, tenang, berwibawa, dan dapat diandalkan.',
    risks: 'Kurang intim jika digunakan dalam obrolan lingkaran kecil antarteman sebaya.',
    contexts: 'Wawancara resmi, penjelasan dokter/psikolog berlisensi, esai editorial pakar.',
    example: 'Dalam praktik klinis saya, kelelahan mental sering kali diawali dari penolakan terhadap batas fisik.'
  },
  {
    id: 'laki-laki',
    name: 'laki-laki',
    authorityLevel: 3,
    intimacyLevel: 3,
    socialRelationship: 'Penanda identitas gender deskriptif dan sosiologis.',
    impression: 'Netral, ilmiah, dan membumi tanpa muatan gengsi.',
    risks: 'Menimbulkan kejenuhan identitas (gender fatigue) bila diulang di setiap kalimat.',
    contexts: 'Analisis sosiokultural, statistik beban peran keluarga, dan dialog kesehatan umum.',
    example: 'Banyak laki-laki dewasa memikul tanggung jawab ekonomi tanpa memiliki saluran pelepasan emosi yang aman.'
  },
  {
    id: 'pria',
    name: 'pria',
    authorityLevel: 4,
    intimacyLevel: 2,
    socialRelationship: 'Penanda demografis formal dan kehormatan dewasa.',
    impression: 'Tertib, berwibawa, dan sedikit berjarak aspirasional.',
    risks: 'Rentan disalahgunakan jika digabung dengan klise manosphere ("Pria Sejati", "Pria Bernilai Tinggi").',
    contexts: 'Konteks biologis spesifik (kardiovaskular, hormon) atau peran tanggung jawab ayah.',
    example: 'Pria di atas usia 35 tahun disarankan memeriksa tekanan darah secara berkala.'
  },
  {
    id: 'cowok',
    name: 'cowok',
    authorityLevel: 1,
    intimacyLevel: 4,
    socialRelationship: 'Sebutan kasual santai bernuansa muda dan tongkrongan.',
    impression: 'Ringan, santai, dan tidak kaku.',
    risks: 'Dapat terdengar meremehkan (infantilizing) pria dewasa usia 40-an jika dipakai di layanan formal.',
    contexts: 'Humor situasional di balik layar, konten visual olahraga santai, ruang pemuda.',
    example: 'Cowok kalau sudah ngumpul ngoprek motor tua biasanya lupa waktu sampai sore.'
  },
  {
    id: 'bro',
    name: 'bro / bang / mas / pak',
    authorityLevel: 2,
    intimacyLevel: 4,
    socialRelationship: 'Penanda keakraban sebaya yang dikalibrasi: Bro (modern sebaya), Bang/Mas (hormat sebaya), Pak (otoritas/sesepuh).',
    impression: 'Sapaan hangat yang menjembatani jarak tanpa formalitas berlebihan.',
    risks: 'SANGAT FATAL jika dipakai akun anonim institusi (misalnya bot otomatis menyapa "Halo Bro!") — memicu rasa malu akut dan ejekan publik.',
    contexts: 'Fasilitator individu dalam sesi komunitas tatap muka, balasan komentar personal, dan percakapan langsung antarsebaya.',
    example: 'Bang, kalau ada waktu luang besok sore, kita ngobrol santai di warung belakang kantor ya.'
  }
];

interface EthicalAlternativeItem {
  id: string;
  mechanismId: string;
  functionName: string;
  shortLabel: string;
  psychologicalNeed: string;
  whyCompelling: string;
  harmfulVersion: string;
  ethicalAlternative: string;
  keyPrinciple: string;
}

const ETHICAL_ALTERNATIVES: EthicalAlternativeItem[] = [
  {
    id: 'certainty',
    mechanismId: 'M03',
    shortLabel: 'Kepastian',
    functionName: 'Kepastian & Kejelasan Arah Hidup',
    psychologicalNeed: 'Kebutuhan akan kejelasan struktur hidup, penataan kognitif, dan panduan logis saat menghadapi kerumitan karier, relasi, serta status sosial.',
    whyCompelling: 'Meredakan disorientasi dan kebingungan akut; mengubah situasi sosial yang rumit menjadi aturan main yang tampak teratur dan sistematis.',
    harmfulVersion: 'Doktrin mutlak Red Pill, teori evolusi pseudo-biologis deterministik, generalisasi kebencian pada wanita (hipergami), dan fatalisme blackpill.',
    ethicalAlternative: 'Menyediakan peta psikologi dan dinamika sosial yang realistis dengan kejujuran terukur (calibrated uncertainty). Menyebutkan kesulitan nyata tanpa menciptakan musuh khayalan.',
    keyPrinciple: 'Struktur penjelasan yang realistis dan terkalibrasi, bukan aturan mutlak palsu.'
  },
  {
    id: 'validation',
    mechanismId: 'M05',
    shortLabel: 'Pengakuan Beban',
    functionName: 'Pengakuan Beban & Rasa Didengar',
    psychologicalNeed: 'Kebutuhan untuk merasa dipahami, didengar, dan terbebas dari rasa malu saat belum mampu memenuhi ekspektasi sosial atau standar maskulinitas.',
    whyCompelling: 'Meringankan beban rasa gagal pribadi dengan menegaskan bahwa "bukan cuma kamu yang kesulitan; sistem dan realitas hidup saat ini memang berat."',
    harmfulVersion: 'Memanfaatkan luka batin menjadi kebencian kolektif (grievance amplification), menyalahkan wanita, menyalahkan keluarga, atau mendendam pada gerakan kesetaraan.',
    ethicalAlternative: 'Memvalidasi beratnya beban peran pria modern, ketidakpastian ekonomi, dan kesepian batin TANPA menyediakan kambing hitam atau musuh khayalan.',
    keyPrinciple: 'Validasi rasa lelah dan kesulitan hidupnya, jangan pernah memvalidasi kebenciannya.'
  },
  {
    id: 'status',
    mechanismId: 'M08',
    shortLabel: 'Keahlian & Martabat',
    functionName: 'Keahlian Nyata, Martabat & Harga Diri',
    psychologicalNeed: 'Kebutuhan akan rasa berharga (self-worth), rasa hormat sosial antarteman sebaya, kecakapan (competence), dan memiliki dampak nyata yang dirasakan.',
    whyCompelling: 'Menggantikan rasa rendah diri dengan hierarki pencapaian fisik, finansial yang terukur, dan rasa bangga sebagai pria dewasa.',
    harmfulVersion: 'Konsep dominasi agresif "Pria Nilai Tinggi (High-Value Man)", merendahkan pria lain yang berpenghasilan rendah, serta obsesi fisik superfisial (looksmaxxing).',
    ethicalAlternative: 'Menambatkan martabat pada kecakapan hidup dewasa, pertumbuhan diri mandiri, keterampilan karya nyata, serta tanggung jawab etis pada keluarga dan komunitas.',
    keyPrinciple: 'Membangun keahlian dan rasa bernilai tanpa perlu membanding-bandingkan kasta sosial.'
  },
  {
    id: 'agency',
    mechanismId: 'M02',
    shortLabel: 'Kedaulatan Diri',
    functionName: 'Kedaulatan Diri & Kemampuan Bertindak',
    psychologicalNeed: 'Kebutuhan untuk keluar dari rasa tak berdaya (helplessness) dan memegang kendali atas jalan hidup melalui tindakan nyata yang berbatas tegas.',
    whyCompelling: 'Tindakan nyata memulihkan motivasi, dopamin, dan kedaulatan diri (agency); menolak mentalitas korban yang pasif atau keputusasaan klinis.',
    harmfulVersion: 'Disiplin brutal (toxic grindset), individualisme ekstrem, mengabaikan keterbatasan ekonomi riil, dan menuduh pria yang lelah/depresi sebagai orang "kurang disiplin".',
    ethicalAlternative: 'Menawarkan langkah-langkah awal yang konkret, ringan, dan berambang rendah (low-threshold), sambil tetap berempati secara jujur pada keterbatasan ekonomi nyata.',
    keyPrinciple: 'Kemandirian bertindak (agency) yang dipadukan dengan empati pada realitas hidup.'
  },
  {
    id: 'belonging',
    mechanismId: 'M04',
    shortLabel: 'Rasa Memiliki',
    functionName: 'Rasa Memiliki & Persaudaraan Sejati',
    psychologicalNeed: 'Kebutuhan akan lingkungan persaudaraan pria (camaraderie) yang aman, di mana ia diterima apa adanya tanpa kecemasan performa atau tuntutan topeng.',
    whyCompelling: 'Menyediakan tempat berlindung dari kesepian sosial akut yang dialami banyak pria dewasa melalui humor, bahasa santai, dan solidaritas senasib.',
    harmfulVersion: 'Kelompok berbasis permusuhan bersama (us vs them), ruang gema yang menguji kemaskulinan dengan menolak kelembutan, serta radikalisasi anggota rentan.',
    ethicalAlternative: 'Membangun wadah pria yang berakar pada aktivitas bersama (olahraga rekreasional, hobi karya, saling bantu berdampingan), di mana kebersamaan tumbuh secara wajar.',
    keyPrinciple: 'Persaudaraan yang tumbuh melalui aktivitas nyata bersama, bukan melalui kebencian bersama.'
  },
  {
    id: 'purpose',
    mechanismId: 'M09',
    shortLabel: 'Makna Hidup',
    functionName: 'Makna Hidup & Tanggung Jawab Luhur',
    psychologicalNeed: 'Kebutuhan eksistensial untuk memiliki tujuan hidup yang lebih besar dari diri sendiri, melindungi orang terkasih, dan menjadi sosok yang berguna bagi sesama.',
    whyCompelling: 'Menjawab kehampaan eksistensial dengan panggilan ksatria untuk memikul tanggung jawab dan merawat orang-orang yang disayangi.',
    harmfulVersion: 'Glorifikasi kekerasan fisik, retorika perang suci, fantasi dominasi agresif, dan sindrom pahlawan yang angkuh serta manipulatif.',
    ethicalAlternative: 'Menghidupkan kembali kebajikan pria melalui kesabaran mengayomi, ketenangan menghadapi krisis, dan kontribusi nyata yang merawat keluarga serta lingkungan.',
    keyPrinciple: 'Kepahlawanan dalam kesabaran merawat, bukan dalam agresi menaklukkan.'
  }
];

export const WordGuideView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pronouns' | 'gender' | 'alternatives'>('pronouns');
  const [selectedRegisterId, setSelectedRegisterId] = useState<string>('kamu');
  const [selectedFunctionId, setSelectedFunctionId] = useState<string>('all');

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
      <div className="space-y-3">
        <div className="kicker flex items-center gap-1.5 text-amber-500 font-mono text-xs font-bold uppercase tracking-wider">
          <Sparkles size={13} className="text-amber-500" />
          <span>KAMUS &amp; PILIHAN KATA</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-stone-100 leading-tight">
          Panduan Pilihan Kata, Sapaan &amp; Kata Ganti
        </h1>
        <p className="text-sm md:text-base text-stone-400 max-w-[74ch] leading-relaxed font-sans">
          Pilihan kata ganti dan sapaan pria menentukan apakah pembaca merasa dihormati atau justru merasa dihakimi. Gunakan panduan praktis ini untuk memastikan pilihan kata naskah Anda selalu tepat sasaran.
        </p>

        {/* Tab Switcher */}
        <div role="tablist" aria-label="Navigasi Panduan Kata" className="flex flex-wrap gap-2 pt-2">
          <button
            role="tab"
            id="tab-pronouns"
            aria-selected={activeTab === 'pronouns'}
            aria-controls="panel-pronouns"
            onClick={() => setActiveTab('pronouns')}
            className={`px-4 py-2 rounded-[6px] text-xs font-sans transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'pronouns'
                ? 'bg-emerald-700 text-bone font-semibold shadow-raised border border-emerald-600 dark:bg-emerald-800'
                : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-100 hover:bg-stone-850'
            }`}
          >
            <Users size={14} />
            <span>1. Kata Ganti (Kamu, Anda, Kita, Gue)</span>
          </button>
          <button
            role="tab"
            id="tab-gender"
            aria-selected={activeTab === 'gender'}
            aria-controls="panel-gender"
            onClick={() => setActiveTab('gender')}
            className={`px-4 py-2 rounded-[6px] text-xs font-sans transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'gender'
                ? 'bg-emerald-700 text-bone font-semibold shadow-raised border border-emerald-600 dark:bg-emerald-800'
                : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-100 hover:bg-stone-850'
            }`}
          >
            <ShieldCheck size={14} />
            <span>2. Sapaan Pria &amp; Maskulinitas</span>
          </button>
          <button
            role="tab"
            id="tab-alternatives"
            aria-selected={activeTab === 'alternatives'}
            aria-controls="panel-alternatives"
            onClick={() => setActiveTab('alternatives')}
            className={`px-4 py-2 rounded-[6px] text-xs font-sans transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'alternatives'
                ? 'bg-emerald-700 text-bone font-semibold shadow-raised border border-emerald-600 dark:bg-emerald-800'
                : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-100 hover:bg-stone-850'
            }`}
          >
            <Sparkles size={14} />
            <span>3. Padanan Etis (Anti-Bumerang)</span>
          </button>
        </div>
      </div>

      {/* TAB 1: PRONOUNS */}
      {activeTab === 'pronouns' && (
        <div role="tabpanel" id="panel-pronouns" aria-labelledby="tab-pronouns" className="space-y-8">
          {/* Quick Decision Tool — Programs & Care (Green Wash Panel) */}
          <div className="rounded-xl border border-emerald-900/40 bg-emerald-950/60 p-5 md:p-6 space-y-5 shadow-xs">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles size={15} />
              <span>Asisten Pemilihan Kata Ganti Cepat</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              {/* Question 1 */}
              <div role="radiogroup" aria-labelledby="speaker-type-label" className="space-y-2.5 md:pr-5 md:border-r md:border-emerald-900/40">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-700 text-bone font-mono text-[10px] font-bold flex items-center justify-center shrink-0">1</span>
                  <label id="speaker-type-label" className="text-stone-100 font-bold block text-xs">
                    Siapa yang berbicara di naskah ini?
                  </label>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    role="radio"
                    aria-checked={speakerType === 'institution'}
                    onClick={() => setSpeakerType('institution')}
                    className={`p-3 rounded-lg border text-left cursor-pointer transition ${
                      speakerType === 'institution'
                        ? 'border-emerald-700 bg-emerald-700 text-bone font-semibold shadow-xs dark:bg-emerald-800 dark:border-emerald-600'
                        : 'border-stone-800 bg-stone-900 text-stone-300 hover:bg-stone-850 hover:text-stone-100 font-medium'
                    }`}
                  >
                    🏢 Organisasi Menungsa
                  </button>
                  <button
                    role="radio"
                    aria-checked={speakerType === 'person'}
                    onClick={() => setSpeakerType('person')}
                    className={`p-3 rounded-lg border text-left cursor-pointer transition ${
                      speakerType === 'person'
                        ? 'border-emerald-700 bg-emerald-700 text-bone font-semibold shadow-xs dark:bg-emerald-800 dark:border-emerald-600'
                        : 'border-stone-800 bg-stone-900 text-stone-300 hover:bg-stone-850 hover:text-stone-100 font-medium'
                    }`}
                  >
                    ✍️ Individu Bernama Nyata
                  </button>
                </div>
              </div>

              {/* Question 2 */}
              <div role="radiogroup" aria-labelledby="privacy-type-label" className="space-y-2.5 md:pl-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-700 text-bone font-mono text-[10px] font-bold flex items-center justify-center shrink-0">2</span>
                  <label id="privacy-type-label" className="text-stone-100 font-bold block text-xs">
                    Di mana naskah ini akan diterbitkan?
                  </label>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    role="radio"
                    aria-checked={privacyType === 'public'}
                    onClick={() => setPrivacyType('public')}
                    className={`p-3 rounded-lg border text-left cursor-pointer transition ${
                      privacyType === 'public'
                        ? 'border-emerald-700 bg-emerald-700 text-bone font-semibold shadow-xs dark:bg-emerald-800 dark:border-emerald-600'
                        : 'border-stone-800 bg-stone-900 text-stone-300 hover:bg-stone-850 hover:text-stone-100 font-medium'
                    }`}
                  >
                    📢 Ruang Terbuka (Medsos, Web)
                  </button>
                  <button
                    role="radio"
                    aria-checked={privacyType === 'private'}
                    onClick={() => setPrivacyType('private')}
                    className={`p-3 rounded-lg border text-left cursor-pointer transition ${
                      privacyType === 'private'
                        ? 'border-emerald-700 bg-emerald-700 text-bone font-semibold shadow-xs dark:bg-emerald-800 dark:border-emerald-600'
                        : 'border-stone-800 bg-stone-900 text-stone-300 hover:bg-stone-850 hover:text-stone-100 font-medium'
                    }`}
                  >
                    🔒 Ruang Tertutup (WA, DM, Chat)
                  </button>
                </div>
              </div>
            </div>

            {/* Recommendation Result */}
            <div className="rounded-lg bg-stone-900 border border-stone-800 p-4 text-xs space-y-1.5 shadow-raised">
              <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block font-bold">
                Rekomendasi Kata Ganti yang Disarankan:
              </span>
              <div className="flex flex-wrap items-center gap-3 text-stone-100 font-medium text-sm">
                <span>Orang Pertama: <strong className="text-emerald-700 dark:text-emerald-300 font-serif text-base font-bold">{recommendation.firstPerson}</strong></span>
                <span className="text-stone-600">·</span>
                <span>Orang Kedua: <strong className="text-emerald-700 dark:text-emerald-300 font-serif text-base font-bold">{recommendation.pronoun}</strong></span>
              </div>
              <p className="text-stone-400 pt-1 leading-relaxed text-xs">{recommendation.note}</p>
            </div>
          </div>

          {/* Interactive 2D Register Map & Active Register Deep Dive (2-Column Desktop Grid) */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <div>
                <h3 className="text-sm font-mono text-amber-500 uppercase tracking-wider font-semibold flex items-center gap-2">
                  <Compass size={15} />
                  <span>Peta Koordinat Relasional Ragam Kata Ganti</span>
                </h3>
                <p className="text-xs text-stone-400 mt-1 leading-relaxed max-w-2xl font-sans">
                  Pilihan kata ganti menentukan batas jarak sosial antara organisasi dan pembaca pria. Peta di bawah memperlihatkan mengapa Menungsa memilih <strong className="text-amber-500 font-semibold">"kamu"</strong> di titik seimbang (3/5, 3/5)—cukup hangat untuk peduli, namun cukup tertib untuk menghormati privasi.
                </p>
              </div>
              <span className="text-[11px] font-mono text-stone-500 shrink-0">
                Klik titik grafik untuk memilih
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              <div className="lg:col-span-7">
                <RegisterMap
                  registers={languageRegisters}
                  selectedId={selectedRegisterId}
                  onSelect={(id) => setSelectedRegisterId(id)}
                />
              </div>

              {/* Active Register Deep Dive (Right Column) */}
              <div className="lg:col-span-5">
                {activeRegister && (
                  <div
                    role="tabpanel"
                    id="panel-register-detail"
                    aria-labelledby={`tab-register-${activeRegister.id}`}
                    className="rounded-xl border border-stone-800 bg-stone-900 p-4 sm:p-5 space-y-3.5 shadow-raised"
                  >
                    <div className="flex items-center justify-between border-b border-stone-800 pb-2.5">
                      <div>
                        <span className="text-[10px] font-mono text-amber-500 uppercase font-bold tracking-wider">Profil Kata Ganti:</span>
                        <h4 className="text-xl font-serif font-bold text-stone-100">{activeRegister.name}</h4>
                      </div>
                      <div className="text-right text-[11px] font-mono text-stone-400">
                        <div>Otoritas: <strong className="text-amber-500 font-bold">{activeRegister.authorityLevel}/5</strong></div>
                        <div>Keintiman: <strong className="text-amber-500 font-bold">{activeRegister.intimacyLevel}/5</strong></div>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs text-stone-300 leading-relaxed font-sans">
                      <div><strong className="text-stone-100 font-semibold">Hubungan:</strong> {activeRegister.socialRelationship}</div>
                      <div><strong className="text-stone-100 font-semibold">Kesan:</strong> {activeRegister.impression}</div>
                      <div className="pt-1.5 border-t border-stone-800">
                        <strong className="text-stone-100 block mb-0.5 font-semibold">Contoh Kalimat:</strong>
                        <span className="font-serif italic text-emerald-700 dark:text-emerald-300 text-sm leading-snug font-medium">"{activeRegister.example}"</span>
                      </div>
                      <div><strong className="text-stone-100 font-semibold">Kanal Tepat:</strong> {activeRegister.contexts}</div>
                      <div className="text-rose-700 dark:text-rose-300 pt-1.5 border-t border-stone-800">
                        <strong className="text-rose-800 dark:text-rose-400 font-bold">Risiko:</strong> {activeRegister.risks}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Catalog Filter Pills */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-mono text-stone-400 uppercase tracking-wider font-semibold">
                Katalog Lengkap Kata Ganti:
              </h4>
              <div role="tablist" aria-label="Katalog Kata Ganti" className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {REGISTERS.map((reg) => (
                  <button
                    key={reg.id}
                    role="tab"
                    id={`tab-register-${reg.id}`}
                    aria-selected={selectedRegisterId === reg.id}
                    aria-controls="panel-register-detail"
                    onClick={() => setSelectedRegisterId(reg.id)}
                    className={`px-3 py-2 rounded-lg border text-center transition cursor-pointer flex flex-col items-center justify-center ${
                      selectedRegisterId === reg.id
                        ? 'border-emerald-700 bg-emerald-700 text-bone font-semibold shadow-raised dark:border-emerald-600 dark:bg-emerald-800'
                        : 'border-stone-800 bg-stone-900 text-stone-300 hover:border-emerald-700/60 hover:bg-stone-850'
                    }`}
                  >
                    <div className={`font-serif text-sm ${selectedRegisterId === reg.id ? 'text-bone font-bold' : 'text-stone-100 font-medium'}`}>{reg.name}</div>
                    <div className={`text-[9.5px] font-mono ${selectedRegisterId === reg.id ? 'text-emerald-200' : 'text-stone-500'}`}>
                      {reg.authorityLevel}/5 · {reg.intimacyLevel}/5
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: GENDER ADDRESS */}
      {activeTab === 'gender' && (
        <div role="tabpanel" id="panel-gender" aria-labelledby="tab-gender" className="space-y-6">
          <div className="rounded-xl border border-stone-800 bg-stone-900 p-6 space-y-5 shadow-raised">
            <div>
              <h3 className="text-lg font-serif font-bold text-stone-100">Kapan Menggunakan "Pria", "Laki-laki", atau Tanpa Label?</h3>
              <p className="text-xs md:text-sm text-stone-400 leading-relaxed mt-1">
                Penelitian empiris menunjukkan bahwa pria dewasa sering merasa jenuh atau defensif ketika sebuah pesan terus-menerus mendikte identitas gender mereka. Prioritaskan tindakan nyata daripada label maskulinitas.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="rounded-xl border border-emerald-900/40 bg-emerald-950/60 p-5 space-y-2.5 text-xs shadow-xs">
                <div className="text-emerald-700 dark:text-emerald-400 font-mono font-bold uppercase flex items-center gap-1.5">
                  <CheckCircle2 size={15} />
                  <span>Langsung ke Tindakan (Paling Aman)</span>
                </div>
                <p className="text-stone-300 leading-relaxed">
                  Tidak perlu menyebut kata "pria" sama sekali jika pesannya tentang rutinitas sehari-hari atau ritme kerja.
                </p>
                <div className="font-serif italic text-emerald-700 dark:text-emerald-300 pt-2 border-t border-emerald-900/40 leading-snug font-medium">
                  "Menghadapi tumpukan pekerjaan setelah akhir pekan memang menguras energi."
                </div>
              </div>

              <div className="rounded-xl border border-amber-900/40 bg-amber-950/60 p-5 space-y-2.5 text-xs shadow-xs">
                <div className="text-amber-700 dark:text-amber-400 font-mono font-bold uppercase flex items-center gap-1.5">
                  <CheckCircle2 size={15} />
                  <span>Sapaan "Pria" Terkalibrasi</span>
                </div>
                <p className="text-stone-300 leading-relaxed">
                  Gunakan ketika konteksnya spesifik berhubungan dengan biologi pria atau peran sosial kebapakan.
                </p>
                <div className="font-serif italic text-amber-700 dark:text-amber-300 pt-2 border-t border-amber-900/40 leading-snug font-medium">
                  "Pria di atas 30 tahun sering mengalami penurunan ritme tidur alami."
                </div>
              </div>

              <div className="rounded-xl border border-rose-900/40 bg-rose-950/60 p-5 space-y-2.5 text-xs shadow-xs">
                <div className="text-rose-700 dark:text-rose-400 font-mono font-bold uppercase flex items-center gap-1.5">
                  <AlertCircle size={15} />
                  <span>Label "Pria Sejati" (DILARANG)</span>
                </div>
                <p className="text-stone-300 leading-relaxed">
                  Label "Real Men", "Cowok Tangguh", atau "Alfa" langsung dicap sebagai hal yang canggung (cringe) dan manipulatif.
                </p>
                <div className="font-serif italic text-rose-800 dark:text-rose-300 pt-2 border-t border-rose-900/40 leading-snug font-medium">
                  "✕ Pria sejati adalah pria yang berani menangis dan meminta tolong."
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ETHICAL ALTERNATIVES (DECONSTRUCTING MANOSPHERE APPEALS INTO ETHICAL ALTERNATIVES) */}
      {activeTab === 'alternatives' && (
        <div role="tabpanel" id="panel-alternatives" aria-labelledby="tab-alternatives" className="space-y-6">
          {/* Header */}
          <div>
            <h3 className="text-xl md:text-2xl font-serif font-bold text-stone-100">
              Kamus Padanan Etis: Dari Daya Tarik Manosphere ke Bahasa yang Memberdayakan
            </h3>
            <p className="text-xs md:text-sm text-stone-400 mt-1 max-w-3xl leading-relaxed">
              Memisahkan kebutuhan psikologis manusiawi yang sah di balik konten maskulinitas dari eksploitasi ideologis yang toksik dan agresif. Menungsa memenuhi fungsi aslinya melalui komunikasi yang membumi, beradab, dan memulihkan martabat.
            </p>
          </div>

          {/* Function Selector Filter Pills (from v1) */}
          <div className="space-y-2">
            <span className="font-mono text-xs text-stone-400 uppercase tracking-wider block font-semibold">
              Pilih Kebutuhan / Nilai Pokok untuk Didekonstruksi:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedFunctionId('all')}
                className={`px-3 py-2 rounded-lg border text-xs font-sans transition cursor-pointer flex items-center gap-1.5 ${
                  selectedFunctionId === 'all'
                    ? 'bg-emerald-700 text-bone font-semibold border-emerald-600 shadow-raised dark:bg-emerald-800'
                    : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-100 hover:bg-stone-850'
                }`}
              >
                <span>Semua Kebutuhan ({ETHICAL_ALTERNATIVES.length})</span>
              </button>
              {ETHICAL_ALTERNATIVES.map((alt) => {
                const isSelected = selectedFunctionId === alt.id;
                return (
                  <button
                    key={alt.id}
                    onClick={() => setSelectedFunctionId(alt.id)}
                    className={`px-3 py-2 rounded-lg border text-left text-xs font-sans transition cursor-pointer flex items-center gap-2 ${
                      isSelected
                        ? 'bg-emerald-700 text-bone font-semibold border-emerald-600 shadow-raised dark:bg-emerald-800'
                        : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-100 hover:bg-stone-850'
                    }`}
                  >
                    <span className="font-medium whitespace-nowrap">{alt.shortLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cards with HIGHLIGHTED NEED (The Spine) */}
          <div className="grid grid-cols-1 gap-6">
            {(selectedFunctionId === 'all'
              ? ETHICAL_ALTERNATIVES
              : ETHICAL_ALTERNATIVES.filter((a) => a.id === selectedFunctionId)
            ).map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-stone-800 bg-stone-900 p-5 md:p-6 space-y-5 shadow-raised transition"
              >
                {/* Card Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-3">
                  <div>
                    <span className="font-mono text-[10.5px] text-amber-500 uppercase font-bold tracking-wider block mb-0.5">
                      Dekonstruksi Nilai &amp; Fungsi Psikologis:
                    </span>
                    <h4 className="text-xl font-serif font-bold text-stone-100">
                      {item.functionName}
                    </h4>
                  </div>
                </div>

                {/* 1 & 2: THE HIGHLIGHTED LEGITIMATE NEED (SPINE) */}
                <div className="rounded-xl border border-sky-800/60 bg-sky-950/60 p-4 sm:p-5 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-sky-800 text-bone font-mono text-[10.5px] font-bold uppercase tracking-wider">
                      <HeartHandshake size={13} />
                      <span>1. Kebutuhan Dasar Manusiawi (Sah &amp; Riil)</span>
                    </span>
                    <span className="text-[10px] font-mono text-stone-400">
                      Legitimate Human Need
                    </span>
                  </div>
                  <p className="text-stone-100 font-medium text-sm md:text-[15px] leading-relaxed font-sans">
                    {item.psychologicalNeed}
                  </p>
                  
                  {/* Psychological Appeal */}
                  <div className="pt-2.5 border-t border-sky-800/40 flex items-start gap-2 text-xs">
                    <span className="font-mono font-bold text-amber-500 uppercase text-[10.5px] shrink-0 mt-0.5">
                      2. Daya Tarik:
                    </span>
                    <span className="text-stone-300 leading-relaxed font-medium">
                      {item.whyCompelling}
                    </span>
                  </div>
                </div>

                {/* 3 & 4: THE TWO IMPLEMENTATIONS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                  {/* 3. Harmful Version */}
                  <div className="rounded-xl border border-rose-900/40 bg-rose-950/40 p-4 space-y-2">
                    <div className="flex items-center gap-1.5 text-rose-700 dark:text-rose-400 font-bold">
                      <X size={16} className="shrink-0 stroke-[2.5]" />
                      <span className="font-mono uppercase text-[10.5px] font-bold tracking-wider">
                        3. Cara Bumerang (Manosphere)
                      </span>
                    </div>
                    <p className="text-stone-100 font-medium leading-relaxed font-sans">
                      {item.harmfulVersion}
                    </p>
                  </div>

                  {/* 4. Ethical Alternative */}
                  <div className="rounded-xl border border-emerald-900/40 bg-emerald-950/40 p-4 space-y-2">
                    <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold">
                      <Check size={16} className="shrink-0 stroke-[2.5]" />
                      <span className="font-mono uppercase text-[10.5px] font-bold tracking-wider">
                        4. Padanan Etis Suara Menungsa
                      </span>
                    </div>
                    <p className="text-stone-100 font-medium leading-relaxed font-sans">
                      {item.ethicalAlternative}
                    </p>
                  </div>
                </div>

                {/* Governing Rule / Prinsip Emas */}
                <div className="rounded-xl bg-stone-850 p-3.5 border border-stone-800 text-xs flex items-center justify-between gap-3 shadow-xs">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-amber-500 font-bold uppercase text-[11px] shrink-0">
                      Prinsip Emas:
                    </span>
                    <span className="text-stone-100 font-serif italic text-sm font-medium">
                      "{item.keyPrinciple}"
                    </span>
                  </div>
                  <ShieldCheck size={18} className="text-amber-500 shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
