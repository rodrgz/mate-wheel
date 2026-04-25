import { getEntry, getCollection } from 'astro:content';
import { normalizeMateWheel, type NormalizedMateWheel } from './normalizeMateWheel';
import type { Locale } from '../i18n/siteCopy';

const supportedLocales = ['pt', 'en', 'es'] as const;

export function isLocale(value: string | null | undefined): value is Locale {
  return supportedLocales.includes(value as Locale);
}

export function resolveLocale(value: string | null | undefined): Locale {
  return isLocale(value) ? value : 'pt';
}

export async function loadNormalizedWheel(locale: Locale): Promise<NormalizedMateWheel> {
  let entry = await getEntry('wheel', `${locale}/mate-wheel`);
  if (!entry) {
    const all = await getCollection('wheel');
    entry = all.find((e) => e.id === `${locale}/mate-wheel` || e.id === `/${locale}/mate-wheel` || e.id.endsWith('/mate-wheel'));
    if (!entry) {
      throw new Error(`Wheel entry not found for locale: ${locale}`);
    }
  }

  return normalizeMateWheel(entry.data);
}

export async function loadReferenceEntry(locale: Locale) {
  let entry = await getEntry('reference', `${locale}/analise_sensorial_mate`);
  if (!entry) {
    const all = await getCollection('reference');
    entry = all.find((e) => e.id === `${locale}/analise_sensorial_mate` || e.id === `/${locale}/analise_sensorial_mate` || e.id.endsWith('/analise_sensorial_mate'));
    if (!entry) {
      throw new Error(`Reference entry not found for locale: ${locale}`);
    }
  }

  return entry;
}
