import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import yaml from 'js-yaml';
import { normalizeMateWheel } from '../src/lib/content/normalizeMateWheel.js';

const wheelPath = new URL('../src/content/wheel/pt/mate-wheel.yaml', import.meta.url);

function countDescriptors(families) {
  const walk = (nodes) => nodes.reduce((total, node) => {
    const childCount = node.children ? walk(node.children) : 0;
    return total + 1 + childCount;
  }, 0);

  return families.reduce((total, family) => total + walk(family.descriptors || []), 0);
}

test('normalizes the wheel into a root tree and descriptor index', async () => {
  const raw = await readFile(wheelPath, 'utf8');
  const source = yaml.load(raw);
  const normalized = normalizeMateWheel(source);

  assert.equal(normalized.sunburst.id, 'root');
  assert.equal(normalized.sunburst.children.length, source.families.length);
  assert.equal(
    Object.keys(normalized.descriptorIndex).length,
    source.families.length + countDescriptors(source.families)
  );

  const firstFamily = source.families[0];
  assert.equal(normalized.descriptorIndex[firstFamily.id].isFamily, true);
  assert.equal(normalized.sunburst.children[0].name, firstFamily.label);
});

test('rejects duplicate family ids', async () => {
  const raw = await readFile(wheelPath, 'utf8');
  const source = yaml.load(raw);
  const duplicate = structuredClone(source);
  duplicate.families[1].id = duplicate.families[0].id;

  assert.throws(() => normalizeMateWheel(duplicate), /Duplicate family id found/);
});

test('rejects duplicate nested descriptor ids', async () => {
  const raw = await readFile(wheelPath, 'utf8');
  const source = yaml.load(raw);
  const duplicate = structuredClone(source);
  duplicate.families[0].descriptors[1].id = duplicate.families[0].descriptors[0].id;

  assert.throws(() => normalizeMateWheel(duplicate), /Duplicate descriptor id found/);
});
