import { posts } from '$lib/blog/posts.js';
import { getAbsoluteUrl, getAlternateLinks, localizedRoutes } from '$lib/i18n/routes';

export const prerender = true;

const SITE = 'https://eimafisioterapia.es';

const staticRoutes = [
  { key: 'home', lastmod: '2026-06-03', changefreq: 'weekly', priority: '1.0' },
  { key: 'program', lastmod: '2026-06-03', changefreq: 'monthly', priority: '0.9' },
  { key: 'about', lastmod: '2026-06-03', changefreq: 'monthly', priority: '0.8' },
  { key: 'story', lastmod: '2026-06-03', changefreq: 'monthly', priority: '0.7' },
  { key: 'contact', lastmod: '2026-06-03', changefreq: 'monthly', priority: '0.9' }
];

function toISODate(d) {
  if (!d) return new Date().toISOString().slice(0, 10);
  return new Date(d).toISOString().slice(0, 10);
}

export function GET() {
  const latestPost = posts[0]?.updated ?? posts[0]?.date;
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
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
    })
  );

  const urls = [
    ...localizedUrls,
    `  <url>
    <loc>${SITE}/blog</loc>
    <lastmod>${blogIndexLastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`,
    ...posts.map(
      (p) => `  <url>
    <loc>${SITE}/blog/${p.slug}</loc>
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
