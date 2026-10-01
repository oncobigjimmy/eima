# Bloque 0 — Global técnico

Implementado el 29 de septiembre de 2026, exclusivamente en `eima-salut`.

- Marca EIMA SALUT en los tres idiomas: referencias anteriores, textos alternativos, footer, metadatos y textos legales. El contenido y el diseño de las páginas se conservan para sus bloques respectivos.
- Configuración compartida en `src/lib/site.js`: marca, dominio de destino, email, teléfono, WhatsApp, logos, imagen social y color de tema.
- URLs y email existentes usan el destino eimasalut.es / hola@eimasalut.es. Robots y sitemap index se generan desde la configuración, conservando sus reglas y estructura. La auditoría SEO completa pertenece al bloque 5.
- Newsreader instalada y servida localmente en sustitución de Noto Serif. Inter y Playfair Display se conservan, porque el acuerdo sustituye únicamente Noto Serif.
- Logos definitivos aportados por el usuario: blanco sobre oscuro y negro sobre claro. Se conservan los originales PNG. BrandLogo ajusta su encuadre; el filtro SVG hace transparente el fondo negro del logo blanco al renderizar, sin alterar el archivo original.
- Favicon: E blanca geométrica, sin círculo, fondo sólido #245B7D. SVG, ICO con 16/32/48 px, PNG de respaldo y Apple Touch Icon de 180 px.
- Especificación consolidada guardada en REDESIGN-SPEC.md y enlazada desde AGENTS.md como fuente de verdad.

## Verificación

Build correcto. Comprobación HTTP de Home ES/CA/EN, páginas principales, legales, sitemap, robots y RSS: respuestas 200; sin dominio antiguo ni marcadores sin resolver. JSON-LD renderizado parseable. Iconos y logos accesibles. Comprobación visual de logo blanco en hero, negro en cabecera clara y vista estrecha.

La comprobación de tipos ya mostraba 79 errores en 16 archivos antes de los cambios. La comparación de los mensajes de error después de la implementación devuelve los mismos 79 diagnósticos, sin nuevos errores. No se corrige deuda de tipado ajena al bloque.

## Límites

Sin push, despliegue ni cambios en main, Hostinger, DNS o servicios de correo. Que el código use el nuevo dominio y email no confirma que esos servicios estén activos. La activación se reserva para publicación. Los bloques de rediseño y la auditoría SEO siguen pendientes.


## Prueba tipográfica — 29 de septiembre de 2026

A petición del usuario, Fraunces Light 300 (normal y cursiva) sustituye a Newsreader en toda la web para revisión visual antes del bloque 1. Inter y Playfair Display se conservan. Esta prueba prevalece temporalmente sobre la elección anterior de Newsreader; pendiente de valoración del usuario.


## Ajuste tipográfico — 29 de septiembre de 2026

Fraunces pasa a peso 400 en el resto de la web. Se conserva exactamente Fraunces Light 300 cursiva en los heroes de Inicio y Cómo funciona. El peso 500 se valorará solo si el usuario lo pide tras revisar el 400.

## Limpieza final — 30 de septiembre de 2026

- Versión castellana declarada cerrada por el usuario. Se conserva el diseño aprobado.
- Referencias corporativas residuales a EIMA actualizadas a Eima Salut en presentación, historias y metadata. La palabra del diccionario «eima» se mantiene.
- Eliminada la plantilla SMTP obsoleta de `.env.example`: no hay consumidor SMTP ni formulario de contacto activo en el proyecto.
- Una sola declaración de carga de Playfair Display, en `app.html`, con los mismos pesos y `display=swap`.
- Teléfono y redes existentes centralizados en `site.js` y reutilizados por componentes y datos estructurados. No se cambian números ni URLs de cuentas externas.
- Sin cambios en producción, hosting, DNS, cuentas externas ni publicación.

## Decisión para la fase de idiomas — 30 de septiembre de 2026

La decisión inicial fue traducir Testimonios y mantener Blog en castellano. La petición posterior del usuario amplía Blog y sus seis entradas a CAT/EN. Esta pasada del bloque 0 no implementó las traducciones; su implementación posterior se registra en [BLOG-I18N.md](BLOG-I18N.md).
