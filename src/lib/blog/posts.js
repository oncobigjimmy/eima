/**
 * @typedef {{title?: string, description?: string, seoDescription?: string, titleAccent?: string, heroLabel?: string,
 * heroEmphasis?: string, heroTitleClass?: string, nextPost?: string, date?: string,
 * updated?: string, author?: string, category?: string, tags?: string[], image?: string,
 * imageAlt?: string, keywords?: string, readingMinutes?: number,
 * faq?: {q: string, a: string}[]}} BlogMetadata
 */
import { getBlogPostPath } from '$lib/i18n/blog-routes';
import { site } from '$lib/site';

const modules = /** @type {Record<string, {metadata?: BlogMetadata, default: import('svelte').Component}>} */ (
  import.meta.glob('/src/content/blog/**/*.md', { eager: true })
);

/** @param {string} path */
function toSlug(path) {
  return (path.split('/').pop() ?? '').replace(/\.md$/, '');
}

export const allPosts = Object.entries(modules)
  .map(([path, mod]) => {
    const metadata = mod.metadata ?? {};
    const language = /** @type {import('$lib/i18n/copy').Language} */ (path.includes('/blog/ca/') ? 'ca' : path.includes('/blog/en/') ? 'en' : 'es');
    return {
      slug: toSlug(path),
      language,
      path: getBlogPostPath(toSlug(path), language),
      title: metadata.title ?? 'Sin título',
      description: metadata.description ?? '',
      seoDescription: metadata.seoDescription ?? metadata.description ?? '',
      titleAccent: metadata.titleAccent ?? '',
      heroLabel: metadata.heroLabel ?? '',
      heroEmphasis: metadata.heroEmphasis ?? '',
      heroTitleClass: metadata.heroTitleClass ?? '',
      nextPost: metadata.nextPost ?? '',
      date: metadata.date ?? null,
      updated: metadata.updated ?? metadata.date ?? null,
      author: metadata.author ?? 'jaume',
      category: metadata.category ?? 'General',
      tags: metadata.tags ?? [],
      image: metadata.image ?? '/og-image.png',
      imageAlt: metadata.imageAlt ?? metadata.title ?? 'EIMA SALUT',
      keywords: metadata.keywords ?? '',
      readingMinutes: metadata.readingMinutes ?? null,
      faq: metadata.faq ?? [],
      Component: mod.default
    };
  })
  .sort((a, b) => new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime());

/** @param {import('$lib/i18n/copy').Language} language */
export function getPosts(language = 'es') { return allPosts.filter((post) => post.language === language); }
export const posts = getPosts();

/** @param {string} slug */
export function getPostAlternates(slug) {
  return [
    { hreflang: 'es-ES', language: 'es' }, { hreflang: 'es', language: 'es' },
    { hreflang: 'ca', language: 'ca' }, { hreflang: 'en', language: 'en' },
    { hreflang: 'x-default', language: 'es' }
  ].filter(({ language }) => allPosts.some(post => post.slug === slug && post.language === language))
    .map(({ hreflang, language }) => ({ hreflang, href: site.url + getBlogPostPath(slug, /** @type {import('$lib/i18n/copy').Language} */ (language)) }));
}

/** @param {string} slug @param {import('$lib/i18n/copy').Language} language */
export function getPost(slug, language = 'es') {
  return allPosts.find((p) => p.slug === slug && p.language === language);
}

/** @param {string} slug */
export function getRelated(slug, limit = 3) {
  const current = getPost(slug);
  if (!current) return [];
  const currentTags = new Set(current.tags);
  return posts
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      post: p,
      score: p.tags.filter((t) => currentTags.has(t)).length
    }))
    .sort((a, b) => b.score - a.score || new Date(b.post.date ?? 0).getTime() - new Date(a.post.date ?? 0).getTime())
    .slice(0, limit)
    .map(({ post }) => post);
}
