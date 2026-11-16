# Implementation and integration

Before editing, identify the current contract and all directly affected callers. Search for existing components, helpers, endpoints, schemas, and tests. Prefer the current architecture unless the task's evidence supports a change. If the change supersedes behavior, follow [architecture-and-replacement.md](architecture-and-replacement.md) and remove the obsolete path after migration.

Plan the smallest coherent patch across every necessary layer. Keep behavior, data contract, error handling, and permissions aligned. For a schema change, use the project's migration system and consider existing data. For external APIs, handle secrets and tokens on the appropriate trusted side of the boundary.

When reusing a package or copied code, check its exact license and notice requirements, current compatibility, dependencies, theming, accessibility, and maintenance. Compare it with what the project already uses. Preserve notices and adapt imports, styles, and state to the target project. A demo repository is evidence of a pattern, not proof that a component can be pasted unchanged.

Avoid unrelated rewrites. Complete all required code, configuration, migrations, and documentation for the requested behavior. Then run the relevant checks from [verification.md](verification.md). If a check fails, investigate the failure and either fix it or report why it remains.

Source methods: KodMaster reuse and implementation lifecycle; ghalex layer walk; Vercel composition guidance. No fixed dependency, state library, directory layout, or deployment target is imposed.
