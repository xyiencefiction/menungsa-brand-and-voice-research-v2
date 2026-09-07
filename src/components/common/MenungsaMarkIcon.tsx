import React from 'react';

interface Props {
  size?: number;
  className?: string;
  monochrome?: boolean;
}

/**
 * MenungsaMarkIcon — Ikon resmi ligatur m; dengan simbol titik koma
 * pencegahan bunuh diri sesuai DESIGN.md §6.1 & §6.2.
 * 
 * Aturan Warna Dua Kasus (§6.1):
 * - Light ground: m berwarna green (#2E4034), titik koma berwarna orange (#AF4D28)
 * - Dark ground: monochrome bone (#F1ECDF)
 */
export const MenungsaMarkIcon: React.FC<Props> = ({
  size = 32,
  className = '',
  monochrome = false,
}) => {
  const [hasError, setHasError] = React.useState(false);

  if (!hasError) {
    return (
      <img
        src="/brand/menungsa-mark.png"
        alt="Menungsa Mark"
        width={size}
        height={size}
        onError={() => setHasError(true)}
        style={{ width: `${size}px`, height: `${size}px` }}
        className={`rounded-[7px] shrink-0 border border-stone-800/80 shadow-xs object-cover select-none ${className}`}
      />
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label="Menungsa Mark"
    >
      <rect
        width="36"
        height="36"
        rx="8"
        className="fill-[#F1ECDF] border border-[#DDD6C4]"
      />
      <g className={monochrome ? 'fill-[#17243D]' : 'fill-[#2E4034]'}>
        <rect x="7" y="14" width="4" height="13" rx="1" />
        <rect x="15" y="14" width="4" height="13" rx="1" />
        <path d="M7 17C7 14 9.5 12 13 12C16.5 12 19 14 19 17" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" className={monochrome ? 'stroke-[#17243D]' : 'stroke-[#2E4034]'} />
        <path d="M15 17C15 14 17.5 12 21 12C23.5 12 25.5 13.2 26.5 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" className={monochrome ? 'stroke-[#17243D]' : 'stroke-[#2E4034]'} />
      </g>
      <g className={monochrome ? 'fill-[#17243D]' : 'fill-[#AF4D28]'}>
        <circle cx="26.5" cy="15.5" r="2.2" />
        <path d="M28.5 21C28.5 22.3 27.5 23.4 26.2 23.4C25 23.4 24.2 22.5 24.2 21.2C24.2 20 25.1 19 26.3 19C27.6 19 28.5 19.9 28.5 21ZM26.2 23.4C26.2 24.8 24.8 26.2 23.5 27L24.8 28C26.8 26.8 28.5 24.8 28.5 22.5L26.2 23.4Z" />
      </g>
    </svg>
  );
};

