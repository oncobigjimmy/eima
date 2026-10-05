# Ajustes R7 — 5 de octubre de 2026

Estado: implementados y comprobados en local. Esta petición no incluye un nuevo despliegue.

- Inicio, móvil: 48 px entre subtítulo y VSL y otros 48 px entre VSL y CTA. El contenedor del CTA usa grid para evitar el espacio de línea de un enlace inline.
- Testimonios: vídeos de Josué y Tim al 75 % de la anchura original en móvil, manteniendo proporción 9:14. Leyendas de dos líneas en ES/CAT/EN y misma fuente Fraunces. Brillo detrás de cada vídeo al activar la tarjeta por scroll en móvil o hover/foco en escritorio; sin borde en el botón del vídeo. Tim recibe el mismo contraste de tarjeta que Josué. Tamaño de escritorio conservado.
- Contacto: dos párrafos semánticos por idioma, con separación de 8 px en móvil. En escritorio se mantienen en línea, con los saltos aprobados.
- Testimonios: se sustituye #F4F8F0 por #F8F4F0 en fondo, CTA y header sólido; se elimina el degradado azul del fondo de sección. Las tarjetas conservan su mezcla blanca y el contraste aprobado.

Comprobaciones: svelte-check sin errores ni avisos; build correcto. Navegador Chromium local a 320 y 384 px, revisión adicional a 700 y 1388 px. ES/CAT/EN: espacios del VSL 48/48, leyendas de dos líneas, Contacto con 8 px y sin desbordamiento horizontal en las rutas comprobadas. Activación automática y brillo de ambos vídeos comprobados a 384 px. Fondo y header computados rgb(248,244,240), sin degradado.

Evidencia guardada en outputs del chat: movil-r7-vsl.jpg, movil-r7-josue.jpg, movil-r7-tim.jpg, movil-r7-contacto.jpg y verificacion-movil-r7.json.

Limitaciones: pendiente publicación y comprobación en el POCO F5 del usuario; esta revisión no acredita Safari, Firefox, Edge ni dispositivos reales.
