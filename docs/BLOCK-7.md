# Bloque 7 — Preparación de publicación y migración

Revisión del 1 de octubre de 2026, exclusivamente en `eima-salut`.
La preparación local está verificada. El lanzamiento no está ejecutado ni
autorizado: no se ha hecho push, commit, merge, despliegue ni cambio de hosting,
dominio, DNS o correo. Los cambios anteriores se conservan.

## Estado

### Autorización de publicación posterior

El 1 de octubre de 2026 el usuario autorizó expresamente subir la nueva versión
a GitHub y publicarla sustituyendo la web antigua. Esa autorización posterior
sustituye la prohibición de publicación anterior para este lanzamiento; no
autoriza cancelar IONOS ni eliminar buzones. Publicación todavía pendiente de
ejecución y validación real.

Capturas de hPanel confirman SvelteKit, Node 22.x, repo eima, rama main,
despliegue automático activo y commit actual 9db18ec3, terminado el 22/07/2026.
Logs recibidos confirman vite build y adapter-node. Tooltip: entrada index.js;
la ubicación efectiva de ejecución no consta en ese tooltip. Variables actuales:
PORT=3000 y seis SMTP del correo antiguo. La versión nueva no usa SMTP.
La contraseña SMTP visible en una captura debe rotarse sin copiarla al chat,
repositorio ni informe. No se almacena su valor aquí.

Revalidación de la entrega autorizada: check 0 errores/0 avisos, build correcto
y búsqueda heurística de secretos sin hallazgos. No se cambian textos legales
aprobados ni se da por certificada su revisión legal. Notas de contratos y
correo en PROVIDERS-MIGRATION.md y BLOCK-8.md son documentos locales privados,
excluidos de esta subida al repositorio público.

Actualización posterior con capturas del usuario: contratos, precios del dominio
y correo nuevos y propuesta de baja IONOS documentados en
`PROVIDERS-MIGRATION.md`. Gmail y nombre Google cambiados por el usuario;
seguimiento en `BLOCK-8.md`. No se ha confirmado la baja, transferencia,
funcionamiento del correo ni publicación. El ZIP anterior es una instantánea
previa a estas nuevas notas; no se ha regenerado ni cambiado el código por ellas.

| Elemento                           | Resultado                                                                                           |
| ---------------------------------- | --------------------------------------------------------------------------------------------------- |
| Rama y entrega                     | Rama `eima-salut`; cambios locales inventariados, sin preparar staging ni alterar el historial      |
| GitHub remoto                      | Conector autorizado: `main` en `9db18ec`, `eima-salut` en `fd467b7`; el rediseño sigue local        |
| Variables                          | Sin SMTP; variables Node de producción documentadas, sin credenciales                               |
| Seguridad                          | Auditoría npm: 16 avisos iniciales, 0 tras correcciones                                             |
| Secretos                           | Sin coincidencias en búsqueda heurística del árbol de texto ni parches de 59 commits locales        |
| Tipos y build                      | Tipos sin errores ni avisos; build de producción correcto                                           |
| Instalación de producción          | `npm ci --omit=dev` en copia aislada: 5 paquetes, 0 vulnerabilidades; servidor y recursos funcionan |
| Migración por URL                  | 58 entradas documentadas; todos los destinos responden 200 localmente                               |
| Regresión                          | 49 rutas sin fallos inesperados de recursos, consola o hidratación; 48/48 interacciones pasan       |
| SEO                                | 39 páginas indexables, 3 RSS, 44 medios y 42 destinos internos verificados                          |
| Infraestructura pública            | Dominios y certificados consultados en modo lectura; configuración privada de hPanel pendiente      |
| Publicación y validación posterior | Pendientes de autorización y ejecución                                                              |

## Correcciones realizadas

La instalación completa `npm ci` y `npm run build` también se han repetido
correctamente desde una copia limpia del árbol de entrega y el lockfile.
No se han reinstalado ni eliminado los cambios del repositorio para esta prueba.

- README actualizado: SvelteKit con adaptador Node y Hostinger; retiradas las
  instrucciones obsoletas sobre Vercel, Nodemailer y credenciales SMTP.
- Añadido `npm start` (`node build/index.js`) y requisito Node >=22.12.0.
  Verificar que el Node 22.x del hosting cumple ese mínimo. Las pruebas locales
  se han ejecutado con Node 24.15.0 y también Node 22.23.3 en Windows, no en el
  sistema de Hostinger.
- SvelteKit 2.50.0 → 2.70.3, Svelte instalado 5.55.4 → 5.57.1 y Vite
  7.3.2 → 7.3.6, conservando sus versiones principales. Plugin Svelte/Vite
  fijado en 6.2.4, compatible con Vite 7.
- Versiones transitivas corregidas mediante overrides: cookie 0.7.2 para
  SvelteKit, PostCSS 8.5.28, Nano ID 3.3.19 y esbuild 0.28.2. Mantener el lockfile
  y revisar estos overrides en futuras actualizaciones.
- Tailwind y su plugin Vite clasificados como dependencias de desarrollo,
  evitando instalar el compilador y Vite en el servidor de producción.
- Los seis aliases antiguos del blog devolvían 404 en el build, pese a conservar
  su código de redirección. El prerenderizado cambia a `auto`: los artículos
  publicados siguen prerenderizados y el servidor atiende aliases y errores.
  Sus redirecciones 301 conservan ahora los parámetros de consulta.

No se han cambiado diseño ni contenidos aprobados. Favicon A e imagen social
existente ya estaban aprobados y permanecen como definitivos.

## Infraestructura pública observada

- `https://eimafisioterapia.es` y su WWW sirven la web anterior con respuesta 200.
  Sus variantes HTTP redirigen a HTTPS del mismo host; WWW todavía no converge
  al host sin WWW.
- `https://eimasalut.es` y su WWW responden 200 con la página de dominio aparcado
  de Hostinger y `noindex, nofollow, noarchive, nosnippet`. Sus variantes HTTP
  responden 200 sin forzar HTTPS. No es el lanzamiento de EIMA SALUT.
- Los cuatro hosts HTTPS presentan certificados válidos en la comprobación
  actual. Esto no garantiza la renovación ni el certificado de un futuro
  alojamiento conectado.
- DNS del dominio nuevo: MX de Hostinger, SPF de Hostinger y DMARC `p=none`.
  Estos registros no prueban que el buzón `hola@eimasalut.es` exista ni que envíe
  o reciba correctamente. No se han enviado correos ni modificado registros.
- La conexión GitHub/Hostinger con despliegue automático de `main` consta en
  MIGRATION.md; no se ha confirmado en la cuenta durante esta revisión.
- hPanel abierto en el navegador integrado de Codex: muestra el formulario de
  inicio de sesión. La revisión de la cuenta requiere que el usuario entre;
  no se han introducido credenciales ni cambiado configuraciones.

## Revisión de GitHub y límite de acceso al hosting

Después de que el usuario comunicara haber iniciado sesión, el navegador
disponible para el agente seguía mostrando los formularios de entrada. Esas
sesiones de navegador no están compartidas con este acceso. No se han intentado
extraer cookies o credenciales de otros navegadores.

GitHub sí se ha comprobado con su conector autorizado y `git ls-remote`, en
modo lectura:

- Repositorio público `oncobigjimmy/eima`, rama predeterminada `main`. Conservar
  el nombre `eima` no impide publicar la identidad EIMA SALUT.
- `main`: `9db18ec3e56bca9382d5ef143ff59610140a362c`.
- `eima-salut`: `fd467b764fad141fcc0e9ecb5e46bb1ea24c9130`, un commit por delante
  de `main` y ninguno por detrás. Ese commit añade únicamente AGENTS y tres
  documentos de marca, migración y decisiones.
- Los bloques implementados después, incluido favicon A, están en el árbol
  local; no aparecen todavía en la rama remota.
- La colección de ramas devuelve `protected: false` para ambas; la colección
  de rulesets devuelve `[]`. El endpoint de detalles de protección devuelve
  403 por las limitaciones de la integración. No se han cambiado permisos.
- La consulta de estados del commit de `main` devuelve `statuses: []`; no
  demuestra ausencia de despliegues externos o de una integración Hostinger.

Para terminar la revisión privada de Hostinger, hace falta entrar en hPanel
desde el navegador integrado accesible al agente, o revisar juntos la
configuración cuando el usuario vuelva. Todavía no están comprobados allí
los comandos, variables, versión efectiva de Node, aplicación GitHub conectada,
historial de despliegues, respaldo/restauración y buzón. Esto es un límite
concreto de acceso, no una petición de permisos para realizar cambios.

## Mapa y reglas de migración propuestas

`MIGRATION-MAP.csv` incluye las 22 URLs del sitemap público anterior, legales
detectados al recorrerlas, Aviso Legal y endpoints existentes del repositorio,
seis aliases de artículos y variantes `/es` atendidas por las redirecciones
existentes. No se han inventado equivalencias temáticas.

1. Destino canónico único: `https://eimasalut.es`, sin WWW.
2. En el lanzamiento, HTTP y WWW del dominio nuevo deben redirigir al destino
   canónico conservando ruta y consulta.
3. Las variantes HTTP/HTTPS y WWW/sin WWW del dominio anterior deben devolver
   301 al destino final del mapa, preferiblemente en un salto. Resolver primero
   las excepciones de aliases y `/es`; después el cambio de host de rutas iguales.
4. Conservar consultas y codificación de rutas. Los fragmentos `#...` no se
   transmiten al servidor: comprobar su navegación en el navegador.
5. Mantener recursos estáticos de la web anterior. El inventario confirma que
   no faltan archivos originales de `static`, salvo robots/sitemap index, ahora
   servidos mediante rutas. No redirigir URLs desconocidas a Inicio: deben
   conservar un error real si no existe destino equivalente.
6. Mantener dominio anterior, certificados y redirecciones a largo plazo.
   Comprobar también URLs de Search Console o registros de tráfico cuando se
   tenga acceso; el sitemap público no prueba cobertura de todos los enlaces
   históricos externos.

Los 301 entre dominios son una propuesta para configurar y verificar en el
hosting. Actualmente solo están comprobados los destinos y aliases locales;
no se han activado reglas entre dominios.

## Configuración prevista del servidor

Validación adicional con Node 22.23.3 oficial portable para Windows x64, con
SHA-256 contrastado con SHASUMS de nodejs.org: tipos (0 errores y 0 avisos),
build y arranque pasan desde una copia aislada. Inicio ES/CAT/EN, sitemap,
robots y favicon A responden 200; un alias antiguo devuelve 301 conservando
consulta y un artículo inexistente devuelve 404. El Node del sistema no se ha
cambiado. No sustituye la comprobación del entorno Linux y la versión efectiva
del proveedor.

La copia `EIMA-SALUT-PREPUBLICACION.zip` conserva 234 archivos de fuentes,
documentación y recursos, con manifiesto SHA-256 y CRC verificados. No contiene
`.git`, credenciales, dependencias ni build. Conserva los archivos nuevos y el
estado final de los modificados sin alterar staging, ramas o commits.

Instalación de build: `npm ci`; compilación: `npm run build`; arranque:
`npm start`. El artefacto Node necesita `build`, `package.json`, lockfile y
dependencias de producción. No servir la carpeta del repositorio como raíz
pública. Si el hosting separa build/ejecución, `npm ci --omit=dev` corresponde
a la instalación del servidor ya compilado, no a la fase de build.

Definir `NODE_ENV=production` y `ORIGIN=https://eimasalut.es`. El proveedor asigna
`PORT`; comprobar si requiere `HOST=0.0.0.0`. No fijar cabeceras de proxy ni
puerto sin inspeccionar la configuración efectiva. `npm start` no carga `.env`
automáticamente. Fuente: [documentación del adaptador Node](https://svelte.dev/docs/kit/adapter-node).

Las rutas `.env`, `.git/config`, código fuente y manifests del repositorio
devuelven 404 en el servidor local de producción. No hay coincidencias de las
firmas de secretos buscadas; esta búsqueda no sustituye una revisión de la
cuenta, del gestor de secretos o de historial remoto no disponible localmente.

## Secuencia de lanzamiento — todavía no ejecutada

1. Revisar hPanel: proyecto y repo efectivos, rama de despliegue, Node, comandos,
   variables, dominio asociado, logs, copia/restauración y certificados. Revisar
   el buzón nuevo sin compartir contraseñas en el chat.
2. Preparar una entrega revisada con todos los archivos nuevos del inventario,
   incluida documentación, traducciones, fuentes e imágenes. El registro actual
   no es un commit listo para desplegar. Confirmar el alcance del commit/push
   antes de ejecutarlos; no incluir `.env`, `node_modules`, `build` ni cachés.
3. Preparar y probar el destino sin sustituir inadvertidamente la web anterior.
   Si se usa preview, protegerlo con acceso y noindex del entorno de preview.
   Los canonicals del candidato apuntan ya al dominio definitivo.
4. Obtener autorización expresa para la entrega y los cambios de hosting/DNS.
   Conectar el destino nuevo, desplegar el candidato revisado y comprobarlo.
5. Solo tras verificar la web nueva, activar HTTPS, host canónico y redirecciones
   del dominio anterior. Una fusión en `main` activa producción automáticamente:
   no usarla como una prueba inocua.
6. Validar ES/CAT/EN, legales, artículos, 404, favicon, imagen social, recursos,
   consola, navegación, canonicals/hreflang, sitemap y RSS en el dominio real.
   Comprobar que desapareció el noindex del aparcamiento y no hay cadenas/bucles
   de redirección, contenido mixto ni certificados inválidos.
7. Conservar logs y vigilar errores del lanzamiento. Search Console, sitemap
   enviado, cambio de dirección y presencia externa pertenecen al bloque 8.

## Reversión y asuntos que no deben ocultarse

Antes de publicar, registrar el commit realmente desplegado, configuración
actual y respaldo recuperable desde hPanel. `9db18ec` es la referencia histórica
del inicio de la migración; no asumir que sigue siendo el despliegue actual.
Ante fallos de arranque, rutas principales, recursos o redirecciones, revertir
el despliegue/configuración que los causó y desactivar las nuevas redirecciones
del dominio anterior. No usar reset del árbol local ni borrar avances.

Siguen documentados en el bloque 6 el contraste de algunos textos del azul
aprobado, el peso de medios, la deuda de formato y las decisiones legales. Este
bloque no certifica cumplimiento completo de accesibilidad ni decide esos
cambios. La reproducción de YouTube sigue limitada por la conexión de pruebas.
Los textos legales actuales incluyen notas que los describen como borrador y
pendientes de revisión; se conservan por estar fuera de las correcciones
técnicas. Su aprobación para publicación debe resolverse antes del lanzamiento.
Tampoco certifica Linux/Node 22 del proveedor, buzón, DNS futuro, permisos de
cuenta o funcionamiento postpublicación.

Avisos consultados para la actualización:
[SvelteKit](https://github.com/sveltejs/kit/security/advisories/GHSA-29g2-3rmr-qm68),
[Svelte](https://github.com/sveltejs/svelte/security/advisories/GHSA-pr6f-5x2q-rwfp),
[Vite](https://github.com/vitejs/vite/security/advisories/GHSA-fx2h-pf6j-xcff).
