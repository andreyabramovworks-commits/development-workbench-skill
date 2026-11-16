---
name: development-workbench-skill
description: Build, extend, investigate, review, and improve applications using clear boundaries, replacement of obsolete code, repository evidence, and focused verification. Use for new features, bugs, architecture, frontend, backend, data, and UI.
---

# Development Workbench

## Общение с пользователем

Навык можно вызвать как `$development-workbench-skill` и дальше написать задачу обычными словами по-русски. Определи нужный режим сам: создать функцию, найти причину ошибки, исправить, улучшить интерфейс, проверить права или разобрать архитектуру. Не требуй от пользователя названий внутренних методов, файлов и команд. Если задача ясна из проекта, приступай; если не хватает важного выбора, задай один-два коротких вопроса с понятными вариантами и продолжай независимую работу. Перед существенным изменением кратко объясни, что обнаружено и какой путь будет заменён. После работы сообщи, что изменено, что проверено, что осталось непроверенным. Не подменяй согласие на разработку согласием на публикацию или изменение production, если оно не следует из задачи и правил проекта.

Use this skill to create or improve an application. Read project instructions, manifests, relevant code, and available checks before choosing a method. For a new project, establish its constraints and use the default ownership structure in [architecture-and-replacement.md](references/architecture-and-replacement.md). For an existing project, use those responsibilities as a review lens while respecting its working conventions. The user's requested scope controls the work.

## Route by intent

| Intent | Read | Result |
| --- | --- | --- |
| Create a new application or major feature | [creation.md](references/creation.md), [design-and-spec.md](references/design-and-spec.md) | Runnable vertical slice with coherent structure |
| Diagnose a bug or failing workflow | [investigation.md](references/investigation.md) | Cause with evidence, fix when requested, targeted verification |
| Design a feature or architecture change | [design-and-spec.md](references/design-and-spec.md) | Decisions, contracts, acceptance criteria, implementation plan |
| Implement, replace, or refactor | [implementation.md](references/implementation.md), [architecture-and-replacement.md](references/architecture-and-replacement.md) | Integrated change with obsolete path removed and relevant checks |
| Review code or a completed change | [review.md](references/review.md) | Prioritized, reproducible findings and coverage limits |
| Audit a broad application | [investigation.md](references/investigation.md), [review.md](references/review.md) | Scope map, evidence-backed findings, unexamined areas |
| Untangle an existing application or prevent architectural drift | [existing-application.md](references/existing-application.md), [architecture-and-replacement.md](references/architecture-and-replacement.md) | Ownership map, risk-ranked replacements, preserved behavior |
| Improve interface or visual consistency | [interface.md](references/interface.md) | Design direction, component behavior, accessibility and responsive checks |

Read [verification.md](references/verification.md) whenever work changes behavior or claims a fix. For relevant layers, also read [frontend.md](references/frontend.md), [backend-and-data.md](references/backend-and-data.md), [interface.md](references/interface.md), or [operations-and-security.md](references/operations-and-security.md). These files contain the operational details; do not load every file for an unrelated task.

For module boundary checks, removal of obsolete code, a feature decision card, or a React/Vite state preview, use [workbench-tools.md](references/workbench-tools.md). These helpers are optional checks and do not replace project-specific tests or browser inspection.

For any implementation or code review, use the practical [development rules](references/development-rules.md) for the risks relevant to the change. Apply project-specific instructions first.

## Shared rules

1. Establish what the application actually does. Trace the affected path through UI, API, data, jobs, and external services as relevant. A suspected defect remains a hypothesis until observed or supported by code and a reproducible path.
2. Respect the project's own instructions and conventions. Change architecture when a concrete failure, new requirement, or measurable benefit justifies it. A source skill's preferred folder names, framework, or toolchain are not requirements for this project.
3. Match effort to risk. Start with the affected path and direct dependencies. Expand to shared callers, permissions, persistence, concurrency, or deployment when evidence points there. A broad audit requires a repository map and an explicit list of unexamined areas.
4. Prefer existing project code and established libraries over ad hoc reimplementation. Inspect license, version, maintenance, dependencies, accessibility, and integration cost before adopting external code.
5. Verify the user-visible behavior and the affected contract. Use a small, meaningful set of checks first; add broader checks when the change can affect other paths. Never report a passed test, browser run, build, or deployment that did not run.
6. Report findings with file paths or reproducible steps, severity, impact, and confidence. Distinguish observed facts, likely causes, and unverified areas. Summarize changes, verification, and remaining material limits.
7. When replacing behavior, map and migrate its callers, remove obsolete implementations and stale tests, and check that no parallel path remains unintentionally. See [architecture-and-replacement.md](references/architecture-and-replacement.md). Keep a compatibility adapter only when a real consumer still needs it, with a removal condition.
8. In an existing application, identify the owner of affected behavior and inspect nearby duplicate routes, state, permission rules, and adapters before adding another path. If a material conflict or defect appears, explain its impact and evidence; fix it within the authorized scope with regression checks, or report the required follow-up without claiming it is resolved. Use [existing-application.md](references/existing-application.md).

The source analysis and resolved conflicts behind these rules are in [source-matrix.md](references/source-matrix.md). That file is provenance, not an instruction to load the source skills.
