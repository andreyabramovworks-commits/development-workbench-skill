# Code review and acceptance

Establish the intended behavior from the request, issue, spec, or prior state. Read the diff and enough surrounding code to understand inputs, callers, effects, and contracts. Review the tests as evidence, including whether they would fail for a broken behavior.

Inspect by risk:

- Correctness: edge cases, errors, async races, state transitions.
- Security and permissions: trust boundaries, access checks, secret handling, untrusted input.
- Data: migrations, constraints, transaction boundaries, compatibility with existing records.
- Interface: accessibility, responsive layout, loading and error states.
- Performance: measured hot paths and avoidable work.
- Maintainability: unnecessary coupling, duplication, and hard to change APIs.

Report actionable findings first, ordered by user impact. Each finding needs a precise location, failure path, and suggested correction. Distinguish a demonstrated bug from a preference. Do not demand a different architecture solely because a source skill prefers one. Mention passing checks and material areas not assessed, without filling the report with praise or style nitpicks.

For acceptance review, compare the implementation against the requested behavior and run the relevant checks where feasible. A green suite is evidence for the covered paths, not a blanket claim that the change is correct.

Source methods: KodMaster discovery versus acceptance review; megastep `code-reviewer`; danielteles `frontend-code-review`. Overlapping checklists were consolidated here.
