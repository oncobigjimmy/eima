# Correcciones concretas de metadata

1 de octubre de 2026. Aplicadas las instrucciones del archivo pegado, sin una nueva auditoría general ni publicación.

- Cómo funciona: meta description y OG description corregidas en ES/CA/EN. Titles conservados.
- Contacto: OG title y OG description corregidos en ES/CA/EN. Meta descriptions y SEO titles conservados.
- Testimonios: descripciones meta y OG generales, sin pacientes concretos, en ES/CA/EN.
- Blog: eliminadas las dos copias responsive dentro del único H1. Ahora el texto existe una sola vez, con breaks responsive; misma composición, tipografías y colores. Verificado con fuentes cargadas en escritorio y móvil, los tres idiomas.
- Quimioterapia ES/EN: añadido seoDescription independiente para corregir solo meta y OG, manteniendo descripción visible y H1.
- Antecedentes familiares EN: título corregido en SEO/OG/H1; descripción intacta y slug intacto.
- Legales: los cuatro OG title/description añadidos. Robots explícito noindex, follow. Sitemap excluye las cuatro URLs, robots.txt permite rastrearlas para leer noindex y todas conservan self-canonical.

## Validación limitada

Build de producción correcto; svelte-check sin errores ni warnings. Las 19 rutas afectadas responden HTTP 200. Comparación del inventario anterior y actual de 43 rutas: 36 cambios de campos autorizados, ningún cambio inesperado de titles, descriptions, OG o H1. Sin referencias a domicilio en los titles y descriptions actualmente servidos.

Persisten bloques de metadata antiguos en src/lib/i18n/copy.ts (Home ES/CA/EN) que contienen a domicilio / a domicili / at home. No se sirven: getCopy los sustituye por homeEsReview.meta y translatedHomeReview. Se han dejado intactos por estar fuera de las rutas autorizadas.

Inventario actualizado: [SEO-METADATA.md](SEO-METADATA.md).
