import { useLanguage } from '../../i18n/context';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  return (
    <button
      type="button"
      onClick={() => setLanguage(language === 'en' ? 'id' : 'en')}
      aria-label={language === 'en' ? 'Switch to Indonesian' : 'Switch to English'}
      title={language === 'en' ? 'Baca dalam bahasa Indonesia' : 'Read in English'}
      className="flex shrink-0 items-center gap-1 px-2 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-xs font-mono transition"
    >
      <span translate="no" className={language === 'en' ? 'text-amber-300' : 'text-stone-500'}>EN</span>
      <span aria-hidden="true" className="text-stone-600">/</span>
      <span translate="no" className={language === 'id' ? 'text-amber-300' : 'text-stone-500'}>ID</span>
    </button>
  );
}
