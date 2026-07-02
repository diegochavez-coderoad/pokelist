# Quickstart: Validate Badge Spacing Without Check Icon

## Prerequisites

- Node.js and npm installed
- Dependencies installed at repository root

## Setup

1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Open the local Vite URL in desktop and mobile viewport sizes

## Validation Scenarios

### Scenario 1: No check icon in selected badges

1. Open the type filter panel.
2. Toggle one or more badges to selected.
3. Expected outcome:
- Selected badges show no internal check icon.
- White selected overlay/ring remains visible.

### Scenario 2: No odd leading spacing when unselected

1. Ensure all type badges are unselected.
2. Compare label spacing across multiple badges.
3. Expected outcome:
- No odd left indentation appears before type names.
- Label starts are visually consistent and readable.

### Scenario 3: Stable alignment across toggles

1. Toggle a badge on/off repeatedly.
2. Toggle several neighboring badges.
3. Expected outcome:
- Text alignment remains stable and readable.
- No icon placeholder gap appears in unselected state.

### Scenario 4: Behavior and accessibility non-regression

1. Run known type-filter combinations.
2. Toggle badges via keyboard (tab + enter/space).
3. Expected outcome:
- Filter semantics remain unchanged.
- `aria-pressed` remains accurate.
- Selected state remains perceivable without icon.

### Scenario 5: No-refresh and stability checks

1. Toggle badges repeatedly on desktop and mobile widths.
2. Observe URL/navigation and background.
3. Expected outcome:
- No full-page refresh/navigation change occurs.
- Background remains visually stable.

### Scenario 6: Status-state continuity

1. Trigger empty and validation flows.
2. Toggle badges around those flows.
3. Expected outcome:
- Loading, empty, validation, and error messaging behavior remains unchanged.

## Test Commands

- Run tests: `npm test`
- Run lint/type gate: `npm run lint`
- Run strict typecheck: `npm run typecheck`
- Optional performance benchmark: `npx vitest bench tests/performance/filter-table-performance.bench.ts`

## References

- Spec: `specs/007-badge-spacing-no-icon/spec.md`
- Plan: `specs/007-badge-spacing-no-icon/plan.md`
- Data model: `specs/007-badge-spacing-no-icon/data-model.md`
- Contract: `specs/007-badge-spacing-no-icon/contracts/type-badge-no-icon-spacing-contract.md`

## Validation Evidence

- Date: 2026-07-02
- Automated checks:
	- `npm run typecheck` PASS
	- `npm test` PASS (21 files, 55 tests)
	- `npx vitest bench tests/performance/filter-table-performance.bench.ts --run` PASS
- Manual verification summary:
	- Selected badges render without internal check icon.
	- Unselected label leading spacing is clean with no odd indentation artifact.
	- White selected overlay/ring remains clearly perceivable.
	- No-refresh behavior and background stability remain unchanged during toggles.
