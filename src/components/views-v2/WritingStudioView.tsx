import React, { useState, useMemo } from 'react';
import { toneExemplars, toneContexts } from '../../data';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  SlidersHorizontal
} from 'lucide-react';

export const WritingStudioView: React.FC = () => {
  const [selectedChannel, setSelectedChannel] = useState<string>('all');
  const [selectedContext, setSelectedContext] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const channelsList = [
    { id: 'all', label: 'Semua Format', icon: SlidersHorizontal },
    { id: 'social', label: '📱 Feed & Carousel Medsos', match: ['Social', 'Feed', 'Carousel', 'Reflection'] },
    { id: 'chat', label: '💬 WhatsApp & Komunitas', match: ['WhatsApp', 'Broadcast', 'Community', 'Note'] },
    { id: 'campaign', label: '📢 Kampanye & Iklan', match: ['Campaign', 'Poster', 'Announcement', 'Ad'] },
    { id: 'guide', label: '🏥 Panduan Layanan & Faskes', match: ['Guide', 'Clinical', 'Health', 'Debrief'] },
    { id: 'crisis', label: '🚨 Krisis & De-eskalasi', match: ['Crisis', 'Support', 'First-Person'] },
  ];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredExemplars = useMemo(() => {
    return toneExemplars.filter((ex) => {
      // Channel filter
      if (selectedChannel !== 'all') {
        const activeFilter = channelsList.find((c) => c.id === selectedChannel);
        if (activeFilter?.match) {
          const matched = activeFilter.match.some((m) => 
            ex.channel.toLowerCase().includes(m.toLowerCase())
          );
          if (!matched) return false;
        }
      }

      // Context filter
      if (selectedContext !== 'all' && ex.contextId !== selectedContext) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inCopy = ex.worked.copy.toLowerCase().includes(q) || ex.weak.copy.toLowerCase().includes(q);
        const inRationale = ex.rationale.toLowerCase().includes(q);
        const inChannel = ex.channel.toLowerCase().includes(q);
        if (!inCopy && !inRationale && !inChannel) return false;
      }

      return true;
    });
  }, [selectedChannel, selectedContext, searchQuery]);

  return (
    <div className="space-y-8 pb-16">
      {/* Studio Header */}
      <div className="border-b border-stone-800 pb-6 space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-mono font-medium text-amber-300">
          <Sparkles size={13} />
          <span>PUSTAKA CONTOH TULISAN NYATA</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-serif tracking-tight text-stone-100">
          Studio Kalimat & Contoh Naskah Terkalibrasi
        </h1>
        <p className="text-xs md:text-sm text-stone-400 max-w-3xl leading-relaxed">
          Kumpulan draf nyata siap pakai yang mematuhi batas linguistik dan psikologi pria Indonesia. Setiap contoh menyandingkan versi bumerang yang sering salah kaprah dengan versi terkalibrasi Menungsa yang aman dan bermartabat.
        </p>
      </div>

      {/* Control Bar: Format Filters & Search */}
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Format Chips */}
          <div className="flex flex-wrap gap-1.5">
            {channelsList.map((ch) => (
              <button
                key={ch.id}
                onClick={() => setSelectedChannel(ch.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-sans transition cursor-pointer flex items-center gap-1.5 ${
                  selectedChannel === ch.id
                    ? 'bg-amber-500 text-stone-950 font-semibold shadow-sm'
                    : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700'
                }`}
              >
                <span>{ch.label}</span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kata kunci kalimat..."
              className="w-full rounded-lg border border-stone-800 bg-stone-900/70 pl-8.5 pr-3 py-1.5 text-xs text-stone-200 placeholder-stone-500 focus:border-amber-500/60 focus:outline-none"
            />
          </div>
        </div>

        {/* Context Selector Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono text-stone-400">
          <span className="shrink-0 text-stone-500">Konteks Situasi:</span>
          <button
            onClick={() => setSelectedContext('all')}
            className={`px-2 py-0.5 rounded cursor-pointer shrink-0 ${
              selectedContext === 'all'
                ? 'bg-stone-800 text-stone-100 font-medium'
                : 'hover:text-stone-300'
            }`}
          >
            Semua ({toneExemplars.length})
          </button>
          {toneContexts.slice(0, 10).map((ctx) => (
            <button
              key={ctx.context_id}
              onClick={() => setSelectedContext(ctx.context_id)}
              className={`px-2 py-0.5 rounded cursor-pointer shrink-0 ${
                selectedContext === ctx.context_id
                  ? 'bg-stone-800 text-stone-100 font-medium'
                  : 'hover:text-stone-300'
              }`}
            >
              {ctx.context_id} · {ctx.context}
            </button>
          ))}
        </div>
      </div>

      {/* Exemplar Cards Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filteredExemplars.length === 0 ? (
          <div className="rounded-xl border border-dashed border-stone-800 p-12 text-center text-stone-500 text-xs">
            Tidak ada contoh naskah yang cocok dengan pencarian atau filter yang dipilih.
          </div>
        ) : (
          filteredExemplars.map((ex) => {
            const isCopied = copiedId === ex.id;
            const ctxInfo = toneContexts.find((c) => c.context_id === ex.contextId);

            return (
              <div
                key={ex.id}
                className="rounded-xl border border-stone-800 bg-stone-900/40 p-5 md:p-6 space-y-4 hover:border-stone-700/80 transition"
              >
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800/80 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-amber-500/10 px-2 py-0.5 text-[11px] font-mono font-medium text-amber-400 border border-amber-500/20">
                      {ex.channel}
                    </span>
                    {ctxInfo && (
                      <span className="text-[11px] font-mono text-stone-400">
                        {ctxInfo.context_id}: {ctxInfo.context}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-stone-500 uppercase">
                    ID: {ex.id}
                  </span>
                </div>

                {/* Comparison Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Calibrated / Worked */}
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 space-y-3 relative group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-mono font-semibold uppercase">
                        <CheckCircle2 size={15} />
                        <span>Gaya Suara Menungsa (Terkalibrasi)</span>
                      </div>
                      <button
                        onClick={() => handleCopy(ex.worked.copy, ex.id)}
                        className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 transition cursor-pointer border border-emerald-500/30"
                        title="Salin ke clipboard"
                      >
                        {isCopied ? (
                          <>
                            <Check size={12} />
                            <span>Tersalin!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={12} />
                            <span>Salin Teks</span>
                          </>
                        )}
                      </button>
                    </div>

                    <blockquote className="font-serif text-sm md:text-base leading-relaxed text-stone-100 italic">
                      "{ex.worked.copy}"
                    </blockquote>
                  </div>

                  {/* Weak / Common Anti-Pattern */}
                  <div className="rounded-xl border border-rose-500/20 bg-rose-950/20 p-4 space-y-3">
                    <div className="flex items-center gap-1.5 text-rose-400 text-xs font-mono font-semibold uppercase">
                      <AlertTriangle size={15} />
                      <span>Anti-Pola Umum (Bumerang / Cringe)</span>
                    </div>

                    <blockquote className="font-serif text-sm leading-relaxed text-stone-300 italic">
                      "{ex.weak.copy}"
                    </blockquote>
                  </div>
                </div>

                {/* Linguistic Rationale */}
                <div className="rounded-lg bg-stone-950/60 p-3.5 border border-stone-800/80 text-xs text-stone-300 space-y-1">
                  <div className="font-mono text-[10px] text-amber-400 font-semibold uppercase tracking-wider">
                    Mekanisme & Alasan Pilihan Kata:
                  </div>
                  <p className="leading-normal text-stone-300">
                    {ex.rationale}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
