# Home — correcciones ronda 3 y contraste sobre imagen

Aplicado el 29 de septiembre de 2026 en `eima-salut`. Esta ronda prevalece sobre las anteriores en los puntos que cambia.

- El reveal del VSL afecta solo al vídeo o su miniatura; título y H1 permanecen estáticos.
- El H1 visible conserva su semántica y pasa a Inter 16 px, peso 300, sin negritas, igual que la introducción de situaciones.
- El hover de las tarjetas A/B/C conserva el aspecto y tarda 175 ms, la mitad de los 350 ms anteriores.
- El gradiente ligado al scroll recorre de arriba abajo todo el texto de cada 3R, de #8CD0D6 a #245B7D. Palabra y subtítulo usan Fraunces; el párrafo usa Inter. `prefers-reduced-motion` mantiene el estado final sin animación.
- El texto sobre fotografía o vídeo recibe una sombra difusa moderada en los heroes de Inicio, Cómo funciona, Quiénes somos, Historia, Contacto, Blog y Testimonios, y en el banner fotográfico reutilizable. La Home usa una variante más ligera por tener ya un overlay más oscuro. Las tarjetas con fotografía de Cómo funciona reciben la sombra solo mientras su imagen aparece al hover. Los overlays existentes permanecen iguales y no se añade sombra a secciones de fondo plano.
