# English / Indonesian presentation

The EN / ID button beside the desktop theme control changes the presentation language without replacing the English source or resetting the active view and filters. The choice is stored locally; English is the default.

## Maintenance

- `src/i18n/id.curated.json`: reviewed terminology, interface labels, and contextual explanations. Overrides draft translations.
- `src/i18n/id.claims.json`: individually edited translations of all 100 claim summaries, keyed by the unchanged claim IDs.
- `src/i18n/id.generated.json`: baseline prose dictionary. The authoring utility is optional and must not be run automatically during builds; review additions in context.
- The local JSX runtime translates text and accessibility labels through React context. It adds no HTML wrappers and preserves canonical values, identifiers, handlers, classes, and styles. Search accepts English and Indonesian.
- Original study titles, citations, quoted linguistic examples, source data, and publication figure artwork remain unchanged. Figure captions and surrounding explanations are localized; English text embedded in original image files remains English.

## Checks

Run `npm run test:i18n`, `npm run build`, and `npm run lint`.

The locale check renders all 14 views in both languages and compares HTML structure and visual attributes, checks coverage of prose, English restoration, 100 translated claims and their numbers, canonical evidence counts, bilingual search, and protected linguistic examples. Browser checks are still needed for typography, responsive navigation, interactive filters, theme controls, and persistence after reload.

On narrow screens the secondary brand badge and redundant M monogram are hidden, and navbar spacing is compacted to make room for EN / ID. Desktop branding and the original content layout are retained. Longer Indonesian sentences may naturally wrap onto additional lines.
