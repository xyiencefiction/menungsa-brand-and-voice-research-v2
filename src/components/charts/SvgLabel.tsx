import React from 'react';

/**
 * Text inside a chart, laid out by the browser rather than by character counting.
 *
 * Every chart here previously truncated its own labels in JavaScript, which broke two
 * things at once. The visible half was obvious: prose cut mid-word. The other half was
 * not, and was worse. Localisation works by looking the rendered string up in a
 * dictionary, so `slice(0, 29) + '…'` produced a key that matches nothing and the label
 * silently fell back to English. Truncating before render therefore untranslated the
 * chart.
 *
 * A foreignObject fixes both. The string reaches the DOM whole, so the runtime finds it
 * and localises it, and the browser wraps it against a real box. Where it still does not
 * fit, `-webkit-line-clamp` trims the *rendering* and leaves the string intact, which is
 * the distinction that was missing.
 *
 * It also keeps the bilingual markup assertion satisfiable: emitting one tspan per
 * wrapped line would produce a different element count in Indonesian than in English,
 * and the locale test compares element structure across languages.
 */
export type LabelTone = 'label' | 'strong' | 'tick' | 'warn' | 'inkHi' | 'accent';

const TONE_COLOR: Record<LabelTone, string> = {
  label: 'var(--chart-label)',
  strong: 'var(--chart-label-strong)',
  tick: 'var(--chart-label)',
  warn: 'var(--cat-2)',
  inkHi: 'var(--ord-ink-hi)',
  accent: 'var(--accent)',
};

interface Props {
  x: number;
  y: number;
  width: number;
  height: number;
  children: React.ReactNode;
  /** Horizontal alignment of the text block inside its box. */
  align?: 'start' | 'center' | 'end';
  /** Vertical alignment of the text block inside its box. */
  valign?: 'start' | 'center' | 'end';
  tone?: LabelTone;
  size?: number;
  /** Maximum rendered lines. The string itself is never shortened. */
  lines?: number;
  weight?: number;
  /** Charts are monospace by default, matching the chart-* CSS primitives. */
  serif?: boolean;
}

export const SvgLabel: React.FC<Props> = ({
  x, y, width, height, children,
  align = 'start', valign = 'center', tone = 'label',
  size = 10.5, lines = 3, weight, serif = false,
}) => (
  <foreignObject x={x} y={y} width={Math.max(width, 0)} height={Math.max(height, 0)}>
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: valign === 'start' ? 'flex-start' : valign === 'end' ? 'flex-end' : 'center',
        justifyContent: align === 'start' ? 'flex-start' : align === 'end' ? 'flex-end' : 'center',
        // The parent <g> owns hover and click; the text must not intercept them.
        pointerEvents: 'none',
      }}
    >
      <span
        style={{
          fontFamily: serif ? 'var(--font-serif)' : 'var(--font-mono)',
          fontSize: `${size}px`,
          fontWeight: weight,
          lineHeight: 1.32,
          color: TONE_COLOR[tone],
          textAlign: align === 'end' ? 'right' : align === 'center' ? 'center' : 'left',
          display: '-webkit-box',
          WebkitLineClamp: lines,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          overflowWrap: 'anywhere',
        }}
      >
        {children}
      </span>
    </div>
  </foreignObject>
);
