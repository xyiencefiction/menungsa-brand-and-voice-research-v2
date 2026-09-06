const fs = require('fs');
const path = require('path');

const cheatsheet = [];
const seen = new Set();

function addTerm(term, category, categoryLabel, severity, impact, replacement) {
  const t = term.toLowerCase().trim();
  if (!t || seen.has(t)) return;
  seen.add(t);
  cheatsheet.push({
    term: t,
    category,
    categoryLabel,
    severity,
    impact,
    replacement
  });
}

// ==========================================
// CATEGORY 1: MORALIZING & SCOLDING (PENGHAKIMAN MORAL)
// ==========================================
const moralRoots = [
  { root: 'wajib', var: ['wajib', 'diwajibkan', 'mewajibkan', 'kewajiban', 'berkewajiban', 'kewajiban mutlak', 'kewajiban moril', 'wajib hukumnya', 'sewajibnya', 'diwajibkan bagi', 'kewajiban primer', 'menjadi kewajiban', 'wajib ditaati', 'kewajiban mutlak pria', 'wajib kamu pahami'] },
  { root: 'harus', var: ['harus', 'seharusnya', 'keharusan', 'semestinya', 'sepatutnya', 'seyogianya', 'harus kamu sadari', 'tiada pilihan selain', 'harus bertanggung jawab', 'harus berubah', 'harus mengerti', 'harus tunduk', 'kamu harus sadar', 'harus tahu diri', 'harus introspeksi'] },
  { root: 'dosa', var: ['dosa', 'berdosa', 'pendosa', 'beban dosa', 'bergelimang dosa', 'berlumur dosa', 'dosa besar', 'dosa sosial', 'menebus dosa', 'penebusan dosa', 'dosa turunan', 'tertimbun dosa', 'penuh dosa', 'timbunan dosa', 'kubangan dosa', 'terkutuk dosa', 'dosa masa lalu', 'lingkaran dosa', 'dosa moral', 'dosa tak terampuni'] },
  { root: 'aib', var: ['aib', 'mengaibkan', 'aib keluarga', 'aib besar', 'menutup aib', 'membuka aib', 'aib diri', 'mencoreng aib', 'berkalang aib', 'noda aib', 'aib masa lalu', 'aib seumur hidup', 'tercoreng aib', 'aib tak terhapus', 'noda hitam aib'] },
  { root: 'malu', var: ['malu', 'memalukan', 'mempermalukan', 'dipermalukan', 'tak tahu malu', 'muka tembok', 'muka tebal', 'mencolek arang', 'bikin malu', 'rasa malu', 'menanggung malu', 'malu-maluin', 'tanpa rasa malu', 'harga diri runtuh', 'coreng muka', 'aib memalukan', 'permalukan di depan umum', 'tanggung malu'] },
  { root: 'hina', var: ['hina', 'kehinaan', 'terhina', 'menghinakan', 'dihinakan', 'dihina', 'menghina', 'penghinaan', 'sehina-hinanya', 'cerca', 'mencerca', 'dicerca', 'cercaan', 'tercerca', 'penistaan', 'caci maki', 'hina dina', 'derajat terhina'] },
  { root: 'nista', var: ['nista', 'kenistaan', 'menistakan', 'dinistakan', 'ternista', 'penistaan', 'nista dan hina', 'kelakuan nista', 'perbuatan nista', 'jalan ternista', 'lembah kenistaan'] },
  { root: 'cela', var: ['cela', 'tercela', 'mencela', 'dicela', 'celaan', 'pencela', 'mencela-cela', 'cacat cela', 'tiada celaan', 'perbuatan tercela', 'tabiat tercela'] },
  { root: 'bejat', var: ['bejat', 'kebejatan', 'membejat', 'amoral', 'kebejatan moral', 'moral bejat', 'kelakuan bejat', 'pria bejat', 'otak bejat', 'pikiran bejat', 'tabiat bejat', 'moralitas bejat'] },
  { root: 'moral', var: ['moral', 'moralitas', 'tak bermoral', 'rusak moral', 'merosot moral', 'krisis moral', 'hancur moral', 'cacat moral', 'bobrok moral', 'pelanggar moral', 'pengadilan moral', 'sanksi moral', 'beban moral', 'moral bobrok', 'standar moral', 'hancur moralitas', 'kemerosotan moral'] },
  { root: 'norma', var: ['norma', 'melanggar norma', 'menyimpang', 'penyimpangan', 'asusila', 'tak beretika', 'tata susila', 'tunasusila', 'penyimpangan norma', 'tata krama rusak', 'langgar norma susila'] },
  { root: 'kodrat', var: ['kodrat', 'melawan kodrat', 'menyalahi kodrat', 'kodrat lelaki', 'kodrat pria', 'kodrat ilahi', 'menyimpang dari kodrat', 'mengingkari kodrat', 'tak sesuai kodrat'] },
  { root: 'azab', var: ['azab', 'kena azab', 'terkutuk', 'kutukan', 'mengutuk', 'dikutuk', 'laknat', 'terlaknat', 'melaknat', 'dilaknat', 'hukuman tuhan', 'azab kubur', 'balasan pedih', 'siksa pedih', 'murka ilahi', 'siksa akhirat', 'azab tuhan', 'laknat semesta'] },
  { root: 'tobat', var: ['tobat', 'bertobatlah', 'bertaubat', 'insyaf', 'penyesalan', 'sesali dosamu', 'ruwat diri', 'pertobatan', 'tobat nasuha', 'minta ampun', 'sadarlah kamu', 'segeralah bertobat', 'bertaubatlah sekarang', 'ketuk pintu tobat'] },
  { root: 'munafik', var: ['munafik', 'kemunafikan', 'sok suci', 'munafikun', 'topeng palsu', 'pura-pura suci', 'orang munafik', 'bermuka dua', 'sok alim', 'munafik sejati', 'perilaku munafik'] },
  { root: 'pantas', var: ['pantas', 'tidak pantas', 'tak layak', 'tak pantas hidup', 'tidak patut', 'ketidakpatutan', 'kurang ajar', 'tak tahu diri', 'tidak tahu adat', 'tak beradab', 'pria tak tahu diri', 'tak patut ditiru'] },
  { root: 'salah', var: ['salah', 'bersalah', 'merasa bersalah', 'menyalahkan', 'tersalah', 'pengadilan diri', 'menghakimi', 'terhakimi', 'hakim moral', 'polisi moral', 'memvonis salah', 'semua salahmu', 'kamu biang kerok', 'kamu penyebab kehancuran', 'mengadili orang'] },
  { root: 'pengecut', var: ['pengecut', 'penakut', 'pecundang', 'mental pecundang', 'jiwa kerdil', 'lari dari tanggung jawab', 'cupu', 'bersembunyi seperti pengecut', 'pria penakut', 'nyali kerupuk', 'lelaki pengecut', 'jangan bersembunyi'] },
  { root: 'durhaka', var: ['durhaka', 'kedurhakaan', 'mendurhakai', 'anak durhaka', 'suami durhaka', 'lelaki durhaka', 'istri durhaka', 'keluarga durhaka', 'tindakan durhaka'] },
  { root: 'sesat', var: ['sesat', 'menyesatkan', 'disesatkan', 'kesesatan', 'penyesatan', 'jalan sesat', 'ajaran sesat', 'tersesat batin', 'sesat pikir', 'langkah sesat', 'pria tersesat'] },
  { root: 'khianat', var: ['khianat', 'berkhianat', 'pengkhianat', 'mengkhianati', 'ingkar janji', 'mengingkari komitmen', 'mungkir', 'sumpah palsu', 'cuci tangan', 'lepas tangan', 'pengkhianatan terbesar', 'khianat janji'] },
  { root: 'kotor', var: ['jiwa kotor', 'hati bernoda', 'kotoran batin', 'najis moral', 'kebusukan hati', 'hati busuk', 'busuk budi', 'perilaku kotor', 'niat busuk', 'jiwa ternoda', 'batin kotor'] },
  { root: 'lalai', var: ['lalai', 'melalaikan amanah', 'melalaikan kewajiban', 'lepas tanggung jawab', 'lempar tanggung jawab', 'menelantarkan keluarga', 'lalai menafkahi', 'suami lalai', 'ayah lalai', 'kelalaian fatal'] },
  { root: 'hukum karma', var: ['hukum karma', 'hukum kualat', 'kualat', 'kena batunya', 'balasan setimpal', 'neraka jahanam', 'terbakar api neraka', 'siksa kubur', 'hukuman akhirat', 'karma buruk', 'dituai di neraka', 'tuaian dosa'] },
  { root: 'sampah', var: ['sampah masyarakat', 'beban keluarga', 'beban masyarakat', 'parasit', 'benalu', 'parasit sosial', 'benalu keluarga', 'manusia tak berguna', 'tidak berguna', 'tak bernilai', 'hidupmu sia-sia', 'tiada guna', 'pria tak berguna'] }
];

moralRoots.forEach(b => {
  b.var.forEach(v => {
    addTerm(v, 'moral', 'Penghakiman Moral & Menggurui', 'critical',
      'Memicu rasa bersalah berlebih, sikap defensif, dan penolakan batin (reactance) pada pria dewasa.',
      'Gunakan pengamatan faktual netral tanpa label dosa/aib/kewajiban mutlak.'
    );
  });
});

const moreMoral = [
  'tuntutan moral', 'kewajiban asasi', 'beban dosa', 'hina dina', 'pemberang', 'budi rusak',
  'rendah budi', 'cacat budi', 'tata susila rusak', 'pengadilan sosial', 'sanksi sosial',
  'dihakimi warga', 'dihujat masyarakat', 'hujatan moral', 'cercaan publik', 'laknat ilahi',
  'murka tuhan', 'kutukan batin', 'dosa tak berampun', 'muka coreng', 'coreng arang',
  'celaka besar', 'kebinasaan diri', 'rusak jiwa', 'pria tak tahu diri', 'pria tak bertanggung jawab',
  'ingkar kodrat', 'hamba hawa nafsu', 'budak nafsu', 'sesat jalan', 'berlumur noda',
  'aib tercela', 'hina sehina-hinanya', 'lelaki bejat', 'pria bejat', 'perusak norma',
  'niradab', 'biadab', 'tindakan biadab', 'perilaku asusila', 'sok benar', 'merasa suci',
  'mengkhotbahi', 'menceramahi pria', 'kuliah moral', 'petuah menggurui', 'tuntutan mutlak',
  'moral hazard', 'dekadensi moral', 'kemerosotan akhlak', 'rusak akhlak', 'akhlak bejat',
  'tanpa akhlak', 'buta moral', 'mati nurani', 'nurani mati', 'tumpul nurani',
  'sinful', 'sinner', 'shameful', 'guilt trip', 'guilty conscience', 'scolding tone',
  'moral failing', 'moral duty', 'unworthy', 'disgraceful', 'preachy',
  'hancur moralitasnya', 'tiada etika', 'rendah moral', 'terkutuklah', 'celakalah kamu',
  'noda hitam', 'tercela di mata tuhan', 'krisis nurani', 'pengkhianat keluarga',
  'cacat karakter', 'kehancuran budi', 'manusia amoral', 'hukuman moril', 'beban penyesalan',
  'tindakan memalukan', 'perilaku hina', 'pembangkang moril', 'cacat integritas',
  'tanggung dosamu', 'tanggung dosamu sendiri', 'hukum moral', 'hukuman moral',
  'tuntutan moril', 'mengkhianati janji', 'ingkar sumpah', 'sumpah palsu',
  'kehilangan nurani', 'hina di mata masyarakat', 'aib di lingkungan', 'dicap pendosa',
  'berlumuran dosa', 'kesesatan nyata', 'sanksi akhirat', 'hukuman gaib', 'hukum kualat'
];
moreMoral.forEach(t => {
  addTerm(t, 'moral', 'Penghakiman Moral & Menggurui', 'critical',
    'Menempatkan penulis sebagai figur penghakim yang merusak rasa hormat dan kenyamanan pembaca.',
    'Gunakan pendekatan empati membumi dan pengamatan fisiologis tubuh harian.'
  );
});

// ==========================================
// CATEGORY 2: HYPER-MASCULINE & MANOSPHERE CRINGE
// ==========================================
const cringeRoots = [
  { root: 'alfa', var: ['alfa', 'alpha', 'alpha male', 'pria alfa', 'cowok alfa', 'serigala alfa', 'mental alfa', 'aura alfa', 'alpha mindset', 'alpha energy', 'alpha wolf', 'true alpha', 'supreme alpha', 'alpha dominance', 'klan alfa', 'jiwa alfa', 'naluri alfa', 'alpha leader', 'alpha male indonesia', 'pria alpha tangguh', 'karakter alfa', 'postur alfa', 'alpha prime'] },
  { root: 'sigma', var: ['sigma', 'sigma male', 'cowok sigma', 'pria sigma', 'lone wolf', 'serigala penyendiri', 'sigma grindset', 'aturan sigma', 'jalur sigma', 'sigma mindset', 'dingin tanpa emosi', 'pria misterius dingin', 'sigma rule', 'sigma male mindset', 'sikap dingin pria', 'tatapan dingin', 'sigma energy', 'prinsip sigma'] },
  { root: 'beta', var: ['beta', 'beta male', 'cowok beta', 'pria beta', 'mental beta', 'cuckold', 'cuck', 'soy boy', 'simp', 'simping', 'budak cinta', 'bucin', 'membucin', 'mental budak', 'pria lemah beta', 'beta provider', 'pria simp', 'anti bucin', 'anti simp', 'jangan jadi beta'] },
  { root: 'omega', var: ['omega', 'omega male', 'pria omega', 'kasta omega', 'level omega', 'kasta terendah'] },
  { root: 'chad', var: ['chad', 'gigachad', 'giga-chad', 'stacy', 'becky', 'chad mindset', 'chad energy'] },
  { root: 'pejantan', var: ['pejantan', 'pejantan tangguh', 'pejantan sejati', 'kejantanan', 'kejantanan sejati', 'bukti kejantanan', 'uji kejantanan', 'simbol kejantanan', 'jantan', 'kejantanan pria', 'jantan tulen', 'darah pejantan', 'jiwa jantan', 'lelaki jantan', 'kejantanan sejati pria'] },
  { root: 'pria sejati', var: ['pria sejati', 'lelaki sejati', 'laki-laki sejati', 'cowok sejati', 'pria tangguh sejati', 'real men', 'real man', 'true man', 'true masculinity', 'kejantanan hakiki', 'pria perkasa', 'pria gagah perkasa', 'pria tangguh', 'pria sejati pantang menangis', 'pria sejati tak mengeluh', 'lelaki perkasa', 'lelaki tangguh sejati', 'ciri pria sejati', 'standar pria sejati'] },
  { root: 'high value', var: ['high value man', 'high-value male', 'pria bernilai tinggi', 'wanita bernilai rendah', 'kasta pria', 'hirarki pria', 'kasta maskulin', 'derajat pria', 'hvm', 'high value mindset', 'ranking pria', 'pria kelas atas', 'dating market value', 'dmv', 'nilai pasar kencan'] },
  { root: 'dominasi', var: ['dominan', 'dominasi', 'mendominasi', 'didominasi', 'tundukkan', 'menundukkan', 'ditundukkan', 'taklukkan', 'menaklukkan', 'ditaklukkan', 'penakluk', 'penakluk wanita', 'penakluk dunia', 'penakluk ego', 'sang penakluk', 'raja singa', 'raja hutan', 'penguasa mutlak', 'alpha dominance', 'hierarki dominasi', 'rantai makanan sosial', 'taklukkan lawanmu'] },
  { root: 'red pill', var: ['red pill', 'redpill', 'red pillers', 'telan pil merah', 'melek pil merah', 'blackpill', 'black pill', 'doomer', 'bluepill', 'incel', 'involuntarily celibate', 'hypergamy', 'hipergami', 'kasta kencan', 'female hypergamy', 'matrix', 'keluar dari matriks', 'bangun dari matriks', 'red pill indonesia', 'filosofi red pill', 'redpill coach'] },
  { root: 'cemen', var: ['cemen', 'kecemenan', 'lembek', 'kelembekan', 'cowok lembek', 'laki-laki lembek', 'cengeng', 'cowok cengeng', 'laki-laki cengeng', 'cengengesan', 'jangan cengeng', 'jangan lembek', 'mental tempe', 'mental kerupuk', 'mental rapuh', 'mental tisu', 'banci', 'kebancian', 'seperti perempuan', 'payah', 'pecundang', 'loser', 'cowok menye-menye', 'banci kaleng'] },
  { root: 'grindset', var: ['grindset', 'toxic grindset', 'hustle culture', 'jangan tidur sebelum sukses', 'tidur saat mati', 'istirahat itu untuk orang lemah', 'pantang istirahat', 'kerja 20 jam', 'istirahat hanya buang waktu', 'libur itu dosa', 'pantang mengeluh', 'pantang mundur', 'petarung tak kenal lelah', 'darah prajurit', 'samurai jiwa', 'jiwa gladiator', 'hustle tiada henti', 'mati di medan kerja', 'grind non-stop', 'hustle tiap hari'] },
  { root: 'manosphere', var: ['pick up artist', 'pua', 'game kencan', 'negging', 'push pull', 'frame control', 'pertahankan frame', 'kunci frame', 'alpha frame', 'frame lelaki', 'jangan validasi wanita', 'starve validation', 'guru maskulinitas', 'bucin tolol', 'bucin akut', 'cinta buta cengeng', 'pria bucin'] },
  { root: 'hewan buas', var: ['singa bukan domba', 'serigala bukan anjing', 'elang terbang tinggi', 'raja rimba', 'mental singa', 'jiwa serigala', 'lolongan serigala', 'predator puncak', 'apex predator', 'rantai makanan teratas', 'pola pikir predator', 'naluri buas'] },
  { root: 'biohacking kaku', var: ['cold shower tiap subuh', 'no fap', 'nofap', 'semen retention', 'retensi energi', 'dopamine detox', 'monk mode', 'fokus grind', 'looksmaxxing', 'mewing', 'hunter mindset', 'tubuh berotot baja'] },
  { root: 'maskulin klise', var: ['maskulinitas sejati', 'maskulinitas tulen', 'maskulinitas mutlak', 'maskulin perkasa', 'jiwa maskulin sejati', 'kemaskulinan mutlak', 'maskulinitas murni', 'pesona maskulin ganas'] }
];

cringeRoots.forEach(b => {
  b.var.forEach(v => {
    addTerm(v, 'cringe', 'Klise Maskulin & Jargon Manosphere', 'warning',
      'Memicu rasa canggung (cringe), dicap tidak tulus, dan menurunkan reputasi naskah di mata pria dewasa.',
      'Arahkan naskah pada ketrampilan nyata, keahlian fungsional, dan tanggung jawab dewasa.'
    );
  });
});

const moreCringe = [
  'tulang punggung tak kenal lelah', 'hati batu', 'air mata pria itu haram',
  'menangis itu aib pria', 'cowok sejati nggak baper', 'baperan', 'cowok kok baper',
  'man up', 'cowok harus keras', 'didik dengan kekerasan', 'lelaki keras kepala',
  'raja jalanan', 'pemimpin mutlak', 'kodrat penguasa', 'tundukkan egomu wahai wanita',
  'pasar kencan liar', 'body count', 'predator di bisnis', 'buas mengejar target',
  'pria penakluk', 'hukum rimba pria', 'hukum hutan', 'seleksi alam pria', 'siapa kuat dia menang',
  'menangis tanda lemah', 'mengeluh tanda pecundang', 'curhat itu banci', 'jangan banyak drama',
  'cowok drama', 'drama queen versi cowok', 'buang sifat femininmu', 'aura maskulin ganas',
  'kejantanan murni', 'pejantan alfa indonesia', 'cowok alpha tulen', 'singa lapar',
  'serigala berbulu domba', 'pria dingin tanpa ekspresi', 'topeng baja pria',
  'otot kawat tulang besi', 'urat kawat', 'pria tanpa air mata', 'hati dingin membeku',
  'senyum palsu petarung', 'laki-laki tak kenal rasa sakit', 'jiwa baja', 'mental baja',
  'pria tak kenal ampun', 'pria tanpa emosi', 'dingin seperti es', 'tatapan predator',
  'aura pembunuh', 'killer instinct pria', 'naluri pemburu', 'pria dominan mutlak',
  'jangan pernah memperlihatkan kelemahan', 'jangan pernah menangis di depan wanita'
];
moreCringe.forEach(t => {
  addTerm(t, 'cringe', 'Klise Maskulin & Jargon Manosphere', 'warning',
    'Klise usang yang memicu resistensi dan penolakan pada pria Indonesia modern.',
    'Gunakan padanan etis fungsional yang berakar pada kebajikan nyata.'
  );
});

// ==========================================
// CATEGORY 3: CLINICAL LABELS & PSYCHOBABBLE
// ==========================================
const clinicalRoots = [
  { root: 'depresi', var: ['depresi', 'depresi klinis', 'depresi mayor', 'depresi berat', 'penderita depresi', 'terserang depresi', 'mengidap depresi', 'gejala depresi', 'depresi terselubung', 'smiling depression', 'episode depresif', 'jurang depresi', 'terjerembap depresi', 'lingkaran setan depresi', 'depresi akut', 'skrining depresi', 'diagnosis depresi', 'distimia', 'dysthymia', 'depresi unipolar'] },
  { root: 'anxiety', var: ['anxiety', 'gangguan kecemasan', 'kecemasan akut', 'anxiety disorder', 'gad', 'serangan cemas', 'anxiety attack', 'fobia sosial', 'kecemasan sosial', 'phobia', 'kecemasan berlebih', 'anxious attachment', 'anxiety attack akut', 'generalized anxiety'] },
  { root: 'bipolar', var: ['bipolar', 'manic depressive', 'fase manik', 'fase depresi', 'mood swing ekstrem', 'bipolar disorder', 'gangguan bipolar', 'siklus bipolar', 'gangguan afektif', 'siklotimia'] },
  { root: 'skizofrenia', var: ['skizofrenia', 'skizofrenik', 'psikotik', 'psikosis', 'halusinasi', 'delusi akut', 'paranoid', 'paranoia', 'delusional', 'skizoafektif', 'waham'] },
  { root: 'trauma', var: ['trauma', 'traumatik', 'tertrauma', 'trauma masa kecil', 'childhood trauma', 'luka batin', 'luka batin mendalam', 'inner child', 'merawat inner child yang terluka', 'trauma healing', 'luka masa lalu', 'trauma turun-temurun', 'intergenerational trauma', 'traumatized', 'trauma kronis', 'unprocessed trauma', 'complex trauma', 'cptsd', 'ptsd', 'trauma ptsd'] },
  { root: 'toxic', var: ['toxic', 'toxic parents', 'orang tua toxic', 'toxic relationship', 'hubungan beracun', 'lingkungan toxic', 'toxic positivity', 'toxic femininity', 'keluarga toxic', 'teman toxic', 'bos toxic', 'relasi beracun', 'budaya toxic'] },
  { root: 'manipulasi', var: ['gaslighting', 'korban gaslighting', 'pelaku gaslighting', 'love bombing', 'manipulation', 'manipulatif', 'manipulasi emosional', 'guilt tripping', 'guilt trip', 'silent treatment beracun', 'hoovering', 'flying monkeys', 'stonewalling'] },
  { root: 'trigger', var: ['trigger', 'triggered', 'trigger warning', 'memicu trauma', 'terpicu trauma', 'trauma dumping', 'pemicu luka', 'emotional trigger', 'sensitivitas trauma'] },
  { root: 'panik', var: ['serangan panik', 'panic attack', 'sesak panik', 'panik histeris', 'ketakutan tak beralasan', 'gangguan panik', 'agorafobia'] },
  { root: 'psikosomatis', var: ['psikosomatis', 'somatisasi', 'penyakit pikiran', 'keluhan fiktif', 'nyeri psikosomatik', 'gangguan somatoform', 'konversi psikis'] },
  { root: 'disosiasi', var: ['disosiasi', 'depersonalisasi', 'anhedonia', 'mati rasa total', 'mati rasa batin', 'kehilangan afeksi', 'afek tumpul', 'derealisasi', 'disosiatif'] },
  { root: 'gangguan jiwa', var: ['gangguan jiwa', 'odgj', 'sakit jiwa', 'tidak waras', 'abnormal', 'patologis', 'kelainan jiwa', 'gila', 'penyakit jiwa', 'pasien jiwa', 'rawat inap jiwa'] },
  { root: 'narsistik', var: ['narsistik', 'narcissistic', 'narsis', 'narsisisme', 'sociopath', 'sosiopat', 'psikopat', 'psychopath', 'narcissist abuse', 'covert narcissist', 'narcissistic supply', 'overt narcissist'] },
  { root: 'kepribadian', var: ['gangguan kepribadian', 'borderline', 'borderline personality disorder', 'bpd', 'kepribadian ganda', 'split personality', 'histrionik', 'gangguan obsesif kompulsif', 'ocd parah', 'adhd akut', 'gangguan disosiatif'] },
  { root: 'burnout', var: ['burnout', 'burnout parah', 'burnout akut', 'mental breakdown', 'kehancuran jiwa', 'kelelahan psikis akut', 'exhausted mental', 'krisis mental', 'fatigue kronis', 'stres kronis'] },
  { root: 'relasi patologis', var: ['trauma bond', 'ikatan trauma', 'trauma bonded', 'codependency', 'kodependen', 'hubungan kodependen', 'enmeshment', 'peleburan batas diri', 'boundary violation', 'emotional dysregulation', 'disregulasi emosi', 'regresi psikis'] }
];

clinicalRoots.forEach(b => {
  b.var.forEach(v => {
    addTerm(v, 'clinical', 'Jargon Klinis Prematur & Therapy-Speak', 'warning',
      'Melabeli pembaca secara prematur dan menimbulkan rasa malu sosial dicap cacat mental.',
      'Gunakan deskripsi rutinitas fisik harian (ritme tidur, kelelahan kerja, ketegangan otot).'
    );
  });
});

const moreClinical = [
  'overthinking kronis', 'terperangkap overthinking', 'mindset rusak', 'terapi intensif',
  'rehabilitasi mental', 'butuh penanganan psikiater segera', 'vonis dokter', 'diagnosis diri',
  'self diagnosis', 'red flag kepribadian', 'green flag semu', 'kesehatan mentalmu sedang hancur',
  'jiwa yang terluka', 'batin yang terkoyak', 'penyakit hati kronis', 'terperosok dalam jurang kelam',
  'lubang hitam depresi', 'terapi kejut', 'obat penenang', 'antidepresan', 'resep psikiatri',
  'krisis eksistensial akut', 'gangguan tidur kronis', 'insomnia parah', 'terapi kognitif',
  'cbt intensif', 'rekonstruksi kognitif', 'reparenting', 'shadow work', 'katarsis emosional',
  'neurodivergen', 'neurotypical', 'body dysmorphia', 'dismorfia tubuh', 'mekanisme pertahanan diri yang rusak',
  'proyeksi psikologis', 'proyeksi bawah sadar', 'regresi emosional', 'hypervigilance',
  'kewaspadaan berlebih patologis', 'fight or flight kronis', 'vagus nerve rusak', 'saraf vagus tegang',
  'gangguan makan', 'anoreksia', 'bulimia', 'narkolepsi', 'hipersomnia', 'katatonia',
  'self harm', 'menyakiti diri', 'pikiran bunuh diri', 'suicidal ideation', 'ide bunuh diri'
];
moreClinical.forEach(t => {
  addTerm(t, 'clinical', 'Jargon Klinis Prematur & Therapy-Speak', 'warning',
    'Membuat naskah terdengar seperti teks medis yang mengintimidasi daripada panduan yang bersahabat.',
    'Sederhanakan menjadi bahasa sehari-hari yang bersahaja.'
  );
});

// ==========================================
// CATEGORY 4: AGGRESSIVE IMPERATIVES & COERCIVE DISCLOSURE
// ==========================================
const imperativePhrases = [
  'buka hatimu', 'buka lukamu', 'buka aibmu', 'buka jiwamu', 'telanjangi rasa takutmu', 'buka rahasiamu', 'jangan sembunyi',
  'tumpahkan semuanya', 'tumpahkan unek-unekmu', 'tumpahkan isi hatimu', 'tumpahkan amarahmu', 'curahkan seluruh lukamu',
  'curhat sekarang', 'curhat di sini', 'curhat pada kami', 'jangan disimpan sendiri', 'jangan dipendam', 'dilarang memendam',
  'simpan luka itu racun', 'buang egomu', 'runtuhkan gengsimu', 'jangan sok kuat', 'pura-pura kuat', 'jangan bermuka dua',
  'tanggalkan topengmu', 'menangislah sekarang', 'menangis di hadapan kami', 'tumpahkan air matamu', 'menangis itu obat',
  'jangan tahan tangismu', 'akui kelemahanmu', 'kamu wajib cerita', 'kamu harus berani', 'jangan jadi pengecut',
  'buktikan pada kami', 'tunjukkan pada dunia', 'ubah hidupmu sekarang', 'putuskan hari ini juga', 'tinggalkan kebiasaan burukmu detik ini',
  'jangan tunda lagi', 'kamu harus bangkit', 'berhenti mengeluh', 'stop playing the victim', 'jangan merasa jadi korban',
  'kamu yang salah', 'kamu harus berubah', 'segera hubungi kami', 'jangan sia-siakan kesempatan ini', 'ambil tindakan sekarang juga',
  'daftar sekarang sebelum terlambat', 'wajib konsultasi sekarang', 'jangan biarkan dirimu hancur', 'lawan rasa takutmu detik ini',
  'jangan ragu lagi', 'buka pintu hatimu', 'lepaskan seluruh bebanku', 'lepaskan egomu sekarang', 'bersujudlah dan akui',
  'ceritakan sekarang juga', 'tumpahkan semua dukamu', 'jangan sembunyikan apapun', 'kupas tuntas masa lalumu',
  'jangan pura-pura bahagia', 'hapus senyum palsumu', 'akui bahwa kamu gagal', 'akui dosamu di sini', 'jangan simpan bangkai ini',
  'ungkapkan rahasia tergelapmu', 'keluarkan semua unek-unek', 'jangan jadi pengecut yang diam', 'buka suaramu sekarang',
  'bicara atau hancur', 'jangan pendam rasa sakit', 'keluarkan seluruh tangismu', 'wajib hadir malam ini',
  'jangan cari alasan lagi', 'stop beralasan', 'buang semua dalihmu', 'singkirkan gengsimu sekarang',
  'datang dan bersujud', 'ikuti instruksi ini tanpa tapi', 'patuhi panduan ini detik ini', 'jangan buang waktu berharga kami',
  'tekan tombol sekarang juga', 'klik link ini sebelum menyesal', 'pesan tempatmu detik ini juga', 'amankan kursimu sebelum kehabisan',
  'tonton video ini sampai habis atau gagal', 'kamu rugi kalau tidak ikut', 'jangan jadi penonton terus', 'berhentilah bermimpi kosong',
  'buka dirimu seutuhnya', 'jangan menutup diri', 'katakan yang sebenarnya detik ini', 'jangan munafik di hadapan kami',
  'tunjukkan lukamu tanpa malu', 'lepaskan rasa gengsimu', 'jangan membisu', 'pecahkan keheninganmu sekarang'
];

imperativePhrases.forEach(t => {
  addTerm(t, 'imperative', 'Perintah Agresif & Pemaksaan Curhat', 'critical',
    'Menuntut pembongkaran privasi secara sepihak dan melanggar batas kenyamanan pria di ruang publik.',
    'Beri ruang kendali mandiri (agency): "Boleh datang, boleh sekadar duduk mendengarkan."'
  );
});

// ==========================================
// CATEGORY 5: CALIBRATED GROUNDING VOCABULARY (DIANJURKAN)
// ==========================================
const recommendedGroups = [
  {
    theme: 'Tubuh & Ritme Fisik',
    words: [
      'ritme tidur', 'jam istirahat', 'jeda sejenak', 'tarik napas', 'napas teratur', 'peregangan otot',
      'jalan santai', 'basuh muka', 'segelas air hangat', 'secangkir kopi', 'sarapan pagi', 'basuh kaki',
      'udara segar', 'sinar matahari pagi', 'gerak badan ringan', 'duduk bersandar', 'memulihkan tenaga',
      'detak jantung teratur', 'rileks sejenak', 'tidur lebih awal', 'istirahat yang cukup', 'mandi air hangat',
      'mengendurkan pundak', 'kebugaran jasmani', 'langkah kaki teratur', 'bernapas dalam-dalam', 'keringat sehat',
      'ritme biologis', 'kesehatan fisik', 'istirahat berkualitas', 'stamina pulih', 'kesegaran badan',
      'istirahat malam', 'tidur nyenyak', 'bangun lebih segar', 'menikmati sarapan', 'seduhan teh hangat',
      'duduk santai di beranda', 'angin sore', 'peregangan pinggang', 'jalan santai keliling komplek',
      'tarikan napas panjang', 'meredakan detak jantung', 'membasuh wajah dengan air dingin', 'tidur siang sejenak',
      'merenggangkan jari jemari', 'istirahat mata dari layar', 'suara rintik hujan', 'mengatur tempo kerja',
      'memulihkan kesegaran tubuh', 'menjaga stamina harian', 'mengendurkan otot leher', 'langkah santai',
      'menghirup udara bersih', 'menyeka keringat', 'tubuh terasa ringan', 'menjaga daya tahan badan'
    ]
  },
  {
    theme: 'Kerja & Rutinitas Sehari-hari',
    words: [
      'meja kerja', 'catatan tugas', 'tumpukan pekerjaan', 'tenggat waktu', 'menyelesaikan tugas',
      'tanggung jawab nafkah', 'urusan rumah tangga', 'belanja bulanan', 'kebutuhan keluarga', 'ritme kerja sehat',
      'jam pulang kantor', 'waktu luang akhir pekan', 'jeda kopi', 'ngobrol santai dengan rekan', 'urusan harian',
      'kelancaran kerja', 'jadwal harian', 'mengatur prioritas', 'fokus pada satu hal', 'ruang kerja rapi',
      'pulang tepat waktu', 'keseimbangan harian', 'rutinitas sederhana', 'tugas terencana', 'hasil nyata',
      'merapikan berkas', 'menyelesaikan satu pekerjaan', 'tenggat yang realistis', 'fokus pada langkah kecil',
      'catatan harian', 'perencanaan matang', 'menjaga ketenangan di tempat kerja', 'koordinasi yang rapi',
      'komunikasi yang santun', 'kejelasan arahan', 'tanggung jawab profesional', 'kecakapan teknis',
      'keahlian yang terasah', 'hasil kerja yang rapi', 'sikap kerja yang tekun', 'penataan jadwal harian',
      'tugas selesai tepat waktu', 'fokus pada apa yang bisa dikerjakan', 'langkah kerja yang jelas'
    ]
  },
  {
    theme: 'Kedaulatan & Keamanan Ruang',
    words: [
      'pilihan sukarela', 'boleh hadir', 'boleh mengamati', 'boleh duduk diam', 'boleh pulang kapan saja',
      'tanpa presensi', 'tanpa syarat kehadiran', 'tanpa kamera', 'nama disamarkan', 'obrolan tertutup',
      'privasi terjamin', 'ruang tenang', 'tanpa paksaan', 'langkah awal', 'satu per satu', 'pelan-pelan',
      'bertahap', 'sesuai kesiapan diri', 'tidak terburu-buru', 'tanpa biaya tersembunyi', 'akses mudah',
      'pintu keluar selalu terbuka', 'kendali di tanganmu', 'kamu yang menentukan', 'tanpa evaluasi', 'tanpa ujian',
      'ruang aman untuk diam', 'hadir tanpa tuntutan', 'pilihan yang merdeka', 'menjaga batas diri', 'kebebasan bersikap',
      'tidak ada kewajiban bicara', 'boleh mendengarkan saja', 'kenyamanan pribadi diutamakan', 'bebas melangkah'
    ]
  },
  {
    theme: 'Empati Bersahaja & Menenangkan',
    words: [
      'lelah yang wajar', 'penat yang manusiawi', 'fisik butuh istirahat', 'wajar jika letih', 'wajar jika bingung',
      'banyak yang merasakan hal serupa', 'situasi yang menantang', 'kondisi yang tidak mudah', 'kehadiran yang tenang',
      'kawan bertukar pikiran', 'mendengarkan tanpa menghakimi', 'hadir menemani', 'menyapa hangat', 'ruang aman',
      'saling menghargai', 'memahami keterbatasan', 'berbagi sudut pandang', 'teman seperjalanan', 'penemanan santai',
      'tanpa basa-basi berlebih', 'ketenangan batin', 'berdamai dengan ritme', 'tidak sendirian memikul',
      'santap malam bersama', 'obrolan ringan di meja makan', 'mendengar cerita anak', 'menemani keluarga',
      'membantu pekerjaan rumah', 'berbagi tugas harian', 'menyapa tetangga', 'kehangatan keluarga',
      'rukun tetangga', 'saling bantu', 'saling jaga', 'tenggang rasa', 'saling pengertian', 'menghargai waktu bersama',
      'kata-kata yang menyejukkan', 'sikap bersahabat', 'keakraban yang wajar', 'hubungan yang tulus'
    ]
  },
  {
    theme: 'Ketrampilan & Martabat Dewasa',
    words: [
      'ketrampilan nyata', 'keahlian fungsional', 'karya fungsional', 'kemandirian fungsional', 'ketenangan sikap',
      'kepala dingin', 'merawat keluarga', 'menjaga rumah', 'melindungi orang terkasih', 'mendampingi',
      'mengayomi', 'integritas tindakan', 'tanggung jawab etis', 'sikap dewasa', 'keteguhan hati',
      'kejujuran diri', 'karya bermanfaat', 'kecakapan hidup', 'tindakan bermakna', 'kehormatan keluarga',
      'keberdayaan mandiri', 'pilar yang kokoh', 'kebajikan sejati', 'ketabahan wajar', 'tanggung jawab nyata',
      'hati yang lapang', 'ketenangan pikiran', 'menimbang dengan cermat', 'bersikap proporsional', 'berpikir jernih',
      'melihat dari berbagai sisi', 'kebijaksanaan bersahaja', 'ketabahan yang tenang', 'kejujuran pada diri sendiri',
      'menerima apa adanya', 'berdamai dengan keadaan', 'tindakan terukur', 'tutur kata santun', 'menjaga martabat diri',
      'keteladanan nyata', 'budi pekerti luhur', 'ketenangan batiniah', 'ketegasan yang ramah'
    ]
  }
];

recommendedGroups.forEach(g => {
  g.words.forEach(w => {
    addTerm(w, 'recommended', 'Pilihan Kata Membumi & Bermartabat', 'positive',
      'Membumi, menenangkan emosi, menghormati otonomi pembaca, dan terbebas dari jebakan bumerang.',
      'Gaya bahasa Menungsa terkalibrasi'
    );
  });
});

console.log("=========================================");
console.log("TOTAL CHEATSHEET WORDS GENERATED:", cheatsheet.length);
const catCounts = {};
cheatsheet.forEach(c => catCounts[c.category] = (catCounts[c.category] || 0) + 1);
console.log("Category counts:", catCounts);

// Save to src/data/copyCheatsheet.json
fs.writeFileSync(
  path.join(__dirname, '../src/data/copyCheatsheet.json'),
  JSON.stringify(cheatsheet, null, 2),
  'utf-8'
);
console.log("Wrote to src/data/copyCheatsheet.json successfully!");
