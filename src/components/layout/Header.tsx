import React from 'react';
import { Search, Sparkles, Menu, X, BookOpen, PenTool, MessageSquare, Sliders, MapPin } from 'lucide-react';
import type { FigureInfo } from '../common/FigureModal';
import { ThemeToggle } from './ThemeToggle';
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
  const primaryTabs: { id: ViewType; label: string; icon: React.ComponentType<{ size: number; className?: string }> }[] = [
    { id: 'foundations', label: 'Prinsip Suara', icon: Sparkles },
    { id: 'studio', label: 'Studio Naskah', icon: PenTool },
    { id: 'lexicon', label: 'Pilihan Kata', icon: BookOpen },
    { id: 'sandbox', label: 'Lab Uji Naskah', icon: Sliders },
    { id: 'indonesia', label: 'Kompas Budaya', icon: MapPin },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-800 bg-stone-950/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left Branding */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileSidebar}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-900 md:hidden cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {isMobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <button
            onClick={() => onSelectView('foundations')}
            className="flex items-center gap-2.5 text-left cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center font-serif font-bold text-amber-300 text-base shadow-xs group-hover:bg-amber-500/30 transition">
              M
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-stone-100 text-sm sm:text-base tracking-tight font-sans">
                  MENUNGSA
                </span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/25 font-semibold">
                  Edisi Penulis (v2)
                </span>
              </div>
              <p className="text-[11px] text-stone-300 font-sans hidden sm:block">
                Panduan Praktis Gaya & Nada Penulisan
              </p>
            </div>
          </button>
        </div>

        {/* Center Desktop Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-stone-900/70 p-1 rounded-xl border border-stone-800/80">
          {primaryTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectView(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 font-semibold shadow-xs'
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
            className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 text-xs font-sans transition cursor-pointer"
            title="Cari kata kunci panduan (⌘K)"
          >
            <Search size={14} className="text-amber-400/90" />
            <span className="hidden lg:inline text-stone-400">Cari panduan...</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 font-mono text-[10px] bg-stone-800 text-stone-400 border border-stone-700 rounded">
              ⌘K
            </kbd>
          </button>

          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileSidebarOpen && (
        <div className="md:hidden border-t border-stone-800 bg-stone-950 px-4 py-4 space-y-2">
          <div className="text-[11px] font-mono text-stone-500 uppercase tracking-wider px-2 mb-2">
            Modul Panduan Penulis:
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
        </div>
      )}
    </header>
  );
};
