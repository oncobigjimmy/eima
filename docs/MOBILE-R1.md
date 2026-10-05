# Ajustes móviles — 5 de octubre de 2026

Petición basada en capturas del usuario en POCO F5, Chrome, eimasalut.es. Implementación local en eima-salut; no push ni despliegue. Escritorio conservado.

- Tarjeta 01 ES: tres líneas en móvil: «Te dicen que hagas / ejercicio, pero no te / explican cómo». Tamaño adaptable a anchuras pequeñas.
- Quiénes somos ES: «Dos fisioterapeutas. / Una misma forma / de acompañarte.»; indicación bajo foto: «Haz clic en uno de nosotros para / conocer su historia.».
- Heroes Inicio y Cómo funciona: solo bajo 768 px, eliminada la altura mínima de viewport y reducido el padding inferior de 80 a 40 px. El espacio bajo CTA se reduce al menos a la mitad.
- VSL: eliminados los overrides 4:3/1:1 y la posición descentrada del play. Formato 16:9, composición proporcional a escritorio, personas a la derecha, teléfono mayor y algo más a la izquierda, texto proporcional y subtítulo ES en dos líneas.
- 3R: solo tamaño móvil; título en una línea, tres subtítulos con igual tamaño, primer subtítulo ES en una línea. Fuentes y colores conservados.
- Blog, ABC, encaje sí/no y tarjetas 01–06: acción compartida scrollContrast activa la tarjeta más cercana al centro, una por grupo; reproduce colores, imágenes y sombras del hover correspondiente solo bajo 768 px. Fade de entrada conservado. Listeners pasivos, RAF compartido y limpieza al desmontar. Reduced motion elimina transiciones y desplazamientos añadidos.
- Clip horizontal del bloque inicial Quiénes somos en móvil para que el desplazamiento de su fade lateral no genere overflow temporal.

## Evidencia y límites

Comprobación local en navegador Chromium integrado, fuentes cargadas. ES: 320, 384 y 430 px. Build de producción local: Inicio, Cómo funciona, Quiénes somos y Blog en ES/CA/EN a 320 y 1440 px. Sin overflow horizontal en esas comprobaciones. VSL 16:9 y play centrado; gap bajo CTA de 40 px en ambos heroes móviles. ES: H1 tres líneas, hint dos y tarjeta 01 tres en las tres anchuras. Subtítulos ES de las 3R en una línea. Las traducciones largas pueden conservar varias líneas; no se ha reescrito su contenido.

Efectos verificados por scroll, incluyendo activación/desactivación y retorno a escritorio. Consola del recorrido sin errores/avisos. npm run check: 0 errores y 0 warnings. Build correcto; git diff --check correcto.

Capturas e informe de usuario en C:/Users/usuario/Documents/Codex/2026-10-05/hol/outputs. No se ha validado en el teléfono real ni en Safari, Firefox, Edge o navegadores internos. Publicación y validación en POCO F5 pendientes.
