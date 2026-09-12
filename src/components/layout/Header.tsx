import React, { useEffect, useState } from 'react';
import { Search, Sparkles, Menu, X, BookOpen, PenTool, Sliders, MapPin } from 'lucide-react';
import type { FigureInfo } from '../common/FigureModal';
import { ThemeToggle } from './ThemeToggle';
import { SoundToggle } from './SoundToggle';
import type { ViewType } from '../../types';


interface Props {
  currentView: ViewType;
  onSelectView: (view: ViewType) => void;
  onOpenSearch: () => void;
  onOpenFigure?: (fig: FigureInfo) => void;
  isMobileSidebarOpen: boolean;
  onToggleMobileSidebar: () => void;
}

export const Header: React.FC<Props> = ({
  currentView,
  onSelectView,
  onOpenSearch,
  isMobileSidebarOpen,
  onToggleMobileSidebar,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const primaryTabs: { id: ViewType; label: string; icon: React.ComponentType<{ size: number; className?: string }> }[] = [
    { id: 'foundations', label: 'Menungsa Voice', icon: Sparkles },
    { id: 'studio', label: 'Contoh Penulisan', icon: PenTool },
    { id: 'lexicon', label: 'Pemilihan Kata', icon: BookOpen },
    { id: 'sandbox', label: 'Cek Tulisan', icon: Sliders },
    { id: 'indonesia', label: 'Konteks Lokal', icon: MapPin },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'border-b border-transparent bg-transparent'
          : 'border-b border-stone-800/80 bg-stone-950/95 backdrop-blur-md'
      }`}
    >
      {/* Scrolled Gradient Backdrop: solid at the top to transparent at the bottom */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 -z-10 ${
          isScrolled ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background:
            'linear-gradient(to bottom, var(--color-stone-950) 0%, color-mix(in srgb, var(--color-stone-950) 88%, transparent) 45%, color-mix(in srgb, var(--color-stone-950) 25%, transparent) 80%, transparent 100%)',
          backdropFilter: isScrolled ? 'blur(10px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(10px)' : 'none',
          WebkitMaskImage:
            'linear-gradient(to bottom, black 0%, black 55%, rgba(0, 0, 0, 0.3) 85%, transparent 100%)',
          maskImage:
            'linear-gradient(to bottom, black 0%, black 55%, rgba(0, 0, 0, 0.3) 85%, transparent 100%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left Branding */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileSidebar}
            className={`p-1.5 rounded-lg text-stone-400 hover:text-stone-100 md:hidden cursor-pointer transition-all duration-300 ${
              isScrolled
                ? 'bg-stone-900/90 border border-stone-700/70 dark:border-stone-800/90 shadow-sm shadow-black/20'
                : 'hover:bg-stone-900'
            }`}
            aria-label={isMobileSidebarOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={isMobileSidebarOpen}
          >
            {isMobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <button
            onClick={() => onSelectView('foundations')}
            className="flex items-center text-left cursor-pointer group focus:outline-none"
            aria-label="Home"
            title="Menungsa Writing Guideline"
          >
            <img
              src="/brand/menungsa-mark.png"
              alt="Menungsa"
              className={`w-10 h-10 rounded-[10px] border object-cover select-none group-hover:scale-105 group-hover:border-amber-500/50 transition-all duration-300 ${
                isScrolled
                  ? 'border-stone-700/80 shadow-[0_4px_14px_-2px_rgba(0,0,0,0.22)] dark:shadow-[0_6px_18px_-2px_rgba(0,0,0,0.6)] ring-1 ring-white/10 dark:ring-white/5'
                  : 'border-stone-800/90 shadow-xs'
              }`}
            />
          </button>
        </div>

        {/* Center Desktop Navigation Tabs with Apple-style Floating Pill */}
        <nav
          aria-label="Navigasi utama"
          className={`hidden md:flex items-center gap-1 p-1 rounded-xl transition-all duration-300 ${
            isScrolled
              ? 'bg-stone-900/90 dark:bg-stone-900/90 border border-stone-700/70 dark:border-stone-800/90 shadow-[0_4px_16px_-2px_rgba(0,0,0,0.18),0_2px_6px_-1px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.6),0_2px_8px_-2px_rgba(0,0,0,0.4)] backdrop-blur-md ring-1 ring-white/5'
              : 'bg-stone-900/70 border border-stone-800/80 shadow-none'
          }`}
        >
          {primaryTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectView(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 font-semibold shadow-[0_2px_8px_rgba(217,119,6,0.35)]'
                    : isScrolled
                      ? 'text-stone-400 hover:text-stone-100 hover:bg-stone-800/70'
                      : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
                }`}
              >
                <Icon size={13} className={isActive ? 'text-stone-950' : 'text-amber-400/80'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Utility Actions */}
        <div className="flex items-center gap-2">
          {/* Quick Search */}
          <button
            onClick={onOpenSearch}
            className={`flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg text-stone-300 text-xs font-sans transition-all duration-300 cursor-pointer ${
              isScrolled
                ? 'bg-stone-900/90 hover:bg-stone-850 border border-stone-700/70 dark:border-stone-800/90 shadow-[0_4px_14px_-2px_rgba(0,0,0,0.15),0_2px_6px_-1px_rgba(0,0,0,0.1)] dark:shadow-[0_6px_20px_-3px_rgba(0,0,0,0.5)] backdrop-blur-md'
                : 'bg-stone-900 hover:bg-stone-800 border border-stone-800'
            }`}
            aria-label="Cari"
            title="Cari (Cmd+K)"
          >
            <Search size={14} className="text-stone-400" />
            <span className="hidden lg:inline text-stone-400">Cari</span>
          </button>

          {/* Sound Interaction Toggle */}
          <SoundToggle isScrolled={isScrolled} />

          {/* Color Theme Toggle */}
          <ThemeToggle isScrolled={isScrolled} />
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileSidebarOpen && (
        <nav aria-label="Menu utama" className="md:hidden border-t border-stone-800 bg-stone-950 px-4 py-4 space-y-2">
          <div className="text-[11px] font-mono text-stone-500 uppercase tracking-wider px-2 mb-2">
            Menungsa Writing Guideline
          </div>
          {primaryTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  onSelectView(tab.id);
                  onToggleMobileSidebar();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs text-left transition cursor-pointer ${
                  isActive
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                    : 'bg-stone-900/50 text-stone-300 border border-stone-800/80 hover:bg-stone-800'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-amber-400' : 'text-stone-400'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      )}
    </header>
  );
};
