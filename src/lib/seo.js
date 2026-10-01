import { site } from '$lib/site';
import { getAbsoluteUrl, getRouteKey, getRoutePath, normalizePath } from '$lib/i18n/routes';

export const languageLocales = { es: 'es_ES', ca: 'ca_ES', en: 'en_GB' };

const names = {
  es: {
    home: 'Inicio',
    program: 'Cómo funciona Empenta',
    about: 'Quiénes somos',
    story: 'Nuestra historia',
    contact: 'Contacto',
    testimonials: 'Testimonios',
    blog: 'Blog'
  },
  ca: {
    home: 'Inici',
    program: 'Com funciona Empenta',
    about: 'Qui som',
    story: 'La nostra història',
    contact: 'Contacte',
    testimonials: 'Testimonis',
    blog: 'Blog'
  },
  en: {
    home: 'Home',
    program: 'How Empenta works',
    about: 'Who we are',
    story: 'Our story',
    contact: 'Contact',
    testimonials: 'Testimonials',
    blog: 'Blog'
  }
};

/** Safely embed JSON in an HTML script, including translated/editorial content.
 * @param {Record<string, unknown>} value
 */
export function serializeJsonLd(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

/** @param {string} pathname @param {import('$lib/i18n/copy').Language} language */
export function getSiteSchema(pathname, language) {
  const key = getRouteKey(pathname);
  const canonical = getAbsoluteUrl(normalizePath(pathname));
  const organizationId = `${site.url}/#organization`;
  const websiteId = `${site.url}/#website`;
  const pageType =
    key === 'contact'
      ? 'ContactPage'
      : key === 'about' || key === 'story'
        ? 'AboutPage'
        : key === 'blog'
          ? 'CollectionPage'
          : 'WebPage';
  /** @type {Record<string, unknown>[]} */
  const graph = [
    {
      '@type': 'Organization',
      '@id': organizationId,
      name: site.seoName,
      url: site.url,
      logo: { '@type': 'ImageObject', url: site.url + site.logoDark },
      image: site.url + site.socialImage,
      telephone: site.phone,
      email: site.email,
      sameAs: Object.values(site.socials),
      areaServed: { '@type': 'Place', name: 'Mallorca' }
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      name: site.seoName,
      url: site.url,
      inLanguage: ['es-ES', 'ca', 'en'],
      publisher: { '@id': organizationId }
    },
    {
      '@type': pageType,
      '@id': canonical,
      url: canonical,
      ...(key ? { name: `${names[language][key]} | Eima Salut` } : {}),
      inLanguage: language === 'es' ? 'es-ES' : language,
      isPartOf: { '@id': websiteId },
      publisher: { '@id': organizationId }
    }
  ];
  if (key === 'about' || key === 'story') {
    graph.push(
      ...[
        { id: 'jaume', name: 'Jaume Sansó Servera' },
        { id: 'miquel', name: 'Miquel Galmés Vives' }
      ].map((person) => ({
        '@type': 'Person',
        '@id': `${site.url}/#${person.id}`,
        name: person.name,
        jobTitle:
          language === 'en'
            ? 'Physiotherapist'
            : language === 'ca'
              ? 'Fisioterapeuta'
              : 'Fisioterapeuta',
        url: getAbsoluteUrl(getRoutePath('story', language)) + `#${person.id}`,
        worksFor: { '@id': organizationId }
      }))
    );
  }
  // Blog and articles supply their own complete breadcrumb trail.
  if (key && key !== 'home' && key !== 'blog') {
    const parents = [
      { name: names[language].home, item: getAbsoluteUrl(getRoutePath('home', language)) }
    ];
    if (key === 'story')
      parents.push({
        name: names[language].about,
        item: getAbsoluteUrl(getRoutePath('about', language))
      });
    parents.push({ name: names[language][key], item: canonical });
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': canonical + '#breadcrumbs',
      itemListElement: parents.map((entry, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        ...entry
      }))
    });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}
