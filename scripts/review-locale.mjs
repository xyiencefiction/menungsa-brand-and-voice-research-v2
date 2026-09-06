/** Reproducible terminology corrections after the draft pass. */
import fs from 'node:fs';
import { catalog } from './locale-catalog.mjs';
const file = 'src/i18n/id.generated.json';
const dictionary = JSON.parse(fs.readFileSync(file, 'utf8'));
for (const {source, origins} of catalog) {
  let text = dictionary[source];
  if (!text) continue;
  // Citations and the Indonesian examples being studied are source material.
  if (origins.some(o => /:(author_year|original_study)$/.test(o)) ||
      /^(?:[“"‘'])(?:Gue |Kamu |Sebagai laki-laki|Panduan |Layanan |Ambil kendali|Pria sejati)/.test(source)) {
    dictionary[source] = source; continue;
  }
  const edits = [
    [/buku besar klaim/gi, 'daftar klaim penelitian'],
    [/buku besar/gi, 'daftar klaim'],
    [/penonton/gi, 'penerima pesan'],
    [/hasil yang diukur Terukur/gi, 'hasil yang diukur'],
    [/kepolisian gender/gi, 'pemaksaan norma gender'],
    [/kebijakan gender/gi, 'pemaksaan norma gender'],
    [/penyalinan/gi, 'penulisan teks'],
    [/salinan/gi, 'teks'],
    [/lindung nilai/gi, 'ungkapan tentatif'],
    [/kognitif penilaian atas situasi/gi, 'penilaian kognitif'],
    [/penolakan akibat merasa dikekang psikologis/gi, 'reaktansi psikologis (penolakan karena merasa dikekang)'],
    [/psikologis penolakan akibat merasa dikekang/gi, 'reaktansi psikologis (penolakan karena merasa dikekang)'],
    [/tindakan yang merugikan/gi, 'tindakan yang membutuhkan usaha'],
    [/konkrit/gi, 'konkret'], [/respon\b/g, 'respons'],
    [/otentik/gi, 'autentik'], [/mempengaruhi/gi, 'memengaruhi'],
    [/\bLAUT\b/g, 'Asia Tenggara'],
    [/—/g, '; '],
  ];
  for (const [pattern, replacement] of edits) text = text.replace(pattern, replacement);
  if (/provider/i.test(source)) text = text.replace(/penyedia layanan|penyedia/gi, 'pencari nafkah');
  if (/in private|private (?:setting|context|consumption|e-commerce)/i.test(source)) text = text.replace(/(?:di )?sektor swasta|swasta/gi, 'situasi pribadi');
  if (/cringe/i.test(source)) text = text.replace(/rasa ngeri|merasa ngeri|ngeri/gi, 'kesan dipaksakan');
  if (/licen[cs]/i.test(source)) text = text.replace(/berlisensi/gi, 'sesuai dengan hubungan pembicara dan penerima');
  if (/policing/i.test(source)) text = text.replace(/kepolisian|kebijakan/gi, 'pemaksaan norma');
  if (/White\s*(?:&|and)/.test(source)) text = text.replace(/Putih/g, 'White');
  dictionary[source] = text;
}
fs.writeFileSync(file, JSON.stringify(dictionary, null, 2) + '\n');
console.log(`Reviewed terminology in ${Object.keys(dictionary).length} entries`);
