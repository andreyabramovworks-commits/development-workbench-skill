# Structure and replacement

## Structural choice

For a new application, use these responsibilities as the default:

```text
app/       bootstrap, routing, composition, global configuration
features/  user capabilities; each feature owns its screen, state, and adapters
domain/    business rules, contracts, and invariants shared by capabilities
shared/    genuinely reusable UI primitives and technical infrastructure
```

Create only folders that have an immediate responsibility. A small app may start with `app`, one feature, and a few shared primitives; add `domain` when rules need an owner outside one feature. Put feature-specific models and rules inside that feature until another real consumer needs them. Do not move code to `shared` merely because two files import it; extraction needs a stable responsibility and a reason to change independently.

The dependency direction is `app → features → domain/shared`. `domain` must not import screens or framework entry points. `shared` must not know a feature's business terms. Cross-feature calls go through an explicit public contract or are moved to a common owner; avoid reaching into another feature's internals. Backend modules follow the same ownership: request adapters call application behavior, domain rules own decisions, persistence and external services implement boundaries. Exact folder names may differ in an existing repository, but these responsibilities and dependency checks remain the review lens.

For an existing application, map actual owners first. Move toward this structure when implementing relevant changes or when the present layout causes duplication or coupling. Do not perform a wholesale reorganization just to match the diagram. The important property is one clear owner per behavior.

Before adding a new component, endpoint, hook, service, schema, or style, search for the current owner and all callers. Decide whether the task extends that owner, replaces it, or introduces genuinely new behavior. Draw the path of data and control through the affected files. A new implementation that leaves the old path active is incomplete unless a deliberate compatibility period is documented.

## Replacement sequence

1. Write down the old public contract and the desired behavior. Identify callers, tests, routes, exports, configuration, styles, data fields, and deployment references.
2. Implement the new behavior at the existing owner or behind a stable interface. If a library replaces custom code, adapt the library to the existing contract or intentionally update consumers.
3. Move every caller to the new path. Verify successful, empty, error, permission, and loading states where relevant.
4. Remove the old implementation, dead branches, duplicate state, unused dependency, obsolete CSS, stale tests, and misleading documentation. Search for remaining imports and route references.
5. Run targeted behavior checks plus typecheck/build or equivalent project gates. Review the diff for a second source of truth, accidental behavior changes, and added work on hot paths.

A temporary adapter is acceptable when consumers cannot migrate atomically. Record who still uses it, what triggers removal, and how both paths stay consistent. Do not leave an indefinite `legacy` branch with no owner.

## If layers have already accumulated

Find the authoritative behavior by tracing actual callers and runtime entry points. Compare each duplicate by contract and use, then choose one owner. Migrate callers, preserve needed data with a migration where applicable, remove unused paths, and verify that searches and tests no longer reach the old behavior. Avoid deleting code merely because it looks duplicated: confirm whether it serves a distinct scenario.

For optimization, measure the affected path first. Remove unnecessary work, duplicated requests, broad renders, or redundant persistence before adding caches or infrastructure. Recheck correctness and the original performance signal after each meaningful change.

The optional [boundary checker and replacement audit](workbench-tools.md) help find structural violations and leftover names. Review their findings against the actual dependency graph and runtime behavior.
