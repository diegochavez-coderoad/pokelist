<!--
Sync Impact Report
- Version change: N/A (template) -> 1.0.0
- Modified principles:
	- Template Principle 1 -> I. Strict TypeScript By Default
	- Template Principle 2 -> II. Accessibility-First UI
	- Template Principle 3 -> III. Fast Filtering Performance
	- Template Principle 4 -> IV. Clean Component Boundaries
	- Template Principle 5 -> V. Mandatory Test Coverage for Search/Filter and UX States
- Added sections:
	- Technical Standards
	- Delivery Workflow & Quality Gates
- Removed sections:
	- None
- Templates requiring updates:
	- ✅ updated: .specify/templates/plan-template.md
	- ✅ updated: .specify/templates/spec-template.md
	- ✅ updated: .specify/templates/tasks-template.md
	- ✅ checked (no changes required): .github/prompts/speckit.analyze.prompt.md
	- ✅ checked (no changes required): .github/prompts/speckit.checklist.prompt.md
	- ✅ checked (no changes required): .github/prompts/speckit.clarify.prompt.md
	- ✅ checked (no changes required): .github/prompts/speckit.constitution.prompt.md
	- ✅ checked (no changes required): .github/prompts/speckit.converge.prompt.md
	- ✅ checked (no changes required): .github/prompts/speckit.implement.prompt.md
	- ✅ checked (no changes required): .github/prompts/speckit.plan.prompt.md
	- ✅ checked (no changes required): .github/prompts/speckit.specify.prompt.md
	- ✅ checked (no changes required): .github/prompts/speckit.tasks.prompt.md
	- ✅ checked (no changes required): .github/prompts/speckit.taskstoissues.prompt.md
- Follow-up TODOs:
	- None
-->

# Pokelist Constitution

## Core Principles

### I. Strict TypeScript By Default
All application code MUST compile with TypeScript strict mode enabled. Use of
`any`, unchecked type assertions, or implicit `any` is prohibited unless
explicitly justified in-code and approved in review. Data crossing application
boundaries MUST be validated and transformed into typed domain models before use.

Rationale: Strong typing prevents avoidable runtime failures and keeps feature
changes safe as UI and filtering behavior evolve.

### II. Accessibility-First UI
User interfaces MUST be operable by keyboard and use semantic HTML first.
Form controls MUST expose accessible names, focus order MUST be logical, and
result changes (loading, empty, and error feedback) MUST be perceivable to
assistive technologies. Every new UI flow MUST be reviewed against WCAG 2.2 AA
baseline criteria relevant to that flow.

Rationale: Accessibility is a product quality requirement, not a polish step.

### III. Fast Filtering Performance
Name and type filtering interactions MUST feel immediate on supported devices.
For the generation-1 dataset, filter updates MUST complete within 100ms p95 in
local development and must not trigger full-page reloads. Expensive
recomputations MUST be avoided by using derived state and memoization where
needed.

Rationale: Search and filtering are the primary user journey and must remain
responsive.

### IV. Clean Component Boundaries
Presentation, domain logic, and data access MUST be separated.
React components MUST remain focused on rendering and interaction; search/filter
rules MUST live in dedicated, unit-testable modules; data retrieval and mapping
MUST be isolated behind service boundaries. Cross-layer coupling without clear
justification is prohibited.

Rationale: Clear boundaries reduce regressions and make testing and iteration
faster.

### V. Mandatory Test Coverage for Search/Filter and UX States
Automated tests are non-negotiable for:
- Name search and type-filter behavior (including edge cases).
- Loading, empty, and error UI states.
- Any change that modifies filtering logic, result ranking/order, or state
	transitions.

Pull requests MUST fail the quality gate if these tests are missing, outdated,
or flaky.

Rationale: The core feature value depends on reliable filtering and predictable
state feedback.

## Technical Standards

- Primary stack MUST be React + TypeScript.
- Feature scope for this project is generation-1 Pokemon only (#001-#151)
	unless a constitution amendment expands scope.
- Filtering behavior MUST support case-insensitive name matching and explicit,
	documented type-filter semantics (AND/OR) per feature spec.
- User-visible strings for loading, empty, and error states MUST be explicit
	and testable.

## Delivery Workflow & Quality Gates

- `/speckit.specify` MUST define user scenarios for name search and type
	filtering before planning.
- `/speckit.plan` MUST include concrete accessibility checks, performance
	budgets, and test strategy for filtering logic.
- `/speckit.tasks` MUST include tasks for mandatory tests and UX state handling
	before implementation tasks are considered complete.
- `/speckit.implement` output MUST pass linting/type-checking and automated
	tests before merge.

## Governance

This constitution supersedes local conventions when conflicts occur.

Amendment process:
- Propose changes in writing with impacted principles and migration impact.
- Obtain explicit approval from project maintainers.
- Update dependent templates and prompts in the same change.

Versioning policy:
- MAJOR: removal or incompatible redefinition of a principle or governance rule.
- MINOR: new principle/section or materially expanded mandatory guidance.
- PATCH: wording clarifications and non-semantic edits.

Compliance review expectations:
- Every plan and PR MUST include a constitution compliance check.
- Reviewers MUST block merges when MUST-level requirements are unmet.
- Exceptions MUST be documented with rationale and an expiration/review date.

**Version**: 1.0.0 | **Ratified**: 2026-07-02 | **Last Amended**: 2026-07-02
