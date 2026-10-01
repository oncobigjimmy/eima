const canonicalOrigin = 'https://eimasalut.es';
const redirectHosts = new Set([
  'eimafisioterapia.es',
  'www.eimafisioterapia.es',
  'www.eimasalut.es'
]);

// Run before adapter-node serves prerendered pages, assets or SSR routes.
export function withCanonicalDomain(handler) {
  return (request, response, next) => {
    const host = request.headers.host?.toLowerCase().replace(/:\d+$/, '').replace(/\.$/, '');
    if (redirectHosts.has(host)) {
      // A fixed destination and origin-form path prevent open redirects.
      const path = request.url?.startsWith('/') ? request.url : '/';
      response.writeHead(301, { Location: canonicalOrigin + path });
      response.end();
      return;
    }
    return handler(request, response, next);
  };
}
