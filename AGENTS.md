# Contexto y reglas de trabajo

Estamos migrando EIMA Fisioterapia a **EIMA SALUT**. Leer antes de trabajar:

- [Especificación consolidada del rediseño](docs/REDESIGN-SPEC.md) — fuente de verdad; prevalece sobre decisiones anteriores de diseño, copy y SEO.
- [Marca](docs/BRAND.md)
- [Decisiones de la web](docs/WEBSITE.md)
- [Migración y producción](docs/MIGRATION.md)

## Ramas y producción

- El trabajo normal se realiza exclusivamente en `eima-salut`. Comprobar la rama y el estado de Git antes de editar o publicar cambios.
- `main` es **PRODUCCIÓN**: Hostinger la despliega automáticamente. No modificarla, hacer push a ella ni fusionar cambios en ella salvo orden expresa.
- No cambiar Hostinger, DNS, dominios, configuración de producción ni realizar despliegues sin una petición expresa.
- Un push autorizado de desarrollo debe dirigirse únicamente a `eima-salut`.

## Alcance y autonomía

- Evolucionar la web actual mediante cambios pequeños, revisables y reversibles.
- Antes de eliminar funcionalidades, componentes, animaciones o contenido, comprobar que su eliminación se ha pedido explícitamente y entender cómo funcionan.
- No inventar servicios, profesionales ni prestaciones que EIMA todavía no ofrece.
- Los documentos distinguen decisiones para futuras tareas de cambios ya implementados. Su existencia no autoriza a ejecutar todos los cambios pendientes: seguir el alcance de cada petición.
- Resolver autónomamente problemas técnicos locales normales. Detenerse si el siguiente paso implica acciones destructivas, pérdida de datos, `main`, producción, dominios, DNS o despliegues sin autorización expresa que cubra esa acción.
- Ejecutar las comprobaciones y/o el build adecuados cuando sea razonable antes de dar una modificación por terminada; indicar qué se verificó y cualquier limitación.
