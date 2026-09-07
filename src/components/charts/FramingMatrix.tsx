import React, { useState } from 'react';
import { scaleLinear } from './chartUtils';

export interface ActionItem {
  id: 'therapy' | 'skincare' | 'fitness' | 'parenting';
  name: string;
  xVal: number; // 0 = feminine/vulnerable, 50 = neutral/mixed, 100 = masculine
  yPrivate: number; // 22
  yPublic: number; // 78
}

interface Props {
  selectedAction: 'therapy' | 'skincare' | 'fitness' | 'parenting';
  isPublic: boolean;
  onSelectAction: (id: 'therapy' | 'skincare' | 'fitness' | 'parenting') => void;
  onToggleVisibility: (isPublic: boolean) => void;
}

const W = 580;
const H = 340;
const M = { top: 32, right: 28, bottom: 42, left: 42 };

const ACTIONS: ActionItem[] = [
  { id: 'therapy', name: 'Terapi Psikologis & Konseling', xVal: 18, yPrivate: 22, yPublic: 80 },
  { id: 'skincare', name: 'Skincare & Perawatan Diri', xVal: 34, yPrivate: 18, yPublic: 70 },
  { id: 'parenting', name: 'Pengasuhan Anak', xVal: 54, yPrivate: 25, yPublic: 76 },
  { id: 'fitness', name: 'Gym & Latihan Beban Fisik', xVal: 84, yPrivate: 24, yPublic: 78 },
];

export const FramingMatrix: React.FC<Props> = ({
  selectedAction,
  isPublic,
  onSelectAction,
  onToggleVisibility,
}) => {
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);

  const x = scaleLinear(0, 100, M.left, W - M.right);
  const y = scaleLinear(0, 100, H - M.bottom, M.top);

  const midX = x(50);
  const midY = y(50);
  const quadW = midX - M.left;
  const quadH = midY - M.top;

  const activeId = hoveredAction ?? selectedAction;
  const activeItem = ACTIONS.find((a) => a.id === activeId) ?? ACTIONS[0];

  // Determine which quadrant the active item currently falls into
  const activeYVal = isPublic ? activeItem.yPublic : activeItem.yPrivate;
  const isTopQuad = activeYVal >= 50;
  const isLeftQuad = activeItem.xVal <= 50;

  return (
    <div className="rounded-xl border border-stone-800 bg-stone-950/90 overflow-hidden shadow-2xl">
      {/* Header with Title & Visibility Toggle */}
      <header className="px-4 py-2.5 border-b border-stone-800 flex flex-wrap items-center justify-between gap-2 bg-stone-900/40">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-serif font-semibold text-stone-100 text-sm md:text-base">
              Matriks Konteks Komunikasi
            </h3>
            <span className="px-1.5 py-0.5 rounded font-mono text-[9.5px] uppercase tracking-wider bg-stone-800 text-stone-300 border border-stone-700">
              Interaktif
            </span>
          </div>
          <p className="text-stone-400 text-[11px] font-sans">
            Persepsi Gender × Tingkat Sorotan Sosial
          </p>
        </div>

        {/* Mode Toggle Pills */}
        <div className="flex items-center gap-1 bg-stone-950 p-0.5 rounded-lg border border-stone-800 shrink-0">
          <button
            onClick={() => onToggleVisibility(false)}
            className={`px-2.5 py-1 rounded-md font-mono text-[10px] tracking-wide transition-all cursor-pointer flex items-center gap-1.5 ${
              !isPublic
                ? 'bg-amber-600 text-bone font-semibold shadow-xs'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${!isPublic ? 'bg-bone' : 'bg-stone-600'}`} />
            Ruang Privat
          </button>
          <button
            onClick={() => onToggleVisibility(true)}
            className={`px-2.5 py-1 rounded-md font-mono text-[10px] tracking-wide transition-all cursor-pointer flex items-center gap-1.5 ${
              isPublic
                ? 'bg-amber-600 text-bone font-semibold shadow-xs'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isPublic ? 'bg-bone' : 'bg-stone-600'}`} />
            Ruang Publik
          </button>
        </div>
      </header>

      {/* SVG Canvas */}
      <div className="p-3 overflow-x-auto relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto block min-w-[500px]"
          role="img"
          aria-label="2x2 matrix plotting behaviors across cultural coding and public exposure"
        >
          <title>Matriks Batas Keberlakuan 2×2: koding budaya dan keterpaparan publik</title>

          <defs>
            {/* Ambient Warm Glow Filter */}
            <filter id="matrixAmberGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Diagonal Hatch Pattern for Active Quadrant */}
            <pattern
              id="diagonalHatch"
              width="6"
              height="6"
              patternTransform="rotate(45 0 0)"
              patternUnits="userSpaceOnUse"
            >
              <line x1="0" y1="0" x2="0" y2="6" stroke="var(--chart-grid)" strokeWidth={0.9} />
            </pattern>

            {/* Quadrant Radial Gradients for Architectural Atmosphere */}
            <radialGradient id="gradTopLeft" cx="25%" cy="25%" r="75%">
              <stop offset="0%" stopColor="#af4d28" stopOpacity="0.10" />
              <stop offset="60%" stopColor="#7c2d12" stopOpacity="0.03" />
              <stop offset="100%" stopColor="#0c0a09" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="gradTopRight" cx="75%" cy="25%" r="75%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.16" />
              <stop offset="60%" stopColor="#b91c1c" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#0c0a09" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="gradBottomLeft" cx="25%" cy="75%" r="75%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.16" />
              <stop offset="60%" stopColor="#047857" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#0c0a09" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="gradBottomRight" cx="75%" cy="75%" r="75%">
              <stop offset="0%" stopColor="#78716c" stopOpacity="0.07" />
              <stop offset="60%" stopColor="#292524" stopOpacity="0.02" />
              <stop offset="100%" stopColor="#0c0a09" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Quadrant Atmospheric Fills */}
          <rect x={M.left} y={M.top} width={quadW} height={quadH} fill="url(#gradTopLeft)" />
          <rect x={midX} y={M.top} width={W - M.right - midX} height={quadH} fill="url(#gradTopRight)" />
          <rect x={M.left} y={midY} width={quadW} height={H - M.bottom - midY} fill="url(#gradBottomLeft)" />
          <rect x={midX} y={midY} width={W - M.right - midX} height={H - M.bottom - midY} fill="url(#gradBottomRight)" />

          {/* Active Quadrant Hatch Highlight */}
          {isTopQuad && isLeftQuad && (
            <rect x={M.left} y={M.top} width={quadW} height={quadH} fill="url(#diagonalHatch)" />
          )}
          {isTopQuad && !isLeftQuad && (
            <rect x={midX} y={M.top} width={W - M.right - midX} height={quadH} fill="url(#diagonalHatch)" />
          )}
          {!isTopQuad && isLeftQuad && (
            <rect x={M.left} y={midY} width={quadW} height={H - M.bottom - midY} fill="url(#diagonalHatch)" />
          )}
          {!isTopQuad && !isLeftQuad && (
            <rect x={midX} y={midY} width={W - M.right - midX} height={H - M.bottom - midY} fill="url(#diagonalHatch)" />
          )}

          {/* Outer Border & Fine Grid Lines */}
          <rect
            x={M.left}
            y={M.top}
            width={W - M.left - M.right}
            height={H - M.top - M.bottom}
            fill="none"
            stroke="var(--chart-grid)"
            strokeWidth={1}
            rx={4}
          />

          {/* Center Crosshair Hairline Axes */}
          <line
            x1={M.left}
            y1={midY}
            x2={W - M.right}
            y2={midY}
            stroke="var(--chart-axis)"
            strokeWidth={1}
            strokeDasharray="3 3"
          />
          <line
            x1={midX}
            y1={M.top}
            x2={midX}
            y2={H - M.bottom}
            stroke="var(--chart-axis)"
            strokeWidth={1}
            strokeDasharray="3 3"
          />

          {/* Center Nexus Dot with Rings */}
          <circle cx={midX} cy={midY} r={7} fill="none" stroke="var(--chart-axis)" strokeWidth={1} />
          <circle cx={midX} cy={midY} r={2} fill="var(--chart-axis)" />

          {/* Quadrant Labels with Minimal Architectural Typography */}
          {/* Top-Left: Identity Protection Zone */}
          <g transform={`translate(${M.left + 10}, ${M.top + 8})`}>
            <text className="font-mono text-[9.5px] uppercase font-bold tracking-wider fill-stone-300">
              ZONA PERLINDUNGAN IDENTITAS
            </text>
            <text y={13} className="font-sans text-[8.5px] fill-stone-400">
              Risiko sosial tinggi · Isyarat yang terasa aman bagi pria dapat membantu
            </text>
          </g>

          {/* Top-Right: Redundancy & Backfire */}
          <g transform={`translate(${midX + 10}, ${M.top + 8})`}>
            <text className="font-mono text-[9.5px] uppercase font-bold tracking-wider fill-rose-400">
              ZONA BERLEBIHAN &amp; BISA BERBALIK ARAH
            </text>
            <text y={13} className="font-sans text-[8.5px] fill-stone-400">
              Sudah dianggap maskulin · Penegasan maskulinitas justru bisa terasa berlebihan
            </text>
          </g>

          {/* Bottom-Left: Safe Pragmatic Zone */}
          <g transform={`translate(${M.left + 10}, ${midY + 12})`}>
            <text className="font-mono text-[9.5px] uppercase font-bold tracking-wider fill-emerald-400">
              ZONA NETRAL &amp; PRAKTIS
            </text>
            <text y={13} className="font-sans text-[8.5px] fill-stone-400">
              Relatif aman dan privat · Tidak perlu penegasan maskulinitas yang kuat
            </text>
          </g>

          {/* Bottom-Right: Direct Action Zone */}
          <g transform={`translate(${midX + 10}, ${midY + 12})`}>
            <text className="font-mono text-[9.5px] uppercase font-bold tracking-wider fill-stone-300">
              ZONA AKSI LANGSUNG
            </text>
            <text y={13} className="font-sans text-[8.5px] fill-stone-400">
              Berorientasi tindakan · Fokus pada instruksi dan keterampilan praktis
            </text>
          </g>

          {/* Axis Labels */}
          <text
            x={(M.left + W - M.right) / 2}
            y={H - 12}
            textAnchor="middle"
            className="font-mono text-[9px] uppercase tracking-wider fill-stone-500"
          >
            ← DIANGGAP FEMININ / RENTAN &nbsp; · &nbsp; PERSEPSI BUDAYA &nbsp; · &nbsp; DIANGGAP MASKULIN →
          </text>

          <text
            x={14}
            y={(M.top + H - M.bottom) / 2}
            textAnchor="middle"
            className="font-mono text-[9px] uppercase tracking-wider fill-stone-500"
            transform={`rotate(-90 14 ${(M.top + H - M.bottom) / 2})`}
          >
            PRIVAT · MINIM SOROTAN &nbsp; · &nbsp; TINGKAT SOROTAN SOSIAL &nbsp; · &nbsp; PUBLIK · BANYAK SOROTAN
          </text>

          {/* Plotted Action Nodes */}
          {ACTIONS.map((item) => {
            const currentYVal = isPublic ? item.yPublic : item.yPrivate;
            const cx = x(item.xVal);
            const cy = y(currentYVal);
            const isSelected = selectedAction === item.id;
            const isHovered = hoveredAction === item.id;
            const active = isSelected || isHovered;

            return (
              <g
                key={item.id}
                className="chart-mark-interactive cursor-pointer outline-none focus:outline-none"
                onMouseEnter={() => setHoveredAction(item.id)}
                onMouseLeave={() => setHoveredAction(null)}
                onClick={() => onSelectAction(item.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectAction(item.id);
                  }
                }}
                aria-label={`${item.name}, ${isPublic ? 'Public' : 'Private'}`}
              >
                {/* Hit Target Area */}
                <circle cx={cx} cy={cy} r={24} fill="transparent" className="outline-none focus:outline-none" />

                {/* Active Ambient Glow Aura */}
                {active && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={18}
                    fill="rgba(175, 77, 40, 0.2)"
                    filter="url(#matrixAmberGlow)"
                  />
                )}

                {/* Outer Ring on Active */}
                {active && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={12}
                    fill="none"
                    stroke="#af4d28"
                    strokeWidth={1.2}
                    strokeDasharray="3 2"
                    className="animate-spin-slow"
                  />
                )}

                {/* Main Node Dot */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={active ? 6.5 : 4.5}
                  fill={active ? '#af4d28' : '#893412'}
                  stroke="#0c0a09"
                  strokeWidth={2}
                />

                {/* Text Label */}
                <text
                  x={cx}
                  y={isPublic ? cy - 14 : cy + 18}
                  textAnchor="middle"
                  className={`font-sans text-[10.5px] select-none ${
                    active
                      ? 'fill-stone-100 font-bold'
                      : 'fill-stone-300 font-medium'
                  }`}
                  style={{
                    textShadow: active ? '0 1px 4px rgba(0,0,0,0.5)' : 'none',
                  }}
                >
                  {item.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Footer Status Bar with Active Context */}
      <footer className="px-3.5 py-2 border-t border-stone-800 bg-stone-900/60 flex flex-wrap items-center justify-between gap-2 text-[11px] font-sans">
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-stone-400 font-bold uppercase text-[10px]">Aktif:</span>
          <span className="text-stone-100 font-semibold">{activeItem.name}</span>
          <span className="text-stone-500">·</span>
          <span className="text-stone-300 font-mono text-[10.5px]">
            {isPublic ? 'Ruang Publik (Banyak Sorotan)' : 'Ruang Privat (Minim Sorotan)'}
          </span>
        </div>
        <span className="text-[10px] text-stone-500 font-mono hidden sm:inline">
          Klik titik perilaku untuk mengeksplorasi
        </span>
      </footer>
    </div>
  );
};
