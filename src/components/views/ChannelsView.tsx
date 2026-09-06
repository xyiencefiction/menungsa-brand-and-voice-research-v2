import React, { useState } from 'react';
import { channels, toneContexts, scenarios } from '../../data';
import type { ViewType } from '../../types';
import { ChannelMatrix } from '../charts/ChannelMatrix';
import { ConfidenceTag } from '../common/ConfidenceTag';
import { EntityChip } from '../common/EntityChip';
import { EntityRail } from '../common/EntityRail';
import { Info, EyeOff, Eye, ArrowUpRight } from 'lucide-react';

interface Props {
  initialChannelId?: string;
  onNavigate: (view: ViewType, param?: string) => void;
}

const CTA_LADDER = ['Information', 'Availability', 'Invitation', 'Instruction'];

/**
 * Channels are a second axis over the fourteen tone contexts, not a second taxonomy.
 *
 * A context is a communicative job; a channel is a surface. They are orthogonal, and
 * the thing that makes the channel axis principled rather than decorative is exposure:
 * a support-group announcement is the same job in an inbox and in a group chat, but
 * in the group chat every reply is a public disclosure. That is response cost, which
 * is the corpus's most convergent mechanism, so it is what orders this view.
 */
export const ChannelsView: React.FC<Props> = ({ initialChannelId, onNavigate }) => {
  const [selectedId, setSelectedId] = useState<string>(
    channels.some((c) => c.id === initialChannelId) ? initialChannelId! : 'CH1',
  );
  const selected = channels.find((c) => c.id === selectedId) ?? channels[0];
  const relatedScenarios = scenarios.filter((s) => s.channelId === selected.id);
  const ctaIndex = CTA_LADDER.findIndex((c) => c.toLowerCase() === selected.ctaCeiling.toLowerCase());

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      <header className="border-b border-stone-800 pb-5">
        <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-mono border border-amber-500/20"
          style={{ fontSize: 'var(--t-micro)' }}>
          Delivery surfaces · CH1–CH7
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100 mt-1.5">
          Channels &amp; Exposure
        </h1>
        <p className="text-stone-400 mt-1.5 max-w-3xl" style={{ fontSize: 'var(--t-small)' }}>
          A second axis over the fourteen tone contexts. The context decides what the message is doing; the channel
          decides how visible he becomes by responding to it.
        </p>
      </header>

      <div className="p-4 bg-stone-900/60 border border-stone-800 rounded-xl flex items-start gap-3 text-stone-300"
        style={{ fontSize: 'var(--t-small)' }}>
        <Info size={17} className="text-amber-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-stone-100">No surface gets a different personality.</strong>{' '}
          The six values do not change between channels. What changes is which contexts can run there and how far the
          call to action may go, and the variable behind both is exposure, not platform culture.
        </p>
      </div>

      <ChannelMatrix
        channels={channels}
        contexts={toneContexts}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />

      <div className="flex flex-wrap gap-1.5">
        {channels.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedId(c.id)}
            className={`px-2.5 py-1.5 rounded-lg border transition ${
              c.id === selectedId
                ? 'bg-amber-500 text-stone-950 font-bold border-amber-400'
                : 'bg-stone-950 text-stone-300 hover:text-stone-100 border-stone-800'
            }`}
            style={{ fontSize: 'var(--t-micro)' }}
          >
            <span className="font-mono opacity-80">{c.id}</span>
            <span className="ml-1.5">{c.channel}</span>
          </button>
        ))}
      </div>

      <article className="p-5 sm:p-6 bg-stone-900 border border-stone-700 rounded-2xl shadow-md space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-stone-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30"
                style={{ fontSize: 'var(--t-micro)' }}>
                {selected.id}
              </span>
              <h2 className="font-serif font-bold text-stone-100" style={{ fontSize: 'var(--t-h3)' }}>
                {selected.channel}
              </h2>
            </div>
            <p className="text-stone-400 mt-1" style={{ fontSize: 'var(--t-small)' }}>
              {selected.whoSpeaks}
            </p>
          </div>
          <ConfidenceTag confidence={selected.evidenceTier} verbatim />
        </div>

        <div className="p-3.5 rounded-lg border space-y-1.5"
          style={{ borderColor: 'var(--cat-2)', background: 'color-mix(in oklab, var(--cat-2) 8%, transparent)' }}>
          <div className="flex items-center gap-2 font-mono uppercase tracking-wider"
            style={{ color: 'var(--cat-2)', fontSize: 'var(--t-micro)' }}>
            {selected.exposureLevel >= 3 ? <Eye size={14} /> : <EyeOff size={14} />}
            <span>Exposure when responding · {selected.exposureLevel} of 5</span>
          </div>
          <p className="text-stone-200 leading-relaxed" style={{ fontSize: 'var(--t-small)' }}>
            {selected.exposureNote}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3" style={{ fontSize: 'var(--t-small)' }}>
          <div className="p-3.5 bg-stone-950 rounded-lg border border-stone-800 space-y-2">
            <span className="font-mono text-amber-400 uppercase tracking-wider block" style={{ fontSize: 'var(--t-micro)' }}>
              How far the ask may go
            </span>
            <div className="flex flex-wrap gap-1">
              {CTA_LADDER.map((step, i) => (
                <span
                  key={step}
                  className="px-2 py-0.5 rounded border font-mono"
                  style={{
                    fontSize: 'var(--t-micro)',
                    borderColor: i <= ctaIndex ? 'var(--ord-5)' : 'var(--chart-muted)',
                    color: i <= ctaIndex ? 'var(--ord-6)' : 'var(--chart-label)',
                    opacity: i <= ctaIndex ? 1 : 0.5,
                  }}
                >
                  {step}
                </span>
              ))}
            </div>
            <p className="text-stone-400 leading-relaxed" style={{ fontSize: 'var(--t-micro)' }}>
              The ladder runs information → availability → invitation → instruction. Anything past the ceiling asks
              for a disclosure this surface cannot protect.
            </p>
          </div>

          <div className="p-3.5 bg-stone-950 rounded-lg border border-stone-800 space-y-2">
            <span className="font-mono text-sky-400 uppercase tracking-wider block" style={{ fontSize: 'var(--t-micro)' }}>
              Shape of the message
            </span>
            <p className="text-stone-300 leading-relaxed">{selected.lengthBudget}</p>
            <p className="text-stone-400 leading-relaxed" style={{ fontSize: 'var(--t-micro)' }}>
              Reply expected: {selected.replyExpected}
            </p>
          </div>
        </div>

        <div className="p-3.5 bg-stone-950 rounded-lg border border-stone-800 space-y-1.5">
          <span className="font-mono text-amber-400 uppercase tracking-wider block" style={{ fontSize: 'var(--t-micro)' }}>
            The rule for this surface
          </span>
          <p className="text-stone-200 leading-relaxed" style={{ fontSize: 'var(--t-body)' }}>
            {selected.channelRule}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <span className="font-mono text-emerald-400 uppercase tracking-wider block" style={{ fontSize: 'var(--t-micro)' }}>
              Contexts that run here
            </span>
            <div className="flex flex-wrap gap-1">
              {selected.contextIds.map((id) => (
                <EntityChip key={id} id={id} onNavigate={onNavigate} />
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            <span className="font-mono text-rose-400 uppercase tracking-wider block" style={{ fontSize: 'var(--t-micro)' }}>
              Documented objections
            </span>
            {selected.avoidHere.length === 0 ? (
              <p className="text-stone-500" style={{ fontSize: 'var(--t-micro)' }}>
                None recorded. That is an absence in the synthesis, not a clearance for every context.
              </p>
            ) : (
              <ul className="space-y-1.5">
                {selected.avoidHere.map((a) => (
                  <li key={a.contextId} className="text-stone-300 leading-relaxed" style={{ fontSize: 'var(--t-micro)' }}>
                    <EntityChip id={a.contextId} onNavigate={onNavigate} />
                    <span className="ml-1.5">{a.why}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="p-3.5 bg-stone-950 rounded-lg border border-stone-800 space-y-1.5">
          <span className="font-mono text-stone-400 uppercase tracking-wider block" style={{ fontSize: 'var(--t-micro)' }}>
            What stands behind this
          </span>
          <p className="text-stone-300 leading-relaxed" style={{ fontSize: 'var(--t-small)' }}>
            {selected.evidenceNote}
          </p>
          <div className="flex flex-wrap gap-1 pt-1">
            {selected.valueIds.map((id) => (
              <EntityChip key={id} id={id} onNavigate={onNavigate} />
            ))}
          </div>
        </div>

        {relatedScenarios.length > 0 && (
          <div className="pt-1 flex flex-wrap gap-2">
            {relatedScenarios.map((s) => (
              <button
                key={s.id}
                onClick={() => onNavigate('scenarios', s.id)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-stone-950 border border-stone-800 text-stone-300 hover:text-stone-100 hover:border-stone-600 transition"
                style={{ fontSize: 'var(--t-micro)' }}
              >
                <ArrowUpRight size={13} className="text-amber-400" />
                <span>Worked example: {s.scenario}</span>
              </button>
            ))}
          </div>
        )}
      </article>

      <EntityRail entityId={selected.id} onNavigate={onNavigate} />
    </div>
  );
};
