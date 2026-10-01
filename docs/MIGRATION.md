# Migración a EIMA SALUT

## Publicación autorizada — 1 de octubre de 2026

El usuario autorizó expresamente publicar y sustituir la web anterior. Este
apartado sustituye el estado histórico de preparación que figura debajo.

- Hostinger sirve la nueva web en `https://eimasalut.es`, desde `eima-salut`;
  `main` se conserva intacta. El commit publicado es `cbcd030`.
- La compilación requiere las dependencias de desarrollo: hPanel usa
  `NPM_CONFIG_INCLUDE=dev`, junto a `NODE_ENV=production` y `PORT=3000`.
- El dominio antiguo está aparcado sobre la nueva aplicación. Las dos reglas
  de hPanel para HTTP y HTTPS redirigen la portada al nuevo dominio; la prueba
  pública confirmó que las páginas interiores todavía respondían 200 bajo el
  dominio antiguo.
- Se añade una capa sobre el handler generado por adapter-node, antes de las
  páginas prerenderizadas, para redirigir ambos hosts antiguos y el `www` nuevo
  a `https://eimasalut.es`, conservando la ruta y la query. No cambia las rutas
  y alias de la aplicación ni el servidor de inicio generado por el adaptador.
- Validación local: check sin errores ni avisos, build correcto y 27 pruebas
  HTTP del handler generado. Falta subir esta corrección y verificarla en
  Hostinger; la autorización de publicación ya está concedida.
- El correo nuevo se ha probado en envío y recepción. La confirmación del
  reenviador del socio, la migración del buzón antiguo y la finalización de la
  transferencia del dominio son asuntos separados pendientes de confirmar.

| Elemento | Identidad anterior         | Destino             |
| -------- | -------------------------- | ------------------- |
| Marca    | EIMA Fisioterapia          | EIMA SALUT          |
| Dominio  | `eimafisioterapia.es`      | `eimasalut.es`      |
| Email    | `info@eimafisioterapia.es` | `hola@eimasalut.es` |

## Estado confirmado

- `eimafisioterapia.es` sigue siendo producción y debe permanecer intacta durante la preparación.
- Hostinger está conectado a GitHub y despliega automáticamente `main` del repositorio `oncobigjimmy/eima`.
- Hostinger detecta SvelteKit y utiliza Node 22.x.
- Al iniciar esta migración, el despliegue confirmado y `main` coincidían en el commit `9db18ec`.
- La rama de desarrollo es `eima-salut`; existe en GitHub y tiene seguimiento de `origin/eima-salut`.
- `eimasalut.es` está registrado; todavía no se ha autorizado conectarlo ni publicar la nueva web.

## Objetivo y alcance

El objetivo final es publicar EIMA SALUT en `eimasalut.es` y retirar progresivamente la identidad anterior.

La migración deberá revisar nombre, logos, favicon, dominio, email, títulos y descripciones, canonicals, hreflang, Open Graph y metadatos sociales, schema/JSON-LD, sitemap, robots.txt, RSS, textos legales y cualquier referencia técnica al dominio antiguo. Conservar y comprobar las rutas y redirecciones existentes.

**No hacer todavía la migración de dominio ni tocar producción.** La publicación y la transición del dominio antiguo requieren una petición expresa posterior. Documentar estas decisiones no supone implementarlas.

## Preparación del bloque 7 — 1 de octubre de 2026

La revisión local, correcciones y secuencia de lanzamiento/reversión figuran en
[BLOCK-7.md](BLOCK-7.md). El [mapa de URLs](MIGRATION-MAP.csv) prepara las
redirecciones entre dominios; no las activa. La consulta pública confirma que
el dominio nuevo muestra el aparcamiento de Hostinger y la web anterior sigue
accesible. La configuración privada de hPanel sigue pendiente de revisión.
