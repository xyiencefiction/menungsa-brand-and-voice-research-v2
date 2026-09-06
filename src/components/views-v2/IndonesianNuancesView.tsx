import React, { useState } from 'react';
import { indonesiaContrasts } from '../../data';
import { 
  MapPin, 
  Eye, 
  Lock, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Scale, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const IndonesianNuancesView: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'CONVERGES' | 'DIVERGES'>('all');

  const filteredContrasts = indonesiaContrasts.filter((c) => {
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
        <p className="text-xs md:text-sm text-stone-400 max-w-3xl leading-relaxed">
          Mengapa banyak kampanye komunikasi yang sukses di negara Barat justru gagal total di Indonesia? Panduan ini merangkum batas-batas budaya, risiko sorotan sosial, dan hal-hal yang benar-benar bisa diterapkan di Indonesia.
        </p>
      </div>

      {/* The 3 Golden Cultural Realities */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="rounded-xl border border-stone-800 bg-stone-900/40 p-5 space-y-3">
          <div className="h-9 w-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Eye size={18} />
          </div>
          <h3 className="font-serif text-base font-semibold text-stone-100">
            1. Ruang Publik vs Ruang Privat
          </h3>
          <p className="text-xs text-stone-300 leading-relaxed">
            Pria Indonesia sangat memedulikan status sosial dan pandangan kawan sebaya. Di <strong>ruang publik</strong> (feed Instagram, baliho), pesan harus fokus pada performa fisik, keahlian, dan tanggung jawab. Kerentanan emosional hanya boleh dibicarakan di <strong>ruang privat</strong> (WhatsApp atau obrolan tertutup).
          </p>
        </div>

        {/* Card 2 */}
        <div className="rounded-xl border border-stone-800 bg-stone-900/40 p-5 space-y-3">
          <div className="h-9 w-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <ShieldCheck size={18} />
          </div>
          <h3 className="font-serif text-base font-semibold text-stone-100">
            2. Harga Diri vs Rasa Malu (Isin)
          </h3>
          <p className="text-xs text-stone-300 leading-relaxed">
            Melabeli pria dengan "kamu sedang depresi / kamu rapuh" langsung melucuti martabatnya di hadapan komunitas. Sentuhlah masalah melalui deskripsi rutinitas fisik nyata (misal: sulit tidur, kelelahan kerja) tanpa label diagnosis yang menghakimi.
          </p>
        </div>

        {/* Card 3 */}
        <div className="rounded-xl border border-stone-800 bg-stone-900/40 p-5 space-y-3">
          <div className="h-9 w-9 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
            <Scale size={18} />
          </div>
          <h3 className="font-serif text-base font-semibold text-stone-100">
            3. Aktivitas Bersama Lebih Kuat
          </h3>
          <p className="text-xs text-stone-300 leading-relaxed">
            Pria Indonesia lebih mudah terhubung melalui aktivitas bersama (olahraga rekreasional, ngopi, kerja bakti) daripada sesi "curhat lingkaran emosional". Tempatkan emosi pada irama fisik bersama, bukan pada konfrontasi verbal yang canggung.
          </p>
        </div>
      </div>

      {/* Practical Comparison Table */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-lg md:text-xl font-serif text-stone-100 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              Apa yang Bisa Diterapkan di Indonesia, dan Apa yang Tidak
            </h2>
            <p className="text-xs md:text-sm text-stone-400 mt-1">
              Perbandingan antara temuan literatur global dengan kenyataan lapangan di Indonesia.
            </p>
          </div>

          <div className="flex gap-1.5">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-stone-200 text-stone-950 font-medium'
                  : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              Semua Dimensi
            </button>
            <button
              onClick={() => setActiveFilter('CONVERGES')}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition cursor-pointer ${
                activeFilter === 'CONVERGES'
                  ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-medium'
                  : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              ✓ Berlaku Sama
            </button>
            <button
              onClick={() => setActiveFilter('DIVERGES')}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition cursor-pointer ${
                activeFilter === 'DIVERGES'
                  ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300 font-medium'
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
              className="rounded-xl border border-stone-800 bg-stone-900/40 p-5 space-y-3 hover:border-stone-700 transition"
            >
              <div className="flex items-start justify-between gap-2 border-b border-stone-800 pb-2.5">
                <div>
                  <span className="text-[10px] font-mono uppercase text-stone-500">
                    {item.id}
                  </span>
                  <h4 className="text-sm font-serif font-medium text-stone-100">
                    {item.dimension}
                  </h4>
                </div>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold uppercase ${
                    item.status === 'CONVERGES'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}
                >
                  {item.status === 'CONVERGES' ? 'Berlaku Sama' : 'Berbeda / Hati-hati'}
                </span>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed">
                {item.note}
              </p>

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
