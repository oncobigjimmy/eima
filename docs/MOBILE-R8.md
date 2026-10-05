# Ajuste R8 — 5 de octubre de 2026

El usuario solicita que las leyendas de los vídeos de Josué y Tim vuelvan a una sola línea en móvil y autoriza publicar este ajuste junto con R7 en Hostinger.

Se conserva Fraunces y su color. El tamaño máximo baja de 15 a 14 px; se ajusta a la anchura del vídeo con clamp(11px, 7cqi, 14px) para conservar una sola línea en dispositivos estrechos y el diseño de dos columnas a 681–767 px. Los dos segmentos vuelven a ser inline en móvil. El tamaño del vídeo sigue al 75 % y el escritorio mantiene su tamaño anterior.

Validación: svelte-check sin errores ni avisos y build correcto. Comprobado en navegador local en ES, CAT y EN a 320, 384 y 700 px: ambas leyendas en una sola línea, sin scroll horizontal; 14 px a 384 y aproximadamente 13.69 px a 320. Evidencia: movil-r8-josue.jpg y verificacion-movil-r8.json en outputs del chat.

Publicación autorizada a la rama eima-salut; el estado de despliegue debe verificarse después de subir los cambios.
