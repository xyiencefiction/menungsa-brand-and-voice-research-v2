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
    id: 'V2',
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
    id: 'V3',
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
    id: 'V4',
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
    id: 'V5',
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
    id: 'V6',
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
    dontText: 'Share di kolom komentar, cerita paling sedih atau aib rumah tangga yang selama ini kamu pendam dari pasanganmu!',
    dontWhy: 'Meminta pembongkaran privasi keluarga di linimasa terbuka yang melanggar batas martabat pria di ruang publik.'
  },
  {
    id: 'R06',
    category: 'AUDIENCE_DEFENSE',
    categoryLabel: 'Mencegah Resistensi',
    action: 'Hindari label "Pria Sejati", "Cowok Alfa", atau kasta maskulinitas',
    rationale: 'Label hiper-maskulin langsung dicap sebagai hal yang canggung (cringe) dan manipulatif oleh pria dewasa Indonesia.',
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
    category: 'Perilaku Rentan (Feminine-Coded dalam Kultur Tradisional)',
    publicGaze: {
      threatLevel: 'Sangat Tinggi (High Identity Threat)',
      threatColor: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
      culturalContext: 'Di linimasa terbuka, pria Indonesia menghadapi stigma sosial berat: takut dicap "lemah", "gagal mengurus diri", atau "kurang beriman". Ajakan terbuka untuk curhat di ruang publik memicu penolakan psikologis (reactance).',
      writingStrategy: 'Gunakan bingkai fungsi kerja/daya tahan kognitif ("manajemen stres kerja", "pemulihan fokus"). Jangan meminta pembaca membuka luka batin di kolom komentar; sediakan tautan privat satu-klik langsung ke ruang aman tanpa saksi.',
      exampleDo: 'Konsultasi privat untuk mengurai beban pikiran dan memulihkan stamina kerja. Bebas dari sorotan publik.',
      exampleDont: 'Yuk tumpahkan trauma masa lalumu dan akui kerapuhan mentalmu di kolom komentar ini, Bro!'
    },
    privateGaze: {
      threatLevel: 'Sangat Rendah (Ruang Aman)',
      threatColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      culturalContext: 'Di saluran tertutup (chat WhatsApp privat, ruang konsultasi 1-on-1), penjagaan status sosial luntur. Pria tidak lagi butuh perisai maskulinitas untuk membuktikan ketangguhannya.',
      writingStrategy: 'Turunkan perisai jargon maskulin. Gunakan bahasa yang tenang, bersahaja, tanpa pujian berlebih ("kamu hebat sudah mau terbuka" justru mengingatkan pada ujian yang gagal). Berikan validasi tanpa penghakiman.',
      exampleDo: 'Ini ruang privat. Kamu tidak harus langsung bercerita jika belum siap. Kita bisa mulai dari apa yang sedang paling mengganjal hari ini.',
      exampleDont: 'Cowok bernilai tinggi harus berani runtuhkan ego dan menangis di sesi konseling.'
    }
  },
  skincare: {
    id: 'skincare',
    title: 'Skincare & Perawatan Diri',
    category: 'Perilaku Higienitas (Historically Female-Coded)',
    publicGaze: {
      threatLevel: 'Sedang-Tinggi (Potensi Ejekan Sosial)',
      threatColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      culturalContext: 'Perawatan kulit bagi pria sering dicurigai sebagai perilaku genit atau kemayu bila dikomunikasikan dengan istilah estetika kecantikan (glowing, glass skin, pori-pori halus).',
      writingStrategy: 'Bingkai perawatan diri sebagai higienitas mendasar dan perlindungan fisik fungsional setelah beraktivitas di jalan/lapangan (debu motor, polusi, terik matahari). Anggap seperti sabun mandi atau pasta gigi.',
      exampleDo: 'Sabun pembersih untuk mengangkat debu jalanan dan minyak setelah seharian di jalan, tanpa rasa perih atau licin.',
      exampleDont: 'Rahasia cowok glowing dan memesona agar disukai banyak wanita idaman.'
    },
    privateGaze: {
      threatLevel: 'Rendah (Pilihan Mandiri)',
      threatColor: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
      culturalContext: 'Saat memilih produk secara mandiri di kamar mandi atau e-commerce, pria menghargai kepraktisan teknis dan efisiensi waktu, bukan janji glamor.',
      writingStrategy: 'Gunakan panduan berbasis langkah konkret yang ringkas (misal: 3 menit, 2 produk utama). Jelaskan bahan aktif secara lugas dan fungsi klinisnya tanpa basa-basi.',
      exampleDo: 'Dua langkah simpel sehabis mandi: bersihkan muka, lalu pakai pelembap tabir surya sebelum keluar rumah.',
      exampleDont: 'Treatment 10 langkah kecantikan pria modern agar tampil paripurna sepanjang hari.'
    }
  },
  parenting: {
    id: 'parenting',
    title: 'Pengasuhan Anak & Keterlibatan Domestik',
    category: 'Perilaku Relasional (Transisi Norma Modern)',
    publicGaze: {
      threatLevel: 'Moderat (Sorotan Peran Ganda)',
      threatColor: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
      culturalContext: 'Di masyarakat urban, keterlibatan ayah (involved fatherhood) diapresiasi, namun di ranah sosial yang lebih tradisional, pria masih dicap "suami takut istri" atau sekadar "bantu-bantu momong" jika tidak dibingkai secara bermartabat.',
      writingStrategy: 'Posisikan ayah sebagai pilar kepemimpinan moral dan teladan nyata dalam tumbuh kembang anak, bukan sekadar "asisten ibu" yang butuh disanjung secara berlebihan saat mengganti popok.',
      exampleDo: 'Hadir mendampingi anak belajar menyelesaikan masalah dan mengelola emosinya sejak dini.',
      exampleDont: 'Suami idaman yang mau bantu-bantu pekerjaan istri dan tidak malu gendong anak di depan umum.'
    },
    privateGaze: {
      threatLevel: 'Sangat Rendah (Refleksi Tanggung Jawab)',
      threatColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      culturalContext: 'Dalam refleksi privat, ayah sering memikul kecemasan besar: takut gagal menafkahi secara holistik, rasa bersalah karena waktu kerja yang panjang, dan kebingungan cara berkomunikasi dengan anak remaja.',
      writingStrategy: 'Akui keletihan emosional menjadi kepala keluarga dengan hangat. Berikan panduan percakapan yang praktis untuk diucapkan ayah kepada anaknya di meja makan.',
      exampleDo: 'Saat pulang kerja dalam keadaan lelah, sepuluh menit mendengarkan ceritanya tanpa memegang ponsel sudah sangat berarti bagi anakmu.',
      exampleDont: 'Kalau kamu tidak punya waktu untuk anak, jangan mengaku sebagai ayah yang baik.'
    }
  },
  fitness: {
    id: 'fitness',
    title: 'Gym & Latihan Beban Fisik',
    category: 'Perilaku Budaya Selaras (Masculine-Coded)',
    publicGaze: {
      threatLevel: 'Rendah (High Cultural Alignment)',
      threatColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      culturalContext: 'Latihan fisik adalah domain yang paling diterima secara sosial bagi pria. Namun jebakan terbesarnya adalah retorika "hustle toxic", "alpha grindset", dan penghinaan terhadap mereka yang bertubuh gemuk/lemah.',
      writingStrategy: 'Hindari klise manosphere yang agresif ("no pain no gain", "cowok lembek"). Bingkai latihan kekuatan sebagai investasi stamina jangka panjang untuk merawat keluarga dan menjaga kesehatan mandiri.',
      exampleDo: 'Membangun kekuatan otot dan daya tahan jantung agar tetap bugar mendampingi keluarga hingga usia lanjut.',
      exampleDont: 'Hancurkan rasa malasmu, cowok lembek tidak punya masa depan di dunia yang keras ini!'
    },
    privateGaze: {
      threatLevel: 'Sangat Rendah (Pemulihan & Disiplin Diri)',
      threatColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      culturalContext: 'Secara personal, pria sering bergulat dengan rasa malu karena kelebihan berat badan, cedera sendi menahun, atau kelelahan kronis akibat kerja fisik berlebih.',
      writingStrategy: 'Dorong pemulihan yang realistis, respek terhadap sinyal tubuh yang lelah, dan eliminasi rasa bersalah ketika harus beristirahat dari jadwal latihan.',
      exampleDo: 'Ketika sendi terasa nyeri atau badan demam, istirahat adalah keputusan yang cerdas, bukan kegagalan disiplin.',
      exampleDont: 'Rasa sakit itu ilusi. Jangan pernah skip latihan apa pun alasannya jika kamu pria sejati.'
    }
  }
};

export const VoiceFoundationsView: React.FC<Props> = ({ onNavigate }) => {
  const [activeValueId, setActiveValueId] = useState<string>('V1');
  const [selectedAction, setSelectedAction] = useState<'therapy' | 'skincare' | 'fitness' | 'parenting'>('therapy');
  const [isPublicGaze, setIsPublicGaze] = useState<boolean>(true);
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
            Karakter &amp; Dasar Suara Menungsa
          </h1>

          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-stone-200/90 font-sans max-w-xl text-balance">
            Menungsa berbicara dengan nada <strong className="text-stone-100 font-semibold">tenang, jujur, membumi, dan tidak menggurui</strong>. Hadir sebagai pendamping yang menghormati kedaulatan dan martabat pembaca.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('studio')}
              className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs sm:text-sm transition-all shadow-raised flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Buka Studio Naskah</span>
              <ArrowRight size={15} />
            </button>
            <button
              onClick={() => onNavigate('sandbox')}
              className="px-5 py-3 rounded-xl bg-stone-900/80 hover:bg-stone-800/90 text-stone-200 border border-stone-700/70 backdrop-blur-md font-medium text-xs sm:text-sm transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Uji Kalimat di Lab</span>
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
          <h2 className="text-lg md:text-xl font-serif text-stone-100 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            6 Nilai Utama Menungsa dalam Praktik Menulis
          </h2>
          <p className="text-xs md:text-sm text-stone-400 mt-1 font-sans">
            Enam prinsip nilai yang disintesis langsung dari basis data riset Menungsa, memandu pilihan kata, ritme kalimat, dan batasan etis penulisan.
          </p>
        </div>

        {/* Visualizer: Value Spectrum */}
        <ValueSpectrum
          values={brandValues}
          selectedId={activeValueId}
          onSelect={(id) => setActiveValueId(id)}
        />

        {/* Value selector cards without V1, V2, V6 clutter */}
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
                className={`p-4 rounded-[9px] border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-amber-500/60 bg-amber-500/10 text-stone-100 shadow-raised ring-1 ring-amber-500/30'
                    : 'border-stone-800 bg-stone-900/40 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                }`}
              >
                <div className="flex items-start gap-2.5 mb-2">
                  <Icon size={18} className={`shrink-0 mt-0.5 ${isSelected ? 'text-amber-500' : 'text-stone-400'}`} />
                  <div className="font-serif text-base font-semibold text-stone-100 leading-snug">
                    {val.title}
                  </div>
                </div>
                <div className="text-xs text-stone-400 pl-7 line-clamp-2 leading-relaxed font-sans">
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
            className="rounded-[9px] border border-stone-800 bg-stone-900/60 p-6 md:p-8 space-y-6 shadow-raised"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3 md:col-span-1 border-b md:border-b-0 md:border-r border-stone-800 pb-4 md:pb-0 md:pr-6">
                <span className="kicker block">
                  KARAKTER SUARA & PRINSIP
                </span>
                <h3 className="text-2xl font-serif font-semibold text-stone-100 leading-tight">{activeValue.title}</h3>
                <p className="text-xs text-amber-500/90 font-sans italic">{activeValue.tagline}</p>
                <p className="text-sm text-stone-300 leading-relaxed font-sans">
                  {activeValue.voiceTrait}
                </p>
                <div className="pt-2">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-stone-400 block mb-1">
                    POSISI DALAM NADA MENUNGSA:
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
                  <strong className="text-stone-200">Batas Keberlakuan:</strong> {activeValue.boundaryCondition}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 2x2 Framing Matrix & Behavioral Visibility Context */}
      <section className="space-y-6">
        <div>
          <h2 className="text-lg md:text-xl font-serif text-stone-100 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            Matriks Batas Keberlakuan 2×2: Kapan Pembingkaian Maskulinitas Bekerja vs Bumerang
          </h2>
          <p className="text-xs md:text-sm text-stone-400 mt-1 font-sans">
            Sintesis model konseptual dari Brough dkk. serta White &amp; Dahl: bagaimana interaksi persepsi budaya perilaku dan visibilitas sosial (Gaze) memandu strategi penulisan.
          </p>
        </div>

        <FramingMatrix
          selectedAction={selectedAction}
          isPublic={isPublicGaze}
          onSelectAction={(id) => setSelectedAction(id)}
          onToggleVisibility={(isPub) => setIsPublicGaze(isPub)}
        />

        {/* Dynamic Contextual Copywriting Guidance Card */}
        {(() => {
          const insight = FRAMING_INSIGHTS[selectedAction];
          const gazeInfo = isPublicGaze ? insight.publicGaze : insight.privateGaze;
          return (
            <div className="rounded-[9px] border border-stone-800 bg-stone-900/50 p-6 space-y-5 shadow-raised transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800/80 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase text-amber-500 tracking-wider">
                      Implikasi Penulisan Naskah
                    </span>
                    <span className="text-stone-500">·</span>
                    <span className="text-xs text-stone-400 font-sans">{insight.category}</span>
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-stone-100 mt-1">
                    {insight.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-mono border ${gazeInfo.threatColor}`}>
                    {gazeInfo.threatLevel}
                  </span>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800/70 border border-stone-700/60 text-stone-300 text-xs font-sans">
                    {isPublicGaze ? <Globe size={13} className="text-rose-400" /> : <Lock size={13} className="text-sky-400" />}
                    <span>{isPublicGaze ? 'Ruang Linimasa Publik' : 'Saluran Privat'}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="space-y-3">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400">
                      Realitas Sosial &amp; Hambatan Psikologis:
                    </span>
                    <p className="text-xs text-stone-300 leading-relaxed font-sans">
                      {gazeInfo.culturalContext}
                    </p>
                  </div>
                  <div className="space-y-1 pt-2 border-t border-stone-800/60">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-semibold">
                      Prinsip Solusi Copywriting Menungsa:
                    </span>
                    <p className="text-xs text-stone-200 leading-relaxed font-sans">
                      {gazeInfo.writingStrategy}
                    </p>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div className="rounded-[6px] bg-emerald-950/20 border border-emerald-500/20 p-3 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-500 dark:text-emerald-400 text-[11px]">
                      <CheckCircle2 size={13} />
                      <span>DO</span>
                    </div>
                    <p className="font-serif italic text-emerald-800 dark:text-emerald-200">
                      "{gazeInfo.exampleDo}"
                    </p>
                  </div>

                  <div className="rounded-[6px] bg-amber-950/20 border border-amber-700/20 p-3 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-amber-600 dark:text-amber-400 text-[11px]">
                      <XCircle size={13} />
                      <span>DON'T</span>
                    </div>
                    <p className="font-serif italic text-amber-800 dark:text-amber-200">
                      "{gazeInfo.exampleDont}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* The Golden Do's & Don'ts Playbook */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-serif font-semibold text-stone-100 flex items-center gap-2">
              <SlidersHorizontal size={18} className="text-amber-500" />
              Aturan Emas Penulisan (Do's & Don'ts Playbook)
            </h2>
            <p className="text-xs md:text-sm text-stone-400 mt-1 font-sans">
              Prinsip operasional cepat untuk memastikan naskah Anda bebas dari jebakan bumerang.
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

