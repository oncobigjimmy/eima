# Ajustes antes de publicar — 5 de octubre de 2026

Esta ronda complementa MOBILE-R2 y sigue local, sin commit, push ni despliegue.

- Los tres subtítulos de las 3R pasan a 13,5 px hasta 767 px. En las mediciones ES a 320, 360, 384 y 430 px quedan en una línea; «el impacto de los efectos secundarios» mide 236,69 px. Tamaño de escritorio: 17 px, sin cambios de fuente, color ni animación.
- Solo el móvil en la mano del VSL móvil pasa del 20 % al 18 % de ancho (reducción del 10 %). Se conservan su posición, giro, foto, textos, logo, botón y proporción del VSL. En escritorio permanece al 19 %.
- Scrollbar: pulgar #233F4E, carril #F8F4F0 y flechas #233F4E. Chrome/Edge reciben estilos específicos de sus partes; el indicador móvil conserva un pulgar de 4 px dentro de un carril de 6 px con pequeños indicadores superior/inferior, sin interceptar gestos. Esta especificación sustituye el indicador de la ronda 2.
- Favicon: mismo círculo azul #4083A7 y misma geometría original, con la isla y la E reducidas un 10 %. SVG, PNG, ICO y Apple Touch Icon regenerados; referencias versionadas con eima-b.
- Carga inicial: Mallorca sin círculo, blanca con E azul, sombra oscura y fondo transparente. El relleno azul #4083A7 sube desde abajo y convierte la E en blanca por la misma máscara. Se espera a documento/fuentes y termina con un fundido. No bloquea la interacción ni representa un porcentaje de bytes. Se muestra una vez por carga completa, sin repetirse al navegar dentro de la aplicación. Límite de salida ante recursos pendientes; fallback CSS si falla JavaScript. Se omite con movimiento reducido.

Referencia visual revisada: vídeo aportado video_2026-10-05_11-06-32.mp4, de 8,50 s. No se incluye el vídeo de referencia en la aplicación ni en la compilación final.

Verificación: check 0 errores/0 avisos, build correcto y diff sin problemas de espacios. Chromium integrado: ES a 320/360/384/430 px, Home CAT/EN a 384 px y ES a 1440 px sin scroll horizontal en las mediciones. Comprobados tamaños de escritorio, color de carril/pulgar y flechas del indicador móvil, carga con desaparición del logo, navegación a Blog y restauración del scroll tras cerrar el menú. Archivos ICO 16/32/48 px y PNG 16/32/48/512 px y touch 180 px comprobados. Pendiente POCO F5 en producción después de publicar; otros navegadores no acreditados.
