/** Build-time localization inventory. Source research and canonical datasets stay unchanged. */
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

export const root = path.resolve(import.meta.dirname, '..');
const entries = new Map();
export const normalize = s => s.replace(/\s+/g, ' ').trim();
function add(value, origin) {
  const key = normalize(value);
  if (!/[a-zA-Z]{2}/.test(key) || key.length < 2) return;
  if (/^(?:https?:|\/|\.\.?\/|#[a-f\d]{3,8}$)/i.test(key)) return;
  if (/\b(?:bg|text|border|flex|grid|rounded|hover|font|px|py|gap|space|shadow|min|max|overflow|items|justify)-\S/.test(key)) return;
  if (/(?:minmax|repeat|calc|var|color-mix|clamp|translate|rotate)\(/.test(key)) return;
  if (/^[\w./-]+\.(?:json|tsx?|css|png|svg|csv|md)$/.test(key)) return;
  if (/^[A-Z]\d{1,3}$/.test(key)) return;
  if (!entries.has(key)) entries.set(key, new Set());
  entries.get(key).add(origin);
}
const ignoredProps = new Set(['className', 'key', 'id', 'value', 'htmlFor', 'd', 'fill', 'stroke', 'viewBox', 'type', 'role', 'src', 'href', 'target', 'rel', 'style', 'aria-controls', 'aria-labelledby', 'aria-describedby', 'aria-activedescendant', 'aria-owns', 'data-sound', 'data-press']);
/** Is this expression the value of an attribute that never holds human text?
 *
 * A template literal inside `className` or `aria-activedescendant` is wiring, not
 * copy — translating `option-${i}` would break the reference it points at — yet
 * the catalog was collecting those heads and the locale check was then demanding
 * translations for them. The value is often wrapped in a conditional or a
 * concatenation first, so this climbs rather than looking only at the parent. */
function inIgnoredAttribute(node) {
  let cur = node.parent;
  for (let hops = 0; cur && hops < 8; hops += 1, cur = cur.parent) {
    if (ts.isJsxAttribute(cur)) return ignoredProps.has(cur.name.text);
    if (ts.isJsxElement(cur) || ts.isJsxSelfClosingElement(cur) || ts.isJsxFragment(cur) || ts.isSourceFile(cur)) return false;
  }
  return false;
}

function walkSource(file) {
  const ast = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  function visit(n) {
    if (ts.isJsxText(n)) add(n.text, file.replace(root + '/', ''));
    if (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) {
      const p = n.parent;
      if (ts.isImportDeclaration(p) || ts.isExportDeclaration(p) || ts.isImportSpecifier(p)) return;
      if (ts.isJsxAttribute(p) && ignoredProps.has(p.name.text)) return;
      if (ts.isPropertyAssignment(p) && ['id', 'view', 'kind', 'fileName', 'color', 'className', 'value'].includes(p.name.getText())) return;
      if (n.text.includes(' ') || ts.isJsxAttribute(p) || (ts.isPropertyAssignment(p) && ['label', 'title', 'description', 'name', 'subtitle', 'category', 'unit'].includes(p.name.getText()))) add(n.text, file.replace(root + '/', ''));
    }
    if (ts.isTemplateExpression(n) && !inIgnoredAttribute(n)) {
      add(n.head.text, file.replace(root + '/', ''));
      for (const s of n.templateSpans) add(s.literal.text, file.replace(root + '/', ''));
    }
    ts.forEachChild(n, visit);
  }
  visit(ast);
}
function scan(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== 'i18n') scan(f); }
    else if (/\.tsx$/.test(f) || /(?:normalize|data\/index)\.ts$/.test(f)) walkSource(f);
  }
}
scan(path.join(root, 'src/components/views'));
const protectedKeys = /^(?:id|.*_id|.*Ids|.*Id|.*_ids|source_citation|citation|url|doi|source_report|source_reports|primary_source|source_file|file|author|authors|term|example|illustrativeCopy|copy|rationale|why|dos|donts|channelRule|objective|linguistic|failureMode|brief)$/;
function walkData(x, file, key = '') {
  if (typeof x === 'string') { if (!protectedKeys.test(key)) add(x, `src/data/${file}:${key}`); }
  else if (Array.isArray(x)) x.forEach(v => walkData(v, file, key));
  else if (x) for (const [k, v] of Object.entries(x)) walkData(v, file, k);
}
for (const f of fs.readdirSync(path.join(root, 'src/data')).filter(f => f.endsWith('.json') && !['copyCheatsheet.json', 'toneExemplars.json'].includes(f))) walkData(JSON.parse(fs.readFileSync(path.join(root, 'src/data', f), 'utf8')), f);
export const catalog = [...entries].map(([source, origins]) => ({ source, origins: [...origins] }));
if (process.argv[1] === import.meta.filename) {
  if (process.argv.includes('--json')) console.log(JSON.stringify(catalog, null, 2));
  else console.log(JSON.stringify({ strings: catalog.length, words: catalog.reduce((n,e)=>n+e.source.split(/\s+/).length,0), characters: catalog.reduce((n,e)=>n+e.source.length,0) }));
}
