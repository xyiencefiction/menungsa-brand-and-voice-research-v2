import React from 'react';
import { 
  Home, 
  Sliders, 
  Database, 
  Grid, 
  GitFork, 
  MapPin, 
  Languages, 
  HeartHandshake, 
  Compass, 
  ShieldCheck, 
  Scale, 
  Radio, 
  CheckSquare, 
  AlertCircle,
  Gem,
  Send,
  PenLine
} from 'lucide-react';
import type { ViewType } from '../../types';
import { corpusStats, brandValues, channels, scenarios } from '../../data';

interface Props {
  currentView: ViewType;
  onSelectView: (view: ViewType) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

interface NavItem {
  id: ViewType;
  label: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
  badge?: string;
  category: string;
}

const NAV_ITEMS: NavItem[] = [
  // Overview
  { id: 'overview', label: 'Research Overview', icon: Home, category: 'ORIENTATION' },
  
  // Mechanisms & Evidence
  { id: 'mechanisms', label: 'Mechanism Explorer', icon: Sliders, badge: String(corpusStats.mechanisms), category: 'THEORY & EVIDENCE' },
  { id: 'evidence', label: 'Evidence Browser', icon: Database, badge: String(corpusStats.totalClaims), category: 'THEORY & EVIDENCE' },
  { id: 'cross-report', label: 'Cross-Domain Heatmap', icon: Grid, category: 'THEORY & EVIDENCE' },
  { id: 'contradictions', label: 'Contradictions & Bounds', icon: GitFork, badge: String(corpusStats.contradictions), category: 'THEORY & EVIDENCE' },

  // Context & Localisation
  { id: 'indonesia', label: 'Indonesia Deep Dive', icon: MapPin, category: 'CULTURAL CONTEXT' },
  { id: 'language', label: 'Language & Register Lab', icon: Languages, badge: String(corpusStats.registers), category: 'CULTURAL CONTEXT' },
  { id: 'resonance', label: 'Emotional Resonance Flow', icon: HeartHandshake, category: 'CULTURAL CONTEXT' },

  // Thematic Interrogation
  { id: 'framing', label: 'Masculinity Framing', icon: Compass, category: 'TOPICAL DOMAINS' },
  { id: 'manosphere', label: 'Manosphere: Functional Alt', icon: ShieldCheck, category: 'TOPICAL DOMAINS' },
  { id: 'moral', label: 'Moral Communication Model', icon: Scale, category: 'TOPICAL DOMAINS' },

  // Applied Strategy
  { id: 'values', label: 'Values & Voice', icon: Gem, badge: String(brandValues.length), category: 'APPLIED SYSTEM' },
  { id: 'voicelab', label: 'Voice & Tone Lab', icon: Radio, badge: `${corpusStats.toneContexts} presets`, category: 'APPLIED SYSTEM' },
  { id: 'channels', label: 'Channels & Exposure', icon: Send, badge: String(channels.length), category: 'APPLIED SYSTEM' },
  { id: 'scenarios', label: 'Scenarios in Practice', icon: PenLine, badge: String(scenarios.length), category: 'APPLIED SYSTEM' },
  { id: 'playbook', label: 'Do & Don’t Playbook', icon: CheckSquare, category: 'APPLIED SYSTEM' },
  { id: 'gaps', label: 'What We May Not Claim Yet', icon: AlertCircle, badge: `${corpusStats.indonesianWordingTested} ID RCTs`, category: 'APPLIED SYSTEM' },
];

export const Sidebar: React.FC<Props> = ({
  currentView,
  onSelectView,
  isOpenMobile,
  onCloseMobile,
}) => {
  const categories = Array.from(new Set(NAV_ITEMS.map(i => i.category)));

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-30 bg-black/70 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-14 bottom-0 left-0 z-30 w-64 border-r border-stone-800 bg-stone-950 p-3 overflow-y-auto transition-transform duration-200 lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="space-y-5 text-xs font-sans">
          {categories.map((cat) => (
            <div key={cat} className="space-y-1">
              <span className="px-2.5 text-[10px] font-mono uppercase tracking-wider text-stone-400 block font-semibold">
                {cat}
              </span>
              <div className="space-y-0.5">
                {NAV_ITEMS.filter(i => i.category === cat).map((item) => {
                  const Icon = item.icon;
                  const isActive = currentView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectView(item.id);
                        onCloseMobile();
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition ${
                        isActive
                          ? 'bg-amber-500/15 text-amber-300 font-medium border border-amber-500/30 shadow-xs'
                          : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900/80 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon size={15} className={isActive ? 'text-amber-400' : 'text-stone-400'} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono ${
                          isActive
                            ? 'bg-amber-500/20 text-amber-200'
                            : 'bg-stone-800/80 text-stone-400'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Epistemic guardrail footnote */}
        <div className="mt-8 p-3 bg-stone-900/50 border border-stone-800/80 rounded-lg text-[11px] font-sans text-stone-400 space-y-1">
          <span className="font-mono text-amber-400 block text-[10px] uppercase font-semibold">
            Epistemic Boundary
          </span>
          <p className="leading-tight">
            Recurrence ≠ effectiveness. Wording effects require causal tests.
          </p>
        </div>
      </aside>
    </>
  );
};
