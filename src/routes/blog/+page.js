import { getPosts } from '$lib/blog/posts.js';
import { getLanguageFromPath } from '$lib/i18n/routes';

export const prerender = true;

export function load({ url }) {
  const language = getLanguageFromPath(url.pathname) ?? 'es';
  return {
    language,
    posts: getPosts(language).map((p) => ({
      slug: p.slug,
      path: p.path,
      language: p.language,
      title: p.title,
      description: p.description,
      titleAccent: p.titleAccent,
      date: p.date,
      updated: p.updated,
      author: p.author,
      category: p.category,
      tags: p.tags,
      image: p.image,
      imageAlt: p.imageAlt,
      readingMinutes: p.readingMinutes
    }))
  };
}
