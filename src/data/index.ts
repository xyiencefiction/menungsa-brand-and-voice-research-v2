import mechanismsData from './mechanisms.json';
import claimsData from './claims.json';
import contradictionsData from './contradictions.json';
import intersectionsData from './intersections.json';
import toneContextsData from './toneContexts.json';
import confidenceData from './confidence.json';
import languageRegistersData from './languageRegisters.json';
import manosphereAlternativesData from './manosphereAlternatives.json';
import playbookRulesData from './playbookRules.json';
import researchGapsData from './researchGaps.json';
import pathwaysData from './pathways.json';
import domainsData from './domains.json';
import indonesianStudiesData from './indonesianStudies.json';
import brandValuesData from './values.json';
import channelsData from './channels.json';
import scenariosData from './scenarios.json';
import resonanceStatesData from './resonanceStates.json';
import indonesiaContrastsData from './indonesiaContrasts.json';
import evidenceMatrixData from './evidenceMatrix.json';
import glossaryData from './glossary.json';
import toneExemplarsData from './toneExemplars.json';
import { matchesText } from '../i18n/translate';

import type {
  Mechanism,
  Claim,
  Contradiction,
  Intersection,
  ToneContext,
  ToneExemplar,
  ConfidenceItem,
  LanguageRegister,
  ManosphereAlternative,
  PlaybookRule,
  Pathway,
  Domain,
  IndonesianStudy,
  BrandValue,
  Channel,
  Scenario,
  ResonanceState,
  IndonesiaContrast,
  RelatedEntity,
  ViewType,
} from '../types';

import {
  deriveClaim,
  confidenceTier,
  type ClaimDerived,
  type ConfidenceTier,
} from './normalize';

export * from './normalize';

export type DerivedClaim = Claim & { derived: ClaimDerived };

export const mechanisms: Mechanism[] = mechanismsData as Mechanism[];
export const claims: DerivedClaim[] = (claimsData as Claim[]).map(deriveClaim);
export const contradictions: Contradiction[] = contradictionsData as Contradiction[];
export const intersections: Intersection[] = intersectionsData as Intersection[];
export const toneContexts: ToneContext[] = toneContextsData as ToneContext[];
export const confidenceList: ConfidenceItem[] = confidenceData as ConfidenceItem[];
export const languageRegisters: LanguageRegister[] = languageRegistersData as LanguageRegister[];
export const manosphereAlternatives: ManosphereAlternative[] = manosphereAlternativesData as ManosphereAlternative[];
export const playbookRules: PlaybookRule[] = playbookRulesData as PlaybookRule[];
export const pathways: Pathway[] = pathwaysData as Pathway[];
export const domains: Domain[] = domainsData as Domain[];
export const indonesianStudies: IndonesianStudy[] = indonesianStudiesData as IndonesianStudy[];
export const brandValues: BrandValue[] = brandValuesData as BrandValue[];
export const channels: Channel[] = channelsData as Channel[];
export const scenarios: Scenario[] = scenariosData as Scenario[];
export const resonanceStates: ResonanceState[] = resonanceStatesData as ResonanceState[];
export const indonesiaContrasts: IndonesiaContrast[] = indonesiaContrastsData as IndonesiaContrast[];
export const toneExemplars: ToneExemplar[] = toneExemplarsData as ToneExemplar[];
export interface SourceDocument {
  source_id: string;
  filename: string;
  classification: string;
  domain: string;
  reliability: string;
  principal_limitations: string;
  use_in_this_synthesis: string;
}

export const sourceDocuments = evidenceMatrixData as unknown as SourceDocument[];

/**
 * S01-S14 are citations, not entities.
 *
 * They are deliberately absent from the relation index and from EntityChip: giving a
 * citation a descriptive name in place of its id destroys what a citation is for. What
 * they get instead is their document title on hover, which is what a reader actually
 * wants from a reference marker.
 */
export function getSourceTitle(id: string): string | undefined {
  const doc = sourceDocuments.find((d) => d.source_id.toUpperCase() === id.toUpperCase());
  if (!doc) return undefined;
  return doc.filename
    .replace(/\.md$/, '')
    .replace(/\s*-\s*Deep Research Report$/, ' (deep research report)');
}

export interface GlossaryEntry { id: string; term: string; plain: string }
export const glossary = glossaryData as GlossaryEntry[];

export const researchGaps = researchGapsData;

/* ── lookups ────────────────────────────────────────────────── */

export function getMechanismById(id: string): Mechanism | undefined {
  return mechanisms.find((m) => m.mechanism_id === id);
}

export function getIntersectionById(id: string): Intersection | undefined {
  return intersections.find((i) => i.mechanism_id === id);
}

export function getClaimsByMechanism(mechanismId: string): DerivedClaim[] {
  return claims.filter((c) => c.derived.mechanismIds.includes(mechanismId));
}

export function getContradictionsByDomain(domain: string): Contradiction[] {
  return contradictions.filter((c) => c.source_domains.includes(domain));
}

/* ── corpus-level counts ────────────────────────────────────── */

/**
 * Every headline number the UI shows is computed here, so a banner can never disagree
 * with the filter beneath it (previously "10 studies manipulated wording" sat directly
 * above a dropdown reading "YES (14)").
 */
export const corpusStats = {
  totalClaims: claims.length,
  causal: claims.filter((c) => c.derived.causal === 'YES').length,
  wordingTested: claims.filter((c) => c.derived.wording === 'YES').length,
  wordingPartly: claims.filter((c) => c.derived.wording === 'PARTLY').length,
  indonesian: claims.filter((c) => c.derived.indonesia === 'YES').length,
  /** The terminal zero of the evidence funnel, computed rather than asserted. */
  indonesianWordingTested: claims.filter(
    (c) => c.derived.wording === 'YES' && c.derived.indonesia === 'YES',
  ).length,
  /** Categories D and E: observed pattern and industry practice, never psychological fact. */
  nonInferential: claims.filter((c) => c.derived.nonInferential).length,
  mechanisms: mechanisms.length,
  contradictions: contradictions.length,
  unresolvedContradictions: contradictions.filter((c) => c.status.toUpperCase().includes('UNRESOLVED')).length,
  toneContexts: toneContexts.length,
  registers: languageRegisters.length,
  playbookRules: playbookRules.length,
  domains: domains.length,
  sourceDocuments: 14,
};

export function tierCounts(rows: DerivedClaim[]): Record<ConfidenceTier, number> {
  const out = {} as Record<ConfidenceTier, number>;
  for (const r of rows) {
    out[r.derived.confidenceTier] = (out[r.derived.confidenceTier] ?? 0) + 1;
  }
  return out;
}

/* ── entity relation index ──────────────────────────────────── */

// CH and SC are matched before the single-letter families so that CH3 does not read as C3.
const ID_PATTERN = /\b((?:CH|SC|RS|KT)\d{1,2}|[MXCRPDVE]\d{1,2})\b/g;

/** Every stable id in the corpus, with where it lives. */
export interface EntityRef {
  id: string;
  kind: RelatedEntity['kind'];
  label: string;
  detail: string;
  view: ViewType;
}

const entityIndex = new Map<string, EntityRef>();

for (const m of mechanisms) {
  entityIndex.set(m.mechanism_id, {
    id: m.mechanism_id,
    kind: 'mechanism',
    label: m.mechanism,
    detail: m.psychological_mechanism,
    view: 'mechanisms',
  });
}
for (const x of contradictions) {
  entityIndex.set(x.id, {
    id: x.id,
    kind: 'contradiction',
    label: x.apparent_contradiction,
    detail: `Resolved by: ${x.actual_distinguishing_variable}`,
    view: 'contradictions',
  });
}
for (const c of toneContexts) {
  entityIndex.set(c.context_id, {
    id: c.context_id,
    kind: 'context',
    label: c.context,
    detail: c.psychological_job,
    view: 'voicelab',
  });
}
for (const r of playbookRules) {
  entityIndex.set(r.id, {
    id: r.id,
    kind: 'rule',
    label: r.action,
    detail: r.rationale,
    view: 'playbook',
  });
}
for (const p of pathways) {
  entityIndex.set(p.id, {
    id: p.id,
    kind: 'pathway',
    label: p.state,
    detail: p.objective,
    view: 'resonance',
  });
}
for (const d of domains) {
  entityIndex.set(d.id, {
    id: d.id,
    kind: 'mechanism',
    label: d.name,
    detail: d.focus,
    view: 'evidence',
  });
}
for (const v of brandValues) {
  entityIndex.set(v.id, {
    id: v.id,
    kind: 'value',
    label: v.value,
    detail: v.voiceTrait,
    view: 'values',
  });
}
for (const c of channels) {
  entityIndex.set(c.id, {
    id: c.id,
    kind: 'channel',
    label: c.channel,
    detail: c.channelRule,
    view: 'channels',
  });
}
for (const rs of resonanceStates) {
  entityIndex.set(rs.id, {
    id: rs.id,
    kind: 'state',
    label: rs.state,
    detail: rs.workThrough,
    view: 'resonance',
  });
}
for (const kt of indonesiaContrasts) {
  entityIndex.set(kt.id, {
    id: kt.id,
    kind: 'contrast',
    label: kt.dimension,
    detail: kt.note,
    view: 'indonesia',
  });
}
for (const sc of scenarios) {
  entityIndex.set(sc.id, {
    id: sc.id,
    kind: 'scenario',
    label: sc.scenario,
    detail: sc.brief,
    view: 'scenarios',
  });
}

export function getEntity(id: string): EntityRef | undefined {
  return entityIndex.get(id.toUpperCase());
}

/**
 * Backlinks are built once at module load and are symmetric: if a playbook rule cites
 * M01, the rule appears on M01's rail and M01 appears on the rule's. The previous
 * hand-wired links ran one way only, so a mechanism could reach its claims while
 * nothing could reach back.
 */
const backlinks = new Map<string, RelatedEntity[]>();

function push(targetId: string, entry: RelatedEntity) {
  const key = targetId.toUpperCase();
  if (!entityIndex.has(key) || key === entry.id.toUpperCase()) return;
  const list = backlinks.get(key) ?? [];
  if (list.some((e) => e.kind === entry.kind && e.id === entry.id)) return;
  list.push(entry);
  backlinks.set(key, list);
}

function refOf(id: string): RelatedEntity | null {
  const e = entityIndex.get(id.toUpperCase());
  return e ? { id: e.id, kind: e.kind, label: e.label, detail: e.detail, view: e.view } : null;
}

/** Records an edge in both directions between a record and each id it references. */
function link(sourceId: string, targets: Iterable<string>, self: RelatedEntity) {
  for (const raw of targets) {
    const target = raw.toUpperCase();
    if (!entityIndex.has(target)) continue;
    push(target, self);
    const back = refOf(target);
    if (back && entityIndex.has(sourceId.toUpperCase())) push(sourceId, back);
  }
}

function idsIn(text: string): string[] {
  return [...new Set([...String(text).matchAll(ID_PATTERN)].map((m) => m[1].toUpperCase()))];
}

for (const c of claims) {
  // Claims carry theme tags rather than mechanism ids, so the link comes from the map.
  const self: RelatedEntity = {
    id: c.claim_id,
    kind: 'claim',
    label: c.claim,
    detail: `${c.author_year} · ${c.research_design}`,
    view: 'evidence',
  };
  for (const mid of c.derived.mechanismIds) push(mid, self);
  for (const did of idsIn(c.source_domains)) push(did, self);
}

for (const x of contradictions) {
  const self: RelatedEntity = {
    id: x.id,
    kind: 'contradiction',
    label: x.apparent_contradiction,
    detail: `Resolved by: ${x.actual_distinguishing_variable}`,
    view: 'contradictions',
  };
  link(x.id, idsIn([x.source_domains, x.evidence_on_each_side, x.design_implication, x.boundary_condition].join(' ')), self);
}

for (const r of playbookRules) {
  const self: RelatedEntity = { id: r.id, kind: 'rule', label: r.action, detail: r.rationale, view: 'playbook' };
  link(r.id, idsIn([r.mechanism, r.rationale, r.boundaryCondition].join(' ')), self);
}

for (const p of pathways) {
  const self: RelatedEntity = { id: p.id, kind: 'pathway', label: p.state, detail: p.objective, view: 'resonance' };
  link(p.id, [p.mechanismId, ...idsIn([p.linguistic, p.failureMode].join(' '))], self);
}

for (const a of manosphereAlternatives) {
  push(a.mechanismId, {
    id: a.mechanismId,
    kind: 'mechanism',
    label: `Manosphere function: ${a.functionName}`,
    detail: a.keyPrinciple,
    view: 'manosphere',
  });
}

for (const v of brandValues) {
  const self: RelatedEntity = { id: v.id, kind: 'value', label: v.value, detail: v.voiceTrait, view: 'values' };
  link(v.id, [...v.mechanismIds, ...v.contextIds, ...idsIn([v.researchBasis, v.principleRef, v.boundaryCondition].join(' '))], self);
}

for (const c of channels) {
  const self: RelatedEntity = { id: c.id, kind: 'channel', label: c.channel, detail: c.channelRule, view: 'channels' };
  link(c.id, [...c.contextIds, ...c.valueIds, ...c.avoidHere.map((a) => a.contextId)], self);
}

for (const sc of scenarios) {
  const self: RelatedEntity = { id: sc.id, kind: 'scenario', label: sc.scenario, detail: sc.brief, view: 'scenarios' };
  link(sc.id, [sc.channelId, sc.contextId, ...sc.valueIds], self);
}

for (const rs of resonanceStates) {
  const self: RelatedEntity = { id: rs.id, kind: 'state', label: rs.state, detail: rs.workThrough, view: 'resonance' };
  link(rs.id, [rs.mechanismId], self);
}

for (const kt of indonesiaContrasts) {
  const self: RelatedEntity = { id: kt.id, kind: 'contrast', label: kt.dimension, detail: kt.note, view: 'indonesia' };
  link(kt.id, kt.mechanismIds, self);
}

for (const l of languageRegisters) {
  const self: RelatedEntity = { id: l.id, kind: 'register', label: l.label, detail: l.socialRelationship, view: 'language' };
  for (const target of idsIn(l.evidenceBasis)) push(target, self);
}

for (const c of toneContexts) {
  const self: RelatedEntity = {
    id: c.context_id,
    kind: 'context',
    label: c.context,
    detail: c.psychological_job,
    view: 'voicelab',
  };
  link(c.context_id, idsIn([c.linguistic_properties, c.avoid, c.psychological_job].join(' ')), self);
}

/** Everything in the corpus that references this id, grouped by kind. */
export function getRelated(id: string): RelatedEntity[] {
  return backlinks.get(id.toUpperCase()) ?? [];
}

export function getRelatedGrouped(id: string): Record<string, RelatedEntity[]> {
  const out: Record<string, RelatedEntity[]> = {};
  for (const entry of getRelated(id)) {
    (out[entry.kind] ??= []).push(entry);
  }
  return out;
}

/* ── search ─────────────────────────────────────────────────── */

export interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  category: 'Mechanism' | 'Claim' | 'Contradiction' | 'Context' | 'Language' | 'Playbook' | 'Pathway' | 'Manosphere' | 'Value' | 'Channel' | 'Scenario' | 'Glossary';
  view: ViewType;
}

export function searchKnowledgeBase(query: string): SearchResult[] {
  if (!query || query.trim().length < 2) return [];
  const q = query.toLowerCase().trim();
  const results: SearchResult[] = [];
  const hit = (haystack: string) => matchesText(haystack, q);

  for (const m of mechanisms) {
    if (hit(`${m.mechanism_id} ${m.mechanism} ${m.appraisal} ${m.psychological_mechanism} ${m.failure_mode}`)) {
      results.push({
        id: m.mechanism_id,
        title: `${m.mechanism_id}: ${m.mechanism}`,
        subtitle: m.psychological_mechanism,
        category: 'Mechanism',
        view: 'mechanisms',
      });
    }
  }

  for (const x of contradictions) {
    if (hit(`${x.id} ${x.apparent_contradiction} ${x.actual_distinguishing_variable} ${x.design_implication}`)) {
      results.push({
        id: x.id,
        title: `${x.id}: ${x.apparent_contradiction}`,
        subtitle: `Resolved by: ${x.actual_distinguishing_variable}`,
        category: 'Contradiction',
        view: 'contradictions',
      });
    }
  }

  for (const c of toneContexts) {
    if (hit(`${c.context_id} ${c.context} ${c.psychological_job} ${c.linguistic_properties} ${c.avoid}`)) {
      results.push({
        id: c.context_id,
        title: `${c.context_id}: ${c.context}`,
        subtitle: c.psychological_job,
        category: 'Context',
        view: 'voicelab',
      });
    }
  }

  for (const l of languageRegisters) {
    if (hit(`${l.term} ${l.label} ${l.socialRelationship} ${l.regionalClassCoding} ${l.authenticityRisks}`)) {
      results.push({
        id: l.id,
        title: l.label,
        subtitle: l.socialRelationship,
        category: 'Language',
        view: 'language',
      });
    }
  }

  for (const r of playbookRules) {
    if (hit(`${r.id} ${r.action} ${r.avoid} ${r.rationale} ${r.category}`)) {
      results.push({
        id: r.id,
        title: `${r.id}: ${r.action}`,
        subtitle: r.rationale,
        category: 'Playbook',
        view: 'playbook',
      });
    }
  }

  for (const p of pathways) {
    if (hit(`${p.id} ${p.state} ${p.objective} ${p.linguistic} ${p.failureMode}`)) {
      results.push({
        id: p.id,
        title: p.state,
        subtitle: p.objective,
        category: 'Pathway',
        view: 'resonance',
      });
    }
  }

  for (const a of manosphereAlternatives) {
    if (hit(`${a.functionName} ${a.underlyingNeed} ${a.ethicalAlternative} ${a.keyPrinciple}`)) {
      results.push({
        id: a.mechanismId,
        title: a.functionName,
        subtitle: a.keyPrinciple,
        category: 'Manosphere',
        view: 'manosphere',
      });
    }
  }

  for (const g of glossary) {
    if (hit(`${g.term} ${g.plain}`)) {
      results.push({ id: g.id, title: g.term, subtitle: g.plain, category: 'Glossary', view: 'gaps' });
    }
  }

  for (const v of brandValues) {
    if (hit(`${v.id} ${v.value} ${v.voiceTrait} ${v.researchBasis} ${v.brandBasis}`)) {
      results.push({ id: v.id, title: v.value, subtitle: v.voiceTrait, category: 'Value', view: 'values' });
    }
  }

  for (const c of channels) {
    if (hit(`${c.id} ${c.channel} ${c.channelRule} ${c.exposureNote} ${c.whoSpeaks}`)) {
      results.push({ id: c.id, title: c.channel, subtitle: c.channelRule, category: 'Channel', view: 'channels' });
    }
  }

  for (const sc of scenarios) {
    if (hit(`${sc.id} ${sc.scenario} ${sc.brief} ${sc.worked.copy} ${sc.weak.copy}`)) {
      results.push({ id: sc.id, title: sc.scenario, subtitle: sc.brief, category: 'Scenario', view: 'scenarios' });
    }
  }

  for (const cl of claims) {
    if (results.length > 40) break;
    if (hit(`${cl.claim_id} ${cl.claim} ${cl.original_study} ${cl.author_year} ${cl.outcome_dv}`)) {
      results.push({
        id: cl.claim_id,
        title: `${cl.claim_id}: ${cl.author_year}`,
        subtitle: cl.claim,
        category: 'Claim',
        view: 'evidence',
      });
    }
  }

  return results.slice(0, 24);
}

export { confidenceTier };
