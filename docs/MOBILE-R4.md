# Historias de Miquel y Jaume — 5 de octubre de 2026

Cambios locales en eima-salut, pendientes de publicar junto con MOBILE-R2 y MOBILE-R3.

- Hasta 767 px: título «Conoce nuestro recorrido» 40 px, nombre 30 px, especialidad 18 px y todos los subtítulos del relato, incluido «Mis inicios», 22 px. Se aplica a ambos perfiles y sus versiones ES/CAT/EN mediante la página compartida.
- Formación: una entrada activa al cruzar el centro de la pantalla, ampliación del texto y del marcador/año, resto atenuado y desenfocado. El grupo abarca toda la cronología, incluso los distintos años.
- Lecturas: tarjeta central azul, letras claras, ampliación de tarjeta y portada, resto atenuado. El clic sigue abriendo la portada y Escape cierra el diálogo.
- Se reutiliza scrollContrast con un selector opcional de antepasado para la formación. Las tarjetas anteriores conservan su agrupación por padre. Un único listener pasivo y un frame compartido; limpieza al cambiar de perfil. Efectos automáticos limitados a móvil. Movimiento reducido conserva el contraste sin ampliaciones.

Verificación: Svelte check 0 errores/0 avisos, build correcto, diff sin errores de espacios. Chromium integrado: ambos perfiles ES a 384 px; Jaume ES y ambos perfiles CAT/EN a 320 px; tamaños calculados 40/30/18/22 px y sin desbordamiento horizontal en las mediciones. Escritorio 1440 px mantiene 60/40/20/25 px y cero elementos con activación automática. Cambio real por scroll de entrada de formación y libro acreditado; ampliación/cierre de portada comprobados. Efectos de ambos perfiles comprobados en ES. CAT/EN comparten markup, acción y CSS. Pendiente verificación en el POCO F5 tras publicar; no se acredita Safari, Firefox ni otros dispositivos reales.

Capturas y mediciones: hol/outputs/movil-r4-recorrido.jpg, movil-r4-miquel.jpg, movil-r4-formacion.jpg, movil-r4-libros.jpg, movil-r4-jaume-libros.jpg y verificacion-movil-r4.json.
