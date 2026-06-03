import { getCanonicalPath } from '$lib/i18n/routes';

/** @type {import('@sveltejs/kit').Reroute} */
export function reroute({ url }) {
  return getCanonicalPath(url.pathname) ?? url.pathname;
}
