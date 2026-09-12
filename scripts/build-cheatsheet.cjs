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
