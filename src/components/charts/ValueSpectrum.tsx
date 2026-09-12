import React from 'react';
import { ChevronDown } from 'lucide-react';
import type { BrandValue } from '../../types';

/**
 * The six voice values, each as a position on its own 1-5 spectrum.
 *
 * This was an SVG chart with a fixed 620x300 viewBox scaled by `w-full`, which
 * made every type size a function of the container width: 9.5px on a phone,
 * 19.9px at 1280 and 24.3px at 1536 — larger than the page's own headings. The
 * drawing here is a position on a rail, not a plot, so HTML holds it better:
 * type stays at the size it is declared, the rails align across rows without
 * arithmetic, each row is a real button with a native focus ring, and the whole
 * thing reflows on a phone instead of scrolling sideways.
 *
 * The ribbon gradient is copied verbatim from the SVG it replaces, including the
 * optical grating, so the artwork is unchanged.
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
interface Props {
  values: BrandValue[];
  /** Reader-facing name per value, supplied by the view that owns them. Falls
   *  back to the dataset's own `value` field. */
  rowTitles?: Record<string, string>;
  selectedId?: string;
  onSelect: (id: string) => void;
  /**
   * Body of the open panel. Omit it and the rows stay a plain selector with no
   * panel at all — which is what the legacy Values view needs, since it renders
   * its own detail article below and would otherwise show two.
   */
  renderDetail?: (id: string) => React.ReactNode;
  className?: string;
}

const SCALE = [1, 2, 3, 4, 5];

/** Position 1-5 as a percentage along the rail. */
const pct = (position: number) => ((position - 1) / 4) * 100;

export const ValueSpectrum: React.FC<Props> = ({
  values,
  rowTitles,
  selectedId,
  onSelect,
  renderDetail,
  className,
}) => (
  <div className={`rounded-xl border border-stone-800 bg-stone-950/90 overflow-hidden shadow-overlay ${className ?? ''}`}>
    <header className="px-4 py-2.5 border-b border-stone-800 flex items-center justify-between gap-2 bg-stone-900/40">
      <h3 className="font-serif font-semibold text-stone-100 text-sm md:text-base">
        Spektrum Voice Menungsa
      </h3>
    </header>

    {/* One ruler for all six rails. Every rail occupies the same grid column, so
        a single scale serves them all instead of repeating ticks per row. */}
    <div className="vs-ruler px-4 pt-3 pb-1" aria-hidden="true">
      <span />
      <div className="vs-ruler-ticks">
        {SCALE.map((v) => (
          <span key={v} className="font-mono text-[10px] text-stone-500 tabular-nums">
            {v}
          </span>
        ))}
      </div>
      <span />
    </div>

    <div className="divide-y divide-stone-800/70" role="group" aria-label="Enam prinsip menulis">
      {values.map((v, i) => {
        const pole = ID_POLES[v.id];
        const isAccordion = Boolean(renderDetail);
        const isOpen = selectedId === v.id;
        const position = pct(v.spectrum.position);

        return (
          <div key={v.id} className={`vs-row px-4 py-3.5 ${isOpen ? 'bg-stone-900/40' : ''}`}>
            <h4 className="m-0">
              <button
                type="button"
                id={`vs-row-${v.id}`}
                aria-expanded={isAccordion ? isOpen : undefined}
                aria-controls={isAccordion ? `vs-panel-${v.id}` : undefined}
                aria-pressed={isAccordion ? undefined : isOpen}
                onClick={() => onSelect(v.id)}
                className="w-full flex items-center gap-3 text-left cursor-pointer group"
              >
                <span className="font-mono text-[11px] tabular-nums text-stone-500 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className={`font-serif text-base sm:text-lg font-semibold leading-snug flex-1 ${
                    isOpen ? 'text-amber-500 dark:text-amber-300' : 'text-stone-100 group-hover:text-amber-500 dark:group-hover:text-amber-300'
                  }`}
                >
                  {rowTitles?.[v.id] ?? v.value}
                </span>
                {isAccordion && (
                  <ChevronDown
                    size={16}
                    className={`shrink-0 text-stone-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  />
                )}
              </button>
            </h4>

            <p className="kicker mt-1.5 mb-2">{pole?.dimension ?? v.spectrum.dimension}</p>

            <div className="vs-track">
              <span className="vs-pole text-stone-500 dark:text-stone-400">
                {pole?.left ?? v.spectrum.leftPole}
              </span>
              <div
                className="vs-rail"
                style={{ '--p': `${position}%` } as React.CSSProperties}
                role="img"
                aria-label={`Posisi ${v.spectrum.position} dari 5`}
              >
                <span className="vs-fill" />
                <span className="vs-needle" />
                <span className="vs-pip" />
              </div>
              <span className="vs-pole vs-pole-end text-stone-300 font-medium">
                {pole?.right ?? v.spectrum.rightPole}
              </span>
            </div>

            {isOpen && renderDetail && (
              <div
                role="region"
                id={`vs-panel-${v.id}`}
                aria-labelledby={`vs-row-${v.id}`}
                className="mt-4 rounded-xl border border-stone-800 bg-stone-950/60 p-4 sm:p-5 space-y-4 animate-fadeIn"
              >
                <div className="space-y-1.5">
                  <h5 className="font-serif text-lg sm:text-xl font-semibold text-stone-100 leading-snug">
                    {pole?.title ?? v.value}
                  </h5>
                  <p className="text-sm text-stone-300 leading-relaxed font-sans">
                    {pole?.positionNote ?? v.spectrum.positionNote}
                  </p>
                </div>
                {renderDetail?.(v.id)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  </div>
);
