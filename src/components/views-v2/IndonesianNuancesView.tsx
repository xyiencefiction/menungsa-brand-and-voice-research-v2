import React, { useState } from 'react';
import { 
  MapPin, 
  Eye, 
  ShieldCheck, 
  Scale, 
  CheckCircle2,
  XCircle
} from 'lucide-react';

interface ExamplePair {
  example: string;
  why: string;
}

interface ContrastItem {
  id: string;
  dimension: string;
  status: 'CONVERGES' | 'DIVERGES';
  statusLabel: string;
  north: number;
  south: number;
  note: string;
  writerImplication: string;
  dos: ExamplePair;
  donts: ExamplePair;
}

const INDONESIAN_CONTRASTS: ContrastItem[] = [
  {
    id: 'KT01',
    dimension: 'Komunitas & Kebersamaan Sebaya',
    status: 'CONVERGES',
    statusLabel: 'Berlaku Sama di Indonesia',
    north: 77,
    south: 82,
    note: 'Bobot peran komunitas sangat tinggi baik dalam riset global maupun di Indonesia. Pendekatan berbasis kawan sebaya dan ruang persaudaraan terbukti efektif di lapangan.',
    writerImplication: 'Gunakan bingkai kebersamaan dan wadah saling dukung, bukan menyuruh pria berjuang sendirian secara terisolasi.',
    dos: {
      example: 'Minggu pagi kita sepedaan santai keliling kanal, mampir sarapan bubur ayam di tikungan. Boleh gabung, boleh cuma ikut ngopi.',
      why: 'Mengajak berkumpul melalui aktivitas bersama tanpa beban tuntutan psikologis.'
    },
    donts: {
      example: 'Kamu yang merasa kesepian dan terisolasi, datanglah ke sesi konseling kelompok terbuka ini untuk mencurahkan isi hatimu.',
      why: 'Melabeli pria sebagai sosok kesepian yang menyedihkan dan menuntut keterbukaan di depan orang asing.'
    }
  },
  {
    id: 'KT02',
    dimension: 'Realitas Finansial & Beban Ekonomi',
    status: 'CONVERGES',
    statusLabel: 'Berlaku Sama di Indonesia',
    north: 67,
    south: 76,
    note: 'Kondisi material ekonomi mendominasi di mana-mana. Dalam data empiris Indonesia, tekanan finansial dan kebutuhan menafkahi keluarga terbukti menjadi beban yang jauh lebih berat dibanding krisis maskulinitas abstrak.',
    writerImplication: 'Kaitkan kesehatan mental dengan kestabilan nafkah dan kelancaran kerja harian, bukan sekadar perbincangan batin abstrak.',
    dos: {
      example: 'Mencukupi belanja dapur dan cicilan setiap akhir bulan memang menguras banyak tenaga dan pikiran. Wajar kalau badanmu butuh istirahat sejenak malam ini.',
      why: 'Menghormati perjuangan nafkah konkret tanpa mereduksinya menjadi istilah batin yang abstrak.'
    },
    donts: {
      example: 'Singkirkan dulu urusan uangmu, fokuslah pada self-love dan ketenangan batinmu terlebih dahulu.',
      why: 'Meremehkan kenyataan hidup dan terdengar elitis bagi pria yang menanggung beban ekonomi keluarga.'
    }
  },
  {
    id: 'KT03',
    dimension: 'Tuntutan Harus Tangguh & Pantang Lemah',
    status: 'CONVERGES',
    statusLabel: 'Berlaku Sama di Indonesia',
    north: 25,
    south: 24,
    note: 'Satu-satunya norma maskulinitas yang persentasenya hampir identik antara Barat dan Indonesia. Tuntutan untuk terlihat kuat dan ketakutan terlihat lemah di hadapan sesama pria berlaku sama kuatnya di sini.',
    writerImplication: 'Pantang mencela rasa takut mereka; tawarkan pemulihan sebagai bagian dari ketahanan fisik untuk kembali bekerja.',
    dos: {
      example: 'Mesin diesel paling tangguh pun perlu ganti oli dan didinginkan agar tidak mogok di jalan. Istirahat malam ini adalah persiapan agar besok kamu bisa kembali bekerja dengan prima.',
      why: 'Membingkai istirahat sebagai perawatan ketahanan fungsional, bukan pertanda kerapuhan atau menyerah.'
    },
    donts: {
      example: 'Laki-laki kok takut mengeluh? Jangan sok kuat deh, ayo buang gengsimu dan menangislah sekarang!',
      why: 'Menggurui, mencela harga diri pria, dan menuntut kerapuhan secara agresif.'
    }
  },
  {
    id: 'KT04',
    dimension: 'Peran Agama, Takdir & Ikhtiar',
    status: 'DIVERGES',
    statusLabel: 'Berbeda di Indonesia',
    north: 5,
    south: 34,
    note: 'Perbedaan terbesar antara literatur global dan Indonesia. Konsep pasrah takdir terkadang menunda pencarian bantuan medis, namun konsep ikhtiar dan laku spiritual justru menjadikan usaha berobat sebagai bentuk ibadah nyata.',
    writerImplication: 'Hormati nilai religiusitas; bingkai upaya mencari bantuan sebagai bentuk ikhtiar yang mulia, bukan pertanda kurang iman.',
    dos: {
      example: 'Berdoa dan berserah diri itu menguatkan batin, dan memeriksakan diri ke dokter atau tenaga profesional adalah ikhtiar nyata yang menyempurnakannya.',
      why: 'Menyelaraskan doa spiritual dengan tindakan medis sebagai dua bentuk ikhtiar yang saling melengkapi.'
    },
    donts: {
      example: 'Masalah jiwamu itu bukan urusan medis, itu bukti kamu kurang beribadah dan jauh dari Tuhan.',
      why: 'Menghakimi keimanan seseorang dan memicu rasa bersalah religius yang melumpuhkan.'
    }
  },
  {
    id: 'KT05',
    dimension: 'Pencarian Bantuan Melalui Pasangan/Keluarga',
    status: 'DIVERGES',
    statusLabel: 'Berbeda di Indonesia',
    north: 45,
    south: 68,
    note: 'Di Barat, pria yang urusan kesehatannya diatur oleh istri kerap dicap tidak mandiri. Namun dalam keluarga Indonesia, hal tersebut merupakan pembagian peran rumah tangga yang sehat dan terbukti efektif menyelamatkan pria.',
    writerImplication: 'Sediakan naskah yang juga dapat dipahami dan dibagikan oleh pasangan, istri, atau anggota keluarga pria.',
    dos: {
      example: 'Bagi para istri atau kawan terdekat: jika melihat pasanganmu mulai sulit tidur dan pundaknya tegang karena beban kerja, sediakan segelas teh hangat tanpa perlu langsung mendesaknya bercerita.',
      why: 'Memberi panduan praktis dan suportif bagi orang terdekat tanpa melanggar privasi pria.'
    },
    donts: {
      example: 'Laki-laki dewasa kok apa-apa harus diatur istrinya? Urus sendiri kesehatan mentalmu secara mandiri!',
      why: 'Mengabaikan kultur gotong royong keluarga Indonesia dan menghakimi kemitraan rumah tangga yang sehat.'
    }
  },
  {
    id: 'KT06',
    dimension: 'Tanggung Jawab Nafkah & Kepala Keluarga',
    status: 'DIVERGES',
    statusLabel: 'Berbeda di Indonesia',
    north: 30,
    south: 72,
    note: 'Tanggung jawab nafkah di Indonesia bukan sekadar norma budaya lisan, melainkan dikodifikasi dalam Undang-Undang Perkawinan, ajaran agama (nafkah), dan adat istiadat. Menyerang peran nafkah pria memicu penolakan keras.',
    writerImplication: 'Akui dan hargai kerja keras pria dalam mencari nafkah; jangan pernah meremehkan pengorbanan ekonominya.',
    dos: {
      example: 'Keringat yang kamu keluarkan setiap hari untuk anak dan istri adalah bentuk pengabdian yang bernilai. Menjaga fisikmu tetap sehat adalah bagian dari ikhtiar merawat mereka.',
      why: 'Memvalidasi kehormatan peran nafkah sebagai landasan untuk menjaga kesehatan diri.'
    },
    donts: {
      example: 'Tinggalkan konsep usang kepala keluarga pencari nafkah, itu cuma jebakan patriarki yang merusakmu!',
      why: 'Menyerang peran etis dan hukum yang dipegang teguh pria Indonesia, memicu penolakan ideologis seketika.'
    }
  },
  {
    id: 'KT07',
    dimension: 'Gotong Royong & Pengawasan Sosial',
    status: 'DIVERGES',
    statusLabel: 'Berbeda di Indonesia',
    north: 20,
    south: 65,
    note: 'Gotong royong mewajibkan saling membantu, namun norma rukun dan tepa salira juga menuntut individu untuk tidak merepotkan tetangga. Kepedulian sosial hadir berdampingan dengan risiko penghakiman warga.',
    writerImplication: 'Jaga kerahasiaan identitas dan tawarkan jalur konsultasi yang diskret agar pembaca bebas dari rasa malu sosial (isin).',
    dos: {
      example: 'Seluruh data konsultasi dan obrolan tersimpan secara rahasia. Tanpa kamera, nama disamarkan, dan privasimu dari lingkungan sekitar terjamin sepenuhnya.',
      why: 'Menghilangkan rasa takut akan gosip tetangga atau pengawasan sosial lingkungan (isin).'
    },
    donts: {
      example: 'Ayo berani bersuara di depan warga komplek! Jangan takut dicap aneh oleh tetangga sebelah!',
      why: 'Memaksa pria menantang sanksi sosial lingkungan tempat tinggalnya secara gegabah.'
    }
  },
  {
    id: 'KT08',
    dimension: 'Fasilitas Pertama yang Dituju',
    status: 'DIVERGES',
    statusLabel: 'Berbeda di Indonesia',
    north: 60,
    south: 22,
    note: 'Jamu tradisional, doa bersama, dan obrolan warung kopi sering kali menjadi tempat pertama yang dituju sebelum fasilitas medis formal. Puskesmas atau dokter spesialis kerap menjadi pilihan terakhir saat keluhan sudah parah.',
    writerImplication: 'Posisikan layanan profesional sebagai pendamping alami dari kebiasaan sehat sehari-hari, bukan konfrontasi terhadap kebiasaan lokal.',
    dos: {
      example: 'Kalau badanmu pegal dan tidur tidak nyenyak, mulailah dengan minum wedang jahe hangat dan jalan santai. Jika lelah tak kunjung reda setelah dua minggu, ada layanan dokter di puskesmas terdekat yang siap membantu.',
      why: 'Menjembatani kebiasaan herbal/lokal menuju faskes formal secara alami tanpa meremehkan kearifan lokal.'
    },
    donts: {
      example: 'Jamu dan obat tradisional itu tidak ilmiah dan tak berguna. Langsung pergi ke psikiater spesialis sekarang!',
      why: 'Arogan, meremehkan kebiasaan turun-temurun, dan membuat biaya pencarian bantuan terasa sangat mahal.'
    }
  },
  {
    id: 'KT09',
    dimension: 'Teman Nongkrong vs Teman Curhat',
    status: 'DIVERGES',
    statusLabel: 'Berbeda di Indonesia',
    north: 35,
    south: 58,
    note: 'Pria Indonesia memiliki banyak kawan nongkrong untuk bercanda, tetapi sangat sedikit teman curhat untuk berbagi kerapuhan batin. Menambah jumlah pria dalam satu ruangan tidak otomatis membuat mereka mau bercerita.',
    writerImplication: 'Gunakan aktivitas fisik bersama (olahraga, ngopi, kerja bakti) sebagai jembatan pembuka sebelum mengharapkan keterbukaan emosi.',
    dos: {
      example: 'Malam ini kita nobar bola bareng di pos ronda sambil ngopi. Kalau lagi penat kerjaan, cukup duduk santai bareng kawan-kawan tanpa harus ada sesi curhat formal.',
      why: 'Memanfaatkan kebersamaan sebaya (side-by-side) yang nyaman tanpa paksaan membuka aib.'
    },
    donts: {
      example: 'Mumpung lagi kumpul nongkrong, yuk saling buka luka masa lalu dan ceritakan trauma terbesarmu satu per satu!',
      why: 'Merusak suasana nongkrong yang rileks dan menciptakan kecanggungan sosial yang fatal.'
    }
  },
  {
    id: 'KT10',
    dimension: 'Maskulinitas Bukan Hambatan Tunggal',
    status: 'CONVERGES',
    statusLabel: 'Berlaku Sama di Indonesia',
    north: 42,
    south: 40,
    note: 'Data empiris di Indonesia menunjukkan bahwa gengsi maskulinitas bukan satu-satunya penghalang; hambatan birokrasi, antrean faskes, dan ketiadaan waktu luang memiliki dampak yang sama besarnya.',
    writerImplication: 'Sediakan solusi logistik yang praktis (lokasi faskes, jam buka, biaya transparan) alih-alih terus menceramahi pola pikir mereka.',
    dos: {
      example: 'Layanan konsultasi di puskesmas buka setiap hari kerja pukul 08.00–14.00, gratis dengan BPJS. Cukup bawa KTP dan daftar di loket umum.',
      why: 'Menyediakan informasi logistik praktis, kepastian jam, dan kemudahan biaya yang langsung menyelesaikan hambatan nyata.'
    },
    donts: {
      example: 'Satu-satunya yang menghalangimu berobat adalah egomu sendiri. Buang gengsimu sekarang juga!',
      why: 'Mengabaikan kenyataan antrean panjang, jam kerja kantor yang ketat, dan kesulitan birokrasi faskes.'
    }
  },
  {
    id: 'KT11',
    dimension: 'Pentingnya Kehati-hatian Menulis Kalimat',
    status: 'DIVERGES',
    statusLabel: 'Batas Riset di Indonesia',
    north: 55,
    south: 10,
    note: 'Belum ada uji klinis acak (RCT) kalimat berskala besar khusus untuk pria Indonesia. Seluruh panduan di situs ini adalah hasil sintesis bukti ilmiah terkalibrasi yang harus terus diverifikasi secara santun di lapangan.',
    writerImplication: 'Tulis naskah dengan kerendahhatian dan ketelitian; dengarkan umpan balik langsung dari komunitas pembaca.',
    dos: {
      example: 'Sebagian orang merasa lebih lega setelah bertukar pikiran dengan kawan terpercaya, sebagian lainnya butuh waktu sendiri. Temukan tempo yang paling cocok untuk dirimu.',
      why: 'Terkalibrasi secara ilmiah, jujur pada variasi respons manusia, dan menghormati ritme individu.'
    },
    donts: {
      example: 'Tips ampuh ini dijamin 100% melipatgandakan kepercayaan diri dan menghapus depresi seluruh pria Indonesia!',
      why: 'Klaim mutlak tanpa dasar bukti empiris yang merusak integritas dan kredibilitas brand.'
    }
  }
];

export const IndonesianNuancesView: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'CONVERGES' | 'DIVERGES'>('all');

  const filteredContrasts = INDONESIAN_CONTRASTS.filter((c) => {
    if (activeFilter === 'all') return true;
    return c.status === activeFilter;
  });

  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div className="space-y-3">
        <div className="kicker flex items-center gap-1.5">
          <MapPin size={12} className="text-amber-500" />
          <span>KOMPAS BUDAYA INDONESIA</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-semibold tracking-tight text-stone-100 leading-tight">
          Navigasi Budaya & Psikologi Pria Indonesia
        </h1>
        <p className="text-sm md:text-base text-stone-300 max-w-[74ch] leading-relaxed font-sans">
          Mengapa banyak pesan kesehatan mental yang berhasil di negara Barat justru memicu cemoohan di Indonesia? Panduan ini merangkum batas-batas budaya, risiko sorotan publik, dan cara menyapa pria Indonesia secara bermartabat.
        </p>
      </div>

      {/* The 3 Golden Cultural Realities */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="rounded-[9px] border border-stone-800 bg-stone-900/50 p-6 space-y-3 shadow-raised">
          <div className="h-10 w-10 rounded-[6px] bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
            <Eye size={20} />
          </div>
          <h3 className="font-serif text-lg font-semibold text-stone-100">
            1. Ruang Publik vs Ruang Privat
          </h3>
          <p className="text-xs text-stone-300 leading-relaxed font-sans">
            Pria Indonesia sangat menjaga status sosial di hadapan kawan sebayanya. Di <strong>ruang publik</strong> (feed media sosial, spanduk, webinar terbuka), naskah harus fokus pada kebugaran fisik, ketrampilan kerja, dan tanggung jawab keluarga. Urusan kerentanan emosional hanya boleh masuk di <strong>ruang privat</strong> (WhatsApp tertutup atau sesi empat mata).
          </p>
        </div>

        {/* Card 2 */}
        <div className="rounded-[9px] border border-stone-800 bg-stone-900/50 p-6 space-y-3 shadow-raised">
          <div className="h-10 w-10 rounded-[6px] bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 dark:text-emerald-400">
            <ShieldCheck size={20} />
          </div>
          <h3 className="font-serif text-lg font-semibold text-stone-100">
            2. Harga Diri vs Rasa Malu (Isin)
          </h3>
          <p className="text-xs text-stone-300 leading-relaxed font-sans">
            Melabeli pria dengan kata-kata seperti "kamu sedang depresi / kamu rapuh" langsung melucuti martabatnya di depan komunitas. Sentuhlah masalah melalui pengamatan fisik yang wajar dialami sehari-hari (misal: jam tidur yang berantakan, kelelahan kerja) tanpa label klinis yang menghakimi.
          </p>
        </div>

        {/* Card 3 */}
        <div className="rounded-[9px] border border-stone-800 bg-stone-900/50 p-6 space-y-3 shadow-raised">
          <div className="h-10 w-10 rounded-[6px] bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-500 dark:text-sky-400">
            <Scale size={20} />
          </div>
          <h3 className="font-serif text-lg font-semibold text-stone-100">
            3. Aktivitas Fisik Bersama
          </h3>
          <p className="text-xs text-stone-300 leading-relaxed font-sans">
            Pria Indonesia jauh lebih mudah terhubung melalui aktivitas fisik bersama (futsal santai, ngopi di teras, kerja bakti) daripada sesi pengakuan emosional terbuka. Emosi pria tertampung dengan aman lewat tugas fisik eksternal, bukan lewat konfrontasi verbal yang canggung.
          </p>
        </div>
      </div>

      {/* Practical Comparison Table */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-serif font-semibold text-stone-100 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              Apa yang Bisa Diterapkan di Indonesia, dan Apa yang Berbeda
            </h2>
            <p className="text-xs md:text-sm text-stone-400 mt-1 font-sans">
              Perbandingan antara temuan literatur global dengan kenyataan psikologis di Indonesia, lengkap dengan contoh penerapan kalimat nyata. Persentase mengukur bobot kemunculan tema dalam korpus riset masing-masing wilayah.
            </p>
          </div>

          <div className="flex gap-1.5">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-[6px] text-xs font-sans transition cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-amber-500 text-[#F1ECDF] font-semibold shadow-raised'
                  : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              Semua Dimensi ({INDONESIAN_CONTRASTS.length})
            </button>
            <button
              onClick={() => setActiveFilter('CONVERGES')}
              className={`px-3 py-1.5 rounded-[6px] text-xs font-sans transition cursor-pointer ${
                activeFilter === 'CONVERGES'
                  ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-500 dark:text-emerald-300 font-semibold'
                  : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              ✓ Berlaku Sama
            </button>
            <button
              onClick={() => setActiveFilter('DIVERGES')}
              className={`px-3 py-1.5 rounded-[6px] text-xs font-sans transition cursor-pointer ${
                activeFilter === 'DIVERGES'
                  ? 'bg-amber-500/20 border border-amber-500/40 text-amber-500 dark:text-amber-300 font-semibold'
                  : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              ✕ Berbeda di Indonesia
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredContrasts.map((item) => (
            <div
              key={item.id}
              className="rounded-[9px] border border-stone-800 bg-stone-900/50 p-5 md:p-6 space-y-4 hover:border-stone-700 transition flex flex-col justify-between shadow-raised"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2 border-b border-stone-800 pb-3">
                  <div>
                    <span className="text-[10px] font-sans font-bold uppercase text-amber-500 tracking-wider">
                      {item.id}
                    </span>
                    <h4 className="text-lg font-serif font-semibold text-stone-100 mt-0.5">
                      {item.dimension}
                    </h4>
                  </div>
                  <span
                    className={`text-[10px] font-sans px-2.5 py-1 rounded-[6px] font-bold uppercase shrink-0 tracking-wider ${
                      item.status === 'CONVERGES'
                        ? 'bg-emerald-500/20 text-emerald-500 dark:text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-500 dark:text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {item.statusLabel}
                  </span>
                </div>

                <p className="text-xs md:text-sm text-stone-300 leading-relaxed font-sans">
                  {item.note}
                </p>

                <div className="rounded-[6px] bg-stone-950/70 p-3.5 border border-stone-800/80 text-xs space-y-1 font-sans">
                  <span className="kicker block">
                    Implikasi Praktis Bagi Penulis:
                  </span>
                  <p className="text-stone-200 leading-relaxed font-medium">
                    {item.writerImplication}
                  </p>
                </div>

                {/* Concrete Sentence Examples (Do vs Don't) */}
                <div className="space-y-2.5 pt-1">
                  <span className="text-[10px] font-sans font-bold text-stone-400 uppercase tracking-wider block">
                    Contoh Penerapan Kalimat:
                  </span>
                  
                  {/* DO */}
                  <div className="rounded-[6px] border border-emerald-500/25 bg-emerald-950/20 p-3 space-y-1">
                    <div className="flex items-center gap-1.5 text-emerald-500 dark:text-emerald-400 text-xs font-sans font-bold uppercase">
                      <CheckCircle2 size={13} />
                      <span>Yang Dianjurkan (Do)</span>
                    </div>
                    <p className="font-serif italic text-xs md:text-sm text-emerald-800 dark:text-emerald-200 leading-relaxed">
                      "{item.dos.example}"
                    </p>
                    <p className="text-xs text-stone-300 leading-relaxed font-sans">
                      {item.dos.why}
                    </p>
                  </div>

                  {/* DON'T */}
                  <div className="rounded-[6px] border border-amber-700/25 bg-amber-950/20 p-3 space-y-1">
                    <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 text-xs font-sans font-bold uppercase">
                      <XCircle size={13} />
                      <span>Yang Berisiko / Dilarang (Don't)</span>
                    </div>
                    <p className="font-serif italic text-xs md:text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
                      "{item.donts.example}"
                    </p>
                    <p className="text-xs text-stone-300 leading-relaxed font-sans">
                      {item.donts.why}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-800/60 flex items-center justify-between text-xs font-sans text-stone-400">
                <span title="Bobot frekuensi tema dalam korpus riset global">Bobot Riset Global: <strong className="text-stone-300 font-semibold font-mono">{item.north}%</strong></span>
                <span title="Bobot frekuensi tema dalam konteks Indonesia">Konteks Indonesia: <strong className="text-amber-500 font-semibold font-mono">{item.south}%</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
