const fs = require('fs');
const path = require('path');

const cheatsheet = [];
const seen = new Set();

function addTerm(term, category, categoryLabel, severity, impact, replacement) {
  const t = term.toLowerCase().trim();
  if (!t || seen.has(t) || t.length < 2) return;
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

// Morphological expander for Indonesian verb/noun roots
function expandMorphology(root, category, categoryLabel, severity, impact, replacement, patterns = ['me', 'di', 'ter', 'ke-an', 'pe-an', 'ber', 'kan', 'i']) {
  addTerm(root, category, categoryLabel, severity, impact, replacement);
  
  // Basic suffixes
  if (patterns.includes('kan')) addTerm(`${root}kan`, category, categoryLabel, severity, impact, replacement);
  if (patterns.includes('i')) addTerm(`${root}i`, category, categoryLabel, severity, impact, replacement);
  if (patterns.includes('an')) addTerm(`${root}an`, category, categoryLabel, severity, impact, replacement);
  if (patterns.includes('lah')) addTerm(`${root}lah`, category, categoryLabel, severity, impact, replacement);
  if (patterns.includes('nya')) addTerm(`${root}nya`, category, categoryLabel, severity, impact, replacement);

  // Prefixes
  if (patterns.includes('di')) {
    addTerm(`di${root}`, category, categoryLabel, severity, impact, replacement);
    if (patterns.includes('kan')) addTerm(`di${root}kan`, category, categoryLabel, severity, impact, replacement);
    if (patterns.includes('i')) addTerm(`di${root}i`, category, categoryLabel, severity, impact, replacement);
  }
  if (patterns.includes('ter')) {
    addTerm(`ter${root}`, category, categoryLabel, severity, impact, replacement);
    if (patterns.includes('kan')) addTerm(`ter${root}kan`, category, categoryLabel, severity, impact, replacement);
  }
  if (patterns.includes('ber')) {
    addTerm(`ber${root}`, category, categoryLabel, severity, impact, replacement);
    if (patterns.includes('an')) addTerm(`ber${root}an`, category, categoryLabel, severity, impact, replacement);
  }
  if (patterns.includes('ke-an')) {
    addTerm(`ke${root}an`, category, categoryLabel, severity, impact, replacement);
    addTerm(`ke${root}annya`, category, categoryLabel, severity, impact, replacement);
  }
  if (patterns.includes('pe-an')) {
    addTerm(`pe${root}an`, category, categoryLabel, severity, impact, replacement);
    addTerm(`pem${root}an`, category, categoryLabel, severity, impact, replacement);
    addTerm(`pen${root}an`, category, categoryLabel, severity, impact, replacement);
    addTerm(`peng${root}an`, category, categoryLabel, severity, impact, replacement);
    addTerm(`peny${root}an`, category, categoryLabel, severity, impact, replacement);
  }

  // Indonesian nasal prefixes (meN-)
  const firstLetter = root[0];
  let nasalPrefix = 'meng';
  if (['b', 'f', 'v'].includes(firstLetter)) nasalPrefix = 'mem';
  else if (['c', 'd', 'j', 'z'].includes(firstLetter)) nasalPrefix = 'men';
  else if (['g', 'h'].includes(firstLetter)) nasalPrefix = 'meng';
  else if (['k'].includes(firstLetter)) nasalPrefix = 'meng' + root.slice(1);
  else if (['l', 'm', 'n', 'r', 'w', 'y'].includes(firstLetter)) nasalPrefix = 'me';
  else if (['p'].includes(firstLetter)) nasalPrefix = 'mem' + root.slice(1);
  else if (['t'].includes(firstLetter)) nasalPrefix = 'men' + root.slice(1);
  else if (['s'].includes(firstLetter)) nasalPrefix = 'meny' + root.slice(1);

  const meForm = ['p', 't', 's', 'k'].includes(firstLetter) ? nasalPrefix : `${nasalPrefix}${root}`;
  if (patterns.includes('me')) {
    addTerm(meForm, category, categoryLabel, severity, impact, replacement);
    if (patterns.includes('kan')) addTerm(`${meForm}kan`, category, categoryLabel, severity, impact, replacement);
    if (patterns.includes('i')) addTerm(`${meForm}i`, category, categoryLabel, severity, impact, replacement);
  }
}

// Collocation generator
function addCollocations(rootWords, modifiers, category, categoryLabel, severity, impact, replacement) {
  rootWords.forEach(r => {
    modifiers.forEach(m => {
      addTerm(`${r} ${m}`, category, categoryLabel, severity, impact, replacement);
      addTerm(`${m} ${r}`, category, categoryLabel, severity, impact, replacement);
    });
  });
}

// =========================================================================
// 1. CATEGORY: MORALIZING & SCOLDING (PENILAIAN & TUNTUTAN)
// =========================================================================
const moralCat = 'moral';
const moralLabel = 'Penilaian dan tuntutan';
const moralSev = 'critical';
const moralImp = 'Kata ini dapat dipakai untuk menekan atau menghakimi, tetapi maknanya bergantung pada kalimat.';
const moralRep = 'Periksa konteks, termasuk negasi dan kutipan. Ubah tuntutan yang mempermalukan pembaca menjadi informasi atau pilihan yang jelas.';

const moralRootList = [
  'wajib', 'harus', 'dosa', 'aib', 'malu', 'hina', 'nista', 'cela', 'bejat', 'moral',
  'norma', 'kodrat', 'azab', 'tobat', 'munafik', 'pantas', 'salah', 'pengecut', 'durhaka',
  'sesat', 'khianat', 'kotor', 'lalai', 'karma', 'sampah', 'hukum', 'tuntut', 'sanksi',
  'vonis', 'kutuk', 'laknat', 'murka', 'keji', 'fasik', 'maksiat', 'mungkar', 'celaka',
  'rusak', 'bobrok', 'busuk', 'jahat', 'durjana', 'aniaya', 'zalim', 'ingkar', 'rendah',
  'kejam', 'binal', 'biadab', 'culas', 'khilaf', 'dakwa', 'adili', 'hakimi', 'cibir',
  'cemooh', 'cerca', 'leceh', 'lancang', 'takabur', 'sombong', 'angkuh', 'pongah', 'congkak',
  'kufur', 'fasik', 'munafikun', 'sesat', 'terkutuk', 'bangkai', 'najis', 'kemungkaran',
  'kemaksiatan', 'kemerosotan', 'kebatilan', 'kedustaan', 'kebohongan', 'kepalsuan',
  'nirempati', 'rundung', 'hujat', 'nyinyir', 'pansos', 'parasit', 'kere', 'caci',
  'fitnah', 'hasut', 'olok', 'sindir', 'kambinghitam'
];

moralRootList.forEach(r => {
  expandMorphology(r, moralCat, moralLabel, moralSev, moralImp, moralRep, ['me', 'di', 'ter', 'ke-an', 'pe-an', 'ber', 'kan', 'i', 'an', 'lah', 'nya']);
});

// Specific moral multi-word phrases & collocations
const moralPhrases = [
  'kewajiban mutlak', 'kewajiban moril', 'wajib hukumnya', 'sewajibnya', 'diwajibkan bagi', 'kewajiban primer',
  'menjadi kewajiban', 'wajib ditaati', 'kewajiban mutlak pria', 'wajib kamu pahami', 'wajib bertobat',
  'harus kamu sadari', 'tiada pilihan selain', 'harus bertanggung jawab', 'harus berubah', 'harus mengerti',
  'harus tunduk', 'kamu harus sadar', 'harus tahu diri', 'harus introspeksi', 'harus berani', 'harus bangkit',
  'beban dosa', 'bergelimang dosa', 'berlumur dosa', 'dosa besar', 'dosa sosial', 'menebus dosa',
  'penebusan dosa', 'dosa turunan', 'tertimbun dosa', 'penuh dosa', 'timbunan dosa', 'kubangan dosa',
  'terkutuk dosa', 'dosa masa lalu', 'lingkaran dosa', 'dosa moral', 'dosa tak terampuni', 'tanggung dosamu',
  'aib keluarga', 'aib besar', 'menutup aib', 'membuka aib', 'aib diri', 'mencoreng aib', 'berkalang aib',
  'noda aib', 'aib masa lalu', 'aib seumur hidup', 'tercoreng aib', 'aib tak terhapus', 'noda hitam aib',
  'tak tahu malu', 'muka tembok', 'muka tebal', 'mencolek arang', 'bikin malu', 'rasa malu', 'menanggung malu',
  'malu-maluin', 'tanpa rasa malu', 'harga diri runtuh', 'coreng muka', 'aib memalukan', 'permalukan di depan umum',
  'sehina-hinanya', 'hina dina', 'derajat terhina', 'nista dan hina', 'kelakuan nista', 'perbuatan nista',
  'jalan ternista', 'lembah kenistaan', 'perbuatan tercela', 'tabiat tercela', 'kebejatan moral', 'moral bejat',
  'kelakuan bejat', 'pria bejat', 'otak bejat', 'pikiran bejat', 'tabiat bejat', 'moralitas bejat', 'tak bermoral',
  'rusak moral', 'merosot moral', 'krisis moral', 'hancur moral', 'cacat moral', 'bobrok moral', 'pelanggar moral',
  'pengadilan moral', 'sanksi moral', 'beban moral', 'moral bobrok', 'standar moral', 'hancur moralitas',
  'kemerosotan moral', 'melanggar norma', 'penyimpangan norma', 'tata krama rusak', 'langgar norma susila',
  'melawan kodrat', 'menyalahi kodrat', 'kodrat lelaki', 'kodrat pria', 'kodrat ilahi', 'menyimpang dari kodrat',
  'mengingkari kodrat', 'tak sesuai kodrat', 'kena azab', 'hukuman tuhan', 'azab kubur', 'balasan pedih',
  'siksa pedih', 'murka ilahi', 'siksa akhirat', 'azab tuhan', 'laknat semesta', 'bertobatlah', 'bertaubat',
  'sesali dosamu', 'ruwat diri', 'pertobatan nasuha', 'minta ampun', 'sadarlah kamu', 'segeralah bertobat',
  'sok suci', 'topeng palsu', 'pura-pura suci', 'orang munafik', 'bermuka dua', 'sok alim', 'munafik sejati',
  'perilaku munafik', 'tidak pantas', 'tak layak', 'tak pantas hidup', 'tidak patut', 'ketidakpatutan', 'kurang ajar',
  'tak tahu diri', 'tidak tahu adat', 'tak beradab', 'pria tak tahu diri', 'tak patut ditiru', 'merasa bersalah',
  'pengadilan diri', 'hakim moral', 'polisi moral', 'memvonis salah', 'semua salahmu', 'kamu biang kerok',
  'kamu penyebab kehancuran', 'mengadili orang', 'mental pecundang', 'jiwa kerdil', 'lari dari tanggung jawab',
  'bersembunyi seperti pengecut', 'pria penakut', 'nyali kerupuk', 'lelaki pengecut', 'jangan bersembunyi',
  'anak durhaka', 'suami durhaka', 'lelaki durhaka', 'istri durhaka', 'keluarga durhaka', 'tindakan durhaka',
  'jalan sesat', 'ajaran sesat', 'tersesat batin', 'sesat pikir', 'langkah sesat', 'pria tersesat',
  'ingkar janji', 'mengingkari komitmen', 'sumpah palsu', 'cuci tangan', 'lepas tangan', 'pengkhianatan terbesar',
  'jiwa kotor', 'hati bernoda', 'kotoran batin', 'najis moral', 'kebusukan hati', 'hati busuk', 'busuk budi',
  'perilaku kotor', 'niat busuk', 'jiwa ternoda', 'batin kotor', 'melalaikan amanah', 'melalaikan kewajiban',
  'lepas tanggung jawab', 'lempar tanggung jawab', 'menelantarkan keluarga', 'lalai menafkahi', 'suami lalai',
  'hukum karma', 'hukum kualat', 'kena batunya', 'balasan setimpal', 'neraka jahanam', 'terbakar api neraka',
  'siksa kubur', 'hukuman akhirat', 'karma buruk', 'dituai di neraka', 'tuaian dosa', 'sampah masyarakat',
  'beban keluarga', 'beban masyarakat', 'parasit sosial', 'benalu keluarga', 'manusia tak berguna',
  'hidupmu sia-sia', 'tiada guna', 'pria tak berguna', 'tuntutan moral', 'kewajiban asasi', 'hujatan moral',
  'cercaan publik', 'laknat ilahi', 'murka tuhan', 'kutukan batin', 'dosa tak berampun', 'muka coreng',
  'coreng arang', 'celaka besar', 'kebinasaan diri', 'rusak jiwa', 'pria tak bertanggung jawab', 'ingkar kodrat',
  'hamba hawa nafsu', 'budak nafsu', 'sesat jalan', 'berlumur noda', 'aib tercela', 'tindakan biadab',
  'perilaku asusila', 'sok benar', 'merasa suci', 'mengkhotbahi', 'menceramahi pria', 'kuliah moral',
  'petuah menggurui', 'tuntutan mutlak', 'moral hazard', 'dekadensi moral', 'kemerosotan akhlak', 'rusak akhlak',
  'akhlak bejat', 'tanpa akhlak', 'buta moral', 'mati nurani', 'nurani mati', 'tumpul nurani', 'kehilangan nurani',
  'hina di mata masyarakat', 'aib di lingkungan', 'dicap pendosa', 'berlumuran dosa', 'kesesatan nyata',
  'kacang lupa kulitnya', 'lupa daratan', 'tinggi hati', 'buta mata buta hati', 'pria amoral', 'moralitas rendah',
  // Economic & provider failure shaming
  'gagal jadi pria', 'gagal sebagai kepala keluarga', 'tidak becus menafkahi', 'suami tidak berguna', 'pria tak bermodal',
  'beban keluarga seumur hidup', 'mental miskin', 'mental pengemis', 'lelaki miskin', 'pria kere', 'gaji umr jangan nikah',
  'pria parasit', 'numpang hidup pada istri', 'lelaki tanpa masa depan', 'kepala keluarga gagal', 'harga diri di dompet',
  'tidak tahu malu minta bantuan',
  // Cyberbullying, nirempati & moral vigilantism
  'bullying the bully', 'serang balik pelakunya', 'hujat sampai jera', 'kuliti aibnya sampai tuntas', 'buka identitas keluarganya',
  'biar tahu rasa dia', 'manusia nirfaedah', 'pansos di atas duka', 'pansos atas kematian', 'nyari panggung atas musibah',
  'sok suci kamu', 'merasa paling benar', 'jangan sok peduli', 'diledek sok suci', 'dosa jari netizen', 'makin dihujat makin puas',
  'pantas dihakimi massa', 'layak dibully', 'korban lebay', 'korban mencari perhatian', 'jangan playing victim', 'drama bunuh diri',
  'cari sensasi saja', 'kurang perhatian keluarga', 'mati konyol', 'meninggal sia-sia'
];
moralPhrases.forEach(p => addTerm(p, moralCat, moralLabel, moralSev, moralImp, moralRep));

// Collocation expansions for moral
const moralPronominals = ['kamu', 'anda', 'pria', 'lelaki', 'cowok', 'suami', 'ayah'];
const moralAdjectives = ['berdosa', 'bersalah', 'terhina', 'bejat', 'kotor', 'hina', 'nista', 'durhaka', 'pengecut', 'pecundang', 'munafik', 'rusak', 'tersesat', 'amoral', 'tercela', 'lalai'];
moralPronominals.forEach(p => {
  moralAdjectives.forEach(a => {
    addTerm(`${p} ${a}`, moralCat, moralLabel, moralSev, moralImp, moralRep);
    addTerm(`${p} yang ${a}`, moralCat, moralLabel, moralSev, moralImp, moralRep);
    addTerm(`${p} paling ${a}`, moralCat, moralLabel, moralSev, moralImp, moralRep);
    addTerm(`${p} sungguh ${a}`, moralCat, moralLabel, moralSev, moralImp, moralRep);
    addTerm(`${p} teramat ${a}`, moralCat, moralLabel, moralSev, moralImp, moralRep);
    addTerm(`${p} terbukti ${a}`, moralCat, moralLabel, moralSev, moralImp, moralRep);
  });
});

// =========================================================================
// 2. CATEGORY: HYPER-MASCULINE & MANOSPHERE CRINGE (SEBUTAN & TUNTUTAN MASKULINITAS)
// =========================================================================
const cringeCat = 'cringe';
const cringeLabel = 'Sebutan dan tuntutan maskulinitas';
const cringeSev = 'warning';
const cringeImp = 'Istilah ini dapat terasa dipaksakan bila tidak sesuai dengan penutur dan pembaca.';
const cringeRep = 'Pilih ungkapan yang memang digunakan penutur. Hindari label yang menilai harga diri laki-laki.';

const cringeRoots = [
  'alfa', 'alpha', 'sigma', 'beta', 'omega', 'gamma', 'delta', 'chad', 'gigachad',
  'pejantan', 'jantan', 'perkasa', 'tangguh', 'gagah', 'cemen', 'lembek', 'cengeng',
  'bucin', 'simp', 'incel', 'redpill', 'blackpill', 'bluepill', 'manosphere',
  'grindset', 'hustle', 'looksmaxxing', 'mewing', 'hipergami', 'hypergamy',
  'negging', 'pickup', 'dominasi', 'takluk', 'tunduk', 'predator', 'mangsa'
];

cringeRoots.forEach(r => {
  expandMorphology(r, cringeCat, cringeLabel, cringeSev, cringeImp, cringeRep, ['me', 'di', 'ter', 'ke-an', 'pe-an', 'ber', 'kan', 'i', 'an', 'lah', 'nya']);
});

const cringePhrases = [
  'alpha male', 'pria alfa', 'cowok alfa', 'serigala alfa', 'mental alfa', 'aura alfa',
  'alpha mindset', 'alpha energy', 'alpha wolf', 'true alpha', 'supreme alpha', 'alpha dominance',
  'klan alfa', 'jiwa alfa', 'naluri alfa', 'alpha leader', 'alpha male indonesia', 'pria alpha tangguh',
  'karakter alfa', 'postur alfa', 'alpha prime', 'sigma male', 'cowok sigma', 'pria sigma',
  'lone wolf', 'serigala penyendiri', 'sigma grindset', 'aturan sigma', 'jalur sigma', 'sigma mindset',
  'dingin tanpa emosi', 'pria misterius dingin', 'sigma rule', 'sigma male mindset', 'sikap dingin pria',
  'tatapan dingin', 'sigma energy', 'prinsip sigma', 'beta male', 'cowok beta', 'pria beta',
  'mental beta', 'cuckold', 'cuck', 'soy boy', 'simping', 'budak cinta', 'membucin', 'mental budak',
  'pria lemah beta', 'beta provider', 'pria simp', 'anti bucin', 'anti simp', 'jangan jadi beta',
  'omega male', 'pria omega', 'kasta omega', 'level omega', 'kasta terendah', 'chad mindset',
  'chad energy', 'giga chad', 'pejantan tangguh', 'pejantan sejati', 'kejantanan sejati',
  'bukti kejantanan', 'uji kejantanan', 'simbol kejantanan', 'kejantanan pria', 'jantan tulen',
  'darah pejantan', 'jiwa jantan', 'lelaki jantan', 'kejantanan sejati pria', 'pria sejati',
  'lelaki sejati', 'laki-laki sejati', 'cowok sejati', 'pria tangguh sejati', 'real men', 'real man',
  'true man', 'true masculinity', 'kejantanan hakiki', 'pria perkasa', 'pria gagah perkasa',
  'pria sejati pantang menangis', 'pria sejati tak mengeluh', 'lelaki perkasa', 'lelaki tangguh sejati',
  'ciri pria sejati', 'standar pria sejati', 'high value man', 'high-value male', 'pria bernilai tinggi',
  'wanita bernilai rendah', 'kasta pria', 'hirarki pria', 'kasta maskulin', 'derajat pria', 'hvm',
  'high value mindset', 'ranking pria', 'pria kelas atas', 'dating market value', 'dmv', 'nilai pasar kencan',
  'penakluk wanita', 'penakluk dunia', 'penakluk ego', 'sang penakluk', 'raja singa', 'raja hutan',
  'penguasa mutlak', 'hierarki dominasi', 'rantai makanan sosial', 'taklukkan lawanmu', 'taklukkan harimu',
  'telan pil merah', 'melek pil merah', 'female hypergamy', 'keluar dari matriks', 'bangun dari matriks',
  'red pill indonesia', 'filosofi red pill', 'redpill coach', 'cowok lembek', 'laki-laki lembek',
  'cowok cengeng', 'laki-laki cengeng', 'jangan cengeng', 'jangan lembek', 'mental tempe', 'mental kerupuk',
  'mental rapuh', 'mental tisu', 'seperti perempuan', 'cowok menye-menye', 'banci kaleng',
  'toxic grindset', 'hustle culture', 'jangan tidur sebelum sukses', 'tidur saat mati',
  'istirahat itu untuk orang lemah', 'pantang istirahat', 'kerja 20 jam', 'istirahat hanya buang waktu',
  'libur itu dosa', 'pantang mengeluh', 'pantang mundur', 'petarung tak kenal lelah', 'darah prajurit',
  'samurai jiwa', 'jiwa gladiator', 'hustle tiada henti', 'mati di medan kerja', 'grind non-stop',
  'hustle tiap hari', 'pick up artist', 'pua', 'game kencan', 'frame control', 'pertahankan frame',
  'kunci frame', 'alpha frame', 'frame lelaki', 'jangan validasi wanita', 'starve validation',
  'guru maskulinitas', 'bucin tolol', 'bucin akut', 'cinta buta cengeng', 'pria bucin', 'singa bukan domba',
  'serigala bukan anjing', 'elang terbang tinggi', 'raja rimba', 'mental singa', 'jiwa serigala',
  'lolongan serigala', 'predator puncak', 'apex predator', 'rantai makanan teratas', 'pola pikir predator',
  'naluri buas', 'cold shower tiap subuh', 'semen retention', 'retensi energi', 'dopamine detox',
  'monk mode', 'fokus grind', 'hunter mindset', 'tubuh berotot baja', 'maskulinitas sejati',
  'maskulinitas tulen', 'maskulinitas mutlak', 'maskulin perkasa', 'jiwa maskulin sejati',
  'kemaskulinan mutlak', 'maskulinitas murni', 'pesona maskulin ganas', 'tulang punggung tak kenal lelah',
  'hati batu', 'air mata pria itu haram', 'menangis itu aib pria', 'cowok sejati nggak baper',
  'cowok kok baper', 'man up', 'cowok harus keras', 'didik dengan kekerasan', 'lelaki keras kepala',
  'raja jalanan', 'pemimpin mutlak', 'kodrat penguasa', 'tundukkan egomu wahai wanita', 'pasar kencan liar',
  'body count', 'predator di bisnis', 'buas mengejar target', 'pria penakluk', 'hukum rimba pria',
  'hukum hutan', 'seleksi alam pria', 'siapa kuat dia menang', 'menangis tanda lemah',
  'mengeluh tanda pecundang', 'curhat itu banci', 'jangan banyak drama', 'cowok drama',
  'drama queen versi cowok', 'buang sifat femininmu', 'aura maskulin ganas', 'kejantanan murni',
  'pejantan alfa indonesia', 'cowok alpha tulen', 'singa lapar', 'serigala berbulu domba',
  'pria dingin tanpa ekspresi', 'topeng baja pria', 'otot kawat tulang besi', 'urat kawat',
  'pria tanpa air mata', 'hati dingin membeku', 'senyum palsu petarung', 'laki-laki tak kenal rasa sakit',
  'jiwa baja', 'mental baja', 'pria tak kenal ampun', 'pria tanpa emosi', 'dingin seperti es',
  'tatapan predator', 'aura pembunuh', 'killer instinct pria', 'naluri pemburu', 'pria dominan mutlak',
  'jangan pernah memperlihatkan kelemahan', 'jangan pernah menangis di depan wanita',
  'kasta pejantan unggul', 'lelaki pemenang mutlak', 'rantai kuasa pria', 'naluri kejantanan murni',
  // Toxic provider demands & extreme hustle/stoicism clichés
  'pria wajib kaya', 'laki-laki harus berduit', 'harga diri pria adalah uang', 'lelaki sejati pantang miskin',
  'pria miskin dilarang mengeluh', 'hustle sampai mati', 'tidur itu untuk orang lemah', 'grind 24 jam nonstop',
  'pantang tidur sebelum kaya', 'rejeki dipatok ayam kalau tidur', 'lelaki harus tahan banting tanpa batas',
  'jangan cengeng jadi cowok', 'cowok kok baperan', 'cowok kok gampang sedih', 'air mata haram bagi pria',
  'pria sejati tak butuh istirahat', 'otot kawat tulang besi', 'tunjukkan dominasimu', 'pria alfa pantang curhat',
  'pria sejati tahan banting', 'cowok tangguh pantang ke psikolog'
];
cringePhrases.forEach(p => addTerm(p, cringeCat, cringeLabel, cringeSev, cringeImp, cringeRep));

// Manosphere & cringe combinatorial additions
const cringePrefixes = ['jiwa', 'mental', 'karakter', 'naluri', 'darah', 'sikap', 'aura', 'gaya'];
const cringeTargets = ['alfa', 'sigma', 'chad', 'pejantan', 'predator', 'singa', 'serigala', 'gladiator', 'penakluk', 'baja'];
cringePrefixes.forEach(pre => {
  cringeTargets.forEach(tar => {
    addTerm(`${pre} ${tar}`, cringeCat, cringeLabel, cringeSev, cringeImp, cringeRep);
    addTerm(`${pre} ${tar} sejati`, cringeCat, cringeLabel, cringeSev, cringeImp, cringeRep);
    addTerm(`${pre} seorang ${tar}`, cringeCat, cringeLabel, cringeSev, cringeImp, cringeRep);
  });
});

// =========================================================================
// 3. CATEGORY: CLINICAL LABELS & PSYCHOBABBLE (ISTILAH KESEHATAN MENTAL)
// =========================================================================
const clinicalCat = 'clinical';
const clinicalLabel = 'Istilah kesehatan mental';
const clinicalSev = 'warning';
const clinicalImp = 'Istilah kesehatan mental perlu digunakan dengan konteks dan penjelasan yang tepat.';
const clinicalRep = 'Pertahankan istilah jika relevan untuk edukasi. Ubah kalimat yang menyimpulkan diagnosis pembaca tanpa penilaian profesional.';

const clinicalRoots = [
  'depresi', 'anxiety', 'cemas', 'panik', 'fobia', 'phobia', 'bipolar', 'skizofrenia',
  'skizoid', 'skizotipal', 'psikosis', 'psikotik', 'halusinasi', 'delusi', 'paranoid',
  'paranoia', 'waham', 'trauma', 'traumatik', 'ptsd', 'cptsd', 'disosiasi', 'depersonalisasi',
  'derealisasi', 'anhedonia', 'afek', 'somatisasi', 'psikosomatis', 'narsistik', 'narsisisme',
  'narsis', 'sosiopat', 'psikopat', 'histrionik', 'borderline', 'adhd', 'ocd', 'burnout',
  'fatigue', 'insomnia', 'hipersomnia', 'narkolepsi', 'dismorfia', 'anoreksia', 'bulimia',
  'neurodivergen', 'neurotypical', 'katarsis', 'reparenting', 'stonewalling', 'gaslighting',
  'overthinking', 'abnormal', 'patologis', 'odgj'
];

clinicalRoots.forEach(r => {
  expandMorphology(r, clinicalCat, clinicalLabel, clinicalSev, clinicalImp, clinicalRep, ['me', 'di', 'ter', 'ke-an', 'pe-an', 'ber', 'kan', 'i', 'an', 'lah', 'nya']);
});

const clinicalPhrases = [
  'depresi klinis', 'depresi mayor', 'depresi berat', 'penderita depresi', 'terserang depresi',
  'mengidap depresi', 'gejala depresi', 'depresi terselubung', 'smiling depression', 'episode depresif',
  'jurang depresi', 'terjerembap depresi', 'lingkaran setan depresi', 'depresi akut', 'skrining depresi',
  'diagnosis depresi', 'distimia', 'dysthymia', 'depresi unipolar', 'gangguan kecemasan',
  'kecemasan akut', 'anxiety disorder', 'gad', 'serangan cemas', 'anxiety attack', 'fobia sosial',
  'kecemasan sosial', 'kecemasan berlebih', 'anxious attachment', 'anxiety attack akut', 'generalized anxiety',
  'manic depressive', 'fase manik', 'fase depresi', 'mood swing ekstrem', 'bipolar disorder',
  'gangguan bipolar', 'siklus bipolar', 'gangguan afektif', 'siklotimia', 'delusi akut',
  'skizoafektif', 'trauma masa kecil', 'childhood trauma', 'luka batin mendalam', 'inner child',
  'merawat inner child yang terluka', 'trauma healing', 'luka masa lalu', 'trauma turun-temurun',
  'intergenerational trauma', 'traumatized', 'trauma kronis', 'unprocessed trauma', 'complex trauma',
  'trauma ptsd', 'toxic parents', 'orang tua toxic', 'toxic relationship', 'hubungan beracun',
  'lingkungan toxic', 'toxic positivity', 'toxic femininity', 'keluarga toxic', 'teman toxic',
  'bos toxic', 'relasi beracun', 'budaya toxic', 'korban gaslighting', 'pelaku gaslighting',
  'love bombing', 'manipulasi emosional', 'guilt tripping', 'guilt trip', 'silent treatment beracun',
  'hoovering', 'flying monkeys', 'trigger warning', 'memicu trauma', 'terpicu trauma',
  'trauma dumping', 'pemicu luka', 'emotional trigger', 'sensitivitas trauma', 'serangan panik',
  'panic attack', 'sesak panik', 'panik histeris', 'ketakutan tak beralasan', 'gangguan panik',
  'agorafobia', 'penyakit pikiran', 'keluhan fiktif', 'nyeri psikosomatik', 'gangguan somatoform',
  'konversi psikis', 'mati rasa total', 'mati rasa batin', 'kehilangan afeksi', 'afek tumpul',
  'disosiatif', 'gangguan jiwa', 'sakit jiwa', 'tidak waras', 'kelainan jiwa', 'penyakit jiwa',
  'pasien jiwa', 'rawat inap jiwa', 'sociopath', 'psychopath', 'narcissist abuse', 'covert narcissist',
  'narcissistic supply', 'overt narcissist', 'gangguan kepribadian', 'borderline personality disorder',
  'bpd', 'kepribadian ganda', 'split personality', 'gangguan obsesif kompulsif', 'ocd parah',
  'adhd akut', 'gangguan disosiatif', 'burnout parah', 'burnout akut', 'mental breakdown',
  'kehancuran jiwa', 'kelelahan psikis akut', 'exhausted mental', 'krisis mental', 'fatigue kronis',
  'stres kronis', 'trauma bond', 'ikatan trauma', 'trauma bonded', 'codependency', 'kodependen',
  'hubungan kodependen', 'enmeshment', 'peleburan batas diri', 'boundary violation',
  'emotional dysregulation', 'disregulasi emosi', 'regresi psikis', 'overthinking kronis',
  'terperangkap overthinking', 'mindset rusak', 'terapi intensif', 'rehabilitasi mental',
  'butuh penanganan psikiater segera', 'vonis dokter', 'diagnosis diri', 'self diagnosis',
  'red flag kepribadian', 'green flag semu', 'kesehatan mentalmu sedang hancur', 'jiwa yang terluka',
  'batin yang terkoyak', 'penyakit hati kronis', 'terperosok dalam jurang kelam', 'lubang hitam depresi',
  'terapi kejut', 'obat penenang', 'antidepresan', 'resep psikiatri', 'krisis eksistensial akut',
  'gangguan tidur kronis', 'insomnia parah', 'terapi kognitif', 'cbt intensif', 'rekonstruksi kognitif',
  'shadow work', 'katarsis emosional', 'body dysmorphia', 'dismorfia tubuh',
  'mekanisme pertahanan diri yang rusak', 'proyeksi psikologis', 'proyeksi bawah sadar',
  'regresi emosional', 'hypervigilance', 'kewaspadaan berlebih patologis', 'fight or flight kronis',
  'vagus nerve rusak', 'saraf vagus tegang', 'gangguan makan', 'katatonia', 'self harm',
  'menyakiti diri', 'pikiran bunuh diri', 'suicidal ideation', 'ide bunuh diri',
  'gangguan panik berulang', 'skrining kesehatan mental', 'gejala psikologis akut', 'konseling psikiatri',
  // Pop-clinical exaggeration of everyday fatigue & dramatized distress
  'otak overheat parah', 'social battery habis total', 'mentally drained akut', 'emotional breakdown parah',
  'mati rasa total', 'numb batin', 'dissociating akut', 'sensorik overload parah', 'doomscrolling tiada henti',
  'krisis eksistensial akut', 'mental health rusak', 'terserang penyakit jiwa', 'otak rusak karena overthinking',
  'jiwa yang terkoyak parah', 'mentalitas rapuh', 'lemah mental kronis', 'stres tak tertolong',
  'terjebak jurang kegelapan', 'gejala depresi berat', 'skrining mandiri depresi'
];
clinicalPhrases.forEach(p => addTerm(p, clinicalCat, clinicalLabel, clinicalSev, clinicalImp, clinicalRep));

// Clinical combinatorial modifiers
const clinicalModifiers = ['akut', 'kronis', 'parah', 'berat', 'ekstrem', 'terselubung', 'mendalam', 'patologis', 'berulang'];
clinicalRoots.forEach(r => {
  clinicalModifiers.forEach(m => {
    addTerm(`${r} ${m}`, clinicalCat, clinicalLabel, clinicalSev, clinicalImp, clinicalRep);
    addTerm(`gejala ${r} ${m}`, clinicalCat, clinicalLabel, clinicalSev, clinicalImp, clinicalRep);
    addTerm(`mengalami ${r} ${m}`, clinicalCat, clinicalLabel, clinicalSev, clinicalImp, clinicalRep);
  });
});

// =========================================================================
// 4. CATEGORY: AGGRESSIVE IMPERATIVES & COERCIVE DISCLOSURE (AJAKAN & DESAKAN)
// =========================================================================
const imperativeCat = 'imperative';
const imperativeLabel = 'Ajakan dan desakan';
const imperativeSev = 'critical';
const imperativeImp = 'Periksa apakah ajakan memberi pilihan atau mendesak pembaca melampaui kesediaannya.';
const imperativeRep = 'Beri ruang kendali mandiri (agency): "Boleh datang, boleh sekadar duduk mendengarkan."';

const imperativeVerbs = [
  'buka', 'tumpahkan', 'curahkan', 'curhat', 'ceritakan', 'akui', 'ungkapkan', 'telanjangi',
  'bongkar', 'lepaskan', 'buang', 'runtuhkan', 'tanggalkan', 'menangis', 'lawan', 'bicara',
  'hentikan', 'sadari', 'hapus', 'tinggalkan', 'taklukkan', 'buktikan', 'tunjukkan', 'patuhi'
];

imperativeVerbs.forEach(v => {
  expandMorphology(v, imperativeCat, imperativeLabel, imperativeSev, imperativeImp, imperativeRep, ['lah', 'kan', 'i', 'nya']);
});

const imperativePhrases = [
  'buka hatimu', 'buka lukamu', 'buka aibmu', 'buka jiwamu', 'telanjangi rasa takutmu', 'buka rahasiamu',
  'jangan sembunyi', 'tumpahkan semuanya', 'tumpahkan unek-unekmu', 'tumpahkan isi hatimu', 'tumpahkan amarahmu',
  'curahkan seluruh lukamu', 'curhat sekarang', 'curhat di sini', 'curhat pada kami', 'jangan disimpan sendiri',
  'jangan dipendam', 'dilarang memendam', 'simpan luka itu racun', 'buang egomu', 'runtuhkan gengsimu',
  'jangan sok kuat', 'pura-pura kuat', 'jangan bermuka dua', 'tanggalkan topengmu', 'menangislah sekarang',
  'menangis di hadapan kami', 'tumpahkan air matamu', 'menangis itu obat', 'jangan tahan tangismu',
  'akui kelemahanmu', 'kamu wajib cerita', 'kamu harus berani', 'jangan jadi pengecut', 'buktikan pada kami',
  'tunjukkan pada dunia', 'ubah hidupmu sekarang', 'putuskan hari ini juga', 'tinggalkan kebiasaan burukmu detik ini',
  'jangan tunda lagi', 'kamu harus bangkit', 'berhenti mengeluh', 'stop playing the victim', 'jangan merasa jadi korban',
  'kamu yang salah', 'kamu harus berubah', 'segera hubungi kami', 'jangan sia-siakan kesempatan ini',
  'ambil tindakan sekarang juga', 'daftar sekarang sebelum terlambat', 'wajib konsultasi sekarang',
  'jangan biarkan dirimu hancur', 'lawan rasa takutmu detik ini', 'jangan ragu lagi', 'buka pintu hatimu',
  'lepaskan seluruh bebanku', 'lepaskan egomu sekarang', 'bersujudlah dan akui', 'ceritakan sekarang juga',
  'tumpahkan semua dukamu', 'jangan sembunyikan apapun', 'kupas tuntas masa lalumu', 'jangan pura-pura bahagia',
  'hapus senyum palsumu', 'akui bahwa kamu gagal', 'akui dosamu di sini', 'jangan simpan bangkai ini',
  'ungkapkan rahasia tergelapmu', 'keluarkan semua unek-unek', 'jangan jadi pengecut yang diam',
  'buka suaramu sekarang', 'bicara atau hancur', 'jangan pendam rasa sakit', 'keluarkan seluruh tangismu',
  'wajib hadir malam ini', 'jangan cari alasan lagi', 'stop beralasan', 'buang semua dalihmu',
  'singkirkan gengsimu sekarang', 'datang dan bersujud', 'ikuti instruksi ini tanpa tapi',
  'patuhi panduan ini detik ini', 'jangan buang waktu berharga kami', 'tekan tombol sekarang juga',
  'klik link ini sebelum menyesal', 'pesan tempatmu detik ini juga', 'amankan kursimu sebelum kehabisan',
  'tonton video ini sampai habis atau gagal', 'kamu rugi kalau tidak ikut', 'jangan jadi penonton terus',
  'berhentilah bermimpi kosong', 'buka dirimu seutuhnya', 'jangan menutup diri', 'katakan yang sebenarnya detik ini',
  'jangan munafik di hadapan kami', 'tunjukkan lukamu tanpa malu', 'lepaskan rasa gengsimu', 'jangan membisu',
  'pecahkan keheninganmu sekarang', 'jangan tunggu besok', 'bergeraklah sekarang juga', 'jangan malas lagi',
  'singkirkan keraguanmu saat ini juga', 'wajib tonton sampai selesai', 'segera daftar jangan ditunda',
  // Coercive disclosure & aggressive social imperatives
  'speak up sekarang juga', 'wajib bersuara detik ini', 'jangan cuma diam', 'kamu ikut bersalah kalau diam',
  'tunjukkan keberpihakanmu sekarang', 'kenapa kamu masih bungkam', 'buka suaramu jangan pengecut',
  'ceritakan traumamu di kolom komentar', 'tumpahkan seluruh lukamu di sini', 'jangan pura-pura tuli',
  'buka rahasiamu tanpa ragu', 'buka lukamu di hadapan publik', 'jangan simpan sendiri lukamu',
  'wajib curhat malam ini', 'kamu berdosa kalau tidak speak up', 'viralkan sampai pelakunya hancur',
  'laporkan sekarang juga tanpa pikir panjang'
];
imperativePhrases.forEach(p => addTerm(p, imperativeCat, imperativeLabel, imperativeSev, imperativeImp, imperativeRep));

// Combinatorial imperative phrases
const imperativeVerbsList = ['buka', 'ceritakan', 'curhatkan', 'tumpahkan', 'lepaskan', 'akui', 'tunjukkan', 'buang'];
const imperativeObjects = ['lukamu', 'aibmu', 'bebanmu', 'masalahmu', 'kelemahanmu', 'kegagalanmu', 'traumamu', 'rahasiamu'];
const imperativeTime = ['sekarang juga', 'detik ini juga', 'hari ini juga', 'di sini sekarang', 'tanpa ragu', 'tanpa tapi', 'tanpa malu'];

imperativeVerbsList.forEach(v => {
  imperativeObjects.forEach(o => {
    addTerm(`${v} ${o}`, imperativeCat, imperativeLabel, imperativeSev, imperativeImp, imperativeRep);
    imperativeTime.forEach(t => {
      addTerm(`${v} ${o} ${t}`, imperativeCat, imperativeLabel, imperativeSev, imperativeImp, imperativeRep);
      addTerm(`${v}lah ${o} ${t}`, imperativeCat, imperativeLabel, imperativeSev, imperativeImp, imperativeRep);
    });
  });
});

// =========================================================================
// 5. CATEGORY: CALIBRATED GROUNDING VOCABULARY (CONTOH BAHASA KONKRET)
// =========================================================================
const recCat = 'recommended';
const recLabel = 'Contoh bahasa konkret';
const recSev = 'positive';
const recImp = 'Pilihan kata yang berfokus pada situasi sehari-hari dan tindakan yang dapat dilakukan.';
const recRep = 'Gaya penulisan Menungsa';

const recRoots = [
  'istirahat', 'rehat', 'jeda', 'tidur', 'napas', 'santai', 'tenang', 'segar', 'hangat',
  'dingin', 'pulih', 'sehat', 'bugar', 'kopi', 'teh', 'makan', 'sarapan', 'duduk',
  'bersandar', 'merawat', 'menjaga', 'melindungi', 'damping', 'ayomi', 'sapa', 'kawan',
  'teman', 'saudara', 'keluarga', 'rumah', 'tangga', 'kerja', 'berkas', 'catatan', 'meja',
  'tugas', 'prioritas', 'jadwal', 'langkah', 'tahap', 'pelan', 'wajar', 'lapang', 'jernih',
  'cermat', 'ukur', 'santun', 'martabat', 'teguh', 'tabah', 'merdeka', 'sukarela',
  'dukung', 'ruang', 'valid', 'resapi', 'simak', 'hadir', 'hening', 'ronda', 'nobar'
];

recRoots.forEach(r => {
  expandMorphology(r, recCat, recLabel, recSev, recImp, recRep, ['me', 'di', 'ter', 'ke-an', 'pe-an', 'ber', 'kan', 'i', 'an', 'lah', 'nya']);
});

const recPhrases = [
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
  'menghirup udara bersih', 'menyeka keringat', 'tubuh terasa ringan', 'menjaga daya tahan badan',
  'meja kerja', 'catatan tugas', 'tumpukan pekerjaan', 'tenggat waktu', 'menyelesaikan tugas',
  'tanggung jawab nafkah', 'urusan rumah tangga', 'belanja bulanan', 'kebutuhan keluarga', 'ritme kerja sehat',
  'jam pulang kantor', 'waktu luang akhir pekan', 'jeda kopi', 'ngobrol santai dengan rekan', 'urusan harian',
  'kelancaran kerja', 'jadwal harian', 'mengatur prioritas', 'fokus pada satu hal', 'ruang kerja rapi',
  'pulang tepat waktu', 'keseimbangan harian', 'rutinitas sederhana', 'tugas terencana', 'hasil nyata',
  'merapikan berkas', 'menyelesaikan satu pekerjaan', 'tenggat yang realistis', 'fokus pada langkah kecil',
  'catatan harian', 'perencanaan matang', 'menjaga ketenangan di tempat kerja', 'koordinasi yang rapi',
  'komunikasi yang santun', 'kejelasan arahan', 'tanggung jawab profesional', 'kecakapan teknis',
  'keahlian yang terasah', 'hasil kerja yang rapi', 'sikap kerja yang tekun', 'penataan jadwal harian',
  'tugas selesai tepat waktu', 'fokus pada apa yang bisa dikerjakan', 'langkah kerja yang jelas',
  'pilihan sukarela', 'boleh hadir', 'boleh mengamati', 'boleh duduk diam', 'boleh pulang kapan saja',
  'tanpa presensi', 'tanpa syarat kehadiran', 'tanpa kamera', 'nama disamarkan', 'obrolan tertutup',
  'privasi terjamin', 'ruang tenang', 'tanpa paksaan', 'langkah awal', 'satu per satu', 'pelan-pelan',
  'bertahap', 'sesuai kesiapan diri', 'tidak terburu-buru', 'tanpa biaya tersembunyi', 'akses mudah',
  'pintu keluar selalu terbuka', 'kendali di tanganmu', 'kamu yang menentukan', 'tanpa evaluasi', 'tanpa ujian',
  'ruang aman untuk diam', 'hadir tanpa tuntutan', 'pilihan yang merdeka', 'menjaga batas diri', 'kebebasan bersikap',
  'tidak ada kewajiban bicara', 'boleh mendengarkan saja', 'kenyamanan pribadi diutamakan', 'bebas melangkah',
  'lelah yang wajar', 'penat yang manusiawi', 'fisik butuh istirahat', 'wajar jika letih', 'wajar jika bingung',
  'banyak yang merasakan hal serupa', 'situasi yang menantang', 'kondisi yang tidak mudah', 'kehadiran yang tenang',
  'kawan bertukar pikiran', 'mendengarkan tanpa menghakimi', 'hadir menemani', 'menyapa hangat', 'ruang aman',
  'saling menghargai', 'memahami keterbatasan', 'berbagi sudut pandang', 'teman seperjalanan', 'penemanan santai',
  'tanpa basa-basi berlebih', 'ketenangan batin', 'berdamai dengan ritme', 'tidak sendirian memikul',
  'santap malam bersama', 'obrolan ringan di meja makan', 'mendengar cerita anak', 'menemani keluarga',
  'membantu pekerjaan rumah', 'berbagi tugas harian', 'menyapa tetangga', 'kehangatan keluarga',
  'rukun tetangga', 'saling bantu', 'saling jaga', 'tenggang rasa', 'saling pengertian', 'menghargai waktu bersama',
  'kata-kata yang menyejukkan', 'sikap bersahabat', 'keakraban yang wajar', 'hubungan yang tulus',
  'ketrampilan nyata', 'keahlian fungsional', 'karya fungsional', 'kemandirian fungsional', 'ketenangan sikap',
  'kepala dingin', 'merawat keluarga', 'menjaga rumah', 'melindungi orang terkasih', 'mendampingi',
  'mengayomi', 'integritas tindakan', 'tanggung jawab etis', 'sikap dewasa', 'keteguhan hati',
  'kejujuran diri', 'karya bermanfaat', 'kecakapan hidup', 'tindakan bermakna', 'kehormatan keluarga',
  'keberdayaan mandiri', 'pilar yang kokoh', 'kebajikan sejati', 'ketabahan wajar', 'tanggung jawab nyata',
  'hati yang lapang', 'ketenangan pikiran', 'menimbang dengan cermat', 'bersikap proporsional', 'berpikir jernih',
  'melihat dari berbagai sisi', 'kebijaksanaan bersahaja', 'ketabahan yang tenang', 'kejujuran pada diri sendiri',
  'menerima apa adanya', 'berdamai dengan keadaan', 'tindakan terukur', 'tutur kata santun', 'menjaga martabat diri',
  'keteladanan nyata', 'budi pekerti luhur', 'ketenangan batiniah', 'ketegasan yang ramah',
  'waktu istirahat yang cukup', 'tempo kerja yang wajar', 'menghargai jeda', 'menjaga kejernihan berpikir',
  // Authentic Menungsa solidarity, grounding & everyday realities
  'ruang mendukung', 'kelompok dukungan khusus laki-laki', 'aman untuk merasa', 'pria adalah manusia',
  'wajar merasa gelisah', 'wajar merasa lelah', 'wajar jika sedih', 'hadir sepenuh hati',
  'mendengarkan secara aktif', 'memvalidasi perasaan', 'menemani kawan bicara', 'kawan bicara yang tenang',
  'tanpa takut diledek', 'tanpa takut dihakimi', 'tanpa paksaan bercerita', 'ruang aman untuk diam',
  'boleh sekadar mendengarkan', 'tidak harus sendirian', 'pelan-pelan saja', 'merasa cukup',
  'menghormati duka yang mendalam', 'jeda dari layar ponsel', 'dunia yang terlalu bising',
  'kabur sebentar untuk istirahat', 'krl yang sumpek', 'beban kerja menumpuk', 'pekerjaan lepas',
  'pulang ke rumah', 'istirahat malam yang tenang', 'menghirup napas lega', 'kebutuhan hidup yang nyata',
  'beban ekonomi keluarga', 'kebaikan untuk diri sendiri', 'peduli tanpa merasa serba salah',
  'hadir mendampingi dengan tenang', 'langkah kecil yang masuk akal', 'menyapa dengan setara',
  'ruang yang nyaman untuk bernapas', 'menjaga ritme harian', 'mencari bantuan profesional yang terjangkau',
  'akses faskes terdekat', 'layanan konseling yang aman'
];
recPhrases.forEach(p => addTerm(p, recCat, recLabel, recSev, recImp, recRep));

// Recommended combinations
const recPrefixes = ['ruang', 'waktu', 'momen', 'suasana', 'ritme', 'langkah', 'pilihan'];
const recQualities = ['tenang', 'bersahaja', 'nyaman', 'aman', 'jujur', 'membumi', 'terbuka', 'bebas paksaan', 'sukarela', 'wajar'];
recPrefixes.forEach(pre => {
  recQualities.forEach(q => {
    addTerm(`${pre} yang ${q}`, recCat, recLabel, recSev, recImp, recRep);
    addTerm(`${pre} ${q}`, recCat, recLabel, recSev, recImp, recRep);
  });
});

// =========================================================================
// 6. CALIBRATED PHRASES FOR PLAYBOOK & SANDBOX PRESET TEMPLATES
// =========================================================================
const templateAdditions = [
  // Preset 1: Menghakimi (moral)
  { term: 'kalau kamu benar-benar ingin membaik', category: moralCat, categoryLabel: moralLabel, severity: moralSev, impact: 'Pengkondisian yang meragukan kesungguhan niat pembaca.', replacement: 'Bahasakan tujuan atau langkah tanpa meragukan niat pembaca.' },
  { term: 'benar-benar ingin membaik', category: moralCat, categoryLabel: moralLabel, severity: moralSev, impact: 'Pernyataan yang menguji kesungguhan niat secara menghakimi.', replacement: 'Fokus pada apa yang ingin dicapai tanpa menguji niat.' },
  { term: 'harus mulai berani cerita', category: moralCat, categoryLabel: moralLabel, severity: moralSev, impact: 'Menuntut keterbukaan sebagai ukuran keberanian atau kesungguhan.', replacement: 'Beri ruang untuk bercerita bila dan kapan pembaca merasa siap.' },
  { term: 'harus mulai', category: moralCat, categoryLabel: moralLabel, severity: moralSev, impact: 'Kata kerja imperatif yang mendesak tindakan tanpa menimbang kesiapan.', replacement: 'Gunakan ajakan bertahap atau jelaskan pilihan yang ada.' },
  { term: 'berani cerita', category: moralCat, categoryLabel: moralLabel, severity: moralSev, impact: 'Menjadikan keterbukaan sebagai tolak ukur keberanian pribadi.', replacement: 'Hindari mengaitkan keterbukaan dengan keberanian atau kekuatan moral.' },
  { term: 'terus memilih diam', category: moralCat, categoryLabel: moralLabel, severity: moralSev, impact: 'Menghakimi keputusan diam sebagai kelemahan atau kesalahan.', replacement: 'Hormati jeda atau keheningan sebagai bagian wajar dari proses.' },
  { term: 'memilih diam', category: moralCat, categoryLabel: moralLabel, severity: moralSev, impact: 'Memberi label negatif pada sikap tenang atau belum siap bicara.', replacement: 'Beri ruang tanpa menilai pilihan untuk belum bercerita.' },
  { term: 'semakin jauh dari perubahan', category: moralCat, categoryLabel: moralLabel, severity: moralSev, impact: 'Menakut-nakuti pembaca dengan vonis kegagalan.', replacement: 'Jelaskan manfaat langkah kecil secara proporsional tanpa ancaman.' },
  { term: 'jangan terus lari dari masalah', category: moralCat, categoryLabel: moralLabel, severity: moralSev, impact: 'Tuduhan menghindar yang memicu rasa bersalah dan sikap defensif.', replacement: 'Fokus pada bantuan konkret tanpa menuduh pembaca melarikan diri.' },
  { term: 'lari dari masalah', category: moralCat, categoryLabel: moralLabel, severity: moralSev, impact: 'Tuduhan moral bahwa pembaca bersikap pengecut atau tidak bertanggung jawab.', replacement: 'Deskripsikan situasi beban yang dihadapi secara objektif.' },

  // Preset 2: Tuntutan Maskulinitas (cringe)
  { term: 'laki-laki kuat', category: cringeCat, categoryLabel: cringeLabel, severity: cringeSev, impact: 'Menetapkan standar maskulinitas tertentu sebagai ukuran nilai diri pria.', replacement: 'Hindari mengkotak-kotakkan pria berdasarkan definisi kekuatan atau ketangguhan.' },
  { term: 'laki-laki kuat bukan yang terus mengeluh', category: cringeCat, categoryLabel: cringeLabel, severity: cringeSev, impact: 'Melarang keluhan dan menstigma ekspresi kelelahan emosional pria.', replacement: 'Wajarkan rasa lelah dan keluhan sebagai respons manusiawi.' },
  { term: 'bukan yang terus mengeluh', category: cringeCat, categoryLabel: cringeLabel, severity: cringeSev, impact: 'Melarang keluhan dan menstigma ekspresi kelelahan emosional pria.', replacement: 'Wajarkan rasa lelah dan keluhan sebagai respons manusiawi.' },
  { term: 'terus mengeluh', category: cringeCat, categoryLabel: cringeLabel, severity: cringeSev, impact: 'Menghakimi ekspresi rasa lelah atau kesulitan.', replacement: 'Dengarkan keluhan secara objektif tanpa memberi label cengeng.' },
  { term: 'tetap jalan meski keadaan berat', category: cringeCat, categoryLabel: cringeLabel, severity: cringeSev, impact: 'Memaksakan ketahanan fisik/mental tanpa batas dan menolak jeda istirahat.', replacement: 'Ingatkan pentingnya istirahat dan jeda yang wajar saat keadaan berat.' },
  { term: 'ambil kendali', category: cringeCat, categoryLabel: cringeLabel, severity: cringeSev, impact: 'Tuntutan dominasi dan kontrol mutlak yang sering membebani.', replacement: 'Ajak mengurai apa yang realistis dikerjakan satu per satu.' },
  { term: 'disiplinkan diri', category: cringeCat, categoryLabel: cringeLabel, severity: cringeSev, impact: 'Menuntut kekerasan disiplin internal tanpa empati terhadap kondisi riil.', replacement: 'Bangun ritme perlahan yang berkelanjutan tanpa hukuman diri.' },
  { term: 'tidak lebih kuat dari kamu', category: cringeCat, categoryLabel: cringeLabel, severity: cringeSev, impact: 'Slogan motivasi hiperbolis yang mengabaikan kompleksitas masalah nyata.', replacement: 'Akui beratnya tantangan secara jujur tanpa retorika klise.' },
  { term: 'masalah tidak lebih kuat dari kamu', category: cringeCat, categoryLabel: cringeLabel, severity: cringeSev, impact: 'Penyederhanaan klise tentang masalah hidup yang dapat terdengar meremehkan beban.', replacement: 'Validasi beratnya situasi dan tawarkan langkah pendampingan yang realistis.' },
  { term: 'masalah tidak lebih kuat', category: cringeCat, categoryLabel: cringeLabel, severity: cringeSev, impact: 'Penyederhanaan klise tentang masalah hidup yang dapat terdengar meremehkan beban.', replacement: 'Validasi beratnya situasi dan tawarkan langkah pendampingan yang realistis.' },

  // Preset 3: Diagnosis Berlebihan (clinical & imperative)
  { term: 'susah tidur', category: clinicalCat, categoryLabel: clinicalLabel, severity: clinicalSev, impact: 'Keluhan fisik yang sering langsung dilompati menjadi diagnosis klinis prematur.', replacement: 'Gambarkan pengamatan ritme istirahat tanpa langsung menyimpulkan gangguan mental.' },
  { term: 'sulit fokus', category: clinicalCat, categoryLabel: clinicalLabel, severity: clinicalSev, impact: 'Keluhan atensi yang sering dijadikan dasar diagnosis mandiri tanpa pemeriksaan profesional.', replacement: 'Sebut sebagai dinamika beban kerja atau kelelahan tanpa vonis penyakit.' },
  { term: 'menjauh dari orang lain', category: clinicalCat, categoryLabel: clinicalLabel, severity: clinicalSev, impact: 'Perilaku menarik diri yang sering dilabeli secara patologis.', replacement: 'Pahami sebagai kebutuhan jeda sosial tanpa menyematkan label klinis prematur.' },
  { term: 'mulai menjauh dari orang lain', category: clinicalCat, categoryLabel: clinicalLabel, severity: clinicalSev, impact: 'Perilaku menarik diri yang sering dilabeli secara patologis.', replacement: 'Pahami sebagai kebutuhan jeda sosial tanpa menyematkan label klinis prematur.' },
  { term: 'berarti kamu sedang mengalami burnout', category: clinicalCat, categoryLabel: clinicalLabel, severity: clinicalSev, impact: 'Menetapkan vonis diagnosis psikologis pembaca dari jauh tanpa asesmen profesional.', replacement: 'Gunakan pengamatan hati-hati dan sarankan konsultasi bila keluhan berlanjut.' },
  { term: 'sedang mengalami burnout', category: clinicalCat, categoryLabel: clinicalLabel, severity: clinicalSev, impact: 'Menyimpulkan kondisi kelelahan sebagai diagnosis formal secara sepihak.', replacement: 'Bahasakan rasa lelah harian tanpa menetapkan label diagnosis definitif.' },
  { term: 'mengalami burnout atau depresi', category: clinicalCat, categoryLabel: clinicalLabel, severity: clinicalSev, impact: 'Mendiagnosis pembaca secara serampangan dengan gangguan psikologis serius.', replacement: 'Bedakan tanda kelelahan dari diagnosis klinis yang butuh tenaga ahli.' },
  { term: 'sedang mengalami depresi', category: clinicalCat, categoryLabel: clinicalLabel, severity: clinicalSev, impact: 'Menyimpulkan diagnosis depresi tanpa asesmen profesional.', replacement: 'Jelaskan pengamatan perilaku tanpa melompat ke diagnosis.' },
  { term: 'ceritakan semuanya di sini', category: imperativeCat, categoryLabel: imperativeLabel, severity: imperativeSev, impact: 'Desakan membuka privasi secara total tanpa jaminan keamanan ruang.', replacement: 'Beri ruang otonomi: pembaca bebas memilih apa dan berapa banyak yang ingin dibagikan.' },
  { term: 'supaya kami bisa tahu apa yang sebenarnya terjadi', category: imperativeCat, categoryLabel: imperativeLabel, severity: imperativeSev, impact: 'Menuntut pengakuan agar pembaca merasa berutang kejelasan kepada pihak lain.', replacement: 'Jelaskan tujuan pendampingan tanpa memaksa pengakuan rincian masalah pribadi.' },
  { term: 'bisa tahu apa yang sebenarnya terjadi', category: imperativeCat, categoryLabel: imperativeLabel, severity: imperativeSev, impact: 'Menuntut pengakuan agar pembaca merasa berutang kejelasan kepada pihak lain.', replacement: 'Jelaskan tujuan pendampingan tanpa memaksa pengakuan rincian masalah pribadi.' },
  { term: 'menentukan bantuan yang kamu butuhkan', category: imperativeCat, categoryLabel: imperativeLabel, severity: imperativeSev, impact: 'Mengambil alih agensi pembaca seolah pihak lain yang berhak menentukan kebutuhannya.', replacement: 'Ajak berdiskusi setara untuk bersama-sama menimbang pilihan bantuan.' },

  // Preset 4: Memberi Pilihan (recommended)
  { term: 'mulai dari hal kecil', category: recCat, categoryLabel: recLabel, severity: recSev, impact: 'Ajakan bertahap yang memberi ruang bernapas dan tidak membebani pembaca.', replacement: 'Gaya penulisan Menungsa terkalibrasi.' },
  { term: 'coba catat', category: recCat, categoryLabel: recLabel, severity: recSev, impact: 'Ajakan observasional konkret yang berupa pilihan sukarela dan praktis.', replacement: 'Gaya penulisan Menungsa terkalibrasi.' },
  { term: 'perubahan yang paling mudah kamu kenali', category: recCat, categoryLabel: recLabel, severity: recSev, impact: 'Berfokus pada fakta nyata dan pengamatan diri tanpa label diagnosis.', replacement: 'Gaya penulisan Menungsa terkalibrasi.' },
  { term: 'mudah kamu kenali', category: recCat, categoryLabel: recLabel, severity: recSev, impact: 'Bahasa membumi yang menekankan pengamatan wajar.', replacement: 'Gaya penulisan Menungsa terkalibrasi.' },
  { term: 'nggak harus', category: recCat, categoryLabel: recLabel, severity: recSev, impact: 'Menghilangkan beban tuntutan moral dan memberi ruang pilihan merdeka (agency).', replacement: 'Gaya penulisan Menungsa terkalibrasi.' },
  { term: 'tidak harus', category: recCat, categoryLabel: recLabel, severity: recSev, impact: 'Menghilangkan beban tuntutan moral dan memberi ruang pilihan merdeka (agency).', replacement: 'Gaya penulisan Menungsa terkalibrasi.' },
  { term: 'kamu nggak harus', category: recCat, categoryLabel: recLabel, severity: recSev, impact: 'Menegaskan bahwa pembaca bebas dari paksaan dan tuntutan performa.', replacement: 'Gaya penulisan Menungsa terkalibrasi.' },
  { term: 'kamu tidak harus', category: recCat, categoryLabel: recLabel, severity: recSev, impact: 'Menegaskan bahwa pembaca bebas dari paksaan dan tuntutan performa.', replacement: 'Gaya penulisan Menungsa terkalibrasi.' },
  { term: 'tahu penyebabnya', category: recCat, categoryLabel: recLabel, severity: recSev, impact: 'Membebaskan pembaca dari tekanan untuk segera memiliki jawaban definitif.', replacement: 'Gaya penulisan Menungsa terkalibrasi.' },
  { term: 'langsung tahu penyebabnya', category: recCat, categoryLabel: recLabel, severity: recSev, impact: 'Membebaskan pembaca dari tekanan untuk segera memiliki jawaban definitif.', replacement: 'Gaya penulisan Menungsa terkalibrasi.' }
];

templateAdditions.forEach(item => {
  addTerm(item.term, item.category, item.categoryLabel, item.severity, item.impact, item.replacement);
});

// =========================================================================
// 7. COMPREHENSIVE ADDITIONS FROM REVISION.MD (MASTER DOKUMEN REVISI COPYWRITING)
// =========================================================================
const revisionAdditions = [
  // --- MORAL / PENILAIAN DARI REVISION.MD ---
  { term: 'meruntuhkan ego', category: moralCat, categoryLabel: moralLabel, severity: moralSev, impact: 'Memuji keterbukaan sambil mengasumsikan pembaca sebelumnya dikuasai ego.', replacement: 'Akui tindakan keterbukaan tanpa menilai kepribadian atau ego pembaca.' },
  { term: 'meruntuhkan egomu', category: moralCat, categoryLabel: moralLabel, severity: moralSev, impact: 'Memuji keterbukaan sambil mengasumsikan pembaca sebelumnya dikuasai ego.', replacement: 'Akui tindakan keterbukaan tanpa menilai kepribadian atau ego pembaca.' },
  { term: 'dikuasai ego', category: moralCat, categoryLabel: moralLabel, severity: moralSev, impact: 'Tuduhan moral bahwa sikap tertutup disebabkan oleh keangkuhan.', replacement: 'Pahami rasa enggan bercerita sebagai respons wajar menjaga rasa aman.' },
  { term: 'dikuasai oleh ego', category: moralCat, categoryLabel: moralLabel, severity: moralSev, impact: 'Tuduhan moral bahwa sikap tertutup disebabkan oleh keangkuhan.', replacement: 'Pahami rasa enggan bercerita sebagai respons wajar menjaga rasa aman.' },
  { term: 'berhenti gengsi', category: moralCat, categoryLabel: moralLabel, severity: moralSev, impact: 'Menuduh keengganan membuka diri semata-mata karena gengsi.', replacement: 'Bahasakan alasan keengganan dengan rasa hormat tanpa merendahkan.' },
  { term: 'harus mulai terbuka dan berhenti gengsi', category: moralCat, categoryLabel: moralLabel, severity: moralSev, impact: 'Menuntut audiens berubah tanpa menunjukkan apa yang organisasi sediakan.', replacement: 'Jelaskan fasilitas atau ruang yang disediakan tanpa menggurui.' },
  { term: 'harus mulai terbuka', category: moralCat, categoryLabel: moralLabel, severity: moralSev, impact: 'Menuntut keterbukaan sebagai kewajiban moral yang membebani.', replacement: 'Tawarkan opsi bercerita bila memang pembaca merasa siap.' },
  { term: 'aib rumah tangga', category: moralCat, categoryLabel: moralLabel, severity: moralSev, impact: 'Mendesak pembagian masalah privat keluarga ke ruang publik.', replacement: 'Jaga privasi ranah domestik dan arahkan ke bantuan profesional tertutup.' },
  { term: 'aib masa lalu', category: moralCat, categoryLabel: moralLabel, severity: moralSev, impact: 'Pelabelan masa lalu sebagai noda moral yang memalukan.', replacement: 'Hargai perjalanan hidup pembaca tanpa menyematkan stigma aib.' },
  { term: 'mencoreng nama baik', category: moralCat, categoryLabel: moralLabel, severity: moralSev, impact: 'Tekanan nama baik yang membebani dan membungkam keluhan nyata.', replacement: 'Fokus pada keselamatan dan kesehatan anggota keluarga.' },
  { term: 'jangan jadi pengecut', category: moralCat, categoryLabel: moralLabel, severity: moralSev, impact: 'Hinaan terhadap keraguan atau keengganan pembaca mengambil risiko.', replacement: 'Hargai kehati-hatian pembaca dan tawarkan langkah awal yang aman.' },
  { term: 'kurang bersyukur', category: moralCat, categoryLabel: moralLabel, severity: moralSev, impact: 'Penghakiman spiritual yang meremehkan penderitaan psikologis.', replacement: 'Validasi rasa lelah atau sedih sebagai kondisi manusiawi yang riil.' },
  { term: 'kurang ibadah', category: moralCat, categoryLabel: moralLabel, severity: moralSev, impact: 'Menyederhanakan gangguan mental menjadi kegagalan relijiusitas.', replacement: 'Pisahkan edukasi psikologis dari penghakiman spiritual pribadi.' },
  { term: 'lemah iman', category: moralCat, categoryLabel: moralLabel, severity: moralSev, impact: 'Stigma spiritual yang memicu rasa bersalah dan keputusasaan.', replacement: 'Ajak berfokus pada pemulihan fungsional dan pendampingan medis.' },
  { term: 'mencari kambing hitam', category: moralCat, categoryLabel: moralLabel, severity: moralSev, impact: 'Mengarahkan kebencian pada kelompok luar alih-alih menyelesaikan masalah.', replacement: 'Bangun kebersamaan dari hal yang dilakukan bersama, bukan dari siapa yang dibenci.' },
  { term: 'kambing hitam', category: moralCat, categoryLabel: moralLabel, severity: moralSev, impact: 'Mengarahkan kebencian pada pihak luar untuk menciptakan rasa solidaritas semu.', replacement: 'Fokus pada solusi konstruktif tanpa memusuhi pihak tertentu.' },
  { term: 'drama bunuh diri', category: moralCat, categoryLabel: moralLabel, severity: moralSev, impact: 'Meremehkan krisis keselamatan jiwa sebagai pencarian perhatian.', replacement: 'Perlakukan setiap sinyal krisis secara serius dengan protokol darurat.' },
  { term: 'mati konyol', category: moralCat, categoryLabel: moralLabel, severity: moralSev, impact: 'Penghakiman tidak berempati terhadap tragedi kematian akibat krisis mental.', replacement: 'Gunakan bahasa berbelasungkawa yang tenang dan hormati duka keluarga.' },
  { term: 'meninggal sia-sia', category: moralCat, categoryLabel: moralLabel, severity: moralSev, impact: 'Penghakiman moral terhadap kematian yang melukai keluarga korban.', replacement: 'Fokus pada pencegahan krisis dan rujukan darurat yang siap membantu.' },
  { term: 'petuah menggurui', category: moralCat, categoryLabel: moralLabel, severity: moralSev, impact: 'Khotbah searah yang menempatkan penulis lebih tinggi dari pembaca.', replacement: 'Posisikan diri sebagai teman seperjalanan yang setara.' },

  // --- CRINGE / SEBUTAN & TUNTUTAN MASKULINITAS DARI REVISION.MD ---
  { term: 'cowok juga boleh', category: cringeCat, categoryLabel: cringeLabel, severity: cringeSev, impact: 'Terlihat suportif, tetapi memperkuat anggapan bahwa tindakan tersebut di luar norma laki-laki.', replacement: 'Fokuskan pesan pada kegunaan, pilihan, dan situasinya tanpa framing izin gender.' },
  { term: 'pria juga boleh', category: cringeCat, categoryLabel: cringeLabel, severity: cringeSev, impact: 'Memperkuat anggapan bahwa merawat diri berada di luar kenormalan pria.', replacement: 'Jelaskan manfaat nyata tindakan tersebut secara langsung dan membumi.' },
  { term: 'laki-laki juga boleh', category: cringeCat, categoryLabel: cringeLabel, severity: cringeSev, impact: 'Memperkuat stereotip bahwa tindakan tertentu bukan hal wajar bagi pria.', replacement: 'Tuliskan secara lugas sebagai tindakan umum yang bermanfaat.' },
  { term: 'nggak usah malu jadi laki-laki yang sensitif', category: cringeCat, categoryLabel: cringeLabel, severity: cringeSev, impact: 'Menyiratkan bahwa sensitivitas pria pada dasarnya adalah hal yang memalukan.', replacement: 'Fokus pada pemahaman diri tanpa perlu melabeli tingkat sensitivitas.' },
  { term: 'nggak usah malu jadi cowok sensitif', category: cringeCat, categoryLabel: cringeLabel, severity: cringeSev, impact: 'Menyiratkan bahwa kepekaan pria pada dasarnya adalah hal yang memalukan.', replacement: 'Fokus pada pemahaman diri tanpa perlu melabeli tingkat sensitivitas.' },
  { term: 'pria sejati tidak takut mengakui traumanya', category: cringeCat, categoryLabel: cringeLabel, severity: cringeSev, impact: 'Menjadikan keberanian mengakui trauma sebagai ukuran kesejatian pria.', replacement: 'Akui pengakuan trauma secara wajar tanpa embel-embel predikat pria sejati.' },
  { term: 'pria sejati tidak takut mengakui luka batinnya', category: cringeCat, categoryLabel: cringeLabel, severity: cringeSev, impact: 'Menjadikan keterbukaan luka sebagai tiket predikat maskulinitas.', replacement: 'Beri ruang memulihkan luka tanpa tuntutan pembuktian kejantanan.' },
  { term: 'mengakui traumanya', category: cringeCat, categoryLabel: cringeLabel, severity: cringeSev, impact: 'Menuntut pengakuan trauma terbuka sebagai syarat keberanian.', replacement: 'Biarkan pembaca memproses pengalamannya dengan tempo mereka sendiri.' },
  { term: 'pria bernilai tinggi', category: cringeCat, categoryLabel: cringeLabel, severity: cringeSev, impact: 'Konsep hierarki nilai manusia berbasis kekayaan dan performa materi.', replacement: 'Hargai martabat dasar setiap manusia tanpa hierarki pasar kencan.' },
  { term: 'cowok bernilai tinggi', category: cringeCat, categoryLabel: cringeLabel, severity: cringeSev, impact: 'Jargon manosphere yang mengukur nilai diri pria dari kekayaan materi.', replacement: 'Fokus pada tanggung jawab dan keahlian nyata tanpa kasta maskulinitas.' },
  { term: 'cowok yang bernilai tinggi itu nggak kenal kata menyerah', category: cringeCat, categoryLabel: cringeLabel, severity: cringeSev, impact: 'Slogan hustle/manosphere klise yang menekan pembaca dengan performa semu.', replacement: 'Fokus pada tanggung jawab nyata tanpa jargon kasta maskulinitas.' },
  { term: 'nggak kenal kata menyerah', category: cringeCat, categoryLabel: cringeLabel, severity: cringeSev, impact: 'Slogan ekstrem yang melarang kelelahan dan menolak istirahat wajar.', replacement: 'Wajarkan kebutuhan istirahat saat fisik dan batin sudah lelah.' },
  { term: 'punya mental baja untuk sukses', category: cringeCat, categoryLabel: cringeLabel, severity: cringeSev, impact: 'Tuntutan ketangguhan mutlak yang menolak kerentanan dan kelelahan.', replacement: 'Bangun ketabahan fungsional sehari-hari secara bertahap.' },
  { term: 'bapak trap', category: cringeCat, categoryLabel: cringeLabel, severity: cringeSev, impact: 'Gaya sok kebapakan atau sok senior yang menggurui pria yang lebih muda.', replacement: 'Gunakan nada kawan sebaya (peer) yang setara dan saling menghargai.' },
  { term: 'jebakan bapak', category: cringeCat, categoryLabel: cringeLabel, severity: cringeSev, impact: 'Kecenderungan menasihati dari posisi otoritas usia yang memicu penolakan batin.', replacement: 'Posisikan diri sebagai pendamping setara tanpa menggurui.' },
  { term: 'sok kebapakan', category: cringeCat, categoryLabel: cringeLabel, severity: cringeSev, impact: 'Sikap paternalistik yang memposisikan pembaca seperti anak yang harus dididik.', replacement: 'Ajak berdialog secara setara antarpria dewasa.' },
  { term: 'harus menafkahi sendirian', category: cringeCat, categoryLabel: cringeLabel, severity: cringeSev, impact: 'Menekan pria dengan peran ekonomi tunggal mutlak tanpa ruang bernapas.', replacement: 'Akui beratnya beban nafkah dan bangun komunikasi kemitraan keluarga.' },
  { term: 'tulang punggung tunggal', category: cringeCat, categoryLabel: cringeLabel, severity: cringeSev, impact: 'Menjadikan nafkah tunggal sebagai tolak ukur mutlak kelayakan seorang pria.', replacement: 'Hargai kontribusi dalam berbagai bentuk tanpa menekan peran tunggal.' },
  { term: 'cowok tangguh pantang ke psikolog', category: cringeCat, categoryLabel: cringeLabel, severity: cringeSev, impact: 'Stigma toksik yang menghalangi pria mengakses pertolongan medis.', replacement: 'Konsultasi profesional adalah langkah fungsional yang masuk akal.' },

  // --- CLINICAL / DIAGNOSIS PREMATUR DARI REVISION.MD ---
  { term: 'berarti kamu depresi', category: clinicalCat, categoryLabel: clinicalLabel, severity: clinicalSev, impact: 'Terlalu cepat menyimpulkan diagnosis hanya dari beberapa perubahan perilaku.', replacement: 'Deskripsikan perubahan rutinitas tanpa melompat ke label gangguan klinis.' },
  { term: 'berarti kamu mengalami depresi', category: clinicalCat, categoryLabel: clinicalLabel, severity: clinicalSev, impact: 'Mendiagnosis pembaca secara sepihak tanpa asesmen medis resmi.', replacement: 'Saran konsultasi ke faskes bila perubahan kebiasaan mengganggu fungsi harian.' },
  { term: 'berarti kamu burnout', category: clinicalCat, categoryLabel: clinicalLabel, severity: clinicalSev, impact: 'Menyematkan vonis psikologis tanpa pemeriksaan menyeluruh.', replacement: 'Ajak mengurai beban kerja dan periksa ritme istirahat.' },
  { term: 'berarti kamu trauma', category: clinicalCat, categoryLabel: clinicalLabel, severity: clinicalSev, impact: 'Melabeli pengalaman sulit sebagai gangguan trauma secara prematur.', replacement: 'Gambarkan situasi kejadian tanpa melompat ke kesimpulan patologis.' },
  { term: '5 tanda kamu sedang mengalami depresi', category: clinicalCat, categoryLabel: clinicalLabel, severity: clinicalSev, impact: 'Judul umpan klik (clickbait) yang memicu kecemasan dan diagnosis mandiri.', replacement: 'Gunakan judul informatif tentang pengamatan perubahan rutinitas harian.' },
  { term: 'tanda kamu depresi', category: clinicalCat, categoryLabel: clinicalLabel, severity: clinicalSev, impact: 'Mendorong pembaca mendiagnosis diri sendiri dari daftar tanda singkat.', replacement: 'Jelaskan dinamika fisik dan anjurkan pemeriksaan tenaga ahli.' },
  { term: 'merasa hampa, kesepian, dan gagal sebagai laki-laki', category: clinicalCat, categoryLabel: clinicalLabel, severity: clinicalSev, impact: 'Menentukan perasaan pembaca sebelum mereka sempat menamainya sendiri.', replacement: 'Mulai dari situasi konkret yang dapat diamati pembaca.' },
  { term: 'merasa hampa, kesepian, dan gagal sebagai pria', category: clinicalCat, categoryLabel: clinicalLabel, severity: clinicalSev, impact: 'Menebak emosi dan menyematkan vonis kegagalan maskulinitas.', replacement: 'Biarkan pembaca mengenali dan menamai perasaannya sendiri.' },
  { term: 'gagal sebagai laki-laki', category: clinicalCat, categoryLabel: clinicalLabel, severity: clinicalSev, impact: 'Vonis yang meruntuhkan martabat diri pembaca secara langsung.', replacement: 'Bahas tantangan hidup tanpa mencabut martabat kemanusiaan pria.' },
  { term: 'gagal sebagai pria', category: clinicalCat, categoryLabel: clinicalLabel, severity: clinicalSev, impact: 'Vonis destruktif yang mengikis harga diri dan memicu keputusasaan.', replacement: 'Fokus pada satu masalah nyata yang bisa diurai bersama.' },
  { term: 'trauma masa kecil yang belum sembuh', category: clinicalCat, categoryLabel: clinicalLabel, severity: clinicalSev, impact: 'Asumsi psikoanalitik prematur yang disematkan sembarangan ke pembaca.', replacement: 'Hargai masa lalu pembaca tanpa membuat tebakan diagnosis masa kecil.' },
  { term: 'kondisi abnormal', category: clinicalCat, categoryLabel: clinicalLabel, severity: clinicalSev, impact: 'Menstigma keluhan emosional sebagai penyimpangan atau kecacatan.', replacement: 'Wajarkan respon stres sebagai reaksi alami tubuh atas tekanan berat.' },

  // --- IMPERATIVE / DESAKAN BUKA DIRI DARI REVISION.MD ---
  { term: 'ceritakan masalah mentalmu di kolom komentar', category: imperativeCat, categoryLabel: imperativeLabel, severity: imperativeSev, impact: 'Mendesak pengungkapan masalah pribadi di ruang publik yang sarat risiko sosial.', replacement: 'Di ruang publik, beri informasi dan pilihan tanpa meminta pengakuan pribadi.' },
  { term: 'ceritakan masalahmu di kolom komentar', category: imperativeCat, categoryLabel: imperativeLabel, severity: imperativeSev, impact: 'Mendesak pembaca membuka kerentanan pribadi di linimasa terbuka.', replacement: 'Arahkan ke jalur privat jika percakapan membutuhkan keterbukaan lebih jauh.' },
  { term: 'share di kolom komentar', category: imperativeCat, categoryLabel: imperativeLabel, severity: imperativeSev, impact: 'Menuntut partisipasi publik atas hal yang bersifat personal dan rentan penilaian.', replacement: 'Sediakan opsi refleksi mandiri tanpa kewajiban komentar.' },
  { term: 'tumpahkan semua unek-unekmu di kolom komentar', category: imperativeCat, categoryLabel: imperativeLabel, severity: imperativeSev, impact: 'Ajakan membuka beban pribadi di kolom komentar terbuka yang berisiko tinggi.', replacement: 'Sediakan ruang yang aman dan privat untuk bertukar cerita.' },
  { term: 'tumpahkan unek-unekmu di kolom komentar', category: imperativeCat, categoryLabel: imperativeLabel, severity: imperativeSev, impact: 'Ajakan membuka beban pribadi di kolom komentar terbuka yang berisiko tinggi.', replacement: 'Sediakan ruang yang aman dan privat untuk bertukar cerita.' },
  { term: 'ceritakan masalah terberatmu di sini sekarang juga', category: imperativeCat, categoryLabel: imperativeLabel, severity: imperativeSev, impact: 'Mendesak pembaca menceritakan hal paling privat sebelum ia merasa siap dan aman.', replacement: 'Beri pembaca kendali penuh atas apa dan seberapa banyak yang ingin dibagikan.' },
  { term: 'ceritakan masalah terberatmu', category: imperativeCat, categoryLabel: imperativeLabel, severity: imperativeSev, impact: 'Tuntutan keterbukaan ekstrem yang melanggar batas privasi alami.', replacement: 'Mulai dari hal kecil sehari-hari yang terasa nyaman.' },
  { term: 'ceritakan semua yang selama ini kamu pendam', category: imperativeCat, categoryLabel: imperativeLabel, severity: imperativeSev, impact: 'Langsung meminta pengakuan penuh tanpa memberi ruang menentukan batas sendiri.', replacement: 'Beri izin untuk sekadar mendengarkan atau menyimpan hal pribadi.' },
  { term: 'kalau serius ingin pulih, ceritakan semuanya sekarang', category: imperativeCat, categoryLabel: imperativeLabel, severity: imperativeSev, impact: 'Menjadikan keterbukaan mutlak sebagai syarat kesungguhan pulih.', replacement: 'Privat tidak berarti bebas menuntut; hormati batas kesiapan orang.' },
  { term: 'ceritakan semuanya sekarang', category: imperativeCat, categoryLabel: imperativeLabel, severity: imperativeSev, impact: 'Desakan agresif yang mengabaikan kesiapan mental pembaca.', replacement: 'Tawarkan ruang aman dengan tempo yang ditentukan oleh pembaca.' },
  { term: 'wajib share ke 5 temanmu', category: imperativeCat, categoryLabel: imperativeLabel, severity: imperativeSev, impact: 'Taktik pemasaran manipulatif yang memanfaatkan isu kesehatan mental.', replacement: 'Biarkan pembaca membagikan konten secara sukarela bila bermanfaat.' },
  { term: 'tag temanmu yang butuh bantuan mental', category: imperativeCat, categoryLabel: imperativeLabel, severity: imperativeSev, impact: 'Memaksa penandaan orang lain di ruang publik yang memalukan korban.', replacement: 'Sarankan meneruskan tautan secara personal dan privat ke rekan terpercaya.' },
  { term: 'chat admin sekarang juga sebelum kehabisan slot', category: imperativeCat, categoryLabel: imperativeLabel, severity: imperativeSev, impact: 'Menciptakan rasa panik palsu (FOMO) pada program pendampingan.', replacement: 'Jelaskan jadwal dan kapasitas secara transparan tanpa urgensi manipulatif.' },

  // --- RECOMMENDED / BAHASA KONKRET & BERDAYA DARI REVISION.MD ---
  { term: 'ruang buat cerita dan ngobrol bareng', category: recCat, categoryLabel: recLabel, severity: recSev, impact: 'Menyapa pembaca dan menjelaskan suasana program tanpa syarat yang memberatkan.', replacement: 'Gaya penulisan Menungsa terkalibrasi.' },
  { term: 'ruang buat cerita', category: recCat, categoryLabel: recLabel, severity: recSev, impact: 'Bahasa bersahaja yang ramah dan tidak mengintimidasi.', replacement: 'Gaya penulisan Menungsa terkalibrasi.' },
  { term: 'ngobrol bareng', category: recCat, categoryLabel: recLabel, severity: recSev, impact: 'Menghilangkan kekakuan formal dan membuka suasana santai setara.', replacement: 'Gaya penulisan Menungsa terkalibrasi.' },
  { term: 'tidak harus cerita apa-apa', category: recCat, categoryLabel: recLabel, severity: recSev, impact: 'Menghilangkan tuntutan wajib bicara sejak kalimat pertama.', replacement: 'Gaya penulisan Menungsa terkalibrasi.' },
  { term: 'belum siap cerita? nggak apa-apa', category: recCat, categoryLabel: recLabel, severity: recSev, impact: 'Memvalidasi keraguan dan menjaga otonomi pembaca sepenuhnya.', replacement: 'Gaya penulisan Menungsa terkalibrasi.' },
  { term: 'nggak apa-apa', category: recCat, categoryLabel: recLabel, severity: recSev, impact: 'Penenang wajar yang membebaskan pembaca dari tekanan rasa bersalah.', replacement: 'Gaya penulisan Menungsa terkalibrasi.' },
  { term: 'tidak apa-apa', category: recCat, categoryLabel: recLabel, severity: recSev, impact: 'Penenang wajar yang membebaskan pembaca dari tekanan rasa bersalah.', replacement: 'Gaya penulisan Menungsa terkalibrasi.' },
  { term: 'kamu bebas memilih mau bercerita, menguatkan, atau sekadar mendengarkan', category: recCat, categoryLabel: recLabel, severity: recSev, impact: 'Memberikan spektrum pilihan peran yang konkret dan tidak menuntut.', replacement: 'Gaya penulisan Menungsa terkalibrasi.' },
  { term: 'bebas memilih', category: recCat, categoryLabel: recLabel, severity: recSev, impact: 'Menjunjung tinggi kedaulatan dan agensi mandiri pembaca.', replacement: 'Gaya penulisan Menungsa terkalibrasi.' },
  { term: 'kamu bebas memilih', category: recCat, categoryLabel: recLabel, severity: recSev, impact: 'Menjunjung tinggi kedaulatan dan agensi mandiri pembaca.', replacement: 'Gaya penulisan Menungsa terkalibrasi.' },
  { term: 'empat di antaranya lebih banyak mendengarkan', category: recCat, categoryLabel: recLabel, severity: recSev, impact: 'Menggambarkan fakta yang terlihat tanpa memberi label penilaian.', replacement: 'Gaya penulisan Menungsa terkalibrasi.' },
  { term: 'lebih banyak mendengarkan', category: recCat, categoryLabel: recLabel, severity: recSev, impact: 'Melegitimasi peran sebagai pendengar yang tenang dan berharga.', replacement: 'Gaya penulisan Menungsa terkalibrasi.' },
  { term: 'ikut dulu sebagai pendengar', category: recCat, categoryLabel: recLabel, severity: recSev, impact: 'Menurunkan hambatan masuk bagi peserta yang belum siap aktif bicara.', replacement: 'Gaya penulisan Menungsa terkalibrasi.' },
  { term: 'pilih satu orang yang cukup kamu percaya', category: recCat, categoryLabel: recLabel, severity: recSev, impact: 'Satu langkah awal yang sangat spesifik dan realistis.', replacement: 'Gaya penulisan Menungsa terkalibrasi.' },
  { term: 'orang yang cukup kamu percaya', category: recCat, categoryLabel: recLabel, severity: recSev, impact: 'Mengarahkan dukungan ke lingkungan yang sudah terbukti aman.', replacement: 'Gaya penulisan Menungsa terkalibrasi.' },
  { term: 'gue pusing nih, ayok nongkrong', category: recCat, categoryLabel: recLabel, severity: recSev, impact: 'Contoh kalimat pembuka obrolan yang natural dan tidak dramatis.', replacement: 'Gaya penulisan Menungsa terkalibrasi.' },
  { term: 'ayok nongkrong', category: recCat, categoryLabel: recLabel, severity: recSev, impact: 'Aktivitas pertemanan informal khas Indonesia yang rendah beban sosial.', replacement: 'Gaya penulisan Menungsa terkalibrasi.' },
  { term: 'catat satu hal yang paling menguras energimu', category: recCat, categoryLabel: recLabel, severity: recSev, impact: 'Tindakan kecil berbatas jelas untuk membantu refleksi diri tanpa beban besar.', replacement: 'Gaya penulisan Menungsa terkalibrasi.' },
  { term: 'sudah lewat jam tiga pagi', category: recCat, categoryLabel: recLabel, severity: recSev, impact: 'Mulai dari situasi nyata yang langsung dapat dikenali tanpa vonis penyakit.', replacement: 'Gaya penulisan Menungsa terkalibrasi.' },
  { term: 'mengecek saldo lagi', category: recCat, categoryLabel: recLabel, severity: recSev, impact: 'Detail perilaku realistis yang mewakili beban kecemasan finansial pria.', replacement: 'Gaya penulisan Menungsa terkalibrasi.' },
  { term: 'chat makin sering menumpuk', category: recCat, categoryLabel: recLabel, severity: recSev, impact: 'Tanda kelelahan sehari-hari yang wajar diamati sebelum memberi nama emosi.', replacement: 'Gaya penulisan Menungsa terkalibrasi.' },
  { term: 'bercerita bisa membantu sebagian orang', category: recCat, categoryLabel: recLabel, severity: recSev, impact: 'Menyampaikan kemungkinan manfaat secara jujur tanpa membuat klaim mutlak.', replacement: 'Gaya penulisan Menungsa terkalibrasi.' },
  { term: 'pengalaman dan dampaknya bisa berbeda-beda', category: recCat, categoryLabel: recLabel, severity: recSev, impact: 'Menghormati keragaman respons individu tanpa generalisasi semu.', replacement: 'Gaya penulisan Menungsa terkalibrasi.' },
  { term: 'dampaknya bisa berbeda-beda', category: recCat, categoryLabel: recLabel, severity: recSev, impact: 'Kejujuran ilmiah tentang batasan efektivitas suatu metode pada setiap orang.', replacement: 'Gaya penulisan Menungsa terkalibrasi.' },
  { term: 'belum menyediakan layanan krisis 24 jam', category: recCat, categoryLabel: recLabel, severity: recSev, impact: 'Transparansi kapasitas organisasi agar pengguna yang darurat segera ke faskes resmi.', replacement: 'Gaya penulisan Menungsa terkalibrasi.' },
  { term: 'fasilitas kesehatan terdekat bersama orang yang kamu percaya', category: recCat, categoryLabel: recLabel, severity: recSev, impact: 'Instruksi keselamatan yang lugas, terarah, dan mengutamakan pendampingan nyata.', replacement: 'Gaya penulisan Menungsa terkalibrasi.' },
  { term: 'setiap peserta menyepakati aturan mengobrol dan kerahasiaan bersama', category: recCat, categoryLabel: recLabel, severity: recSev, impact: 'Menunjukkan penerapan nilai ruang aman lewat kesepakatan dan praktik riil.', replacement: 'Gaya penulisan Menungsa terkalibrasi.' },
  { term: 'aturan mengobrol dan kerahasiaan bersama', category: recCat, categoryLabel: recLabel, severity: recSev, impact: 'Kejelasan batasan privasi sebelum percakapan dimulai.', replacement: 'Gaya penulisan Menungsa terkalibrasi.' },
  { term: 'tidak akan membagikan cerita peserta ke publik tanpa izin', category: recCat, categoryLabel: recLabel, severity: recSev, impact: 'Komitmen etis yang dinyatakan dalam tindakan konkret yang dapat diverifikasi.', replacement: 'Gaya penulisan Menungsa terkalibrasi.' },
  { term: 'meminta persetujuan terlebih dahulu', category: recCat, categoryLabel: recLabel, severity: recSev, impact: 'Menghormati hak kedaulatan data dan cerita hidup partisipan.', replacement: 'Gaya penulisan Menungsa terkalibrasi.' },
  { term: 'pertimbangkan siapa yang bisa melihat', category: recCat, categoryLabel: recLabel, severity: recSev, impact: 'Pemeriksaan kontekstual ruang sosial sebelum merancang pesan.', replacement: 'Gaya penulisan Menungsa terkalibrasi.' },
  { term: 'mulai dari bagian yang terasa nyaman', category: recCat, categoryLabel: recLabel, severity: recSev, impact: 'Memberikan kendali penuh pada pembaca dalam memilih kedalaman cerita.', replacement: 'Gaya penulisan Menungsa terkalibrasi.' },
  { term: 'konsultasi bisa membantu kamu memahami apa yang belakangan berubah', category: recCat, categoryLabel: recLabel, severity: recSev, impact: 'Menjelaskan manfaat fungsional bantuan profesional tanpa membebankan stigma.', replacement: 'Gaya penulisan Menungsa terkalibrasi.' },
  { term: 'menentukan langkah berikutnya', category: recCat, categoryLabel: recLabel, severity: recSev, impact: 'Mendorong agensi dan orientasi tindakan yang realistis.', replacement: 'Gaya penulisan Menungsa terkalibrasi.' }
];

revisionAdditions.forEach(item => {
  addTerm(item.term, item.category, item.categoryLabel, item.severity, item.impact, item.replacement);
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
