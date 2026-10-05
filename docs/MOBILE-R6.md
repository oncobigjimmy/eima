# ABC, carga y 3R — 5 de octubre de 2026

Esta ronda incorpora también los ajustes de MOBILE-R5. Publicación autorizada por el usuario tras las comprobaciones.

- ABC: ampliación centrada a 1,035, sin desplazamiento vertical, con transición de 280 ms. Se conservan colores, borde y sombras. Tarjetas hermanas atenuadas a 0,42 y blur de 1 px, tanto en hover de escritorio como en activación automática móvil. Se conserva el fade de entrada.
- Carga inicial: overlay transparente de pantalla completa con backdrop-filter de 16 px; la isla permanece nítida y conserva el llenado. El desenfoque y el logo salen juntos con el fundido existente. Sigue sin bloquear clics, con salida de seguridad y alternativa de movimiento reducido.
- Los tres subtítulos de las 3R a 14 px en móvil. Hasta 8 px adicionales de anchura aprovechando el padding interior permiten conservar una línea a 320 px sin mover el resto de textos ni salir de la tarjeta. Fuente y color conservados; escritorio mantiene 17 px.
- Nombre accesible del encabezado del programa conservado como frase completa al separar visualmente las líneas.

Verificación en Chromium integrado: ABC móvil a 384 px, espacios superior e inferior de la tarjeta B equivalentes (15,93 px), transform sin traslación y desenfoque/atenuación de A y C. Hover de escritorio a 1440 px con los mismos efectos. 3R ES a 320 px: tres líneas únicas de 19,6 px de alto, primera frase de 245,53 px, completamente dentro de la tarjeta. CAT/EN a 384 px mantienen los 14 px, sin scroll horizontal. Capturada la carga sobre web desenfocada y comprobada su desaparición. Capturas y mediciones en outputs: movil-r6-abc.jpg, escritorio-r6-abc.jpg, movil-r6-carga-blur.jpg y verificacion-movil-r6.json.

Pendiente la revisión en el POCO F5 después de publicar. Las mediciones no acreditan otros navegadores ni todos los dispositivos.
