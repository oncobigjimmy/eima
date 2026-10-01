import assert from 'node:assert/strict';
import http from 'node:http';
import { handler } from '../build/handler.js';

const server = http.createServer(handler);
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const port = server.address().port;
const request = (host, path) => new Promise((resolve, reject) => {
  http.get({ hostname: '127.0.0.1', port, path, headers: { host } }, (response) => {
    response.resume();
    response.on('end', () => resolve({ status: response.statusCode, location: response.headers.location }));
  }).on('error', reject);
});

try {
  let count = 0;
  for (const host of ['eimafisioterapia.es', 'www.eimafisioterapia.es', 'www.eimasalut.es']) {
    for (const path of ['/', '/contacto?utm_source=antigua', '/ca/contacte', '/en/contact', '/robots.txt', '/favicon.svg', '/ruta-inexistente', '//example.com/path']) {
      const response = await request(host, path);
      assert.equal(response.status, 301);
      assert.equal(response.location, 'https://eimasalut.es' + path);
      count++;
    }
  }
  for (const host of ['eimasalut.es', 'localhost', 'eimasalut.es.example.com']) {
    const response = await request(host, '/contacto');
    assert.equal(response.status, 200);
    assert.equal(response.location, undefined);
    count++;
  }
  console.log(`${count} comprobaciones correctas del servidor generado: rutas, query, prerender, assets y destino fijo.`);
} finally {
  await new Promise((resolve) => server.close(resolve));
}
