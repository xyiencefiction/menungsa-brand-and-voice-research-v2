import React from 'react';
import { scaleLinear } from './chartUtils';

interface Props {
  /** Current moral density as a percentage, 0–100. */
  density: number;
}

const W = 640;
const H = 300;
const M = { top: 26, right: 26, bottom: 52, left: 56 };

/**
 * The saturation curve, drawn as a curve.
 *
 * The simulator previously evaluated a four-step lookup table (45 / 90 / 40 / 15) and
 * rendered it as a progress bar, so the shape a reader inferred was a step function
 * with sharp thresholds. That is the opposite of the finding, and it contradicted the
 * warning printed directly above it. The robust result is non-linearity and saturation:
 * the shape is known, the peak is not.
 *
 * The uncertainty band is therefore the point of the chart, and the y-axis carries no
 * numbers because no unit was measured.
 */

/** Smooth inverted-U with a long saturation tail. Not fitted to any published constant. */
function response(d: number): number {
  const rise = 1 - Math.exp(-d / 9);
  const saturation = 1 / (1 + Math.exp((d - 44) / 11));
  return rise * saturation;
}

export const MoralDensityCurve: React.FC<Props> = ({ density }) => {
  const x = scaleLinear(0, 100, M.left, W - M.right);
  const y = scaleLinear(0, 1.02, H - M.bottom, M.top);

  const samples = Array.from({ length: 101 }, (_, d) => ({ d, v: response(d) }));
  const line = samples.map((s, i) => `${i === 0 ? 'M' : 'L'}${x(s.d).toFixed(1)},${y(s.v).toFixed(1)}`).join(' ');

  // The band widens where the corpus is least able to locate the optimum.
  const spread = (d: number) => 0.06 + 0.16 * Math.exp(-((d - 30) ** 2) / 900);
  const upper = samples.map((s, i) => `${i === 0 ? 'M' : 'L'}${x(s.d).toFixed(1)},${y(Math.min(s.v + spread(s.d), 1.02)).toFixed(1)}`).join(' ');
  const lower = [...samples].reverse().map((s) => `L${x(s.d).toFixed(1)},${y(Math.max(s.v - spread(s.d), 0)).toFixed(1)}`).join(' ');

  const clamped = Math.max(0, Math.min(100, density));
  const markerY = y(response(clamped));

  return (
    <div className="rounded-xl border border-stone-800 bg-stone-950 overflow-hidden">
      <header className="px-5 py-3.5 border-b border-stone-800">
        <h3 className="font-serif font-semibold text-stone-100" style={{ fontSize: 'var(--t-h3)' }}>
          Saturation is a slope, not a threshold
        </h3>
        <p className="text-stone-400 mt-0.5" style={{ fontSize: 'var(--t-small)' }}>
          Persuasion rises with moral relevance, then collapses once scolding dominates. Where the turn happens is not known.
        </p>
      </header>

      <div className="p-4">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block" role="img"
          aria-label="Curve of relative persuasion against moral density, with an uncertainty band and a marker at the current message density">
          <title>Relative persuasion against moral density</title>

          <g className="chart-grid">
            {[0, 25, 50, 75, 100].map((t) => (
              <line key={t} x1={x(t)} y1={M.top} x2={x(t)} y2={H - M.bottom} />
            ))}
            <line x1={M.left} y1={H - M.bottom} x2={W - M.right} y2={H - M.bottom} />
          </g>

          <path d={`${upper} ${lower} Z`} fill="var(--ord-2)" opacity={0.55} />
          <path d={line} fill="none" stroke="var(--ord-6)" strokeWidth={2.5} strokeLinecap="round" />

          <line x1={x(clamped)} y1={M.top - 6} x2={x(clamped)} y2={H - M.bottom} stroke="var(--chart-label)" strokeWidth={1} />
          <circle cx={x(clamped)} cy={markerY} r={6} fill="var(--ord-6)" className="chart-mark" />
          <text
            x={clamped > 70 ? x(clamped) - 10 : x(clamped) + 10}
            y={M.top + 4}
            textAnchor={clamped > 70 ? 'end' : 'start'}
            className="chart-mark-label"
          >
            your message · {Math.round(clamped)}%
          </text>

          {[0, 25, 50, 75, 100].map((t) => (
            <text key={`t${t}`} x={x(t)} y={H - M.bottom + 20} textAnchor="middle" className="chart-tick">{t}</text>
          ))}
          <text x={(M.left + W - M.right) / 2} y={H - 12} textAnchor="middle" className="chart-axis-label">
            moral density · share of moral tokens (%)
          </text>
          <text x={16} y={(M.top + H - M.bottom) / 2} textAnchor="middle" className="chart-axis-label"
            transform={`rotate(-90 16 ${(M.top + H - M.bottom) / 2})`}>
            relative persuasion · no unit
          </text>

          <g>
            <rect x={W - M.right - 128} y={M.top + 4} width={16} height={9} fill="var(--ord-2)" opacity={0.55} rx={2} />
            <text x={W - M.right - 106} y={M.top + 12} className="chart-axis-label">plausible range</text>
          </g>
        </svg>
      </div>

      <footer className="px-5 py-3 border-t border-stone-800 text-stone-500" style={{ fontSize: 'var(--t-micro)' }}>
        <span className="font-mono uppercase tracking-wider">Does not represent</span> a target.
        The y-axis has no unit and the curve is schematic. The fitted optimum reported by Candia et al. belongs to
        their platform corpora, not to Indonesian mental-health copy, and is not reproduced here as a number.
      </footer>
    </div>
  );
};
