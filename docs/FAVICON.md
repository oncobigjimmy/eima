# Favicon definitivo — opción A

Aprobado por el usuario el 1 de octubre de 2026, después del QA del bloque 6.
La elección final es A: sustituye la aprobación anterior de C después de verla
integrada, porque su E resultaba demasiado grande.
Esta decisión sustituye el favicon provisional descrito en BLOCK-0.md y cierra
la elección del favicon que figuraba pendiente en QA-BLOCK-6.md.

- Círculo y E en azul plano `#4083A7`; silueta de Mallorca blanca.
- E más pequeña y fina, fiel a la propuesta A mostrada al usuario.
- Silueta vectorizada a partir de la referencia aportada por el usuario.
- SVG con exterior transparente, sin dependencias de tipografías.
- PNG de 16, 32, 48 y 512 px y respaldo `favicon.png` de 512 px.
- ICO con entradas PNG de 16, 32 y 48 px.
- Apple Touch Icon de 180 px con fondo blanco opaco para iOS.
- Referencias en `src/app.html` con versión `eima-a` para renovar la caché.

El cambio se aplica localmente a la rama `eima-salut`, sin publicación ni push.

## Imagen para compartir enlaces

El 1 de octubre de 2026, el usuario confirma conservar como definitiva la imagen
ya preparada en `static/og-image.png`: Jaume y Miquel sobre fondo blanco.
Se mantiene el archivo existente y la referencia `socialImage` en `src/lib/site.js`.
Esta aprobación cierra también la elección de imagen social que figuraba pendiente
en QA-BLOCK-6.md. No implica publicación ni despliegue.
