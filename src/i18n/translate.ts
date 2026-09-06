import generated from './id.generated.json';
import curated from './id.curated.json';
import claimTranslations from './id.claims.json';
import claims from '../data/claims.json';

export type Language = 'en' | 'id';
export const LANGUAGE_KEY = 'menungsa-language';
const normalize = (value: string) => value.replace(/\s+/g, ' ').trim();
const decode = (s: string) => s.replace(/&amp;/g, '&').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&ldquo;/g, '“').replace(/&rdquo;/g, '”').replace(/&nbsp;/g, ' ');
export const dictionary: Record<string, string> = Object.fromEntries(Object.entries({ ...generated, ...curated }).map(([key, value]) => [decode(key), value]));
for (const claim of claims) {
  const translated = (claimTranslations as Record<string, string>)[claim.claim_id];
  if (translated) dictionary[claim.claim] = translated;
}
const cache = new Map<string, string>();
const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// Exact phrases first. The fallback covers dynamic counts and entity-id prefixes,
// using longest matches without ever changing ids, filters or the underlying data.
const phrases = Object.keys(dictionary).filter(s => /[a-zA-Z]/.test(s)).sort((a,b)=>b.length-a.length);
const pattern = new RegExp(`(?<![\\p{L}\\p{N}_])(?:${phrases.map(escape).join('|')})(?![\\p{L}\\p{N}_])`, 'gu');

export function translate(value: string, language: Language = 'id'): string {
  if (language === 'en' || !value.trim()) return value;
  const cached = cache.get(value);
  if (cached !== undefined) return cached;
  const key = normalize(value);
  const result = dictionary[key] ?? key.replace(pattern, match => dictionary[match] ?? match);
  const output = (value.match(/^\s*/)?.[0] ?? '') + result + (value.match(/\s*$/)?.[0] ?? '');
  cache.set(value, output);
  return output;
}

export function readLanguage(): Language {
  try { return localStorage.getItem(LANGUAGE_KEY) === 'en' ? 'en' : 'id'; }
  catch { return 'id'; }
}

/** Search the original and its Indonesian wording; both languages remain usable. */
export function matchesText(value: string, query: string): boolean {
  const q = query.trim().toLocaleLowerCase();
  return value.toLocaleLowerCase().includes(q) || translate(value).toLocaleLowerCase().includes(q);
}
