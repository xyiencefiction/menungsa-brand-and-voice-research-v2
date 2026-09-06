import React, { useState, useMemo } from 'react';
import { ShieldAlert, Sliders, Sparkles } from 'lucide-react';
import { MoralDensityCurve } from '../charts/MoralDensityCurve';
import { EntityRail } from '../common/EntityRail';
import type { ViewType } from '../../types';

interface Props {
  onNavigate: (view: ViewType, param?: string) => void;
}

const MORAL_KEYWORDS = [
  'wajib', 'harus', 'kewajiban', 'dosa', 'moral', 'aib', 'malu', 'norma', 'kodrat', 'pria sejati',
  'pantas', 'bertobat', 'tulus', 'integritas', 'salah', 'benar', 'etika', 'hak', 'keadilan', 'pengecut',
  'duty', 'virtue', 'sin', 'shame', 'blame', 'justice', 'rights', 'evil', 'ought', 'must',
  'integrity', 'coward', 'ethical', 'obligation', 'guilt', 'scold', 'righteous'
];

const SANDBOX_PRESETS = [
  {
    id: 'scolding',
    label: 'Preachy / Moralizing',
    text: 'As a real man, you must realize that hiding emotional pain is a moral sin and disgrace. Do not be a coward, shoulder your ethical duty now.'
  },
  {
    id: 'calibrated',
    label: 'Calibrated Menungsa',
    text: 'The first step does not have to be huge. Talk through your weekly workload with a trusted colleague or friend at your own pace.'
  },
  {
    id: 'factual',
    label: 'Purely Informational',
    text: 'Counseling consultation sessions are available Monday through Friday from 9 AM to 5 PM at your nearest community health clinic.'
  }
];

export const MoralCommsView: React.FC<Props> = ({ onNavigate }) => {
  const [simMode, setSimMode] = useState<'sliders' | 'sandbox'>('sliders');
  const [moralWordsCount, setMoralWordsCount] = useState<number>(4);
  const [totalWordsCount, setTotalWordsCount] = useState<number>(24);
  const [sandboxText, setSandboxText] = useState<string>(SANDBOX_PRESETS[0].text);

  // Analysis in sandbox mode
  const sandboxAnalysis = useMemo(() => {
    const rawTokens = sandboxText.trim().split(/\s+/).filter(Boolean);
    const total = rawTokens.length;
    if (total === 0) return { total: 0, moralCount: 0, density: 0, detected: [] };

    const detected: string[] = [];
    rawTokens.forEach((t) => {
      const clean = t.toLowerCase().replace(/[^a-z0-9-]/gi, '');
      if (clean && MORAL_KEYWORDS.some((kw) => clean === kw || clean.startsWith(kw) || clean.endsWith(kw))) {
        detected.push(t);
      }
    });

    const density = Math.min(100, Math.round((detected.length / total) * 100));
    return { total, moralCount: detected.length, density, detected };
  }, [sandboxText]);

  // Moral tokens are a subset of the message, so the slider cannot exceed the total.
  const moral = simMode === 'sandbox' ? sandboxAnalysis.moralCount : Math.min(moralWordsCount, totalWordsCount);
  const total = simMode === 'sandbox' ? sandboxAnalysis.total : totalWordsCount;
  const density = simMode === 'sandbox' ? sandboxAnalysis.density : Math.round((moral / Math.max(totalWordsCount, 1)) * 100);

  /**
   * Reading of the region, not a score. The previous version evaluated a four-step
   * lookup table, which taught the reader that thresholds exist at 10 / 30 / 55 per cent.
   * The finding is that the curve saturates, not that it steps.
   */
  const reading =
    density >= 45
      ? {
          label: 'Normative lecturing dominates',
          body: 'The message reads as scolding. Audiences activate persuasion knowledge, infer performative virtue signalling, and respond with defensive reactance.',
          color: 'var(--status-critical)',
        }
      : density >= 15
        ? {
            label: 'Moral relevance anchored by content',
            body: 'Moral weight is present but carried by factual detail, concrete narrative or logistics. This is the region where sincerity is usually perceived.',
            color: 'var(--status-positive)',
          }
        : {
            label: 'Moral resonance is faint',
            body: 'Informational value is high, but the ethical stake of the mission may not register at all.',
            color: 'var(--chart-label)',
          };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="border-b border-stone-800 pb-5">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-mono text-xs border border-amber-500/20">
            Domain D6 Synthesis (Candia et al. & Leach et al.)
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
          Moralized Communication & The Diffusion Paradox
        </h1>
        <p className="text-stone-400 text-xs sm:text-sm mt-1 max-w-3xl">
          Explores the mechanics of moral loading vs. moral density, outrage virality vs. behavioral conversion, and motive attribution in institutional messaging.
        </p>
      </div>

      {/* Cardinal Rule Alert */}
      <div className="p-4 bg-stone-900/80 border border-stone-800 rounded-xl flex items-start gap-3 text-xs text-stone-300">
        <ShieldAlert size={18} className="text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1 leading-relaxed">
          <strong className="font-mono text-amber-300 uppercase text-[11px] block">
            The Golden Rule: There is No Universal "30% Moral Density" Target:
          </strong>
          <p>
            The estimated peak reported by Candia et al. is a fitted optimum within their specific platform corpora (Twitter, Reddit, 8chan). It is <strong>not</strong> a universal copywriting recipe. The robust scientific takeaway is <em>non-linearity and saturation</em>: once moral scolding dominates a message, persuasion collapses.
          </p>
        </div>
      </div>

      {/* The Diffusion vs Conversion Paradox (Leach et al.) */}
      <div className="p-6 bg-stone-900 border border-stone-700 rounded-2xl space-y-4 shadow-md">
        <div className="flex items-center justify-between border-b border-stone-800 pb-3">
          <h3 className="text-base font-serif font-bold text-stone-100">
            Reach and conversion pull in opposite directions
          </h3>
          <span className="text-xs font-mono text-amber-400">Leach et al. (Change.org Corpus)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Outrage Profile */}
          <div className="p-4 bg-stone-950 rounded-xl border border-rose-900/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-rose-400 font-bold uppercase text-[11px]">
                Moral Outrage Rhetoric
              </span>
              <span className="px-1.5 py-0.2 rounded bg-rose-950 text-rose-300 font-mono text-[10px] border border-rose-800">
                Virality Without Conversion
              </span>
            </div>
            <ul className="space-y-1.5 text-stone-300">
              <li className="flex items-center gap-1.5">
                <span className="text-rose-400 font-bold">▲ High:</span>
                <span>Maximized likes, reposts, comments, and algorithmic spread.</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-rose-400 font-bold">▼ Low:</span>
                <span><strong>Depressed actual petition signatures</strong> per impression!</span>
              </li>
            </ul>
            <p className="text-[11px] text-stone-400 pt-1 border-t border-stone-800/80">
              Audience feeling: Satisfies moral catharsis on the platform without motivating effortful, costly follow-through.
            </p>
          </div>

          {/* Agency & Prosociality Profile */}
          <div className="p-4 bg-stone-950 rounded-xl border border-emerald-900/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-emerald-400 font-bold uppercase text-[11px]">
                Agency, In-Group & Prosocial Rhetoric
              </span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 font-mono text-[10px] border border-emerald-800">
                Conversion Over Virality
              </span>
            </div>
            <ul className="space-y-1.5 text-stone-300">
              <li className="flex items-center gap-1.5">
                <span className="text-stone-400 font-bold">~ Modest:</span>
                <span>Lower immediate retweet contagion within algorithmic feeds.</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-emerald-400 font-bold">▲ High:</span>
                <span><strong>Significantly higher rates of actual petition signatures!</strong></span>
              </li>
            </ul>
            <p className="text-[11px] text-stone-400 pt-1 border-t border-stone-800/80">
              Audience feeling: Restores self-efficacy, collective identity, and empowers tangible participation.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Simulator: Loading vs Density */}
      <div className="p-6 bg-stone-900 border border-stone-700 rounded-2xl space-y-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-3">
          <div>
            <h3 className="text-base font-serif font-bold text-stone-100">
              Moral Loading vs. Moral Density Simulator
            </h3>
            <p className="text-xs text-stone-400">
              Test how the proportion of moral tokens influences perceived sincerity vs preachiness
            </p>
          </div>

          <div className="flex items-center gap-1.5 self-start sm:self-auto">
            <button
              onClick={() => setSimMode('sliders')}
              className={`px-2.5 py-1 rounded-lg font-mono flex items-center gap-1.5 transition border ${
                simMode === 'sliders'
                  ? 'bg-amber-500 text-stone-950 font-bold border-amber-400'
                  : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-stone-200'
              }`}
              style={{ fontSize: 'var(--t-micro)' }}
            >
              <Sliders size={12} />
              <span>Sliders</span>
            </button>
            <button
              onClick={() => setSimMode('sandbox')}
              className={`px-2.5 py-1 rounded-lg font-mono flex items-center gap-1.5 transition border ${
                simMode === 'sandbox'
                  ? 'bg-amber-500 text-stone-950 font-bold border-amber-400'
                  : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-stone-200'
              }`}
              style={{ fontSize: 'var(--t-micro)' }}
            >
              <Sparkles size={12} />
              <span>Copy Sandbox</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Controls */}
          <div className="lg:col-span-2 space-y-4">
            {simMode === 'sliders' ? (
              <>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between font-mono" style={{ fontSize: 'var(--t-micro)' }}>
                    <span className="text-stone-300">Moral tokens</span>
                    <span className="font-bold tabular-nums" style={{ color: 'var(--ord-6)' }}>{moral} words</span>
                  </div>
                  <input
                    type="range" min={0} max={totalWordsCount} value={moral}
                    onChange={(e) => setMoralWordsCount(parseInt(e.target.value, 10))}
                    aria-label="Number of moral tokens in the message"
                    className="w-full"
                  />
                  <span className="block text-stone-500" style={{ fontSize: 'var(--t-micro)' }}>
                    Words referencing justice, duty, rights, harm or virtue.
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between font-mono" style={{ fontSize: 'var(--t-micro)' }}>
                    <span className="text-stone-300">Total message length</span>
                    <span className="font-bold tabular-nums" style={{ color: 'var(--cat-1)' }}>{totalWordsCount} words</span>
                  </div>
                  <input
                    type="range" min={10} max={100} value={totalWordsCount}
                    onChange={(e) => {
                      const next = parseInt(e.target.value, 10);
                      setTotalWordsCount(next);
                      setMoralWordsCount((m) => Math.min(m, next));
                    }}
                    aria-label="Total word count of the message"
                    className="w-full"
                  />
                  <span className="block text-stone-500" style={{ fontSize: 'var(--t-micro)' }}>
                    Surrounding context: facts, story, and actionable steps.
                  </span>
                </div>
              </>
            ) : (
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-stone-400 uppercase" style={{ fontSize: 'var(--t-micro)' }}>
                      Preset Samples:
                    </span>
                    <span className="font-mono text-stone-500" style={{ fontSize: 'var(--t-micro)' }}>
                      Click to load
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {SANDBOX_PRESETS.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setSandboxText(p.text)}
                        className="px-2 py-1 rounded bg-stone-950 hover:bg-stone-800 text-stone-300 border border-stone-800 font-mono transition text-left"
                        style={{ fontSize: 'var(--t-micro)' }}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-stone-300 uppercase block" style={{ fontSize: 'var(--t-micro)' }}>
                    Your Copywriting Draft:
                  </label>
                  <textarea
                    rows={4}
                    value={sandboxText}
                    onChange={(e) => setSandboxText(e.target.value)}
                    placeholder="Type or paste copywriting draft to test moral loading..."
                    className="w-full p-2.5 rounded-lg bg-stone-950 border border-stone-800 text-stone-200 focus:outline-none focus:border-amber-500/50 leading-relaxed font-sans"
                    style={{ fontSize: 'var(--t-small)' }}
                  />
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-stone-400 uppercase block" style={{ fontSize: 'var(--t-micro)' }}>
                    Detected Moral Tokens ({sandboxAnalysis.moralCount}):
                  </span>
                  {sandboxAnalysis.detected.length > 0 ? (
                    <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
                      {sandboxAnalysis.detected.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-1.5 py-0.5 rounded font-mono border"
                          style={{
                            fontSize: 'var(--t-micro)',
                            background: 'color-mix(in oklab, var(--cat-2) 15%, transparent)',
                            borderColor: 'var(--cat-2)',
                            color: 'var(--cat-2)',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-stone-500 italic block" style={{ fontSize: 'var(--t-micro)' }}>
                      No moral/normative scolding words detected in this draft.
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="p-3 bg-stone-950 rounded-lg border border-stone-800 flex items-center justify-between font-mono">
              <span className="text-stone-400" style={{ fontSize: 'var(--t-micro)' }}>
                {simMode === 'sandbox' ? `Count: ${moral}/${total} words · Density` : 'Moral density'}
              </span>
              <span className="font-bold tabular-nums" style={{ fontSize: 'var(--t-h3)', color: 'var(--ord-6)' }}>{density}%</span>
            </div>

            <div className="p-3.5 bg-stone-950 rounded-lg border border-stone-800 space-y-1.5">
              <span className="font-mono uppercase tracking-wider block" style={{ fontSize: 'var(--t-micro)', color: reading.color }}>
                {reading.label}
              </span>
              <p className="text-stone-300 leading-relaxed" style={{ fontSize: 'var(--t-small)' }}>{reading.body}</p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <MoralDensityCurve density={density} />
          </div>
        </div>
      </div>

      <EntityRail entityId="M18" onNavigate={onNavigate} />
    </div>
  );
};
