/** Optional authoring utility, never executed by the app or production build.
 * Drafts only the site's published prose; curated overrides take precedence.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { catalog, root } from './locale-catalog.mjs';

const output = path.join(root, 'src/i18n/id.generated.json');
fs.mkdirSync(path.dirname(output), { recursive: true });
const translated = fs.existsSync(output) ? JSON.parse(fs.readFileSync(output, 'utf8')) : {};
const glossary = [
  ['boundary conditions', 'kondisi yang membatasi keberlakuan temuan'],
  ['boundary condition', 'batas keberlakuan temuan'],
  ['effect sizes', 'ukuran efek'], ['effect size', 'ukuran efek'],
  ['help-seeking', 'upaya mencari bantuan'], ['help seeking', 'upaya mencari bantuan'],
  ['wording experiments', 'eksperimen pilihan kata'], ['wording experiment', 'eksperimen pilihan kata'],
  ['wording', 'pilihan kata'], ['agency', 'kemampuan bertindak'],
  ['self-efficacy', 'keyakinan akan kemampuan diri'], ['appraisal', 'penilaian atas situasi'],
  ['registers', 'ragam bahasa'], ['register', 'ragam bahasa'],
  ['voice and tone', 'gaya dan nada komunikasi'], ['voice strategy', 'strategi gaya komunikasi'],
  ['tone of voice', 'nada komunikasi'], ['tone', 'nada komunikasi'],
  ['moral density', 'kepadatan muatan moral'], ['moral saturation', 'kejenuhan akibat muatan moral'],
  ['moral elevation', 'perasaan tergerak oleh kebaikan'],
  ['reactance', 'penolakan akibat merasa dikekang'],
  ['arousal', 'aktivasi emosi'], ['outcomes', 'hasil yang diukur'], ['outcome', 'hasil yang diukur'],
  ['failure modes', 'risiko kegagalan'], ['failure mode', 'risiko kegagalan'],
  ['moderators', 'faktor yang memengaruhi hubungan'], ['moderator', 'faktor yang memengaruhi hubungan'],
  ['stoicism', 'sikap menahan emosi dan enggan menunjukkan kesulitan'],
  ['stoic', 'menahan emosi'], ['belonging', 'rasa memiliki tempat dalam kelompok'],
  ['manosphere', 'manosphere'], ['RCTs', 'RCT'], ['RCT', 'RCT'],
  ['CIS', 'CIS'], ['JKN', 'JKN'], ['BPJS', 'BPJS'],
  ['halus', 'halus'], ['kasar', 'kasar'], ['gengsi', 'gengsi'],
  ['kamu', 'kamu'], ['gue', 'gue'], ['lo', 'lo'], ['kita', 'kita'], ['kami', 'kami'],
  ['Anda', 'Anda'], ['bapak', 'bapak'], ['cowok', 'cowok'], ['pria', 'pria'],
  ['laki-laki', 'laki-laki'], ['mas', 'mas'], ['bang', 'bang'],
];
const escaped = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
function protect(source) {
  const replacements = [];
  let text = source;
  for (const [en, id] of glossary) text = text.replace(new RegExp(`(?<![\\p{L}])${escaped(en)}(?![\\p{L}])`, 'giu'), () => {
    const token = `ZXQ${String(replacements.length).padStart(4, '0')}QXZ`;
    replacements.push([token, id]); return token;
  });
  text = text.replace(/(?:https?:\/\/\S+|\b[DMXCRPS]\d{1,3}\b|\b\d+(?:[.,]\d+)*(?:%|\b))/g, s => {
    const token = `ZXQ${String(replacements.length).padStart(4, '0')}QXZ`;
    replacements.push([token, s]); return token;
  });
  return { text, restore: s => replacements.reduce((s, [token, value]) => s.replaceAll(token, value), s) };
}
const pending = catalog.filter(e => !translated[e.source]);
const batches = []; let batch = [], length = 0;
for (const entry of pending) {
  if (length + entry.source.length > 2200 && batch.length) { batches.push(batch); batch = []; length = 0; }
  batch.push(entry); length += entry.source.length + 30;
}
if (batch.length) batches.push(batch);
let cursor = 0, done = 0;
async function request(entries) {
  const prepared = entries.map(e => protect(e.source));
  const q = prepared.map((p, i) => `\nZXSTART${i}ZX\n${p.text}\nZXEND${i}ZX`).join('\n');
  const url = new URL('https://translate.googleapis.com/translate_a/single');
  for (const [k,v] of Object.entries({client:'gtx',sl:'en',tl:'id',dt:'t',q})) url.searchParams.set(k,v);
  const { stdout } = await promisify(execFile)('curl', ['--fail', '-sS', '--max-time', '45', url.href], { maxBuffer: 2 * 1024 * 1024 });
  const data = JSON.parse(stdout);
  const text = data[0].map(x=>x[0] || '').join('');
  const values = entries.map((e,i) => {
    const match = text.match(new RegExp(`ZXSTART\\s*${i}\\s*ZX([\\s\\S]*?)ZXEND\\s*${i}\\s*ZX`, 'i'));
    if (!match) throw new Error(`Missing segment ${i}`);
    const value = prepared[i].restore(match[1].trim());
    if (/ZXQ|QXZ|ZXSTART|ZXEND/.test(value)) throw new Error('Unresolved protected term');
    return value;
  });
  entries.forEach((e,i) => { translated[e.source] = values[i]; });
}
async function worker() {
  while (cursor < batches.length) {
    const i = cursor++;
    let error;
    for (let attempt = 0; attempt < 3; attempt++) {
      try { await request(batches[i]); error = null; break; }
      catch(e) { error = e; await new Promise(r=>setTimeout(r, 1200 * (attempt+1))); }
    }
    if (error) {
      for (const entry of batches[i]) {
        try { await request([entry]); } catch(e) { console.error(`Untranslated: ${entry.source.slice(0,60)}: ${e.message}`); }
      }
    }
    done++;
    fs.writeFileSync(output, JSON.stringify(translated, null, 2) + '\n');
    console.log(`Draft batches ${done}/${batches.length}; ${Object.keys(translated).length}/${catalog.length} strings`);
  }
}
await Promise.all([worker(),worker(),worker()]);
