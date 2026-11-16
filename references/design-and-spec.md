# Feature and architecture design

Start with a user outcome in one sentence. Inspect the existing workflow before proposing modules. Identify actors, permissions, data ownership, state transitions, failure paths, and external dependencies. Ask the user only about decisions the repository and prior conversation cannot settle; offer a recommended answer with the consequence of each option.

For a cross-layer feature, walk the whole slice in dependency order: persistence and migrations; domain rules and transactions; API contracts and authorization; frontend state and components; loading, empty, error, and success states; operational and test needs. A feature that has no database change can skip that layer. Track how each decision changes downstream contracts.

Write a compact spec when complexity warrants it:

- Problem and success signal from the user's perspective.
- In-scope and out-of-scope behavior.
- Actors and permissions.
- Observable acceptance cases, including denied, invalid, and failure outcomes.
- Data and API changes, migration/rollback considerations if applicable.
- Key tradeoffs, open questions, and verification plan.

Use a full PRD only when the user needs a durable product document or the feature has many unresolved stakeholders and workflows. Do not force a fixed interview count, a mandatory EARS format, or a new file for a small change. Reuse the project's existing spec format if one exists.

Architecture decisions should name the pressure they solve: duplicated logic, unstable contract, coupling, data integrity, or measurable performance. Compare the smallest viable change with broader refactoring; justify added abstractions through actual reuse or complexity hidden behind a stable interface.

For a multi-file implementation, make a short responsibility map before editing: which existing owner changes, which new file earns a distinct responsibility, which old path will be removed, and which check proves the resulting behavior. Keep work units independently understandable and verifiable; avoid a long plan for a small edit.

For a substantial feature, use the [feature decision template](../assets/feature-decision.md) to record that map and the expected states. It is a working aid, not a mandatory document for every change.

Source methods: ghalex `grill-me-technical` and `create-a-prd`; megastep `feature-forge`; KodMaster planning. Their mandatory interview and approval steps were reduced to decisions the task actually needs.
