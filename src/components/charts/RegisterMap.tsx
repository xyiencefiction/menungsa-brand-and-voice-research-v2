import React, { useState } from 'react';
import type { LanguageRegister } from '../../types';
import { scaleLinear, jitter } from './chartUtils';

interface Props {
  registers: LanguageRegister[];
  selectedId: string;
  onSelect: (id: string) => void;
  /** Optionally dim registers a given speaker is not licensed to use. */
  licensedIds?: string[];
}

const W = 620;
const H = 440;
const M = { top: 52, right: 34, bottom: 54, left: 62 };

/**
 * Registers by authority against intimacy.
 *
 * Both numbers already existed on every register and were rendered as the strings
 * "4 / 5" for one selected term at a time: two-dimensional data shown at zero
 * dimensions. Pronoun choice is always a relative judgement (how far is `kamu` from
 * `lo`, and what sits between them), and only position answers that.
 *
 * Type is encoded with marker shape rather than a fourth hue: this is an all-pairs
 * form, where four categorical hues fail colour-vision separation, and shape survives
 * both that and printing.
 */
const TYPE_SHAPES: Record<string, { label: string; shape: 'circle' | 'square' | 'triangle' | 'diamond' }> = {
  '1st_person_singular': { label: 'orang pertama tunggal', shape: 'circle' },
  '2nd_person_singular': { label: 'orang ke-2 tunggal', shape: 'square' },
  '1st_person_plural': { label: 'orang pertama jamak', shape: 'diamond' },
  gender_term: { label: 'istilah gender', shape: 'triangle' },
  vocative: { label: 'panggilan', shape: 'diamond' },
};

function shapePath(shape: string, cx: number, cy: number, r: number): string {
  switch (shape) {
    case 'square':
      return `M${cx - r},${cy - r} h${r * 2} v${r * 2} h${-r * 2} Z`;
    case 'triangle':
      return `M${cx},${cy - r * 1.15} L${cx + r * 1.1},${cy + r * 0.85} L${cx - r * 1.1},${cy + r * 0.85} Z`;
    case 'diamond':
      return `M${cx},${cy - r * 1.25} L${cx + r * 1.2},${cy} L${cx},${cy + r * 1.25} L${cx - r * 1.2},${cy} Z`;
    default:
      return `M${cx},${cy} m${-r},0 a${r},${r} 0 1,0 ${r * 2},0 a${r},${r} 0 1,0 ${-r * 2},0`;
  }
}

export const RegisterMap: React.FC<Props> = ({ registers, selectedId, onSelect, licensedIds }) => {
  const [hover, setHover] = useState<string | null>(null);

  const x = scaleLinear(0.5, 5.5, M.left, W - M.right);
  const y = scaleLinear(0.5, 5.5, H - M.bottom, M.top);

  // Deterministic nudge for registers that share coordinates so labels never overlap.
  const countPerCoord = new Map<string, number>();
  registers.forEach((r) => {
    const key = `${r.authorityLevel}:${r.intimacyLevel}`;
    countPerCoord.set(key, (countPerCoord.get(key) ?? 0) + 1);
  });
  const seen = new Map<string, number>();
  const placed = registers.map((r) => {
    const key = `${r.authorityLevel}:${r.intimacyLevel}`;
    const total = countPerCoord.get(key) ?? 1;
    const n = seen.get(key) ?? 0;
    seen.set(key, n + 1);

    let dx = 0;
    let dy = 0;
    let labelDy = -13;

    if (total > 1) {
      const j = jitter(n, total, 18);
      dx = j.dx;
      dy = j.dy;
      labelDy = dy >= 0 ? 19 : -13;
    }

    return { ...r, dx, dy, labelDy };
  });

  const active = hover ?? selectedId;
  const activeReg = placed.find((r) => r.id === active);
  const shapes = Array.from(new Set(registers.map((r) => TYPE_SHAPES[r.type]?.shape ?? 'circle')));

  return (
    <div className="rounded-xl border border-stone-800 bg-stone-950 overflow-hidden">
      <header className="px-5 py-3.5 border-b border-stone-800">
        <h3 className="font-serif font-semibold text-stone-100" style={{ fontSize: 'var(--t-h3)' }}>
          Peta Koordinat Ragam Bahasa &amp; Kata Ganti
        </h3>
        <p className="text-stone-400 mt-0.5" style={{ fontSize: 'var(--t-small)' }}>
          Otoritas terhadap kedekatan hubungan. Titik tengah yang seimbang (3/5, 3/5) adalah posisi yang paling dibutuhkan suara institusi tanpa meminjam keakraban semu.
        </p>
      </header>

      <div className="relative">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block" role="img"
          aria-label="Peta ragam bahasa dan kata ganti berdasarkan tingkat otoritas dan kedekatan hubungan">
          <title>Peta Koordinat Ragam Bahasa dan Kata Ganti</title>
          <g className="chart-grid">
            {[1, 2, 3, 4, 5].map((v) => (
              <React.Fragment key={v}>
                <line x1={x(v)} y1={M.top} x2={x(v)} y2={H - M.bottom} />
                <line x1={M.left} y1={y(v)} x2={W - M.right} y2={y(v)} />
              </React.Fragment>
            ))}
          </g>

          {[1, 2, 3, 4, 5].map((v) => (
            <React.Fragment key={`t${v}`}>
              <text x={x(v)} y={H - M.bottom + 19} textAnchor="middle" className="chart-tick">{v}</text>
              <text x={M.left - 11} y={y(v) + 4} textAnchor="end" className="chart-tick">{v}</text>
            </React.Fragment>
          ))}

          <text x={(M.left + W - M.right) / 2} y={H - 14} textAnchor="middle" className="chart-axis-label">
            otoritas · jarak institusional →
          </text>
          <text x={18} y={(M.top + H - M.bottom) / 2} textAnchor="middle" className="chart-axis-label"
            transform={`rotate(-90 18 ${(M.top + H - M.bottom) / 2})`}>
            kedekatan yang sesuai hubungan →
          </text>

          {/* The legend used to sit at a fixed 132px stride, which collided as soon as the
              labels were localised. Laid out as flex, the row spaces itself in any language. */}
          <foreignObject x={M.left} y={8} width={W - M.left - M.right + 40} height={26}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 18px', alignItems: 'center', pointerEvents: 'none' }}>
              {shapes.map((s) => {
                const entry = Object.values(TYPE_SHAPES).find((t) => t.shape === s);
                return (
                  <span key={s} style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                    <svg width={12} height={12} viewBox="0 0 12 12" aria-hidden style={{ flexShrink: 0 }}>
                      <path d={shapePath(s, 6, 6, 4.5)} fill="var(--chart-label)" />
                    </svg>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10.5px',
                      color: 'var(--chart-label)',
                      whiteSpace: 'nowrap',
                    }}>
                      {entry?.label}
                    </span>
                  </span>
                );
              })}
            </div>
          </foreignObject>

          {placed.map((r) => {
            const cx = x(r.authorityLevel) + r.dx;
            const cy = y(r.intimacyLevel) + r.dy;
            const isActive = active === r.id;
            const dimmed = licensedIds ? !licensedIds.includes(r.id) : false;
            const shape = TYPE_SHAPES[r.type]?.shape ?? 'circle';
            return (
              <g key={r.id} opacity={dimmed ? 0.3 : 1}>
                <circle
                  cx={cx} cy={cy} r={14} fill="transparent"
                  className="chart-mark-interactive chart-focusable"
                  tabIndex={0} role="button"
                  aria-label={`${r.label}, authority ${r.authorityLevel}, intimacy ${r.intimacyLevel}`}
                  onMouseEnter={() => setHover(r.id)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(r.id)}
                  onBlur={() => setHover(null)}
                  onClick={() => onSelect(r.id)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(r.id); } }}
                />
                {isActive && (
                  <circle cx={cx} cy={cy} r={14} fill="none" stroke="var(--accent)" strokeWidth={1.5} pointerEvents="none" />
                )}
                <path
                  d={shapePath(shape, cx, cy, isActive ? 7.5 : 6)}
                  fill={isActive ? 'var(--accent)' : 'var(--ord-5)'}
                  className="chart-mark"
                  pointerEvents="none"
                />
                <text
                  x={cx} y={cy + r.labelDy} textAnchor="middle"
                  className="chart-mark-label"
                  style={{ fill: isActive ? 'var(--accent)' : undefined }}
                  pointerEvents="none"
                >
                  {r.term.split(' / ')[0]}
                </text>
              </g>
            );
          })}
        </svg>

        {activeReg && (
          <div className="absolute right-4 top-12 max-w-xs p-3 rounded-lg bg-stone-900 border border-stone-700 shadow-xl pointer-events-none"
            style={{ fontSize: 'var(--t-small)' }}>
            <div className="text-stone-100 font-medium">{activeReg.label}</div>
            <div className="font-mono text-stone-400 tabular-nums mt-0.5" style={{ fontSize: 'var(--t-micro)' }}>
              otoritas {activeReg.authorityLevel}/5 · intimacy {activeReg.intimacyLevel}/5
            </div>
            <p className="text-stone-300 mt-1.5 leading-snug" style={{ fontSize: 'var(--t-micro)' }}>
              {activeReg.socialRelationship}
            </p>
          </div>
        )}
      </div>

      <footer className="px-5 py-3 border-t border-stone-800 text-stone-500" style={{ fontSize: 'var(--t-micro)' }}>
        <span className="font-mono uppercase tracking-wider">Catatan Riset:</span> Kedua skala ini merupakan hasil pengodean analisis dari deskripsi sosiolinguistik dan korpus komunikasi Menungsa. Pilihan kata ganti selalu merupakan pertimbangan relasional yang relatif.
      </footer>
    </div>
  );
};
