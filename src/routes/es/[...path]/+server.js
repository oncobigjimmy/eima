import { redirect } from '@sveltejs/kit';

export const prerender = false;

export function GET({ params, url }) {
  const path = params.path ? `/${params.path}` : '/';
  throw redirect(301, `${path}${url.search}`);
}
