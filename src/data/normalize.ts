/**
 * Derived, controlled vocabularies for the free-prose fields in the canonical CSVs.
 *
 * The ledger stores `confidence`, `causal`, `wording_manipulated` and `outcome_dv`
 * as analyst prose (76 distinct confidence strings across 100 claims). Matching that
 * prose with `.includes()` at the UI layer produced wrong counts and dead filters, so
 * every categorical read now goes through this module instead.
 *
 * Nothing here rewrites the source rows: the prose is kept verbatim for reading and a
 * normalised twin is attached alongside it. Where a row genuinely cannot be classified
 * the answer is UNCLASSIFIED, never a default bucket.
 */

import type { Claim, Intersection } from '../types';

/* ── confidence ─────────────────────────────────────────────── */

export type ConfidenceTier =
  | 'STRONG'
  | 'MODERATE-STRONG'
  | 'MODERATE'
  | 'PROMISING'
  | 'MIXED'
  | 'WEAK'
  | 'OBSERVED'
  | 'INFERENCE'
  | 'UNCLASSIFIED';

/** Ordinal rank for sorting and for the sequential colour ramp. Higher = better evidenced. */
export const CONFIDENCE_RANK: Record<ConfidenceTier, number> = {
  STRONG: 6,
  'MODERATE-STRONG': 5,
  MODERATE: 4,
  PROMISING: 3,
  MIXED: 2,
  WEAK: 1,
  OBSERVED: 0,
  INFERENCE: 0,
  UNCLASSIFIED: 0,
};

export const CONFIDENCE_LABEL: Record<ConfidenceTier, string> = {
  STRONG: 'Strong',
  'MODERATE-STRONG': 'Moderate–strong',
  MODERATE: 'Moderate',
  PROMISING: 'Promising / tentative',
  MIXED: 'Mixed / contested',
  WEAK: 'Weak',
  OBSERVED: 'Observed practice only',
  INFERENCE: 'Cross-report inference',
  UNCLASSIFIED: 'Unclassified',
};

/** Tiers offered as filters, in reading order. */
export const CONFIDENCE_TIERS: ConfidenceTier[] = [
  'STRONG',
  'MODERATE-STRONG',
  'MODERATE',
  'PROMISING',
  'MIXED',
  'WEAK',
  'OBSERVED',
  'INFERENCE',
];

/**
 * Order matters: the compound tiers are tested before their own substrings, which is
 * exactly the bug this replaces (a plain `includes('STRONG')` matched MODERATE-STRONG
 * and returned half the ledger for "Strong").
 */
export function confidenceTier(raw: string | undefined): ConfidenceTier {
  if (!raw) return 'UNCLASSIFIED';
  const c = raw.trim().toUpperCase();
  if (!c) return 'UNCLASSIFIED';

  if (c.startsWith('CROSS-REPORT INFERENCE')) return 'INFERENCE';
  if (c.startsWith('OBSERVED PRACTICE')) return 'OBSERVED';
  if (c.startsWith('MIXED') || c.startsWith('CONTESTED')) return 'MIXED';
  if (c.startsWith('WEAK-MODERATE') || c.startsWith('MODERATE-LOW')) return 'WEAK';
  if (c.startsWith('WEAK') || c.startsWith('UNSUPPORTED')) return 'WEAK';
  if (c.startsWith('SPECULATIVE') || c.startsWith('EMERGING') || c.startsWith('PROMISING') || c.startsWith('TENTATIVE')) {
    return 'PROMISING';
  }
  if (c.startsWith('MODERATE-STRONG') || c.startsWith('MODERATE-HIGH') || c.startsWith('RELATIVELY STRONG')) {
    return 'MODERATE-STRONG';
  }
  if (c.startsWith('MODERATE')) return 'MODERATE';
  if (c.startsWith('STRONG')) return 'STRONG';
  return 'UNCLASSIFIED';
}

/* ── ternary flags ──────────────────────────────────────────── */

export type Ternary = 'YES' | 'PARTLY' | 'NO';

/**
 * `causal` holds "Yes", "Yes (RCT)", "Yes (experiments)", "Partly", "No", "No (bundled)".
 * Comparing with `=== 'yes'` filed four genuine experiments under "correlational", which
 * is the precise distinction the whole corpus exists to protect.
 */
function ternary(raw: string | undefined): Ternary {
  if (!raw) return 'NO';
  const v = raw.trim().toUpperCase();
  if (v.startsWith('YES')) return 'YES';
  if (v.startsWith('PARTLY') || v.startsWith('PARTIAL')) return 'PARTLY';
  return 'NO';
}

export const causalFlag = ternary;
export const wordingFlag = ternary;

export function indonesiaFlag(claim: Claim): Ternary {
  const explicit = ternary(claim.indonesia_specific);
  if (explicit !== 'NO') return explicit;
  return claim.country?.toLowerCase().includes('indonesia') ? 'YES' : 'NO';
}

/* ── evidence category A–G ──────────────────────────────────── */

export type EvidenceLetter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';

export const EVIDENCE_LETTER_LABEL: Record<EvidenceLetter, string> = {
  A: 'A · Causal',
  B: 'B · Correlational',
  C: 'C · Qualitative',
  D: 'D · Observed pattern',
  E: 'E · Industry practice',
  F: 'F · Theoretical',
  G: 'G · Cross-report inference',
};

/** Rows carry compounds like "A/B" or "D/E"; the first letter is the primary claim. */
export function evidenceLetters(raw: string | undefined): EvidenceLetter[] {
  if (!raw) return [];
  return raw
    .toUpperCase()
    .split(/[^A-G]+/)
    .filter((s): s is EvidenceLetter => s.length === 1 && s >= 'A' && s <= 'G');
}

/** D (observed pattern) and E (industry practice) are never convertible into psychological fact. */
export function isNonInferential(letters: EvidenceLetter[]): boolean {
  return letters.some((l) => l === 'D' || l === 'E');
}

/* ── outcome ladder ─────────────────────────────────────────── */

export type OutcomeLevel = 1 | 2 | 3 | 4 | 5 | 6 | 0;

export const OUTCOME_LABEL: Record<OutcomeLevel, string> = {
  6: 'L6 · Clinical outcome',
  5: 'L5 · Actual behaviour',
  4: 'L4 · Behavioural intention',
  3: 'L3 · Attitude / preference',
  2: 'L2 · Surface engagement',
  1: 'L1 · Observed practice',
  0: 'Unclassified',
};

export const OUTCOME_LEVELS: OutcomeLevel[] = [6, 5, 4, 3, 2, 1];

/**
 * Derived from `outcome_dv`, not from `evidence_category`. The previous badge matched
 * outcome words against the A–G letter field, so all 100 rows fell through to the raw
 * letter and the entire ladder was inert.
 *
 * Highest level present wins: a study measuring "stigma; attitude; intention; ACTUAL
 * help-seeking" is credited at its strongest measured outcome, not its weakest.
 */
export function outcomeLevel(claim: Claim): OutcomeLevel {
  const dv = (claim.outcome_dv || '').toLowerCase();
  if (!dv.trim()) return 0;

  const has = (...needles: string[]) => needles.some((n) => dv.includes(n));

  // "(none measured)" and other unmeasured rows stay at 0 rather than being credited a level.
  if (dv.includes('none measured')) return 0;

  if (has('suicid', 'depression', 'psychiatric', 'clinical', 'symptom', 'wellbeing', 'weight at', 'recovery', 'distress')) return 6;
  if (has('actual help-seeking', 'utilisation', 'utilization', 'behaviour change', 'behavior change', 'health-seeking behaviour', 'access to', 'service access', 'application rates', 'attendance', 'signature', 'uptake', 'consumption choice', 'programme engagement', 'disclosure', 'care pathway', 'help-seeking behaviour', 'selective rejection', 'mobilisation', 'entry and retention')) return 5;
  if (has('intention', 'willingness')) return 4;
  if (has('attitude', 'stigma', 'belief', 'preference', 'evaluation', 'perceiv', 'ideology', 'credibility', 'affect', 'anger', 'reactance', 'persuasion', 'resistance', 'literacy', 'knowledge', 'belonging', 'connection', 'isolation', 'attraction', 'optimism', 'loneliness', 'insecurity', 'legitimacy', 'accuracy', 'explanatory value')) return 3;
  if (has('engagement', 'sharing', 'retweet', 'click', 'reach', 'virality', 'diffusion', 'amplification', 'social reward', 'upvote', 'audience reaction', 'audience appeal', 'outrage expression', 'stakeholder response', 'monetisation', 'monetization')) return 2;
  if (has('corpus', 'frequency', 'words spoken', 'talkativeness', 'speech', 'membership', 'presence', 'transferability', 'usage', 'practice', 'traits', 'indicators', 'replicability', 'structure', 'discourse', 'rhetoric', 'terminology', 'distribution', 'share of', 'content', 'construction', 'self-definition', 'guidance', 'context', 'pressure')) return 1;
  if (has('help-seeking')) return 5;
  return 0;
}

/* ── claim → mechanism ──────────────────────────────────────── */

/**
 * `mechanism_cluster` holds theme tags, not mechanism ids: "BELONGING", "AGENCY",
 * "EMOTIONAL EXPOSURE COST". Matching an id against that column returns nothing, and
 * matching the mechanism's *name* against claim prose returns near-arbitrary hits.
 *
 * This table maps the ledger's own cluster vocabulary (117 distinct tags) onto the
 * mechanism catalogue by name. It is a derived correspondence, not an assertion made
 * by any source document, and the UI labels it as such. Tags with no defensible
 * mechanism (AUDIENCE HETEROGENEITY, MEDIA LITERACY, the "(none - null finding)"
 * markers) are deliberately left unmapped rather than guessed into a bucket.
 */
const CLUSTER_TO_MECHANISM: Record<string, string> = {
  'RESPONSE COST': 'M01', 'LOW EXPOSURE COST': 'M01', 'LOW EXPOSURE': 'M01',
  'SOCIAL EXPOSURE COST': 'M01', 'SOCIAL EXPOSURE': 'M01', STIGMA: 'M01', 'FAMILY STIGMA': 'M11',

  AGENCY: 'M02', EFFICACY: 'M02', USEFULNESS: 'M02', 'ACTIVITY-MEDIATED': 'M02',

  'UNCERTAINTY REDUCTION': 'M03', STRUCTURE: 'M03', CERTAINTY: 'M03', 'FALSE CERTAINTY': 'M03',
  FALSIFIABILITY: 'M03',

  BELONGING: 'M04', 'SOCIAL IDENTITY': 'M04', 'COLLECTIVE IDENTITY': 'M04', ISOLATION: 'M04',
  COMMUNITY: 'M04', 'PEER NORM ENFORCEMENT': 'M04',

  RECOGNITION: 'M05', VALIDATION: 'M05', 'LEGITIMISED EMOTION': 'M05', NORMALIZATION: 'M05',
  MODELLING: 'M05', GRIEVANCE: 'M05',

  AUTONOMY: 'M06', REACTANCE: 'M06', 'AUTONOMY/REACTANCE': 'M06', 'STEREOTYPE REACTANCE': 'M06',
  'IDENTITY POLICING': 'M06', 'COLLECTIVE INDICTMENT': 'M06',

  'IDENTITY CONGRUENCE': 'M07', 'IDENTITY-THREAT': 'M07', 'IDENTITY THREAT': 'M07',
  'IDENTITY REASSURANCE': 'M07', CONGRUENCE: 'M07', IDENTITY: 'M07', 'IDENTITY SIGNALLING': 'M07',
  'COLLECTIVE IDENTITY THREAT': 'M07', 'MALE-SPECIFIC ATTENTION': 'M07', NATURALISATION: 'M07',

  STATUS: 'M08', 'STATUS THREAT': 'M08', 'PROVIDER IDENTITY': 'M08', DIGNITY: 'M08',
  'DIGNITY AFTER FAILURE': 'M08', COMPETENCE: 'M08', 'STATUS ANXIETY': 'M08', MARRIAGEABILITY: 'M08',
  ASPIRATION: 'M08', RESPONSIBILITY: 'M08', 'SELF-RELIANCE': 'M08', FACE: 'M08', REPUTATION: 'M08',
  SHAME: 'M08', 'IMPRESSION MANAGEMENT': 'M08',

  'MESSENGER CREDIBILITY': 'M09', 'LICENSED INTIMACY': 'M09', CREDIBILITY: 'M09',
  'SOURCE LEGITIMACY': 'M09', AUTHENTICITY: 'M09', 'SOCIAL DISTANCE': 'M09',
  'INSTITUTIONAL DISTANCE': 'M09', 'INSTITUTIONAL TRUST': 'M09',

  'MOTIVE ATTRIBUTION': 'M10', 'COSTLY SIGNALLING': 'M10', 'VIRTUE DISCOUNTING': 'M10',
  'EXTERNAL ATTRIBUTION': 'M10', 'MORAL LEGITIMACY': 'M10',

  'RELATIONAL CARE': 'M11', CARE: 'M11',

  'COMMUNITY AS AGENT': 'M12', SURVEILLANCE: 'M12', 'COMMUNAL MORAL AUTHORITY': 'M12',

  'MEANING-MAKING': 'M13', RELIGION: 'M13',

  'MATERIAL CONDITIONS': 'M14', 'MATERIAL COST': 'M14', 'INSTITUTIONAL FRICTION': 'M14',

  HUMOR: 'M15', HUMOUR: 'M15',

  'QUANTIFIED STATUS': 'M16', 'STATUS LEGIBILITY': 'M16', 'SELF-OBJECTIFICATION': 'M16',
  'COMMERCIALISED INSECURITY': 'M16',

  'ALGORITHMIC AMPLIFICATION': 'M17', 'ALGORITHMIC FEEDBACK': 'M17', DIFFUSION: 'M17',
  'SOCIAL REWARD': 'M17', OUTRAGE: 'M17', POLARISATION: 'M17',

  'MORAL SALIENCE': 'M18', 'MORAL SATURATION': 'M18', 'MORAL RELEVANCE': 'M18',
  'MORAL CONVICTION': 'M18', 'ASYMMETRIC ALIENATION': 'M18',

  FATALISM: 'M19', HOPE: 'M19',

  'EMOTIONAL EXPOSURE COST': 'M20', 'VALIDATION WITHOUT EXPOSURE': 'M20',
  'INFORMATIONAL DIRECTNESS VS SOCIAL SOFTNESS': 'M20',
};

/** Longest keys first so "SOCIAL EXPOSURE COST" wins over "SOCIAL EXPOSURE". */
const CLUSTER_KEYS = Object.keys(CLUSTER_TO_MECHANISM).sort((a, b) => b.length - a.length);

export function clusterMechanisms(raw: string | undefined): string[] {
  if (!raw) return [];
  const out = new Set<string>();
  for (const token of raw.split(';').map((t) => t.trim().toUpperCase()).filter(Boolean)) {
    if (token.startsWith('(')) continue; // "(none - null finding)" and friends
    const exact = CLUSTER_TO_MECHANISM[token];
    if (exact) { out.add(exact); continue; }
    const partial = CLUSTER_KEYS.find((k) => token.includes(k));
    if (partial) out.add(CLUSTER_TO_MECHANISM[partial]);
  }
  return [...out];
}

/* ── mechanism convergence rows ─────────────────────────────── */

export function intersectionTier(row: Intersection): ConfidenceTier {
  return confidenceTier(row.evidence_strength);
}

export type SupportLevel = 0 | 1 | 2 | 3;

export const SUPPORT_LABEL: Record<SupportLevel, string> = {
  3: 'Strong support',
  2: 'Moderate support',
  1: 'Weak / adjacent',
  0: 'Not addressed',
};

/** The matrix cell scale is ordinal, so it gets one ramp rather than three unrelated hues. */
export function supportLevel(raw: string | undefined): SupportLevel {
  const v = (raw || '').trim().toUpperCase();
  if (v === 'STRONG_SUPPORT') return 3;
  if (v === 'MODERATE_SUPPORT') return 2;
  if (v === 'WEAK_ADJACENT') return 1;
  return 0;
}

/* ── attach to rows ─────────────────────────────────────────── */

export interface ClaimDerived {
  confidenceTier: ConfidenceTier;
  causal: Ternary;
  wording: Ternary;
  indonesia: Ternary;
  letters: EvidenceLetter[];
  nonInferential: boolean;
  outcome: OutcomeLevel;
  /** Derived from the cluster tag vocabulary, not stated by any source document. */
  mechanismIds: string[];
}

export function deriveClaim(claim: Claim): Claim & { derived: ClaimDerived } {
  const letters = evidenceLetters(claim.evidence_category);
  return {
    ...claim,
    derived: {
      confidenceTier: confidenceTier(claim.confidence),
      causal: causalFlag(claim.causal),
      wording: wordingFlag(claim.wording_manipulated),
      indonesia: indonesiaFlag(claim),
      letters,
      nonInferential: isNonInferential(letters),
      outcome: outcomeLevel(claim),
      mechanismIds: clusterMechanisms(claim.mechanism_cluster),
    },
  };
}
