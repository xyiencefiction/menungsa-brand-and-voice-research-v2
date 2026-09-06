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
      {/* Container background rounded 8px */}
      <rect
        width="36"
        height="36"
        rx="8"
        className="fill-stone-900 border border-stone-800"
      />

      {/* Two-stem 'm' left shoulder and stems (Archivo 900 weight style) */}
      <g className={monochrome ? 'fill-[#F1ECDF]' : 'fill-[#2E4034] dark:fill-[#F1ECDF]'}>
        {/* Left vertical stem */}
        <rect x="7" y="14" width="4" height="13" rx="1" />
        {/* Middle vertical stem */}
        <rect x="15" y="14" width="4" height="13" rx="1" />
        {/* Left arch connecting stem 1 & 2 */}
        <path d="M7 17C7 14 9.5 12 13 12C16.5 12 19 14 19 17" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" className={monochrome ? 'stroke-[#F1ECDF]' : 'stroke-[#2E4034] dark:stroke-[#F1ECDF]'} />
        {/* Right arch connecting to semicolon stem */}
        <path d="M15 17C15 14 17.5 12 21 12C23.5 12 25.5 13.2 26.5 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" className={monochrome ? 'stroke-[#F1ECDF]' : 'stroke-[#2E4034] dark:stroke-[#F1ECDF]'} />
      </g>

      {/* Semicolon — The suicide prevention mark (replaces 3rd stem of m) */}
      <g className={monochrome ? 'fill-[#F1ECDF]' : 'fill-[#AF4D28] dark:fill-[#F1ECDF]'}>
        {/* Dot (full circle) */}
        <circle cx="26.5" cy="15.5" r="2.2" />
        {/* Comma (heavy teardrop comma) */}
        <path d="M28.5 21C28.5 22.3 27.5 23.4 26.2 23.4C25 23.4 24.2 22.5 24.2 21.2C24.2 20 25.1 19 26.3 19C27.6 19 28.5 19.9 28.5 21ZM26.2 23.4C26.2 24.8 24.8 26.2 23.5 27L24.8 28C26.8 26.8 28.5 24.8 28.5 22.5L26.2 23.4Z" />
      </g>
    </svg>
  );
};
