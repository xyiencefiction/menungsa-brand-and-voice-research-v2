import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export type ThemeChoice = 'light' | 'dark';

const STORAGE_KEY = 'menungsa-theme';

const OPTIONS: { value: ThemeChoice; label: string; Icon: typeof Sun }[] = [
  { value: 'light', label: 'Terang', Icon: Sun },
  { value: 'dark', label: 'Gelap', Icon: Moon },
];

export function readStoredTheme(): ThemeChoice {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === 'light' || v === 'dark') return v;
  } catch {
    // Private windows and blocked site data fallback to light
  }
  return 'light';
}

export function applyTheme(choice: ThemeChoice) {
  const root = document.documentElement;
  root.setAttribute('data-theme', choice);
}

interface Props {
  className?: string;
}

export const ThemeToggle: React.FC<Props> = ({ className = '' }) => {
  const [choice, setChoice] = useState<ThemeChoice>(() => readStoredTheme());

  useEffect(() => {
    applyTheme(choice);
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // Preference simply does not persist; the current session still honours it.
    }
  }, [choice]);

  return (
    <div
      role="radiogroup"
      aria-label="Colour theme"
      className={`flex items-center gap-0.5 p-0.5 rounded-lg bg-stone-900 border border-stone-800 ${className}`}
    >
      {OPTIONS.map(({ value, label, Icon }) => {
        const active = choice === value;
        return (
          <button
            key={value}
            role="radio"
            aria-checked={active}
            aria-label={`${label} theme`}
            title={`${label} theme`}
            onClick={() => setChoice(value)}
            className={`p-1.5 rounded-md transition ${
              active
                ? 'bg-amber-500/20 text-amber-300'
                : 'text-stone-500 hover:text-stone-300 hover:bg-stone-800'
            }`}
          >
            <Icon size={14} />
          </button>
        );
      })}
    </div>
  );
};
