# Backend, data, and integrations

Read the service's framework, entry points, dependency injection, schemas, ORM, migrations, and tests before changing it. For each request path, identify input validation, authentication and authorization, domain rules, transaction scope, response shape, and error handling. Keep security decisions on the trusted backend even when the UI hides forbidden actions.

For data changes, check existing rows and defaults, migration ordering, constraints, indexes, and rollback or recovery. Test migrations on disposable data. For query performance, collect a baseline and an execution plan, change one cause at a time, and compare read and write impact. An index is justified by a real query pattern, not by a column's existence.

For jobs and external integrations, inspect idempotency, retries, timeouts, duplicate delivery, eventual consistency, and observability. Protect secrets and tokens according to the project's deployment model. A successful HTTP call does not prove the end-to-end workflow if persistence or UI synchronization follows it.

For Python projects, use the configured Ruff and pytest commands when available; for FastAPI, test observable API behavior with the application's dependency overrides or test client as appropriate. Do not invent a fixed routes/services/models directory structure. Read [verification.md](verification.md) for selecting checks.

Source methods: ghalex FastAPI architecture review; KodMaster database, API, queues, and integration tracks; megastep database optimization. Their exact folder maps and universal latency targets were not adopted.
