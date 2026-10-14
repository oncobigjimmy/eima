import { getProgramCopy } from '$lib/i18n/program';
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
  if (key === 'home' || key === 'program') {
    const serviceId = site.url + '/#empenta';
    const descriptions = {
      es: 'Programa de acompañamiento de 12 semanas para personas con cáncer en Mallorca, durante y después del tratamiento. Valoración inicial presencial en casa, plan de ejercicio personalizado y seguimiento principalmente online, con ajustes según síntomas, tratamiento y evolución.',
      ca: 'Programa d’acompanyament de 12 setmanes per a persones amb càncer a Mallorca, durant i després del tractament. Valoració inicial presencial a casa, pla d’exercici personalitzat i seguiment principalment online, amb ajustos segons els símptomes, el tractament i l’evolució.',
      en: 'A 12-week support programme for people with cancer in Mallorca, during and after treatment. Initial in-person assessment at home, a personalised exercise plan and mainly online follow-up, with adjustments based on symptoms, treatment and progress.'
    };
    graph.push({
      '@type': 'Service', '@id': serviceId, name: 'Programa Empenta',
      url: getAbsoluteUrl(getRoutePath('program', language)),
      description: descriptions[language], provider: { '@id': organizationId },
      areaServed: { '@type': 'Place', name: 'Mallorca' }
    });
    graph[2].about = { '@id': serviceId };
    if (key === 'program') {
      const plainText = (/** @type {string} */ html) => html
        .replace(/<br[^>]*>/gi, ' ').replace(/<[^>]*>/g, '')
        .replace(/\{\{[^}]+\}\}/g, language === 'en' ? 'here' : 'aquí')
        .replace(/\s+/g, ' ').trim();
      graph.push({
        '@type': 'FAQPage', '@id': canonical + '#faq', url: canonical + '#faq',
        inLanguage: language === 'es' ? 'es-ES' : language,
        isPartOf: { '@id': canonical },
        mainEntity: getProgramCopy(language).faq.faqs.map((faq) => ({
          '@type': 'Question', name: plainText(faq.q),
          acceptedAnswer: { '@type': 'Answer', text: faq.a.map(plainText).join('\n\n') }
        }))
      });
    }
  }
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
