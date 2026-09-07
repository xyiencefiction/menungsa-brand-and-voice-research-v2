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
  AlertCircle,
  Lock,
  Globe
} from 'lucide-react';
import { ValueSpectrum } from '../charts/ValueSpectrum';
import { FramingMatrix } from '../charts/FramingMatrix';
import { brandValues } from '../../data';

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
    id: 'V1',
    title: 'Kesetaraan, Bukan Penghakiman',
    tagline: 'Equal Footing, Not Judgement',
    voiceTrait: 'Sapa pembaca tanpa menilai apakah ia cukup kuat, berani, atau pantas dihargai.',
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
        why: 'Pujian ini disertai penilaian bahwa pembaca sebelumnya dikuasai ego. Akui keterbukaannya tanpa menilai dirinya.'
      },
      {
        example: 'Pria sejati tidak takut mengakui luka batinnya.',
        why: 'Kalimat ini menjadikan keberanian bercerita sebagai syarat untuk disebut laki-laki sejati.'
      }
    ]
  },
  {
    id: 'V2',
    title: 'Rendah Hambatan untuk Memulai',
    tagline: 'Easy to Begin / Low Response Cost',
    voiceTrait: 'Jelaskan apa yang akan terjadi secara transparan sebelum mengajak siapa pun bergabung.',
    positionNote: 'Rasa malu, kekhawatiran diketahui orang lain, dan ketidakjelasan proses dapat membuat langkah pertama terasa berat. Jelaskan pilihan yang tersedia.',
    boundaryCondition: 'Pada kondisi krisis darurat (risiko menyakiti diri), gunakan instruksi yang tegas, lugas, dan terarah tanpa keraguan.',
    dos: [
      {
        example: 'Selasa pukul 19.00 di ruang belakang. Gratis. Boleh datang tanpa bicara apa-apa, dan boleh pulang kapan saja.',
        why: 'Contoh ini menyebut waktu, tempat, biaya, dan kebebasan untuk pulang. Tambahkan durasi jika sudah diketahui.'
      },
      {
        example: 'Tidak ada presensi, tidak ada sesi perkenalan wajib keliling lingkaran.',
        why: 'Menghilangkan kekhawatiran disorot publik sejak kalimat pertama.'
      }
    ],
    donts: [
      {
        example: 'Yuk tumpahkan semua beban hidup yang kamu pendam selama ini!',
        why: 'Ajakan ini menuntut pembaca langsung menceritakan pengalaman yang pribadi.'
      },
      {
        example: 'Ceritakan masalah terberatmu di sini sekarang juga.',
        why: 'Kalimat ini mendesak pembaca menceritakan hal pribadi sebelum ia siap.'
      }
    ]
  },
  {
    id: 'V3',
    title: 'Satu Langkah Nyata yang Masuk Akal',
    tagline: 'One Actionable Step',
    voiceTrait: 'Tawarkan satu langkah yang jelas dan realistis. Jelaskan biaya, waktu, serta pilihan untuk berhenti jika memang tersedia.',
    positionNote: 'Bantu pembaca melihat satu hal yang bisa ia lakukan. Hindari daftar perubahan besar yang sulit dijalankan sekaligus.',
    boundaryCondition: 'Langkah awal yang ringan adalah jembatan pembuka, bukan pengganti penanganan klinis jika masalah berlanjut.',
    dos: [
      {
        example: 'Langkah pertama biasanya ke puskesmas terdekat, bukan langsung ke psikiater. Katakan di loket: "Saya mau periksa ke dokter umum." Antrean bisa agak ramai, bawalah sesuatu untuk dibaca.',
        why: 'Satu tindakan nyata, kalimat persis yang harus diucapkan di loket, dan hambatan antrean disebutkan jujur di awal.'
      },
      {
        example: 'Malam ini, coba rapikan satu sudut meja kerjamu.',
        why: 'Ada satu tindakan dengan awal dan akhir yang jelas.'
      }
    ],
    donts: [
      {
        example: 'Jangan ragu mencari bantuan profesional dan segera ubah pola hidupmu!',
        why: 'Ajakan ini belum menjelaskan bantuan apa yang tersedia dan cara mengaksesnya.'
      },
      {
        example: 'Ubah pola pikirmu sekarang dan tata ulang seluruh hidupmu dari nol!',
        why: 'Tuntutan abstrak yang memicu rasa putus asa bagi orang yang energinya sudah terkuras.'
      }
    ]
  },
  {
    id: 'V4',
    title: 'Mulai dari yang Tampak Nyata',
    tagline: 'Start from What is Visible / Specific Before Emotional',
    voiceTrait: 'Gunakan detail situasi konkret yang menghadirkan emosi secara alami; jangan jadikan pengakuan emosi sebagai tiket masuk.',
    positionNote: 'Detail sehari-hari dapat membantu pembaca mengenali situasinya. Beri ruang baginya untuk menamai perasaannya sendiri.',
    boundaryCondition: 'Situasi yang digambarkan tidak boleh terlalu sempit hingga mengecualikan pembaca. Pilih situasi yang jamak dialami pria sehari-hari.',
    dos: [
      {
        example: 'Jam tiga pagi, lampu kamar sudah mati, tapi kamu masih membuka aplikasi bank untuk mengecek saldo.',
        why: 'Situasi nyata yang langsung ia kenali tanpa perlu mengakui kepada orang lain bahwa ia sedang cemas.'
      },
      {
        example: 'Perubahan kecil dalam keseharian yang mungkin baru kamu sadari.',
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
        why: 'Kalimat ini menebak perasaan pembaca dan mendesaknya untuk membenarkan tebakan itu.'
      }
    ]
  },
  {
    id: 'V5',
    title: 'Jujur & Terbuka tentang Batasan',
    tagline: 'Clear About the Limits / Calibrated Uncertainty',
    voiceTrait: 'Sesuaikan klaim dengan bukti yang tersedia. Sampaikan informasi layanan yang sudah diverifikasi secara jelas.',
    positionNote: 'Dalam 14 dokumen yang ditelaah, tidak ditemukan eksperimen acak yang menguji pilihan kata pada laki-laki dewasa Indonesia. Contoh di sini merupakan usulan penerapan, bukan kalimat yang terbukti efektif.',
    boundaryCondition: 'Jelaskan ketidakpastian riset dengan singkat. Untuk bantuan darurat, berikan langkah yang jelas dan informasi layanan yang sudah diverifikasi.',
    dos: [
      {
        example: 'Sebagian laki-laki merasa lebih enteng setelah bercerita. Sebagian lagi tidak. Dalam korpus yang ditelaah, pilihan kalimatnya belum diuji pada laki-laki dewasa Indonesia.',
        why: 'Menyebutkan keterbatasan pengetahuan tanpa membuat janji hasil yang pasti.'
      },
      {
        example: 'Untuk dukungan psikologis, periksa akses layanan di Healing119.id. Jika ada bahaya segera, cari bantuan darurat atau minta orang yang kamu percaya menemanimu ke IGD terdekat.',
        why: 'Memberikan langkah rujukan dan jalur darurat tanpa menjanjikan jam operasional yang belum diverifikasi.'
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
    id: 'V6',
    title: 'Tindakan Nyata, Bukan Tuntutan Moral',
    tagline: 'Action, Not Demands / Lead by Practice',
    voiceTrait: 'Jelaskan tindakan dan komitmen Menungsa secara konkret. Jika menyatakan sikap, sebutkan langkah yang menyertainya.',
    positionNote: 'Menceramahi publik dengan tuntutan moral ("laki-laki harus...") memicu penolakan batin (reactance). Tunjukkan apa yang organisasi lakukan secara nyata, bukan apa yang pembaca harus ubah.',
    boundaryCondition: 'Sikap organisasi tetap perlu jelas. Hubungkan sikap itu dengan tindakan yang dapat diperiksa.',
    dos: [
      {
        example: 'Kami sedang menyusun informasi layanan kesehatan mental di beberapa wilayah. Daftar ini akan memuat fasilitas yang telah diverifikasi dan tanggal pemeriksaan terakhir.',
        why: 'Pesan berfokus pada hambatan layanan dan tindakan organisasi untuk menanganinya.'
      },
      {
        example: 'Kami menolak kerja sama iklan produk suplemen di kanal ini, meskipun itu berarti kami kehilangan pemasukan sponsor.',
        why: 'Sikap organisasi disertai konsekuensi yang bersedia ditanggung. Gunakan hanya jika keputusan ini benar-benar dibuat.'
      }
    ],
    donts: [
      {
        example: 'Laki-laki Indonesia harus berhenti gengsi dan sadar kesehatan mental!',
        why: 'Mengkambinghitamkan pembaca secara kolektif dengan kalimat perintah yang memicu resistensi batin.'
      },
      {
        example: 'Sudah saatnya kita semua peduli pada kesehatan jiwa!',
        why: 'Ajakan ini belum menyebut siapa yang akan bertindak dan apa yang akan dilakukan.'
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
    categoryLabel: 'Keterbukaan dan privasi',
    action: 'Jadikan langkah pertama kecil, privat, dan tanpa beban komitmen',
    rationale: 'Jelaskan langkah pertama, siapa yang dapat melihat respons pembaca, dan apakah ia bisa berhenti. Ini usulan berdasarkan sintesis, bukan bukti bahwa satu pendekatan selalu lebih efektif.',
    doText: 'Sesi berikutnya Selasa pukul 19.00. Boleh datang, boleh sekadar duduk mengamati dulu.',
    doWhy: 'Memberikan pilihan leluasa sehingga hadir ke lokasi bukan berarti terikat komitmen apa pun.',
    dontText: 'Yuk tumpahkan semua unek-unekmu di kolom komentar postingan ini!',
    dontWhy: 'Ajakan ini meminta pengalaman pribadi dibagikan di kolom komentar yang terbuka.'
  },
  {
    id: 'R02',
    category: 'FRAMING',
    categoryLabel: 'Maskulinitas & Martabat',
    action: 'Gunakan latar situasi nyata agar emosi hadir secara alami',
    rationale: 'Gunakan situasi yang relevan sebagai pembuka. Istilah klinis tetap dapat dijelaskan saat dibutuhkan, tanpa mendiagnosis pembaca.',
    doText: 'Jam tiga pagi, lampu kamar sudah mati, tapi jari masih terus menggulir layar ponsel.',
    doWhy: 'Satu situasi yang nyata terlihat, tanpa melabeli perasaan, tanpa memaksa pembaca mengakui kerapuhan.',
    dontText: 'Kenali 5 tanda kamu sedang mengalami depresi berat dan gangguan mental!',
    dontWhy: 'Judul ini menyatakan diagnosis pembaca sebelum ada penilaian profesional.'
  },
  {
    id: 'R03',
    category: 'AUDIENCE_DEFENSE',
    categoryLabel: 'Ajakan tanpa paksaan',
    action: 'Tawarkan kendali mandiri dengan pilihan sukarela yang nyata',
    rationale: 'Bahasa yang menekan kebebasan memilih dapat memicu penolakan. Temuan ini tidak khusus pada laki-laki.',
    doText: 'Ada dua hal kecil yang bisa dicoba malam ini: jalan santai 15 menit atau mandi air hangat sebelum tidur.',
    doWhy: 'Memberi opsi dan membiarkan pembaca memilih sendiri ritme yang paling nyaman baginya.',
    dontText: 'Kamu harus berhenti memendam emosi dan wajib konsultasi sekarang juga!',
    dontWhy: 'Mendikte dengan nada menggurui yang langsung memicu sikap defensif.'
  },
  {
    id: 'R04',
    category: 'REGISTER',
    categoryLabel: 'Ragam Bahasa',
    action: 'Gunakan “kamu” sebagai sapaan utama dalam panduan Menungsa',
    rationale: '“Kamu” dipilih sebagai sapaan utama Menungsa. Sesuaikan dengan hubungan penulis dan pembaca serta konteks layanan.',
    doText: 'Ketika tubuhmu memberi sinyal lelah yang berkepanjangan, dengarkan.',
    doWhy: 'Bicara jujur sebagai pendamping yang menghormati jarak sosial pembaca.',
    dontText: 'Halo bro/cuy, gimana kabar mental lo hari ini? Curhat yuk sama mimin!',
    dontWhy: 'Organisasi yang memaksakan bahasa gaul anak muda terdengar canggung dan tidak autentik.'
  },
  {
    id: 'R05',
    category: 'FRAMING',
    categoryLabel: 'Maskulinitas & Martabat',
    action: 'Jaga pilihan pembaca saat membahas pengalaman pribadi',
    rationale: 'Di ruang publik, hindari meminta pembaca mengungkap pengalaman pribadi. Topik emosi tetap dapat dibahas; sediakan pilihan untuk merespons secara privat.',
    doText: 'Di linimasa publik: bahas pengalaman sehari-hari dan emosi tanpa meminta pembaca menceritakan masalahnya di komentar.',
    doWhy: 'Pembaca dapat mengikuti pembahasan tanpa perlu membagikan pengalaman pribadi.',
    dontText: 'Share di kolom komentar, cerita paling sedih atau aib rumah tangga yang selama ini kamu pendam dari pasanganmu!',
    dontWhy: 'Meminta pembongkaran privasi keluarga di linimasa terbuka yang melanggar batas martabat pria di ruang publik.'
  },
  {
    id: 'R06',
    category: 'AUDIENCE_DEFENSE',
    categoryLabel: 'Ajakan tanpa paksaan',
    action: 'Hindari label "Pria Sejati", "Cowok Alfa", atau kasta maskulinitas',
    rationale: 'Menungsa menghindari label yang menjadikan harga diri laki-laki bergantung pada standar ketangguhan atau pencapaian.',
    doText: 'Menyelesaikan pekerjaan dengan tuntas dan menjaga keluarga tetap aman.',
    doWhy: 'Fokus pada tanggung jawab dan fungsi nyata tanpa embel-embel jargon maskulinitas.',
    dontText: 'Cowok yang bernilai tinggi itu nggak kenal kata menyerah. Buktikan kamu punya mental baja untuk sukses!',
    dontWhy: 'Slogan hustle/manosphere klise yang menekan pembaca dengan tuntutan performa semu.'
  }
];

interface FramingInsight {
  id: 'therapy' | 'skincare' | 'fitness' | 'parenting';
  title: string;
  category: string;
  publicGaze: {
    threatLevel: string;
    threatColor: string;
    culturalContext: string;
    writingStrategy: string;
    exampleDo: string;
    exampleDont: string;
  };
  privateGaze: {
    threatLevel: string;
    threatColor: string;
    culturalContext: string;
    writingStrategy: string;
    exampleDo: string;
    exampleDont: string;
  };
}

const FRAMING_INSIGHTS: Record<'therapy' | 'skincare' | 'fitness' | 'parenting', FramingInsight> = {
  therapy: {
    id: 'therapy',
    title: 'Terapi Psikologis & Konseling',
    category: 'Perilaku yang dianggap rentan',
    publicGaze: {
      threatLevel: 'Sangat sensitif terhadap sorotan sosial',
      threatColor: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
      culturalContext: 'Di ruang publik, sebagian pria dapat merasa lebih berisiko dinilai ketika membicarakan masalah psikologis—misalnya dianggap "lemah", "tidak mampu mengurus diri", atau "kurang beriman". Karena itu, ajakan untuk membuka pengalaman pribadi secara terbuka dapat memicu resistensi.',
      writingStrategy: 'Bingkai pesan melalui manfaat yang konkret, seperti mengelola stres kerja atau memulihkan fokus. Hindari meminta orang membagikan pengalaman pribadi di kolom komentar. Jika ingin mengajak mereka bercerita, arahkan ke kanal privat yang mudah diakses.',
      exampleDo: 'Konsultasi privat untuk membantu mengelola beban pikiran dan kembali fokus, tanpa perlu membagikannya di ruang publik.',
      exampleDont: 'Berani jujur? Ceritakan luka dan masalah mentalmu di kolom komentar.'
    },
    privateGaze: {
      threatLevel: 'Relatif aman & privat',
      threatColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      culturalContext: 'Percakapan privat dapat mengurangi sorotan sosial, tetapi belum tentu langsung terasa aman bagi setiap orang. Jelaskan batas privasi dengan jelas dan hormati pilihan orang untuk belum bercerita.',
      writingStrategy: 'Gunakan bahasa yang tenang. Tanggapi cerita tanpa menilai keberanian, kekuatan, atau harga diri orang yang bercerita.',
      exampleDo: 'Ini ruang privat. Kamu tidak harus langsung bercerita jika belum siap. Kita bisa mulai dari apa yang sedang paling mengganjal hari ini.',
      exampleDont: 'Kalau kamu serius ingin pulih, kamu harus berani membongkar rahasiamu sekarang tanpa ragu.'
    }
  },
  skincare: {
    id: 'skincare',
    title: 'Skincare & Perawatan Diri',
    category: 'Perawatan Diri & Kebersihan',
    publicGaze: {
      threatLevel: 'Perlu kehati-hatian sosial',
      threatColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      culturalContext: 'Dalam sebagian konteks sosial, perawatan kulit masih sering dikaitkan dengan norma gender tertentu. Jangan berasumsi semua pembaca merasa canggung atau memiliki kekhawatiran yang sama.',
      writingStrategy: 'Jelaskan fungsi produk dan cara penggunaannya secara konkret. Hindari janji hasil yang berlebihan atau belum jelas dasarnya.',
      exampleDo: 'Sabun pembersih untuk mengangkat debu jalanan dan minyak setelah seharian di jalan, tanpa rasa perih atau licin.',
      exampleDont: 'Biar tetap kelihatan segar dan makin menarik, cowok juga wajib punya skincare routine.'
    },
    privateGaze: {
      threatLevel: 'Pilihan mandiri & privat',
      threatColor: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
      culturalContext: 'Jelaskan kegunaan produk dan langkah pemakaian agar pembaca bisa menilai kesesuaiannya dengan kebutuhan sendiri.',
      writingStrategy: 'Gunakan panduan langkah demi langkah yang ringkas. Jelaskan bahan aktif dan manfaatnya secara singkat, jelas, dan tidak bertele-tele.',
      exampleDo: 'Dua langkah simpel sehabis mandi: bersihkan muka, lalu pakai pelembap tabir surya sebelum keluar rumah.',
      exampleDont: 'Treatment 10 langkah kecantikan pria modern agar tampil paripurna sepanjang hari.'
    }
  },
  parenting: {
    id: 'parenting',
    title: 'Pengasuhan Anak & Keterlibatan Domestik',
    category: 'Pengasuhan & Keterlibatan Domestik',
    publicGaze: {
      threatLevel: 'Sorotan peran ganda',
      threatColor: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
      culturalContext: 'Di banyak lingkungan urban, keterlibatan ayah dalam pengasuhan makin dihargai. Namun di lingkungan yang lebih tradisional, pria masih bisa dicap "suami takut istri" atau dianggap sekadar "membantu" jika tidak dibingkai secara bermartabat.',
      writingStrategy: 'Gambarkan ayah sebagai orang tua yang ikut bertanggung jawab dalam pengasuhan sehari-hari.',
      exampleDo: 'Hadir mendampingi anak belajar menyelesaikan masalah dan mengelola emosinya sejak dini.',
      exampleDont: 'Suami idaman yang mau bantu-bantu pekerjaan istri dan tidak malu gendong anak di depan umum.'
    },
    privateGaze: {
      threatLevel: 'Refleksi tanggung jawab',
      threatColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      culturalContext: 'Dalam refleksi privat, ayah bisa membawa kecemasan seperti takut belum cukup memenuhi kebutuhan keluarga, rasa bersalah karena waktu kerja yang panjang, atau kebingungan membangun komunikasi dengan anak.',
      writingStrategy: 'Akui bahwa pengasuhan bisa melelahkan. Berikan contoh percakapan sederhana yang membantu ayah hadir dan mendengarkan anak.',
      exampleDo: 'Saat pulang kerja dalam keadaan lelah, sepuluh menit mendengarkan ceritanya tanpa memegang ponsel sudah sangat berarti bagi anakmu.',
      exampleDont: 'Kalau kamu tidak punya waktu untuk anak, jangan mengaku sebagai ayah yang baik.'
    }
  },
  fitness: {
    id: 'fitness',
    title: 'Gym & Latihan Beban Fisik',
    category: 'Aktivitas yang Selaras dengan Norma Maskulin',
    publicGaze: {
      threatLevel: 'Diterima secara sosial',
      threatColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      culturalContext: 'Topik latihan fisik umumnya mudah diterima secara sosial ketika ditujukan kepada pria. Namun jebakannya adalah retorika disiplin ekstrem, glorifikasi "alpha", dan ejekan terhadap tubuh atau kemampuan orang lain.',
      writingStrategy: 'Jelaskan manfaat dan tujuan latihan secara realistis dan berbasis bukti. Hindari mempermalukan bentuk tubuh, kemampuan, atau jeda latihan seseorang.',
      exampleDo: 'Membangun kekuatan otot dan daya tahan jantung agar tetap bugar mendampingi keluarga hingga usia lanjut.',
      exampleDont: 'Hancurkan rasa malasmu, cowok lembek tidak punya masa depan di dunia yang keras ini!'
    },
    privateGaze: {
      threatLevel: 'Pemulihan mandiri',
      threatColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      culturalContext: 'Secara personal, pria bisa bergulat dengan rasa malu karena berat badan, cedera lama, atau kelelahan berkepanjangan akibat beban kerja dan latihan.',
      writingStrategy: 'Akui kebutuhan untuk beristirahat dan pulih. Hindari membingkai jeda latihan sebagai kegagalan pribadi.',
      exampleDo: 'Ketika sendi terasa nyeri atau badan demam, istirahat adalah keputusan yang cerdas, bukan kegagalan disiplin.',
      exampleDont: 'Kalau serius ingin berkembang, jangan jadikan capek atau nyeri sebagai alasan untuk berhenti latihan.'
    }
  }
};

export const VoiceFoundationsView: React.FC<Props> = ({ onNavigate }) => {
  const [activeValueId, setActiveValueId] = useState<string>('V1');
  const [selectedAction, setSelectedAction] = useState<'therapy' | 'skincare' | 'fitness' | 'parenting'>('therapy');
  const [isPublicGaze, setIsPublicGaze] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Semua panduan' },
    { id: 'REGULATION', label: 'Keterbukaan dan privasi' },
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
      {/* Seamless Editorial Hero Banner — Photography as immersive canvas with cinematic scrim */}
      <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-stone-800/90 bg-stone-950 min-h-[480px] sm:min-h-[520px] lg:min-h-[560px] flex flex-col justify-between p-6 sm:p-8 md:p-10 lg:p-12 shadow-2xl">
        {/* Full-bleed background photograph */}
        <img
          src="/brand/menungsa-cover.png"
          alt="Dokumentasi interaksi diskusi autentik Menungsa"
          className="absolute inset-0 w-full h-full object-cover object-[75%_center] lg:object-[80%_center] scale-[1.01] pointer-events-none select-none"
          loading="eager"
        />

        {/* Multi-layer cinematic scrim gradients for AAA legibility */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/90 sm:via-stone-950/80 md:via-stone-950/70 to-stone-950/40 lg:to-stone-950/20 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-stone-950/70 via-transparent to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Top Header Row: Frosted Glass Badge */}
        <div className="relative z-10 flex items-center justify-start">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-950/70 backdrop-blur-md border border-stone-700/60 text-xs font-medium text-amber-300 shadow-xs">
            <Sparkles size={13} className="text-amber-400" />
            <span className="tracking-wide">Panduan Praktis Penulis &amp; Kreator</span>
          </div>
        </div>

        {/* Middle Stage: Editorial Headline & Actions */}
        <div className="relative z-10 my-4 sm:my-6 space-y-4 sm:space-y-5 max-w-2xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif font-medium tracking-tight text-stone-100 leading-[1.12]">
            Cara Menungsa berbicara kepada pembaca
          </h1>

          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-stone-200/90 font-sans max-w-xl text-balance">
            Menungsa berbicara dengan nada <strong className="text-stone-100 font-semibold">tenang, jujur, membumi, dan tidak menggurui</strong>. Hadir sebagai pendamping yang menghormati kedaulatan dan martabat pembaca.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('studio')}
              className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs sm:text-sm transition-all shadow-raised flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Lihat contoh naskah</span>
              <ArrowRight size={15} />
            </button>
            <button
              onClick={() => onNavigate('sandbox')}
              className="px-5 py-3 rounded-xl bg-stone-900/80 hover:bg-stone-800/90 text-stone-200 border border-stone-700/70 backdrop-blur-md font-medium text-xs sm:text-sm transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Periksa draf</span>
            </button>
            <button
              onClick={() => onNavigate('lexicon')}
              className="hidden sm:inline-flex px-4 py-3 rounded-xl bg-stone-950/50 hover:bg-stone-900/70 text-stone-300 border border-stone-800/80 backdrop-blur-md text-xs sm:text-sm transition-all cursor-pointer"
            >
              <span>Pilihan Kata</span>
            </button>
          </div>
        </div>
      </section>

      {/* 6 Core Pillars of Writing */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl md:text-2xl font-serif font-bold text-stone-100">
            Enam prinsip menulis Menungsa
          </h2>
          <p className="text-xs md:text-sm text-stone-400 mt-1 font-sans">
            Prinsip ini menggabungkan temuan riset, pertimbangan editorial, dan nilai Menungsa. Contoh kalimatnya belum diuji pada pembaca Indonesia.
          </p>
        </div>

        {/* Visualizer & 6 Value Selector Cards (2-Column Desktop Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left Column: Value Spectrum Chart */}
          <div className="lg:col-span-7">
            <ValueSpectrum
              values={brandValues}
              selectedId={activeValueId}
              onSelect={(id) => setActiveValueId(id)}
            />
          </div>

          {/* Right Column: 6 Value Selector Cards (2 cols x 3 rows on desktop) */}
          <div className="lg:col-span-5">
            <div role="tablist" aria-label="Enam prinsip menulis" className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-2 gap-2.5">
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
                    className={`p-3 sm:p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[105px] ${
                      isSelected
                        ? 'border-amber-500/70 bg-amber-500/10 text-stone-100 shadow-raised ring-1 ring-amber-500/40'
                        : 'border-stone-800 bg-stone-900/40 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                    }`}
                  >
                    <div className="flex items-start gap-2 mb-1.5">
                      <Icon size={16} className={`shrink-0 mt-0.5 ${isSelected ? 'text-amber-500' : 'text-stone-400'}`} />
                      <div className="font-serif text-sm font-semibold text-stone-100 leading-snug">
                        {val.title}
                      </div>
                    </div>
                    <div className="text-[11px] text-stone-400 pl-6 line-clamp-2 leading-relaxed font-sans">
                      {val.voiceTrait}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Active Value Deep Dive Card */}
        {activeValue && (
          <div
            role="tabpanel"
            id="panel-value-detail"
            aria-labelledby={`tab-value-${activeValue.id}`}
            className="rounded-[9px] border border-stone-800 bg-stone-900/60 p-6 md:p-8 space-y-6 shadow-raised"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3 md:col-span-1 border-b md:border-b-0 md:border-r border-stone-800 pb-4 md:pb-0 md:pr-6">
                <span className="kicker block">
                  Prinsip menulis
                </span>
                <h3 className="text-2xl font-serif font-semibold text-stone-100 leading-tight">{activeValue.title}</h3>
                <p className="text-xs text-amber-500/90 font-sans italic">{activeValue.tagline}</p>
                <p className="text-sm text-stone-300 leading-relaxed font-sans">
                  {activeValue.voiceTrait}
                </p>
                <div className="pt-2">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-stone-400 block mb-1">
                    Mengapa ini penting
                  </span>
                  <p className="text-xs text-stone-300 bg-stone-950/60 p-3 rounded-[6px] border border-stone-800/80 leading-relaxed font-sans">
                    {activeValue.positionNote}
                  </p>
                </div>
              </div>

              <div className="space-y-4 md:col-span-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* DO */}
                  <div className="rounded-[6px] border border-emerald-500/30 bg-emerald-950/25 p-4 space-y-3">
                    <div className="flex items-center gap-2 text-emerald-500 dark:text-emerald-400 text-xs font-sans font-bold uppercase tracking-wider">
                      <CheckCircle2 size={15} />
                      <span>Do</span>
                    </div>
                    {activeValue.dos.map((d, i) => (
                      <div key={i} className="text-xs text-stone-200 border-t border-emerald-900/40 pt-2.5 space-y-1">
                        <div className="font-serif italic text-emerald-800 dark:text-emerald-300 leading-snug">"{d.example}"</div>
                        <div className="text-xs text-stone-300 leading-relaxed font-sans">{d.why}</div>
                      </div>
                    ))}
                  </div>

                  {/* DON'T */}
                  <div className="rounded-[6px] border border-amber-700/30 bg-amber-950/25 p-4 space-y-3">
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-sans font-bold uppercase tracking-wider">
                      <XCircle size={15} />
                      <span>Don't</span>
                    </div>
                    {activeValue.donts.map((d, i) => (
                      <div key={i} className="text-xs text-stone-200 border-t border-amber-900/40 pt-2.5 space-y-1">
                        <div className="font-serif italic text-amber-800 dark:text-amber-300 leading-snug">"{d.example}"</div>
                        <div className="text-xs text-stone-300 leading-relaxed font-sans">{d.why}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-stone-400 bg-stone-950/40 p-3.5 rounded-[6px] border border-stone-800/80 leading-relaxed font-sans">
                  <strong className="text-stone-200">Kapan perlu disesuaikan</strong> {activeValue.boundaryCondition}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 2x2 Framing Matrix & Behavioral Visibility Context */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl md:text-2xl font-serif font-bold text-stone-100">
            Mempertimbangkan norma gender dan ruang publik atau privat
          </h2>
          <p className="text-xs md:text-sm text-stone-400 mt-1 font-sans">
            Model konseptual yang diadaptasi dari Brough dkk. serta White dan Dahl. Penerapannya pada contoh Indonesia adalah usulan editorial, bukan hasil uji pilihan kata di Indonesia.
          </p>
        </div>

        {/* 2-Column Desktop Grid: Fitted Chart on Left, Dynamic Guidance on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          <div className="lg:col-span-7">
            <FramingMatrix
              selectedAction={selectedAction}
              isPublic={isPublicGaze}
              onSelectAction={(id) => setSelectedAction(id)}
              onToggleVisibility={(isPub) => setIsPublicGaze(isPub)}
            />
          </div>

          {/* Dynamic Contextual Copywriting Guidance Card (Right Column) */}
          <div className="lg:col-span-5">
            {(() => {
              const insight = FRAMING_INSIGHTS[selectedAction];
              const gazeInfo = isPublicGaze ? insight.publicGaze : insight.privateGaze;
              return (
                <div className="rounded-xl border border-stone-800 bg-stone-950/80 p-4 sm:p-5 space-y-4 shadow-xl">
                  {/* Card Header */}
                  <div className="space-y-2 border-b border-stone-800/80 pb-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono font-bold uppercase text-amber-500 tracking-wider">
                          PANDUAN PENULISAN
                        </span>
                        <span className="text-stone-500">·</span>
                        <span className="text-[11px] text-stone-400 font-sans">{insight.category}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono border ${gazeInfo.threatColor}`}>
                        {gazeInfo.threatLevel}
                      </span>
                    </div>

                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="text-lg font-serif font-semibold text-stone-100 leading-snug">
                        {insight.title}
                      </h3>
                      <div className="flex items-center gap-1 text-stone-400 text-[11px] font-sans shrink-0">
                        {isPublicGaze ? <Globe size={12} className="text-rose-400" /> : <Lock size={12} className="text-amber-400" />}
                        <span>{isPublicGaze ? 'Publik' : 'Privat'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Context & Strategy */}
                  <div className="space-y-2.5 text-xs font-sans">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block mb-0.5">
                        Hal yang perlu dipertimbangkan
                      </span>
                      <p className="text-stone-300 leading-relaxed">
                        {gazeInfo.culturalContext}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-stone-800/50">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-semibold block mb-0.5">
                        Saran penulisan
                      </span>
                      <p className="text-stone-200 leading-relaxed">
                        {gazeInfo.writingStrategy}
                      </p>
                    </div>
                  </div>

                  {/* Do & Don't Samples */}
                  <div className="space-y-2 pt-1 border-t border-stone-800/50">
                    <div className="rounded-lg bg-emerald-950/25 border border-emerald-500/25 p-2.5 text-xs space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-emerald-400 text-[10.5px]">
                        <CheckCircle2 size={13} />
                        <span>DO</span>
                      </div>
                      <p className="font-serif italic text-emerald-200 leading-snug">
                        "{gazeInfo.exampleDo}"
                      </p>
                    </div>

                    <div className="rounded-lg bg-amber-950/25 border border-amber-700/25 p-2.5 text-xs space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-amber-400 text-[10.5px]">
                        <XCircle size={13} />
                        <span>DON'T</span>
                      </div>
                      <p className="font-serif italic text-amber-200 leading-snug">
                        "{gazeInfo.exampleDont}"
                      </p>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* The Golden Do's & Don'ts Playbook */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-serif font-semibold text-stone-100 flex items-center gap-2">
              <SlidersHorizontal size={18} className="text-amber-500" />
              Panduan singkat menulis
            </h2>
            <p className="text-xs md:text-sm text-stone-400 mt-1 font-sans">
              Gunakan contoh berikut untuk meninjau cara menyapa, mengajak, dan menjelaskan informasi kepada pembaca.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1 rounded-[6px] text-xs font-sans transition cursor-pointer ${
                  selectedCategory === c.id
                    ? 'bg-amber-500 text-[#F1ECDF] font-semibold shadow-raised'
                    : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
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
              className="rounded-[9px] border border-stone-800 bg-stone-900/50 p-5 space-y-4 hover:border-stone-700 transition shadow-raised"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-amber-500">
                    {rule.id} · {rule.categoryLabel}
                  </span>
                  <h3 className="text-base font-serif font-semibold text-stone-100 mt-0.5 leading-snug">
                    {rule.action}
                  </h3>
                </div>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed font-sans">
                {rule.rationale}
              </p>

              <div className="space-y-2 pt-2 border-t border-stone-800/80">
                <div className="rounded-[6px] bg-emerald-950/20 border border-emerald-500/20 p-3 text-xs text-emerald-200 space-y-1.5 font-sans">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-500 dark:text-emerald-400 text-[11px]">
                    <CheckCircle2 size={13} />
                    <span>DO</span>
                  </div>
                  <p className="font-serif italic text-emerald-800 dark:text-emerald-200">"{rule.doText}"</p>
                  <p className="text-xs text-stone-300 leading-relaxed">{rule.doWhy}</p>
                </div>

                <div className="rounded-[6px] bg-amber-950/20 border border-amber-700/20 p-3 text-xs text-amber-200 space-y-1.5 font-sans">
                  <div className="flex items-center gap-1.5 font-bold text-amber-600 dark:text-amber-400 text-[11px]">
                    <XCircle size={13} />
                    <span>DON'T</span>
                  </div>
                  <p className="font-serif italic text-amber-800 dark:text-amber-200">"{rule.dontText}"</p>
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

