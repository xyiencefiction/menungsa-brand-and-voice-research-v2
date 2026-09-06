import React from 'react';
import { ConfidenceTag } from './ConfidenceTag';
import { FlaskConical } from 'lucide-react';

/**
 * The label every piece of sample copy on this site must carry.
 *
 * The corpus contains zero randomised wording experiments on Indonesian men, so no
 * sentence written here is tested copy. The badge pairs that statement with the
 * normalised confidence tier of the mechanism behind it, because those are two
 * different claims: the mechanism may be well evidenced while the wording is not.
 */
export const IllustrativeBadge: React.FC<{ tier: string; className?: string }> = ({ tier, className = '' }) => (
  <span className={`inline-flex flex-wrap items-center gap-2 ${className}`}>
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border font-mono uppercase tracking-wider font-medium"
      style={{
        borderColor: 'var(--cat-2)',
        color: 'var(--cat-2)',
        fontSize: 'var(--t-micro)',
      }}
      title="No sentence here has been tested on Indonesian men. Use it as briefing material, not as approved copy."
    >
      <FlaskConical size={12} />
      Illustrative application
    </span>
    <ConfidenceTag confidence={tier} />
  </span>
);
