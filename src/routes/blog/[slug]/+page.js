import { error, redirect } from '@sveltejs/kit';
import { posts, getPost } from '$lib/blog/posts.js';
import { getLanguageFromPath } from '$lib/i18n/routes';

// Pre-render published articles and keep SSR for legacy redirects and real 404s.
export const prerender = 'auto';

/** @type {Record<string, string>} */
const redirects = {
  'por-que-cada-vez-hay-mas-cancer-en-gente-joven':
    'por-que-cada-vez-hay-mas-gente-joven-con-cancer-que-esta-pasando',
  'por-que-cancer-no-es-puramente-genetico-habitos-importan':
    'por-que-he-tenido-un-cancer-si-no-hay-antecedentes-en-toda-mi-familia',
  'por-que-descanso-total-ya-no-es-mejor-recomendacion':
    'por-que-el-reposo-total-ya-no-es-la-mejor-recomendacion-si-tienes-cancer',
  'sirve-de-algo-hacer-ejercicio-durante-cancer-mejor-medicina':
    'sirve-de-algo-hacer-ejercicio-si-tengo-cancer-esto-dice-la-ciencia',
  'es-seguro-hacer-ejercicio-durante-la-quimioterapia-o-deberia-esperar-a-terminar-el-tratamiento':
    'es-seguro-hacer-ejercicio-durante-la-quimioterapia-o-deberia-esperar-a-terminarla',
  'puede-el-ejercicio-frenar-el-crecimiento-de-un-tumor-celulas-asesinas':
    'puede-el-ejercicio-frenar-el-crecimiento-de-un-tumor-que-dice-la-ciencia'
};

export function entries() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function load({ params, url }) {
  const language = getLanguageFromPath(url.pathname) ?? 'es';
  if (redirects[params.slug]) {
    throw redirect(301, `/blog/${redirects[params.slug]}${url.search}`);
  }

  const post = getPost(params.slug, language);
  if (!post) throw error(404, 'Artículo no encontrado');
  return {
    language,
    path: post.path,
    slug: post.slug,
    title: post.title,
    description: post.description,
    seoDescription: post.seoDescription,
    titleAccent: post.titleAccent,
    heroLabel: post.heroLabel,
    heroEmphasis: post.heroEmphasis,
    heroTitleClass: post.heroTitleClass,
    date: post.date,
    updated: post.updated,
    author: post.author,
    category: post.category,
    tags: post.tags,
    image: post.image,
    imageAlt: post.imageAlt,
    keywords: post.keywords,
    readingMinutes: post.readingMinutes,
    faq: post.faq ?? []
  };
}
