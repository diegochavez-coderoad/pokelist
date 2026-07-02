# Implementation Plan: Badge Spacing Without Check Icon

**Branch**: `007-badge-spacing-no-icon` | **Date**: 2026-07-02 | **Spec**: `specs/007-badge-spacing-no-icon/spec.md`

**Input**: Feature specification from `/specs/007-badge-spacing-no-icon/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Remove the internal check icon from selected type badges, eliminate odd leading
spacing before unselected type labels, and retain the white selected overlay/ring
as the primary selection indicator. Preserve existing filtering semantics,
keyboard accessibility, no-refresh behavior, responsive readability, and
background stability.

## Technical Context

**Language/Version**: TypeScript strict mode, React 19, Vite 8

**Primary Dependencies**: React, React DOM, TypeScript, Vitest, React Testing Library

**Storage**: N/A (in-memory UI state over static local dataset)

**Testing**: Vitest, component tests, contract tests, performance benchmark tests

**Target Platform**: Modern desktop and mobile browsers

**Project Type**: Single-page web application

**Performance Goals**: Keep filter interactions within existing 100ms p95 budget for 151 rows

**Constraints**: No check icon in badges; keep white selected overlay/ring;
remove odd unselected label indentation; preserve filter semantics, keyboard
affordance, no-refresh behavior, and visual stability

**Scale/Scope**: Generation-1 dataset only (#001-#151), single filter panel,
no backend/API changes

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- `Type Safety Gate`: PASS - changes remain in typed component/style/test layers.
- `Accessibility Gate`: PASS - `aria-pressed`, keyboard toggles, and perceivable selected state are maintained without iconography.
- `Performance Gate`: PASS - no changes to filtering compute path; benchmark coverage retained.
- `Architecture Gate`: PASS - UI presentation updates are isolated from domain filtering logic.
- `Testing Gate`: PASS - plan includes mandatory regression tests for search/filter behavior and UI states.

## Project Structure

### Documentation (this feature)

```text
specs/007-badge-spacing-no-icon/
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

**Structure Decision**: Keep the existing single-project frontend structure.
Implement icon removal and spacing fixes in component/style layers while keeping
filter semantics in existing app/domain modules.

## Phase 0 Output

- Research output: `specs/007-badge-spacing-no-icon/research.md`
- Clarification status: no `NEEDS CLARIFICATION` items remain.

## Phase 1 Output

- Data model output: `specs/007-badge-spacing-no-icon/data-model.md`
- Contract output: `specs/007-badge-spacing-no-icon/contracts/type-badge-no-icon-spacing-contract.md`
- Quickstart output: `specs/007-badge-spacing-no-icon/quickstart.md`
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

## Implementation Verification Notes

- Date: 2026-07-02
- Final gates:
	- `npm run typecheck`: PASS
	- `npm test`: PASS (21 files, 55 tests)
	- `npm run lint`: PASS
	- `npx vitest bench tests/performance/filter-table-performance.bench.ts --run`: PASS
- Outcome summary:
	- Internal check icon removed from type badges.
	- Odd leading spacing before unselected type labels removed.
	- White selected overlay/ring retained as selection indicator.
	- Filtering semantics, accessibility behavior, no-refresh behavior, and background stability preserved.
