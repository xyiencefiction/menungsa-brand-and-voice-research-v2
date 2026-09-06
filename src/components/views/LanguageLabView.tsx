import React, { useState } from 'react';
import { languageRegisters } from '../../data';
import { RegisterMap } from '../charts/RegisterMap';
import { SourceCitations } from '../common/SourceCitations';
import { ShieldAlert, Sparkles, Check, X } from 'lucide-react';

/**
 * Relatability is relationally licensed (M09): the same pronoun is warm from a named
 * peer and ridiculous from an anonymous institutional account.
 */
const LICENSED_BY_SPEAKER: Record<'INSTITUTION' | 'PEER' | 'CLINICIAN', string[]> = {
  INSTITUTION: ['saya', 'Anda', 'kamu', 'kami', 'kita', 'pria', 'laki-laki'],
  PEER: ['aku', 'gue', 'kamu', 'lo', 'kita', 'cowok', 'laki-laki', 'bro', 'pria'],
  CLINICIAN: ['saya', 'kamu', 'Anda', 'kami', 'pria', 'laki-laki'],
};

export const LanguageLabView: React.FC = () => {
  const [selectedRegisterId, setSelectedRegisterId] = useState<string>('kamu');
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  // Relatability licensing simulator state
  const [simTab, setSimTab] = useState<'speaker' | 'harmony'>('speaker');
  const [simSpeaker, setSimSpeaker] = useState<'INSTITUTION' | 'PEER' | 'CLINICIAN'>('INSTITUTION');
  const [simSentence, setSimSentence] = useState<string>('gue-lo');

  // Pronoun pair tester state
  const [pairP1, setPairP1] = useState<'kami' | 'saya' | 'gue' | 'aku' | 'kita'>('kami');
  const [pairP2, setPairP2] = useState<'kamu' | 'anda' | 'lo' | 'kalian' | 'bro'>('kamu');

  const selectedRegister = languageRegisters.find(r => r.id === selectedRegisterId) || languageRegisters[0];

  const filteredRegisters = languageRegisters.filter(r => {
    if (activeCategory === 'ALL') return true;
    if (activeCategory === '1st') return r.type.includes('1st');
    if (activeCategory === '2nd') return r.type.includes('2nd');
    if (activeCategory === 'gender') return r.type.includes('gender');
    if (activeCategory === 'vocative') return r.type.includes('vocative');
    return true;
  });

  const HARMONY_DATA: Record<string, {
    verdict: string;
    badgeColor: string;
    example: string;
    appraisal: string;
    mechanism: string;
  }> = {
    'kami-kamu': {
      verdict: 'OPTIMAL INSTITUTIONAL HARMONY (MENUNGSA CORE)',
      badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800',
      example: '“Kamu boleh merasa lelah. Kami di Menungsa siap menemani langkah pertamamu.”',
      appraisal: 'Maintains professional organizational boundaries (kami) while offering warm, dignified individual address (kamu).',
      mechanism: 'Distributes institutional accountability collectively while validating recipient experience empathetically.'
    },
    'kami-anda': {
      verdict: 'FORMAL CORPORATE DISTANCE',
      badgeColor: 'bg-stone-800 text-stone-300 border-stone-700',
      example: '“Kami menghargai privasi data Anda selama menggunakan layanan ini.”',
      appraisal: 'Highly formal and bureaucratic. Suited for legal terms, but too detached for male mental-health outreach.',
      mechanism: 'Creates hierarchical distance; dampens perceived warmth and emotional receptivity.'
    },
    'kami-lo': {
      verdict: 'UNLICENSED CRINGE / AWKWARD MIX',
      badgeColor: 'bg-rose-950 text-rose-300 border-rose-800',
      example: '“Kami paham banget masalah burnout yang lagi lo alamin bro.”',
      appraisal: 'Plural institutional voice (kami) trying to force street slang (lo). Reads like a corporate agency pandering to Gen-Z.',
      mechanism: 'Collision between official institutional persona and street intimacy codes; collapses credibility.'
    },
    'saya-kamu': {
      verdict: 'CLINICAL / MENTOR WARMTH',
      badgeColor: 'bg-teal-950 text-teal-300 border-teal-800',
      example: '“Saya memahami beban yang sedang kamu pikul saat ini.”',
      appraisal: 'Standard format for a clinical psychologist or mentor. Conveys individual expertise with supportive containment.',
      mechanism: 'Balanced clinical authority with safe relational boundaries.'
    },
    'saya-lo': {
      verdict: 'SEVERE REGISTER CLASH',
      badgeColor: 'bg-rose-950 text-rose-300 border-rose-800',
      example: '“Saya mau kasih masukan penting buat lo hari ini.”',
      appraisal: 'Acute register collision. Formal standard \'Saya\' paired with casual street \'Lo\' sounds awkward or sarcastic.',
      mechanism: 'Deictic discordance triggering immediate cognitive friction.'
    },
    'saya-anda': {
      verdict: 'FORMAL ADMINISTRATIVE RESPECT',
      badgeColor: 'bg-blue-950 text-blue-300 border-blue-800',
      example: '“Saya siap membantu Anda menjadwalkan sesi evaluasi klinis.”',
      appraisal: 'Polite and distant. Standard for medical administration or formal consultations.',
      mechanism: 'Preserves professional formality without personal intimacy.'
    },
    'gue-lo': {
      verdict: 'AUTHENTIC PEER HOOK (LICENSED PEERS ONLY)',
      badgeColor: 'bg-amber-950 text-amber-300 border-amber-800',
      example: '“Gue pernah ngerasa hancur banget kayak lo sekarang.”',
      appraisal: 'Highly authentic and warm when spoken by an actual male peer. Fatal backfire if used by an institutional account.',
      mechanism: 'Requires relational licensing (M09); institutional anonymity turns intimacy into pandering.'
    },
    'gue-anda': {
      verdict: 'ABSURD COMIC COLLISION',
      badgeColor: 'bg-rose-950 text-rose-300 border-rose-800',
      example: '“Gue ingin memberikan solusi terbaik untuk Anda.”',
      appraisal: 'Bizarre and comical. Combines raw street slang with the highest formal honorific.',
      mechanism: 'Complete pragmatic violation in Indonesian sociolinguistics.'
    },
    'gue-kamu': {
      verdict: 'URBAN HYBRID / FICTION DIALOGUE',
      badgeColor: 'bg-sky-950 text-sky-300 border-sky-800',
      example: '“Gue yakin kamu sebenarnya bisa melewati ini pelan-pelan.”',
      appraisal: 'Urban youth hybrid typical of contemporary pop novels. Ambiguous for institutional psychoeducation.',
      mechanism: 'Mixes casual intimacy with gentle address; acceptable in personal creative media.'
    },
    'aku-kamu': {
      verdict: 'INTIMATE LITERARY / CONFESSIONAL',
      badgeColor: 'bg-purple-950 text-purple-300 border-purple-800',
      example: '“Aku tahu bagaimana rasanya terbangun di tengah malam dalam sunyi.”',
      appraisal: 'Deeply poetic and intimate. Ideal for reflective essays; too personal for standard institutional communication.',
      mechanism: 'Evokes literary emotional resonance; risks blurring professional boundaries if ungrounded.'
    },
    'kita-kamu': {
      verdict: 'PRESUMPTUOUS TENSION',
      badgeColor: 'bg-amber-950 text-amber-300 border-amber-800',
      example: '“Kita semua harus kuat, tapi kamu sendiri jangan sampai menyerah.”',
      appraisal: 'Reads as patronizing. Speaker generalizes collective hardship (kita) while demanding individual resolve (kamu).',
      mechanism: 'Risk of psychological reactance due to forced universal assumptions.'
    },
    'kita-kalian': {
      verdict: 'COLLECTIVE BROADCAST STANCE',
      badgeColor: 'bg-sky-950 text-sky-300 border-sky-800',
      example: '“Kita bersama ingin agar kalian tidak lagi berjuang sendirian.”',
      appraisal: 'Stage oration or community broadcast character. Suitable for mass campaigns, inappropriate for 1-on-1 support.',
      mechanism: 'Reinforces broad group solidarity.'
    }
  };

  const currentPairKey = `${pairP1}-${pairP2}`;
  const currentPairResult = HARMONY_DATA[currentPairKey] || {
    verdict: 'SOCIOLINGUISTIC MISALIGNMENT',
    badgeColor: 'bg-stone-800 text-stone-300 border-stone-700',
    example: `“${pairP1} ... ${pairP2} ...”`,
    appraisal: 'This pronoun pairing is rarely used together within a consistent discourse domain.',
    mechanism: 'Asymmetrical intimacy or formality mismatch.'
  };

  const SIMULATION_CASES = {
    'gue-lo': {
      sentence: '“Gue mau spill cara ngadepin burnout yang nggak ribet buat lo.”',
      INSTITUTION: {
        verdict: 'CRINGE / CORPORATE IMPERSONATION',
        badgeColor: 'bg-rose-950 text-rose-300 border-rose-800',
        appraisal: '“Why is an official NGO or brand talking like a TikTok teenager? They are trying way too hard to pander to me.”',
        risk: 'Destroys epistemic credibility immediately. Unlicensed intimacy triggers active ridicule.'
      },
      PEER: {
        verdict: 'AUTHENTIC & LICENSED PEER HOOK',
        badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800',
        appraisal: '“This is a guy my age sharing his actual lived struggle. Feels like a real conversation at the coffee shop.”',
        risk: 'High warmth and zero institutional stiffness; completely licensed when coming from a real named human.'
      },
      CLINICIAN: {
        verdict: 'UNPROFESSIONAL & DISORIENTING',
        badgeColor: 'bg-amber-950 text-amber-300 border-amber-800',
        appraisal: '“Is this doctor actually qualified? Why is he using street slang to explain psychological pathology?”',
        risk: 'Subverts expectations of clinical safety and professional competence.'
      }
    },
    'kamu-kami': {
      sentence: '“Kamu boleh merasa lelah. Kami di Menungsa siap menemani langkah pertamamu.”',
      INSTITUTION: {
        verdict: 'OPTIMAL INSTITUTIONAL HARMONY',
        badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800',
        appraisal: '“Respectful, calm, and supportive without pretending to be my buddy. Clear institutional boundary (kami) with empathetic address (kamu).”',
        risk: 'Recommended default house register for Menungsa’s core educational output.'
      },
      PEER: {
        verdict: 'MILDLY FORMAL BUT ACCEPTABLE',
        badgeColor: 'bg-blue-950 text-blue-300 border-blue-800',
        appraisal: '“Sounds a bit like a student mentor or counseling facilitator. Warm, but lacks raw colloquial punch.”',
        risk: 'Safe, though may feel slightly polished compared to natural street conversation.'
      },
      CLINICIAN: {
        verdict: 'IDEAL CLINICAL WARMTH',
        badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800',
        appraisal: '“Compassionate professional stance. Exactly what is expected from an ethical practitioner.”',
        risk: 'Preserves ethical boundaries and patient dignity.'
      }
    },
    'kita-presumptive': {
      sentence: '“Sebagai laki-laki, kita semua pasti malu kalau harus nangis di depan orang.”',
      INSTITUTION: {
        verdict: 'PRESUMPTUOUS / OVER-REACHING',
        badgeColor: 'bg-amber-950 text-amber-300 border-amber-800',
        appraisal: '“Who gave you the right to lump me into your category? Speak for yourself, not for all Indonesian men.”',
        risk: 'Triggers psychological reactance if the recipient does not endorse that specific vulnerability stereotype.'
      },
      PEER: {
        verdict: 'BONDING / SOLIDARITY',
        badgeColor: 'bg-teal-950 text-teal-300 border-teal-800',
        appraisal: '“He understands the shared cultural pressure we both grew up with in our peer circles.”',
        risk: 'Effective when grounded in authentic shared identity; risky if delivered with moral judgment.'
      },
      CLINICIAN: {
        verdict: 'BOUNDARY BLURRING',
        badgeColor: 'bg-stone-800 text-stone-300 border-stone-700',
        appraisal: '“The clinician is projecting personal masculine conflict onto the patient group.”',
        risk: 'Blurs the clinical role of objective containment.'
      }
    }
  };

  const currentSimResult = SIMULATION_CASES[simSentence as keyof typeof SIMULATION_CASES][simSpeaker];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="border-b border-stone-800 pb-5">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 font-mono text-xs border border-emerald-500/20">
            Sociolinguistic Pragmatics & Address System
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
          Indonesian Language & Register Lab
        </h1>
        <p className="text-stone-400 text-xs sm:text-sm mt-1 max-w-3xl">
          Examines pronoun deictics, male reference terms, and vocatives. Pronouns are not ranked from "good" to "bad"—they perform distinct relational work.
        </p>
      </div>

      {/* Cardinal Rule Alert */}
      <div className="p-4 bg-stone-900/60 border border-stone-800 rounded-xl flex items-start gap-3 text-xs text-stone-300">
        <ShieldAlert size={18} className="text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1 leading-relaxed">
          <strong className="font-mono text-stone-200 font-semibold uppercase text-[11px] block">
            The Golden Sociolinguistic Law: Relatability is Relationally Licensed (M09)
          </strong>
          <p>
            There is no universal superiority of <em>lo</em> over <em>kamu</em>, or <em>cowok</em> over <em>pria</em>. Colloquial Jakartan Indonesian is a distinct register system: the exact same colloquial words that signal authentic brotherhood from a real peer become <strong>cringe corporate impersonation</strong> when emitted by an anonymous institutional account.
          </p>
        </div>
      </div>

      {/* Interactive Simulator: Relatability Licensing Simulator */}
      <div className="p-5 bg-stone-900 border border-amber-500/40 rounded-2xl space-y-4 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-amber-400 shrink-0" />
            <h3 className="text-sm font-mono font-bold uppercase text-stone-100 tracking-wider">
              Sociolinguistic Pragmatics Simulator
            </h3>
          </div>
          
          <div className="flex items-center gap-1 self-start sm:self-auto">
            <button
              onClick={() => setSimTab('speaker')}
              className={`px-2.5 py-1 rounded-lg font-mono transition border ${
                simTab === 'speaker'
                  ? 'bg-amber-500 text-stone-950 font-bold border-amber-400'
                  : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-stone-200'
              }`}
              style={{ fontSize: 'var(--t-micro)' }}
            >
              1. Speaker Licensing
            </button>
            <button
              onClick={() => setSimTab('harmony')}
              className={`px-2.5 py-1 rounded-lg font-mono transition border ${
                simTab === 'harmony'
                  ? 'bg-amber-500 text-stone-950 font-bold border-amber-400'
                  : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-stone-200'
              }`}
              style={{ fontSize: 'var(--t-micro)' }}
            >
              2. Pronoun Harmony
            </button>
          </div>
        </div>

        {simTab === 'speaker' ? (
          /* Simulator controls */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Select Sentence */}
            <div className="space-y-1.5">
              <label className="font-mono text-[10px] text-stone-400 uppercase block">1. Select Sample Copy:</label>
              <div className="space-y-1.5">
                <button
                  onClick={() => setSimSentence('gue-lo')}
                  className={`w-full p-2 rounded-lg text-left font-sans transition ${
                    simSentence === 'gue-lo' ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40' : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
                  }`}
                >
                  <strong>A. Street Vernacular (Gue/Lo):</strong> "Gue mau spill cara ngadepin burnout yang nggak ribet buat lo..."
                </button>
                <button
                  onClick={() => setSimSentence('kamu-kami')}
                  className={`w-full p-2 rounded-lg text-left font-sans transition ${
                    simSentence === 'kamu-kami' ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40' : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
                  }`}
                >
                  <strong>B. Calibrated Institutional (Kamu/Kami):</strong> "Kamu boleh merasa lelah. Kami di Menungsa siap menemani..."
                </button>
                <button
                  onClick={() => setSimSentence('kita-presumptive')}
                  className={`w-full p-2 rounded-lg text-left font-sans transition ${
                    simSentence === 'kita-presumptive' ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40' : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
                  }`}
                >
                  <strong>C. Presumptive Inclusive (Kita):</strong> "Sebagai laki-laki, kita semua pasti malu kalau harus nangis..."
                </button>
              </div>
            </div>

            {/* Select Speaker */}
            <div className="space-y-1.5">
              <label className="font-mono text-[10px] text-stone-400 uppercase block">2. Select Speaker Persona:</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'INSTITUTION', label: 'Official Org Account' },
                  { id: 'PEER', label: 'Named Peer Creator' },
                  { id: 'CLINICIAN', label: 'Clinical Expert' },
                ].map((sp) => (
                  <button
                    key={sp.id}
                    onClick={() => setSimSpeaker(sp.id as any)}
                    className={`p-2.5 rounded-lg font-mono text-center text-xs transition border ${
                      simSpeaker === sp.id
                        ? 'bg-amber-500 text-stone-950 font-bold border-amber-400'
                        : 'bg-stone-950 text-stone-400 hover:text-stone-200 border-stone-800'
                    }`}
                  >
                    {sp.label}
                  </button>
                ))}
              </div>

              {/* Audience Reaction Display */}
              <div className="p-3.5 bg-stone-950 rounded-xl border border-stone-800 mt-2 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-stone-400 uppercase">Audience Appraisal Result:</span>
                  <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold border ${currentSimResult.badgeColor}`}>
                    {currentSimResult.verdict}
                  </span>
                </div>
                <p className="text-stone-200 italic font-serif text-sm">
                  {currentSimResult.appraisal}
                </p>
                <p className="text-[11px] text-stone-400 leading-relaxed pt-1 border-t border-stone-800/80">
                  <strong>Mechanism:</strong> {currentSimResult.risk}
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Pronoun Harmony Calculator */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="font-mono text-[10px] text-stone-400 uppercase block">1. Select 1st-Person Deictic (Self / Speaker):</label>
                <div className="grid grid-cols-5 gap-1.5">
                  {(['kami', 'saya', 'gue', 'aku', 'kita'] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPairP1(p)}
                      className={`py-1.5 px-2 rounded-lg font-mono text-center text-xs transition border ${
                        pairP1 === p
                          ? 'bg-amber-500 text-stone-950 font-bold border-amber-400'
                          : 'bg-stone-950 text-stone-400 hover:text-stone-200 border-stone-800'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[10px] text-stone-400 uppercase block">2. Select 2nd-Person Deictic (Addressee / Reader):</label>
                <div className="grid grid-cols-5 gap-1.5">
                  {(['kamu', 'anda', 'lo', 'kalian', 'bro'] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPairP2(p)}
                      className={`py-1.5 px-2 rounded-lg font-mono text-center text-xs transition border ${
                        pairP2 === p
                          ? 'bg-amber-500 text-stone-950 font-bold border-amber-400'
                          : 'bg-stone-950 text-stone-400 hover:text-stone-200 border-stone-800'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-stone-950 rounded-lg border border-stone-800 flex items-center justify-between">
                <span className="font-mono text-stone-400 uppercase text-[10px]">Active Pair:</span>
                <span className="font-mono text-amber-300 font-bold text-sm">
                  {pairP1} × {pairP2}
                </span>
                <button
                  onClick={() => setSelectedRegisterId(pairP1)}
                  className="text-stone-400 hover:text-stone-200 font-mono text-[10px] underline"
                >
                  Locate {pairP1} on map
                </button>
              </div>
            </div>

            {/* Pair Evaluation Card */}
            <div className="p-3.5 bg-stone-950 rounded-xl border border-stone-800 space-y-2 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-stone-400 uppercase">Register Harmony Evaluation:</span>
                  <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold border ${currentPairResult.badgeColor}`}>
                    {currentPairResult.verdict}
                  </span>
                </div>
                <p className="text-stone-200 italic font-serif text-sm">
                  {currentPairResult.example}
                </p>
                <p className="text-stone-300 text-xs leading-relaxed pt-1 border-t border-stone-800/80">
                  {currentPairResult.appraisal}
                </p>
              </div>
              <p className="text-[11px] text-stone-400 leading-relaxed pt-2 border-t border-stone-800/60">
                <strong>Sociolinguistic Mechanism:</strong> {currentPairResult.mechanism}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Registers Navigation & Filter */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-950 p-3 rounded-xl border border-stone-800 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-stone-400 uppercase text-[10px] mr-1">Category:</span>
          {['ALL', '1st', '2nd', 'gender', 'vocative'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-2.5 py-1 rounded font-mono text-[11px] transition ${
                activeCategory === cat ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-stone-900 text-stone-400'
              }`}
            >
              {cat === '1st' ? '1st Person' : cat === '2nd' ? '2nd Person' : cat === 'gender' ? 'Male Terms' : cat === 'vocative' ? 'Vocatives' : 'All Terms'}
            </button>
          ))}
        </div>
        <span className="text-[11px] font-mono text-stone-400">
          Click any term to inspect authority, intimacy, and contexts
        </span>
      </div>

      {/* Position map: the two levels every register already carried, finally as position. */}
      <RegisterMap
        registers={filteredRegisters}
        selectedId={selectedRegisterId}
        onSelect={setSelectedRegisterId}
        licensedIds={LICENSED_BY_SPEAKER[simSpeaker]}
      />

      <div className="flex items-center gap-2 flex-wrap">
        <span className="font-mono text-stone-500 uppercase tracking-wider" style={{ fontSize: 'var(--t-micro)' }}>
          Dim by speaker licence
        </span>
        {(['INSTITUTION', 'PEER', 'CLINICIAN'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setSimSpeaker(s)}
            className={`px-2.5 py-1 rounded font-mono transition ${
              simSpeaker === s ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-stone-900 text-stone-400 hover:text-stone-200'
            }`}
            style={{ fontSize: 'var(--t-micro)' }}
          >
            {s.toLowerCase()}
          </button>
        ))}
        <span className="text-stone-500" style={{ fontSize: 'var(--t-micro)' }}>
          Faded terms are ones this speaker has not earned the right to use.
        </span>
      </div>

      {/* Deep Term Inspector */}
      {selectedRegister && (
        <div className="p-6 bg-stone-900 border border-stone-700 rounded-2xl space-y-5">
          <div className="flex items-center justify-between border-b border-stone-800 pb-4">
            <div>
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block">
                Register Analysis
              </span>
              <h2 className="text-xl font-serif font-bold text-stone-100">{selectedRegister.label}</h2>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="text-right">
                <span className="text-stone-400 text-[10px] block">Authority Level:</span>
                <span className="text-amber-300 font-bold">{selectedRegister.authorityLevel} / 5</span>
              </div>
              <div className="text-right">
                <span className="text-stone-400 text-[10px] block">Intimacy Level:</span>
                <span className="text-sky-300 font-bold">{selectedRegister.intimacyLevel} / 5</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 bg-stone-950 rounded-xl border border-stone-800 space-y-1">
              <span className="font-mono text-stone-400 uppercase text-[10px] block">Implied Social Relationship</span>
              <p className="text-stone-200 leading-relaxed font-sans">{selectedRegister.socialRelationship}</p>
            </div>

            <div className="p-3.5 bg-stone-950 rounded-xl border border-stone-800 space-y-1">
              <span className="font-mono text-stone-400 uppercase text-[10px] block">Regional & Class Coding</span>
              <p className="text-stone-200 leading-relaxed font-sans">{selectedRegister.regionalClassCoding}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Appropriate */}
            <div className="p-3.5 bg-emerald-950/20 border border-emerald-800/40 rounded-xl space-y-2">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <Check size={14} />
                <span className="font-mono uppercase font-bold text-[10px]">Appropriate Contexts:</span>
              </div>
              <ul className="list-disc list-inside text-stone-200 space-y-1">
                {selectedRegister.appropriateContexts.map((ctx, idx) => (
                  <li key={idx}>{ctx}</li>
                ))}
              </ul>
            </div>

            {/* Inappropriate */}
            <div className="p-3.5 bg-rose-950/20 border border-rose-800/40 rounded-xl space-y-2">
              <div className="flex items-center gap-1.5 text-rose-400">
                <X size={14} />
                <span className="font-mono uppercase font-bold text-[10px]">Inappropriate Contexts:</span>
              </div>
              <ul className="list-disc list-inside text-stone-200 space-y-1">
                {selectedRegister.inappropriateContexts.map((ctx, idx) => (
                  <li key={idx}>{ctx}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Authenticity Risks & Evidence */}
          <div className="p-4 bg-amber-950/20 border border-amber-900/30 rounded-xl space-y-1.5 text-xs text-amber-200">
            <strong className="font-mono text-amber-300 block text-[10px] uppercase">
              Authenticity & Cringe Risk:
            </strong>
            <p className="leading-relaxed">{selectedRegister.authenticityRisks}</p>
            <p className="text-stone-400 font-mono text-[10px] pt-1">
              <strong>Evidence Basis:</strong>{' '}
              <SourceCitations text={selectedRegister.evidenceBasis} />
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
