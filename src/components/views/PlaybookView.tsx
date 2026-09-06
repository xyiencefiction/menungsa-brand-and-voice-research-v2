import React, { useState } from 'react';
import { playbookRules } from '../../data';
import { ConfidenceTag } from '../common/ConfidenceTag';
import { IllustrativeBadge } from '../common/IllustrativeBadge';
import { Check, X, ChevronDown } from 'lucide-react';

/**
 * The examples sit behind a toggle rather than inline.
 *
 * Seven rules with eight wordings each is fifty-six sentences, which buries the rules
 * themselves if shown at once. Collapsed, the page still reads as a rule list; opened,
 * one rule at a time becomes a worked reference.
 */
const ExampleList: React.FC<{
  items: { example: string; why: string }[];
  tone: 'do' | 'dont';
}> = ({ items, tone }) => (
  <div className="space-y-1.5 pt-2">
    {items.map((item, i) => (
      <div
        key={i}
        className={`p-2.5 rounded-lg border space-y-1 ${
          tone === 'do' ? 'bg-emerald-950/20 border-emerald-900/40' : 'bg-rose-950/20 border-rose-900/40'
        }`}
      >
        <p className={tone === 'do' ? 'text-emerald-100' : 'text-rose-100'} style={{ fontSize: 'var(--t-small)' }} lang="id">
          “{item.example}”
        </p>
        <p className={tone === 'do' ? 'text-emerald-200/70' : 'text-rose-200/70'} style={{ fontSize: 'var(--t-micro)' }}>
          {item.why}
        </p>
      </div>
    ))}
  </div>
);

export const PlaybookView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [diagnosticGoal, setDiagnosticGoal] = useState<string | null>(null);
  const [openExamples, setOpenExamples] = useState<string | null>(null);

  const categories = ['ALL', 'Voice & Tone', 'Linguistics & Syntax', 'Indonesian Register', 'Masculinity Framing', 'Indonesian Culture', 'Moral Communication', 'Measurement & Analytics'];

  const DIAGNOSTIC_GOALS = [
    {
      id: 'cta',
      label: 'Lowering Entry Barrier & CTA Risk',
      ruleIds: ['R01', 'R04'],
      hint: 'Prevents reactance and exposure costs; focuses on reversible first steps and craft responsibility.',
    },
    {
      id: 'vulnerability',
      label: 'Talking About Hardship Without Sounding Preachy',
      ruleIds: ['R02', 'R04'],
      hint: 'Leads with concrete situations rather than diagnostic labels; avoids gender policing.',
    },
    {
      id: 'relational',
      label: 'Selecting Pronouns & Engaging Relational Care',
      ruleIds: ['R03', 'R05'],
      hint: 'Respects relational licensing (kamu/kami) and targets family/partners as informal navigators.',
    },
    {
      id: 'moral',
      label: 'Calibrating Moral Loading & Measuring Conversions',
      ruleIds: ['R06', 'R07'],
      hint: 'Prevents virtue-signalling backlash and focuses on petition signatures over vanity reach.',
    },
  ];

  const handleSelectGoal = (goalId: string) => {
    if (diagnosticGoal === goalId) {
      setDiagnosticGoal(null);
    } else {
      setDiagnosticGoal(goalId);
      setSelectedCategory('ALL');
      const goal = DIAGNOSTIC_GOALS.find((g) => g.id === goalId);
      if (goal && goal.ruleIds.length > 0) {
        setOpenExamples(goal.ruleIds[0]);
      }
    }
  };

  const filteredRules = playbookRules.filter((r) => {
    if (diagnosticGoal) {
      const activeGoal = DIAGNOSTIC_GOALS.find((g) => g.id === diagnosticGoal);
      return activeGoal ? activeGoal.ruleIds.includes(r.id) : true;
    }
    if (selectedCategory === 'ALL') return true;
    return r.category.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="border-b border-stone-800 pb-5">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-mono text-xs border border-amber-500/20">
            Operational Playbook & Decision Rules
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
          Applied Do & Don’t Playbook
        </h1>
        <p className="text-stone-400 text-xs sm:text-sm mt-1 max-w-3xl">
          Core tactical rules for communicating with Indonesian adult men. Every rule pairs an action with its underlying mechanism, confidence rating, and mandatory boundary condition.
        </p>
      </div>

      {/* Diagnostic Assistant */}
      <div className="p-4 sm:p-5 bg-stone-900 border border-stone-800 rounded-2xl space-y-3 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-2.5">
          <div>
            <h3 className="font-serif font-semibold text-stone-100" style={{ fontSize: 'var(--t-body)' }}>
              Diagnostic Decision Assistant
            </h3>
            <p className="text-stone-400" style={{ fontSize: 'var(--t-micro)' }}>
              What strategic or copywriting challenge are you currently solving? Click a challenge to isolate its binding rules:
            </p>
          </div>
          {diagnosticGoal && (
            <button
              onClick={() => setDiagnosticGoal(null)}
              className="font-mono text-amber-400 hover:text-amber-300 text-xs underline self-start sm:self-auto"
            >
              Reset / View all 7 rules
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {DIAGNOSTIC_GOALS.map((g) => {
            const isActive = diagnosticGoal === g.id;
            return (
              <button
                key={g.id}
                onClick={() => handleSelectGoal(g.id)}
                className={`p-3 rounded-xl border text-left transition space-y-1 ${
                  isActive
                    ? 'bg-amber-500/20 text-amber-100 border-amber-500/50 shadow-sm'
                    : 'bg-stone-950 text-stone-300 border-stone-800 hover:border-stone-700 hover:bg-stone-900/60'
                }`}
              >
                <div className="flex items-center justify-between gap-1 font-mono text-[10px] uppercase font-bold text-amber-400">
                  <span>Target Challenge</span>
                  <span>{g.ruleIds.join(', ')}</span>
                </div>
                <div className="font-serif font-medium text-xs leading-snug text-stone-100">
                  {g.label}
                </div>
                <div className="text-stone-400 text-[10px] leading-relaxed line-clamp-2">
                  {g.hint}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap items-center gap-1.5 bg-stone-950 p-3 rounded-xl border border-stone-800 text-xs">
        <span className="font-mono text-stone-400 uppercase text-[10px] mr-1">Category:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setDiagnosticGoal(null);
            }}
            className={`px-2.5 py-1 rounded font-mono text-[11px] transition ${
              selectedCategory === cat && !diagnosticGoal
                ? 'bg-amber-500 text-stone-950 font-bold'
                : 'bg-stone-900 text-stone-400 hover:text-stone-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Rules Cards */}
      <div className="space-y-4">
        {filteredRules.map((rule) => (
          <div
            key={rule.id}
            className="p-5 bg-stone-900 border border-stone-700 rounded-2xl shadow-md space-y-4 text-xs font-sans"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {rule.id}
                </span>
                <span className="font-mono text-xs text-stone-400 font-semibold">{rule.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-stone-400">{rule.mechanism}</span>
                <ConfidenceTag confidence={rule.confidence} />
              </div>
            </div>

            {/* Do and Don't comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* DO */}
              <div className="p-3.5 bg-emerald-950/25 border border-emerald-800/40 rounded-xl space-y-1.5">
                <div className="flex items-center gap-1.5 text-emerald-400 font-mono font-bold text-[11px]">
                  <Check size={16} />
                  <span>RECOMMENDED ACTION</span>
                </div>
                <p className="text-emerald-100 font-medium text-sm leading-snug">{rule.action}</p>
                {openExamples === rule.id && <ExampleList items={rule.doExamples} tone="do" />}
              </div>

              {/* DONT */}
              <div className="p-3.5 bg-rose-950/25 border border-rose-800/40 rounded-xl space-y-1.5">
                <div className="flex items-center gap-1.5 text-rose-400 font-mono font-bold text-[11px]">
                  <X size={16} />
                  <span>CRITICAL ANTI-PATTERN</span>
                </div>
                <p className="text-rose-100 font-medium text-sm leading-snug">{rule.avoid}</p>
                {openExamples === rule.id && <ExampleList items={rule.dontExamples} tone="dont" />}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2">
              <button
                onClick={() => setOpenExamples(openExamples === rule.id ? null : rule.id)}
                aria-expanded={openExamples === rule.id}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-950 border border-stone-800 text-stone-300 hover:text-stone-100 hover:border-stone-600 font-mono transition"
                style={{ fontSize: 'var(--t-micro)' }}
              >
                <ChevronDown
                  size={13}
                  className={`transition-transform ${openExamples === rule.id ? 'rotate-180' : ''}`}
                />
                <span>
                  {openExamples === rule.id ? 'Hide wordings' : `Show ${rule.doExamples.length + rule.dontExamples.length} wordings`}
                </span>
              </button>
              {openExamples === rule.id && <IllustrativeBadge tier={rule.confidence} />}
            </div>

            {/* Rationale & Boundary condition */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-stone-300">
              <div className="p-3 bg-stone-950 rounded-lg border border-stone-800 space-y-1">
                <span className="font-mono text-amber-400 uppercase text-[10px] block">Psychological Rationale:</span>
                <p className="text-stone-300 leading-relaxed">{rule.rationale}</p>
              </div>

              <div className="p-3 bg-stone-950 rounded-lg border border-stone-800 space-y-1">
                <span className="font-mono text-sky-400 uppercase text-[10px] block">Mandatory Boundary Condition:</span>
                <p className="text-stone-300 leading-relaxed">{rule.boundaryCondition}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
