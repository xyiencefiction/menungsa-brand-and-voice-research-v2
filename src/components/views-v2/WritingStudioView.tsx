import React, { useState, useMemo } from 'react';
import { toneExemplars, toneContexts } from '../../data';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  SlidersHorizontal,
  ChevronDown,
  LayoutGrid,
  StretchHorizontal
} from 'lucide-react';

const CONTEXT_ID_MAP: Record<string, string> = {
  C01: 'Psikoedukasi & Ritme Tubuh',
  C02: 'Pengakuan Beban (Merasa Dipahami)',
  C03: 'Kisah Personal & Narasi Kejujuran',
  C04: 'Undangan Komunitas & Teman Sebaya',
  C05: 'Promosi Sesi Pendampingan Kelompok',
  C06: 'Ajakan Akses Layanan & Bantuan Nyata',
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
  'Micro-Guide Slide': 'Slide Panduan Singkat Medsos',
  'Workplace Wellness Bulletin': 'Lembar Info Meja Kerja',
  'Feed Observation Post': 'Unggahan Refleksi Linimasa',
  'Short Reflection Fragment': 'Fragmen Renungan Singkat',
  'First-Person Personal Essay': 'Esai Narasi Orang Pertama',
  'Short Video Voiceover': 'Naskah Suara Video Pendek',
  'Community Gathering Invitation': 'Undangan Pertemuan Komunitas',
  'Online Circle Onboarding': 'Pengantar Diskusi Daring',
  'WhatsApp Community Broadcast': 'Siaran Komunitas WhatsApp',
  'Support Session Brief': 'Panduan Teknis Sesi Pendampingan',
  'Support Session Logistics Note': 'Catatan Logistik Sesi Pertemuan',
  'Attendance Clarification Email': 'Pesan Penegasan Tanpa Beban',
  'Attendance Clarification Notice': 'Pemberitahuan Fleksibilitas Hadir',
  'Clinic Navigation Guide': 'Panduan Kunjungan Konsultasi',
  'Informal Help Step': 'Langkah Obrolan Santai Awal',
  'Crisis Intervention Protocol': 'Protokol Respons Krisis Darurat',
  'Crisis De-escalation Protocol': 'Protokol De-eskalasi Krisis',
  'Immediate Safety Notice': 'Pemberitahuan Keselamatan Segera',
  'Immediate Safety Text': 'Panduan Pendampingan Krisis',
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
  // C01
  'EX-C01-1': 'Membuka naskah melalui siklus fisik tubuh yang nyata dialami sehari-hari, bukan melabeli kondisi batin pembaca. Menjaga harga diri pembaca tanpa beban diagnosis prematur.',
  'EX-C01-2': 'Menghadirkan mekanisme biologis yang netral setelah mengamati perilaku harian, melenyapkan rasa bersalah tanpa mendikte perintah.',
  'EX-C01-3': 'Menjelaskan ketegangan fisik secara objektif dan fisiologis, memberikan jeda mikro yang mudah dilakukan tanpa menakut-nakuti atau mengutuk teknologi harian.',
  'EX-C01-4': 'Menyediakan pemahaman mekanisme fisiologis yang netral tanpa buru-buru menyematkan label klinis atau menciptakan histeria medis di tempat kerja.',
  
  // C02
  'EX-C02-1': 'Menyebutkan hambatan perilaku sehari-hari secara konkret tanpa ajakan bertindak (CTA) yang menuntut dan tanpa label emosional, sehingga pembaca merasa dipahami tanpa kehilangan status sosial.',
  'EX-C02-2': 'Mengakhiri naskah murni pada penggambaran realitas tanpa menawarkan solusi instan yang dipaksakan atau memanfaatkan momen empati untuk tujuan komersial.',
  'EX-C02-3': 'Menggambarkan penurunan kapasitas sosial secara faktual dan membumi tanpa melabelinya sebagai cacat kepribadian atau menuntut pertanggungjawaban instan.',
  'EX-C02-4': 'Mengakhiri naskah murni pada observasi perilaku tanpa tambahan nasihat, tanpa evaluasi moral, dan tanpa ajakan komersial terselubung.',
  
  // C03
  'EX-C03-1': 'Menambatkan emosi pada benda-benda nyata dan tempat fisik dalam urutan waktu. Penutur tetap memegang kendali martabat dirinya alih-alih mengeksploitasi kerapuhan emosional sebagai tontonan publik.',
  'EX-C03-2': 'Berfokus pada kegiatan nyata bersama di mana emosi tertampung dengan aman lewat tugas fisik eksternal, menghindari format pengakuan dosa yang melodramatis.',
  'EX-C03-3': 'Menambatkan rasa kehilangan pada benda fisik dan rutinitas nyata. Penutur menjaga martabatnya tanpa menjadikan kesedihan sebagai tontonan melodramatis.',
  'EX-C03-4': 'Menghadirkan kebersamaan yang aman melalui kegiatan bersama di ruang fisik, tanpa paksaan membuka aib atau kerapuhan yang berlebihan.',
  
  // C04
  'EX-C04-1': 'Menjelaskan batas dan aturan hadir secara transparan, serta secara gamblang membolehkan peserta untuk sekadar diam mendengarkan demi meredakan kecemasan sosial.',
  'EX-C04-2': 'Menghilangkan keharusan komitmen identitas sejak awal, menempatkan partisipasi sebagai pilihan sukarela tanpa tuntutan membuka masalah pribadi.',
  'EX-C04-3': 'Menjelaskan rute, durasi, dan kebebasan untuk tetap diam atau mendengarkan musik, melenyapkan kecemasan sosial dari pertemuan tatap muka.',
  'EX-C04-4': 'Menegaskan batas partisipasi yang aman sejak awal, memastikan peserta tidak merasa dijebak dalam sesi pengungkapan pribadi.',
  
  // C05
  'EX-C05-1': 'Menempatkan kejelasan logistik (siapa, di mana, durasi, kapasitas, kebijakan privasi) sebagai isi utama pesan demi meminimalkan hambatan melangkah.',
  'EX-C05-2': 'Menetapkan biaya pembatalan dan rasa ragu pada titik nol, mencegah timbulnya penolakan psikologis (reactance) akibat manipulasi rasa bersalah.',
  'EX-C05-3': 'Memaparkan logistik spasial dan denah privasi fisik secara presisi guna meminimalkan ketakutan terlihat oleh orang lain.',
  'EX-C05-4': 'Menghapus biaya keluar (exit friction) sepenuhnya, mencegah munculnya rasa terkekang atau terjebak dalam sesi bantuan.',
  
  // C06
  'EX-C06-1': 'Menawarkan satu langkah lanjutan yang realistis, berbatas jelas, dan terukur biayanya tanpa mencela karakter pembaca atau menggunakan kalimat perintah bernada tinggi.',
  'EX-C06-2': 'Menormalisasi obrolan informal santai sebagai langkah pemulihan yang sah dan bermartabat sebelum memutuskan masuk ke intervensi klinis formal.',
  'EX-C06-3': 'Menyediakan panduan alur langkah yang sangat konkret, terukur biayanya, dan mudah dipraktikkan tanpa celaan moral atau ancaman menakut-nakuti.',
  'EX-C06-4': 'Menjadikan konsultasi seputar hal praktis/teknis sebagai jembatan yang sah dan tidak mengancam harga diri laki-laki.',
  
  // C07
  'EX-C07-1': 'Menggunakan kalimat klinis lugas tanpa metafora, tanpa kepalsuan positif (toxic positivity), dan tanpa humor, mematuhi standar keselamatan intervensi krisis.',
  'EX-C07-2': 'Memberikan panduan tindakan penenang fisik yang konkret sambil sepenuhnya membuang manipulasi emosional atau tuduhan moral.',
  'EX-C07-3': 'Instruksi fisik de-eskalasi yang lugas tanpa basa-basi metafora, tanpa tudingan religius atau penghakiman moral yang berbahaya bagi keselamatan.',
  'EX-C07-4': 'Pedoman mendampingi orang dalam krisis secara aman berbasis bukti keselamatan jiwa, menyingkirkan nasihat klise yang memperburuk risiko.',
  
  // C08
  'EX-C08-1': 'Mengakui fungsi sosial dari pandangan awal sebelum menyajikan bukti fisiologis pembanding, tanpa pernah mengejek atau merendahkan keyakinan pembaca.',
  'EX-C08-2': 'Menghargai nilai kemandirian pria sambil dengan tenang memosisikan konsultasi sebagai langkah strategi pemecahan masalah, bukan tanda kelemahan pribadi.',
  'EX-C08-3': 'Mengafirmasi niat baik tanggung jawab pria terlebih dahulu, kemudian memakai analogi mekanik yang netral untuk menata ulang persepsi tanpa merendahkan.',
  'EX-C08-4': 'Memisahkan tekanan situasi objektif dari penilaian karakter personal, membongkar mitos tanpa mempermalukan pembaca.',
  
  // C09
  'EX-C09-1': 'Membingkai kesulitan hidup di seputar realitas sistemik (biaya hidup, tanggung jawab keluarga) alih-alih menuduh atau menyalahkan audiens secara kolektif.',
  'EX-C09-2': 'Mengarahkan telaah kritis pada sistem kerja dan mekanisme operasional, bukan menyerang karakter atau moralitas individu.',
  'EX-C09-3': 'Mengarahkan analisis pada faktor struktural ekonomi dan jaminan sosial makro, bukan menyalahkan individu yang sedang berjuang keras.',
  'EX-C09-4': 'Mengkritisi sistem tata kelola tempat kerja secara profesional dan terukur tanpa mencemooh pekerja maupun atasan secara emosional.',
  
  // C10
  'EX-C10-1': 'Menyandingkan satu prinsip moral terukur dengan tindakan nyata organisasi yang membutuhkan biaya dan komitmen nyata dari lembaga itu sendiri.',
  'EX-C10-2': 'Mendasarkan argumen pada data anggaran yang dapat diverifikasi dan usulan kebijakan spesifik, bukan pada letupan amarah yang membakar emosi.',
  'EX-C10-3': 'Menyajikan data resmi terverifikasi dan menawarkan usulan kebijakan yang konkret dan konstruktif alih-alih melontarkan retorika amarah.',
  'EX-C10-4': 'Mendasarkan advokasi pada temuan fisik yang terukur (ruang kedap suara) dan jalur regulasi formal (syarat akreditasi).',
  
  // C11
  'EX-C11-1': 'Menggunakan humor observasional yang mencela diri sendiri dari tim pengelola, tanpa pernah mengolok-olok kerapuhan audiens atau isu sensitif.',
  'EX-C11-2': 'Menangkap paradoks perilaku sehari-hari yang tidak berbahaya dengan kehangatan situasi, bukan dengan celaan yang merendahkan.',
  'EX-C11-3': 'Menggunakan humor observasional mandiri yang bersahabat tanpa pernah mencemooh kelemahan audiens atau isu kesehatan serius.',
  'EX-C11-4': 'Mengangkat paradoks niat vs realitas harian yang dialami bersama dengan kehangatan humor situasi tanpa nada menghakimi.',
  
  // C12
  'EX-C12-1': 'Menampilkan kemajuan bertahap yang wajar di mana fase jeda dinormalisasi, menghindari narasi transformasi dramatis bak cerita pahlawan instan.',
  'EX-C12-2': 'Mengidentifikasi satu mekanisme kebiasaan kecil yang mudah diulang, bukan menuntut tekad heroik yang membebani mental.',
  'EX-C12-3': 'Mengakui progres mikro yang realistis dan terjangkau di mana ritme lambat dinormalisasi, tanpa narasi transformasi fiksi bombastis.',
  'EX-C12-4': 'Mengidentifikasi satu perubahan lingkungan fisik yang terjangkau (choice architecture) ketimbang menuntut kemauan baja.',
  
  // C13
  'EX-C13-1': 'Memberi ruang bahasa yang sah bagi rasa kehilangan dan kegagalan, tanpa terburu-buru menghibur dengan penghiburan palsu atau petuah bijak tak diminta.',
  'EX-C13-2': 'Hadir mendampingi dengan tenang dan tidak tergesa-gesa, menolak klise-klise penghiburan hampa yang justru menafikan beratnya rasa duka sejati.',
  'EX-C13-3': 'Memberikan ruang sah bagi duka hilangnya peran sosial tanpa tergesa-gesa menyuntikkan penghiburan hampa atau nasihat moral yang menyalahkan.',
  'EX-C13-4': 'Mendampingi proses berduka jangka panjang secara penuh rasa hormat, menolak klise penghiburan yang membebani perasaan orang yang berduka.',
  
  // C14
  'EX-C14-1': 'Menambatkan emosi pada aktivitas bersama dan ritme gerakan fisik tubuh, bukan pada dominasi maskulin agresif atau metafora perang militeristik.',
  'EX-C14-2': 'Memanfaatkan olahraga rekreasional sebagai wadah sosial berisiko sorotan rendah di mana persaudaraan tumbuh tanpa kecemasan performa.',
  'EX-C14-3': 'Menekankan pemulihan sensorik dan relaksasi somatik tubuh alami ketimbang glorifikasi rasa sakit atau obsesi performa militeristik.',
  'EX-C14-4': 'Menjadikan olahraga bersama sebagai wadah persahabatan yang hangat dan inklusif dengan hambatan sosial nol.'
};

const CHANNELS_LIST = [
  { id: 'all', label: 'Semua Format', icon: SlidersHorizontal },
  { id: 'social', label: '📱 Feed & Medsos', match: ['Social', 'Feed', 'Carousel', 'Reflection', 'Snippet', 'Anecdote', 'Slide'] },
  { id: 'chat', label: '💬 WhatsApp & Komunitas', match: ['WhatsApp', 'Broadcast', 'Community', 'Note', 'Email', 'Notice', 'Gathering', 'Onboarding'] },
  { id: 'campaign', label: '📢 Kampanye & Advokasi', match: ['Campaign', 'Poster', 'Announcement', 'Ad', 'Advocacy', 'Statement', 'Release'] },
  { id: 'guide', label: '🏥 Panduan & Faskes', match: ['Guide', 'Clinical', 'Health', 'Debrief', 'Navigation', 'Bulletin', 'Logistics', 'Slide', 'Vignette', 'Feature'] },
  { id: 'crisis', label: '🚨 Krisis & Keamanan', match: ['Crisis', 'Support', 'First-Person', 'Safety', 'Bereavement', 'De-escalation'] },
];

export const WritingStudioView: React.FC = () => {
  const [selectedChannel, setSelectedChannel] = useState<string>('all');
  const [selectedContext, setSelectedContext] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [layoutMode, setLayoutMode] = useState<'two-column' | 'single-column'>('two-column');

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const contextCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    toneExemplars.forEach((ex) => {
      counts[ex.contextId] = (counts[ex.contextId] || 0) + 1;
    });
    return counts;
  }, []);

  const filteredExemplars = useMemo(() => {
    return toneExemplars.filter((ex) => {
      // Channel filter
      if (selectedChannel !== 'all') {
        const activeFilter = CHANNELS_LIST.find((c) => c.id === selectedChannel);
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
      {/* Header */}
      <div className="space-y-3">
        <div className="kicker flex items-center gap-1.5">
          <Sparkles size={12} className="text-amber-500" />
          <span>PUSTAKA CONTOH TULISAN NYATA ({toneExemplars.length} CONTOH)</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-semibold tracking-tight text-stone-100 leading-tight">
          Studio Kalimat & Contoh Naskah Terkalibrasi
        </h1>
        <p className="text-sm md:text-base text-stone-300 max-w-[74ch] leading-relaxed font-sans">
          Kumpulan draf tulisan siap pakai yang dirancang sesuai batas psikologis dan norma budaya pria Indonesia. Setiap contoh menyandingkan kalimat anti-pola yang sering menjadi bumerang dengan kalimat terkalibrasi Menungsa yang aman, membumi, dan bermartabat.
        </p>
      </div>

      {/* Control Bar: Format Filters, Situasi Naskah Dropdown, Search, and Layout Toggle */}
      <div className="space-y-3 rounded-[9px] border border-stone-800 bg-stone-900/50 p-4 shadow-raised">
        {/* Row 1: Channel Chips & Layout Switcher */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-stone-800/60 pb-3">
          {/* Format Chips */}
          <div role="group" aria-label="Pilihan format kanal" className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-sans text-stone-400 font-semibold mr-1 hidden sm:inline">Kanal:</span>
            {CHANNELS_LIST.map((ch) => (
              <button
                key={ch.id}
                onClick={() => setSelectedChannel(ch.id)}
                aria-pressed={selectedChannel === ch.id}
                className={`px-3 py-1.5 rounded-[6px] text-xs font-sans transition cursor-pointer flex items-center gap-1.5 ${
                  selectedChannel === ch.id
                    ? 'bg-amber-500 text-[#F1ECDF] font-semibold shadow-raised'
                    : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700'
                }`}
              >
                <span>{ch.label}</span>
              </button>
            ))}
          </div>

          {/* Layout Mode Switcher (Icons only) */}
          <div className="flex items-center gap-0.5 self-end md:self-auto bg-stone-900 border border-stone-800 rounded-[6px] p-1 shrink-0" role="group" aria-label="Tata Letak Tampilan">
            <button
              type="button"
              onClick={() => setLayoutMode('two-column')}
              aria-pressed={layoutMode === 'two-column'}
              aria-label="Tampilan 2 Kolom Berdampingan"
              className={`p-1.5 rounded-[4px] cursor-pointer transition ${
                layoutMode === 'two-column'
                  ? 'bg-amber-600 text-[#F1ECDF] shadow-raised'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Tampilan 2 Kolom"
            >
              <LayoutGrid size={15} />
            </button>
            <button
              type="button"
              onClick={() => setLayoutMode('single-column')}
              aria-pressed={layoutMode === 'single-column'}
              aria-label="Tampilan 1 Kolom Penuh"
              className={`p-1.5 rounded-[4px] cursor-pointer transition ${
                layoutMode === 'single-column'
                  ? 'bg-amber-600 text-[#F1ECDF] shadow-raised'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Tampilan 1 Kolom"
            >
              <StretchHorizontal size={15} />
            </button>
          </div>
        </div>

        {/* Row 2: Situasi Naskah Dropdown & Search Input */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-0.5">
          {/* Situasi Naskah Dropdown (Space-saving replacement for horizontal pills) */}
          <div className="flex items-center gap-2 flex-1 max-w-full md:max-w-md">
            <label htmlFor="context-select" className="text-xs font-sans text-stone-300 font-semibold whitespace-nowrap shrink-0">
              Situasi Naskah:
            </label>
            <div className="relative w-full">
              <select
                id="context-select"
                value={selectedContext}
                onChange={(e) => setSelectedContext(e.target.value)}
                aria-label="Pilih Situasi Naskah"
                className="w-full appearance-none rounded-[6px] border border-stone-800 bg-stone-900/90 pl-3 pr-8 py-2 text-xs font-sans text-stone-200 focus:outline-2 focus:outline-amber-500 focus:outline-offset-1 cursor-pointer hover:border-stone-700 transition"
              >
                <option value="all">Semua Situasi Naskah ({toneExemplars.length} contoh)</option>
                {toneContexts.map((ctx) => {
                  const label = CONTEXT_ID_MAP[ctx.context_id] ?? ctx.context;
                  const count = contextCounts[ctx.context_id] || 0;
                  return (
                    <option key={ctx.context_id} value={ctx.context_id}>
                      {ctx.context_id} · {label} ({count} contoh)
                    </option>
                  );
                })}
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
            </div>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kata kunci naskah..."
              aria-label="Cari kata kunci naskah"
              className="w-full rounded-[6px] border border-stone-800 bg-stone-900/70 pl-8.5 pr-3 py-2 text-xs text-stone-200 placeholder-stone-500 focus:outline-2 focus:outline-amber-500 focus:outline-offset-1 font-sans"
            />
          </div>
        </div>

        {/* Counter and Active Filter Notification */}
        <div className="flex items-center justify-between text-xs text-stone-400 font-sans pt-1 border-t border-stone-800/40">
          <span>
            Menampilkan <strong className="text-amber-500 font-bold">{filteredExemplars.length}</strong> dari {toneExemplars.length} contoh naskah terkalibrasi
            {selectedContext !== 'all' && (
              <span className="ml-1.5 text-stone-300">
                · Menyaring: <strong className="text-stone-200">{selectedContext} ({CONTEXT_ID_MAP[selectedContext]})</strong>
              </span>
            )}
          </span>
          {(selectedContext !== 'all' || selectedChannel !== 'all' || searchQuery.trim() !== '') && (
            <button
              onClick={() => {
                setSelectedContext('all');
                setSelectedChannel('all');
                setSearchQuery('');
              }}
              className="text-amber-500 hover:text-amber-400 text-xs cursor-pointer underline underline-offset-2 transition"
            >
              Reset semua filter
            </button>
          )}
        </div>
      </div>

      {/* Exemplar Cards Grid */}
      <div className={layoutMode === 'two-column' ? 'grid grid-cols-1 lg:grid-cols-2 gap-6' : 'grid grid-cols-1 gap-6 max-w-5xl mx-auto'}>
        {filteredExemplars.length === 0 ? (
          <div className="col-span-full rounded-xl border border-dashed border-stone-800 p-12 text-center text-stone-400 text-xs">
            Tidak ada contoh naskah yang cocok dengan pencarian atau filter yang dipilih.
          </div>
        ) : (
          filteredExemplars.map((ex) => {
            const isCopied = copiedId === ex.id;
            const contextLabel = CONTEXT_ID_MAP[ex.contextId] ?? ex.contextId;
            const channelLabel = CHANNEL_ID_MAP[ex.channel] ?? ex.channel;
            const rationaleText = RATIONALE_ID_MAP[ex.id] ?? ex.rationale;

            if (layoutMode === 'two-column') {
              // 2-Column Responsive Card: Stacked internally for ideal line-length readability
              return (
                <div
                  key={ex.id}
                  className="rounded-[9px] border border-stone-800 bg-stone-900/50 p-5 space-y-4 hover:border-stone-700/80 transition shadow-raised flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Meta Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800/80 pb-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-[6px] bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-sans font-bold text-amber-500 border border-amber-500/25 uppercase tracking-wider">
                          {channelLabel}
                        </span>
                        <span className="text-[11px] font-sans text-stone-400 font-medium">
                          {ex.contextId}: {contextLabel}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-stone-500 uppercase">
                        ID: {ex.id}
                      </span>
                    </div>

                    {/* Calibrated / Worked */}
                    <div className="rounded-[6px] border border-emerald-500/30 bg-emerald-950/20 p-4 space-y-2.5 relative group">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-emerald-500 dark:text-emerald-400 text-xs font-sans font-bold uppercase tracking-wider">
                          <CheckCircle2 size={15} />
                          <span>Gaya Suara Menungsa</span>
                        </div>
                        <button
                          onClick={() => handleCopy(ex.worked.copy, ex.id)}
                          className="btn-secondary px-2.5 py-1 text-xs gap-1.5 font-sans cursor-pointer shrink-0"
                          title="Salin ke clipboard"
                          aria-label={isCopied ? "Teks naskah berhasil disalin ke clipboard" : "Salin naskah ke clipboard"}
                        >
                          <span className="sr-only" aria-live="polite">
                            {isCopied ? "Teks berhasil disalin" : ""}
                          </span>
                          {isCopied ? (
                            <>
                              <Check size={13} className="text-emerald-500" />
                              <span className="text-emerald-600 dark:text-emerald-400 font-medium">Tersalin!</span>
                            </>
                          ) : (
                            <>
                              <Copy size={13} />
                              <span>Salin</span>
                            </>
                          )}
                        </button>
                      </div>

                      <blockquote className="font-serif text-base leading-relaxed text-stone-100">
                        "{ex.worked.copy}"
                      </blockquote>
                    </div>

                    {/* Weak / Common Anti-Pattern */}
                    <div className="rounded-[6px] border border-amber-700/25 bg-amber-950/20 p-3.5 space-y-2">
                      <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 text-xs font-sans font-bold uppercase tracking-wider">
                        <AlertTriangle size={15} />
                        <span>Anti-Pola Umum (Bumerang / Cringe)</span>
                      </div>

                      <blockquote className="font-serif text-xs md:text-sm leading-relaxed text-stone-300 italic">
                        "{ex.weak.copy}"
                      </blockquote>
                    </div>
                  </div>

                  {/* Linguistic Rationale at bottom */}
                  <div className="rounded-[6px] bg-stone-950/60 p-3.5 border border-stone-800/80 text-xs text-stone-300 space-y-1 font-sans mt-3">
                    <div className="kicker">
                      Mekanisme & Alasan Pilihan Kata:
                    </div>
                    <p className="leading-relaxed text-stone-200">
                      {rationaleText}
                    </p>
                  </div>
                </div>
              );
            }

            // 1-Column Layout: Side-by-side comparison across wide screen
            return (
              <div
                key={ex.id}
                className="rounded-[9px] border border-stone-800 bg-stone-900/50 p-5 md:p-6 space-y-4 hover:border-stone-700/80 transition shadow-raised"
              >
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800/80 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="rounded-[6px] bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-sans font-bold text-amber-500 border border-amber-500/25 uppercase tracking-wider">
                      {channelLabel}
                    </span>
                    <span className="text-[11px] font-sans text-stone-400 font-medium">
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
                  <div className="rounded-[6px] border border-emerald-500/30 bg-emerald-950/20 p-4 space-y-3 relative group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-emerald-500 dark:text-emerald-400 text-xs font-sans font-bold uppercase tracking-wider">
                        <CheckCircle2 size={15} />
                        <span>Gaya Suara Menungsa</span>
                      </div>
                      <button
                        onClick={() => handleCopy(ex.worked.copy, ex.id)}
                        className="btn-secondary px-2.5 py-1 text-xs gap-1.5 font-sans cursor-pointer"
                        title="Salin ke clipboard"
                        aria-label={isCopied ? "Teks naskah berhasil disalin ke clipboard" : "Salin naskah ke clipboard"}
                      >
                        <span className="sr-only" aria-live="polite">
                          {isCopied ? "Teks berhasil disalin" : ""}
                        </span>
                        {isCopied ? (
                          <>
                            <Check size={13} className="text-emerald-500" />
                            <span className="text-emerald-600 dark:text-emerald-400 font-medium">Tersalin!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={13} />
                            <span>Salin Teks</span>
                          </>
                        )}
                      </button>
                    </div>

                    <blockquote className="font-serif text-base leading-relaxed text-stone-100 max-w-[74ch]">
                      "{ex.worked.copy}"
                    </blockquote>
                  </div>

                  {/* Weak / Common Anti-Pattern */}
                  <div className="rounded-[6px] border border-amber-700/25 bg-amber-950/20 p-4 space-y-3">
                    <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 text-xs font-sans font-bold uppercase tracking-wider">
                      <AlertTriangle size={15} />
                      <span>Anti-Pola Umum (Bumerang / Cringe)</span>
                    </div>

                    <blockquote className="font-serif text-sm leading-relaxed text-stone-300 italic max-w-[74ch]">
                      "{ex.weak.copy}"
                    </blockquote>
                  </div>
                </div>

                {/* Linguistic Rationale */}
                <div className="rounded-[6px] bg-stone-950/60 p-4 border border-stone-800/80 text-xs text-stone-300 space-y-1.5 font-sans">
                  <div className="kicker">
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


