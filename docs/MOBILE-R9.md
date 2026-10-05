# Brillo de libros y sombra de texto — 5 de octubre de 2026

Petición: brillo al activar las lecturas de Jaume y Miquel en escritorio y móvil, y sombra suave en los textos blancos de los bloques azules especificados. Publicación autorizada tras completar los ajustes.

- Las tarjetas de lectura conservan su contraste, escala y desenfoque del resto. Se añade un halo azul a la tarjeta y un brillo detrás de la portada, tanto en hover de escritorio como en el estado scroll-active de móvil.
- La variable --eima-blue-text-shadow define una sombra discreta de dos capas: 0 1px 2px #233f4e66 y 0 2px 5px #233f4e26.
- Se aplica al texto de PrimaryCta en hover/focus-visible, incluido el CTA sin sombra exterior del hero; también a los CTA equivalentes del contenido de blog.
- Se aplica al texto pintado sobre azul de Las 3R, a las preguntas frecuentes únicamente cuando aria-expanded=true, al selector del profesional únicamente cuando está activo y a los headers azules Mi formación y Mis lecturas.
- Los componentes compartidos cubren ES, CAT y EN. No se cambia tamaño, fuente o color del texto.

Validación: svelte-check sin errores ni avisos; build correcto; diff --check correcto. Navegador local Chromium a 1388 y 384 px: brillo de lecturas de ambos profesionales, selección activa/inactiva, headers azules, FAQ abierta/cerrada, CTA con foco en azul y texto de Las 3R. Revisión de traducciones de los títulos CAT/EN y confirmación del halo automático de la versión EN; sin desbordamiento horizontal en los perfiles comprobados.

Evidencia en outputs del chat: escritorio-r9-libros-miquel.jpg, movil-r9-libros-jaume.jpg, movil-r9-faq.jpg y verificacion-r9.json. Pendiente verificar publicación y móvil real tras el envío a GitHub.
