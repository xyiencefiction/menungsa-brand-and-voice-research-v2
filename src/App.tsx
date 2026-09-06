import React, { useState, useEffect } from 'react';
import type { ViewType } from './types';
import { Header } from './components/layout/Header';
import { GlobalSearch } from './components/layout/GlobalSearch';
import { FigureModal, type FigureInfo } from './components/common/FigureModal';

// v2 Primary Views
import { VoiceFoundationsView } from './components/views-v2/VoiceFoundationsView';
import { WritingStudioView } from './components/views-v2/WritingStudioView';
import { WordGuideView } from './components/views-v2/WordGuideView';
import { CopySandboxView } from './components/views-v2/CopySandboxView';
import { IndonesianNuancesView } from './components/views-v2/IndonesianNuancesView';

// Legacy Views for Deep Link Support
import { OverviewView } from './components/views/OverviewView';
import { MechanismsView } from './components/views/MechanismsView';
import { EvidenceView } from './components/views/EvidenceView';
import { CrossReportView } from './components/views/CrossReportView';
import { ContradictionsView } from './components/views/ContradictionsView';
import { LanguageLabView } from './components/views/LanguageLabView';
import { ResonanceView } from './components/views/ResonanceView';
import { FramingView } from './components/views/FramingView';
import { ManosphereView } from './components/views/ManosphereView';
import { MoralCommsView } from './components/views/MoralCommsView';
import { VoiceLabView } from './components/views/VoiceLabView';
import { PlaybookView } from './components/views/PlaybookView';
import { ResearchGapsView } from './components/views/ResearchGapsView';
import { ValuesView } from './components/views/ValuesView';
import { ChannelsView } from './components/views/ChannelsView';
import { ScenariosView } from './components/views/ScenariosView';

import { ArrowUpRight } from 'lucide-react';

export function App() {
  const [currentView, setCurrentView] = useState<ViewType>('foundations');
  const [activeParam, setActiveParam] = useState<string | undefined>(undefined);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedFigure, setSelectedFigure] = useState<FigureInfo | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Global keyboard shortcut for search (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (view: ViewType, param?: string) => {
    setCurrentView(view);
    setActiveParam(param);
    setIsMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderView = () => {
    switch (currentView) {
      // Primary v2 Views
      case 'foundations':
        return <VoiceFoundationsView onNavigate={handleNavigate} />;
      case 'studio':
        return <WritingStudioView />;
      case 'lexicon':
        return <WordGuideView />;
      case 'sandbox':
        return <CopySandboxView />;
      case 'indonesia':
        return <IndonesianNuancesView />;

      // Legacy View Compatibility
      case 'overview':
        return <VoiceFoundationsView onNavigate={handleNavigate} />;
      case 'values':
        return <VoiceFoundationsView onNavigate={handleNavigate} />;
      case 'playbook':
        return <VoiceFoundationsView onNavigate={handleNavigate} />;
      case 'voicelab':
        return <WritingStudioView />;
      case 'scenarios':
        return <WritingStudioView />;
      case 'channels':
        return <WritingStudioView />;
      case 'language':
        return <WordGuideView />;
      case 'manosphere':
        return <WordGuideView />;
      case 'moral':
        return <CopySandboxView />;
      case 'framing':
        return <IndonesianNuancesView />;
      case 'mechanisms':
        return (
          <MechanismsView
            initialSelectedId={activeParam}
            onOpenFigure={(fig) => setSelectedFigure(fig)}
            onNavigateToEvidence={(mechId) => handleNavigate('evidence', mechId)}
            onNavigate={handleNavigate}
          />
        );
      case 'evidence':
        return (
          <EvidenceView
            initialFilterDomain={activeParam?.startsWith('D') ? activeParam : undefined}
            initialFilterMechanism={activeParam?.startsWith('M') ? activeParam : undefined}
            onNavigate={handleNavigate}
          />
        );
      case 'cross-report':
        return (
          <CrossReportView
            onOpenFigure={(fig) => setSelectedFigure(fig)}
            onNavigateToMechanism={(mechId) => handleNavigate('mechanisms', mechId)}
            onNavigate={handleNavigate}
          />
        );
      case 'contradictions':
        return (
          <ContradictionsView
            initialContradictionId={activeParam}
            onOpenFigure={(fig) => setSelectedFigure(fig)}
            onNavigate={handleNavigate}
          />
        );
      case 'resonance':
        return (
          <ResonanceView
            onOpenFigure={(fig) => setSelectedFigure(fig)}
            onNavigateToMechanism={(mechId) => handleNavigate('mechanisms', mechId)}
            onNavigate={handleNavigate}
          />
        );
      case 'gaps':
        return (
          <ResearchGapsView
            onOpenFigure={(fig) => setSelectedFigure(fig)}
            onNavigate={handleNavigate}
          />
        );
      default:
        return <VoiceFoundationsView onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans flex flex-col antialiased selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Navigation Header */}
      <Header
        currentView={currentView}
        onSelectView={(v) => handleNavigate(v)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenFigure={(fig) => setSelectedFigure(fig)}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onToggleMobileSidebar={() => setIsMobileSidebarOpen((prev) => !prev)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-12">
        {renderView()}
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-800 bg-stone-950/80 py-8 px-4 sm:px-6 text-xs text-stone-500 font-sans">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-stone-300">MENUNGSA</span>
            <span>·</span>
            <span>Panduan Gaya & Nada Penulisan (Writer Edition v2)</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://menungsa-brand-and-voice-research.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-stone-400 hover:text-amber-400 transition"
            >
              <span>Eksplorasi Riset Akademis (v1)</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </footer>

      {/* Global Search Modal */}
      <GlobalSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={(v, p) => {
          setIsSearchOpen(false);
          handleNavigate(v, p);
        }}
      />

      {/* Figure Modal */}
      {selectedFigure && (
        <FigureModal
          selectedFigure={selectedFigure}
          onSelectFigure={(fig) => setSelectedFigure(fig)}
          onClose={() => setSelectedFigure(null)}
        />
      )}
    </div>
  );
}

export default App;
