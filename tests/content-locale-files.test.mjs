import assert from 'node:assert/strict';
import { lstat, readFile } from 'node:fs/promises';
import { test } from 'node:test';

const locales = ['pt', 'en', 'es'];

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

test('canonical pt content still exposes the key structure', async () => {
  const referencePath = new URL('../src/content/reference/pt/analise_sensorial_mate.md', import.meta.url);
  const wheelPath = new URL('../src/content/wheel/pt/mate-wheel.yaml', import.meta.url);

  const reference = await readFile(referencePath, 'utf8');
  const wheel = await readFile(wheelPath, 'utf8');

  assert.match(reference, /^# Especificação Sensorial da Erva-Mate/m);
  assert.match(reference, /## 4\. Léxico Sensorial Expandido/m);
  assert.match(wheel, /^meta:/m);
  assert.match(wheel, /^families:/m);
});
