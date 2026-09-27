# Migración a EIMA SALUT

| Elemento | Identidad anterior | Destino |
| --- | --- | --- |
| Marca | EIMA Fisioterapia | EIMA SALUT |
| Dominio | `eimafisioterapia.es` | `eimasalut.es` |
| Email | `info@eimafisioterapia.es` | `hola@eimasalut.es` |

## Estado confirmado

- `eimafisioterapia.es` sigue siendo producción y debe permanecer intacta durante la preparación.
- Hostinger está conectado a GitHub y despliega automáticamente `main` del repositorio `oncobigjimmy/eima`.
- Hostinger detecta SvelteKit y utiliza Node 22.x.
- Al iniciar esta migración, el despliegue confirmado y `main` coincidían en el commit `9db18ec`.
- La rama de desarrollo es `eima-salut`; existe en GitHub y tiene seguimiento de `origin/eima-salut`.
- `eimasalut.es` está registrado; todavía no se ha autorizado conectarlo ni publicar la nueva web.

## Objetivo y alcance

El objetivo final es publicar EIMA SALUT en `eimasalut.es` y retirar progresivamente la identidad anterior.

La migración deberá revisar nombre, logos, favicon, dominio, email, títulos y descripciones, canonicals, hreflang, Open Graph y metadatos sociales, schema/JSON-LD, sitemap, robots.txt, RSS, textos legales y cualquier referencia técnica al dominio antiguo. Conservar y comprobar las rutas y redirecciones existentes.

**No hacer todavía la migración de dominio ni tocar producción.** La publicación y la transición del dominio antiguo requieren una petición expresa posterior. Documentar estas decisiones no supone implementarlas.
