import type { APIRoute } from 'astro';
import { loadNormalizedWheel, resolveLocale } from '../../lib/content/mateWheel';

export const GET: APIRoute = async ({ request }) => {
  const locale = resolveLocale(new URL(request.url).searchParams.get('lang'));
  const normalized = await loadNormalizedWheel(locale);

  return new Response(JSON.stringify(normalized), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
