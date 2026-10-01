import assert from 'node:assert/strict';
import { stat } from 'node:fs/promises';
import { resolve } from 'node:path';

// Run against a local development or production server. Never requests production.
const origin = process.argv[2] || 'http://127.0.0.1:4180';
assert(['127.0.0.1', 'localhost'].includes(new URL(origin).hostname), 'Use a local server');
const site = 'https://eimasalut.es';
const failures = [];
const warnings = [];
const pages = new Map();
const assets = new Set();
const internalLinks = new Set();
const check = (condition, message) => {
  if (!condition) failures.push(message);
};
const decode = (value) =>
  value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));
const attributes = (tag) =>
  Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((m) => [m[1], decode(m[2])]));
const plain = (value) =>
  decode(
    value
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim()
  );

async function request(path, options = {}) {
  const response = await fetch(new URL(path, origin), { redirect: 'manual', ...options });
  return { response, text: await response.text() };
}

function inspect(html) {
  const head = html.split('</head>')[0];
  const tags = [
    ...head.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '').matchAll(/<(?:meta|link)\b[^>]*>/g)
  ].map((m) => attributes(m[0]));
  const meta = (name) =>
    tags.filter((t) => t.name === name || t.property === name).map((t) => t.content);
  const schemas = [
    ...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)
  ].map((m) => JSON.parse(m[1]));
  return {
    title: plain(head.match(/<title>([\s\S]*?)<\/title>/)?.[1] || ''),
    lang: html.match(/<html[^>]*lang="([^"]+)"/)?.[1],
    canonical: tags.filter((t) => t.rel === 'canonical').map((t) => t.href),
    alternates: tags.filter((t) => t.hreflang),
    meta,
    h1: [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => plain(m[1])),
    graph: schemas.flatMap((s) => s['@graph'] || [s]),
    images: [...html.matchAll(/<img\b[^>]*>/g)].map((m) => attributes(m[0])),
    links: [...html.matchAll(/<a\b[^>]*>/g)].map((m) => attributes(m[0]))
  };
}

const { response: sitemapResponse, text: sitemap } = await request('/sitemap.xml');
check(sitemapResponse.status === 200, 'sitemap response');
const sitemapEntries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => ({
  url: m[1].match(/<loc>(.*?)<\/loc>/)?.[1],
  alternates: [...m[1].matchAll(/<xhtml:link\b[^>]+/g)].map((t) => attributes(t[0]))
}));
check(sitemapEntries.length === 39, `Expected 39 indexable routes; found ${sitemapEntries.length}`);
check(
  new Set(sitemapEntries.map((p) => p.url)).size === sitemapEntries.length,
  'Duplicate sitemap URLs'
);

for (const entry of sitemapEntries) {
  check(entry.url?.startsWith(site), 'Sitemap domain');
  const path = new URL(entry.url).pathname;
  const { response, text } = await request(path);
  check(response.status === 200, `${path}: HTTP ${response.status}`);
  const page = inspect(text);
  pages.set(entry.url, page);
  check(
    (page.title && page.title.includes('Eima Salut')) || page.title.includes('EIMA SALUT'),
    `${path}: brand/title`
  );
  check(page.canonical.length === 1 && page.canonical[0] === entry.url, `${path}: self-canonical`);
  const language = path.startsWith('/ca') ? 'ca' : path.startsWith('/en') ? 'en' : 'es-ES';
  check(page.lang === language, `${path}: HTML language`);
  check(page.h1.length === 1 && page.h1[0], `${path}: exactly one non-empty H1`);
  for (const key of [
    'description',
    'og:title',
    'og:description',
    'og:url',
    'og:image',
    'og:image:alt',
    'og:type',
    'og:locale',
    'twitter:card',
    'twitter:title',
    'twitter:description',
    'twitter:image',
    'twitter:image:alt'
  ]) {
    const values = page.meta(key);
    check(values.length === 1 && values[0], `${path}: missing/duplicate ${key}`);
  }
  check(page.meta('og:url')[0] === entry.url, `${path}: og:url`);
  check(
    page.meta('og:type')[0] === (path.includes('/blog/') ? 'article' : 'website'),
    `${path}: og:type`
  );
  check(
    !page.meta('robots').some((v) => /noindex|nofollow/.test(v)),
    `${path}: accidentally excluded`
  );
  check(page.alternates.length === 5, `${path}: expected ES, es-ES, CA, EN and x-default`);
  check(
    JSON.stringify(page.alternates.map((a) => [a.hreflang, a.href])) ===
      JSON.stringify(entry.alternates.map((a) => [a.hreflang, a.href])),
    `${path}: HTML/sitemap hreflang mismatch`
  );
  check(
    page.graph.filter((n) => n['@type'] === 'Organization').length === 1,
    `${path}: organization`
  );
  check(page.graph.filter((n) => n['@type'] === 'WebSite').length === 1, `${path}: website`);
  const webPage = page.graph.find((n) => n['@id'] === entry.url);
  check(Boolean(webPage), `${path}: WebPage identity`);
  check(
    !page.graph.some((n) => n['@type'] === 'FAQPage' || n.geo || n.priceRange),
    `${path}: obsolete/unverified schema`
  );
  if (path.includes('/blog/')) {
    const article = page.graph.find((n) => n['@type'] === 'BlogPosting');
    check(
      article?.mainEntityOfPage?.['@id'] === entry.url && article?.author?.url?.includes('#'),
      `${path}: article/author identity`
    );
    check(
      Boolean(article?.image && article?.headline && article?.datePublished),
      `${path}: article required fields`
    );
  }
  for (const img of page.images) {
    check(img.alt !== undefined, `${path}: image without alt ${img.src}`);
    if (img.src?.startsWith('/')) assets.add(img.src);
  }
  for (const match of decode(text).matchAll(/url\(['"]?(\/[^'"\)\s]+)['"]?\)/g)) assets.add(match[1]);
  for (const match of text.matchAll(/<(?:source|video)\b[^>]*>/g)) {
    const media = attributes(match[0]);
    if (media.src?.startsWith('/')) assets.add(media.src);
    if (media.poster?.startsWith('/')) assets.add(media.poster);
  }
  for (const link of page.links) {
    if (!link.href) continue;
    if (link.href.startsWith('/')) internalLinks.add(link.href.split('#')[0].split('?')[0] || '/');
    if (link.target === '_blank')
      check(/noopener|noreferrer/.test(link.rel || ''), `${path}: unsafe external link`);
  }
  for (const image of page.meta('og:image')) {
    check(image.startsWith(site), `${path}: external/missing social image`);
    assets.add(new URL(image).pathname);
  }
}

for (const [url, page] of pages) {
  for (const alternate of page.alternates) {
    const target = pages.get(alternate.href);
    check(Boolean(target), `${url}: absent alternate ${alternate.href}`);
    check(
      target?.alternates.some((a) => a.href === url),
      `${url}: missing reciprocal hreflang`
    );
  }
}
check(
  new Set([...pages.values()].map((p) => p.title)).size === pages.size,
  'Duplicate indexable titles'
);
check(
  new Set([...pages.values()].map((p) => p.meta('description')[0])).size === pages.size,
  'Duplicate indexable descriptions'
);

for (const path of ['/terminos', '/politica-privacidad', '/politica-cookies', '/aviso-legal']) {
  const { response, text } = await request(path);
  const page = inspect(text);
  check(
    response.status === 200 && page.meta('robots').some((v) => v.includes('noindex')),
    `${path}: noindex legal page`
  );
  check(!sitemapEntries.some((e) => e.url === site + path), `${path}: legal page in sitemap`);
  check(
    page.canonical[0] === site + path && page.alternates.length === 0,
    `${path}: legal canonical/language`
  );
}
for (const path of [
  '/seo-not-found',
  '/blog/no-existe',
  '/ca/blog/no-existe',
  '/en/blog/no-existe'
]) {
  const { response, text } = await request(path);
  check(
    response.status === 404 &&
      inspect(text)
        .meta('robots')
        .some((v) => v.includes('noindex')),
    `${path}: real 404/noindex`
  );
}
const { response: malformed } = await request('/%E0%A4%A');
if (process.argv.includes('--production')) {
  check(malformed.status === 400, 'Malformed URL must return 400 in production');
} else if (malformed.status >= 500) {
  warnings.push(
    'Malformed URL rejected by Vite development middleware; verify production separately.'
  );
}
for (const [path, target, status] of [
  ['/es/como-funciona?utm_source=seo', '/como-funciona?utm_source=seo', 301],
  ['/ca/contacte/', '/ca/contacte', 308]
]) {
  const { response } = await request(path);
  check(
    response.status === status && response.headers.get('location') === target,
    `${path}: redirect`
  );
}
const { text: trackingPage } = await request('/en?utm_source=seo');
check(inspect(trackingPage).canonical[0] === site + '/en', 'Tracking parameters in canonical');

for (const path of internalLinks) {
  if (pages.has(site + (path === '/' ? '' : path))) continue;
  const { response } = await request(path);
  check(
    response.status === 200 || response.status === 301 || response.status === 308,
    `Broken internal link: ${path}`
  );
}
for (const asset of assets) {
  try {
    const data = await stat(resolve('static', '.' + decodeURIComponent(asset)));
    if (data.size > 1_000_000)
      warnings.push(`Heavy media: ${asset} (${(data.size / 1_000_000).toFixed(2)} MB)`);
  } catch {
    failures.push(`Missing asset: ${asset}`);
  }
}
for (const language of ['es', 'ca', 'en']) {
  const path = language === 'es' ? '/blog.xml' : `/${language}/blog.xml`;
  const { response, text } = await request(path);
  check(response.status === 200 && text.includes(`${site}${path}`), `${path}: RSS URL`);
  check([...text.matchAll(/<item>/g)].length === 6, `${path}: RSS entries`);
  check(
    text.includes(
      `<language>${language === 'es' ? 'es-ES' : language === 'ca' ? 'ca-ES' : 'en-GB'}</language>`
    ),
    `${path}: RSS language`
  );
}
const { text: robots } = await request('/robots.txt');
check(
  robots.includes(`Sitemap: ${site}/sitemap.xml`) && !robots.includes('Disallow: /'),
  'Robots blocks crawling/sitemap'
);
const { text: index } = await request('/sitemap_index.xml');
check(index.includes(`<loc>${site}/sitemap.xml</loc>`), 'Sitemap index');
check(
  !sitemap.includes('eimafisioterapia.es') && !robots.includes('eimafisioterapia.es'),
  'Old domain'
);

console.log(
  `${pages.size} indexable pages, 3 RSS feeds, ${assets.size} local media assets, ${internalLinks.size} internal destinations checked.`
);
for (const warning of warnings) console.log('REVIEW:', warning);
if (failures.length) {
  for (const failure of failures) console.error('FAIL:', failure);
  process.exitCode = 1;
} else console.log('SEO checks passed.');
