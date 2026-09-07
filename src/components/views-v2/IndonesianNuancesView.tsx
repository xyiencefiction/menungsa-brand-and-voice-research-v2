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
  status: 'CONVERGES' | 'DIVERGES' | 'GAP';
  statusLabel: string;
  north?: number;
  south?: number;
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
    note: 'Komunitas banyak dibahas dalam sumber yang ditelaah, termasuk enam studi Indonesia. Kemunculan tema tidak membuktikan bahwa suatu pilihan kata atau format komunitas efektif.',
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
    note: 'Kondisi ekonomi merupakan bagian penting dalam sumber yang ditelaah. Temuan ini tidak mengukur seberapa berat tekanan ekonomi setiap pembaca.',
    writerImplication: 'Akui persoalan biaya hidup dan akses layanan jika relevan. Jangan menjadikan kemampuan bekerja atau menafkahi sebagai alasan seseorang pantas mendapat bantuan.',
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
    note: 'Tema tuntutan untuk terlihat tangguh muncul dengan frekuensi yang berdekatan dalam kelompok studi Global North dan Global South. Ini bukan ukuran kekuatan norma pada seluruh penduduk Indonesia.',
    writerImplication: 'Akui kebutuhan beristirahat tanpa mengaitkan harga diri dengan ketangguhan atau produktivitas.',
    dos: {
      example: 'Kamu boleh beristirahat meski pekerjaan belum semuanya selesai.',
      why: 'Memberi ruang untuk beristirahat tanpa tuntutan membuktikan produktivitas.'
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
    note: 'Agama dibahas dengan frekuensi berbeda dalam kelompok studi Global North dan Global South. Pengaruhnya terhadap pencarian bantuan dapat berbeda menurut keyakinan dan konteks.',
    writerImplication: 'Gunakan kerangka keagamaan hanya jika sesuai dengan audiens. Jangan menghubungkan keluhan dengan kadar keimanan.',
    dos: {
      example: 'Jika doa penting bagimu, mencari bantuan profesional dapat berjalan bersama kebiasaan itu.',
      why: 'Menghormati keyakinan pembaca tanpa membuat klaim tentang keimanan atau hasil pengobatan.'
    },
    donts: {
      example: 'Masalah jiwamu itu bukan urusan medis, itu bukti kamu kurang beribadah dan jauh dari Tuhan.',
      why: 'Menghakimi keimanan seseorang dan memicu rasa bersalah religius yang melumpuhkan.'
    }
  },
  {
    id: 'KT05',
    dimension: 'Pencarian Bantuan Mandiri vs Peran Keluarga',
    status: 'DIVERGES',
    statusLabel: 'Perbedaan Konteks',
    note: 'Dalam beberapa studi Indonesia, pasangan dan keluarga ikut mengatur akses perawatan. Keterlibatan mereka perlu mempertimbangkan persetujuan dan keamanan orang yang dibantu.',
    writerImplication: 'Sediakan informasi yang juga dapat digunakan orang terdekat untuk membantu, dengan tetap menghormati pilihan pembaca.',
    dos: {
      example: 'Kalau orang terdekatmu tampak kesulitan, kamu bisa bertanya, “Ada yang bisa kubantu hari ini?” Beri ruang jika ia belum ingin bercerita.',
      why: 'Memberi panduan praktis dan suportif bagi orang terdekat tanpa melanggar privasi pria.'
    },
    donts: {
      example: 'Laki-laki dewasa kok apa-apa harus diatur istrinya? Urus sendiri kesehatan mentalmu secara mandiri!',
      why: 'Mengabaikan kultur gotong royong keluarga Indonesia dan menghakimi kemitraan rumah tangga yang sehat.'
    }
  },
  {
    id: 'KT06',
    dimension: 'Tanggung Jawab Nafkah & Tekanan Ekonomi',
    status: 'DIVERGES',
    statusLabel: 'Perbedaan Konteks',
    note: 'Dalam sumber yang ditelaah, peran pencari nafkah terkait dengan aturan, agama, dan adat. Dampaknya pada setiap orang tidak sama; jangan mengubahnya menjadi tuntutan editorial.',
    writerImplication: 'Akui tekanan ekonomi tanpa mengukur harga diri dari penghasilan atau kemampuan menafkahi.',
    dos: {
      example: 'Memikirkan kebutuhan keluarga bisa menguras tenaga. Kebutuhanmu sendiri juga layak diperhatikan.',
      why: 'Mengakui tanggung jawab tanpa menjadikan pengorbanan sebagai syarat harga diri.'
    },
    donts: {
      example: 'Tinggalkan konsep usang kepala keluarga pencari nafkah, itu cuma jebakan patriarki yang merusakmu!',
      why: 'Menyerang peran etis dan hukum yang dipegang teguh pria Indonesia, memicu penolakan ideologis seketika.'
    }
  },
  {
    id: 'KT07',
    dimension: 'Komunitas sebagai Pelindung Sekaligus Pengawas',
    status: 'DIVERGES',
    statusLabel: 'Perbedaan Konteks',
    note: 'Dalam konteks yang dibahas sumber, dukungan komunitas dapat hadir bersama pengawasan sosial. Istilah Jawa seperti rukun, tepa salira, dan isin perlu dijelaskan tanpa dianggap mewakili semua Indonesia.',
    writerImplication: 'Jelaskan siapa yang dapat mengakses informasi peserta, bagaimana data digunakan, dan batas kerahasiaannya sesuai kebijakan layanan.',
    dos: {
      example: 'Sebelum sesi dimulai, kami akan menjelaskan siapa yang dapat mengakses informasi yang kamu bagikan dan batas kerahasiaannya.',
      why: 'Contoh informasi privasi; gunakan hanya jika proses tersebut benar-benar tersedia.'
    },
    donts: {
      example: 'Ayo berani bersuara di depan warga komplek! Jangan takut dicap aneh oleh tetangga sebelah!',
      why: 'Memaksa pria menantang sanksi sosial lingkungan tempat tinggalnya secara gegabah.'
    }
  },
  {
    id: 'KT08',
    dimension: 'Tempat Pertama Mencari Pertolongan',
    status: 'DIVERGES',
    statusLabel: 'Perbedaan Konteks',
    note: 'Sebagian sumber Indonesia membahas penggunaan beberapa bentuk bantuan, termasuk dukungan keluarga, praktik keagamaan, dan layanan kesehatan. Temuan ini tidak menetapkan satu urutan bantuan untuk semua orang.',
    writerImplication: 'Hormati kebiasaan pembaca sambil menjelaskan pilihan layanan dan cara mengaksesnya.',
    dos: {
      example: 'Jika keluhan mengganggu keseharianmu, cari informasi layanan kesehatan yang tersedia di wilayahmu. Periksa jadwal, biaya, dan cara mendaftar.',
      why: 'Menjelaskan langkah mencari informasi tanpa menetapkan masa tunggu atau menjanjikan layanan tertentu.'
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
    statusLabel: 'Perbedaan Konteks',
    note: 'Studi sebaya yang dibahas sumber membedakan teman untuk berkegiatan dan teman untuk berbagi masalah pribadi. Temuan ini tidak menggambarkan semua pertemanan laki-laki Indonesia.',
    writerImplication: 'Tawarkan kegiatan bersama sebagai salah satu pilihan. Jangan mewajibkan peserta menceritakan pengalaman pribadi.',
    dos: {
      example: 'Malam ini kita nobar bola bareng di pos ronda sambil ngopi. Kalau lagi penat kerjaan, cukup duduk santai bareng kawan-kawan tanpa harus ada sesi curhat formal.',
      why: 'Mengajak berkegiatan tanpa mewajibkan peserta mengungkap hal pribadi.'
    },
    donts: {
      example: 'Mumpung lagi kumpul nongkrong, yuk saling buka luka masa lalu dan ceritakan trauma terbesarmu satu per satu!',
      why: 'Merusak suasana nongkrong yang rileks dan menciptakan kecanggungan sosial yang fatal.'
    }
  },
  {
    id: 'KT10',
    dimension: 'Maskulinitas Bukan Hambatan Tunggal',
    status: 'GAP',
    statusLabel: 'Belum Cukup Bukti',
    note: 'Dua studi yang dirangkum mengukur hal berbeda: sikap mencari bantuan dan penggunaan layanan primer. Keduanya tidak menetapkan maskulinitas sebagai hambatan utama di seluruh Indonesia.',
    writerImplication: 'Jelaskan lokasi, jadwal, biaya, dan cara mendaftar yang sudah diverifikasi. Akui hambatan layanan tanpa menyalahkan pembaca.',
    dos: {
      example: 'Untuk berkonsultasi di [nama fasilitas], periksa jadwal, biaya, persyaratan, dan cara mendaftar melalui [tautan resmi].',
      why: 'Template informasi layanan. Isi bagian dalam kurung siku setelah diverifikasi.'
    },
    donts: {
      example: 'Satu-satunya yang menghalangimu berobat adalah egomu sendiri. Buang gengsimu sekarang juga!',
      why: 'Mengabaikan kenyataan antrean panjang, jam kerja kantor yang ketat, dan kesulitan birokrasi faskes.'
    }
  },
  {
    id: 'KT11',
    dimension: 'Pentingnya Kehati-hatian Menulis Kalimat',
    status: 'GAP',
    statusLabel: 'Belum Diuji',
    note: 'Dalam korpus ini tidak ditemukan eksperimen acak yang menguji pilihan kata pada laki-laki dewasa Indonesia. Semua contoh di halaman ini adalah usulan penerapan.',
    writerImplication: 'Periksa pemahaman pembaca dan catat umpan balik. Jangan mengklaim contoh ini telah terbukti efektif.',
    dos: {
      example: 'Sebagian orang merasa lebih lega setelah bertukar pikiran dengan kawan terpercaya, sebagian lainnya butuh waktu sendiri. Temukan tempo yang paling cocok untuk dirimu.',
      why: 'Memberi pilihan tanpa menjanjikan respons yang sama pada semua pembaca.'
    },
    donts: {
      example: 'Tips ampuh ini dijamin 100% melipatgandakan kepercayaan diri dan menghapus depresi seluruh pria Indonesia!',
      why: 'Klaim mutlak tanpa dasar bukti empiris yang merusak integritas dan kredibilitas brand.'
    }
  }
];

export const IndonesianNuancesView: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'CONVERGES' | 'DIVERGES' | 'GAP'>('all');

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
          Menulis untuk pembaca Indonesia
        </h1>
        <p className="text-sm md:text-base text-stone-300 max-w-[74ch] leading-relaxed font-sans">
          Pertimbangkan hubungan sosial, akses layanan, dan keragaman pembaca saat menulis. Panduan ini merangkum temuan yang tersedia beserta batas penerapannya di Indonesia.
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
            Di <strong>ruang publik</strong>, bahas emosi tanpa meminta pembaca membagikan pengalaman pribadi. Jika ada ajakan bercerita, jelaskan siapa yang bisa melihat responsnya dan tawarkan pilihan privat. Ruang tertutup pun tetap memerlukan persetujuan dan batas kerahasiaan yang jelas.
          </p>
        </div>

        {/* Card 2 */}
        <div className="rounded-[9px] border border-stone-800 bg-stone-900/50 p-6 space-y-3 shadow-raised">
          <div className="h-10 w-10 rounded-[6px] bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 dark:text-emerald-400">
            <ShieldCheck size={20} />
          </div>
          <h3 className="font-serif text-lg font-semibold text-stone-100">
            2. Privasi dan Kekhawatiran Dinilai
          </h3>
          <p className="text-xs text-stone-300 leading-relaxed font-sans">
            Jangan menyimpulkan kondisi kesehatan mental pembaca dari jauh. Istilah seperti depresi dapat dibahas sebagai informasi, tanpa menjadikannya penilaian terhadap harga diri seseorang.
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
            Kegiatan bersama dapat menjadi salah satu cara membuka percakapan. Beri peserta pilihan untuk bercerita atau tidak; jangan menganggap kegiatan fisik selalu membuat semua orang nyaman.
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
              Temuan berikut berasal dari sumber dengan populasi dan metode yang berbeda. Contoh kalimat adalah usulan penerapan, bukan hasil eksperimen pilihan kata di Indonesia.
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
              ✓ Pola Serupa
            </button>
            <button
              onClick={() => setActiveFilter('DIVERGES')}
              className={`px-3 py-1.5 rounded-[6px] text-xs font-sans transition cursor-pointer ${
                activeFilter === 'DIVERGES'
                  ? 'bg-amber-500/20 border border-amber-500/40 text-amber-500 dark:text-amber-300 font-semibold'
                  : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              ✕ Perbedaan Konteks
            </button>
            <button
              onClick={() => setActiveFilter('GAP')}
              className={`px-3 py-1.5 rounded-[6px] text-xs font-sans transition cursor-pointer ${
                activeFilter === 'GAP'
                  ? 'bg-sky-500/20 border border-sky-500/40 text-sky-400 font-semibold'
                  : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              ? Belum Cukup Bukti
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
                        : item.status === 'GAP'
                        ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
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
                    Saran untuk penulis
                  </span>
                  <p className="text-stone-200 leading-relaxed font-medium">
                    {item.writerImplication}
                  </p>
                </div>

                {/* Concrete Sentence Examples (Do vs Don't) */}
                <div className="space-y-2.5 pt-1">
                  <span className="text-[10px] font-sans font-bold text-stone-400 uppercase tracking-wider block">
                    Contoh ilustratif
                  </span>
                  
                  {/* DO */}
                  <div className="rounded-[6px] border border-emerald-500/25 bg-emerald-950/20 p-3 space-y-1">
                    <div className="flex items-center gap-1.5 text-emerald-500 dark:text-emerald-400 text-xs font-sans font-bold uppercase">
                      <CheckCircle2 size={13} />
                      <span>Do</span>
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
                      <span>Don't</span>
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
                {item.north !== undefined && item.south !== undefined ? (
                  <>
                    <span title="Frekuensi tema dalam kelompok studi Global North (154 studi)">Studi Global North: <strong className="text-stone-300 font-semibold font-mono">{item.north}%</strong></span>
                    <span title="Frekuensi tema dalam kelompok studi Global South (154 studi)">Studi Global South: <strong className="text-amber-500 font-semibold font-mono">{item.south}%</strong></span>
                  </>
                ) : (
                  <span className="text-[11px] text-stone-500 font-sans italic">
                    Tidak tersedia angka pembanding dalam sumber
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
