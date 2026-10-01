# Bloque 6 — QA responsive y técnico

1 de octubre de 2026. Repositorio `C:\Users\usuario\Documents\Codex\eima`, rama `eima-salut`. Auditoría y correcciones exclusivamente locales. Se conservan los cambios anteriores. Sin commit, push, publicación, despliegue ni cambios de hosting, dominio o cuentas externas.

## Resultado

Auditoría completada con correcciones técnicas. No equivale a conformidad WCAG AA completa ni a validación de producción: el contraste aprobado necesita una decisión visual y los medios siguen siendo pesados.

| Comprobación                                   | Resultado                                                                                                      |
| ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Matriz responsive                              | 1040 combinaciones únicas: 52 estados de página × 20 anchuras                                                  |
| Overflow global                                | 0 casos después de las correcciones                                                                            |
| Texto cortado detectado por el sondeo de cajas | 0 casos; excluidos elementos `sr-only` y line-clamp aprobado                                                   |
| Recursos, hidratación y consola                | 49 rutas en navegación nueva, sin fallos inesperados del sitio                                                 |
| Interacciones                                  | 48 grupos de pruebas de teclado, foco, overlays, idioma, FAQ, anchors y tooltips                               |
| Hover de cabecera                              | 105 estados en ES/CA/EN y cinco anchuras de escritorio, sin solapes ni desbordamiento                          |
| Accesibilidad automática                       | 92 casos con axe-core 4.10.3: únicamente infracciones de contraste; tres overlays abiertos sin infracciones    |
| Enlaces y anchors internos                     | 51 destinos/variantes adicionales correctos; auditoría SEO: 42 destinos internos y 44 medios locales correctos |
| Destinos externos                              | 18 URLs revisadas; dos editores devuelven 403 al acceso automatizado                                           |
| Rendimiento                                    | 24 muestras locales con LCP, CLS, tareas largas y transferencia observada                                      |
| Tipos                                          | 0 errores y 0 avisos                                                                                           |
| Build                                          | Producción local completada, sin aviso de `transport` ni avisos de Vite/Svelte                                 |
| Formato                                        | 67 archivos con deuda de formato, ya presentes al iniciar esta tarea; sin reformateo global                    |
| SEO tras las correcciones                      | Auditoría reproducible superada: 39 páginas indexables, tres RSS, sitemap, robots, legales y errores           |

## Cobertura

- 21 páginas principales: Inicio, Cómo funciona, Quiénes somos, Historia, Contacto, Testimonios y Blog, en ES/CA/EN.
- 18 artículos: seis por idioma, con slugs localizados.
- Cuatro legales existentes, exclusivamente en castellano: Aviso legal, Términos, Privacidad y Cookies. No se han inventado traducciones ni rutas legales CAT/EN.
- Seis 404: rutas generales y artículos inexistentes en los tres idiomas.
- Tres estados adicionales de Historia con `#jaume`; el perfil Miquel está en la matriz general. Ambos perfiles y sus portadas se comprobaron también por interacción.
- URL malformada: respuesta nativa HTTP 400. Redirecciones `/es`, `/es/contacto` y `/es/blog`: HTTP 301 y parámetros conservados.

Anchuras: **320, 360, 390, 430, 480, 600, 767, 768, 900, 901, 1023, 1024, 1099, 1100, 1199, 1200, 1366, 1440, 1920 y 2560 px**. Incluyen los dos lados de los principales breakpoints. Altura de la matriz: 800 px bajo 600; 1024 px entre 600 y 1099; 900 px desde 1100.

El menú se comprobó además en 320×568, 390×844, 844×390 horizontal y 1024×768. Modales de testimonios y portadas: 320×568, 768×1024 y 1440×900 en los tres idiomas. Hover de cabecera: 1100, 1199, 1200, 1366 y 1440 px.

Se esperó a `document.fonts.ready`. Inter, Fraunces, Playfair Display y Material Symbols se comprobaron cargadas donde se usan. Las capturas completas se tomaron con los reveals asentados; las animaciones, teclado y navegación se validaron aparte, sin sustituirlos por capturas estáticas. Se revisaron visualmente los conjuntos de inicio/footer de todas las rutas y las composiciones compartidas. Las capturas completas permiten revisar el cuerpo restante.

## Errores objetivos corregidos

1. **Inicio ES a 320 px:** el grid 3R imponía una anchura mínima de contenido y llegaba a 356 px. Se permite contracción del grid y las columnas, como ya ocurría en las traducciones; mismos textos, tamaños y colores.
2. **Quiénes somos ES a 901 px:** el título extendía el documento hasta 932 px. Se limita su anchura y se permite salto natural en la franja intermedia; se conserva la composición cuando cabe.
3. **Tarjetas de la línea de tiempo:** `min-width: 0` evita que el contenido imponga un ancho mínimo a la tarjeta flexible en móvil.
4. **Legales y cabecera fija:** el contenido arrancaba a 64 px mientras la cabecera medía 68–77 px. El inicio queda a 96 px para evitar solapamiento. No se cambia el contenido legal.
5. **Idioma del cuerpo legal:** añadido `lang="es"` para lectores de pantalla cuando la navegación conserva la preferencia CAT/EN. El mensaje de error declara también su idioma.
6. **Menú móvil cerrado:** ahora es `inert`; sus enlaces y controles dejan de entrar en el recorrido Tab.
7. **Menú móvil abierto:** foco inicial, recorrido contenido, Escape, devolución de foco, bloqueo del fondo, scroll propio en alturas pequeñas y cierre al navegar, pulsar el logo o pasar a escritorio. Se conserva el control de cierre existente de la cabecera.
8. **Vídeos y portadas en modal:** foco inicial y devolución al control original; fondo inerte, bloqueo de scroll, ciclo de Tab y cierre con Escape. Los guardas de foco cubren la salida con Tab desde el iframe. Se evita que la propagación bloqueada del panel impida Escape.
9. **Selector de idioma:** apertura por teclado, flechas, Home/End, Escape, devolución del foco y cierre al abandonar el selector. Escape de un menú de idioma anidado se gestiona antes de cerrar el overlay exterior.
10. **Nombres accesibles:** el CTA de cabecera incluye su texto visible y WhatsApp; Inicio y el selector usan etiquetas acordes al idioma. Sin cambiar las etiquetas visibles aprobadas.
11. **Movimiento reducido:** heroes sin escritura rotativa ni autoplay; se atienden cambios de preferencia durante la sesión. Scroll sin suavizado, transiciones CSS simplificadas, parallax desactivado y transiciones Svelte de FAQ, perfiles y modal con duración cero. En modo normal se conservan las animaciones aprobadas.
12. **Errores CAT/EN:** mensajes y retorno al inicio localizados; se mantiene el diseño del error y su `noindex`. El mensaje castellano no se modifica.
13. **Carga de Playfair Display:** mismos recursos Google Fonts v40, pesos 400/500/600/700 y `font-display: swap`, servidos localmente con licencia OFL. Se elimina la dependencia de Google Fonts para renderizar el sitio. Inter y Playfair se precargan para reducir el salto durante su carga.
14. **Miniatura de Tim:** los mismos bytes de la miniatura existente de YouTube se sirven en `/testimonials/testimonial-tim.jpg`, compartida por los tres idiomas. No se ha editado ni sustituido la imagen.
15. **Descarga duplicada del vídeo de Cómo funciona:** retirada la llamada redundante a `load()` posterior al autoplay inicial; se conserva `play()`, el archivo, el loop y la composición.

Los favicons y `og-image.png` permanecen intactos. Su elección definitiva sigue pendiente de la persona responsable de la web.

## Navegación y comportamiento

- Header/footer, rutas activas y cambio de idioma revisados en los tres idiomas. Los artículos conservan entrada, query y hash al cambiar de idioma; canonical e idioma HTML se actualizan con navegación cliente.
- FAQ recorrida por Enter y Espacio, con apertura/cierre y enlaces localizados. Anchors de Empenta, FAQ y perfiles válidos.
- Tooltips del footer aparecen por hover y foco de teclado; los seis canales mantienen nombres accesibles.
- WhatsApp: número `34604529731` y mensajes existentes por idioma; teléfono `tel:+34604529731`; correo `mailto:hola@eimasalut.es`. Se comprobó el destino, sin enviar mensajes, llamadas o emails.
- Instagram, Facebook y YouTube responden HTTP 200. Facebook redirige al perfil de Eima Fisioterapia. Esto confirma la resolución del enlace, no titularidad, configuración comercial ni rebranding de las cuentas.
- Los enlaces a DOI `10.1200/JCO.2006.08.2024` y `10.1152/physiol.00019.2013` resuelven al editor, pero este devuelve 403 a la petición automatizada. No se consideran inexistentes ni se sustituyen.
- Ambos endpoints de los vídeos de testimonios responden HTTP 200. La reproducción completa del streaming de YouTube no queda certificada: el navegador automatizado recibe `ERR_CONNECTION_RESET` al cargar el embed en este entorno. El modal, sus controles, destinos, foco y cierre sí están comprobados.
- Los HTTP 404 y el mensaje de consola asociado a solicitar deliberadamente una página inexistente son esperados. No se confunden con errores de hidratación o recursos faltantes del sitio.

## Rendimiento

Resultado de las 24 muestras conservadas: LCP entre **0,220 y 1,720 s**, CLS máximo **0,0764**. Las seis comprobaciones finales del vídeo de Cómo funciona mantienen reproducción normal y no registran dos descargas completas en la ventana observada; los requests de vídeo que todavía están en curso pueden no figurar aún en Resource Timing.

Muestras en Chrome de Windows, contextos nuevos, 390 y 1440 px, build servido en localhost, sin throttling. Observadores nativos de LCP, CLS y tareas largas; captura de Resource Timing tras fuentes cargadas y 5,5 segundos adicionales. Se incluyen las páginas principales, Historia y una entrada, más Inicio/Cómo funciona en CAT/EN.

Tras la precarga, la muestra de Contacto móvil pasa de CLS 0,213 observado durante la investigación a 0,030 en la pasada final. Los valores son muestras de laboratorio con variación entre ejecuciones; no una comparación controlada ni Core Web Vitals de usuarios reales. El fichero de evidencias contiene las mediciones por página.

La transferencia observada de Inicio ronda 4,04 MB antes de contar necesariamente todo el vídeo aún en curso; Contacto ronda 4,55 MB y Blog 2,78 MB. Cómo funciona supera 12 MB incluso después de eliminar la recarga redundante. No se ha recomprimido ningún medio aprobado.

| Recurso existente                                                     | Tamaño aproximado |
| --------------------------------------------------------------------- | ----------------- |
| Imagen de Inicio `Gemini_Generated_Image_8crr28crr28crr28-100.png`    | 1,13 MB           |
| Vídeo Inicio                                                          | 12,08 MB          |
| Imagen Cómo funciona `Gemini_Generated_Image_bhw0rlbhw0rlbhw0-70.png` | 1,57 MB           |
| Vídeo Cómo funciona                                                   | 9,53 MB           |
| Imagen Contacto                                                       | 3,45 MB           |
| Imagen Blog                                                           | 1,62 MB           |

## Decisiones separadas de diseño y contenido

**Contraste: pendiente, sin cambios aplicados.** Axe señala contraste en 42 de los 92 casos, todos del tipo `color-contrast`. El azul aprobado `#4083A7` tiene aproximadamente 3,82:1 sobre crema `#F8F4F0` y 4,18:1 sobre blanco, por debajo de 4,5:1 para texto normal. Afecta a textos 3R, preguntas FAQ, ciertos años de formación y etiquetas de Testimonios. El CTA con texto blanco en hover/focus sobre ese azul tiene la misma relación 4,18:1. Los títulos grandes tienen otro umbral y no deben tratarse como si fueran párrafos. Decidir un azul más oscuro para texto pequeño, un cambio de fondo o un ajuste tipográfico; no alterar automáticamente la paleta ni tamaños aprobados. El contraste sobre fotografía y los estados con sombra requieren además valoración visual contextual.

**Aviso legal en navegación:** la ruta existe y se auditó, pero el footer aprobado solo enlaza Términos, Privacidad y Cookies. Decidir si se añade el cuarto enlace. No se ha cambiado el menú aprobado.

**Legales CAT/EN:** no existen versiones traducidas. Decidir si se encargan; la ausencia de traducciones no se ha ocultado marcándolas como rutas comprobadas.

**Medios y animaciones:** decidir una optimización de las fotografías/vídeos conservando originales y apariencia, y valorar un control visible de pausa para los heroes en modo normal. El soporte de movimiento reducido está corregido; no se han eliminado las animaciones normales aprobadas ni añadido controles visuales nuevos.

**Favicon e imagen para compartir:** pendientes de elección del usuario, conforme a la instrucción más reciente, aunque documentos históricos los describan como cerrados.

## Evidencias y límites

La entrega contiene informe, galería de 156 capturas completas (52 estados × tres anchuras), matriz JSON de 1040 casos, resultados de interacción, accesibilidad, recursos, enlaces y rendimiento. Los datos de consola/recursos se toman de la navegación nueva del último build; no de arrays acumulativos de la pasada de resize. Tres capturas que agotaron el tiempo de espera se repitieron correctamente y se sustituyeron en la matriz final.

Se usó Chrome/Chromium real en Windows con viewports emulados. No se han probado dispositivos físicos, Safari/iOS, VoiceOver, TalkBack ni lectores de pantalla reales. No se ha provocado un fallo 500 del servidor para probar esa rama; sí 404 generales/artículos y 400 malformado. No se certifican INP real, Core Web Vitals de campo, HTTP/TLS del dominio futuro, indexación ni estado de cuentas externas. Esas comprobaciones corresponden al lanzamiento o a una revisión externa posterior.

El bloque 6 queda **auditado y corregido técnicamente en el alcance descrito**, con decisiones explícitas de contraste/medios y las limitaciones anteriores. No marcar accesibilidad AA, rendimiento en conexiones reales ni playback externo como aprobados sin su verificación pendiente. Los bloques 7 y 8 no se han ejecutado.
