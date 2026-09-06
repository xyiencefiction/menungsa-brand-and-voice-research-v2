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

const CONTEXT_ID_MAP: Record<string, string> = {
  C01: 'Psikoedukasi & Ritme Tubuh',
  C02: 'Pengakuan Beban (Merasa Dipahami)',
  C03: 'Kisah Personal & Narasi Kejujuran',
  C04: 'Informasi Layanan & Bantuan',
  C05: 'Ajakan Hadir Tanpa Paksaan',
  C06: 'Aturan Main & Etika Komunitas',
  C07: 'Penanganan Krisis & De-eskalasi',
  C08: 'Klarifikasi Mitos & Reframing Budaya',
  C09: 'Analisis Beban Kerja & Isu Sistemik',
  C10: 'Advokasi Kebijakan Berbasis Data',
  C11: 'Humor Situasional & Di Balik Layar',
  C12: 'Pemulihan Bertahap & Progres Nyata',
  C13: 'Pengolahan Duka, Gagal & Kehilangan',
  C14: 'Aktivitas Fisik & Olahraga Bersama'
};

const CHANNEL_ID_MAP: Record<string, string> = {
  'Social Carousel Opener': 'Slide Pembuka Carousel Medsos',
  'Micro-Guide Closing Note': 'Catatan Penutup Panduan Praktis',
  'Feed Observation Post': 'Unggahan Refleksi Linimasa',
  'Short Reflection Fragment': 'Fragmen Renungan Singkat',
  'First-Person Personal Essay': 'Esai Narasi Orang Pertama',
  'Short Video Voiceover': 'Naskah Suara Video Pendek',
  'Community Gathering Invitation': 'Undangan Pertemuan Komunitas',
  'Online Circle Onboarding': 'Pengantar Diskusi Daring',
  'Support Session Brief': 'Panduan Teknis Sesi Pendampingan',
  'Attendance Clarification Email': 'Pesan Penegasan Tanpa Beban',
  'Clinic Navigation Guide': 'Panduan Kunjungan Konsultasi',
  'Informal Help Step': 'Langkah Obrolan Santai Awal',
  'Crisis Intervention Protocol': 'Protokol Respons Krisis Darurat',
  'Immediate Safety Notice': 'Pemberitahuan Keselamatan Segera',
  'Myth Clarification Card': 'Kartu Penjelasan Mitos',
  'Cultural Belief Reframing': 'Penataan Ulang Keyakinan Tradisi',
  'Structural Analysis Article': 'Artikel Analisis Realitas Hidup',
  'Workplace Culture Commentary': 'Ulasan Budaya Kerja & Tekanan',
  'Policy Advocacy Release': 'Pernyataan Advokasi Bersama',
  'Campaign Action Statement': 'Pernyataan Sikap Berbasis Angka',
  'Behind-The-Scenes Social Snippet': 'Catatan Santai Tim Redaksi',
  'Casual Everyday Anecdote': 'Anekdot Kejadian Sehari-hari',
  'Recovery Case Feature': 'Cerita Pemulihan Tanpa Bualan',
  'Habit Rehabilitation Vignette': 'Catatan Kebiasaan Baru Bertahap',
  'Grief & Hardship Reflection': 'Refleksi Duka & Menghadapi Gagal',
  'Bereavement Support Message': 'Pesan Belasungkawa & Penemanan',
  'Physical Activity Debrief': 'Refleksi Aktivitas Fisik Bersama',
  'Sports Community Note': 'Catatan Komunitas Olahraga Sehat'
};

const RATIONALE_ID_MAP: Record<string, string> = {
  'EX-C01-1': 'Membuka naskah melalui siklus fisik tubuh yang nyata dialami sehari-hari, bukan melabeli kondisi batin pembaca. Menjaga harga diri pembaca tanpa beban diagnosis prematur.',
  'EX-C01-2': 'Menghadirkan mekanisme biologis yang netral setelah mengamati perilaku harian, melenyapkan rasa bersalah tanpa mendikte perintah.',
  'EX-C02-1': 'Menyebutkan hambatan perilaku sehari-hari secara konkret tanpa ajakan bertindak (CTA) yang menuntut dan tanpa label emosional, sehingga pembaca merasa dipahami tanpa kehilangan status sosial.',
  'EX-C02-2': 'Mengakhiri naskah murni pada penggambaran realitas tanpa menawarkan solusi instan yang dipaksakan atau memanfaatkan momen empati untuk tujuan komersial.',
  'EX-C03-1': 'Menambatkan emosi pada benda-benda nyata dan tempat fisik dalam urutan waktu. Penutur tetap memegang kendali martabat dirinya alih-alih mengeksploitasi kerapuhan emosional sebagai tontonan publik.',
  'EX-C03-2': 'Berfokus pada kegiatan nyata bersama di mana emosi tertampung dengan aman lewat tugas fisik eksternal, menghindari format pengakuan dosa yang melodramatis.',
  'EX-C04-1': 'Menjelaskan batas dan aturan hadir secara transparan, serta secara gamblang membolehkan peserta untuk sekadar diam mendengarkan demi meredakan kecemasan sosial.',
  'EX-C04-2': 'Menghilangkan keharusan komitmen identitas sejak awal, menempatkan partisipasi sebagai pilihan sukarela tanpa tuntutan membuka masalah pribadi.',
  'EX-C05-1': 'Menempatkan kejelasan logistik (siapa, di mana, durasi, kapasitas, kebijakan privasi) sebagai isi utama pesan demi meminimalkan hambatan melangkah.',
  'EX-C05-2': 'Menetapkan biaya pembatalan dan rasa ragu pada titik nol, mencegah timbulnya penolakan psikologis (reactance) akibat manipulasi rasa bersalah.',
  'EX-C06-1': 'Menawarkan satu langkah lanjutan yang realistis, berbatas jelas, dan terukur biayanya tanpa mencela karakter pembaca atau menggunakan kalimat perintah bernada tinggi.',
  'EX-C06-2': 'Menormalisasi obrolan informal santai sebagai langkah pemulihan yang sah dan bermartabat sebelum memutuskan masuk ke intervensi klinis formal.',
  'EX-C07-1': 'Menggunakan kalimat klinis lugas tanpa metafora, tanpa kepalsuan positif (toxic positivity), dan tanpa humor, mematuhi standar keselamatan intervensi krisis.',
  'EX-C07-2': 'Memberikan panduan tindakan penenang fisik yang konkret sambil sepenuhnya membuang manipulasi emosional atau tuduhan moral.',
  'EX-C08-1': 'Mengakui fungsi sosial dari pandangan awal sebelum menyajikan bukti fisiologis pembanding, tanpa pernah mengejek atau merendahkan keyakinan pembaca.',
  'EX-C08-2': 'Menghargai nilai kemandirian pria sambil dengan tenang memosisikan konsultasi sebagai langkah strategi pemecahan masalah, bukan tanda kelemahan pribadi.',
  'EX-C09-1': 'Membingkai kesulitan hidup di seputar realitas sistemik (biaya hidup, tanggung jawab keluarga) alih-alih menuduh atau menyalahkan audiens secara kolektif.',
  'EX-C09-2': 'Mengarahkan telaah kritis pada sistem kerja dan mekanisme operasional, bukan menyerang karakter atau moralitas individu.',
  'EX-C10-1': 'Menyandingkan satu prinsip moral terukur dengan tindakan nyata organisasi yang membutuhkan biaya dan komitmen nyata dari lembaga itu sendiri.',
  'EX-C10-2': 'Mendasarkan argumen pada data anggaran yang dapat diverifikasi dan usulan kebijakan spesifik, bukan pada letupan amarah yang membakar emosi.',
  'EX-C11-1': 'Menggunakan humor observasional yang mencela diri sendiri dari tim pengelola, tanpa pernah mengolok-olok kerapuhan audiens atau isu sensitif.',
  'EX-C11-2': 'Menangkap paradoks perilaku sehari-hari yang tidak berbahaya dengan kehangatan situasi, bukan dengan celaan yang merendahkan.',
  'EX-C12-1': 'Menampilkan kemajuan bertahap yang wajar di mana fase jeda dinormalisasi, menghindari narasi transformasi dramatis bak cerita pahlawan instan.',
  'EX-C12-2': 'Mengidentifikasi satu mekanisme kebiasaan kecil yang mudah diulang, bukan menuntut tekad heroik yang membebani mental.',
  'EX-C13-1': 'Memberi ruang bahasa yang sah bagi rasa kehilangan dan kegagalan, tanpa terburu-buru menghibur dengan penghiburan palsu atau petuah bijak tak diminta.',
  'EX-C13-2': 'Hadir mendampingi dengan tenang dan tidak tergesa-gesa, menolak klise-klise penghiburan hampa yang justru menafikan beratnya rasa duka sejati.',
  'EX-C14-1': 'Menambatkan emosi pada aktivitas bersama dan ritme gerakan fisik tubuh, bukan pada dominasi maskulin agresif atau metafora perang militeristik.',
  'EX-C14-2': 'Memanfaatkan olahraga rekreasional sebagai wadah sosial berisiko sorotan rendah di mana persaudaraan tumbuh tanpa kecemasan performa.'
};

export const WritingStudioView: React.FC = () => {
  const [selectedChannel, setSelectedChannel] = useState<string>('all');
  const [selectedContext, setSelectedContext] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const channelsList = [
    { id: 'all', label: 'Semua Format', icon: SlidersHorizontal },
    { id: 'social', label: '📱 Feed & Carousel Medsos', match: ['Social', 'Feed', 'Carousel', 'Reflection', 'Snippet', 'Anecdote'] },
    { id: 'chat', label: '💬 WhatsApp & Komunitas', match: ['WhatsApp', 'Broadcast', 'Community', 'Note', 'Email'] },
    { id: 'campaign', label: '📢 Kampanye & Iklan', match: ['Campaign', 'Poster', 'Announcement', 'Ad', 'Advocacy'] },
    { id: 'guide', label: '🏥 Panduan Layanan & Faskes', match: ['Guide', 'Clinical', 'Health', 'Debrief', 'Navigation'] },
    { id: 'crisis', label: '🚨 Krisis & De-eskalasi', match: ['Crisis', 'Support', 'First-Person', 'Safety', 'Bereavement'] },
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
        const indonesianRationale = RATIONALE_ID_MAP[ex.id] ?? ex.rationale;
        const inRationale = indonesianRationale.toLowerCase().includes(q);
        const indonesianChannel = CHANNEL_ID_MAP[ex.channel] ?? ex.channel;
        const inChannel = indonesianChannel.toLowerCase().includes(q);
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
        <p className="text-xs md:text-sm text-stone-300 max-w-3xl leading-relaxed">
          Kumpulan draf tulisan siap pakai yang dirancang sesuai batas psikologis dan norma budaya pria Indonesia. Setiap contoh menyandingkan kalimat anti-pola yang sering menjadi bumerang dengan kalimat terkalibrasi Menungsa yang aman, membumi, dan bermartabat.
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
              placeholder="Cari kata kunci naskah..."
              aria-label="Cari kata kunci naskah"
              className="w-full rounded-lg border border-stone-800 bg-stone-900/70 pl-8.5 pr-3 py-1.5 text-xs text-stone-200 placeholder-stone-500 focus:border-amber-500/60 focus:outline-none"
            />
          </div>
        </div>

        {/* Context Selector Filter — with scroll fade mask */}
        <div className="relative">
          <div
            className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono text-stone-400"
            style={{ maskImage: 'linear-gradient(to right, black 88%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, black 88%, transparent 100%)' }}
          >
            <span className="shrink-0 text-stone-400 font-semibold">Situasi Naskah:</span>
          <button
            onClick={() => setSelectedContext('all')}
            className={`px-2.5 py-1 rounded-md cursor-pointer shrink-0 transition ${
              selectedContext === 'all'
                ? 'bg-stone-200 text-stone-950 font-semibold'
                : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200'
            }`}
          >
            Semua ({toneExemplars.length})
          </button>
          {toneContexts.map((ctx) => {
            const label = CONTEXT_ID_MAP[ctx.context_id] ?? ctx.context;
            const isSelected = selectedContext === ctx.context_id;
            return (
              <button
                key={ctx.context_id}
                onClick={() => setSelectedContext(ctx.context_id)}
                className={`px-2.5 py-1 rounded-md cursor-pointer shrink-0 transition ${
                  isSelected
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                    : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200'
                }`}
              >
                {ctx.context_id} · {label}
              </button>
            );
          })}
        </div>
      </div>
    </div>

      {/* Exemplar Cards Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filteredExemplars.length === 0 ? (
          <div className="rounded-xl border border-dashed border-stone-800 p-12 text-center text-stone-400 text-xs">
            Tidak ada contoh naskah yang cocok dengan pencarian atau filter yang dipilih.
          </div>
        ) : (
          filteredExemplars.map((ex) => {
            const isCopied = copiedId === ex.id;
            const contextLabel = CONTEXT_ID_MAP[ex.contextId] ?? ex.contextId;
            const channelLabel = CHANNEL_ID_MAP[ex.channel] ?? ex.channel;
            const rationaleText = RATIONALE_ID_MAP[ex.id] ?? ex.rationale;

            return (
              <div
                key={ex.id}
                className="rounded-xl border border-stone-800 bg-stone-900/40 p-5 md:p-6 space-y-4 hover:border-stone-700/80 transition"
              >
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800/80 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-mono font-semibold text-amber-400 border border-amber-500/25">
                      {channelLabel}
                    </span>
                    <span className="text-[11px] font-mono text-stone-300">
                      {ex.contextId}: {contextLabel}
                    </span>
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
                        className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 transition cursor-pointer border border-emerald-500/30"
                        title="Salin ke clipboard"
                        aria-label={isCopied ? "Teks naskah berhasil disalin ke clipboard" : "Salin naskah terkalibrasi ke clipboard"}
                      >
                        <span className="sr-only" aria-live="polite">
                          {isCopied ? "Teks berhasil disalin" : ""}
                        </span>
                        {isCopied ? (
                          <>
                            <Check size={13} />
                            <span>Tersalin!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={13} />
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
                <div className="rounded-lg bg-stone-950/60 p-4 border border-stone-800/80 text-xs text-stone-300 space-y-1.5">
                  <div className="font-mono text-[10px] text-amber-400 font-semibold uppercase tracking-wider">
                    Mekanisme & Alasan Pilihan Kata:
                  </div>
                  <p className="leading-relaxed text-stone-200">
                    {rationaleText}
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
