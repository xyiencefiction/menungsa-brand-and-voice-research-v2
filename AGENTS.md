# AGENTS.md — Menungsa Writing Research v2 (Writing Guideline Application)

> **Context:** This file is the operational contract for AI agents working within `Menungsa Writing Research v2`. For the global monorepo architecture and research corpus, also refer to [../AGENTS.md](../AGENTS.md).

---

## 1. Application Overview

`Menungsa Writing Research v2` is the practical editorial guideline and writing studio web application for **Menungsa** (men's mental health advocacy in Indonesia).

### Core Features & Views (`src/components/views-v2/`):
1. **`VoiceFoundationsView.tsx` (`#foundations`)**: Menungsa Voice, 8 voice traits ticker marquee, 6 Value Pillars (`V1`–`V6`) with DO/DON'T comparison tables, and `ContextCheck.tsx`.
2. **`WritingStudioView.tsx` (`#studio`)**: Practical writing studio containing 56 exemplar pairs (`EX-C01-1` s/d `EX-C14-4`) and 5 channel scenarios (`SC1`–`SC5`) formatted as structured comparison tables with copy functionality.
3. **`WordGuideView.tsx` (`#lexicon`)**: Register guide for pronouns (`kamu`, `Anda`, `kita`, `kami`), gender terms, and 6 reader needs.
4. **`CopySandboxView.tsx` (`#sandbox`)**: Live draft tester powered by a 10.369+ entry calibrated lexicon (`copyCheatsheet.json`), multi-word boundary scanning, character interval tracking, negation handling, and tone diagnostics.
5. **`IndonesianNuancesView.tsx` (`#nuances`)**: 11 cultural dimensions (`KT01`–`KT11`) and relational care considerations in Indonesia.

---

## 2. Non-Negotiable Development Rules

1. **Epistemic Humility:** Never claim a scientifically proven "male tone of voice" exists. All copy examples are **ILLUSTRATIVE APPLICATIONS / PROPOSALS**, not tested wording. Disclaimers must be preserved.
2. **Design Tokens (`Brand Profile/DESIGN.md`):**
   - Palette: Warm dark canvas `#171918` (`soft-ink`), `#1C1917` (stone-900), Ochre `#D9B44F` (amber), Emerald `#2E4034` (green), Terracotta `#AF4D28` (rose/burgundy).
   - Never use raw white (`#FFFFFF`) or pure black (`#000000`).
   - Use solid fills for status badges, no garish gradients.
3. **DO vs DON'T Format:**
   - Always structure comparative guidance as a unified **comparison table** with balanced columns (50% / 50%), emerald `DO (Sesuai Panduan)` column on the left, and rose `DON'T (Perlu Dihindari)` on the right.
4. **Lexicon Generator Safety:**
   - Never modify `src/data/copyCheatsheet.json` directly without updating `scripts/build-cheatsheet.cjs`.
   - Always run `node scripts/build-cheatsheet.cjs` to recompile the dataset. Maintain at least **10.350+ entries**.
5. **Sandbox Matching Engine Standards:**
   - Multi-word phrases match first with word boundaries (`\b`).
   - Covered character intervals are tracked to prevent duplicate/false single-word penalties.
   - Negations (`tidak`, `nggak`, `tak`, `bukan`, `belum`, `jangan`) before moral/imperative words (e.g. *"nggak harus"*) represent agency and must not trigger moral penalties.
6. **Localization Safety:**
   - The custom JSX-runtime host (`src/i18n/host.ts`) auto-translates registered strings. Check for unintentional string mutations when creating UI labels.
   - Never alter canonical identifiers (`V1`–`V6`, `EX-C01-1`, `KT01`–`KT11`, `SC1`–`SC5`, `CH1`–`CH5`, `P1`–`P7`).

---

## 3. Essential Commands

```bash
# Start development server
npm run dev

# Run oxlint (0 errors required)
npm run lint

# Build production bundle
npm run build

# Recompile the 10.350+ entry copy cheatsheet
node scripts/build-cheatsheet.cjs

# Re-parse CSV datasets
node scripts/parse-data.cjs

# Run i18n locale checks
npm run test:i18n
```

---

## 4. Git & Vercel Deployment

- **Repository:** `https://github.com/xyiencefiction/menungsa-writing-guideline.git`
- **Branch:** `main`
- **Deployment Platform:** Vercel (Production)
- **Live Production URL:** [https://menungsa-brand-and-voice-research-v.vercel.app](https://menungsa-brand-and-voice-research-v.vercel.app)
- **Deployment Check:** `npx vercel ls menungsa-brand-and-voice-research-v2`

