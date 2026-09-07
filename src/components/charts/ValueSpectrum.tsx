import React, { useState } from 'react';
import type { BrandValue } from '../../types';
import { scaleLinear } from './chartUtils';
import { SvgLabel } from './SvgLabel';

const W = 680;
const ROW = 38;
const M = { top: 30, right: 164, bottom: 24, left: 164 };

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

  return (
    <div className="rounded-xl border border-stone-800 bg-stone-950/90 overflow-hidden shadow-2xl">
      {/* Sleek Compact Header */}
      <header className="px-4 py-2.5 border-b border-stone-800 flex flex-wrap items-center justify-between gap-2 bg-stone-900/40">
        <div className="flex items-center gap-2">
          <h3 className="font-serif font-semibold text-stone-100 text-sm md:text-base">
            Posisi Gaya Komunikasi Menungsa
          </h3>
          <span className="px-1.5 py-0.5 rounded font-mono text-[9.5px] uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
            Pilihan Sikap Editorial
          </span>
        </div>
        <p className="text-stone-400 text-[11px] font-sans">
          6 Posisi Terpilih pada Skala Ordinal 1–5
        </p>
      </header>

      {/* SVG Canvas */}
      <div className="p-3 overflow-x-auto relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto block min-w-[580px]"
          role="img"
          aria-label="Six brand values plotted as chosen positions on ordinal one to five tracks"
        >
          <title>Menungsa voice positions across six value dimensions</title>

          <defs>
            {/* Ambient Warm Glow Filter */}
            <filter id="spectrumGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Glowing Span Linear Gradient */}
            <linearGradient id="spectrumBarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#78350f" stopOpacity="0.6" />
              <stop offset="60%" stopColor="#d97706" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="1" />
            </linearGradient>

            <linearGradient id="inactiveBarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#44403c" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#78716c" stopOpacity="0.6" />
            </linearGradient>
          </defs>

          {/* Grid lines for 1..5 ticks */}
          <g className="chart-grid">
            {[1, 2, 3, 4, 5].map((v) => (
              <line
                key={v}
                x1={x(v)}
                y1={M.top - 8}
                x2={x(v)}
                y2={H - M.bottom + 2}
                stroke="rgba(255, 255, 255, 0.06)"
                strokeWidth={1}
                strokeDasharray="2 3"
              />
            ))}
          </g>

          {/* Scale Axis Numbers */}
          {[1, 2, 3, 4, 5].map((v) => (
            <text
              key={`t${v}`}
              x={x(v)}
              y={M.top - 14}
              textAnchor="middle"
              className="font-mono text-[9px] font-semibold fill-stone-500"
            >
              {v}
            </text>
          ))}

          {/* Value Tracks */}
          {values.map((v, i) => {
            const y = M.top + i * ROW + ROW / 2;
            const isActive = active === v.id;
            const dim = active && !isActive ? 0.32 : 1;
            const cx = x(v.spectrum.position);

            return (
              <g
                key={v.id}
                className="chart-mark-interactive cursor-pointer"
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
                aria-label={`${v.value}: ${v.spectrum.leftPole} to ${v.spectrum.rightPole}, positioned at ${v.spectrum.position} of 5`}
              >
                {/* Hit Box */}
                <rect x={0} y={y - ROW / 2} width={W} height={ROW} fill="transparent" />

                {/* Active Row Background Highlight */}
                {isActive && (
                  <rect
                    x={M.left - 8}
                    y={y - ROW / 2 + 3}
                    width={W - M.left - M.right + 16}
                    height={ROW - 6}
                    fill="rgba(245, 158, 11, 0.07)"
                    rx={6}
                  />
                )}

                {/* Left & Right Poles Labels */}
                <g opacity={dim}>
                  <SvgLabel
                    x={4}
                    y={y - ROW / 2 + 5}
                    width={M.left - 16}
                    height={ROW - 10}
                    align="end"
                    tone="strong"
                    size={10}
                    lines={2}
                  >
                    {ID_POLES[v.id]?.left || v.spectrum.leftPole}
                  </SvgLabel>
                  <SvgLabel
                    x={W - M.right + 10}
                    y={y - ROW / 2 + 5}
                    width={M.right - 14}
                    height={ROW - 10}
                    tone="strong"
                    size={10}
                    lines={2}
                  >
                    {ID_POLES[v.id]?.right || v.spectrum.rightPole}
                  </SvgLabel>
                </g>

                {/* Base Track Runway (unclaimed portion) */}
                <line
                  x1={cx}
                  y1={y}
                  x2={x(5)}
                  y2={y}
                  stroke="rgba(255, 255, 255, 0.12)"
                  strokeWidth={isActive ? 3.5 : 2.5}
                  strokeLinecap="round"
                  opacity={dim}
                />

                {/* Chosen Position Range Fill (glowing amber) */}
                <line
                  x1={x(1)}
                  y1={y}
                  x2={cx}
                  y2={y}
                  stroke={isActive ? 'url(#spectrumBarGrad)' : 'url(#inactiveBarGrad)'}
                  strokeWidth={isActive ? 4.5 : 3}
                  strokeLinecap="round"
                  opacity={dim}
                />

                {/* Scale Pips along the track */}
                {[1, 2, 3, 4, 5].map((pip) => (
                  <circle
                    key={`pip-${pip}`}
                    cx={x(pip)}
                    cy={y}
                    r={1.5}
                    fill={pip <= v.spectrum.position ? '#f59e0b' : 'rgba(255, 255, 255, 0.25)'}
                    opacity={dim}
                  />
                ))}

                {/* Active Node Ambient Glow Aura */}
                {isActive && (
                  <circle
                    cx={cx}
                    cy={y}
                    r={14}
                    fill="rgba(245, 158, 11, 0.25)"
                    filter="url(#spectrumGlow)"
                  />
                )}

                {/* Active Outer Pulsing Ring */}
                {isActive && (
                  <circle
                    cx={cx}
                    cy={y}
                    r={9.5}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth={1.2}
                    strokeDasharray="2 2"
                    className="animate-spin-slow"
                  />
                )}

                {/* Chosen Position Node Mark */}
                <circle
                  cx={cx}
                  cy={y}
                  r={isActive ? 6 : 4.5}
                  fill={isActive ? '#f59e0b' : '#d97706'}
                  stroke="#0c0a09"
                  strokeWidth={2}
                  opacity={dim}
                />

                {/* Title Badge above the point */}
                <text
                  x={cx}
                  y={y - 9}
                  textAnchor="middle"
                  className="font-sans text-[10px] select-none"
                  opacity={dim}
                  style={{
                    fill: isActive ? '#fef3c7' : '#a8a29e',
                    fontWeight: isActive ? 700 : 500,
                  }}
                >
                  {ID_POLES[v.id]?.title.split(',')[0].replace(' untuk Memulai', '').replace(' yang Masuk Akal', '') || v.value}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Active Position Rationale Drawer */}
      {activeValue && (
        <div className="px-4 py-2.5 border-t border-stone-800 bg-stone-900/50 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 text-xs font-sans">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="font-serif font-semibold text-amber-400 text-sm">
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
        <span>KESEPAKATAN EDITORIAL MENUNGSA</span>
        <span className="text-stone-400 hidden sm:inline">SKALA ORDINAL 1–5</span>
      </footer>
    </div>
  );
};
