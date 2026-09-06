import React from 'react';
import { getSourceTitle } from '../../data';
import { useLanguage } from '../../i18n/context';
import { translate } from '../../i18n/translate';

/**
 * Renders prose that contains S01-S14 markers, giving each one its document title on hover.
 *
 * The wrapper carries translate="no" and localises the string itself, because the text
 * has to be split after translation rather than before: splitting first would hand the
 * runtime fragments it has no dictionary entry for and send them down the phrase-level
 * fallback. The ids themselves are never rewritten.
 */
export const SourceCitations: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  const { language } = useLanguage();
  const localized = translate(text, language);
  const parts = localized.split(/(\bS\d{2}\b)/g);

  return (
    <span translate="no" className={className}>
      {parts.map((part, i) => {
        const title = /^S\d{2}$/.test(part) ? getSourceTitle(part) : undefined;
        if (!title) return <React.Fragment key={i}>{part}</React.Fragment>;
        return (
          <abbr
            key={i}
            title={title}
            className="font-mono text-stone-400 no-underline border-b border-dotted border-stone-600 cursor-help"
          >
            {part}
          </abbr>
        );
      })}
    </span>
  );
};
