import React, { useState } from 'react';
import type { BrandValue } from '../../types';
import { scaleLinear } from './chartUtils';
import { SvgLabel } from './SvgLabel';

const W = 680;
const ROW = 44;
const M = { top: 32, right: 154, bottom: 24, left: 154 };

interface Props {
  values: BrandValue[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

const ID_POLES: Record<string, { title: string; left: string; right: string; dimension: string; positionNote: string }> = {
  V1: {
    title: 'Kesetaraan, Bukan Penghakiman',
    left: 'Menilai pembaca',
    right: 'Menyapa setara',
    dimension: 'Bagaimana pembaca disapa',
    positionNote: 'Satu-satunya nilai mutlak tanpa kompromi. Menukarnya demi interaksi sesaat merusak rasa aman pembaca.'
  },
  V2: {
    title: 'Rendah Hambatan untuk Memulai',
    left: 'Berat untuk dimulai',
    right: 'Mudah untuk dimulai',
    dimension: 'Biaya merespons komunikasi',
    positionNote: 'Pria menghindari rasa malu dan sorotan publik. Turunkan biaya memulai sekecil mungkin.'
  },
  V3: {
    title: 'Satu Langkah Nyata yang Masuk Akal',
    left: 'Dorongan yang umum',
    right: 'Langkah yang nyata',
    dimension: 'Bentuk ajakan bertindak',
    positionNote: 'Tawarkan tindakan nyata yang terjangkau untuk memulihkan kedaulatan diri (agency).'
  },
  V4: {
    title: 'Mulai dari yang Tampak Nyata',
    left: 'Label/perasaan dulu',
    right: 'Situasi nyata dulu',
    dimension: 'Urutan penyampaian emosi',
    positionNote: 'Deskripsi situasi fisik memungkinkan emosi hadir secara alami tanpa merasa dihakimi.'
  },
  V5: {
    title: 'Jujur & Terbuka tentang Batasan',
    left: 'Kepastian mutlak',
    right: 'Kepastian sesuai bukti',
    dimension: 'Derajat kepastian klaim',
    positionNote: 'Jujur terhadap ketidakpastian ilmiah; batasi klaim pada bukti yang dapat diverifikasi.'
  },
  V6: {
    title: 'Tindakan Nyata, Bukan Tuntutan Moral',
    left: 'Menuntut berubah',
    right: 'Tindakan & bukti nyata',
    dimension: 'Arah tuntutan perubahan',
    positionNote: 'Fokus pada pembenahan sistem dan kondisi lingkungan, bukan menuduh karakter pembaca.'
  }
};

export const ValueSpectrum: React.FC<Props> = ({ values, selectedId, onSelect }) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const H = M.top + values.length * ROW + M.bottom;
  const x = scaleLinear(1, 5, M.left, W - M.right);
  const active = hovered ?? selectedId ?? null;
  const activeValue = values.find((v) => v.id === active);

  const trackWidth = W - M.left - M.right;

  return (
    <div className="rounded-xl border border-stone-800 bg-stone-950/90 overflow-hidden shadow-2xl">
      {/* Sleek Compact Header */}
      <header className="px-4 py-2.5 border-b border-stone-800 flex flex-wrap items-center justify-between gap-2 bg-stone-900/40">
        <div className="flex items-center gap-2">
          <h3 className="font-serif font-semibold text-stone-100 text-sm md:text-base">
            Posisi Gaya Komunikasi Menungsa
          </h3>
          <span className="px-1.5 py-0.5 rounded font-mono text-[9.5px] uppercase tracking-wider bg-stone-800 text-stone-300 border border-stone-700">
            Pita Spektrum Nilai
          </span>
        </div>
        <p className="text-stone-400 text-[11px] font-sans">
          Spektrum Berkelanjutan Antarkutub Nilai
        </p>
      </header>

      {/* SVG Canvas */}
      <div className="p-3 overflow-x-auto relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto block min-w-[580px]"
          role="img"
          aria-label="Six brand values plotted as chosen positions on continuous spectral ribbons"
        >
          <title>Menungsa voice positions across continuous value spectrums</title>

          <defs>
            {/* Diffuse glow filter for active spectrometer needle */}
            <filter id="spectroNeedleGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Continuous Orange to Green Spectrum Gradient: Menungsa Orange (#AF4D28) to Menungsa Green (#2E4034) */}
            <linearGradient id="spectrumOrangeToGreen" gradientUnits="userSpaceOnUse" x1={M.left} y1="0" x2={W - M.right} y2="0">
              <stop offset="0%" stopColor="#AF4D28" />
              <stop offset="35%" stopColor="#C4733E" />
              <stop offset="70%" stopColor="#5D7A68" />
              <stop offset="100%" stopColor="#2E4034" />
            </linearGradient>

            {/* Subtle Spectrometer Slit Pattern */}
            <pattern id="spectroGrating" width="8" height="12" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="12" stroke="rgba(0, 0, 0, 0.35)" strokeWidth="1" />
            </pattern>
          </defs>

          {/* Precision Spectrometer Reference Scale Grid Lines */}
          <g className="chart-grid">
            {[1, 2, 3, 4, 5].map((v) => (
              <line
                key={v}
                x1={x(v)}
                y1={M.top - 6}
                x2={x(v)}
                y2={H - M.bottom + 2}
                stroke="var(--chart-grid)"
                strokeWidth={1}
                strokeDasharray="2 3"
                opacity={0.35}
              />
            ))}
          </g>

          {/* Value Spectrum Rows */}
          {values.map((v, i) => {
            const y = M.top + i * ROW + ROW / 2;
            const isActive = active === v.id;
            const dim = active && !isActive ? 0.32 : 1;
            const cx = x(v.spectrum.position);
            const ribbonHeight = 12;
            const ribbonY = y - ribbonHeight / 2;

            return (
              <g
                key={v.id}
                className="chart-mark-interactive cursor-pointer outline-none focus:outline-none"
                onMouseEnter={() => setHovered(v.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => onSelect(v.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelect(v.id);
                  }
                }}
                aria-label={`${v.value}: ${v.spectrum.leftPole} to ${v.spectrum.rightPole}, posisi ${v.spectrum.position} dari 5`}
              >
                {/* Invisible Hit Area */}
                <rect x={0} y={y - ROW / 2} width={W} height={ROW} fill="transparent" className="outline-none focus:outline-none" />

                {/* Active Row Ambient Glow Backdrop */}
                {isActive && (
                  <rect
                    x={M.left - 6}
                    y={y - ROW / 2 + 2}
                    width={trackWidth + 12}
                    height={ROW - 4}
                    fill="rgba(175, 77, 40, 0.08)"
                    rx={6}
                  />
                )}

                {/* Left Pole Label (Muted state to avoid) */}
                <g opacity={dim}>
                  <SvgLabel
                    x={4}
                    y={y - ROW / 2}
                    width={M.left - 14}
                    height={ROW}
                    align="end"
                    tone="label"
                    size={9.5}
                    lines={2}
                  >
                    {ID_POLES[v.id]?.left || v.spectrum.leftPole}
                  </SvgLabel>
                </g>

                {/* Empty / Muted Gray Track for Full 1-5 Continuum */}
                <rect
                  x={M.left}
                  y={ribbonY}
                  width={trackWidth}
                  height={ribbonHeight}
                  rx={ribbonHeight / 2}
                  fill="rgba(120, 113, 108, 0.18)"
                  stroke="rgba(120, 113, 108, 0.28)"
                  strokeWidth={0.8}
                />

                {/* Active Colored Ribbon Filled Only Up to Position (e.g. 4/5 fills up to point 4, remainder is gray) */}
                <rect
                  x={M.left}
                  y={ribbonY}
                  width={Math.max(ribbonHeight, cx - M.left)}
                  height={ribbonHeight}
                  rx={ribbonHeight / 2}
                  fill="url(#spectrumOrangeToGreen)"
                  opacity={isActive ? 1 : 0.6}
                />

                {/* Optical Grating Hash Overlay on Filled Portion */}
                <rect
                  x={M.left}
                  y={ribbonY}
                  width={Math.max(ribbonHeight, cx - M.left)}
                  height={ribbonHeight}
                  rx={ribbonHeight / 2}
                  fill="url(#spectroGrating)"
                  opacity={isActive ? 0.35 : 0.15}
                />

                {/* Right Pole Label (Recommended approach) */}
                <g opacity={dim}>
                  <SvgLabel
                    x={W - M.right + 10}
                    y={y - ROW / 2}
                    width={M.right - 14}
                    height={ROW}
                    tone="strong"
                    size={9.5}
                    lines={2}
                  >
                    {ID_POLES[v.id]?.right || v.spectrum.rightPole}
                  </SvgLabel>
                </g>

                {/* Spectrometer Cursor: Precision Vertical Needle & Pip at Target Position */}
                <g opacity={dim}>
                  {/* Subtle Needle Trail */}
                  <line
                    x1={cx}
                    y1={ribbonY - 4}
                    x2={cx}
                    y2={ribbonY + ribbonHeight + 4}
                    stroke={isActive ? 'var(--chart-label-strong)' : 'var(--chart-axis)'}
                    strokeWidth={isActive ? 1.5 : 1}
                  />

                  {/* Top Pointer Notch */}
                  <path
                    d={`M ${cx - 3.5} ${ribbonY - 4} L ${cx + 3.5} ${ribbonY - 4} L ${cx} ${ribbonY} Z`}
                    fill={isActive ? 'var(--chart-label-strong)' : 'var(--chart-axis)'}
                  />

                  {/* Active Indicator Pip in Center of Ribbon */}
                  {isActive && (
                    <circle
                      cx={cx}
                      cy={ribbonY + ribbonHeight / 2}
                      r={7}
                      fill="rgba(175, 77, 40, 0.25)"
                      filter="url(#spectroNeedleGlow)"
                    />
                  )}
                  <circle
                    cx={cx}
                    cy={ribbonY + ribbonHeight / 2}
                    r={isActive ? 4.5 : 3.5}
                    fill="var(--chart-surface)"
                    stroke="var(--chart-label-strong)"
                    strokeWidth={1.8}
                  />
                </g>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Active Position Rationale Drawer */}
      {activeValue && (
        <div className="px-4 py-2.5 border-t border-stone-800 bg-stone-900/50 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 text-xs font-sans">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="font-serif font-semibold text-stone-100 text-sm">
              {ID_POLES[activeValue.id]?.title || activeValue.value}
            </span>
            <span className="text-stone-400 text-[11px]">
              ({ID_POLES[activeValue.id]?.dimension || activeValue.spectrum.dimension})
            </span>
          </div>
          <p className="text-stone-300 text-[11.5px] leading-relaxed max-w-xl">
            {ID_POLES[activeValue.id]?.positionNote || activeValue.spectrum.positionNote}
          </p>
        </div>
      )}

      {/* Footer */}
      <footer className="px-4 py-1.5 border-t border-stone-800 text-stone-500 text-[10px] font-mono flex items-center justify-between">
        <span>KOMITMEN SPEKTRUM EDITORIAL MENUNGSA</span>
        <span className="text-stone-400 hidden sm:inline">KONTINUUM BERKELANJUTAN</span>
      </footer>
    </div>
  );
};
