# Working in an existing application

Use this when an application has overlapping implementations, large mixed-purpose modules, uncertain permissions, legacy adapters, or unreliable local startup. Apply the checks to the affected area; expand only when shared callers or risk require it. Existing working behavior and project instructions are the baseline.

## Map before changing

For the user action being changed, record its runtime entry point and trace screen or client, request, authentication and authorization, application rule, persistence, external integration, and response. Identify the file that owns the behavior and all active callers. Search for another route, component, state store, hook, helper, style, or legacy path that implements the same contract. Similar names alone do not prove duplication: compare actual callers and outcomes.

When the owner is unclear, make a small ownership map for the affected feature: behavior, current owner, public contract, callers, data source, tests, and old path to retire. A large file is a signal to inspect mixed responsibilities, not proof that it must be split. Split along user capabilities or stable responsibilities when it makes changes safer; avoid extracting wrappers that merely move lines without reducing coupling.

## Prevent another layer of code

Before adding a component, endpoint, permission check, data cache, or compatibility adapter, decide whether it extends the current owner, replaces an old one, or serves a distinct scenario. Keep one authoritative source for business rules and mutable state. If a replacement is chosen, list affected callers, routes, imports, configuration, styles, tests, and data. Migrate them, remove the superseded path, then search for references. Keep an adapter only for a named active consumer and state when it can be removed.

For shared behavior, check dependency direction and contracts rather than forcing a folder rename. Avoid putting feature-specific business rules into generic `shared` code. Compare a candidate library with existing dependencies and design decisions before introducing another UI or state system. Reuse a library only after checking its integration cost and relevant behavior.

## Guard access and data

If the feature has roles or ownership rules, write a compact operation-by-role matrix from the project's actual policy. Check both the UI affordance and direct server request; the server is authoritative. Include at least the role boundary affected by the change, a denied action, and confirmation that denial did not mutate data. Trace identity mapping from the external provider to the local effective role where relevant. Keep secrets on trusted boundaries.

For schema or persisted-data changes, use the project's migration mechanism, inspect existing rows and defaults, and test on disposable data. For external integrations, check failure, retry, and duplicate delivery when the changed path can encounter them.

## Verify without breaking working paths

Establish a baseline before editing: how to start locally, current relevant tests or build, and one observable success and failure path. If local startup relies on production-only paths, secrets, or services, identify the dependency and make a safe local route only when that is within scope. Do not infer production behavior from a local-only shortcut.

After editing, verify the changed path plus callers sharing the contract. Prefer focused API and component checks, adding a browser journey when several layers interact. Test success, denied access, and any relevant loading, empty, or error state. Run project-required build and release gates before publication; if a gate cannot run, say so. Review the final diff for duplicated owners, dead branches, stale styles, unused dependencies, unrelated changes, and migrations. Run checks against the final files, not an earlier edit.

When you discover a material defect outside the immediate patch, report its concrete location, impact, and confidence. Fix it if authorized and safe within the current task; otherwise leave an actionable follow-up. Never promise that no unrelated behavior can break: state what was checked and what remains unverified.
