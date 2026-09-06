import React from 'react';

export type EpistemicStatus = 
  | 'EMPIRICALLY SUPPORTED IN INDONESIA'
  | 'PLAUSIBLE LOCAL MECHANISM'
  | 'WESTERN / REGIONAL EXTRAPOLATION'
  | 'SPECULATIVE / UNTESTED'
  | string;

interface Props {
  status: EpistemicStatus;
  className?: string;
}

export const EpistemicBadge: React.FC<Props> = ({ status, className = '' }) => {
  let color = 'bg-stone-800 text-stone-300 border-stone-700';
  let shortLabel = status;

  const s = status.toUpperCase();

  if (s.includes('EMPIRICALLY SUPPORTED') || s.includes('EMPIRICAL')) {
    color = 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60';
    shortLabel = 'EMPIRICALLY SUPPORTED (ID)';
  } else if (s.includes('PLAUSIBLE')) {
    color = 'bg-sky-950/80 text-sky-300 border-sky-700/60';
    shortLabel = 'PLAUSIBLE LOCAL MECHANISM';
  } else if (s.includes('WESTERN') || s.includes('EXTRAPOLATION') || s.includes('REGIONAL')) {
    color = 'bg-amber-950/80 text-amber-300 border-amber-700/60';
    shortLabel = 'WESTERN / REGIONAL EXTRAPOLATION';
  } else if (s.includes('SPECULATIVE') || s.includes('UNTESTED') || s.includes('UNKNOWN')) {
    color = 'bg-rose-950/80 text-rose-300 border-rose-700/60';
    shortLabel = 'SPECULATIVE / UNTESTED IN ID';
  }

  return (
    <span 
      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono tracking-wide font-medium border uppercase ${color} ${className}`}
      title={status}
    >
      {shortLabel}
    </span>
  );
};
