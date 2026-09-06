import React from 'react';
import { getEntity } from '../../data';
import type { ViewType } from '../../types';

/**
 * A corpus id rendered with its name in front of it.
 *
 * The ids are functional: they are deep-link parameters, they are matched out of prose
 * to build the relation index, and they are what the source documents cite. So the id
 * is never replaced, only demoted. The name leads, the id stays alongside in mono, and
 * anything that used to read as a bare code now says what it is.
 *
 * Source ids (S01-S14) are deliberately not handled here. Those are citations, not
 * entities, and giving a citation a descriptive name destroys what it is for.
 */
interface Props {
  id: string;
  onNavigate?: (view: ViewType, param?: string) => void;
  /** Show the id only, with the name in the tooltip. For dense tables and axis labels. */
  compact?: boolean;
  className?: string;
}

export const EntityChip: React.FC<Props> = ({ id, onNavigate, compact = false, className = '' }) => {
  const entity = getEntity(id);
  const label = entity?.label;
  const interactive = Boolean(onNavigate && entity);

  const body = compact || !label ? (
    <span className="font-mono">{id}</span>
  ) : (
    <>
      <span className="truncate">{label}</span>
      <span className="font-mono opacity-70 shrink-0">{id}</span>
    </>
  );

  const shared = `inline-flex items-center gap-1.5 px-1.5 py-0.5 rounded border border-stone-800 bg-stone-950 text-stone-300 max-w-full align-middle ${className}`;

  if (!interactive) {
    return (
      <span className={shared} style={{ fontSize: 'var(--t-micro)' }} title={label ?? id}>
        {body}
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onNavigate!(entity!.view, id)}
      className={`${shared} hover:border-stone-600 hover:text-stone-100 transition text-left`}
      style={{ fontSize: 'var(--t-micro)' }}
      title={`${label} — open ${id}`}
    >
      {body}
    </button>
  );
};
