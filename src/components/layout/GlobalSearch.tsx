import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X, ArrowRight, BookOpen, GitFork, Sliders, MessageSquare, ShieldAlert } from 'lucide-react';
import { searchKnowledgeBase } from '../../data';
import type { ViewType } from '../../types';
import { playSound } from '../../utils/sound';
import { useBodyScrollLock, useFocusTrap } from '../../utils/overlay';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: ViewType, itemId?: string) => void;
}

export const GlobalSearch: React.FC<Props> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Escape is already owned by the keydown effect below, which also plays the
  // dismiss sound; handing it to the trap as well would fire both twice.
  useFocusTrap(panelRef, isOpen);
  useBodyScrollLock(isOpen);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return searchKnowledgeBase(query);
  }, [query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Arrowing past the fold moved an invisible selection: the highlight was on a
  // row well below the scroll edge with nothing on screen to show it had moved.
  useEffect(() => {
    listRef.current
      ?.querySelector('[data-selected="true"]')
      ?.scrollIntoView({ block: 'nearest' });
  }, [selectedIndex, query]);

  useEffect(() => {
    if (isOpen) {
      playSound('modal-open');
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        playSound('modal-close');
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        playSound('tick');
        setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        playSound('tick');
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : results.length - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (results[selectedIndex]) {
          const item = results[selectedIndex];
          playSound('tab');
          onNavigate(item.view as ViewType, item.id);
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onNavigate, onClose]);

  if (!isOpen) return null;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Mechanism': return <Sliders size={14} className="text-amber-500 dark:text-amber-400" />;
      case 'Contradiction': return <GitFork size={14} className="text-purple-500 dark:text-purple-400" />;
      case 'Context': return <MessageSquare size={14} className="text-sky-400" />;
      case 'Language': return <BookOpen size={14} className="text-emerald-400" />;
      case 'Claim': return <ShieldAlert size={14} className="text-rose-500 dark:text-rose-400" />;
      default: return <Search size={14} className="text-stone-400" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/80 backdrop-blur-sm p-4 cursor-pointer animate-overlay-in"
      onClick={onClose}
    >
      <div 
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Pencarian Panduan Menungsa"
        className="bg-stone-900 border border-stone-700 w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden flex flex-col animate-panel-in cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input bar */}
        <div className="flex items-center px-4 py-3 border-b border-stone-800 gap-3">
          <Search size={20} className="text-stone-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari"
            aria-label="Cari"
            role="combobox"
            aria-expanded={results.length > 0}
            aria-controls="global-search-results"
            aria-activedescendant={results[selectedIndex] ? `global-search-option-${selectedIndex}` : undefined}
            className="w-full bg-transparent text-stone-100 text-sm placeholder-stone-500 focus:outline-none"
          />
          {query && (
            <button 
              onClick={() => setQuery('')} 
              aria-label="Hapus teks pencarian"
              className="text-stone-400 hover:text-stone-200 cursor-pointer"
            >
              <X size={16} />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono bg-stone-800 text-stone-400 border border-stone-700 rounded">
            ESC
          </kbd>
        </div>

        {/* Results list */}
        <div
          ref={listRef}
          id="global-search-results"
          role="listbox"
          aria-label="Pencarian Panduan Menungsa"
          className="max-h-[60vh] overflow-y-auto divide-y divide-stone-800/60 p-2"
        >
          {query.trim().length > 1 && results.length === 0 && (
            <div className="py-8 text-center text-stone-400 text-sm">
              No results found for "<span className="text-stone-200">{query}</span>"
            </div>
          )}

          {query.trim().length <= 1 && (
            <div className="py-6 px-4 text-xs text-stone-500 space-y-2">
              <span className="font-mono uppercase tracking-wider block text-stone-400">Cari</span>
            </div>
          )}

          {results.map((res, idx) => (
            <div
              key={`${res.category}-${res.id}-${idx}`}
              id={`global-search-option-${idx}`}
              role="option"
              aria-selected={idx === selectedIndex}
              data-selected={idx === selectedIndex}
              onMouseEnter={() => setSelectedIndex(idx)}
              onClick={() => {
                onNavigate(res.view as ViewType, res.id);
                onClose();
              }}
              className={`p-3 rounded-lg flex items-center justify-between cursor-pointer transition-colors ${
                idx === selectedIndex ? 'bg-amber-500/15 border border-amber-500/30' : 'border border-transparent hover:bg-stone-800/50'
              }`}
            >
              <div className="flex items-start gap-3 overflow-hidden pr-2">
                <div className="mt-1 shrink-0">{getCategoryIcon(res.category)}</div>
                <div className="space-y-0.5 overflow-hidden">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono px-1.5 py-0.2 bg-stone-800 text-stone-300 rounded text-[10px]">
                      {res.category}
                    </span>
                    <h4 className="text-sm font-semibold text-stone-100 truncate">{res.title}</h4>
                  </div>
                  <p className="text-xs text-stone-400 line-clamp-1">{res.subtitle}</p>
                </div>
              </div>
              <ArrowRight size={14} className="text-stone-500 shrink-0" />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-stone-950/80 border-t border-stone-800 text-[11px] font-mono text-stone-400 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span><kbd className="px-1 bg-stone-800 rounded">↑↓</kbd> Navigate</span>
            <span><kbd className="px-1 bg-stone-800 rounded">↵</kbd> Select</span>
          </div>
        </div>
      </div>
    </div>
  );
};
