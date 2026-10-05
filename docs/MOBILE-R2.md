# Revisión móvil — segunda ronda, 5 de octubre de 2026

Cambios solicitados tras revisar la primera publicación en el POCO F5.

- Menú móvil con fondo #233F4E, enlaces, idiomas y logo blancos. Entrada desde la derecha con dos capas previas de colores EIMA y enlaces escalonados. Referencia: vídeo de 9,98 s aportado por el usuario y menú de spicy4tuna.com. Se conservan navegación, cierre con Escape, bloqueo de fondo y devolución del foco. Movimiento reducido sin transiciones.
- Miniatura de Josué en móvil al 50 % del ancho y alto anteriores, centrada, con proporción 9:14. Tim mantiene su tamaño. Tarjeta de Josué con el contraste del Blog al pasar el ratón o enfocar en escritorio y al entrar en la zona central durante el scroll móvil.
- Barra nativa de desplazamiento #233F4E en escritorio. Indicador lateral de 4 px en móvil, del mismo color, para que Android también lo muestre; la barra nativa móvil se oculta para evitar duplicados. Se conserva el progreso superior existente.
- Los quince textos indicados se marcan para 14 px únicamente hasta 767 px; incluyen sus negritas y equivalentes CAT/EN. El resto de su estilo y los tamaños de escritorio se conservan.
- Metadato fonético y gramatical de «eima»: 15 px en móvil y escritorio.
- Contacto: 8 px adicionales antes de WhatsApp/teléfono/email solo en móvil (40 px en total frente a 32 px de escritorio).

Validación local: svelte-check sin errores ni avisos; build correcto; git diff --check. En el navegador Chromium integrado: las seis páginas principales ES/CAT/EN a 384 px, ES a 320 px y ES a 1440 px sin desbordamiento horizontal en las mediciones. Verificados tamaños computados, herencia de negritas, proporción y ancho de la miniatura, contraste de Josué, apertura del vídeo y cierre/navegación del menú. Capturas y mediciones en outputs de la conversación.

Esta ronda permanece local, sin commit, push ni despliegue. Pendiente la revisión visual en el POCO F5 después de publicarla. No acredita Safari, Firefox, Edge ni los navegadores internos de redes sociales.
