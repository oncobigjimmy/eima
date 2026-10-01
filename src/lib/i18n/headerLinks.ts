import { getCopy, type Language } from './copy';
import { getRoutePath } from './routes';

const testimonialLabels: Record<Language, string> = {
  es: 'Testimonios',
  ca: 'Testimonis',
  en: 'Testimonials'
};

export function getHeaderLinks(language: Language) {
  const aboutHref = getRoutePath('about', language);

  return getCopy(language).nav.links.flatMap((link) =>
    link.href === aboutHref
      ? [link, { href: getRoutePath('testimonials', language), label: testimonialLabels[language] }]
      : [{ ...link, href: link.href === '/blog' ? getRoutePath('blog', language) : link.href }]
  );
}
