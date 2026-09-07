import React, { useState } from 'react';
import type { BrandValue } from '../../types';
import { scaleLinear, ordinalStep } from './chartUtils';
import { SvgLabel } from './SvgLabel';

const W = 780;
const ROW = 56;
const M = { top: 42, right: 196, bottom: 34, left: 196 };

interface Props {
  values: BrandValue[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

/**
 * Where Menungsa has decided to stand on six dimensions of its own voice.
 *
 * This is the one chart on the site that reports no data at all. Every other figure
 * encodes something counted or coded from the corpus; this encodes a decision. A radar
 * or a dial would borrow the visual grammar of measurement and imply that the position
 * was found rather than chosen, so the marks sit on the same ordinal 1-5 tracks the
 * tone lab already uses, and the two values that stop short of the pole say why.
 */
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
    right: 'Situasi yang tampak dulu',
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
    left: 'Menuntut pembaca berubah',
    right: 'Menunjukkan tindakan & kondisi',
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
    <div className="rounded-xl border border-stone-800 bg-stone-950 overflow-hidden">
      <header className="px-5 py-3.5 border-b border-stone-800">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-serif font-semibold text-stone-100" style={{ fontSize: 'var(--t-h3)' }}>
            Posisi gaya komunikasi Menungsa
          </h3>
          <span
            className="px-2 py-0.5 rounded border font-mono uppercase tracking-wider bg-amber-500/10 border-amber-500/30 text-amber-400"
            style={{ fontSize: 'var(--t-micro)' }}
          >
            Sintesis Strategis
          </span>
        </div>
        <p className="text-stone-400 mt-0.5" style={{ fontSize: 'var(--t-small)' }}>
          Enam posisi yang dipilih Menungsa, bukan enam besaran yang diukur siapa pun. Arahkan kursor ke sebuah baris untuk melihat alasan posisinya.
        </p>
      </header>

      <div className="p-4 overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto block min-w-[700px]"
          role="img"
          aria-label="Six brand values plotted as chosen positions on ordinal one to five tracks"
        >
          <title>Menungsa voice positions across six value dimensions</title>

          <g className="chart-grid">
            {[1, 2, 3, 4, 5].map((v) => (
              <line key={v} x1={x(v)} y1={M.top - 12} x2={x(v)} y2={H - M.bottom + 4} />
            ))}
          </g>
          {[1, 2, 3, 4, 5].map((v) => (
            <text key={`t${v}`} x={x(v)} y={M.top - 20} textAnchor="middle" className="chart-tick">
              {v}
            </text>
          ))}

          {values.map((v, i) => {
            const y = M.top + i * ROW + ROW / 2;
            const isActive = active === v.id;
            const dim = active && !isActive ? 0.26 : 1;
            const cx = x(v.spectrum.position);

            return (
              <g
                key={v.id}
                className="chart-mark-interactive"
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
                <rect x={0} y={y - ROW / 2} width={W} height={ROW} fill="transparent" />

                <g opacity={dim}>
                  <SvgLabel x={6} y={y - ROW / 2 + 8} width={M.left - 22} height={ROW - 16}
                    align="end" tone="strong" lines={2}>
                    {ID_POLES[v.id]?.left || v.spectrum.leftPole}
                  </SvgLabel>
                  <SvgLabel x={W - M.right + 12} y={y - ROW / 2 + 8} width={M.right - 20} height={ROW - 16}
                    tone="strong" lines={2}>
                    {ID_POLES[v.id]?.right || v.spectrum.rightPole}
                  </SvgLabel>
                </g>

                <line
                  x1={x(1)} y1={y} x2={x(5)} y2={y}
                  stroke="var(--chart-axis)" strokeWidth={isActive ? 2 : 1} opacity={dim * 0.7}
                />
                {/* The unclaimed span, drawn so the chosen position reads as a choice on a range. */}
                <line
                  x1={cx} y1={y} x2={x(5)} y2={y}
                  stroke="var(--chart-muted)" strokeWidth={6} strokeLinecap="round" opacity={dim * 0.5}
                />
                <line
                  x1={x(1)} y1={y} x2={cx} y2={y}
                  stroke={ordinalStep(v.spectrum.position, 5)} strokeWidth={6} strokeLinecap="round" opacity={dim}
                />
                <circle
                  cx={cx} cy={y} r={isActive ? 9 : 7}
                  fill={ordinalStep(v.spectrum.position, 5)}
                  stroke="var(--chart-surface)" strokeWidth={2}
                  className="chart-mark" opacity={dim}
                />
                <text
                  x={cx} y={y - 14} textAnchor="middle"
                  className="chart-axis-label" opacity={dim}
                  style={{ fill: isActive ? 'var(--accent)' : 'var(--chart-label-strong)', fontSize: '11px', fontWeight: isActive ? 600 : 500 }}
                >
                  {ID_POLES[v.id]?.title.split(',')[0].replace(' untuk Memulai', '').replace(' yang Masuk Akal', '') || v.value}
                </text>
                {/* A value that stops short of the pole carries a reason; the gap is marked. */}
                {v.spectrum.position < 5 && (
                  <text x={x(5) + 4} y={y + 4} textAnchor="start" className="chart-tick" opacity={dim * 0.9}>
                    ·
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {activeValue && (
        <div className="px-5 py-3 border-t border-stone-800 bg-stone-900/40 space-y-1">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="font-serif font-semibold text-amber-400" style={{ fontSize: 'var(--t-small)' }}>
              {ID_POLES[activeValue.id]?.title || activeValue.value}
            </span>
            <span className="text-stone-400 text-xs font-sans">
              — {ID_POLES[activeValue.id]?.dimension || activeValue.spectrum.dimension}
            </span>
          </div>
          <p className="text-stone-300 leading-relaxed font-sans" style={{ fontSize: 'var(--t-small)' }}>
            {ID_POLES[activeValue.id]?.positionNote || activeValue.spectrum.positionNote}
          </p>
        </div>
      )}

      <footer className="px-5 py-3 border-t border-stone-800 text-stone-500" style={{ fontSize: 'var(--t-micro)' }}>
        <span className="font-mono uppercase tracking-wider">Bukan Hasil Pengukuran:</span> Tidak ada pembaca yang diminta memberi nilai pada dimensi-dimensi ini. Posisi-posisi ini adalah komitmen editorial yang disintesis dari basis data riset Menungsa, dan angka 1–5 adalah penanda ordinal untuk spektrum pilihan, bukan skor evaluasi.
      </footer>
    </div>
  );
};
