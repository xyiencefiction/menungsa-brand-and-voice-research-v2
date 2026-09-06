import React, { useState } from 'react';
import { Term } from '../common/Term';
import { Compass, CheckCircle2, XCircle, AlertTriangle, HelpCircle, ArrowRight, ShieldAlert } from 'lucide-react';
import { FramingMatrix } from '../charts/FramingMatrix';

export const FramingView: React.FC = () => {
  const [selectedAction, setSelectedAction] = useState<'skincare' | 'therapy' | 'fitness' | 'parenting'>('therapy');
  const [isPublic, setIsPublic] = useState<boolean>(true);

  const FRAMING_MODES = [
    {
      mode: "1. Gender-Neutral",
      example: "“Panduan menjaga kesehatan mental dan meredakan kecemasan.”",
      mechanism: "Perceptual neutrality; zero identity friction.",
      outcome: "High baseline receptivity. No identity threat or gender policing created."
    },
    {
      mode: "2. Demographic / Descriptive",
      example: "“Layanan konseling khusus pria dewasa.”",
      mechanism: "Cognitive categorization; indicates relevance without imposing norms.",
      outcome: "Increases relevance in feminine-coded areas. Neutral in already-masculine domains."
    },
    {
      mode: "3. Identity-Affirming",
      example: "“Ambil kendali atas kesehatanmu. Tindakan strategis seorang pria.”",
      mechanism: "Self-efficacy affirmation; reframes care as responsibility.",
      outcome: "Helps traditional men; modest friction if delivered without preachiness."
    },
    {
      mode: "4. Prescriptive Injunction",
      example: "“Sebagai laki-laki, kamu harus mau terbuka dan bercerita.”",
      mechanism: "Freedom-threat appraisal; activation of persuasion knowledge.",
      outcome: "Triggers psychological reactance (r = .20). Perceived as patronizing or scolding."
    },
    {
      mode: "5. Policing / Conditional",
      example: "“Pria sejati tidak takut mengakui luka.” / “Are you man enough?”",
      mechanism: "Precarious manhood threat; self-categorization defense.",
      outcome: "Acute backlash, defensive counterarguing, or compensatory avoidance."
    }
  ];

  const ACTION_PROFILES = {
    therapy: {
      name: "Seeking Psychological Therapy / Counseling",
      culturalCoding: "Culturally coded as feminine / vulnerable",
      privateImpact: "In private, gender-neutral and male-sensitive brochures perform equally well. Explicit 'Real Men' labels add zero value (Real Men trial).",
      publicImpact: "In public, men experience acute identity threat. Male-coded framing or discrete 'side-by-side' activities act as necessary identity shields to prevent social misclassification.",
      recommendation: isPublic 
        ? "Use identity-protective framing or emphasize private discretion." 
        : "Gender-neutral or gentle descriptive framing is best. Do not police masculinity."
    },
    skincare: {
      name: "Purchasing Face Serum / Grooming Product",
      culturalCoding: "Historically feminine-coded",
      privateImpact: "Men buy based on practical utility ('nggak ribet'). Masculinity cues provide little incremental lift in private e-commerce.",
      publicImpact: "In public retail, masculine packaging ('FOR MEN', matte black, mechanical fonts) provides reputational cover against ridicule.",
      recommendation: isPublic 
        ? "Descriptive 'Men' label provides psychological cover." 
        : "Highlight practical, non-greasy efficiency."
    },
    fitness: {
      name: "Strength Training / Gym Membership",
      culturalCoding: "Already culturally masculine-coded",
      privateImpact: "Gender cues are entirely redundant.",
      publicImpact: "Adding 'Alpha Male' or hyper-masculine labeling yields zero incremental benefit and is ridiculed as 'cringe' by mature cohorts.",
      recommendation: "Completely unnecessary to gender. Let the activity speak for itself."
    },
    parenting: {
      name: "Active Fatherhood & Child Caregiving",
      culturalCoding: "Mixed (traditionally maternal, expanding to paternal)",
      privateImpact: "Men embrace caregiving without needing gender labels.",
      publicImpact: "Calling ordinary fatherhood 'healthy masculinity' often alienates men who wonder: 'Why is loving my child being turned into a gender test?'",
      recommendation: "Frame around responsibility, presence, and craft—not masculinity revision."
    }
  };

  const currentProfile = ACTION_PROFILES[selectedAction];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="border-b border-stone-800 pb-5">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-mono text-xs border border-amber-500/20">
            Domain D5 Synthesis & Boundary Experiments
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
          Masculinity Framing & Labeling Analysis
        </h1>
        <p className="text-stone-400 text-xs sm:text-sm mt-1 max-w-3xl">
          Examines when explicit gender labeling helps, does nothing, or actively backfires. Resolves the tension between relevance signaling and identity threat.
        </p>
      </div>

      {/* The Crucial Counterfactual Question Alert */}
      <div className="p-4 bg-stone-900/80 border border-stone-800 rounded-xl flex items-start gap-3 text-xs text-stone-300">
        <HelpCircle size={18} className="text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1 leading-relaxed">
          <strong className="font-mono text-amber-300 uppercase text-[11px] block">
            The comparison question this section exists to answer:
          </strong>
          <p>
            <em className="text-stone-100">“Would this communication still work if masculinity were not mentioned?”</em> In the only <Term id="G08">randomised experiment</Term> located, a "Real Men" depression brochure performed <strong>no better than an identical gender-neutral brochure</strong>. Masculine labels resolve an identity conflict only where one already exists; otherwise, they manufacture friction.
          </p>
        </div>
      </div>

      {/* 5 Framing Modes Grid */}
      <div className="space-y-3">
        <h3 className="text-xs font-mono uppercase font-bold text-stone-300 tracking-wider">
          The 5 Modes of Masculinity Framing
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2.5">
          {FRAMING_MODES.map((mode, idx) => (
            <div key={idx} className="p-3.5 bg-stone-900/70 border border-stone-800 rounded-xl space-y-2 text-xs flex flex-col justify-between">
              <div className="space-y-1.5">
                <span className="font-mono text-[11px] font-bold text-amber-300 block">{mode.mode}</span>
                <p className="text-stone-300 italic font-serif text-[11px] leading-snug">{mode.example}</p>
              </div>
              <div className="pt-2 border-t border-stone-800/80 space-y-1">
                <span className="font-mono text-[9px] uppercase text-stone-400 block">Psychological Effect:</span>
                <p className="text-stone-400 text-[10px] leading-tight">{mode.outcome}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive 2x2 Matrix Simulator */}
      <FramingMatrix
        selectedAction={selectedAction}
        isPublic={isPublic}
        onSelectAction={setSelectedAction}
        onToggleVisibility={setIsPublic}
      />

      <div className="p-6 bg-stone-900 border border-stone-700 rounded-2xl space-y-5 shadow-xl">
        <div className="flex items-center justify-between border-b border-stone-800 pb-3">
          <div>
            <h3 className="text-base font-serif font-bold text-stone-100">
              Boundary Condition Assessment
            </h3>
            <p className="text-xs text-stone-400">
              Prior Cultural Coding of Behavior × Public Visibility
            </p>
          </div>
          <span className="text-xs font-mono text-amber-400">Brough et al. & White & Dahl</span>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* Select Behavior */}
          <div className="space-y-1.5">
            <label className="font-mono text-[10px] text-stone-400 uppercase block">1. Select Target Behavior:</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'therapy', label: 'Psychological Therapy' },
                { id: 'skincare', label: 'Skincare / Grooming' },
                { id: 'fitness', label: 'Gym / Fitness' },
                { id: 'parenting', label: 'Child Caregiving' },
              ].map((act) => (
                <button
                  key={act.id}
                  onClick={() => setSelectedAction(act.id as any)}
                  className={`p-2 rounded-lg font-mono text-xs text-center transition border ${
                    selectedAction === act.id
                      ? 'bg-amber-500 text-stone-950 font-bold border-amber-400'
                      : 'bg-stone-950 text-stone-400 hover:text-stone-200 border-stone-800'
                  }`}
                >
                  {act.label}
                </button>
              ))}
            </div>
          </div>

          {/* Toggle Visibility */}
          <div className="space-y-1.5">
            <label className="font-mono text-[10px] text-stone-400 uppercase block">2. Social Visibility Setting:</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setIsPublic(false)}
                className={`p-2 rounded-lg font-mono text-xs text-center transition border ${
                  !isPublic
                    ? 'bg-sky-500 text-stone-950 font-bold border-sky-400'
                    : 'bg-stone-950 text-stone-400 hover:text-stone-200 border-stone-800'
                }`}
              >
                Private (Low Exposure)
              </button>
              <button
                onClick={() => setIsPublic(true)}
                className={`p-2 rounded-lg font-mono text-xs text-center transition border ${
                  isPublic
                    ? 'bg-rose-500 text-stone-950 font-bold border-rose-400'
                    : 'bg-stone-950 text-stone-400 hover:text-stone-200 border-stone-800'
                }`}
              >
                Public (High Social Gaze)
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Calculation Result */}
        <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-mono text-stone-400 uppercase text-[10px]">Baseline Cultural Status:</span>
            <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-stone-800 text-stone-300">
              {currentProfile.culturalCoding}
            </span>
          </div>

          <div className="space-y-1">
            <span className="font-mono text-amber-400 uppercase text-[10px] block">Appraisal Under Current Conditions:</span>
            <p className="text-stone-200 leading-relaxed font-sans">
              {isPublic ? currentProfile.publicImpact : currentProfile.privateImpact}
            </p>
          </div>

          <div className="p-3 bg-emerald-950/20 border border-emerald-800/40 rounded-lg flex items-center justify-between text-emerald-200">
            <span><strong>Strategic Guidance:</strong> {currentProfile.recommendation}</span>
            <CheckCircle2 size={16} className="text-emerald-400 shrink-0 ml-2" />
          </div>
        </div>
      </div>
    </div>
  );
};
