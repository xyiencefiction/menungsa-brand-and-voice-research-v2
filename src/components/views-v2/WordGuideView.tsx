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
    socialRelationship: 'Langsung dan cukup akrab. Sapaan utama yang dipilih Menungsa untuk panduan ini.',
    impression: 'Menyapa pembaca secara langsung. Kehangatannya bergantung pada kalimat dan konteks.',
    risks: 'Dapat terasa mendikte jika dipadukan dengan kata kerja imperatif ("kamu harus", "kamu wajib").',
    contexts: 'Panduan dan konten umum Menungsa; sesuaikan untuk layanan formal atau audiens tertentu.',
    example: 'Ketika tubuhmu memberi sinyal lelah yang tak kunjung reda, dengarkan.'
  },
  {
    id: 'Anda',
    name: 'Anda',
    authorityLevel: 5,
    intimacyLevel: 1,
    socialRelationship: 'Formal dan menjaga jarak yang sopan.',
    impression: 'Cocok untuk konteks yang memerlukan sapaan formal. Kata ganti ini tidak menjamin kerahasiaan layanan.',
    risks: 'Terasa kaku, birokratis, dan dingin jika digunakan dalam narasi empati atau obrolan santai.',
    contexts: 'Formulir pendaftaran konseling resmi, syarat & ketentuan, pemberitahuan privasi, rujukan medis.',
    example: 'Jadwal konsultasi Anda telah terkonfirmasi untuk hari Selasa pukul 14.00 WIB.'
  },
  {
    id: 'kita',
    name: 'kita',
    authorityLevel: 2,
    intimacyLevel: 4,
    socialRelationship: 'Melibatkan penulis dan pembaca dalam hal yang memang dialami atau dilakukan bersama.',
    impression: 'Menunjukkan kebersamaan tanpa mengasumsikan pengalaman semua orang sama.',
    risks: 'Terdengar sok tahu atau memaksakan asumsi jika pembaca sedang tidak mengalami beban tersebut.',
    contexts: 'Kegiatan bersama atau refleksi yang benar-benar melibatkan penulis dan pembaca.',
    example: 'Tubuh kita memang butuh jeda berkala setelah bekerja berhari-hari tanpa henti.'
  },
  {
    id: 'kami',
    name: 'kami',
    authorityLevel: 3,
    intimacyLevel: 2,
    socialRelationship: 'Mewakili tim atau organisasi, tanpa memasukkan pembaca.',
    impression: 'Memperjelas bahwa Menungsa yang menyampaikan pesan.',
    risks: 'Dapat terasa berjarak jika dipakai terus-menerus tanpa menyapa pembaca secara personal.',
    contexts: 'Pernyataan kebijakan organisasi, transparansi program, metodologi riset, dan laporan kegiatan.',
    example: 'Kami di Menungsa menyiapkan ruang ini agar kamu bisa beristirahat sejenak tanpa tuntutan.'
  },
  {
    id: 'gue',
    name: 'gue / gua',
    authorityLevel: 1,
    intimacyLevel: 5,
    socialRelationship: 'Bahasa percakapan yang lazim dalam sebagian lingkungan, terutama yang akrab dengan ragam Jakarta.',
    impression: 'Dapat terasa akrab jika memang digunakan penutur sehari-hari.',
    risks: 'Dapat terasa dipaksakan ketika tidak sesuai dengan kebiasaan penutur atau pembaca. Bukan pilihan utama akun organisasi Menungsa.',
    contexts: 'Cerita pribadi atau percakapan oleh penutur yang memang terbiasa menggunakannya, termasuk konten publik.',
    example: 'Waktu usaha bengkel gue tutup dua tahun lalu, rasanya bangun tidur aja berat banget.'
  },
  {
    id: 'lo',
    name: 'lo / lu',
    authorityLevel: 1,
    intimacyLevel: 5,
    socialRelationship: 'Sapaan orang kedua akrab antarteman tongkrongan sebaya.',
    impression: 'Santai, tanpa basa-basi formal.',
    risks: 'Dapat terasa terlalu akrab bagi pembaca yang tidak biasa disapa demikian.',
    contexts: 'Konten video kreator personal bernama jelas, dialog naskah teater/cerita fiksi.',
    example: 'Kalau hari ini lo belum sanggup cerita, nggak apa-apa, duduk aja dulu.'
  },
  {
    id: 'aku',
    name: 'aku',
    authorityLevel: 2,
    intimacyLevel: 4,
    socialRelationship: 'Kata ganti orang pertama untuk cerita pribadi atau percakapan sehari-hari.',
    impression: 'Tingkat keakrabannya bergantung pada penutur, daerah, dan situasi.',
    risks: 'Bisa terdengar terlalu melankolis atau romantis jika dipakai dalam instruksi navigasi layanan.',
    contexts: 'Esai refleksi diri orang pertama, monolog video dokumenter, kisah pemulihan personal.',
    example: 'Bulan ketiga setelah toko tutup, aku masih sering bangun jam lima pagi menyeduh kopi di teras.'
  },
  {
    id: 'saya',
    name: 'saya',
    authorityLevel: 4,
    intimacyLevel: 1,
    socialRelationship: 'Kata ganti orang pertama yang sopan dan lazim digunakan dalam beragam situasi.',
    impression: 'Objektif, tenang, berwibawa, dan dapat diandalkan.',
    risks: 'Kurang intim jika digunakan dalam obrolan lingkaran kecil antarteman sebaya.',
    contexts: 'Wawancara, penjelasan profesional, cerita pribadi, atau percakapan yang memerlukan sapaan sopan.',
    example: 'Dalam sesi ini, saya akan menjelaskan pilihan yang tersedia. Kamu bisa bertanya jika ada yang belum jelas.'
  },
  {
    id: 'laki-laki',
    name: 'laki-laki',
    authorityLevel: 3,
    intimacyLevel: 3,
    socialRelationship: 'Sebutan umum untuk laki-laki, termasuk dalam pembahasan sosial dan demografi.',
    impression: 'Gunakan saat identitas gender relevan dengan isi pesan.',
    risks: 'Menimbulkan kejenuhan identitas (gender fatigue) bila diulang di setiap kalimat.',
    contexts: 'Analisis sosiokultural, statistik beban peran keluarga, dan dialog kesehatan umum.',
    example: 'Sebagian laki-laki menghadapi tekanan untuk terus memenuhi kebutuhan keluarga, meski mereka sendiri sedang kesulitan.'
  },
  {
    id: 'pria',
    name: 'pria',
    authorityLevel: 4,
    intimacyLevel: 2,
    socialRelationship: 'Sebutan untuk laki-laki yang lazim dalam tulisan formal.',
    impression: 'Dapat terasa lebih formal; pilih sesuai konteks dan konsistensi naskah.',
    risks: 'Rentan disalahgunakan jika digabung dengan klise manosphere ("Pria Sejati", "Pria Bernilai Tinggi").',
    contexts: 'Artikel, informasi layanan, atau pembahasan demografi saat gender relevan.',
    example: 'Panduan ini ditujukan untuk pria dewasa yang ingin mengetahui pilihan dukungan.'
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
    example: 'Beberapa cowok di komunitas ini rutin bertemu untuk mengerjakan hobi bersama.'
  },
  {
    id: 'bro',
    name: 'bro / bang / mas / pak',
    authorityLevel: 2,
    intimacyLevel: 4,
    socialRelationship: 'Sapaan dengan penggunaan yang berbeda-beda menurut daerah, usia, dan hubungan.',
    impression: 'Pilih sapaan yang lazim bagi pembaca; “bro”, “bang”, “mas”, dan “pak” tidak saling menggantikan begitu saja.',
    risks: 'Sapaan yang tidak sesuai konteks dapat terasa dipaksakan. Jangan menganggap “pak” memiliki keakraban yang sama dengan “bro”.',
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
    psychologicalNeed: 'Kebutuhan memahami persoalan dan melihat pilihan langkah yang tersedia.',
    whyCompelling: 'Meredakan disorientasi dan kebingungan akut; mengubah situasi sosial yang rumit menjadi aturan main yang tampak teratur dan sistematis.',
    harmfulVersion: 'Penjelasan mutlak yang menyalahkan perempuan atau menganggap nasib laki-laki sudah ditentukan secara biologis.',
    ethicalAlternative: 'Jelaskan persoalan dengan bukti yang tersedia. Sebutkan apa yang belum diketahui tanpa menciptakan kambing hitam.',
    keyPrinciple: 'Beri penjelasan yang jelas dan akui keterbatasannya.'
  },
  {
    id: 'validation',
    mechanismId: 'M05',
    shortLabel: 'Pengakuan Beban',
    functionName: 'Pengakuan Beban & Rasa Didengar',
    psychologicalNeed: 'Kebutuhan untuk merasa dipahami, didengar, dan terbebas dari rasa malu saat belum mampu memenuhi ekspektasi sosial atau standar maskulinitas.',
    whyCompelling: 'Meringankan beban rasa gagal pribadi dengan menegaskan bahwa "bukan cuma kamu yang kesulitan; sistem dan realitas hidup saat ini memang berat."',
    harmfulVersion: 'Memanfaatkan luka batin menjadi kebencian kolektif (grievance amplification), menyalahkan wanita, menyalahkan keluarga, atau mendendam pada gerakan kesetaraan.',
    ethicalAlternative: 'Akui tekanan yang dihadapi pembaca tanpa membenarkan kebencian terhadap orang lain.',
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
    ethicalAlternative: 'Bantu pembaca mengembangkan keterampilan tanpa menjadikan kemampuan, penghasilan, atau pencapaian sebagai syarat untuk dihargai.',
    keyPrinciple: 'Membangun keahlian dan rasa bernilai tanpa perlu membanding-bandingkan kasta sosial.'
  },
  {
    id: 'agency',
    mechanismId: 'M02',
    shortLabel: 'Kedaulatan Diri',
    functionName: 'Kemampuan memilih dan bertindak',
    psychologicalNeed: 'Kebutuhan untuk keluar dari rasa tak berdaya (helplessness) dan memegang kendali atas jalan hidup melalui tindakan nyata yang berbatas tegas.',
    whyCompelling: 'Langkah yang jelas dapat membantu seseorang melihat pilihan yang masih tersedia. Ini bukan klaim tentang perubahan dopamin atau kepastian pulihnya motivasi.',
    harmfulVersion: 'Disiplin brutal (toxic grindset), individualisme ekstrem, mengabaikan keterbatasan ekonomi riil, dan menuduh pria yang lelah/depresi sebagai orang "kurang disiplin".',
    ethicalAlternative: 'Tawarkan langkah yang realistis sambil mengakui keterbatasan waktu, uang, dan tenaga.',
    keyPrinciple: 'Bantu pembaca bertindak sesuai pilihan dan kemampuannya.'
  },
  {
    id: 'belonging',
    mechanismId: 'M04',
    shortLabel: 'Rasa Memiliki',
    functionName: 'Rasa diterima dalam kelompok',
    psychologicalNeed: 'Kebutuhan memiliki tempat untuk berinteraksi dan diterima tanpa harus membuktikan diri.',
    whyCompelling: 'Menyediakan tempat berlindung dari kesepian sosial akut yang dialami banyak pria dewasa melalui humor, bahasa santai, dan solidaritas senasib.',
    harmfulVersion: 'Kelompok berbasis permusuhan bersama (us vs them), ruang gema yang menguji kemaskulinan dengan menolak kelembutan, serta radikalisasi anggota rentan.',
    ethicalAlternative: 'Membangun wadah pria yang berakar pada aktivitas bersama (olahraga rekreasional, hobi karya, saling bantu berdampingan), di mana kebersamaan tumbuh secara wajar.',
    keyPrinciple: 'Persaudaraan yang tumbuh melalui aktivitas nyata bersama, bukan melalui kebencian bersama.'
  },
  {
    id: 'purpose',
    mechanismId: 'M09',
    shortLabel: 'Makna Hidup',
    functionName: 'Makna dan tujuan hidup',
    psychologicalNeed: 'Kebutuhan eksistensial untuk memiliki tujuan hidup yang lebih besar dari diri sendiri, melindungi orang terkasih, dan menjadi sosok yang berguna bagi sesama.',
    whyCompelling: 'Menawarkan tujuan dan peran yang dirasa berarti. Daya tariknya dapat berbeda pada setiap orang.',
    harmfulVersion: 'Glorifikasi kekerasan fisik, retorika perang suci, fantasi dominasi agresif, dan sindrom pahlawan yang angkuh serta manipulatif.',
    ethicalAlternative: 'Dukung tujuan yang berarti bagi pembaca, termasuk merawat diri, hubungan, dan lingkungan.',
    keyPrinciple: 'Beri ruang untuk berkontribusi tanpa menjadikannya syarat harga diri.'
  }
];

export const WordGuideView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pronouns' | 'gender' | 'alternatives'>('pronouns');
  const [selectedRegisterId, setSelectedRegisterId] = useState<string>('kamu');
  const [selectedFunctionId, setSelectedFunctionId] = useState<string>('all');

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
          Pilih sapaan sesuai hubungan dengan pembaca dan situasi pesan. Panduan ini membantu menimbang pilihan, bukan menentukan satu sapaan yang selalu tepat.
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
            <span>1. Kata ganti</span>
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
            <span>2. Sebutan laki-laki</span>
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
            <span>3. Kebutuhan dan pendekatan</span>
          </button>
        </div>
      </div>

      {/* TAB 1: PRONOUNS */}
      {activeTab === 'pronouns' && (
        <div role="tabpanel" id="panel-pronouns" aria-labelledby="tab-pronouns" className="space-y-6">
          {/* Interactive 2D Register Map & Active Register Deep Dive (2-Column Desktop Grid) */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <div>
                <h3 className="text-sm font-mono text-amber-500 uppercase tracking-wider font-semibold flex items-center gap-2">
                  <Compass size={15} />
                  <span>Memahami jarak dan keakraban dalam sapaan</span>
                </h3>
                <p className="text-xs text-stone-400 mt-1 leading-relaxed max-w-2xl font-sans">
                  Pilihan kata ganti menentukan batas jarak sosial antara organisasi dan pembaca pria. Peta di bawah memperlihatkan mengapa Menungsa memilih <strong className="text-amber-500 font-semibold">"kamu"</strong> di titik seimbang (3/5, 3/5)—cukup hangat untuk peduli, namun cukup tertib untuk menghormati privasi.
                </p>
              </div>
              <span className="text-[11px] font-mono text-stone-500 shrink-0">
                Pilih titik untuk melihat penjelasan
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
                        <span className="text-[10px] font-mono text-amber-500 uppercase font-bold tracking-wider">Penjelasan sapaan</span>
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
                      <div><strong className="text-stone-100 font-semibold">Konteks penggunaan:</strong> {activeRegister.contexts}</div>
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
                Daftar kata ganti dan sapaan
              </h4>
              <div role="tablist" aria-label="Daftar kata ganti dan sapaan" className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
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
                    <div className={`text-[9.5px] font-mono ${selectedRegisterId === reg.id ? 'text-bone/80' : 'text-stone-500'}`}>
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
                Sebut identitas gender jika relevan. Hindari menjadikan suatu tindakan sebagai syarat untuk disebut laki-laki yang baik atau sejati.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="rounded-xl border border-emerald-900/40 bg-emerald-950/60 p-5 space-y-2.5 text-xs shadow-xs">
                <div className="text-emerald-700 dark:text-emerald-400 font-mono font-bold uppercase flex items-center gap-1.5">
                  <CheckCircle2 size={15} />
                  <span>Sebut tindakan atau situasinya</span>
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
                  <span>Sebut gender jika relevan</span>
                </div>
                <p className="text-stone-300 leading-relaxed">
                  Gunakan “pria” atau “laki-laki” saat informasi tentang gender diperlukan untuk memahami pesan.
                </p>
                <div className="font-serif italic text-amber-700 dark:text-amber-300 pt-2 border-t border-amber-900/40 leading-snug font-medium">
                  “Panduan dukungan untuk laki-laki dewasa.”
                </div>
              </div>

              <div className="rounded-xl border border-rose-900/40 bg-rose-950/60 p-5 space-y-2.5 text-xs shadow-xs">
                <div className="text-rose-700 dark:text-rose-400 font-mono font-bold uppercase flex items-center gap-1.5">
                  <AlertCircle size={15} />
                  <span>Hindari syarat “pria sejati”</span>
                </div>
                <p className="text-stone-300 leading-relaxed">
                  Menungsa tidak memakai label ini untuk menilai harga diri pembaca atau mendesaknya melakukan sesuatu.
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
              Menanggapi kebutuhan tanpa memperkuat kebencian
            </h3>
            <p className="text-xs md:text-sm text-stone-400 mt-1 max-w-3xl leading-relaxed">
              Sebagian konten manosphere menawarkan kejelasan, pengakuan, atau rasa diterima. Tanggapi kebutuhan itu tanpa membenarkan penjelasan yang menyalahkan atau merendahkan kelompok lain.
            </p>
          </div>

          {/* Function Selector Filter Pills (from v1) */}
          <div className="space-y-2">
            <span className="font-mono text-xs text-stone-400 uppercase tracking-wider block font-semibold">
              Pilih kebutuhan yang ingin dibahas
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
                      Kebutuhan dan cara menanggapinya
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
                      <span>1. Kebutuhan yang ingin dipenuhi</span>
                    </span>
                    <span className="text-[10px] font-mono text-stone-400">
                      Kebutuhan pembaca
                    </span>
                  </div>
                  <p className="text-stone-100 font-medium text-sm md:text-[15px] leading-relaxed font-sans">
                    {item.psychologicalNeed}
                  </p>
                  
                  {/* Psychological Appeal */}
                  <div className="pt-2.5 border-t border-sky-800/40 flex items-start gap-2 text-xs">
                    <span className="font-mono font-bold text-amber-500 uppercase text-[10.5px] shrink-0 mt-0.5">
                      2. Mengapa menarik
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
                        3. Cara yang dapat merugikan
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
                        4. Pendekatan Menungsa
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
                      Pegangan penulisan
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
