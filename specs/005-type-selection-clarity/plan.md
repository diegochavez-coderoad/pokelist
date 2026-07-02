# Implementation Plan: Type Filter Selection Clarity

**Branch**: `005-type-selection-clarity` | **Date**: 2026-07-02 | **Spec**: `specs/005-type-selection-clarity/spec.md`

**Input**: Feature specification from `/specs/005-type-selection-clarity/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Improve type-filter selection clarity by introducing explicit selected-state markers
and stronger visual affordances on selected type buttons, plus a lightweight
`Selected: N` summary near the filter section. Preserve existing filtering semantics,
accessibility behavior, responsive layout, and stable background presentation.

## Technical Context

**Language/Version**: TypeScript strict mode, React 19, Vite 8

**Primary Dependencies**: React, React DOM, TypeScript, Vitest, React Testing Library

**Storage**: N/A (in-memory UI state over static local dataset)

**Testing**: Vitest, component tests, contract tests, performance benchmark tests

**Target Platform**: Modern desktop and mobile browsers

**Project Type**: Single-page web application

**Performance Goals**: Keep filter interactions within existing 100ms p95 budget for 151 rows

**Constraints**: Keep type-filter semantics unchanged; preserve keyboard support;
avoid visual background shifts; maintain readability in compact mobile layouts

**Scale/Scope**: Generation-1 dataset only (#001-#151), single filter panel,
no backend/API changes

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- `Type Safety Gate`: PASS - selected-state and summary changes remain fully typed in existing UI/domain layers.
- `Accessibility Gate`: PASS - design includes explicit keyboard state visibility and semantic pressed state continuity.
- `Performance Gate`: PASS - changes are presentation-focused and preserve existing filter compute path and benchmarks.
- `Architecture Gate`: PASS - selection state remains in app/filter logic, while marker/ring rendering remains in component/style layers.
- `Testing Gate`: PASS - plan includes updates for behavior-critical filter state, selection visibility, and regression checks.

## Project Structure

### Documentation (this feature)

```text
specs/005-type-selection-clarity/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── App.tsx
├── App.css
├── app/
├── components/
├── domain/
└── services/

tests/
├── component/
├── contract/
├── performance/
└── unit/
```

**Structure Decision**: Continue with the existing single-project frontend layout.
Implement selected marker/ring and selected-count UI in component/style layers,
while preserving type-filter semantics through existing app/domain modules.

## Phase 0 Output

- Research output: `specs/005-type-selection-clarity/research.md`
- All clarifications resolved in current spec; no `NEEDS CLARIFICATION` gaps remain.

## Phase 1 Output

- Data model output: `specs/005-type-selection-clarity/data-model.md`
- Contract output: `specs/005-type-selection-clarity/contracts/type-selection-clarity-ui-contract.md`
- Quickstart output: `specs/005-type-selection-clarity/quickstart.md`
- Agent context update: SKIPPED (no update-agent-context script present under `.specify/scripts/`)

### Post-Phase 1 Constitution Re-Check

- `Type Safety Gate`: PASS
- `Accessibility Gate`: PASS
- `Performance Gate`: PASS
- `Architecture Gate`: PASS
- `Testing Gate`: PASS

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
