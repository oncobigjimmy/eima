import { site } from '$lib/site';
import { getPosts } from '$lib/blog/posts.js';
import { getAuthor } from '$lib/blog/authors.js';
import { getLanguageFromPath, getRoutePath } from '$lib/i18n/routes';
import { getBlogCopy } from '$lib/i18n/blog';

export const prerender = true;

const SITE = site.url;

/** @param {unknown} s */
function escapeXml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function GET({ url: requestUrl }) {
  const language = getLanguageFromPath(requestUrl.pathname) ?? 'es';
  const posts = getPosts(language);
  const ui = getBlogCopy(language);
  const blogPath = getRoutePath('blog', language);
  const rssPath = language === 'es' ? '/blog.xml' : `/${language}/blog.xml`;
  const items = posts
    .slice(0, 20)
    .map((p) => {
      const author = getAuthor(p.author);
      const url = `${SITE}${p.path}`;
      return `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(p.date ?? 0).toUTCString()}</pubDate>
      <description>${escapeXml(p.description)}</description>
      <author>${site.email} (${escapeXml(author.name)})</author>
      <category>${escapeXml(p.category)}</category>
    </item>`;
    })
    .join('\n');

  const latestUpdate = posts.map(post => post.updated ?? post.date).filter(Boolean).sort().at(-1);
  const lastBuild = new Date(latestUpdate ?? 0).toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog Eima Salut</title>
    <link>${SITE}${blogPath}</link>
    <atom:link href="${SITE}${rssPath}" rel="self" type="application/rss+xml" />
    <description>${escapeXml(ui.rssDescription)}</description>
    <language>${ui.locale}</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
