import React, { useState } from 'react';
import { 
  MapPin, 
  Eye, 
  ShieldCheck, 
  Scale, 
  AlertCircle
} from 'lucide-react';

interface ContrastItem {
  id: string;
  dimension: string;
  status: 'CONVERGES' | 'DIVERGES';
  statusLabel: string;
  north: number;
  south: number;
  note: string;
  writerImplication: string;
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
    writerImplication: 'Gunakan bingkai kebersamaan dan wadah saling dukung, bukan menyuruh pria berjuang sendirian secara terisolasi.'
  },
  {
    id: 'KT02',
    dimension: 'Realitas Finansial & Beban Ekonomi',
    status: 'CONVERGES',
    statusLabel: 'Berlaku Sama di Indonesia',
    north: 67,
    south: 76,
    note: 'Kondisi material ekonomi mendominasi di mana-mana. Dalam data empiris Indonesia, tekanan finansial dan kebutuhan menafkahi keluarga terbukti menjadi beban yang jauh lebih berat dibanding krisis maskulinitas abstrak.',
    writerImplication: 'Kaitkan kesehatan mental dengan kestabilan nafkah dan kelancaran kerja harian, bukan sekadar perbincangan batin abstrak.'
  },
  {
    id: 'KT03',
    dimension: 'Tuntutan Harus Tangguh & Pantang Lemah',
    status: 'CONVERGES',
    statusLabel: 'Berlaku Sama di Indonesia',
    north: 25,
    south: 24,
    note: 'Satu-satunya norma maskulinitas yang persentasenya hampir identik antara Barat dan Indonesia. Tuntutan untuk terlihat kuat dan ketakutan terlihat lemah di hadapan sesama pria berlaku sama kuatnya di sini.',
    writerImplication: 'Pantang mencela rasa takut mereka; tawarkan pemulihan sebagai bagian dari ketahanan fisik untuk kembali bekerja.'
  },
  {
    id: 'KT04',
    dimension: 'Peran Agama, Takdir & Ikhtiar',
    status: 'DIVERGES',
    statusLabel: 'Berbeda di Indonesia',
    north: 5,
    south: 34,
    note: 'Perbedaan terbesar antara literatur global dan Indonesia. Konsep pasrah takdir terkadang menunda pencarian bantuan medis, namun konsep ikhtiar dan laku spiritual justru menjadikan usaha berobat sebagai bentuk ibadah nyata.',
    writerImplication: 'Hormati nilai religiusitas; bingkai upaya mencari bantuan sebagai bentuk ikhtiar yang mulia, bukan pertanda kurang iman.'
  },
  {
    id: 'KT05',
    dimension: 'Pencarian Bantuan Melalui Pasangan/Keluarga',
    status: 'DIVERGES',
    statusLabel: 'Berbeda di Indonesia',
    north: 45,
    south: 68,
    note: 'Di Barat, pria yang urusan kesehatannya diatur oleh istri kerap dicap tidak mandiri. Namun dalam keluarga Indonesia, hal tersebut merupakan pembagian peran rumah tangga yang sehat dan terbukti efektif menyelamatkan pria.',
    writerImplication: 'Sediakan naskah yang juga dapat dipahami dan dibagikan oleh pasangan, istri, atau anggota keluarga pria.'
  },
  {
    id: 'KT06',
    dimension: 'Tanggung Jawab Nafkah & Kepala Keluarga',
    status: 'DIVERGES',
    statusLabel: 'Berbeda di Indonesia',
    north: 30,
    south: 72,
    note: 'Tanggung jawab nafkah di Indonesia bukan sekadar norma budaya lisan, melainkan dikodifikasi dalam Undang-Undang Perkawinan, ajaran agama (nafkah), dan adat istiadat. Menyerang peran nafkah pria memicu penolakan keras.',
    writerImplication: 'Akui dan hargai kerja keras pria dalam mencari nafkah; jangan pernah meremehkan pengorbanan ekonominya.'
  },
  {
    id: 'KT07',
    dimension: 'Gotong Royong & Pengawasan Sosial',
    status: 'DIVERGES',
    statusLabel: 'Berbeda di Indonesia',
    north: 20,
    south: 65,
    note: 'Gotong royong mewajibkan saling membantu, namun norma rukun dan tepa salira juga menuntut individu untuk tidak merepotkan tetangga. Kepedulian sosial hadir berdampingan dengan risiko penghakiman warga.',
    writerImplication: 'Jaga kerahasiaan identitas dan tawarkan jalur konsultasi yang diskret agar pembaca bebas dari rasa malu sosial (isin).'
  },
  {
    id: 'KT08',
    dimension: 'Fasilitas Pertama yang Dituju',
    status: 'DIVERGES',
    statusLabel: 'Berbeda di Indonesia',
    north: 60,
    south: 22,
    note: 'Jamu tradisional, doa bersama, dan obrolan warung kopi sering kali menjadi tempat pertama yang dituju sebelum fasilitas medis formal. Puskesmas atau dokter spesialis kerap menjadi pilihan terakhir saat keluhan sudah parah.',
    writerImplication: 'Posisikan layanan profesional sebagai pendamping alami dari kebiasaan sehat sehari-hari, bukan konfrontasi terhadap kebiasaan lokal.'
  },
  {
    id: 'KT09',
    dimension: 'Teman Nongkrong vs Teman Curhat',
    status: 'DIVERGES',
    statusLabel: 'Berbeda di Indonesia',
    north: 35,
    south: 58,
    note: 'Pria Indonesia memiliki banyak kawan nongkrong untuk bercanda, tetapi sangat sedikit teman curhat untuk berbagi kerapuhan batin. Menambah jumlah pria dalam satu ruangan tidak otomatis membuat mereka mau bercerita.',
    writerImplication: 'Gunakan aktivitas fisik bersama (olahraga, ngopi, kerja bakti) sebagai jembatan pembuka sebelum mengharapkan keterbukaan emosi.'
  },
  {
    id: 'KT10',
    dimension: 'Maskulinitas Bukan Hambatan Tunggal',
    status: 'CONVERGES',
    statusLabel: 'Berlaku Sama di Indonesia',
    north: 42,
    south: 40,
    note: 'Data empiris di Indonesia menunjukkan bahwa gengsi maskulinitas bukan satu-satunya penghalang; hambatan birokrasi, antrean faskes, dan ketiadaan waktu luang memiliki dampak yang sama besarnya.',
    writerImplication: 'Sediakan solusi logistik yang praktis (lokasi faskes, jam buka, biaya transparan) alih-alih terus menceramahi pola pikir mereka.'
  },
  {
    id: 'KT11',
    dimension: 'Pentingnya Kehati-hatian Menulis Kalimat',
    status: 'DIVERGES',
    statusLabel: 'Batas Riset di Indonesia',
    north: 55,
    south: 10,
    note: 'Belum ada uji klinis acak (RCT) kalimat berskala besar khusus untuk pria Indonesia. Seluruh panduan di situs ini adalah hasil sintesis bukti ilmiah terkalibrasi yang harus terus diverifikasi secara santun di lapangan.',
    writerImplication: 'Tulis naskah dengan kerendahhatian dan ketelitian; dengarkan umpan balik langsung dari komunitas pembaca.'
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
      <div className="border-b border-stone-800 pb-6 space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-mono font-medium text-amber-300">
          <MapPin size={13} />
          <span>KOMPAS BUDAYA INDONESIA</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-serif tracking-tight text-stone-100">
          Navigasi Budaya & Psikologi Pria Indonesia
        </h1>
        <p className="text-xs md:text-sm text-stone-300 max-w-3xl leading-relaxed">
          Mengapa banyak pesan kesehatan mental yang berhasil di negara Barat justru memicu cemoohan di Indonesia? Panduan ini merangkum batas-batas budaya, risiko sorotan publik, dan cara menyapa pria Indonesia secara bermartabat.
        </p>
      </div>

      {/* The 3 Golden Cultural Realities */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="rounded-xl border border-stone-800 bg-stone-900/40 p-6 space-y-3">
          <div className="h-10 w-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Eye size={20} />
          </div>
          <h3 className="font-serif text-base font-semibold text-stone-100">
            1. Ruang Publik vs Ruang Privat
          </h3>
          <p className="text-xs text-stone-300 leading-relaxed">
            Pria Indonesia sangat menjaga status sosial di hadapan kawan sebayanya. Di <strong>ruang publik</strong> (feed media sosial, spanduk, webinar terbuka), naskah harus fokus pada kebugaran fisik, ketrampilan kerja, dan tanggung jawab keluarga. Urusan kerentanan emosional hanya boleh masuk di <strong>ruang privat</strong> (WhatsApp tertutup atau sesi empat mata).
          </p>
        </div>

        {/* Card 2 */}
        <div className="rounded-xl border border-stone-800 bg-stone-900/40 p-6 space-y-3">
          <div className="h-10 w-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <ShieldCheck size={20} />
          </div>
          <h3 className="font-serif text-base font-semibold text-stone-100">
            2. Harga Diri vs Rasa Malu (Isin)
          </h3>
          <p className="text-xs text-stone-300 leading-relaxed">
            Melabeli pria dengan kata-kata seperti "kamu sedang depresi / kamu rapuh" langsung melucuti martabatnya di depan komunitas. Sentuhlah masalah melalui pengamatan fisik yang wajar dialami sehari-hari (misal: jam tidur yang berantakan, kelelahan kerja) tanpa label klinis yang menghakimi.
          </p>
        </div>

        {/* Card 3 */}
        <div className="rounded-xl border border-stone-800 bg-stone-900/40 p-6 space-y-3">
          <div className="h-10 w-10 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
            <Scale size={20} />
          </div>
          <h3 className="font-serif text-base font-semibold text-stone-100">
            3. Aktivitas Fisik Bersama
          </h3>
          <p className="text-xs text-stone-300 leading-relaxed">
            Pria Indonesia jauh lebih mudah terhubung melalui aktivitas fisik bersama (futsal santai, ngopi di teras, kerja bakti) daripada sesi pengakuan emosional terbuka. Emosi pria tertampung dengan aman lewat tugas fisik eksternal, bukan lewat konfrontasi verbal yang canggung.
          </p>
        </div>
      </div>

      {/* Practical Comparison Table */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-lg md:text-xl font-serif text-stone-100 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              Apa yang Bisa Diterapkan di Indonesia, dan Apa yang Berbeda
            </h2>
            <p className="text-xs md:text-sm text-stone-400 mt-1">
              Perbandingan antara temuan literatur global dengan kenyataan psikologis di Indonesia.
            </p>
          </div>

          <div className="flex gap-1.5">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-stone-200 text-stone-950 font-semibold'
                  : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              Semua Dimensi ({INDONESIAN_CONTRASTS.length})
            </button>
            <button
              onClick={() => setActiveFilter('CONVERGES')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition cursor-pointer ${
                activeFilter === 'CONVERGES'
                  ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-semibold'
                  : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              ✓ Berlaku Sama
            </button>
            <button
              onClick={() => setActiveFilter('DIVERGES')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition cursor-pointer ${
                activeFilter === 'DIVERGES'
                  ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300 font-semibold'
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
              className="rounded-xl border border-stone-800 bg-stone-900/40 p-5 md:p-6 space-y-4 hover:border-stone-700 transition"
            >
              <div className="flex items-start justify-between gap-2 border-b border-stone-800 pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase text-amber-400 font-semibold">
                    {item.id}
                  </span>
                  <h4 className="text-base font-serif font-medium text-stone-100 mt-0.5">
                    {item.dimension}
                  </h4>
                </div>
                <span
                  className={`text-[10px] font-mono px-2.5 py-1 rounded font-semibold uppercase shrink-0 ${
                    item.status === 'CONVERGES'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}
                >
                  {item.statusLabel}
                </span>
              </div>

              <p className="text-xs md:text-sm text-stone-300 leading-relaxed">
                {item.note}
              </p>

              <div className="rounded-lg bg-stone-950/70 p-3.5 border border-stone-800/80 text-xs space-y-1">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-semibold block">
                  Implikasi Praktis Bagi Penulis:
                </span>
                <p className="text-stone-200 leading-relaxed font-medium">
                  {item.writerImplication}
                </p>
              </div>

              <div className="pt-2 border-t border-stone-800/60 flex items-center justify-between text-[11px] font-mono text-stone-400">
                <span>Riset Global: {item.north}%</span>
                <span>Konteks Indonesia: {item.south}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
