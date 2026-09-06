import React, { useState } from 'react';
import { languageRegisters, manosphereAlternatives } from '../../data';
import { 
  BookOpen, 
  Users, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

export const WordGuideView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pronouns' | 'gender' | 'alternatives'>('pronouns');
  const [selectedRegisterId, setSelectedRegisterId] = useState<string>('kamu');

  // Quick Decision Assistant state
  const [speakerType, setSpeakerType] = useState<'institution' | 'person'>('institution');
  const [privacyType, setPrivacyType] = useState<'public' | 'private'>('public');

  const getRecommendedPronoun = () => {
    if (speakerType === 'institution') {
      return privacyType === 'public'
        ? {
            pronoun: 'kamu',
            firstPerson: 'kami',
            note: 'Standar bawaan organisasi: langsung, hangat, tanpa berpura-pura menjadi teman khayalan.',
          }
        : {
            pronoun: 'kamu / Anda',
            firstPerson: 'kami',
            note: 'Gunakan kamu untuk pendampingan suportif, atau Anda jika konteksnya layanan medis formal.',
          };
    } else {
      return privacyType === 'public'
        ? {
            pronoun: 'kamu / Anda',
            firstPerson: 'saya',
            note: 'Jika penulis bernama nyata menulis esai publik, gunakan saya dan sapa audiens dengan kamu.',
          }
        : {
            pronoun: 'lo',
            firstPerson: 'gue',
            note: 'Gue/lo sah HANYA jika dua individu bernama nyata berbicara dalam percakapan setara di ranah privat.',
          };
    }
  };

  const recommendation = getRecommendedPronoun();
  const activeRegister = languageRegisters.find((r) => r.id === selectedRegisterId) ?? languageRegisters[0];

  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div className="border-b border-stone-800 pb-6 space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-mono font-medium text-amber-300">
          <BookOpen size={13} />
          <span>KAMUS RAGAM & PILIHAN KATA</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-serif tracking-tight text-stone-100">
          Panduan Pilihan Kata, Sapaan & Kata Ganti
        </h1>
        <p className="text-xs md:text-sm text-stone-400 max-w-3xl leading-relaxed">
          Pilihan kata ganti dan sapaan pria menentukan apakah pembaca merasa dihormati atau merasa digurui. Gunakan panduan praktis ini untuk memilih ragam bahasa yang tepat bagi naskah Anda.
        </p>

        {/* Tab Switcher */}
        <div className="flex flex-wrap gap-2 pt-2">
          <button
            onClick={() => setActiveTab('pronouns')}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'pronouns'
                ? 'bg-stone-200 text-stone-950 font-semibold'
                : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200'
            }`}
          >
            <Users size={14} />
            <span>1. Kata Ganti (Kamu, Anda, Kita, Gue)</span>
          </button>
          <button
            onClick={() => setActiveTab('gender')}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'gender'
                ? 'bg-stone-200 text-stone-950 font-semibold'
                : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200'
            }`}
          >
            <ShieldCheck size={14} />
            <span>2. Sapaan Pria & Maskulinitas</span>
          </button>
          <button
            onClick={() => setActiveTab('alternatives')}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'alternatives'
                ? 'bg-stone-200 text-stone-950 font-semibold'
                : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200'
            }`}
          >
            <Sparkles size={14} />
            <span>3. Padanan Etis (Anti-Bumerang)</span>
          </button>
        </div>
      </div>

      {/* TAB 1: PRONOUNS */}
      {activeTab === 'pronouns' && (
        <div className="space-y-8">
          {/* Quick Decision Tool */}
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-5 md:p-6 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-semibold uppercase">
              <Sparkles size={15} />
              <span>Asisten Pemilihan Kata Ganti Cepat</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-stone-300 font-medium block mb-1.5">Siapa yang berbicara di naskah ini?</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSpeakerType('institution')}
                    className={`p-2.5 rounded-lg border text-left cursor-pointer transition ${
                      speakerType === 'institution'
                        ? 'border-amber-500 bg-amber-500/20 text-stone-100 font-medium'
                        : 'border-stone-800 bg-stone-900 text-stone-400'
                    }`}
                  >
                    🏢 Organisasi / Tim Menungsa
                  </button>
                  <button
                    onClick={() => setSpeakerType('person')}
                    className={`p-2.5 rounded-lg border text-left cursor-pointer transition ${
                      speakerType === 'person'
                        ? 'border-amber-500 bg-amber-500/20 text-stone-100 font-medium'
                        : 'border-stone-800 bg-stone-900 text-stone-400'
                    }`}
                  >
                    ✍️ Individu Bernama Nyata
                  </button>
                </div>
              </div>

              <div>
                <label className="text-stone-300 font-medium block mb-1.5">Di mana saluran naskah ini diterbitkan?</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setPrivacyType('public')}
                    className={`p-2.5 rounded-lg border text-left cursor-pointer transition ${
                      privacyType === 'public'
                        ? 'border-amber-500 bg-amber-500/20 text-stone-100 font-medium'
                        : 'border-stone-800 bg-stone-900 text-stone-400'
                    }`}
                  >
                    📢 Terbuka (Medsos, Feed, Web)
                  </button>
                  <button
                    onClick={() => setPrivacyType('private')}
                    className={`p-2.5 rounded-lg border text-left cursor-pointer transition ${
                      privacyType === 'private'
                        ? 'border-amber-500 bg-amber-500/20 text-stone-100 font-medium'
                        : 'border-stone-800 bg-stone-900 text-stone-400'
                    }`}
                  >
                    🔒 Tertutup (WA, DM, Konseling)
                  </button>
                </div>
              </div>
            </div>

            {/* Recommendation Result */}
            <div className="rounded-lg bg-stone-900 border border-stone-800 p-4 text-xs space-y-1">
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block font-semibold">
                Rekomendasi Kata Ganti:
              </span>
              <div className="flex flex-wrap items-center gap-3 text-stone-100 font-medium text-sm">
                <span>Orang Pertama: <strong className="text-amber-300">{recommendation.firstPerson}</strong></span>
                <span>·</span>
                <span>Orang Kedua: <strong className="text-amber-300">{recommendation.pronoun}</strong></span>
              </div>
              <p className="text-stone-400 pt-1 leading-normal">{recommendation.note}</p>
            </div>
          </div>

          {/* Pronoun Details Cards */}
          <div className="space-y-4">
            <h3 className="text-sm font-mono text-stone-400 uppercase tracking-wider">
              Katalog Lengkap Kata Ganti Bahasa Indonesia:
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {languageRegisters.map((reg) => (
                <button
                  key={reg.id}
                  onClick={() => setSelectedRegisterId(reg.id)}
                  className={`p-3 rounded-xl border text-center transition cursor-pointer ${
                    selectedRegisterId === reg.id
                      ? 'border-amber-500 bg-amber-500/20 text-stone-100 font-semibold ring-1 ring-amber-500/40'
                      : 'border-stone-800 bg-stone-900/50 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                  }`}
                >
                  <div className="font-serif text-lg text-stone-100">{reg.id}</div>
                  <div className="text-[10px] font-mono text-stone-400 mt-0.5">
                    Otoritas {reg.authorityLevel} · Intim {reg.intimacyLevel}
                  </div>
                </button>
              ))}
            </div>

            {/* Active Register Deep Dive */}
            {activeRegister && (
              <div className="rounded-xl border border-stone-800 bg-stone-900/40 p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                  <div>
                    <span className="text-xs font-mono text-amber-400 uppercase">Kata Ganti:</span>
                    <h4 className="text-2xl font-serif text-stone-100">{activeRegister.id}</h4>
                  </div>
                  <div className="text-right text-xs font-mono text-stone-400">
                    <div>Tingkat Otoritas: {activeRegister.authorityLevel}/5</div>
                    <div>Tingkat Keintiman: {activeRegister.intimacyLevel}/5</div>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-stone-300 leading-relaxed">
                  <div><strong className="text-stone-200">Hubungan Sosial:</strong> {activeRegister.socialRelationship}</div>
                  <div><strong className="text-stone-200">Label / Kesan:</strong> <span className="font-serif italic text-amber-200">"{activeRegister.label}"</span></div>
                  <div><strong className="text-stone-200">Risiko Keaslian (Bumerang):</strong> {activeRegister.authenticityRisks}</div>
                  <div><strong className="text-stone-200">Konteks Tepat:</strong> {activeRegister.appropriateContexts.join(', ')}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: GENDER ADDRESS */}
      {activeTab === 'gender' && (
        <div className="space-y-6">
          <div className="rounded-xl border border-stone-800 bg-stone-900/40 p-6 space-y-4">
            <h3 className="text-lg font-serif text-stone-100">Kapan Menggunakan "Pria", "Laki-laki", atau Tanpa Label?</h3>
            <p className="text-xs md:text-sm text-stone-300 leading-relaxed">
              Penelitian membuktikan bahwa pria sering merasa jenuh atau defensif ketika sebuah pesan terus-menerus mendikte identitas mereka dengan embel-embel maskulinitas.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="rounded-lg border border-emerald-500/20 bg-emerald-950/20 p-4 space-y-2 text-xs">
                <div className="text-emerald-400 font-mono font-semibold uppercase flex items-center gap-1.5">
                  <CheckCircle2 size={14} />
                  <span>Langsung ke Tindakan (Paling Aman)</span>
                </div>
                <p className="text-stone-300 leading-relaxed">
                  Tidak perlu menyebut kata "pria" sama sekali jika pesannya tentang rutinitas umum.
                </p>
                <div className="font-serif italic text-emerald-300 pt-1 border-t border-emerald-900/40">
                  "Menghadapi tumpukan pekerjaan setelah akhir pekan memang menguras energi."
                </div>
              </div>

              <div className="rounded-lg border border-amber-500/20 bg-amber-950/20 p-4 space-y-2 text-xs">
                <div className="text-amber-400 font-mono font-semibold uppercase flex items-center gap-1.5">
                  <CheckCircle2 size={14} />
                  <span>Sapaan "Pria" Terkalibrasi</span>
                </div>
                <p className="text-stone-300 leading-relaxed">
                  Gunakan ketika konteksnya spesifik berhubungan dengan biologi pria atau peran sosial kebapakan.
                </p>
                <div className="font-serif italic text-amber-300 pt-1 border-t border-amber-900/40">
                  "Pria di atas 30 tahun sering mengalami penurunan ritme tidur alami."
                </div>
              </div>

              <div className="rounded-lg border border-rose-500/20 bg-rose-950/20 p-4 space-y-2 text-xs">
                <div className="text-rose-400 font-mono font-semibold uppercase flex items-center gap-1.5">
                  <AlertCircle size={14} />
                  <span>Label "Pria Sejati" (DILARANG)</span>
                </div>
                <p className="text-stone-300 leading-relaxed">
                  Label 'Real Men' atau 'Pria Tangguh' langsung dicap sebagai hal yang canggung (*cringe*) dan manipulatif.
                </p>
                <div className="font-serif italic text-rose-300 pt-1 border-t border-rose-900/40">
                  "✕ Pria sejati adalah pria yang berani menangis dan meminta tolong."
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ETHICAL ALTERNATIVES */}
      {activeTab === 'alternatives' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-serif text-stone-100">
              Kamus Padanan Etis: Mengubah Klise Bumerang Menjadi Bahasa yang Memberdayakan
            </h3>
            <p className="text-xs text-stone-400 mt-1">
              Banyak istilah maskulinitas populer sebenarnya berakar dari kebutuhan psikologis yang nyata (seperti ingin merasa berdaya, dihormati, atau memiliki arah hidup). Menungsa memenuhi kebutuhan tersebut tanpa racun kebencian atau moralitas palsu.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {manosphereAlternatives.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-stone-800 bg-stone-900/40 p-5 space-y-4 hover:border-stone-700 transition"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-semibold text-amber-400">
                      Fungsi Psikologis:
                    </span>
                    <span className="text-sm font-serif font-medium text-stone-100">
                      {item.functionName}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-stone-500">
                    {item.mechanismId}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Harmful / Cringe */}
                  <div className="rounded-lg border border-rose-500/20 bg-rose-950/15 p-3.5 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-rose-400 font-mono font-semibold uppercase text-[11px]">
                      <AlertCircle size={13} />
                      <span>Cara Bumerang / Agresif</span>
                    </div>
                    <p className="text-stone-300 leading-relaxed">
                      {item.harmfulImplementation}
                    </p>
                  </div>

                  {/* Ethical / Menungsa */}
                  <div className="rounded-lg border border-emerald-500/20 bg-emerald-950/15 p-3.5 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-mono font-semibold uppercase text-[11px]">
                      <CheckCircle2 size={13} />
                      <span>Padanan Etis Suara Menungsa</span>
                    </div>
                    <p className="text-stone-200 leading-relaxed font-medium">
                      {item.ethicalAlternative}
                    </p>
                  </div>
                </div>

                <div className="rounded-lg bg-stone-950/60 p-3 border border-stone-800/80 text-xs text-stone-400 flex items-center gap-2">
                  <strong className="text-amber-400 font-mono text-[11px] uppercase shrink-0">Prinsip Emas:</strong>
                  <span className="text-stone-300 italic">{item.keyPrinciple}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
