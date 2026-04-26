import assert from 'node:assert/strict';
import { lstat, readFile } from 'node:fs/promises';
import { test } from 'node:test';

const locales = ['pt', 'en', 'es'];

function getMarkdownStructureSignature(markdown) {
  return markdown
    .split('\n')
    .map((line) => {
      if (/^#{1,6} /.test(line)) {
        return `H${line.match(/^#+/)[0].length}`;
      }

      if (/^\|(?:.*\|)+\s*$/.test(line)) {
        return `T${line.split('|').length - 2}`;
      }

      if (/^\s*\d+\. /.test(line)) {
        return 'OL';
      }

      if (/^\s*[-*] /.test(line)) {
        return 'UL';
      }

      if (/^> /.test(line)) {
        return 'BQ';
      }

      if (/^\s*$/.test(line)) {
        return 'BLANK';
      }

      return 'P';
    })
    .join('\n');
}

test('locale content files exist and are wired to the canonical pt sources', async () => {
  for (const locale of locales) {
    const referencePath = new URL(`../src/content/reference/${locale}/analise_sensorial_mate.md`, import.meta.url);
    const wheelPath = new URL(`../src/content/wheel/${locale}/mate-wheel.yaml`, import.meta.url);

    const referenceStat = await lstat(referencePath);
    const wheelStat = await lstat(wheelPath);

    assert.ok(referenceStat.isFile() || referenceStat.isSymbolicLink());
    assert.ok(wheelStat.isFile() || wheelStat.isSymbolicLink());
  }
});

test('locale references keep the intro flow aligned with pt', async () => {
  for (const locale of locales) {
    const referencePath = new URL(`../src/content/reference/${locale}/analise_sensorial_mate.md`, import.meta.url);
    const reference = await readFile(referencePath, 'utf8');

    assert.match(reference, /\n4\.[^\n]*\n\n## 1\./m);
  }
});

test('locale references stay structurally aligned with pt', async () => {
  const ptReferencePath = new URL('../src/content/reference/pt/analise_sensorial_mate.md', import.meta.url);
  const ptReference = await readFile(ptReferencePath, 'utf8');
  const ptSignature = getMarkdownStructureSignature(ptReference);

  for (const locale of locales.filter((locale) => locale !== 'pt')) {
    const referencePath = new URL(`../src/content/reference/${locale}/analise_sensorial_mate.md`, import.meta.url);
    const reference = await readFile(referencePath, 'utf8');

    assert.equal(getMarkdownStructureSignature(reference), ptSignature);
  }
});

test('wheel defect split stays aligned across locales', async () => {
  for (const locale of locales) {
    const wheelPath = new URL(`../src/content/wheel/${locale}/mate-wheel.yaml`, import.meta.url);
    const wheel = await readFile(wheelPath, 'utf8');

    assert.match(wheel, /^\s*- id: lactico-suado$/m);
    assert.match(wheel, /^\s*- id: avinagrado-acetico$/m);
    assert.match(wheel, /^\s*- id: azedume-volatil$/m);
    assert.doesNotMatch(wheel, /^\s*- id: avinagrado$/m);
    assert.doesNotMatch(wheel, /^\s*- id: massa-azeda$/m);
    assert.doesNotMatch(wheel, /^\s*- id: fruta-fermentada$/m);
  }
});

test('expanded wheel model stays aligned across locales', async () => {
  for (const locale of locales) {
    const wheelPath = new URL(`../src/content/wheel/${locale}/mate-wheel.yaml`, import.meta.url);
    const wheel = await readFile(wheelPath, 'utf8');

    assert.match(wheel, /^compositionCategories:$/m);
    assert.match(wheel, /^evaluationAxes:$/m);
    assert.match(wheel, /^\s*- id: mineralidade-retrogosto$/m);
    assert.match(wheel, /^\s*- id: doces-cana-mel$/m);
    assert.match(wheel, /^\s*- id: frutas-secas$/m);
    assert.match(wheel, /^\s*- id: floral-citrico-seco$/m);
  }
});

test('canonical pt content still exposes the key structure', async () => {
  const referencePath = new URL('../src/content/reference/pt/analise_sensorial_mate.md', import.meta.url);
  const wheelPath = new URL('../src/content/wheel/pt/mate-wheel.yaml', import.meta.url);

  const reference = await readFile(referencePath, 'utf8');
  const wheel = await readFile(wheelPath, 'utf8');

  assert.match(reference, /^# Referencial Sensorial da Erva-Mate/m);
  assert.match(reference, /^## Introdução/m);
  assert.match(reference, /^## 3\. Modelo de Avaliação/m);
  assert.match(reference, /## 4\. Léxico Sensorial Expandido/m);
  assert.match(reference, /\| Defeito \| Como aparece \| Observação \|/);
  assert.doesNotMatch(reference, /Causa provável/);
  assert.match(wheel, /^meta:/m);
  assert.match(wheel, /^families:/m);
});
