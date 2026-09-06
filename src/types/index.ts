export type MaleSpecificityClass = 
  | 'GENERAL' 
  | 'SOCIAL-CONTEXT' 
  | 'MALE-DIFFERENTIATED' 
  | 'INDONESIA-CONFIGURED';

export type EvidenceStrength = 
  | 'STRONG' 
  | 'MODERATE-STRONG' 
  | 'MODERATE' 
  | 'PROMISING/TENTATIVE' 
  | 'MIXED' 
  | 'WEAK' 
  | 'UNSUPPORTED' 
  | 'UNKNOWN / UNTESTED';

export interface Mechanism {
  mechanism_id: string;
  mechanism: string;
  message_feature: string;
  perceived_social_meaning: string;
  appraisal: string;
  psychological_mechanism: string;
  emotional_response: string;
  relational_response: string;
  behavioural_possibility: string;
  key_moderators: string;
  evidence_strength: string;
  male_specificity_class: string;
  failure_mode: string;
}

export interface Claim {
  claim_id: string;
  claim: string;
  source_domains: string;
  report_coverage: string;
  original_study: string;
  author_year: string;
  country: string;
  population: string;
  age_range: string;
  sample_size: string;
  topic_domain: string;
  research_design: string;
  predictor_iv: string;
  outcome_dv: string;
  effect_size: string;
  direction: string;
  confidence: string;
  limitations: string;
  causal: string;
  replicated: string;
  indonesia_specific: string;
  male_specific: string;
  wording_manipulated: string;
  evidence_concerns: string;
  evidence_category: string;
  mechanism_cluster: string;
  male_specificity_class: string;
}

export interface Contradiction {
  id: string;
  apparent_contradiction: string;
  evidence_on_each_side: string;
  why_it_looks_like_a_contradiction: string;
  actual_distinguishing_variable: string;
  boundary_condition: string;
  design_implication: string;
  source_domains: string;
  confidence: string;
  status: string;
}

export interface Intersection {
  mechanism_id: string;
  mechanism: string;
  D1_global_male_comms: string;
  D2_indonesian_male_comms: string;
  D3_global_manosphere: string;
  D4_indonesian_sea_manosphere: string;
  D5_masculinity_framing: string;
  D6_moral_communication: string;
  D7_indonesia_masculinity_mh: string;
  domain_breadth_moderate_or_above: string;
  unique_underlying_studies: string;
  evidence_strength: string;
  interpretation_note: string;
}

export interface ToneContext {
  context_id: string;
  context: string;
  psychological_job: string;
  authority_peerhood: string;
  emotional_explicitness: string;
  behavioural_explicitness: string;
  agency_collectivity: string;
  seriousness_humour: string;
  gender_marking: string;
  moral_loading: string;
  cta_pressure: string;
  certainty: string;
  register_formality: string;
  linguistic_properties: string;
  avoid: string;
  confidence: string;
}

export interface ConfidenceItem {
  id: string;
  conclusion: string;
  confidence_tier: string;
  evidence_category: string;
  principal_limitation: string;
  male_specificity_class: string;
  source_domains: string;
}

export interface LanguageRegister {
  id: string;
  term: string;
  type: string;
  label: string;
  authorityLevel: number;
  intimacyLevel: number;
  socialRelationship: string;
  regionalClassCoding: string;
  appropriateContexts: string[];
  inappropriateContexts: string[];
  authenticityRisks: string;
  evidenceBasis: string;
}

export interface ManosphereAlternative {
  functionName: string;
  mechanismId: string;
  underlyingNeed: string;
  whyCompelling: string;
  harmfulImplementation: string;
  ethicalAlternative: string;
  keyPrinciple: string;
}

export interface PlaybookRule {
  id: string;
  category: string;
  action: string;
  avoid: string;
  rationale: string;
  mechanism: string;
  confidence: string;
  boundaryCondition: string;
  /** Illustrative wordings, authored in scripts/parse-data.cjs. Never tested copy. */
  doExamples: { example: string; why: string }[];
  dontExamples: { example: string; why: string }[];
}

/** A recipient state and the communication chain reverse-engineered for it (Voice Strategy §25). */
export interface Pathway {
  id: string;
  state: string;
  objective: string;
  appraisal: string;
  mechanismId: string;
  mechanismName: string;
  emotion: string;
  arousal: 'LOW' | 'MODERATE';
  linguistic: string;
  failureMode: string;
}

/** One of the seven source domains in the corpus. */
export interface Domain {
  id: string;
  name: string;
  studies: number;
  reliability: string;
  focus: string;
}

/** An empirical Indonesian study from the D7 base. */
export interface IndonesianStudy {
  author: string;
  design: string;
  sample: string;
  domain: string;
  findings: string;
}

/** A brand value, its voice trait, and the do/don't pair that operationalises it.
 * Values are a strategic synthesis of the corpus against the brand snapshot, not a
 * measured finding. `spectrum.position` is a chosen default, never an observation. */
export interface BrandValue {
  id: string;
  value: string;
  voiceTrait: string;
  principleRef: string;
  mechanismIds: string[];
  contextIds: string[];
  researchBasis: string;
  brandBasis: string;
  confidence: string;
  spectrum: {
    dimension: string;
    leftPole: string;
    rightPole: string;
    position: number;
    positionNote: string;
  };
  boundaryCondition: string;
  dos: { example: string; why: string }[];
  donts: { example: string; why: string }[];
}

/** A delivery surface. The organising variable is exposure: who can see him respond. */
export interface Channel {
  id: string;
  channel: string;
  whoSpeaks: string;
  exposureLevel: number;
  exposureNote: string;
  ctaCeiling: string;
  lengthBudget: string;
  replyExpected: string;
  contextIds: string[];
  avoidHere: { contextId: string; why: string }[];
  valueIds: string[];
  evidenceTier: string;
  evidenceNote: string;
  channelRule: string;
}

/** A worked channel x context sample. Every one is illustrative, none is tested wording. */
export interface Scenario {
  id: string;
  scenario: string;
  channelId: string;
  contextId: string;
  valueIds: string[];
  brief: string;
  weak: { copy: string; problems: { example: string; why: string }[] };
  worked: { copy: string; annotations: { example: string; valueId: string; why: string }[] };
  epistemicTier: string;
  notTested: string;
}

/** A target emotional state, the mechanism it works through, and how it backfires. */
export interface ResonanceState {
  id: string;
  state: string;
  mechanismId: string;
  workThrough: string;
  arousal: 'LOW' | 'MODERATE';
  backfireRisk: string;
  confidence: string;
}

/** One dimension on which the Indonesian configuration converges with or departs from
 * the global literature. `north` and `south` are coding frequencies where the synthesis
 * reports them, and are absent where the contrast is qualitative. */
export interface IndonesiaContrast {
  id: string;
  dimension: string;
  north?: number;
  south?: number;
  status: 'CONVERGES' | 'DIVERGES' | 'GAP';
  note: string;
  evidenceStatus: string;
  mechanismIds: string[];
}

/** Anything addressable by a stable corpus id (M/X/C/R/D/P). */
export type EntityKind =
  | 'mechanism'
  | 'claim'
  | 'contradiction'
  | 'context'
  | 'rule'
  | 'pathway'
  | 'register'
  | 'value'
  | 'channel'
  | 'scenario'
  | 'state'
  | 'contrast';

export interface RelatedEntity {
  id: string;
  kind: EntityKind;
  label: string;
  detail: string;
  view: ViewType;
}

export type ViewType =
  // v2 Writer Edition Primary Views
  | 'foundations'
  | 'studio'
  | 'lexicon'
  | 'sandbox'
  | 'indonesia'
  // Secondary / Legacy Compatibility Views
  | 'overview'
  | 'mechanisms'
  | 'evidence'
  | 'cross-report'
  | 'contradictions'
  | 'language'
  | 'resonance'
  | 'framing'
  | 'manosphere'
  | 'moral'
  | 'voicelab'
  | 'playbook'
  | 'gaps'
  | 'values'
  | 'channels'
  | 'scenarios';

export interface ToneExemplar {
  id: string;
  contextId: string;
  channel: string;
  worked: {
    copy: string;
  };
  weak: {
    copy: string;
  };
  rationale: string;
}

