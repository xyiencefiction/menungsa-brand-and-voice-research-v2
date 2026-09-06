import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createServer } from 'vite';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { catalog } from './locale-catalog.mjs';

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { dictionary, translate, matchesText } = await server.ssrLoadModule('/src/i18n/translate.ts');
  const { LanguageContext } = await server.ssrLoadModule('/src/i18n/context.tsx');
  const { claims, corpusStats, searchKnowledgeBase } = await server.ssrLoadModule('/src/data/index.ts');
  const claimLocale = JSON.parse(fs.readFileSync('src/i18n/id.claims.json', 'utf8'));
  assert.equal(Object.keys(claimLocale).length, claims.length);
  for (const claim of claims) {
    assert.ok(claimLocale[claim.claim_id], `Missing ${claim.claim_id}`);
    assert.equal(translate(claim.claim, 'en'), claim.claim);
    assert.equal(translate(claim.claim), claimLocale[claim.claim_id]);
  }
  assert.deepEqual([corpusStats.totalClaims,corpusStats.causal,corpusStats.wordingTested,corpusStats.indonesianWordingTested],[100,20,14,0]);
  assert.ok(matchesText('Agency / self-efficacy / actionability', 'kemampuan bertindak'));
  assert.ok(searchKnowledgeBase('kemampuan bertindak').length > 0);
  assert.ok(searchKnowledgeBase('agency').length > 0);
  assert.equal(translate('M01'), 'M01');
  assert.equal(translate('“Kamu boleh merasa lelah. Kami di Menungsa siap menemani langkah pertamamu.”'), '“Kamu boleh merasa lelah. Kami di Menungsa siap menemani langkah pertamamu.”');
  assert.ok(translate('Emotional Resonance ≠ High Emotional Arousal:').includes('≠'));
  const numeric = value => (value.match(/\d+(?:[.,]\d+)*/g) ?? []).map(n=>n.replace(/[.,]/g,'')).sort().join('|');
  for (const claim of claims) assert.equal(numeric(translate(claim.claim)), numeric(claim.claim), `Numbers changed in ${claim.claim_id}`);
  const files = fs.readdirSync('src/components/views').filter(f=>f.endsWith('.tsx'));
  const structure = html => html.replace(/\s(?:title|alt|placeholder|aria-label|aria-description)="[^"]*"/g,'').replace(/>[^<]*/g,'>');
  for (const file of files) {
    const module = await server.ssrLoadModule(`/src/components/views/${file}`);
    const Component = module[file.replace('.tsx','')];
    assert.ok(Component, file);
    const props = { onNavigate:()=>{}, onOpenFigure:()=>{}, onNavigateToEvidence:()=>{}, onNavigateToMechanism:()=>{} };
    const render = language => renderToStaticMarkup(createElement(LanguageContext.Provider, {value:{language,setLanguage:()=>{}}}, createElement(Component,props)));
    const en = render('en'), id = render('id');
    assert.ok(en.length > 200 && id.length > 200, `${file} blank`);
    assert.notEqual(en,id,`${file} untranslated`);
    assert.equal(structure(id), structure(en), `${file}: markup or styling changed with language`);
    console.log(`PASS ${file}: bilingual render, identical elements and styling`);
  }
  const missing = catalog.filter(e=> !dictionary[e.source] && /[a-z]/i.test(e.source) && e.source.length>20 && !/[&]|var\(|color-mix|calc\(/.test(e.source));
  assert.equal(missing.length, 0, `Missing catalog translations: ${missing.map(e=>e.source).join('; ')}`);
  console.log(`PASS ${claims.length} claim translations, research counts, bilingual search, protected examples and numeric integrity`);
} finally { await server.close(); }
