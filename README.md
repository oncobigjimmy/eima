# EIMA SALUT

Web de EIMA SALUT con SvelteKit 2, Svelte 5, Tailwind CSS 4 y MDSvex.
Español, catalán e inglés. Contacto por WhatsApp, teléfono y email, sin formulario
SMTP. Identidad y datos públicos en `src/lib/site.js`.

## Desarrollo

Requisito: Node >=22.12.0. Hostinger figura configurado con Node 22.x; comprobar
la versión efectiva antes del lanzamiento. Instalación reproducible:

```sh
npm ci
npm run dev
```

No se requieren credenciales ni `.env` para desarrollo. Trabajar en `eima-salut`
y conservar los cambios locales. `main` activa el despliegue de producción.

## Verificación y ejecución local

```sh
npm run check
npm run build
npm start
```

El adaptador es `@sveltejs/adapter-node`. `npm start` ejecuta `build/index.js`;
requiere un build previo. `npm run preview` permite revisar el resultado local.
La auditoría SEO admite únicamente un servidor local:

```sh
npm run audit:seo -- http://127.0.0.1:3000 --production
npm audit
```

`npm run lint` comprueba el formato; la deuda de formato figura en el QA.
No ejecutar un reformateo global como parte de la publicación.

## Producción y migración

Destino: `https://eimasalut.es`, sin WWW. La web anterior sigue en
`https://eimafisioterapia.es`. El dominio nuevo en el código no confirma su
activación ni la del correo `hola@eimasalut.es`.

Comandos previstos: instalación `npm ci`, build `npm run build`, arranque
`npm start`. Confirmar su configuración real en Hostinger antes de usarlos.
Definir `ORIGIN=https://eimasalut.es` y `NODE_ENV=production` en el entorno del
proceso; el hosting proporciona el puerto. No configurar cabeceras de proxy
sin comprobar la cadena de proxies de confianza.

El servidor de producción no carga `.env` automáticamente. `.env.example`
documenta las variables de ejecución; `.env*` privados quedan fuera de Git.
No se requieren variables SMTP ni claves de analítica.

Las actualizaciones de seguridad mantienen las versiones principales. Los
`overrides` fijan versiones corregidas de cookie (solo para SvelteKit), PostCSS,
Nano ID y esbuild. Revisar su necesidad en futuras actualizaciones y repetir
build, tipos, auditoría SEO y QA de interacción.

Consultar [MIGRATION](docs/MIGRATION.md), [bloque 7](docs/BLOCK-7.md) y
[mapa de migración](docs/MIGRATION-MAP.csv). No hacer push, merge, despliegues ni
cambios en dominios, DNS o Hostinger sin autorización expresa del usuario.
