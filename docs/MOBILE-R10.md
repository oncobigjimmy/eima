# Más brillo detrás de las portadas — 5 de octubre de 2026

Se interpreta la referencia del usuario a los libros de «Mi formación» como las portadas de «Mis lecturas», el bloque de libros de los dos perfiles.

El brillo de las portadas activas pasa de un halo azul de 28 px al 45 % a dos halos: 16 px al 65 % para aumentar luminosidad y 42 px al 50 % para extender el brillo. Se conserva la sombra de profundidad y el efecto actual de las tarjetas. Mismo ajuste para hover de escritorio y scroll-active en móvil, compartido por Jaume/Miquel y ES/CAT/EN.

Verificación: svelte-check sin errores ni avisos; diff --check correcto; navegador local a 1388 px con Miquel y a 384 px con Jaume. Confirmado el nuevo box-shadow y activación automática en móvil, sin scroll horizontal. Evidencia en outputs del chat: escritorio-r10-libros.jpg, movil-r10-libros-jaume.jpg y verificacion-r10.json.

Estado: cambio local; no publicado en esta petición.
