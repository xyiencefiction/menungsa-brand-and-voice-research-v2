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
  "EX-C01-1": "Mulai dari situasi yang dapat dikenali tanpa menyimpulkan diagnosis pembaca.",
  "EX-C01-2": "Tawarkan jeda sebagai pilihan. Jangan menambahkan klaim hormon atau durasi manfaat tanpa sumber.",
  "EX-C02-1": "Gambarkan pengalaman tanpa menyimpulkan bahwa keluhan pasti normal atau tidak perlu diperhatikan.",
  "EX-C02-2": "Biarkan pengamatan berdiri sendiri. Jangan menyimpulkan penyebab sulit tidur.",
  "EX-C03-1": "Pertahankan sudut pandang penutur dan detail pengalamannya. Cerita orang pertama harus diberi label fiksi jika bukan kesaksian nyata.",
  "EX-C03-2": "Tunjukkan kebersamaan tanpa menuntut pengungkapan pribadi. Cerita yang menyebut perasaan secara langsung tetap sah.",
  "EX-C04-1": "Jelaskan kegiatan dan pilihan untuk ikut tanpa bercerita. Verifikasi jadwal, lokasi, serta biaya sebelum digunakan.",
  "EX-C04-2": "Berikan pilihan untuk mengikuti percakapan tanpa memperkenalkan diri atau membagikan masalah pribadi.",
  "EX-C05-1": "Sebutkan durasi, jumlah peserta, pendamping, dan kebijakan privasi yang telah dipastikan.",
  "EX-C05-2": "Jelaskan cara membatalkan kehadiran sesuai kebijakan. Pembatasan kuota boleh dijelaskan tanpa membuat peserta merasa bersalah.",
  "EX-C06-1": "Jelaskan langkah mencari layanan tanpa menganggap tarif, jadwal, dan tenaga kesehatan sama di setiap fasilitas.",
  "EX-C06-2": "Berikan contoh meminta bantuan praktis tanpa menyatakan bahwa obrolan pasti cukup untuk mengatasi keluhan.",
  "EX-C07-1": "Sebutkan situasi secara langsung dan arahkan pada bantuan. Periksa nomor serta ketersediaan layanan sebelum digunakan.",
  "EX-C07-2": "Utamakan pendampingan dan akses bantuan segera, tanpa menyalahkan orang yang sedang kesulitan.",
  "EX-C08-1": "Akui tekanan di tempat kerja tanpa menambahkan penjelasan biologis yang belum diverifikasi.",
  "EX-C08-2": "Tawarkan percakapan sebagai salah satu cara memeriksa pilihan, tanpa menilai kemandirian pembaca.",
  "EX-C09-1": "Jelaskan hubungan antara biaya hidup dan tanggung jawab keluarga tanpa menetapkan satu penyebab semua kesulitan.",
  "EX-C09-2": "Arahkan pembahasan pada kebijakan kerja; jangan menyalahkan pekerja karena kesulitan menetapkan batas.",
  "EX-C10-1": "Hubungkan sikap dengan tindakan organisasi yang dapat diverifikasi. Angka contoh tidak boleh menjadi klaim tentang Menungsa.",
  "EX-C10-2": "Dasarkan usulan pada data dengan wilayah, tahun, dan sumber yang jelas. Gunakan placeholder sampai data tersedia.",
  "EX-C11-1": "Humor diarahkan pada pengalaman tim, bukan kesulitan audiens. Jangan menyajikan anekdot fiktif sebagai kejadian Menungsa.",
  "EX-C11-2": "Gunakan pengamatan ringan tanpa memberi penilaian bahwa orang sakit tetap harus bekerja.",
  "EX-C12-1": "Tampilkan proses yang belum selesai. Kisah pemulihan perlu sumber dan persetujuan, atau label fiksi yang jelas.",
  "EX-C12-2": "Tampilkan satu kegiatan dalam cerita, tanpa mengklaimnya sebagai intervensi yang terbukti untuk semua orang.",
  "EX-C13-1": "Beri ruang untuk kecewa tanpa mewajibkan optimisme atau hikmah.",
  "EX-C13-2": "Tawarkan kehadiran yang benar-benar dapat diberikan. Jangan menentukan bahwa orang berduka tidak membutuhkan kata-kata.",
  "EX-C14-1": "Gambarkan pengalaman berkegiatan tanpa membandingkan kemampuan atau memaksakan target.",
  "EX-C14-2": "Jelaskan tujuan kegiatan tanpa menyebutnya cara paling sehat untuk semua orang.",
  "EX-C01-3": "Berikan langkah sederhana tanpa menjanjikan perubahan pada sistem saraf.",
  "EX-C01-4": "Hindari menyimpulkan penyebab gejala fisik dari satu situasi. Contoh ini perlu peninjauan kesehatan.",
  "EX-C02-3": "Akui bahwa membalas pesan bisa terasa berat, tanpa memberi diagnosis atau membenarkan semua bentuk pengabaian.",
  "EX-C02-4": "Gunakan detail keseharian tanpa menyimpulkan kondisi kesehatan pembaca.",
  "EX-C03-3": "Detail benda dan rutinitas adalah pilihan gaya, bukan bukti bahwa ungkapan sedih yang langsung itu buruk.",
  "EX-C03-4": "Gambarkan kebersamaan tanpa menjanjikan pemulihan atau menuntut jawaban. Jangan mengubah detail kesaksian nyata tanpa persetujuan.",
  "EX-C04-3": "Jelaskan rute, durasi, dan aturan keikutsertaan yang benar-benar berlaku. Jangan menjanjikan hilangnya kecemasan.",
  "EX-C04-4": "Sebutkan kegiatan dan aturan partisipasi dengan jelas. Hanya janjikan sesi yang tersedia.",
  "EX-C05-3": "Jelaskan akses ruangan dan batas privasi secara konkret. Ruangan tertutup tidak menjamin kerahasiaan sepenuhnya.",
  "EX-C05-4": "Jelaskan pilihan untuk keluar atau beristirahat sesuai aturan sesi. Jangan menjanjikan kebebasan yang belum disediakan.",
  "EX-C06-3": "Gunakan alur pendaftaran yang telah diperiksa untuk fasilitas tertentu. Jangan menggeneralisasi cakupan biaya.",
  "EX-C06-4": "Beri contoh cara membuka percakapan. Pilih kata yang sesuai hubungan penutur dengan orang yang dihubungi.",
  "EX-C07-3": "Berikan langkah keselamatan yang jelas. Jangan menjadikan teknik menenangkan diri sebagai prasyarat menghubungi bantuan.",
  "EX-C07-4": "Arahkan pendamping untuk tetap bersama orang yang berisiko dan mencari bantuan segera. Jangan menjanjikan hasil tertentu.",
  "EX-C08-3": "Akui niat tidak merepotkan keluarga, lalu berikan pilihan meminta bantuan. Tidak perlu menyamakan manusia dengan mesin.",
  "EX-C08-4": "Pisahkan kesulitan menghadapi situasi dari penilaian harga diri. Hindari klaim yang mencakup semua orang.",
  "EX-C09-3": "Bahas beban membiayai dua generasi tanpa mereduksinya menjadi kegagalan pribadi atau satu penyebab tunggal.",
  "EX-C09-4": "Jelaskan kebutuhan batas komunikasi kerja tanpa menjadikan produktivitas satu-satunya alasan beristirahat.",
  "EX-C10-3": "Periksa angka, profesi, wilayah, dan periode sebelum mengatasnamakan data Kemenkes.",
  "EX-C10-4": "Jelaskan metode, cakupan, dan sumber pemantauan sebelum menyatakan angka sebagai hasil temuan.",
  "EX-C11-3": "Gunakan detail keseharian tanpa menyiratkan ada produk kopi yang terbukti aman untuk kondisi tertentu.",
  "EX-C11-4": "Humor muncul dari selisih rencana dan kejadian. Hindari menyalahkan orang karena belum konsisten.",
  "EX-C12-3": "Akui kemajuan kecil tanpa menjadikannya standar pemulihan atau ukuran harga diri.",
  "EX-C12-4": "Gambarkan perubahan kebiasaan tanpa mengarang pengukuran atau hasil klinis.",
  "EX-C13-3": "Akui dampak kehilangan pekerjaan tanpa menganggap pengalaman dan waktunya seragam.",
  "EX-C13-4": "Hormati lamanya duka tanpa menetapkan tenggat untuk pulih.",
  "EX-C14-3": "Gambarkan jeda dan kegiatan, tanpa menambahkan klaim pemulihan sensorik atau terapi.",
  "EX-C14-4": "Jelaskan rute dan cara kelompok menjaga kebersamaan. Pastikan aturan ini berlaku sebelum undangan dipakai."
};
const WORKED_COPY_ID_MAP: Record<string, string> = {
  "EX-C01-1": "Kerjaan belum selesai, tapi rasanya sudah sulit fokus. Dalam tulisan ini, kita membahas beban kerja dan pilihan untuk mengambil jeda.",
  "EX-C01-2": "Kalau memungkinkan, ambil jeda sebentar dari pekerjaan. Kamu tidak perlu menyelesaikan semuanya sekaligus.",
  "EX-C02-1": "Masih datang kerja tepat waktu. Masih membalas pesan kantor. Sampai di rumah, kamu duduk di tepi kasur. Lampu kamar belum dinyalakan, padahal hari sudah gelap.",
  "EX-C02-2": "Jam sebelas malam, layar ponsel sudah dimatikan. Tapi sampai jam tiga pagi, matamu masih menatap langit-langit kamar.",
  "EX-C03-1": "Bulan ketiga setelah toko tutup, saya masih bangun jam lima pagi. Saya duduk di teras, menyeduh kopi, dan melihat orang-orang berangkat kerja. Saya masih khawatir soal apa yang akan saya lakukan setelah ini.",
  "EX-C04-1": "Kami akan jalan santai di [lokasi] pada [hari, tanggal, dan jam]. Kegiatannya [rincian dan durasi]. Kamu boleh ikut tanpa harus bercerita. [Biaya dan cara bergabung yang sudah diverifikasi].",
  "EX-C05-1": "Sesi berlangsung pada [hari, tanggal, jam] di [lokasi], dengan [jumlah peserta] dan [kualifikasi pendamping yang terverifikasi]. [Kebijakan dokumentasi dan penggunaan nama]. Peserta [aturan berbicara yang berlaku].",
  "EX-C06-1": "Untuk mencari layanan di wilayahmu, periksa [tautan resmi fasilitas]. Di sana tercantum [informasi yang memang tersedia]. Hubungi [kontak terverifikasi] untuk memastikan jadwal, biaya, dan cara mendaftar.",
  "EX-C06-2": "Kalau beban kerja minggu ini terasa berat, kamu bisa mengajak rekan yang kamu percaya membicarakan pembagian tugas. Pilih hal yang memang bisa dibantu bersama.",
  "EX-C07-1": "Jika kamu merasa akan menyakiti diri sekarang, minta orang yang kamu percaya untuk menemanimu dan cari bantuan darurat atau datang ke IGD terdekat. Untuk dukungan psikologis, informasi akses Healing119.id tersedia di situs resminya.",
  "EX-C07-2": "Jika dorongan untuk menyakiti diri terasa mendesak, minta orang yang kamu percaya untuk tetap bersamamu. Cari bantuan darurat atau minta ia menemanimu ke IGD terdekat.",
  "EX-C08-1": "Menahan keluhan sering dianggap bagian dari pekerjaan. Padahal, beban kerja juga perlu dibicarakan agar pembagian tugas dan waktu istirahat bisa ditinjau.",
  "EX-C08-2": "Menyelesaikan masalah sendiri bisa terasa penting. Membicarakan rencana dengan orang yang kamu percaya juga bisa menjadi cara untuk melihat pilihan yang belum terpikirkan.",
  "EX-C09-1": "Saat biaya hidup naik, memenuhi kebutuhan keluarga bisa terasa semakin berat. Membicarakan pengeluaran bersama pun belum tentu mudah.",
  "EX-C09-2": "Ketika lembur tanpa kompensasi dianggap biasa, kelelahan pekerja mudah dianggap sebagai bukti dedikasi. Kebijakan kerjanya juga perlu ditinjau.",
  "EX-C10-1": "Kami ingin memperluas akses dukungan kesehatan mental. Pada [periode], Menungsa [tindakan yang sudah dilakukan], dengan [cakupan yang sudah diverifikasi].",
  "EX-C10-2": "Menurut [sumber resmi, tahun], anggaran kesehatan jiwa di [wilayah] sebesar [angka dan satuan]. Berdasarkan data tersebut, kami mengusulkan [tindakan konkret].",
  "EX-C11-1": "Tadi pagi kami membahas rencana konten tentang istirahat. Obrolannya malah berlanjut ke video ulasan sepeda motor yang kami tonton semalam.",
  "EX-C12-1": "Setelah enam bulan konseling, masalah Dimas belum semuanya selesai. Ia mulai mengenali kapan perlu meminta bantuan, meski masih ada hari-hari yang berat.",
  "EX-C13-2": "Aku ikut berduka. Kalau kamu ingin ditemani, aku bisa duduk di sini. Kita tidak harus banyak bicara.",
  "EX-C14-1": "Pagi ini kami lari bersama. Tidak sedang mengejar waktu tercepat, hanya menikmati langkah dan udara pagi setelah seminggu bekerja di depan layar.",
  "EX-C14-2": "Main bola mingguan ini tujuannya sederhana: berkegiatan, tertawa saat salah umpan, lalu makan bersama.",
  "EX-C01-3": "Sudah lama duduk di depan layar? Kalau memungkinkan, berhenti sebentar dan beralih dari pekerjaanmu.",
  "EX-C01-4": "Email baru masuk saat tugas sebelumnya belum selesai. Kalau memungkinkan, catat dulu mana yang perlu dikerjakan lebih awal.",
  "EX-C02-3": "Masih sempat pulang naik motor, mencuci piring, dan memberi makan kucing. Tapi saat teman mengajak ngopi, kamu belum tahu harus membalas apa. Pesannya baru terjawab tiga hari kemudian.",
  "EX-C03-3": "Enam bulan setelah usaha sablon tutup, saya masih sering merapikan rak cat di garasi. Menyeka debu di kaleng-kaleng yang sudah kering, lalu mencocokkan kode warna yang tak lagi dipakai. Saya masih belum terbiasa kehilangan rutinitas itu.",
  "EX-C04-3": "Jalan pagi santai di [lokasi], [hari, tanggal, dan jam]. Rutenya [kondisi rute] dengan perkiraan durasi [durasi]. [Biaya dan aturan bergabung]. Kamu boleh ikut tanpa harus bercerita.",
  "EX-C05-3": "Sesi berlangsung di [ruang dan lantai]. Masuk melalui [akses yang tersedia]. [Penjelasan kondisi ruang dan batas privasi]. Sesi didampingi [pendamping dan kualifikasi yang sudah diverifikasi].",
  "EX-C06-3": "Untuk berkonsultasi di [nama fasilitas], ikuti [alur pendaftaran terverifikasi]. Siapkan [dokumen yang dipersyaratkan]. Pastikan jadwal dan biaya melalui [kontak resmi].",
  "EX-C06-4": "Kamu bisa mulai dengan pesan singkat kepada teman yang kamu percaya: “Lagi ada waktu? Ada soal kerjaan yang ingin kutanyakan.”",
  "EX-C07-3": "Jika kamu berisiko menyakiti diri sekarang, minta orang yang kamu percaya untuk menemanimu dan membantu menjauhkan benda berbahaya. Cari bantuan darurat atau minta didampingi ke IGD terdekat.",
  "EX-C07-4": "Jika temanmu mengatakan ingin mengakhiri hidup, dengarkan tanpa menghakimi. Jika ada bahaya segera, tetaplah bersamanya dan hubungi bantuan darurat atau tenaga kesehatan.",
  "EX-C08-3": "Kamu mungkin tidak ingin merepotkan keluarga. Jika ada yang bisa dibantu, kamu boleh menyampaikan kebutuhanmu dan membicarakan pilihan bersama.",
  "EX-C08-4": "Tidak semua masalah punya jawaban yang langsung jelas. Menghadapi ketidakpastian tidak membuatmu kurang berharga.",
  "EX-C09-3": "Membiayai orang tua sekaligus anak bisa terasa berat, terutama saat penghasilan terbatas dan dukungan sosial sulit diakses. Persoalan ini tidak cukup dijelaskan sebagai kurang disiplin mengatur uang.",
  "EX-C09-4": "Pesan kantor yang terus datang hingga malam dapat menyita waktu istirahat. Tempat kerja perlu menjelaskan kapan pekerja diharapkan merespons dan kapan mereka dapat beristirahat.",
  "EX-C10-3": "Menurut [sumber resmi, tahun], tersedia [angka dan satuan] psikolog klinis di [wilayah]. Kami mengusulkan [langkah konkret yang relevan dengan data].",
  "EX-C10-4": "Dalam [pemantauan dan periode yang terdokumentasi], [hasil dengan satuan dan cakupan]. Berdasarkan temuan itu, kami mengusulkan [perbaikan yang spesifik].",
  "EX-C11-3": "Tadi siang kami berniat menyusun satu panduan singkat. Empat puluh menit kemudian, kami masih membahas kopi sachet favorit masing-masing.",
  "EX-C12-3": "Minggu ini Reza sempat merapikan kasur dan mandi pagi tiga hari berturut-turut. Masih ada hari yang terasa berat. Dalam cerita ini, kemajuannya tidak berarti semua masalah sudah selesai.",
  "EX-C12-4": "Bayu mulai mengisi daya ponsel di ruang tengah. Dengan begitu, ponselnya tidak selalu ada di samping bantal saat ia hendak tidur.",
  "EX-C13-3": "Kehilangan pekerjaan bisa berarti kehilangan penghasilan sekaligus rutinitas. Kalau rasanya masih limbung, kamu tidak harus langsung memaksakan diri optimistis.",
  "EX-C13-4": "Setahun setelah seseorang pergi, lagu lama atau aroma masakan masih bisa mengingatkanmu kepadanya. Kamu tidak harus buru-buru menghapus rasa rindu itu.",
  "EX-C14-3": "Sore ini, kami berjalan mengitari taman. Ada waktu untuk melihat langit dan mengobrol setelah seharian bekerja."
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

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      setCopiedId(null);
    }
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
        const workedText = WORKED_COPY_ID_MAP[ex.id] ?? ex.worked.copy;
        const inCopy = workedText.toLowerCase().includes(q) || ex.weak.copy.toLowerCase().includes(q);
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
          Contoh naskah Menungsa
        </h1>
        <p className="text-sm md:text-base text-stone-300 max-w-[74ch] leading-relaxed font-sans">
          Bandingkan contoh naskah untuk berbagai situasi, lalu baca alasan pilihan katanya. Semua contoh bersifat ilustratif dan perlu disesuaikan sebelum digunakan, termasuk fakta, informasi layanan, dan kebijakan privasi.
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
          <div className="flex items-center gap-0.5 self-end md:self-auto bg-stone-900 border border-stone-800 rounded-[6px] p-1 shrink-0" role="group" aria-label="Susunan kartu contoh">
            <button
              type="button"
              onClick={() => setLayoutMode('two-column')}
              aria-pressed={layoutMode === 'two-column'}
              aria-label="Tampilkan kartu dalam dua kolom"
              className={`p-1.5 rounded-[4px] cursor-pointer transition ${
                layoutMode === 'two-column'
                  ? 'bg-amber-600 text-[#F1ECDF] shadow-raised'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Dua kolom"
            >
              <LayoutGrid size={15} />
            </button>
            <button
              type="button"
              onClick={() => setLayoutMode('single-column')}
              aria-pressed={layoutMode === 'single-column'}
              aria-label="Tampilkan kartu dalam satu kolom"
              className={`p-1.5 rounded-[4px] cursor-pointer transition ${
                layoutMode === 'single-column'
                  ? 'bg-amber-600 text-[#F1ECDF] shadow-raised'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Satu kolom"
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
              Situasi:
            </label>
            <div className="relative w-full">
              <select
                id="context-select"
                value={selectedContext}
                onChange={(e) => setSelectedContext(e.target.value)}
                aria-label="Pilih situasi"
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
              placeholder="Cari kata atau topik dalam contoh…"
              aria-label="Cari contoh naskah"
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
              Hapus semua filter
            </button>
          )}
        </div>
      </div>

      {/* Exemplar Cards Grid */}
      <div className={layoutMode === 'two-column' ? 'grid grid-cols-1 lg:grid-cols-2 gap-6' : 'grid grid-cols-1 gap-6 max-w-5xl mx-auto'}>
        {filteredExemplars.length === 0 ? (
          <div className="col-span-full rounded-xl border border-dashed border-stone-800 p-12 text-center text-stone-400 text-xs">
            Belum ada contoh yang cocok. Coba kata lain atau hapus filter.
          </div>
        ) : (
          filteredExemplars.map((ex) => {
            const isCopied = copiedId === ex.id;
            const contextLabel = CONTEXT_ID_MAP[ex.contextId] ?? ex.contextId;
            const channelLabel = CHANNEL_ID_MAP[ex.channel] ?? ex.channel;
            const rationaleText = RATIONALE_ID_MAP[ex.id] ?? ex.rationale;
            const workedCopy = WORKED_COPY_ID_MAP[ex.id] ?? ex.worked.copy;

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
                          <span>Contoh sesuai panduan</span>
                        </div>
                        <button
                          onClick={() => handleCopy(workedCopy, ex.id)}
                          className="btn-secondary px-2.5 py-1 text-xs gap-1.5 font-sans cursor-pointer shrink-0"
                          title="Salin naskah"
                          aria-label={isCopied ? "Teks naskah berhasil disalin ke clipboard" : "Salin naskah ke clipboard"}
                        >
                          <span className="sr-only" aria-live="polite">
                            {isCopied ? "Teks berhasil disalin" : ""}
                          </span>
                          {isCopied ? (
                            <>
                              <Check size={13} className="text-emerald-500" />
                              <span className="text-emerald-600 dark:text-emerald-400 font-medium">Teks disalin</span>
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
                        "{workedCopy}"
                      </blockquote>
                    </div>

                    {/* Weak / Common Anti-Pattern */}
                    <div className="rounded-[6px] border border-amber-700/25 bg-amber-950/20 p-3.5 space-y-2">
                      <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 text-xs font-sans font-bold uppercase tracking-wider">
                        <AlertTriangle size={15} />
                        <span>Contoh yang perlu ditinjau</span>
                      </div>

                      <blockquote className="font-serif text-xs md:text-sm leading-relaxed text-stone-300 italic">
                        "{ex.weak.copy}"
                      </blockquote>
                    </div>
                  </div>

                  {/* Linguistic Rationale at bottom */}
                  <div className="rounded-[6px] bg-stone-950/60 p-3.5 border border-stone-800/80 text-xs text-stone-300 space-y-1 font-sans mt-3">
                    <div className="kicker">
                      Alasan pilihan kata
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
                        <span>Contoh sesuai panduan</span>
                      </div>
                      <button
                        onClick={() => handleCopy(workedCopy, ex.id)}
                        className="btn-secondary px-2.5 py-1 text-xs gap-1.5 font-sans cursor-pointer"
                        title="Salin naskah"
                        aria-label={isCopied ? "Teks naskah berhasil disalin ke clipboard" : "Salin naskah ke clipboard"}
                      >
                        <span className="sr-only" aria-live="polite">
                          {isCopied ? "Teks berhasil disalin" : ""}
                        </span>
                        {isCopied ? (
                          <>
                            <Check size={13} className="text-emerald-500" />
                            <span className="text-emerald-600 dark:text-emerald-400 font-medium">Teks disalin</span>
                          </>
                        ) : (
                          <>
                            <Copy size={13} />
                            <span>Salin naskah</span>
                          </>
                        )}
                      </button>
                    </div>

                    <blockquote className="font-serif text-base leading-relaxed text-stone-100 max-w-[74ch]">
                      "{workedCopy}"
                    </blockquote>
                  </div>

                  {/* Weak / Common Anti-Pattern */}
                  <div className="rounded-[6px] border border-amber-700/25 bg-amber-950/20 p-4 space-y-3">
                    <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 text-xs font-sans font-bold uppercase tracking-wider">
                      <AlertTriangle size={15} />
                      <span>Contoh yang perlu ditinjau</span>
                    </div>

                    <blockquote className="font-serif text-sm leading-relaxed text-stone-300 italic max-w-[74ch]">
                      "{ex.weak.copy}"
                    </blockquote>
                  </div>
                </div>

                {/* Linguistic Rationale */}
                <div className="rounded-[6px] bg-stone-950/60 p-4 border border-stone-800/80 text-xs text-stone-300 space-y-1.5 font-sans">
                  <div className="kicker">
                    Alasan pilihan kata
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


