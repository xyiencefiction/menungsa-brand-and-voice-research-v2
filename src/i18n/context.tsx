import { createContext, createElement, useContext, useEffect, useState, type ReactNode } from 'react';
import { LANGUAGE_KEY, readLanguage, type Language } from './translate';

export const LanguageContext = createContext<{ language: Language; setLanguage: (language: Language) => void }>({ language: 'id', setLanguage: () => {} });
export const useLanguage = () => useContext(LanguageContext);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(readLanguage);
  useEffect(() => {
    document.documentElement.lang = language;
    document.title = language === 'id'
      ? 'Riset Brand dan Gaya Komunikasi Menungsa — Sistem Pengetahuan Interaktif'
      : 'Menungsa Brand and Voice Research — Interactive Knowledge System';
    try { localStorage.setItem(LANGUAGE_KEY, language); } catch { /* Session selection still works. */ }
  }, [language]);
  useEffect(() => {
    const sync = (e: StorageEvent) => { if (e.key === LANGUAGE_KEY) setLanguage(e.newValue === 'id' ? 'id' : 'en'); };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);
  return createElement(LanguageContext.Provider, { value: { language, setLanguage } }, children);
}
