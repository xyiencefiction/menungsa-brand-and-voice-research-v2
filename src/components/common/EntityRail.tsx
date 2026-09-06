import React, { useState } from 'react';
import { getRelatedGrouped, getEntity } from '../../data';
import type { EntityKind, RelatedEntity, ViewType } from '../../types';
import { ArrowUpRight, Link2 } from 'lucide-react';

interface Props {
  entityId: string;
  onNavigate: (view: ViewType, param?: string) => void;
  className?: string;
}

const KIND_LABEL: Record<EntityKind, string> = {
  mechanism: 'Mechanisms',
  claim: 'Claims',
  contradiction: 'Contradictions',
  context: 'Tone contexts',
  rule: 'Playbook rules',
  pathway: 'Audience pathways',
  register: 'Registers',
  value: 'Brand values',
  channel: 'Channels',
  scenario: 'Worked examples',
  state: 'Target states',
  contrast: 'Indonesia contrasts',
};

const KIND_ORDER: EntityKind[] = ['value', 'scenario', 'channel', 'state', 'contrast', 'claim', 'contradiction', 'context', 'rule', 'pathway', 'mechanism', 'register'];

/**
 * Everything in the corpus that references this id.
 *
 * The ids were always cross-referenced in the data (M/X/C/R/P/D appear throughout the
 * prose fields), but links were hand-wired per view and ran one way only: a mechanism
 * could reach its claims, and nothing could reach back. This reads the index built at
 * load, so a mechanism, a contradiction and a playbook rule all expose the same rail.
 *
 * Deliberately a grouped list rather than a network graph: about sixty nodes and two
 * hundred edges renders as a hairball that answers no question anyone actually asks.
 */
export const EntityRail: React.FC<Props> = ({ entityId, onNavigate, className = '' }) => {
  const grouped = getRelatedGrouped(entityId);
  const kinds = KIND_ORDER.filter((k) => grouped[k]?.length);
  const total = kinds.reduce((n, k) => n + grouped[k].length, 0);
  const [expanded, setExpanded] = useState<EntityKind | null>(kinds[0] ?? null);

  /**
   * An absence is reported rather than hidden. The fourteen tone contexts genuinely
   * carry no cross-references anywhere in the corpus, and that is worth knowing: the
   * applied voice layer was written without citing the mechanism layer by id.
   */
  if (total === 0) {
    return (
      <section className={`rounded-xl border border-stone-800 bg-stone-950 p-4 ${className}`}>
        <div className="flex items-center gap-2 mb-1.5">
          <Link2 size={14} className="text-stone-600 shrink-0" />
          <h4 className="font-mono uppercase tracking-wider text-stone-400" style={{ fontSize: 'var(--t-micro)' }}>
            No cross-references recorded
          </h4>
        </div>
        <p className="text-stone-500 leading-relaxed" style={{ fontSize: 'var(--t-micro)' }}>
          Nothing else in the corpus cites{' '}
          <span className="text-stone-300">{getEntity(entityId)?.label ?? entityId}</span>{' '}
          <span className="font-mono text-stone-400">{entityId}</span> by id.
          That is a property of the source documents, not a missing link.
        </p>
      </section>
    );
  }

  const open = expanded && grouped[expanded] ? expanded : kinds[0];
  const items: RelatedEntity[] = grouped[open] ?? [];

  return (
    <section className={`rounded-xl border border-stone-800 bg-stone-950 overflow-hidden ${className}`}>
      <header className="px-4 py-2.5 border-b border-stone-800 flex items-center gap-2">
        <Link2 size={14} className="text-stone-500 shrink-0" />
        <h4 className="font-mono uppercase tracking-wider text-stone-300" style={{ fontSize: 'var(--t-micro)' }}>
          Appears across the corpus
        </h4>
        <span className="font-mono text-stone-500 tabular-nums ml-auto" style={{ fontSize: 'var(--t-micro)' }}>
          {total} reference{total === 1 ? '' : 's'}
        </span>
      </header>

      <div className="px-3 pt-3 flex flex-wrap gap-1.5">
        {kinds.map((k) => (
          <button
            key={k}
            onClick={() => setExpanded(k)}
            aria-pressed={k === open}
            className={`px-2 py-1 rounded font-mono transition ${
              k === open
                ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40'
                : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
            style={{ fontSize: 'var(--t-micro)' }}
          >
            {KIND_LABEL[k]} <span className="tabular-nums opacity-70">{grouped[k].length}</span>
          </button>
        ))}
      </div>

      <ul className="p-3 space-y-1 max-h-64 overflow-y-auto">
        {items.map((item) => (
          <li key={`${item.kind}-${item.id}`}>
            <button
              onClick={() => onNavigate(item.view, item.id)}
              className="w-full text-left p-2 rounded-lg hover:bg-stone-900 transition group flex items-start gap-2.5"
            >
              <span className="font-mono text-amber-400/90 shrink-0 pt-px" style={{ fontSize: 'var(--t-micro)' }}>
                {item.id}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-stone-200 leading-snug line-clamp-2" style={{ fontSize: 'var(--t-small)' }}>
                  {item.label}
                </span>
                <span className="block text-stone-500 truncate mt-0.5" style={{ fontSize: 'var(--t-micro)' }}>
                  {item.detail}
                </span>
              </span>
              <ArrowUpRight size={13} className="text-stone-600 group-hover:text-amber-400 transition shrink-0 mt-0.5" />
            </button>
          </li>
        ))}
      </ul>

      {open === 'claim' && (
        <p className="px-4 pb-3 text-stone-500 leading-relaxed" style={{ fontSize: 'var(--t-micro)' }}>
          Claim links are derived by matching the ledger&rsquo;s cluster tags to the mechanism catalogue.
          No source document states this correspondence.
        </p>
      )}
    </section>
  );
};
