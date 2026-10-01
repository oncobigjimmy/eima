# Auditoría SEO técnico — Eima Salut

Fecha: 1 de octubre de 2026. Entorno: build de producción servido exclusivamente en localhost. No se ha publicado ni cambiado producción, DNS o hosting.

## Alcance y resultado

39 páginas indexables (21 páginas principales y 18 artículos, en ES/CA/EN), cuatro páginas legales no indexables, páginas inexistentes, tres RSS, sitemap, robots y navegación interna. El inventario completo de campos realmente servidos está en [SEO-METADATA.md](SEO-METADATA.md). SEO title y meta title son el mismo elemento HTML: <title>. OG title/description son campos independientes.

## Problemas corregidos

| Prioridad | Hallazgo | Cambio |
| --- | --- | --- |
| Alta | Schema global con información de negocio local no confirmada, coordenadas y rango de precios | Sustituido por Organization con datos existentes, WebSite y schema contextual por página. Sin inventar dirección ni servicios. |
| Alta | Metadata social duplicada en artículos | Un único og:type y twitter:card; artículo conserva tipo article. |
| Media | Títulos SEO anteriores y marca en mayúsculas | Aplicados los seis títulos castellanos indicados por el usuario y equivalentes traducidos. Marca de metadata: Eima Salut; diseño y copy visibles conservados. |
| Media | Atribución semántica de autores enlazada a redes de la marca | Person enlaza a los perfiles reales de Jaume y Miquel. |
| Media | Fechas lastmod estáticas e inexactas | Eliminadas fechas no justificadas; artículos/RSS utilizan las fechas editoriales existentes. |
| Media | FAQPage global innecesario | Retirado únicamente el marcado. Preguntas y diseño conservados. Google retiró los resultados enriquecidos FAQ en mayo de 2026. |
| Media | Imágenes inferiores cargadas anticipadamente | Añadidos lazy loading y decoding asíncrono a imágenes inferiores seleccionadas y al contenido de los artículos. |
| Media | Alternates podían anunciar traducciones futuras inexistentes | Las alternates de artículos se limitan a traducciones realmente disponibles. |
| Baja | Aviso de build por transport | Exportación vacía tipada del hook; sin cambiar comportamiento. |

## Confirmaciones

- Canonicals: HTTPS, dominio eimasalut.es y self-canonical de las 39 páginas; parámetros no crean otra identidad canónica.
- Hreflang: ES, es-ES, CA, EN y x-default, recíprocos y coincidentes entre HTML y sitemap. ES/es-ES son aliases intencionados. Legales sin traducción no anuncian versiones inexistentes.
- Sitemap: 39 URLs sin duplicados, legales y errores excluidos. Índice y robots apuntan al dominio nuevo; assets accesibles.
- Metadata social: title, description, URL, imagen, alt, locale y Twitter presentes en páginas indexables. Imagen global existente autorizada; imágenes específicas para artículos.
- Schema: Organization, WebSite, WebPage y tipos contextuales AboutPage/ContactPage/CollectionPage, Person, BreadcrumbList y BlogPosting. Sin estrellas inventadas ni VideoObject para el VSL aún pendiente.
- Headings: un H1 no vacío en cada página indexable. Sin cambiar textos aprobados.
- Legales: noindex y canonical propio. Rutas inexistentes: HTTP 404 y noindex. URL malformada: HTTP 400 en producción local.
- RSS: seis artículos por idioma y URLs correspondientes.
- Enlaces internos y medios locales comprobados; externos con nueva ventana conservan protección rel.

## Validación

npm run check: cero errores y cero warnings. Build de producción completado. Auditoría reproducible: npm run audit:seo -- http://127.0.0.1:4181 --production. Revisión en navegador de cambio de idioma y navegación cliente: canonical, HTML lang, metadata y schema cambian correctamente, sin conservar el schema del artículo anterior. Consola revisada sin errores/avisos en ese recorrido.

## Observaciones que siguen abiertas

Seis medios existentes superan 1 MB: imágenes de hero (1,13 y 1,57 MB), vídeos de Inicio (12,08 MB) y Cómo funciona (9,53 MB), imagen Contacto (3,45 MB) y Blog (1,62 MB). No se han recomprimido ni sustituido assets aprobados. Conviene revisar su transferencia en el bloque 6 y valorar optimización conservando originales y apariencia.

Esta comprobación local no certifica Core Web Vitals reales, indexación en Google ni previews ya publicadas. Su verificación depende del lanzamiento y de Search Console. No se han enviado datos a cuentas externas ni validadores remotos.

LocalBusiness necesitaría datos de ubicación real confirmados si se quisiera añadir después. Los dos perfiles comparten página con anchors; no son URLs indexables independientes.

## Próximo paso

Bloque 6: QA sistemático de todas las rutas, idiomas, viewports y rendimiento. Después, bloque 7 con autorización expresa de publicación; bloque 8 para Search Console y coherencia externa.

## Referencias oficiales

[Versiones localizadas y hreflang](https://developers.google.com/search/docs/specialty/international/localized-versions), [canonicals](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls), [Organization](https://developers.google.com/search/docs/appearance/structured-data/organization), [sitemaps y lastmod](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [actualizaciones y retirada de FAQ](https://developers.google.com/search/updates).
