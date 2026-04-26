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

const localePages = ['index.html', 'en/index.html', 'es/index.html'];
const localeZoomHints = [
  {
    file: 'index.html',
    hint: 'Zoom: Ctrl + scroll no desktop; pinça no touch',
    legacyHint: 'Use o scroll do mouse para Zoom In/Out'
  },
  {
    file: 'en/index.html',
    hint: 'Zoom: Ctrl + scroll on desktop; pinch on touch',
    legacyHint: 'Use mouse scroll for Zoom In/Out'
  },
  {
    file: 'es/index.html',
    hint: 'Zoom: Ctrl + scroll en escritorio; pinza en touch',
    legacyHint: 'Use el scroll del ratón para Zoom In/Out'
  }
];
const localeTypicalStrings = [
  'Mais típico em:',
  'Most typical in:',
  'Más típico en:'
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

test('generated HTML keeps Creative Commons attribution only in the footer', async () => {
  for (const page of localePages) {
    const html = await readBuiltPage(page);

    assert.doesNotMatch(html, /id="chart-fallback"/);
    assert.doesNotMatch(html, /chart-watermark/);
    assert.equal(html.match(/CC BY-NC 4\.0/g)?.length ?? 0, 1);
  }
});

test('descriptor panel HTML no longer exposes the typical-style label', async () => {
  for (const page of localePages) {
    const html = await readBuiltPage(page);

    for (const typicalLabel of localeTypicalStrings) {
      assert.doesNotMatch(html, new RegExp(typicalLabel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    }
  }
});

test('localized zoom hint reflects desktop modifier and touch pinch', async () => {
  for (const page of localeZoomHints) {
    const html = await readBuiltPage(page.file);

    assert.match(html, new RegExp(page.hint.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    assert.doesNotMatch(html, new RegExp(page.legacyHint.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});