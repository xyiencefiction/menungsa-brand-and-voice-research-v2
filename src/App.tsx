import React, { useState, useEffect } from 'react';
import type { ViewType } from './types';
import { Header } from './components/layout/Header';
import type { FigureInfo } from './components/common/FigureModal';

const GlobalSearch = React.lazy(() => import('./components/layout/GlobalSearch').then(m => ({ default: m.GlobalSearch })));
const FigureModal = React.lazy(() => import('./components/common/FigureModal').then(m => ({ default: m.FigureModal })));

import { ArrowUpRight } from 'lucide-react';

// v2 Primary Views (Lazy Loaded for minimal initial bundle)
const VoiceFoundationsView = React.lazy(() => import('./components/views-v2/VoiceFoundationsView').then(m => ({ default: m.VoiceFoundationsView })));
const WritingStudioView = React.lazy(() => import('./components/views-v2/WritingStudioView').then(m => ({ default: m.WritingStudioView })));
const WordGuideView = React.lazy(() => import('./components/views-v2/WordGuideView').then(m => ({ default: m.WordGuideView })));
const CopySandboxView = React.lazy(() => import('./components/views-v2/CopySandboxView').then(m => ({ default: m.CopySandboxView })));
const IndonesianNuancesView = React.lazy(() => import('./components/views-v2/IndonesianNuancesView').then(m => ({ default: m.IndonesianNuancesView })));

// Research Deep Link Support (Lazy Loaded on demand)
const MechanismsView = React.lazy(() => import('./components/views/MechanismsView').then(m => ({ default: m.MechanismsView })));
const EvidenceView = React.lazy(() => import('./components/views/EvidenceView').then(m => ({ default: m.EvidenceView })));
const CrossReportView = React.lazy(() => import('./components/views/CrossReportView').then(m => ({ default: m.CrossReportView })));
const ContradictionsView = React.lazy(() => import('./components/views/ContradictionsView').then(m => ({ default: m.ContradictionsView })));
const ResonanceView = React.lazy(() => import('./components/views/ResonanceView').then(m => ({ default: m.ResonanceView })));
const ResearchGapsView = React.lazy(() => import('./components/views/ResearchGapsView').then(m => ({ default: m.ResearchGapsView })));

const ViewFallback: React.FC = () => (
  <div className="min-h-[45vh] flex flex-col items-center justify-center space-y-3 py-16 animate-pulse" role="status" aria-label="Memuat panduan">
    <div className="w-8 h-8 rounded-full border-2 border-amber-500/30 border-t-amber-500 animate-spin" />
    <span className="font-mono text-xs text-stone-500 dark:text-stone-400">Memuat panduan…</span>
  </div>
);

export function App() {
  const parseHash = (): ViewType => {
    const hash = window.location.hash.replace('#/', '').replace('#', '');
    const validViews: ViewType[] = [
      'foundations', 'studio', 'lexicon', 'sandbox', 'indonesia',
      'overview', 'values', 'playbook', 'voicelab', 'scenarios',
      'channels', 'language', 'manosphere', 'moral', 'framing',
      'mechanisms', 'evidence', 'cross-report', 'contradictions',
      'resonance', 'gaps',
    ];
    return validViews.includes(hash as ViewType) ? (hash as ViewType) : 'foundations';
  };

  const [currentView, setCurrentView] = useState<ViewType>(parseHash);
  const [activeParam, setActiveParam] = useState<string | undefined>(undefined);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedFigure, setSelectedFigure] = useState<FigureInfo | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Sync view state from browser back/forward
  useEffect(() => {
    const onHashChange = () => {
      const view = parseHash();
      setCurrentView(view);
      setActiveParam(undefined);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

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
    window.location.hash = `#/${view}`;
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

      {/* Mobile Sidebar Backdrop */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-12">
        <React.Suspense fallback={<ViewFallback />}>
          {renderView()}
        </React.Suspense>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-800 bg-stone-950/80 py-8 px-4 sm:px-6 text-xs text-stone-500 font-sans">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/brand/menungsa-mark.png"
              alt="Menungsa"
              className="w-6 h-6 rounded-[6px] border border-stone-800 object-cover shrink-0 select-none"
            />
            <span>Panduan menulis Menungsa</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://menungsa-brand-and-voice-research.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-stone-400 hover:text-amber-400 transition"
            >
              <span>Baca dasar riset (situs v1)</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </footer>

      {/* Global Search Modal */}
      {isSearchOpen && (
        <React.Suspense fallback={null}>
          <GlobalSearch
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            onNavigate={(v, p) => {
              setIsSearchOpen(false);
              handleNavigate(v, p);
            }}
          />
        </React.Suspense>
      )}

      {/* Figure Modal */}
      {selectedFigure && (
        <React.Suspense fallback={null}>
          <FigureModal
            selectedFigure={selectedFigure}
            onSelectFigure={(fig) => setSelectedFigure(fig)}
            onClose={() => setSelectedFigure(null)}
          />
        </React.Suspense>
      )}
    </div>
  );
}

export default App;
