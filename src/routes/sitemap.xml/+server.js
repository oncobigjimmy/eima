import { site } from '$lib/site';
import { posts, allPosts, getPostAlternates } from '$lib/blog/posts.js';
import { getAbsoluteUrl, getAlternateLinks, localizedRoutes } from '$lib/i18n/routes';

export const prerender = true;

const SITE = site.url;

/** @type {{key: import('$lib/i18n/routes').LocalizedRouteKey, changefreq: string, priority: string}[]} */
const staticRoutes = [
  { key: 'home', changefreq: 'weekly', priority: '1.0' },
  { key: 'program', changefreq: 'monthly', priority: '0.9' },
  { key: 'about', changefreq: 'monthly', priority: '0.8' },
  { key: 'story', changefreq: 'monthly', priority: '0.7' },
  { key: 'contact', changefreq: 'monthly', priority: '0.9' },
  { key: 'testimonials', changefreq: 'monthly', priority: '0.6' }
];

/** @param {string | null | undefined} d */
function toISODate(d) {
  if (!d) return new Date().toISOString().slice(0, 10);
  return new Date(d).toISOString().slice(0, 10);
}

export function GET() {
  const latestPost = posts.map(post => post.updated ?? post.date).filter(Boolean).sort().at(-1);
  const blogIndexLastmod = latestPost ? toISODate(latestPost) : '2026-04-17';

  const localizedUrls = staticRoutes.flatMap((route) =>
    Object.values(localizedRoutes[route.key]).map((path) => {
      const alternates = getAlternateLinks(route.key)
        .map(
          (alternate) =>
            `    <xhtml:link rel="alternate" hreflang="${alternate.hreflang}" href="${alternate.href}" />`
        )
        .join('\n');

      return `  <url>
    <loc>${getAbsoluteUrl(path)}</loc>
${alternates}
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
    })
  );

  const urls = [
    ...localizedUrls,
    ...Object.values(localizedRoutes.blog).map((path) => `  <url>
    <loc>${SITE}${path}</loc>
${getAlternateLinks('blog').map((alternate) => `    <xhtml:link rel="alternate" hreflang="${alternate.hreflang}" href="${alternate.href}" />`).join('\n')}
    <lastmod>${blogIndexLastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`),
    ...allPosts.map(
      (p) => `  <url>
    <loc>${SITE}${p.path}</loc>
${getPostAlternates(p.slug).map((alternate) => `    <xhtml:link rel="alternate" hreflang="${alternate.hreflang}" href="${alternate.href}" />`).join('\n')}
    <lastmod>${toISODate(p.updated ?? p.date)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
    )
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
