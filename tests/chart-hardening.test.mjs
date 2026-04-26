import assert from 'node:assert/strict';
import { execFile as execFileCallback } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { before, test } from 'node:test';
import { promisify } from 'node:util';

const execFile = promisify(execFileCallback);
const repoRoot = path.resolve(new URL('..', import.meta.url).pathname);
const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
let buildPromise;

const localePages = [
  {
    file: 'index.html',
    fallbackTitle: 'Mapa textual da roda sensorial',
    fallbackGuideCta: 'Ir para o guia sensorial'
  },
  {
    file: 'en/index.html',
    fallbackTitle: 'Text map of the sensory wheel',
    fallbackGuideCta: 'Go to the sensory guide'
  },
  {
    file: 'es/index.html',
    fallbackTitle: 'Mapa textual de la rueda sensorial',
    fallbackGuideCta: 'Ir a la guía sensorial'
  }
];

const ensureBuild = async () => {
  buildPromise ??= execFile(npmCommand, ['run', 'build'], {
    cwd: repoRoot,
    env: process.env
  });

  await buildPromise;
};

const readBuiltPage = async (relativePath) => {
  await ensureBuild();
  return readFile(path.join(repoRoot, 'dist', relativePath), 'utf8');
};

before(async () => {
  await ensureBuild();
});

test('generated HTML keeps style CSP strict and free from app inline styles', async () => {
  const html = await readBuiltPage('index.html');

  assert.match(html, /style-src 'self'/);
  assert.doesNotMatch(html, /style-src[^>]*unsafe-inline/);
  assert.doesNotMatch(html, /\sstyle=/i);
});

test('initial HTML keeps Tree lazy and out of the eager SSR experience', async () => {
  const html = await readBuiltPage('index.html');

  assert.match(html, /SunburstChart\.astro_astro_type_script/);
  assert.doesNotMatch(html, /TreeMapChart\.astro_astro_type_script/);
  assert.match(html, /id="chart-treemap-wrapper" hidden><\/div>/);
  assert.match(html, /id="tree-data"/);
  assert.doesNotMatch(html, /id="tree-chart"/);
});

test('localized textual fallback is emitted for every locale build', async () => {
  for (const page of localePages) {
    const html = await readBuiltPage(page.file);

    assert.match(html, /id="chart-fallback"/);
    assert.match(html, new RegExp(page.fallbackTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    assert.match(html, new RegExp(page.fallbackGuideCta.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    assert.match(html, /href="#referencia"/);
  }
});