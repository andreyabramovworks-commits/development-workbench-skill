# Investigation and audit

## Focused diagnosis

1. State the failing user action, expected result, actual result, environment, and first known failure. If the report is vague, inspect logs, UI, tests, and entry points before asking for details already in the project.
2. Reproduce safely when possible. Record the request, role, relevant state, and observable failure. If reproduction is unavailable, label the proposed cause as a hypothesis.
3. Trace the path across the layers actually involved: browser state and component → request → authentication and authorization → service → database or queue → response. Follow external integrations and failure handling when present.
4. Compare independent evidence: runtime output, code path, configuration, tests, and data shape. Locate the first divergence from the expected contract. Separate root cause from downstream symptoms.
5. Check nearby variants that could share the cause: other roles, empty/error/loading states, other routes using the same helper, transaction boundaries, and retries. Expand only where the dependency graph or risk justifies it.
6. If fixing is in scope, make the smallest coherent change and use [verification.md](verification.md). If only auditing, produce a prioritized finding with a concrete path to verification.

## Broad audit

Map repository entry points, services, manifests, tests, schema migrations, CI/deployment, and external dependencies first. Choose audit tracks from the actual stack and risk. Record which paths and scenarios were sampled. Do not infer project-wide absence of a defect from a zero-result search or one green test.

Each finding should have: user impact, reproduction or file and line, root-cause evidence, severity, confidence, and recommended fix. Use **confirmed** for observed behavior or a directly proven code path, **likely** for a strong but untested causal chain, and **needs verification** for an open hypothesis. List important areas not assessed.

Source methods: KodMaster's adaptive depth and evidence ledger; ghalex's vertical feature walk. The ghalex path map and mandatory stack rules were intentionally omitted.
