import React, { useState } from 'react';
import { scaleLinear } from './chartUtils';
import { SvgLabel } from './SvgLabel';

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

const W = 760;
const H = 450;
const M = { top: 44, right: 36, bottom: 64, left: 66 };

const ACTIONS: ActionItem[] = [
  { id: 'therapy', name: 'Terapi Psikologis', xVal: 18, yPrivate: 22, yPublic: 80 },
  { id: 'skincare', name: 'Skincare & Perawatan Diri', xVal: 34, yPrivate: 18, yPublic: 70 },
  { id: 'parenting', name: 'Pengasuhan Anak', xVal: 54, yPrivate: 25, yPublic: 76 },
  { id: 'fitness', name: 'Gym / Latihan Kekuatan', xVal: 84, yPrivate: 24, yPublic: 78 },
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

  const activeId = hoveredAction ?? selectedAction;
  const activeItem = ACTIONS.find((a) => a.id === activeId) ?? ACTIONS[0];

  return (
    <div className="rounded-xl border border-stone-800 bg-stone-950 overflow-hidden">
      <header className="px-5 py-3.5 border-b border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="font-serif font-semibold text-stone-100" style={{ fontSize: 'var(--t-h3)' }}>
            Matriks Batas Keberlakuan 2×2
          </h3>
          <p className="text-stone-400 mt-0.5" style={{ fontSize: 'var(--t-small)' }}>
            Persepsi Budaya Perilaku × Tingkat Visibilitas Sosial (Brough dkk. serta White &amp; Dahl)
          </p>
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto shrink-0">
          <span className="font-mono text-stone-500 uppercase mr-1" style={{ fontSize: 'var(--t-micro)' }}>SOROTAN:</span>
          <button
            onClick={() => onToggleVisibility(false)}
            className={`px-2.5 py-1 rounded-lg font-mono transition border cursor-pointer ${
              !isPublic
                ? 'bg-sky-500 text-stone-950 font-bold border-sky-400'
                : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-stone-200'
            }`}
            style={{ fontSize: 'var(--t-micro)' }}
          >
            Privat
          </button>
          <button
            onClick={() => onToggleVisibility(true)}
            className={`px-2.5 py-1 rounded-lg font-mono transition border cursor-pointer ${
              isPublic
                ? 'bg-rose-500 text-stone-950 font-bold border-rose-400'
                : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-stone-200'
            }`}
            style={{ fontSize: 'var(--t-micro)' }}
          >
            Sorotan Publik
          </button>
        </div>
      </header>

      <div className="p-4 overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto block min-w-[620px]"
          role="img"
          aria-label="2x2 matrix plotting behaviors across cultural coding and public exposure"
        >
          <title>Matriks Batas Keberlakuan 2×2: koding budaya dan keterpaparan publik</title>
          {/* Quadrant backgrounds */}
          {/* Top-Left: Public × Feminine (Identity Threat & Protective Shield Zone) */}
          <rect
            x={M.left}
            y={M.top}
            width={midX - M.left}
            height={midY - M.top}
            fill="var(--cat-2)"
            opacity={0.09}
          />
          {/* Bottom-Left: Private × Feminine (Pragmatic Neutral Zone) */}
          <rect
            x={M.left}
            y={midY}
            width={midX - M.left}
            height={H - M.bottom - midY}
            fill="var(--ord-5)"
            opacity={0.07}
          />
          {/* Top-Right: Public × Masculine (Redundancy & Backfire Zone) */}
          <rect
            x={midX}
            y={M.top}
            width={W - M.right - midX}
            height={midY - M.top}
            fill="var(--cat-2)"
            opacity={0.06}
          />
          {/* Bottom-Right: Private × Masculine (Direct Craft Zone) */}
          <rect
            x={midX}
            y={midY}
            width={W - M.right - midX}
            height={H - M.bottom - midY}
            fill="var(--chart-muted)"
            opacity={0.05}
          />

          {/* Quadrant Descriptive Labels using bounded SvgLabel */}
          {/* Top-Left: Identity Shielding Zone */}
          <SvgLabel
            x={M.left + 12}
            y={M.top + 8}
            width={quadW - 24}
            height={18}
            tone="warn"
            size={11}
            weight={700}
          >
            Zona Perisai Identitas
          </SvgLabel>
          <SvgLabel
            x={M.left + 12}
            y={M.top + 26}
            width={quadW - 24}
            height={44}
            tone="label"
            size={9.5}
            lines={2}
          >
            Risiko sosial tinggi · Isyarat ramah-pria atau diskret menolong pembaca
          </SvgLabel>

          {/* Top-Right: Redundancy & Backfire Zone */}
          <SvgLabel
            x={midX + 14}
            y={M.top + 8}
            width={quadW - 24}
            height={18}
            tone="warn"
            size={11}
            weight={700}
          >
            Zona Redundan &amp; Bumerang
          </SvgLabel>
          <SvgLabel
            x={midX + 14}
            y={M.top + 26}
            width={quadW - 24}
            height={44}
            tone="label"
            size={9.5}
            lines={2}
          >
            Sudah dianggap maskulin · Label 'Pria Alfa' justru dicemooh sebagai hal yang canggung/berlebihan
          </SvgLabel>

          {/* Bottom-Left: Pragmatic Neutral Zone */}
          <SvgLabel
            x={M.left + 12}
            y={midY + 10}
            width={quadW - 24}
            height={18}
            tone="accent"
            size={11}
            weight={700}
          >
            Zona Netral Pragmatis
          </SvgLabel>
          <SvgLabel
            x={M.left + 12}
            y={midY + 28}
            width={quadW - 24}
            height={44}
            tone="label"
            size={9.5}
            lines={2}
          >
            Pengawasan sosial rendah · Pesan netral-gender berkinerja sama baiknya tanpa embel 'Pria Sejati'
          </SvgLabel>

          {/* Bottom-Right: Direct Craft Zone */}
          <SvgLabel
            x={midX + 14}
            y={midY + 10}
            width={quadW - 24}
            height={18}
            tone="strong"
            size={11}
            weight={700}
          >
            Zona Keahlian &amp; Tindakan Nyata
          </SvgLabel>
          <SvgLabel
            x={midX + 14}
            y={midY + 28}
            width={quadW - 24}
            height={44}
            tone="label"
            size={9.5}
            lines={2}
          >
            Fokus pada progres keahlian dan manfaat langsung yang nyata
          </SvgLabel>

          {/* Dividing Quadrant Axes */}
          <line
            x1={midX}
            y1={M.top}
            x2={midX}
            y2={H - M.bottom}
            stroke="var(--chart-grid)"
            strokeWidth={1.5}
            strokeDasharray="4 4"
          />
          <line
            x1={M.left}
            y1={midY}
            x2={W - M.right}
            y2={midY}
            stroke="var(--chart-grid)"
            strokeWidth={1.5}
            strokeDasharray="4 4"
          />

          {/* Outer Border */}
          <rect
            x={M.left}
            y={M.top}
            width={W - M.left - M.right}
            height={H - M.top - M.bottom}
            fill="none"
            stroke="var(--chart-grid)"
            strokeWidth={1}
          />

          {/* Axis Labels */}
          <text x={(M.left + W - M.right) / 2} y={H - 16} textAnchor="middle" className="chart-axis-label">
            ← Persepsi Feminin / Rentan &nbsp; · &nbsp; Kode Budaya Awal &nbsp; · &nbsp; Persepsi Maskulin →
          </text>

          <text
            x={20}
            y={(M.top + H - M.bottom) / 2}
            textAnchor="middle"
            className="chart-axis-label"
            transform={`rotate(-90 20 ${(M.top + H - M.bottom) / 2})`}
          >
            - Ruang Privat (Diskret) &nbsp; · &nbsp; Risiko Sorotan Sosial &nbsp; · &nbsp; Ruang Publik (Terbuka) +
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
                className="chart-mark-interactive"
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
                {/* Hit target area */}
                <circle cx={cx} cy={cy} r={22} fill="transparent" />

                {/* Trail line from private to public position */}
                <line
                  x1={cx}
                  y1={y(item.yPrivate)}
                  x2={cx}
                  y2={y(item.yPublic)}
                  stroke="var(--chart-grid)"
                  strokeWidth={1.5}
                  strokeDasharray="2 3"
                  opacity={active ? 0.8 : 0.4}
                />

                {/* Active halo */}
                {active && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={15}
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth={2}
                    className="animate-pulse"
                  />
                )}

                {/* Point circle */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={active ? 8 : 6}
                  fill={active ? 'var(--accent)' : 'var(--ord-5)'}
                  stroke="var(--chart-surface)"
                  strokeWidth={2}
                  className="chart-mark"
                />

                {/* Text Label */}
                <text
                  x={cx}
                  y={item.id === 'skincare' && isPublic ? cy + 20 : cy - 12}
                  textAnchor="middle"
                  className="chart-mark-label"
                  style={{
                    fill: active ? 'var(--accent)' : 'var(--chart-label-strong)',
                    fontWeight: active ? 600 : 500,
                  }}
                >
                  {item.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {activeItem && (
        <div className="px-5 py-3 border-t border-stone-800 bg-stone-900/50 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-mono text-amber-400 font-bold uppercase text-[11px]">Perilaku Terpilih:</span>
            <span className="text-stone-100 font-medium">{activeItem.name}</span>
            <span className="text-stone-500">·</span>
            <span className="text-stone-400 font-mono text-[11px]">
              {isPublic ? 'Ruang Publik (Tinggi Sorotan Sosial)' : 'Ruang Privat (Rendah Sorotan Sosial)'}
            </span>
          </div>
          <span className="font-mono text-stone-400 text-[11px]">
            Klik salah satu titik perilaku atau gunakan tombol Sorotan di atas
          </span>
        </div>
      )}

      <footer className="px-5 py-3 border-t border-stone-800 text-stone-500" style={{ fontSize: 'var(--t-micro)' }}>
        <span className="font-mono uppercase tracking-wider">Catatan Riset:</span> Matriks 2×2 ini merupakan model batas konseptual yang diadopsi dari Brough dkk. serta White &amp; Dahl untuk mengilustrasikan kapan pembingkaian maskulinitas berfungsi sebagai perisai pelindung yang diperlukan vs kapan ia menciptakan penolakan (cringe).
      </footer>
    </div>
  );
};
