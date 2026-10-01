# Home — correcciones ronda 2

Aplicado el 29 de septiembre de 2026 en `eima-salut`, solo en la Home castellana. Estas correcciones prevalecen sobre la especificación inicial y la ronda 1 en los puntos modificados.

- VSL: H1 visible en Inter 16 px con énfasis en «programa de ejercicio» y «personas con cáncer en Mallorca»; eliminado el texto de duración. Entrada al scroll con fade y desplazamiento descendente de 30 px en 700 ms.
- Situaciones: introducción en 16 px y primera cita actualizada. Las tarjetas destacan al hover con elevación, atenuación de las otras y resplandor azul. El CTA inferior usa la misma estructura, flechas y estilos de transición que los otros CTA principales de esta Home.
- 3R: nuevo título en una línea en escritorio, texto de Reducir actualizado y espacios iguales a ambos lados de la línea divisoria. Inicial R de 65 px y resto de 40 px en escritorio. Relleno del texto mediante gradiente de #8CD0D6 a #245B7D según el progreso del scroll. Hover sutil en escritorio y estado activo al cruzar la zona central en móvil.
- Ventajas: las cuatro tarjetas conservan altura y contenido; mayor interlineado, con el párrafo centrado verticalmente.
- Cierre: «12 semanas.» sustituye «12 semanas, como mínimo.»
- Las animaciones se desactivan o simplifican con `prefers-reduced-motion`.

El vídeo VSL y sus subtítulos definitivos continúan pendientes. La pequeña barra horizontal de la línea de tiempo en móvil ya existía antes de esta ronda y se reserva para el bloque de responsive / QA.
