# Website Content Map: Research Source to Website Implementation

This document traces how each primary research document, dataset, figure, and appendix from **Menungsa Writing Synthesis** is mapped into the interactive knowledge system.

---

## 1. Document & Synthesis Mapping

| Synthesis Document / Section | Primary Topics & Findings | Website Section | Interactive Feature & Visualization |
|---|---|---|---|
| **MENUNGSA_WRITING_SYNTHESIS.md (§1–4)** | Source audit, 7 domains, deduplication methodology | **Overview / Research Overview** | Domain counters, methodology notes, Figure 1 link |
| **MENUNGSA_WRITING_SYNTHESIS.md (§5–12)** | General human psychology vs. male-specific mechanisms | **Mechanisms Explorer** | Filterable mechanism grid, specificity badges, Figure 4 |
| **MENUNGSA_WRITING_SYNTHESIS.md (§13–18)** | Contradictions, boundary conditions, unresolved tension | **Contradictions & Bounds** | Side-by-side claim split, boundary variable inspector, Figure 9 |
| **MENUNGSA_WRITING_SYNTHESIS.md (§19–24)** | Manosphere deconstruction, moral communication | **Manosphere Alternatives & Moral Comms** | 5-step ethical alternative mapper, Figure 12, Moral Density simulator |
| **MENUNGSA_WRITING_SYNTHESIS.md (§25–30)** | Need-to-response pathways, 6 voice principles, tone space | **Resonance Flow & Voice Lab** | Sequential 6-step pathway visualizer, Figure 5 & 6, 14 context presets |
| **MENUNGSA_WRITING_SYNTHESIS.md (§31–38)** | Measurement, metrics, failure modes, research agenda | **Do & Don’t Playbook & Research Gaps** | Boundary condition rule cards, Figure 11, Factorial experiment builder |
| **04_evidence_derived_mechanism_model.md** | Complete Phase A mechanism catalogue (M01–M20) | **Mechanisms Explorer** | Mechanism detail drawer, appraisal, emotional response, failure modes |
| **05_indonesian_male_communication_translation.md** | Relational care, bapak trap, halus/kasar, sociolinguistics | **Indonesia Deep Dive & Language Lab** | 6 tabbed thematic areas, 4-tier epistemic tags, Relatability simulator |
| **06_mens_mental_health_voice_strategy.md** | Applied voice strategy for Menungsa, pronouns, copywriting | **Voice & Tone Lab & Playbook** | 10-dimension sliders, linguistic rules, anti-patterns, copy examples |
| **appendix/CONTRADICTIONS.md** | Detailed breakdown of X01–X12 | **Contradictions & Bounds** | Deep branching view, unresolved X10 spotlight |
| **appendix/EVIDENCE_GAPS.md** | Tiers 1–3 research gaps, future study designs | **Research Gaps & Agenda** | Gap priority cards, 4 factorial experiment protocols |
| **appendix/METHODOLOGY.md** | CIS methodology, deduplication rules, weighting | **Overview / Research Overview** | Deduplication metrics, domain reliability table |
| **appendix/SOURCE_AUDIT.md** | Audit of 14 files, 7 domains, quality assessment | **Overview / Research Overview** | Source reliability ratings (High vs Low) |

---

## 2. Dataset Mapping (CSV → JSON → UI)

| CSV Source File (`data/`) | Structured JSON File (`src/data/`) | Target Website Component | Primary Interaction |
|---|---|---|---|
| `claim_ledger.csv` (101 claims) | `claims.json` | `EvidenceView.tsx` | Search, 6 multi-dimensional filters, expandable rows, citation inspector |
| `mechanism_matrix.csv` (20 mechanisms) | `mechanisms.json` | `MechanismsView.tsx` | Search, specificity filter, strength filter, failure mode drawer |
| `contradiction_matrix.csv` (12 contradictions) | `contradictions.json` | `ContradictionsView.tsx` | Contradiction selector, boundary condition brancher, resolution status |
| `cross_report_intersection.csv` (20x7 matrix) | `intersections.json` | `CrossReportView.tsx` | 20x7 interactive heatmap, sort by breadth/studies, cell click inspector |
| `tone_context_matrix.csv` (14 contexts) | `toneContexts.json` | `VoiceLabView.tsx` | 14 context preset buttons, 10 continuous dimension sliders, avoid rules |
| `evidence_confidence.csv` (35 items) | `confidence.json` | Common Components | Dynamic `ConfidenceTag.tsx` on claims, mechanisms, and rules |
| Voice Strategy §29 (Linguistic rules) | `languageRegisters.json` | `LanguageLabView.tsx` | Pronoun comparison matrix, authority vs. intimacy levels, speaker simulator |
| Voice Strategy §25 & Section 13 | `manosphereAlternatives.json` | `ManosphereView.tsx` | 5 core functions, compelling appeal vs. toxic vs. ethical alternative |
| Voice Strategy §26, §33 | `playbookRules.json` | `PlaybookView.tsx` | Category filter, DO vs. DON'T comparison, mandatory boundary conditions |
| Appendix D | `researchGaps.json` | `ResearchGapsView.tsx` | Tiers 1–3 gaps, interactive 4 factorial experiment designer |

---

## 3. Publication Figures Mapping

All 12 high-resolution publication figures from `figures/` are served from `public/figures/` and viewable in vector SVG or high-res PNG via `FigureModal.tsx`:

| Figure | Title | Integrated In Section | Epistemic Guardrail Explicitly Noted |
|---|---|---|---|
| **Fig 1** | Research-Domain Relationship Map | OverviewView | Edge thickness represents shared literature, NOT independent replication. |
| **Fig 2** | Mechanism Convergence Across Domains | MechanismsView & CrossReportView | Cross-domain recurrence does NOT equal probability of effectiveness. |
| **Fig 3** | Evidence Strength × Practical Relevance | OverviewView & MechanismsView | Ordinal axes; distances between points are qualitative analyst judgments. |
| **Fig 4** | Communication Mechanism Model | MechanismsView & ResonanceView | Traces 5 processing stages; does not imply universal linear progression. |
| **Fig 5** | Need to Response Pathway | ResonanceView & VoiceLabView | Pathways are synthesized reverse-engineered hypotheses, not measured RCTs. |
| **Fig 6** | Multidimensional Tone Space | VoiceLabView | Continuous multi-axis space; not fixed personality archetypes. |
| **Fig 7** | Context × Tone Matrix | VoiceLabView | Ordinal 1–5 coordinates; not rigid copywriting templates. |
| **Fig 8** | Emotional Resonance Map | ResonanceView | Maps low vs high arousal; high emotional arousal is NOT the goal. |
| **Fig 9** | Contradictions and Boundary Conditions | ContradictionsView | Highlights resolved boundary variables; red highlight on unresolved X10. |
| **Fig 10** | Indonesia versus Global Configuration | IndonesiaView | Separates convergent from divergent realities; not individual prevalence. |
| **Fig 11** | The Evidence Funnel | ResearchGapsView | Visualizes drop from 154 general studies to 0 Indonesian wording RCTs. |
| **Fig 12** | Manosphere Function to Ethical Equivalent | ManosphereView | Need → Appeal → Toxic implementation → Ethical functional alternative. |
