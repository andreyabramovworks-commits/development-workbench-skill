# Verification

Choose checks from the change's failure modes, using the project's installed tools and scripts.

| Change | Useful evidence |
| --- | --- |
| Python or API logic | Targeted pytest cases through the real service or FastAPI test client; Ruff lint/format if configured |
| React component | Existing unit/component tests, typecheck and build; inspect render, state, and keyboard behavior |
| Browser workflow | Playwright journey using user-visible roles and assertions; test an important denied or error path |
| Database/query | Migration on a disposable database; constraints and rollback path; query plan and before/after timing for performance work |
| Integration | Contract or sandbox test, token and failure handling, retry/idempotency where relevant |
| Visual/UI | Real browser inspection at relevant widths and states; keyboard and focus check |

Prefer behavior assertions over implementation details. Use deterministic data and isolated state. In Playwright, favor role-based locators and retrying assertions over fixed sleeps. Keep browser tests for critical cross-layer journeys; cover local logic with lower-level tests. When a test is flaky, find the race or shared state rather than simply extending its timeout.

Ruff reports style and static issues; it does not prove API behavior. pytest proves only tested cases. A screenshot does not prove keyboard access or full accessibility. For a fix, try to observe the failure before the patch and the changed outcome after it. Record commands and results accurately. If a tool is unavailable, state the missing check and verify with another meaningful method when possible.

Before saying a change is complete, run the relevant check against the final files and read its exit status and output. A prior run, expected outcome, or successful edit does not establish the final state. For replacement work, also search for callers of the removed path and inspect the final diff. State exactly which behavior was observed and what remains untested.

Primary tool references: [Playwright](https://playwright.dev/docs/intro), [Ruff](https://docs.astral.sh/ruff/), [pytest](https://docs.pytest.org/en/stable/), [FastAPI testing](https://fastapi.tiangolo.com/tutorial/testing/).
