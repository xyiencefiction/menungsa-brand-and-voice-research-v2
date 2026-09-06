import React from 'react';

interface Props {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  monochrome?: boolean;
}

/**
 * MenungsaWordmark — Master wordmark resmi Menungsa sesuai DESIGN.md §6.1 & §6.2.
 * 
 * Formula:
 * - 'm' + ';' + 'en' set in Archivo (wght 900, wdth 125)
 * - 'ungsa' set in Crimson Pro Light (wght 300) dengan ukuran 1.25x dari ukuran Archivo
 * - Shared baseline, kedua segmen bertumpu pada garis dasar optis yang sama.
 * - Semicolon rule: orange (#AF4D28) pada latar terang, bone (#F1ECDF) monokrom pada latar gelap.
 */
export const MenungsaWordmark: React.FC<Props> = ({
  className = '',
  size = 'md',
  monochrome = false,
}) => {
  const sizeClasses = {
    sm: 'text-sm leading-none',
    md: 'text-base sm:text-lg leading-none',
    lg: 'text-xl sm:text-2xl leading-none',
    xl: 'text-3xl sm:text-4xl leading-none',
  }[size];

  return (
    <span
      className={`inline-flex items-baseline tracking-normal select-none ${sizeClasses} ${className}`}
      aria-label="Menungsa"
    >
      {/* Archivo 900/125 section: m;en */}
      <span
        className={`font-logo font-black lowercase ${
          monochrome
            ? 'text-[#F1ECDF]'
            : 'text-[#2E4034] dark:text-[#F1ECDF]'
        }`}
      >
        <span>m</span>
        {/* Semicolon Suicide-Prevention Mark: Orange on Light, Bone on Dark */}
        <span
          className={`${
            monochrome
              ? 'text-[#F1ECDF]'
              : 'text-[#AF4D28] dark:text-[#F1ECDF]'
          } font-black px-[0.5px]`}
          title="Simbol Titik Koma — Komitmen Pencegahan Bunuh Diri"
        >
          ;
        </span>
        <span>en</span>
      </span>

      {/* Crimson Pro 300 Light section: ungsa (scaled 1.25x) */}
      <span
        className={`font-serif font-light lowercase ${
          monochrome
            ? 'text-[#F1ECDF]'
            : 'text-[#2E4034] dark:text-[#F1ECDF]'
        }`}
        style={{ fontSize: '1.25em', marginLeft: '-0.02em' }}
      >
        ungsa
      </span>
    </span>
  );
};
