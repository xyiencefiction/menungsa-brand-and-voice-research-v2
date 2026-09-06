const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

const dataDir = path.resolve(__dirname, '../public/data');
const outDir = path.resolve(__dirname, '../src/data');

function parseCSV(fileName) {
  const content = fs.readFileSync(path.join(dataDir, fileName), 'utf-8');
  const parsed = Papa.parse(content, { header: true, skipEmptyLines: true });
  return parsed.data;
}

const mechanisms = parseCSV('mechanism_matrix.csv');
const claims = parseCSV('claim_ledger.csv');
const contradictions = parseCSV('contradiction_matrix.csv');
const intersections = parseCSV('cross_report_intersection.csv');
const rawToneContexts = parseCSV('tone_context_matrix.csv');
const confidence = parseCSV('evidence_confidence.csv');
const evidenceMatrix = parseCSV('evidence_matrix.csv');

// Filter out header annotation row if present
const toneContexts = rawToneContexts.filter(row => row.context_id && row.context_id.startsWith('C'));

// Indonesian language register dataset derived from Section 29 of Voice Strategy & Section 6 of Indonesia translation
const languageRegisters = [
  {
    id: "saya",
    term: "saya",
    type: "1st_person_singular",
    label: "Saya (1st Singular)",
    authorityLevel: 4,
    intimacyLevel: 1,
    socialRelationship: "Formal, institutional distance, objective reporting, clinical dignity",
    regionalClassCoding: "Standard Indonesian, nationwide, educated / official discourse",
    appropriateContexts: ["Institutional announcements", "Clinical / psychological authority", "Official publications", "Formal interviews"],
    inappropriateContexts: ["Peer homosocial storytelling", "Casual community chat", "Tongkrongan / street empathy"],
    authenticityRisks: "Creates bureaucratic chill or medical detachment if used in personal empathy posts",
    evidenceBasis: "Sociolinguistic deictic norms (S03, S04). Standard in premium banking & formal healthcare."
  },
  {
    id: "aku",
    term: "aku",
    type: "1st_person_singular",
    label: "Aku (1st Singular)",
    authorityLevel: 2,
    intimacyLevel: 4,
    socialRelationship: "Intimate, introspective, personal vulnerability, confessional warmth",
    regionalClassCoding: "General Indonesian, literature/poetry, Javanese ngoko peer familiarity",
    appropriateContexts: ["Personal reflection / contemplation", "First-person recovery narratives", "Kahf-style reflective monologue ('Life is a Journey')"],
    inappropriateContexts: ["Jakarta street talk between adult men (often avoided as romantic/feminine unless Javanese)", "Institutional press statements"],
    authenticityRisks: "Can sound overly poetic, sentimental, or effeminate in urban male peer settings if uncalibrated",
    evidenceBasis: "Corpus analysis of brand messaging (Kahf) & Javanese cultural sociolinguistics (S03, S04)."
  },
  {
    id: "gue",
    term: "gue / gua",
    type: "1st_person_singular",
    label: "Gue / Gua (1st Singular)",
    authorityLevel: 1,
    intimacyLevel: 5,
    socialRelationship: "Horizontal peerhood, street egalite, conversational solidarity",
    regionalClassCoding: "Colloquial Jakartan Indonesian, urban youth, digital cosmopolitan vernacular",
    appropriateContexts: ["Named individual personal creator content", "Peer video testimony", "Casual TikTok / Reels commentary from authentic speaker"],
    inappropriateContexts: ["Institutional brand voice speaking as a faceless org", "Crisis hotlines", "Elderly or conservative regional audiences"],
    authenticityRisks: "Cringe catastrophe if deployed by an institution without a licensed human face ('impersonation')",
    evidenceBasis: "S04, S06 Section 29: Relatability is relationally licensed. Unearned slang backfires immediately."
  },
  {
    id: "Anda",
    term: "Anda",
    type: "2nd_person_singular",
    label: "Anda (2nd Singular)",
    authorityLevel: 5,
    intimacyLevel: 1,
    socialRelationship: "Maximum social distance, respect for personal boundary, transactional",
    regionalClassCoding: "Formal standard Indonesian, corporate, professional services",
    appropriateContexts: ["High-end automotive / financial advisories", "Terms of service, privacy policies", "Formal clinical assessment invitations"],
    inappropriateContexts: ["Community mental-health support", "Emotional vulnerability", "Peer invitation"],
    authenticityRisks: "Feels cold, corporate, and bureaucratic; prevents any sense of shared human warmth",
    evidenceBasis: "Indonesian deictic literature. Fails completely in male community mental health."
  },
  {
    id: "kamu",
    term: "kamu",
    type: "2nd_person_singular",
    label: "Kamu (2nd Singular)",
    authorityLevel: 3,
    intimacyLevel: 3,
    socialRelationship: "Direct yet respectful address, supportive mentor, empathetic peer",
    regionalClassCoding: "Standard conversational Indonesian, nationwide, neutral across classes",
    appropriateContexts: ["Default second-person for Menungsa educational content", "Supportive healthcare campaigns", "One-on-one reflective invitations"],
    inappropriateContexts: ["Aggressive challenge copy", "Hyper-local street slang banter"],
    authenticityRisks: "Can sound mildly patronizing or overly maternal ('guru BP') if delivered with preachiness",
    evidenceBasis: "Modal recommended second-person pronoun in Phase B voice strategy (§29)."
  },
  {
    id: "lo",
    term: "lo / lu",
    type: "2nd_person_singular",
    label: "Lo / Lu (2nd Singular)",
    authorityLevel: 1,
    intimacyLevel: 5,
    socialRelationship: "High intimacy, peer-to-peer, demand for straightforward reciprocity",
    regionalClassCoding: "Jakarta vernacular, urban youth, digital casual",
    appropriateContexts: ["Casual conversational video by a named peer", "MS Glow For Men style self-deprecating banter", "Grooming tutorials ('nggak ribet')"],
    inappropriateContexts: ["Official organisation captions", "Crisis intervention", "Older men (45+) and rural communities"],
    authenticityRisks: "Perceived as arrogant, disrespectful, or corporate cringe if not relationally licensed",
    evidenceBasis: "Corpus analysis of Garnier Men / MS Glow vs institutional mental health."
  },
  {
    id: "kami",
    term: "kami (exclusive)",
    type: "1st_person_plural",
    label: "Kami (1st Plural Exclusive)",
    authorityLevel: 4,
    intimacyLevel: 2,
    socialRelationship: "Speaks on behalf of the organisation, delineating team boundary",
    regionalClassCoding: "Standard grammatical Indonesian",
    appropriateContexts: ["Announcing services, research methodology, organizational commitments", "Safety & logistics policies"],
    inappropriateContexts: ["Pretending to invite the audience into mutual feeling"],
    authenticityRisks: "Creates clear boundary between 'us' (the org) and 'you' (the audience)",
    evidenceBasis: "Sociolinguistic distinction: kami preserves institutional honesty; doesn't presume unearned solidarity."
  },
  {
    id: "kita",
    term: "kita (inclusive)",
    type: "1st_person_plural",
    label: "Kita (1st Plural Inclusive)",
    authorityLevel: 2,
    intimacyLevel: 4,
    socialRelationship: "Collective shared identity, mutual fate, joint struggle, horizontal unity",
    regionalClassCoding: "Universal Indonesian; deeply embedded in sports and gotong royong",
    appropriateContexts: ["Once real community exists", "Sports-adjacent solidarity ('Timnas kita')", "Describing shared human conditions ('kita semua pernah bingung')"],
    inappropriateContexts: ["Cold audience entry", "Pretending the institution shares the same personal trauma as an individual"],
    authenticityRisks: "Presumptuous manipulation ('kita-kitaan') if used before mutual rapport is established",
    evidenceBasis: "M04 Belonging; PBSI & football corpus analysis; M09 Messenger credibility."
  },
  {
    id: "pria",
    term: "pria",
    type: "gender_term",
    label: "Pria (Male Reference)",
    authorityLevel: 4,
    intimacyLevel: 2,
    socialRelationship: "Dignified, mature, premium, aspirational, composed (halus)",
    regionalClassCoding: "Formal / media Indonesian, urban middle-to-upper class",
    appropriateContexts: ["Editorial articles, psychoeducation, mature self-improvement", "Kahf / premium grooming, professional health"],
    inappropriateContexts: ["Raw street banter, teen gaming memes"],
    authenticityRisks: "Can feel slightly stiff or aspirational if used in grassroots settings",
    evidenceBasis: "Brand corpus: used by Kahf, NIVEA MEN, automotive brands."
  },
  {
    id: "laki-laki",
    term: "laki-laki / laki",
    type: "gender_term",
    label: "Laki-laki / Laki (Male Reference)",
    authorityLevel: 3,
    intimacyLevel: 3,
    socialRelationship: "Biological / sociological category; or raw performance focus ('Laki!')",
    regionalClassCoding: "Official demographic Indonesian; monolexemic 'Laki' has working-class challenge coding",
    appropriateContexts: ["Academic / demographic research", "Gender discussions", "Grassroots challenge (Extra Joss)"],
    inappropriateContexts: ["Gentle reflective counseling"],
    authenticityRisks: "'Laki' can sound aggressively macho or hyper-masculine; 'laki-laki' is clinically neutral",
    evidenceBasis: "Extra Joss corpus vs Academic Gender literature."
  },
  {
    id: "cowok",
    term: "cowok",
    type: "gender_term",
    label: "Cowok (Male Reference)",
    authorityLevel: 1,
    intimacyLevel: 4,
    socialRelationship: "Casual, youthful, relatable, low-barrier, unpretentious",
    regionalClassCoding: "Colloquial Indonesian, youth, social media",
    appropriateContexts: ["Youth mental health, dating / social skills, informal peer posts", "MS Glow For Men"],
    inappropriateContexts: ["Clinical crisis protocols, institutional statements, mature adult fatherhood"],
    authenticityRisks: "Can sound trivial or juvenile for serious adult dilemmas",
    evidenceBasis: "Brand and youth digital culture corpus."
  },
  {
    id: "bro",
    term: "bro / bang / mas / pak",
    type: "vocative",
    label: "Vocatives (Bro, Bang, Mas, Pak)",
    authorityLevel: 2,
    intimacyLevel: 4,
    socialRelationship: "Calibrated kinship & status levelers: Bro (modern peer), Bang/Mas (respectful peer), Pak (authority/elder)",
    regionalClassCoding: "Bro (cosmopolitan), Bang (Betawi/Sumatra/Jakarta), Mas (Java/nationwide), Pak (formal/paternal)",
    appropriateContexts: ["Individual peer facilitators, comments replies, face-to-face community sessions"],
    inappropriateContexts: ["Automated corporate bot saying 'Halo Bro!'", "Crisis intervention"],
    authenticityRisks: "Manufactured 'bro' from an institution triggers acute embarrassment and mockery",
    evidenceBasis: "Scott Kiesling's stance indexing & Indonesian vocative politeness literature."
  }
];

// Manosphere Functional Alternatives dataset (from Section 13 & M12 diagram)
const manosphereAlternatives = [
  {
    functionName: "Certainty & Intelligibility",
    mechanismId: "M03",
    underlyingNeed: "Need for structure, cognitive closure, and an intelligible explanation for why life/dating/status is difficult",
    whyCompelling: "Relieves acute disorientation; transforms messy social ambiguity into an orderly, systematic blueprint",
    harmfulImplementation: "Totalizing Red Pill dogmas, pseudo-biological evolutionary determinism, female hypergamy conspiracies, blackpill fatalism",
    ethicalAlternative: "Provide structured, realistic maps of human psychology and social dynamics with honest calibrated uncertainty. Name real difficulty without inventing enemies.",
    keyPrinciple: "Calibrated structure instead of false totalizing rules."
  },
  {
    functionName: "Validation & Recognition",
    mechanismId: "M05",
    underlyingNeed: "Need to feel seen, understood, and relieved of isolated personal shame when falling short of societal standards",
    whyCompelling: "Lifts the paralyzing burden of individual failure by asserting 'it is not just you; the system is difficult'",
    harmfulImplementation: "Grievance amplification: weaponizing valid personal pain into collective misogyny, resentment, and blaming women or feminism",
    ethicalAlternative: "Validate the genuine difficulty of modern male roles, economic precarity, and emotional isolation WITHOUT supplying a scapegoat or villain.",
    keyPrinciple: "Validate the hardship, never validate a false conspiratorial explanation."
  },
  {
    functionName: "Status, Competence & Dignity",
    mechanismId: "M08",
    underlyingNeed: "Need for self-worth, social respect, competence, and a tangible sense of personal significance",
    whyCompelling: "Replaces feelings of worthlessness with clear hierarchies, actionable fitness/wealth ladders, and masculine pride",
    harmfulImplementation: "Hyper-hierarchical domination, looksmaxxing self-objectification, 'High-Value Man' contempt for lower-status men and women",
    ethicalAlternative: "Ground dignity in intrinsic adult competence, self-referenced growth, craft mastery, and ethical responsibility toward one's household and community.",
    keyPrinciple: "Competence and self-worth without competitive ranking."
  },
  {
    functionName: "Agency & Efficacy",
    mechanismId: "M02",
    underlyingNeed: "Need to escape helplessness and feel in control of one's destiny through concrete, bounded actions",
    whyCompelling: "Action restores dopamine and agency; rejects passive victimhood and clinical defeatism",
    harmfulImplementation: "Brutal grindset moralizing, toxic individualism, ignoring structural poverty, and blaming depressed men for lacking 'discipline'",
    ethicalAlternative: "Offer concrete, performable, low-threshold steps while maintaining compassionate honesty about structural economic/institutional constraints.",
    keyPrinciple: "Actionable autonomy with structural empathy."
  },
  {
    functionName: "Belonging & In-group Identity",
    mechanismId: "M04",
    underlyingNeed: "Need for male camaraderie, shared identity, and safe spaces where men do not feel judged",
    whyCompelling: "Counteracts modern male isolation; creates an affective home with shared memes, vocabulary, and solidarity",
    harmfulImplementation: "Sectarian out-group hatred, echo chambers that police emotional stoicism, and radicalizing vulnerable recruits",
    ethicalAlternative: "Build grounded male spaces centered around shared activity, sports, mutual support, and licensed side-by-side companionship.",
    keyPrinciple: "Camaraderie through shared objects, not through shared hostility."
  }
];

// Applied Playbook Rules (from Voice Strategy §26, §29, §33)
const playbookRules = [
  {
    id: "R01",
    category: "Voice & Tone",
    action: "DO: Keep the first move small, private, and reversible",
    avoid: "DON'T: Demand emotional disclosure as the entry price ('Yuk tumpahkan semuanya')",
    rationale: "Lowering response cost (M01) matters far more than raising emotional intensity. Men avoid exposure, not help.",
    mechanism: "M01 Response Cost",
    confidence: "PROMISING / TENTATIVE (Convergent Practice)",
    boundaryCondition: "Acute suicide crisis requires unambiguous instruction, not low-pressure hedging.",
    doExamples: [
      { example: "Sesi berikutnya Selasa, 19.00. Boleh datang, boleh cuma lihat-lihat dulu.", why: "Two options offered at once, so arriving is not a commitment to anything." },
      { example: "Nggak perlu daftar. Datang aja, dan boleh pulang kapan saja.", why: "Removes both the entry step and the exit cost in one line." },
      { example: "Balas dengan satu kata kalau mau infonya. Kalau nggak, pesan ini nggak perlu dibalas.", why: "Makes not responding an explicitly acceptable outcome rather than a silence he has to justify." },
      { example: "Minggu lalu yang datang tujuh orang. Dua di antaranya nggak ngomong sama sekali.", why: "Describes the room with a verifiable detail, which does the work that a promise of safety cannot." }
    ],
    dontExamples: [
      { example: "Yuk tumpahin semua unek-unekmu di sini!", why: "Disclosure as the stated purpose of arriving is the entry price this rule exists to remove." },
      { example: "Ceritakan pengalaman tersulitmu di kolom komentar.", why: "Asks for the highest-exposure act available on a public surface." },
      { example: "Isi form ini dulu ya, biar kami tahu kondisi kamu.", why: "Puts an assessment in front of the door, so the cost is paid before anything is received." },
      { example: "Konfirmasi kehadiran dengan komen ‘HADIR’.", why: "Turns attendance into a public declaration in front of everyone who can see the thread." }
    ]
  },
  {
    id: "R02",
    category: "Linguistics & Syntax",
    action: "DO: Use concrete situations to let emotion arrive naturally ('Jam tiga pagi, masih ngecek saldo')",
    avoid: "DON'T: Lead with diagnostic labels or clinical jargon ('Kamu mungkin depresi')",
    rationale: "Men prefer coded emotional language and direct behavioral language simultaneously (Sharp et al.). Everyday detail earns the feeling.",
    mechanism: "M20 Emotional-Exposure Calibration & M05 Recognition",
    confidence: "MODERATE",
    boundaryCondition: "High-risk safety protocols require clinical precision and direct terminology.",
    doExamples: [
      { example: "Jam tiga pagi, masih ngecek saldo.", why: "One observable situation, no feeling named, nothing for him to concede." },
      { example: "Motor udah dipanasin, tapi belum berangkat-berangkat juga.", why: "A physical detail that carries the state without diagnosing it." },
      { example: "Chat dari bos kebaca jam sebelas malam. Dibalas jam sebelas lewat dua.", why: "Two timestamps do the work an adjective would have done badly." },
      { example: "Makan siang tetap jalan. Cuma sekarang sambil buka aplikasi lowongan.", why: "Functioning and not being fine shown in the same sentence, which is the recognition this rule is for." }
    ],
    dontExamples: [
      { example: "Kamu mungkin depresi.", why: "A diagnostic label aimed at the reader before he has agreed to be a reader." },
      { example: "Ini gejala anxiety disorder yang harus kamu waspadai.", why: "Clinical terminology arriving before any everyday description, which reverses the sequencing rule." },
      { example: "Apakah kamu merasa hampa dan kehilangan makna hidup?", why: "An open introspective question that costs him something to answer." },
      { example: "5 Tanda Kamu Butuh Bantuan Profesional.", why: "Puts the conclusion in the headline, at the point of highest exposure." }
    ]
  },
  {
    id: "R03",
    category: "Indonesian Register",
    action: "DO: Use 'kamu' as default institutional address; reserve 'gue/lo' strictly for named peer creators",
    avoid: "DON'T: Use corporate 'gue/lo' or forced 'bro' from an anonymous institutional account",
    rationale: "Relatability is relationally licensed (M09). Institutional slang is universally diagnosed as cringe impersonation.",
    mechanism: "M09 Messenger Credibility / Licensed Intimacy",
    confidence: "MODERATE-STRONG (Sociolinguistics)",
    boundaryCondition: "Individual staff writing personal reflections may authentically use their natural dialect.",
    doExamples: [
      { example: "Kamu boleh cerita, boleh juga cuma dengerin.", why: "Kamu as the institutional default: direct without claiming intimacy." },
      { example: "Kami di Menungsa nyediain ruangnya. Kami nggak nanya kalau kamu belum mau cerita.", why: "Kami keeps the organisation honest about being an organisation rather than a friend." },
      { example: "Gue Rio, tim konten Menungsa. Gue yang nulis ini.", why: "Gue is licensed here because a named person is speaking as himself." },
      { example: "Nomor ini dipegang Dimas. Kalau dia lagi nggak online, balasannya besok pagi.", why: "Attribution plus an honest limit on availability, which is what makes the informal register credible." }
    ],
    dontExamples: [
      { example: "Bro, lo nggak sendirian kok!", why: "Vernacular from an unattributed account is a credibility event, not a stylistic choice." },
      { example: "Gaes, yuk jaga mental health kalian!", why: "Borrowed peer register plus borrowed English, from a speaker with no licence for either." },
      { example: "Kita semua pasti pernah down, kan?", why: "Kita asserted before there is a we, which reads as presumption rather than solidarity." },
      { example: "Halo Sobat Menungsa!", why: "A manufactured in-group name assigns him a membership he never agreed to." }
    ]
  },
  {
    id: "R04",
    category: "Masculinity Framing",
    action: "DO: Use gender cues only when an action is already culturally feminine-coded and publicly observed",
    avoid: "DON'T: Brand neutral actions as 'for real men' or 'pria sejati'",
    rationale: "Where no gender conflict exists, adding gender manufactures an identity threat and triggers reactance.",
    mechanism: "M07 Identity Congruence & M06 Reactance",
    confidence: "STRONG (Meta-analytic & Experimental)",
    boundaryCondition: "Skincare or vulnerability in public view can benefit from masculine identity reassurance.",
    doExamples: [
      { example: "Panduan menjaga kesehatan mental sehari-hari.", why: "Gender-unmarked default, which is where the evidence sits for most content." },
      { example: "Layanan konseling khusus laki-laki dewasa.", why: "Descriptive demographic marking: it says who the service is for without claiming what a man is." },
      { example: "Ruang ini isinya laki-laki semua. Itu aja bedanya.", why: "States the fact and then closes the subject, refusing the invitation to define masculinity." }
    ],
    dontExamples: [
      { example: "Pria sejati nggak takut cerita.", why: "Defines manhood conditionally and then makes the reader buy it back." },
      { example: "Buktikan kamu cukup kuat buat hadapi ini.", why: "A challenge frame, which is the configuration with the clearest documented backfire." },
      { example: "Sebagai laki-laki, kamu harus mau lebih terbuka.", why: "Prescriptive gender injunction: the construction that produced measurable reactance." },
      { example: "Cowok banget nggak sih kalau nangis?", why: "Puts his masculinity on trial in the middle of the sentence that was meant to help." }
    ]
  },
  {
    id: "R05",
    category: "Indonesian Culture",
    action: "DO: Design around household and relational care channels (e.g. supporting wives, friends, peers)",
    avoid: "DON'T: Assume the solo, autonomous, self-advocating individual help-seeker model from Western frameworks",
    rationale: "Indonesian care is relational; households organize care through division of labor; community supplies both care and surveillance.",
    mechanism: "M11 Relational Care & M12 Community Surveillance",
    confidence: "RELATIVELY STRONG (Dissertation CIS)",
    boundaryCondition: "Unmarried or alienated urban youth without family support require alternative peer networks.",
    doExamples: [
      { example: "Kalau kamu istri, ibu, atau teman dekat yang lagi khawatir: ini yang bisa kamu lakukan duluan.", why: "Addresses the person who actually arranges care in the Indonesian household." },
      { example: "Boleh datang berdua. Banyak yang gitu.", why: "Permits the relational route and normalises it in four words." },
      { example: "Kalau kamu nggak sanggup nelpon sendiri, minta orang terdekat yang nelpon.", why: "Accounts for someone unable to act alone, which is the relational finding at its most consequential." },
      { example: "Biaya ditanggung JKN. Kartunya bisa dipakai satu keluarga.", why: "Treats the household as the unit that pays, because it usually is." }
    ],
    dontExamples: [
      { example: "Kesehatan mentalmu tanggung jawabmu sendiri.", why: "Imports the autonomous help-seeker model that the Indonesian evidence does not support." },
      { example: "Cuma kamu yang bisa nolong diri kamu.", why: "Closes off the route that most Indonesian men actually use." },
      { example: "Jangan bergantung sama orang lain, mulai dari diri sendiri.", why: "Reframes ordinary relational care as a personal weakness." },
      { example: "Ambil kendali penuh atas hidupmu.", why: "Assigns full control to someone whose main barriers are institutional and material." }
    ]
  },
  {
    id: "R06",
    category: "Moral Communication",
    action: "DO: Keep moral concentration low and back claims with concrete, costly institutional commitments",
    avoid: "DON'T: Preach, scold, or position the reader/men collectively as culprits",
    rationale: "Moral density above saturation triggers reactance and cynical virtue-discounting (M10, M18).",
    mechanism: "M10 Motive Attribution & M18 Moral Saturation",
    confidence: "MODERATE-STRONG",
    boundaryCondition: "Legitimate institutional advocacy can state clear ethical boundaries without berating the audience.",
    doExamples: [
      { example: "Antrean psikiater di puskesmas rata-rata dua minggu. Kami lagi mendata mana yang lebih cepat, dan datanya kami buka.", why: "Structural subject, plus a commitment that costs something to keep." },
      { example: "Kami nolak iklan suplemen di kanal ini. Artinya kami kehilangan pemasukan.", why: "One moral position, stated once, with its price made visible." },
      { example: "Jam layanan puskesmas selesai jam satu siang. Buat yang kerja shift, itu masalah nyata.", why: "Names the barrier without naming a culprit, which is the distinction this rule protects." },
      { example: "Konten itu salah kami. Sudah kami turunkan, dan ini alasannya.", why: "Moral seriousness aimed at the organisation's own conduct rather than at the audience." }
    ],
    dontExamples: [
      { example: "Laki-laki Indonesia harus berhenti gengsi.", why: "Personal subject and a collective indictment in one sentence." },
      { example: "Sudah saatnya kita semua peduli kesehatan mental!", why: "Moral scolding with no cost attached and kita with no real referent." },
      { example: "Stop normalisasi budaya toxic masculinity sekarang juga!", why: "Maximises moral density, which is the region where persuasion collapses even as sharing rises." },
      { example: "Kalau kamu masih diam, kamu bagian dari masalahnya.", why: "Converts the reader into the culprit, which is the reactance configuration in its purest form." }
    ]
  },
  {
    id: "R07",
    category: "Measurement & Analytics",
    action: "DO: Evaluate programs by actual conversion, help-seeking behavior, and comment valence",
    avoid: "DON'T: Use likes, shares, or viral reach as proxies for trust or persuasion",
    rationale: "Engagement conflates approval with outrage and algorithmic feedback. Outrage spreads fast but depresses real action.",
    mechanism: "M17 Algorithmic Amplification & E03",
    confidence: "STRONG (Meta-analysis & Large Corpora)",
    boundaryCondition: "Top-of-funnel brand awareness can track reach if isolated from conversion goals.",
    doExamples: [
      { example: "Bulan ini: 34 orang buka halaman puskesmas, 9 klik nomor, 4 datang.", why: "Counts the costly acts, in the order they have to happen." },
      { example: "Komentar yang nanya lokasi: 12. Yang isinya marah: 2.", why: "Separates comment valence rather than reporting comments as one number." },
      { example: "Dari lima sesi, rata-rata tujuh orang datang. Dua orang datang lebih dari sekali.", why: "Return attendance is the closest available proxy for the thing the programme is for." }
    ],
    dontExamples: [
      { example: "Jangkauan bulan ini 240.000, naik 300%.", why: "Reach is the metric the outrage findings warn about most directly." },
      { example: "Konten ini viral, artinya pesannya nyampe.", why: "Treats diffusion as evidence of conversion, which the petition data contradicts." },
      { example: "Engagement rate kita tertinggi se-kategori.", why: "Optimises the number that rises fastest when a message is doing the wrong thing." }
    ]
  }
];

// Research Gaps & Recommended Wording Experiments (from Appendix D)
const researchGaps = {
  primaryConstraint: "There is ZERO Indonesian randomised wording experiments on adult men in the entire corpus of 14 documents.",
  tier1: [
    {
      title: "Zero Indonesian Randomized Wording Experiments",
      impact: "Blocks confident copywriting: all wording recommendations remain deductive hypotheses.",
      solution: "Run 2x2 factorial online message tests manipulating pronoun and gender framing."
    },
    {
      title: "Absence of Behavioral Outcomes for Men",
      impact: "Campaigns celebrate literacy/attitude shifts that completely fail to translate into actual help-seeking.",
      solution: "Track verifiable behavioral conversions (clicks to book, attendance, hotline calls)."
    },
    {
      title: "Response-Cost Mechanism is Unoperationalized",
      impact: "Most consistent cross-domain finding (6 of 7 domains) lacks a formal psychometric scale.",
      solution: "Develop and validate a formal Social Exposure & Response Cost inventory for men."
    },
    {
      title: "Severe Geographic and Demographic Sampling Skew",
      impact: "Findings are heavily Javanese, Muslim, urban, and student-skewed.",
      solution: "Targeted research in eastern Indonesia, Sumatra, and working-class informal labor sectors."
    }
  ],
  tier2: [
    {
      title: "Intervention Component Bundling",
      impact: "Cannot tell if setting, imagery, facilitator, or wording caused success in RCTs like FFIT or Man Therapy."
    },
    {
      title: "Lack of Male vs Female Comparative Controls",
      impact: "Persuasion effects working on men are assumed to be male-specific without female testing."
    },
    {
      title: "Accommodation vs Expansion Untested Long-Term",
      impact: "Unresolved tension: does framing help-seeking as 'strength' reinforce the toxic norm that caused stigma?"
    }
  ],
  factorialExperiments: [
    {
      name: "Gender Marking Factorial",
      conditions: ["Jaga kesehatan mentalmu (Neutral)", "Pria perlu menjaga mentalnya (Demographic)", "Pria sejati menjaga mentalnya (Policing)", "Buktikan kamu tangguh (Challenge)"],
      measures: ["Perceived relevance", "Reactance / anger", "Willingness to click"]
    },
    {
      name: "Institutional Pronoun Licensing",
      conditions: ["Kamu (Empathetic Neutral)", "Lo (Vernacular Peer)", "Anda (Formal Distance)"],
      measures: ["Perceived sincerity", "Perceived cringe / pandering", "Trust in organization"]
    },
    {
      name: "Collective Presumption Test",
      conditions: ["Kita harus bangkit (Presumptive inclusive)", "Kami ada untuk mendampingi (Supportive exclusive)"],
      measures: ["Belonging vs resentment", "Boundary respect"]
    },
    {
      name: "Entry Softness vs Directness",
      conditions: ["Boleh cerita kapan saja (Permission)", "Ceritakan masalahmu sekarang (Command)", "Layanan konsultasi tersedia (Descriptive)"],
      measures: ["Immediate bounce rate", "Sign-up initiation"]
    }
  ]
};

fs.writeFileSync(path.join(outDir, 'languageRegisters.json'), JSON.stringify(languageRegisters, null, 2));
fs.writeFileSync(path.join(outDir, 'manosphereAlternatives.json'), JSON.stringify(manosphereAlternatives, null, 2));
fs.writeFileSync(path.join(outDir, 'playbookRules.json'), JSON.stringify(playbookRules, null, 2));
fs.writeFileSync(path.join(outDir, 'researchGaps.json'), JSON.stringify(researchGaps, null, 2));
fs.writeFileSync(path.join(outDir, 'toneContexts.json'), JSON.stringify(toneContexts, null, 2));

console.log('Successfully enriched all datasets in src/data/');
