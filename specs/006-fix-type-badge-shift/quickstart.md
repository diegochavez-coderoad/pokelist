# Quickstart: Validate Type Badge Stability and Summary Removal

## Prerequisites

- Node.js and npm installed
- Dependencies installed at repository root

## Setup

1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Open the local Vite URL in desktop and mobile viewport sizes

## Validation Scenarios

### Scenario 1: Selected summary is removed

1. Open the type filter panel.
2. Observe panel with no selected types.
3. Toggle one and then multiple types.
4. Expected outcome:
- No `Selected: N` text appears in any state.

### Scenario 2: Selected badge does not grow

1. Choose a type badge in a row with neighboring badges.
2. Toggle it on and off repeatedly.
3. Expected outcome:
- Badge keeps stable dimensions between selected/unselected states.
- Neighboring badges do not shift due to badge size changes.

### Scenario 3: Wrapped row stability on mobile

1. Switch to mobile viewport.
2. Toggle several badges that force wrapping.
3. Expected outcome:
- Wrapped rows remain readable.
- No unexpected reflow caused by selected badge growth.

### Scenario 4: Behavior and accessibility non-regression

1. Apply known type filter combinations.
2. Toggle badges using keyboard (tab + enter/space).
3. Expected outcome:
- Filter result semantics remain unchanged.
- `aria-pressed` and perceivable selected-state feedback remain correct.

### Scenario 5: No-refresh and visual stability

1. Toggle types repeatedly.
2. Observe URL/navigation and page background.
3. Expected outcome:
- No full-page refresh or navigation change occurs.
- Background presentation remains stable during toggles.

### Scenario 6: Status-state continuity

1. Trigger empty and validation states using known inputs.
2. Toggle type badges while those states can be displayed.
3. Expected outcome:
- Loading, empty, validation, and error messaging behavior remains unchanged.

## Test Commands

- Run test suite: `npm test`
- Run lint/type gate: `npm run lint`
- Run strict typecheck: `npm run typecheck`
- Optional benchmark check: `npx vitest bench tests/performance/filter-table-performance.bench.ts`

## References

- Spec: `specs/006-fix-type-badge-shift/spec.md`
- Plan: `specs/006-fix-type-badge-shift/plan.md`
- Data model: `specs/006-fix-type-badge-shift/data-model.md`
- Contract: `specs/006-fix-type-badge-shift/contracts/type-badge-stability-ui-contract.md`

## Validation Evidence (2026-07-02)

- `npm test`: PASS (21 files, 55 tests)
- `npm run lint`: PASS
- `npm run typecheck`: PASS
- `npx vitest bench --run tests/performance/filter-table-performance.bench.ts`: completed in single-run mode (benchmark summary emitted)
- Manual UX checks covered by automated assertions:
	- No `Selected: N` text rendered across filter flows.
	- Selected badge marker/ring remains clear without footprint growth.
	- No-refresh URL stability checks pass during repeated toggles.
	- Background stability and status-state continuity checks pass.
