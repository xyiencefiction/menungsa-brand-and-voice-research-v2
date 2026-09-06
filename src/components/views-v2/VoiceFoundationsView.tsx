import React, { useState } from 'react';
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
  SlidersHorizontal,
  Eye,
  AlertCircle
} from 'lucide-react';

interface Props {
  onNavigate: (view: ViewType) => void;
}

interface ValuePillar {
  id: string;
  title: string;
  tagline: string;
  voiceTrait: string;
  positionNote: string;
  boundaryCondition: string;
  dos: { example: string; why: string }[];
  donts: { example: string; why: string }[];
}

const VALUE_PILLARS: ValuePillar[] = [
  {
    id: 'V01',
    title: 'Kesetaraan Pijakan, Bukan Penghakiman',
    tagline: 'Equal Footing, Not Judgement',
    voiceTrait: 'Pantang menyematkan kata sifat evaluatif atau menghakimi di depan pembaca.',
    positionNote: 'Satu-satunya nilai mutlak tanpa kompromi. Menukarnya demi mengejar interaksi atau viralitas sesaat justru merusak rasa aman pembaca.',
    boundaryCondition: 'Penilaian risiko medis darurat tetap membutuhkan terminologi yang presisi. Menggambarkan situasi sebagai hal yang berbahaya tidak sama dengan menghakimi pribadi pembaca.',
    dos: [
      {
        example: 'Ini ruang untuk berbicara. Kamu tidak harus menceritakan apa pun jika belum siap.',
        why: 'Menyapa pembaca dan menjelaskan suasana ruang tanpa membebaninya dengan syarat atau tuntutan.'
      },
      {
        example: 'Minggu lalu ada tujuh orang yang hadir. Empat di antaranya hanya duduk mendengarkan.',
        why: 'Menggambarkan fakta yang wajar dan bersahaja alih-alih melabeli jenis pria yang datang.'
      }
    ],
    donts: [
      {
        example: 'Laki-laki kuat adalah laki-laki yang berani bercerita.',
        why: 'Menjadikan martabat dan harga diri bersyarat pada tindakan yang sedang diminta.'
      },
      {
        example: 'Kamu hebat banget sudah mau terbuka dan meruntuhkan egomu.',
        why: 'Pujian yang terdengar menggurui justru mengaktifkan kembali rasa gagal yang sedang ia alami.'
      },
      {
        example: 'Pria sejati tidak takut mengakui luka batinnya.',
        why: 'Pola kalimat terlarang: mendefinisikan kemaskulinan lalu menyewakannya kembali sebagai syarat moral.'
      }
    ]
  },
  {
    id: 'V02',
    title: 'Rendah Hambatan untuk Memulai',
    tagline: 'Easy to Begin / Low Response Cost',
    voiceTrait: 'Jelaskan apa yang akan terjadi secara transparan sebelum mengajak siapa pun bergabung.',
    positionNote: 'Pria menghindari rasa malu dan sorotan publik, bukan menghindari bantuan. Turunkan biaya psikologis sekecil mungkin agar mereka berani melangkah.',
    boundaryCondition: 'Pada kondisi krisis darurat (risiko menyakiti diri), gunakan instruksi yang tegas, lugas, dan terarah tanpa keraguan.',
    dos: [
      {
        example: 'Selasa pukul 19.00 di ruang belakang. Gratis. Boleh datang tanpa bicara apa-apa, dan boleh pulang kapan saja.',
        why: 'Waktu, tempat, durasi, biaya, dan pintu keluar disebutkan di awal sebelum kalimat ajakan dibuat.'
      },
      {
        example: 'Tidak ada presensi, tidak ada sesi perkenalan wajib keliling lingkaran.',
        why: 'Menghilangkan kekhawatiran disorot publik sejak kalimat pertama.'
      }
    ],
    donts: [
      {
        example: 'Yuk tumpahkan semua beban hidup yang kamu pendam selama ini!',
        why: 'Menetapkan penelanjangan emosi yang intens sebagai harga tiket masuk.'
      },
      {
        example: 'Ceritakan masalah terberatmu di sini sekarang juga.',
        why: 'Kalimat perintah yang menuntut pembukaan luka batin secara sepihak.'
      }
    ]
  },
  {
    id: 'V03',
    title: 'Satu Langkah Nyata yang Masuk Akal',
    tagline: 'One Actionable Step',
    voiceTrait: 'Tawarkan satu tindakan konkret, mudah dibatalkan, dan sebutkan hambatannya secara jujur.',
    positionNote: 'Tindakan nyata memulihkan rasa berdaya (agency). Jangan memberi daftar tuntutan perubahan hidup yang mustahil dilakukan orang yang sedang kehabisan energi.',
    boundaryCondition: 'Langkah awal yang ringan adalah jembatan pembuka, bukan pengganti penanganan klinis jika masalah berlanjut.',
    dos: [
      {
        example: 'Langkah pertama biasanya ke puskesmas terdekat, bukan langsung ke psikiater. Katakan di loket: "Saya mau periksa ke dokter umum." Antrean bisa agak ramai, bawalah sesuatu untuk dibaca.',
        why: 'Satu tindakan nyata, kalimat persis yang harus diucapkan di loket, dan hambatan antrean disebutkan jujur di awal.'
      },
      {
        example: 'Malam ini cukup rapikan satu sudut meja kerjamu, lalu tidurlah 15 menit lebih awal.',
        why: 'Satu langkah fisik yang jelas titik mulai dan titik selesainya.'
      }
    ],
    donts: [
      {
        example: 'Jangan ragu mencari bantuan profesional dan segera ubah pola hidupmu!',
        why: 'Memberikan anjuran klise tanpa jalur teknis yang jelas bagaimana cara mengaksesnya.'
      },
      {
        example: 'Ubah pola pikirmu sekarang dan tata ulang seluruh hidupmu dari nol!',
        why: 'Tuntutan abstrak yang memicu rasa putus asa bagi orang yang energinya sudah terkuras.'
      }
    ]
  },
  {
    id: 'V04',
    title: 'Mulai dari yang Tampak Nyata',
    tagline: 'Start from What is Visible / Specific Before Emotional',
    voiceTrait: 'Gunakan detail situasi konkret yang menghadirkan emosi secara alami; jangan jadikan pengakuan emosi sebagai tiket masuk.',
    positionNote: 'Pria lebih cepat mengenali situasi fisiknya (jam tiga pagi, cek saldo, pundak kaku) dibanding label emosi. Biarkan pembaca yang menyimpulkan perasaannya sendiri.',
    boundaryCondition: 'Situasi yang digambarkan tidak boleh terlalu sempit hingga mengecualikan pembaca. Pilih situasi yang jamak dialami pria sehari-hari.',
    dos: [
      {
        example: 'Jam tiga pagi, lampu kamar sudah mati, tapi jari masih terus menggulir memeriksa saldo rekening.',
        why: 'Situasi nyata yang langsung ia kenali tanpa perlu mengakui kepada orang lain bahwa ia sedang cemas.'
      },
      {
        example: 'Hal-hal yang biasanya berubah duluan dalam rutinitas harianmu, sebelum orang lain menyadarinya.',
        why: 'Urutan bertahap: ia bisa membaca keseluruhan tulisan sebelum memutuskan apakah tulisan ini tentang dirinya.'
      }
    ],
    donts: [
      {
        example: '5 Tanda Kamu Sedang Mengalami Depresi Berat dan Putus Asa.',
        why: 'Langsung mendiagnosis pembaca di posisi paling rentan, tepat pada slide pertama atau judul tulisan.'
      },
      {
        example: 'Kamu pasti merasa hampa, kesepian, dan gagal sebagai pria, kan?',
        why: 'Memaksakan label perasaan lalu menuntutnya membenarkan, yang merupakan biaya keterpaparan terselubung empati.'
      }
    ]
  },
  {
    id: 'V05',
    title: 'Jujur & Terbuka tentang Batasan',
    tagline: 'Clear About the Limits / Calibrated Uncertainty',
    voiceTrait: 'Terkalibrasi secara ilmiah pada klaim psikologis; lugas dan tanpa basa-basi pada informasi logistik.',
    positionNote: 'Belum ada uji kalimat acak berskala besar khusus pria Indonesia. Jangan mengklaim kebenaran mutlak. Sebaliknya, informasi darurat disampaikan tegas tanpa keraguan.',
    boundaryCondition: 'Kehati-hatian ilmiah bukan berarti kalimat menjadi bertele-tele atau kabur. Pada informasi darurat dan akses bantuan, sampaikan secara pasti tanpa keraguan.',
    dos: [
      {
        example: 'Sebagian laki-laki merasa lebih enteng setelah bertukar pikiran dengan kawan terpercaya. Sebagian lagi tidak. Untuk konteks Indonesia, datanya masih terus kami teliti.',
        why: 'Jujur dan terkalibrasi pada klaim psikologis, menyebutkan batas bukti ilmiah secara transparan.'
      },
      {
        example: 'Layanan 119 ext. 8. Bebas pulsa, 24 jam. Jika kamu merasa tidak sanggup menelepon sendiri, minta orang terdekat yang mendampingimu.',
        why: 'Nol keraguan pada logistik darurat, dan mengantisipasi jika pembaca sedang tidak mampu bertindak sendiri.'
      }
    ],
    donts: [
      {
        example: 'Metode ini terbukti 100% ampuh mengatasi krisis mental seluruh pria Indonesia.',
        why: 'Belum ada riset kalimat komparatif di Indonesia, sehingga klaim mutlak seperti ini tidak etis dan merusak integritas.'
      },
      {
        example: 'Mungkin kamu bisa coba menghubungi layanan darurat, siapa tahu bisa sedikit membantu.',
        why: 'Ragu-ragu pada momen krisis paling berbahaya; instruksi darurat harus disampaikan secara lugas dan pasti.'
      }
    ]
  },
  {
    id: 'V06',
    title: 'Tindakan Nyata, Bukan Tuntutan Moral',
    tagline: 'Action, Not Demands / Lead by Practice',
    voiceTrait: 'Subjek kalimat adalah tindakan nyata organisasi dan sistem, bukan menunjuk hidung pembaca; posisi moral dinyatakan satu kali dengan konsekuensi yang kami tanggung sendiri.',
    positionNote: 'Menceramahi publik dengan tuntutan moral ("laki-laki harus...") memicu penolakan batin (reactance). Tunjukkan apa yang organisasi lakukan secara nyata, bukan apa yang pembaca harus ubah.',
    boundaryCondition: 'Ini bukan izin untuk bersikap pasif. Aturannya adalah: kalimat berfokus pada apa yang kami kerjakan dan biaya yang kami tanggung sendiri.',
    dos: [
      {
        example: 'Antrean psikiater di faskes rata-rata dua minggu. Kami sedang mendata klinik yang layanannya lebih cepat, dan datanya kami buka gratis untuk umum.',
        why: 'Subjek kalimat adalah sistem dan komitmen nyata organisasi yang memerlukan kerja keras nyata.'
      },
      {
        example: 'Kami menolak kerja sama iklan produk suplemen di kanal ini, meskipun itu berarti kami kehilangan pemasukan sponsor.',
        why: 'Satu sikap moral yang tegas, dinyatakan secara jujur dengan biaya/konsekuensi yang ditanggung sendiri oleh brand.'
      }
    ],
    donts: [
      {
        example: 'Laki-laki Indonesia harus berhenti gengsi dan sadar kesehatan mental!',
        why: 'Mengkambinghitamkan pembaca secara kolektif dengan kalimat perintah yang memicu resistensi batin.'
      },
      {
        example: 'Sudah saatnya kita semua peduli pada kesehatan jiwa!',
        why: 'Khotbah moral tanpa komitmen biaya nyata, dan kata "kita" yang tidak memiliki rujukan tindakan konkret.'
      }
    ]
  }
];

interface PlaybookItem {
  id: string;
  category: string;
  categoryLabel: string;
  action: string;
  rationale: string;
  doText: string;
  doWhy: string;
  dontText: string;
  dontWhy: string;
}

const PLAYBOOK_ITEMS: PlaybookItem[] = [
  {
    id: 'R01',
    category: 'REGULATION',
    categoryLabel: 'Pengendalian Emosi',
    action: 'Jadikan langkah pertama kecil, privat, dan tanpa beban komitmen',
    rationale: 'Pria menghindari rasa malu sosial, bukan menghindari bantuan. Menurunkan biaya psikologis jauh lebih penting daripada menaikkan intensitas emosi ajakan.',
    doText: 'Sesi berikutnya Selasa pukul 19.00. Boleh datang, boleh sekadar duduk mengamati dulu.',
    doWhy: 'Memberikan pilihan leluasa sehingga hadir ke lokasi bukan berarti terikat komitmen apa pun.',
    dontText: 'Yuk tumpahkan semua unek-unekmu di kolom komentar postingan ini!',
    dontWhy: 'Menuntut penelanjangan emosi di ruang terbuka publik yang memicu rasa malu dan defensif.'
  },
  {
    id: 'R02',
    category: 'FRAMING',
    categoryLabel: 'Maskulinitas & Martabat',
    action: 'Gunakan latar situasi nyata agar emosi hadir secara alami',
    rationale: 'Pria lebih tersentuh oleh deskripsi rutinitas fisik yang nyata dialami dibanding label diagnosis klinis yang mengintimidasi.',
    doText: 'Jam tiga pagi, lampu kamar sudah mati, tapi jari masih terus menggulir layar ponsel.',
    doWhy: 'Satu situasi yang nyata terlihat, tanpa melabeli perasaan, tanpa memaksa pembaca mengakui kerapuhan.',
    dontText: 'Kenali 5 tanda kamu sedang mengalami depresi berat dan gangguan mental!',
    dontWhy: 'Melabeli secara prematur dan membuat pembaca merasa dinilai sebagai orang yang rusak.'
  },
  {
    id: 'R03',
    category: 'AUDIENCE_DEFENSE',
    categoryLabel: 'Mencegah Resistensi',
    action: 'Tawarkan kendali mandiri dengan pilihan sukarela yang nyata',
    rationale: 'Kalimat perintah memicu penolakan psikologis (reactance). Pria butuh merasa bahwa kendali keputusan tetap berada di tangannya.',
    doText: 'Ada dua hal kecil yang bisa dicoba malam ini: jalan santai 15 menit atau mandi air hangat sebelum tidur.',
    doWhy: 'Memberi opsi dan membiarkan pembaca memilih sendiri ritme yang paling nyaman baginya.',
    dontText: 'Kamu harus berhenti memendam emosi dan wajib konsultasi sekarang juga!',
    dontWhy: 'Mendikte dengan nada menggurui yang langsung memicu sikap defensif.'
  },
  {
    id: 'R04',
    category: 'REGISTER',
    categoryLabel: 'Ragam Bahasa',
    action: 'Gunakan kata ganti "kamu" sebagai standar bawaan organisasi yang santun',
    rationale: 'Kata "kamu" terasa langsung dan hangat tanpa berpura-pura menjadi sahabat tongkrongan palsu.',
    doText: 'Ketika tubuhmu memberi sinyal lelah yang berkepanjangan, dengarkan.',
    doWhy: 'Bicara jujur sebagai pendamping yang menghormati jarak sosial pembaca.',
    dontText: 'Halo bro/cuy, gimana kabar mental lo hari ini? Curhat yuk sama mimin!',
    dontWhy: 'Organisasi yang memaksakan bahasa gaul anak muda terdengar canggung dan tidak autentik.'
  },
  {
    id: 'R05',
    category: 'FRAMING',
    categoryLabel: 'Maskulinitas & Martabat',
    action: 'Jaga kehormatan pria di ruang publik; simpan hal emosional di ruang privat',
    rationale: 'Di ruang publik (media sosial, baliho), pria menjaga harga diri dan status sosial. Tempatkan emosi sensitif di saluran privat (chat tertutup).',
    doText: 'Di linimasa publik: fokus pada manajemen waktu, kebugaran fisik, dan ketrampilan kerja nyata.',
    doWhy: 'Aman dibaca di depan kawan sebaya tanpa khawatir dihakimi atau diledek.',
    dontText: 'Di linimasa publik: meminta pria menangis bersama atau membuka aib rumah tangganya.',
    dontWhy: 'Melanggar batas privasi budaya Indonesia dan memicu cemoohan publik.'
  },
  {
    id: 'R06',
    category: 'AUDIENCE_DEFENSE',
    categoryLabel: 'Mencegah Resistensi',
    action: 'Hindari label "Pria Sejati", "Cowok Alfa", atau kasta maskulinitas',
    rationale: 'Label hiper-maskulin langsung dicap sebagai hal yang canggung (cringe) dan manipulatif oleh pria dewasa Indonesia.',
    doText: 'Menyelesaikan pekerjaan dengan tuntas dan menjaga keluarga tetap aman.',
    doWhy: 'Fokus pada tanggung jawab dan fungsi nyata tanpa embel-embel jargon maskulinitas.',
    dontText: 'Buktikan kalau kamu pria alfa sejati yang pantang menyerah menaklukkan dunia!',
    dontWhy: 'Klise manosphere yang terdengar kekanak-kanakan dan tidak membumi.'
  }
];

export const VoiceFoundationsView: React.FC<Props> = ({ onNavigate }) => {
  const [activeValueId, setActiveValueId] = useState<string>('V01');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Semua Aturan' },
    { id: 'REGULATION', label: 'Pengendalian Emosi' },
    { id: 'REGISTER', label: 'Ragam Bahasa & Kata Ganti' },
    { id: 'FRAMING', label: 'Maskulinitas & Martabat' },
    { id: 'AUDIENCE_DEFENSE', label: 'Mencegah Resistensi' },
  ];

  const filteredRules = PLAYBOOK_ITEMS.filter((r) => {
    if (selectedCategory === 'all') return true;
    return r.category === selectedCategory;
  });

  const activeValue = VALUE_PILLARS.find((v) => v.id === activeValueId) ?? VALUE_PILLARS[0];
  const valueIcons = [Scale, ShieldCheck, Compass, Eye, AlertCircle, Anchor];

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
            Menungsa berbicara dengan nada <strong>tenang, jujur, membumi, dan tidak menggurui</strong>. Kami tidak memosisikan diri sebagai figur moral yang menyalahkan, bukan pula teman khayalan yang berpura-pura akrab. Kami hadir sebagai pendamping yang menghormati kedaulatan dan harga diri pembaca.
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

      {/* 6 Core Pillars of Writing */}
      <section className="space-y-6">
        <div>
          <h2 className="text-lg md:text-xl font-serif text-stone-100 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            6 Nilai Utama Menungsa dalam Praktik Menulis (Rekonsiliasi Lengkap V1–V6)
          </h2>
          <p className="text-xs md:text-sm text-stone-400 mt-1">
            Enam prinsip nilai yang disintesis langsung dari basis data riset Menungsa (V1–V6), memandu pilihan kata, ritme kalimat, dan batasan etis penulisan.
          </p>
        </div>

        {/* Value selector pills */}
        <div role="tablist" aria-label="6 Nilai Utama Menungsa" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {VALUE_PILLARS.map((val, idx) => {
            const Icon = valueIcons[idx % valueIcons.length];
            const isSelected = val.id === activeValueId;
            return (
              <button
                key={val.id}
                role="tab"
                id={`tab-value-${val.id}`}
                aria-selected={isSelected}
                aria-controls="panel-value-detail"
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
                <div className="font-serif text-sm md:text-base font-medium text-stone-100 leading-snug">
                  {val.title}
                </div>
                <div className="text-xs text-stone-400 mt-1.5 line-clamp-2 leading-relaxed">
                  {val.voiceTrait}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Value Deep Dive Card */}
        {activeValue && (
          <div
            role="tabpanel"
            id="panel-value-detail"
            aria-labelledby={`tab-value-${activeValue.id}`}
            className="rounded-xl border border-stone-800 bg-stone-900/50 p-6 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3 md:col-span-1 border-b md:border-b-0 md:border-r border-stone-800 pb-4 md:pb-0 md:pr-6">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                  Karakter Suara & Prinsip
                </span>
                <h3 className="text-xl font-serif text-stone-100 leading-tight">{activeValue.title}</h3>
                <p className="text-xs text-amber-300/80 font-mono">{activeValue.tagline}</p>
                <p className="text-xs md:text-sm text-stone-300 leading-relaxed">
                  {activeValue.voiceTrait}
                </p>
                <div className="pt-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block mb-1 font-semibold">
                    POSISI DALAM NADA MENUNGSA:
                  </span>
                  <p className="text-xs text-stone-300 bg-stone-950/60 p-3 rounded-lg border border-stone-800/80 leading-relaxed">
                    {activeValue.positionNote}
                  </p>
                </div>
              </div>

              <div className="space-y-4 md:col-span-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* DO */}
                  <div className="rounded-lg border border-emerald-500/20 bg-emerald-950/20 p-4 space-y-3">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider">
                      <CheckCircle2 size={15} />
                      <span>Yang Dianjurkan (Do)</span>
                    </div>
                    {activeValue.dos.map((d, i) => (
                      <div key={i} className="text-xs text-stone-200 border-t border-emerald-900/40 pt-2.5 space-y-1">
                        <div className="font-serif italic text-emerald-300 leading-snug">"{d.example}"</div>
                        <div className="text-xs text-stone-300 leading-relaxed">{d.why}</div>
                      </div>
                    ))}
                  </div>

                  {/* DON'T */}
                  <div className="rounded-lg border border-rose-500/20 bg-rose-950/20 p-4 space-y-3">
                    <div className="flex items-center gap-2 text-rose-400 text-xs font-mono font-semibold uppercase tracking-wider">
                      <XCircle size={15} />
                      <span>Yang Dilarang (Don't)</span>
                    </div>
                    {activeValue.donts.map((d, i) => (
                      <div key={i} className="text-xs text-stone-200 border-t border-rose-900/40 pt-2.5 space-y-1">
                        <div className="font-serif italic text-rose-300 leading-snug">"{d.example}"</div>
                        <div className="text-xs text-stone-300 leading-relaxed">{d.why}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-stone-400 bg-stone-950/40 p-3.5 rounded-lg border border-stone-800/60 leading-relaxed">
                  <strong className="text-stone-200">Batas Keberlakuan:</strong> {activeValue.boundaryCondition}
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
                    {rule.id} · {rule.categoryLabel}
                  </span>
                  <h3 className="text-base font-serif font-medium text-stone-100 mt-0.5 leading-snug">
                    {rule.action}
                  </h3>
                </div>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed">
                {rule.rationale}
              </p>

              <div className="space-y-2 pt-2 border-t border-stone-800/80">
                <div className="rounded-lg bg-emerald-950/20 border border-emerald-500/20 p-3 text-xs text-emerald-200 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-semibold text-emerald-400 text-[11px] font-mono">
                    <CheckCircle2 size={13} />
                    <span>CONTOH PENULISAN BENAR:</span>
                  </div>
                  <p className="font-serif italic text-stone-100">"{rule.doText}"</p>
                  <p className="text-xs text-stone-300 leading-relaxed">{rule.doWhy}</p>
                </div>

                <div className="rounded-lg bg-rose-950/20 border border-rose-500/20 p-3 text-xs text-rose-200 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-semibold text-rose-400 text-xs font-mono">
                    <XCircle size={13} />
                    <span>HINDARI BENTUK INI:</span>
                  </div>
                  <p className="font-serif italic text-stone-100">"{rule.dontText}"</p>
                  <p className="text-xs text-stone-300 leading-relaxed">{rule.dontWhy}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
