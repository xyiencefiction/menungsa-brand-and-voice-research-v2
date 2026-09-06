import React from 'react';
import { glossary } from '../../data';

/**
 * A term the site keeps, with a plain-language definition attached.
 *
 * The choice here is to gloss rather than to simplify. Rewriting the surrounding prose
 * into everyday words was the alternative, and it loses the distinctions the whole
 * corpus exists to protect: promising is not moderate, and an effect that is real is
 * not therefore large. So the sentence stays exact and the term explains itself.
 */
export const Term: React.FC<{ id: string; children?: React.ReactNode }> = ({ id, children }) => {
  const entry = glossary.find((g) => g.id === id);
  if (!entry) return <>{children}</>;
  return (
    <abbr
      title={entry.plain}
      className="no-underline border-b border-dotted border-stone-500 cursor-help"
    >
      {children ?? entry.term}
    </abbr>
  );
};
