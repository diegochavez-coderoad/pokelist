# Implementation Plan: Type Badge Stability and Summary Removal

**Branch**: `006-fix-type-badge-shift` | **Date**: 2026-07-02 | **Spec**: `specs/006-fix-type-badge-shift/spec.md`

**Input**: Feature specification from `/specs/006-fix-type-badge-shift/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Remove the `Selected: N` filter summary and harden type-badge selected styling so
selection state no longer changes badge footprint or causes neighboring controls
to shift. Preserve existing type-filter semantics, accessibility behavior,
responsive readability, no-refresh interactions, and background stability.

## Technical Context

**Language/Version**: TypeScript strict mode, React 19, Vite 8

**Primary Dependencies**: React, React DOM, TypeScript, Vitest, React Testing Library

**Storage**: N/A (in-memory UI state over static local dataset)

**Testing**: Vitest, component tests, contract tests, performance benchmark tests

**Target Platform**: Modern desktop and mobile browsers

**Project Type**: Single-page web application

**Performance Goals**: Keep filter interactions within existing 100ms p95 budget for 151 rows

**Constraints**: Remove selected-count summary UI; preserve filter semantics;
keep keyboard and perceivable selected-state feedback; prevent badge footprint
changes and layout displacement; avoid visual background shifts

**Scale/Scope**: Generation-1 dataset only (#001-#151), one filter panel,
no backend/API changes

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- `Type Safety Gate`: PASS - scope is presentation-focused and remains inside typed UI/domain models.
- `Accessibility Gate`: PASS - keyboard toggles and semantic pressed-state feedback remain required after summary removal.
- `Performance Gate`: PASS - no new data/compute paths; existing 100ms p95 benchmark retained.
- `Architecture Gate`: PASS - rendering changes stay in component/style layer; filter rules remain in domain filters.
- `Testing Gate`: PASS - plan includes regression tests for semantics, no-refresh behavior, UX states, and layout/background stability.

## Project Structure

### Documentation (this feature)

```text
specs/006-fix-type-badge-shift/
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

**Structure Decision**: Keep the existing single-project frontend layout.
Apply summary removal and badge-stability styling in component/style files,
while preserving filtering semantics through existing app/domain modules.

## Phase 0 Output

- Research output: `specs/006-fix-type-badge-shift/research.md`
- Clarification status: all technical context fields resolved; no `NEEDS CLARIFICATION` remaining.

## Phase 1 Output

- Data model output: `specs/006-fix-type-badge-shift/data-model.md`
- Contract output: `specs/006-fix-type-badge-shift/contracts/type-badge-stability-ui-contract.md`
- Quickstart output: `specs/006-fix-type-badge-shift/quickstart.md`
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

## Implementation Verification Notes (2026-07-02)

- Removed selected-count summary from type filter panel and dependent props/selectors.
- Implemented footprint-invariant selected badge behavior using stable marker slot and non-growth selected outline treatment.
- Preserved filter semantics and keyboard operability (`aria-pressed`, button toggles, no full-page refresh).
- Updated contract/component tests for summary removal, layout stability, no-refresh checks, and status/background continuity.
- Final quality gates:
	- `npm test`: PASS (21 files, 55 tests)
	- `npm run lint`: PASS
	- `npm run typecheck`: PASS
	- `npx vitest bench --run tests/performance/filter-table-performance.bench.ts`: completed in single-run mode.
