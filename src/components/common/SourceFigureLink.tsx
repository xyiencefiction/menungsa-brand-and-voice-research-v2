import React from 'react';
import { Image } from 'lucide-react';
import type { FigureInfo } from './FigureModal';

/**
 * The demoted link to a figure that now has an interactive equivalent on the page.
 *
 * The static figures are the version that appears in the printed synthesis, so they are
 * kept for provenance. What changed is their weight: while a page had only a modal
 * button, the button read as where the content lived. Beside a live chart it should
 * read as a citation, which is what it is.
 */
export const SourceFigureLink: React.FC<{
  figure: FigureInfo;
  onOpenFigure: (fig: FigureInfo) => void;
  className?: string;
}> = ({ figure, onOpenFigure, className = '' }) => (
  <button
    onClick={() => onOpenFigure(figure)}
    className={`inline-flex items-center gap-1.5 text-stone-500 hover:text-stone-300 underline decoration-dotted underline-offset-4 transition ${className}`}
    style={{ fontSize: 'var(--t-micro)' }}
    title={figure.title}
  >
    <Image size={12} />
    <span>Original static figure {figure.number}</span>
  </button>
);
