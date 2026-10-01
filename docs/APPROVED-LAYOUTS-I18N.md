# Diseño aprobado compartido — ES / CA / EN

## Alcance

Inicio, Cómo funciona, Quiénes somos, Historia y Contacto utilizan ahora los mismos componentes, estructura, recursos, estilos y animaciones aprobados en castellano. Testimonios ya estaba unificado. La decisión posterior del usuario amplía también Blog y sus seis entradas a CAT/EN; véase [BLOG-I18N.md](BLOG-I18N.md).

La versión castellana conserva su composición y copy. Se han retirado las ramas de presentación antiguas de CA/EN; las traducciones se incorporan a los componentes compartidos.

## Contenido y recursos

- Inicio: hero, VSL, situaciones ABC, 3R, banners y bloque de ventajas actualizados en CA/EN.
- Quiénes somos: presentación conjunta, diccionario, seis problemas, CTA y cierre con escritura y altura reservada.
- Historia: sin hero antiguo; mismo selector, anclas, formación y lecturas. Nombres completos y textos alineados con las historias castellanas aprobadas.
- Libros: mismas ediciones y portadas autorizadas en todos los idiomas. Se conservan los títulos de los libros publicados, evitando inventar ediciones traducidas.
- Contacto: misma composición de tres líneas y un único párrafo; mismos canales y datos oficiales.
- El play provisional del VSL abre Cómo funciona en el idioma de la página. No se han añadido vídeos, subtítulos ni capturas de la app inexistentes.

## Adaptación necesaria de traducciones

Sin reducir las tipografías aprobadas:

- El título de Quiénes somos permite flujo natural en CA/EN entre 901 y 1199 px, evitando desbordamientos de la traducción.
- Las columnas 3R de CA/EN admiten contracción y salto natural de texto en móvil pequeño.
- Se mantienen saltos editoriales en escritorio donde encajan y flujo responsive en móvil.

## Verificación

- Navegación y DOM de las diez rutas CA/EN en 390, 768 y 1440 px, con fuentes reales cargadas.
- Comprobaciones adicionales en 320, 1024 y 1200 px para textos largos y límites del grid.
- Seis tarjetas: títulos a 17,8 px y cuerpo a 13,3 px en escritorio; dos y tres líneas respectivamente en 1200/1440 px, dimensiones iguales dentro del grid.
- Libros: portadas presentes y tarjetas de igual tamaño; selector y enlaces de perfiles activos.
- Anclas de Jaume/Miquel y cambio de idioma conservando la página.
- Svelte check sin errores ni avisos. Build de producción local y comprobación del diff.
- El build conserva el aviso ya existente sobre `transport` no exportado desde `src/hooks.js`; no se ha introducido ni modificado en esta tarea.
- Sin publicación, despliegue ni cambios en producción.

Las pruebas de esta tarea no sustituyen la futura auditoría SEO ni el QA integral de todas las rutas públicas y servicios externos del roadmap.
