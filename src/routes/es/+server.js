import { redirect } from '@sveltejs/kit';

export const prerender = false;

export function GET({ url }) {
  throw redirect(301, `/${url.search}`);
}
