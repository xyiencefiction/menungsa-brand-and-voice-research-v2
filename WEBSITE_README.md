# Menungsa Research Explorer — Interactive Knowledge System

An interactive visual knowledge system and research exploration application built from the **Menungsa Writing Synthesis** research corpus (~155,000 words, 14 source documents, 7 research domains, 101 catalogued claims, 20 mechanisms, 12 contradictions, and 14 tone context archetypes).

---

## 1. Core Purpose

The website is **not** a sequential PDF reader or static report viewer. It is an interactive **system for thinking** that enables researchers, communicators, and organizational leadership to:
- **Explore non-linearly** by querying core questions rather than reading sequentially.
- **Interrogate evidence strength** and methodology across 101 claims, distinguishing causal RCTs from correlational surveys.
- **Enforce scientific guardrails**: strictly preserving the boundary between *mechanism evidence* and *wording evidence*, and between *cross-domain recurrence* and *causal probability of effectiveness*.
- **Deep-dive into Indonesian cultural realities**: examining relational care, the *bapak* provider trap, *halus* vs. *kasar* masculinity, community care vs. surveillance, and material institutional friction.
- **Simulate tone and linguistic register decisions**: exploring pronoun licensing (`saya`, `kamu`, `gue`, `kita`) and 14 context presets (`C01`–`C14`) across 10 continuous tone dimensions.
- **Deconstruct manosphere appeals into ethical functional alternatives** without importing harmful ideology.

---

## 2. Architecture & Tech Stack

```
Menungsa Research Website/
├── index.html                   # HTML entry point with metadata
├── package.json                 # Dependencies & scripts
├── vite.config.ts               # Vite configuration with React & Tailwind v4
├── tsconfig.json                # TypeScript compiler configuration
├── public/
│   ├── figures/                 # 12 high-resolution SVG and PNG publication figures
│   └── data/                    # Canonical CSV datasets from research synthesis
├── scripts/
│   └── parse-data.cjs           # Node ETL script converting CSVs into typed JSON
├── src/
│   ├── types/index.ts           # Strict TypeScript definitions for all entities
│   ├── data/                    # Strongly typed JSON modules & query engine
│   │   ├── index.ts             # Central data service & search engine
│   │   ├── mechanisms.json      # 20 derived mechanisms (M01–M20)
│   │   ├── claims.json          # 101 catalogued claims
│   │   ├── contradictions.json  # 12 boundary condition contradictions (X01–X12)
│   │   ├── intersections.json   # 20x7 cross-report convergence matrix
│   │   ├── toneContexts.json    # 14 context presets across 10 dimensions (C01–C14)
│   │   ├── languageRegisters.json # Indonesian pronouns, gender terms, & vocatives
│   │   ├── manosphereAlternatives.json # 5 functional deconstruction pathways
│   │   ├── playbookRules.json   # 7 applied do/don't rules with boundary conditions
│   │   └── researchGaps.json    # Tier 1-3 gaps & 4 priority wording experiments
│   ├── components/
│   │   ├── layout/              # Header, Sidebar, GlobalSearch
│   │   ├── common/              # EpistemicBadge, ConfidenceTag, OutcomeBadge, FigureModal
│   │   └── views/               # 14 comprehensive interactive exploration views
│   ├── App.tsx                  # Application router, state manager, & guided mode
│   ├── main.tsx                 # React DOM mount point
│   └── index.css                # Tailwind CSS v4 styling & typography
└── WEBSITE_README.md
```

- **Framework**: React 19 + TypeScript + Vite 8
- **Styling**: Tailwind CSS v4 + custom research dark palette (calm, high-contrast, editorial typography)
- **Icons**: Lucide React
- **Data Ingestion**: PapaParse + automated Node.js ETL pipeline
- **Performance**: Zero external API dependencies, instant client-side filtering, sub-second responses.

---

## 3. How to Run the Website

### Development Server
```bash
cd "Menungsa Research Website"
npm run dev
```
Open the provided local URL (typically `http://localhost:5173`) in any modern browser.

### Production Build
```bash
npm run build
```
Creates an optimized static bundle in `dist/`.

### Preview Production Build Locally
```bash
npm run preview
```

---

## 4. How to Update Research Data

The application features an automated ingestion pipeline. If you edit or add rows to any CSV in `public/data/` (or the canonical `Menungsa Writing Synthesis/data/`):
1. Place updated CSV files in `public/data/`.
2. Run the ingestion script:
   ```bash
   node scripts/parse-data.cjs
   ```
3. The script automatically parses, cleans, enriches, and validates all JSON datasets in `src/data/`.
4. Rebuild or reload the application (`npm run build`).

---

## 5. Primary Sections & Visualizations

| Section | Core Interaction | Primary Data / Visual |
|---|---|---|
| **1. Overview** | High-level synthesis metrics, core principles, "Explore by Question" matrix | Summary counters, Fig 1 Domain map |
| **2. Mechanisms Explorer** | Search, filter by specificity & strength, failure mode alerts, drawer | 20 mechanisms (M01–M20), Fig 2, Fig 4 |
| **3. Evidence Browser** | Multi-dimensional filter (domain, geography, causal design, wording test, outcome level) | 101 claims, effect sizes, citations |
| **4. Cross-Domain Heatmap** | 20x7 matrix with qualitative support coding, interactive cell inspector | Fig 2, cross-report intersection |
| **5. Contradictions & Bounds** | Side-by-side claim split, boundary variable decomposition, X10 spotlight | 12 conflicts (X01–X12), Fig 9 |
| **6. Indonesia Deep Dive** | 6 tabbed thematic areas with strict 4-tier epistemic badges | Relational care, bapak trap, Fig 10 |
| **7. Language & Register Lab** | Term comparison (authority vs. intimacy), Relatability Licensing Simulator | 12 pronouns & vocatives |
| **8. Emotional Resonance Flow** | 7 audience states → reverse-engineered 6-step communication chain | Fig 5 & Fig 8, low-arousal warning |
| **9. Masculinity Framing** | 5 framing modes comparison, 2x2 boundary condition simulator (coding × visibility) | Counterfactual checker, Brough et al. |
| **10. Manosphere Alternatives** | 5-step deconstruction: Need → Appeal → Toxic implementation → Ethical alternative | 5 core functions, Movember data, Fig 12 |
| **11. Moral Communication** | Non-linear Moral Density slider simulator, Diffusion vs Conversion paradox | Candia et al. & Leach et al. 1.28M posts |
| **12. Voice & Tone Lab** | 14 operational context presets (`C01`–`C14`), 10-dimension slider calibrations | Tone matrix, Fig 6, Fig 7 |
| **13. Do & Don’t Playbook** | Tactical rules with mechanisms, confidence, and boundary conditions | 7 playbook rules |
| **14. Research Gaps & Agenda** | Tier 1–3 gap analysis, interactive "Design a Wording Experiment" module | Fig 11 Evidence funnel, 4 factorial tests |
| **Global Search** | `Cmd+K` / `Ctrl+K` instant search across all concepts, claims, and registers | Search indexing |
| **Figure Modal** | High-resolution viewer for all 12 publication figures in vector SVG and PNG | Full metadata & "what it does not represent" |

---

## 6. Important Scientific Guardrails Preserved

1. **Wording Evidence vs. Mechanism Evidence**: Across all 101 claims, only 14 studies manipulated wording while holding other variables constant. The UI highlights this constraint prominently.
2. **Recurrence ≠ Effectiveness**: The cross-report heatmap makes clear that appearing in 6 domains does not equal high causal effectiveness.
3. **No Biologically Male Dialect**: Rejecting "male brain" claims; gender differences in speech are small and context-driven.
4. **Epistemic Labeling**: Indonesian cultural claims are explicitly tagged as `[EMPIRICALLY SUPPORTED IN INDONESIA]`, `[PLAUSIBLE LOCAL MECHANISM]`, `[WESTERN EXTRAPOLATION]`, or `[SPECULATIVE]`.
5. **No Universal Numbers**: Clearly warning that Candia's 30% moral density is corpus-specific and must never be applied as a rigid rule.
