# Blog en ES / CAT / EN

## Alcance autorizado

La petición posterior del usuario sustituye la decisión anterior «Blog solo en castellano»: traducir el listado y las seis entradas completas a catalán e inglés, conservando el diseño aprobado.

- Listados: `/blog`, `/ca/blog`, `/en/blog`.
- Artículos: seis por idioma, con slugs traducidos y un ID estable para vincular las versiones.
- Selector de idioma: conserva el artículo, los parámetros y el hash.
- Header, menú móvil y footer: Blog enlaza al idioma actual.
- Traducción de cuerpos completos, metadatos, textos alternativos descriptivos, fechas, autores, recomendaciones y CTAs. Nombres propios y títulos oficiales de las publicaciones científicas se conservan.
- Mismas fuentes, imágenes, estilos específicos del contenido, tarjetas, efectos hover y estructura castellana. No se han añadido afirmaciones ni fuentes nuevas ni realizado una revisión clínica del copy original.
- Enlaces internos a Empenta, FAQ, Contacto e historias localizados.
- Canonicals propios y hreflang recíprocos; JSON-LD y metadata social localizados; sitemap con tres listados y dieciocho artículos.
- RSS en `/blog.xml`, `/ca/blog.xml`, `/en/blog.xml`, con contenido y URLs del idioma correspondiente. Entradas explícitas de prerender para los feeds localizados.

## Comprobación

- `npm run check`: 0 errores y 0 avisos.
- Build de producción correcto. Permanece el aviso preexistente de Vite sobre `transport` en `src/hooks.js`.
- Navegador real: 14 páginas traducidas a 390, 768 y 1440 px, fuentes cargadas, sin overflow horizontal y cinco enlaces hreflang en cada una.
- Cambio CAT → EN en un artículo: mantiene la entrada, cambia texto, rutas, canonical y formato de fecha.
- Comprobación de contenido: mismas cantidades de secciones, mismas imágenes y enlaces científicos, mismo CSS por entrada y assets existentes.
- Inspección visual del listado y artículos en escritorio, tablet y móvil. El line-clamp del listado en tablet se conserva como en el diseño original.

No se ha publicado, desplegado ni modificado producción.
