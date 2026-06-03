import type { Language } from './copy';

export const SITE_URL = 'https://eimafisioterapia.es';

export type LocalizedRouteKey = 'home' | 'program' | 'about' | 'story' | 'contact';

export const localizedRoutes: Record<LocalizedRouteKey, Record<Language, string>> = {
  home: {
    es: '/',
    ca: '/ca',
    en: '/en'
  },
  program: {
    es: '/como-funciona',
    ca: '/ca/com-funciona',
    en: '/en/how-it-works'
  },
  about: {
    es: '/quienes-somos',
    ca: '/ca/qui-som',
    en: '/en/who-we-are'
  },
  story: {
    es: '/quienes-somos/historia',
    ca: '/ca/qui-som/historia',
    en: '/en/who-we-are/story'
  },
  contact: {
    es: '/contacto',
    ca: '/ca/contacte',
    en: '/en/contact'
  }
};

export function normalizePath(pathname: string) {
  const normalized = decodeURIComponent(pathname).replace(/\/+$/, '');
  return normalized === '' ? '/' : normalized;
}

export function getRouteKey(pathname: string): LocalizedRouteKey | null {
  const normalized = normalizePath(pathname);

  for (const [key, paths] of Object.entries(localizedRoutes)) {
    if (Object.values(paths).some((path) => normalizePath(path) === normalized)) {
      return key as LocalizedRouteKey;
    }
  }

  return null;
}

export function getLanguageFromPath(pathname: string): Language | null {
  const normalized = normalizePath(pathname);

  if (normalized === '/ca' || normalized.startsWith('/ca/')) return 'ca';
  if (normalized === '/en' || normalized.startsWith('/en/')) return 'en';
  if (getRouteKey(normalized)) return 'es';

  return null;
}

export function getCanonicalPath(pathname: string) {
  const key = getRouteKey(pathname);
  if (key === 'home') return normalizePath(pathname) === '/' ? '/' : null;
  return key ? localizedRoutes[key].es : null;
}

export function getLocalizedPath(pathname: string, language: Language) {
  const key = getRouteKey(pathname);
  return key ? localizedRoutes[key][language] : localizedRoutes.home[language];
}

export function getRoutePath(key: LocalizedRouteKey, language: Language) {
  return localizedRoutes[key][language];
}

export function getAbsoluteUrl(pathname: string) {
  return `${SITE_URL}${pathname === '/' ? '' : pathname}`;
}

export function getAlternateLinks(key: LocalizedRouteKey) {
  return [
    { hreflang: 'es-ES', href: getAbsoluteUrl(localizedRoutes[key].es) },
    { hreflang: 'es', href: getAbsoluteUrl(localizedRoutes[key].es) },
    { hreflang: 'ca', href: getAbsoluteUrl(localizedRoutes[key].ca) },
    { hreflang: 'en', href: getAbsoluteUrl(localizedRoutes[key].en) },
    { hreflang: 'x-default', href: getAbsoluteUrl(localizedRoutes[key].es) }
  ];
}
