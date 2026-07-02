# Tasks: Type Badge Stability and Summary Removal

**Input**: Design documents from `/specs/006-fix-type-badge-shift/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Tests are mandatory for this feature by constitution (search/filter behavior, accessibility feedback, and loading/empty/error state continuity).

**Organization**: Tasks are grouped by user story so each story can be implemented and tested independently.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare shared scaffolding for summary-removal and layout-stability validation.

- [X] T001 Add badge-footprint query helpers for dimension/layout checks in tests/component/helpers/pokemonTableQueries.ts
- [X] T002 [P] Add filter-panel summary query helper to assert summary absence in tests/component/helpers/pokemonTableQueries.ts
- [X] T003 [P] Add CSS variable tokens for stable selected-state ring/marker spacing in src/app/app.css

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared prerequisites all stories depend on.

**CRITICAL**: No user story work should begin until this phase completes.

- [X] T004 Remove selected-count prop contract from type panel interface in src/components/TypeFilterPanel.tsx
- [X] T005 [P] Update app-level type panel wiring to stop passing selected-count state in src/App.tsx
- [X] T006 [P] Normalize selected badge base/selected class primitives for footprint-invariant styles in src/App.css
- [X] T007 Add baseline contract assertions for removed summary and stable selected badge semantics in tests/contract/pokemon-table-ui.contract.test.tsx

**Checkpoint**: Shared foundations complete; user stories can proceed.

---

## Phase 3: User Story 1 - Remove Selected Count Indicator (Priority: P1) 🎯 MVP

**Goal**: Remove `Selected: N` from the filter panel for all toggle states.

**Independent Test**: With zero, one, and many selected types, no `Selected:` text is rendered anywhere in filter controls.

### Tests for User Story 1

- [X] T008 [P] [US1] Add component assertions that selected summary text is absent at initial render in tests/component/filter-controls.test.tsx
- [X] T009 [P] [US1] Add component assertions that selected summary text remains absent after multi-toggle flows in tests/component/filter-controls-table.test.tsx
- [X] T010 [US1] Add clear-all regression assertion that summary text does not reappear after reset in tests/component/clear-filters.test.tsx

### Implementation for User Story 1

- [X] T011 [P] [US1] Remove selected summary markup and related aria-describedby dependency from type panel rendering in src/components/TypeFilterPanel.tsx
- [X] T012 [P] [US1] Remove selected summary styling rules from global app stylesheet in src/App.css
- [X] T013 [US1] Remove unused selected summary token declaration and references in src/app/app.css
- [X] T014 [US1] Update component test helpers and call sites that previously queried selected summary text in tests/component/helpers/pokemonTableQueries.ts

**Checkpoint**: Selected-count summary is fully removed and independently verifiable.

---

## Phase 4: User Story 2 - Stable Badge Layout During Selection (Priority: P1)

**Goal**: Keep selected and unselected badges footprint-invariant so toggles do not move neighboring controls.

**Independent Test**: Toggling any badge repeatedly preserves chip dimensions and neighboring badge positions.

### Tests for User Story 2

- [X] T015 [P] [US2] Add dimension invariance assertions for selected vs unselected badges using bounding rect checks in tests/component/filter-controls.test.tsx
- [X] T016 [P] [US2] Add repeated-toggle layout-order/position stability assertions for adjacent badges in tests/component/filter-controls-table.test.tsx
- [X] T017 [US2] Add mobile wrapped-row stability assertions for badge toggles in tests/component/pokemon-table-responsive.test.tsx

### Implementation for User Story 2

- [X] T018 [P] [US2] Implement reserved marker slot rendering for both selected and unselected badges in src/components/TypeFilterPanel.tsx
- [X] T019 [P] [US2] Refactor selected ring styling to non-footprint-changing outline/overlay approach in src/App.css
- [X] T020 [US2] Ensure selected/unselected badge padding, border width, and marker slot sizing are invariant in src/App.css
- [X] T021 [US2] Preserve visual selected clarity while preventing chip growth under multi-row wrap conditions in src/components/TypeFilterPanel.tsx

**Checkpoint**: Badge layout remains stable under normal and mobile-wrapped toggle scenarios.

---

## Phase 5: User Story 3 - Preserve Existing Filter Behavior and Accessibility (Priority: P2)

**Goal**: Keep semantics, keyboard operability, no-refresh behavior, status states, and background stability unchanged.

**Independent Test**: Existing type-filter and keyboard flows pass without behavior regressions while summary remains removed and chip layout stays stable.

### Tests for User Story 3

- [X] T022 [P] [US3] Extend filtering contract tests to confirm unchanged OR semantics after summary/layout changes in tests/contract/filtering-contract.test.ts
- [X] T023 [P] [US3] Add keyboard accessibility assertions for perceivable selected-state feedback without summary text in tests/component/pokemon-table-accessibility.test.tsx
- [X] T024 [P] [US3] Add deterministic no-refresh location assertions during repeated toggles in tests/component/filter-controls-table.test.tsx
- [X] T025 [P] [US3] Add status-state continuity assertions while toggling types (loading/empty/validation/error unaffected) in tests/component/status-states.test.tsx
- [X] T026 [US3] Add background stability regression assertions tied to toggle flows in tests/component/status-states-dark-table.test.tsx

### Implementation for User Story 3

- [X] T027 [US3] Preserve aria-pressed and keyboard activation behavior while removing summary associations in src/components/TypeFilterPanel.tsx
- [X] T028 [US3] Ensure filter hook behavior remains unchanged and summary removal does not alter selection logic in src/app/usePokemonFilters.ts
- [X] T029 [US3] Update contract fixture expectations for type panel summary removal and selected badge semantics in tests/contract/pokemon-table-ui.contract.test.tsx

**Checkpoint**: Behavior, accessibility, and UX-state continuity are independently validated with no regressions.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final cross-story validation and quality gates.

- [X] T030 [P] Re-run filter + table performance benchmark budget checks after badge stability refinements in tests/performance/filter-table-performance.bench.ts
- [X] T031 [P] Refresh table/control snapshot expectations impacted by chip markup and style changes in tests/component/pokemon-table.snapshot.test.tsx
- [X] T032 [P] Run full quickstart scenario validation and record pass evidence in specs/006-fix-type-badge-shift/quickstart.md
- [X] T033 Run repository quality gates (test, lint, typecheck) and document final verification notes in specs/006-fix-type-badge-shift/plan.md

---

## Dependencies & Execution Order

### Phase Dependencies

- Phase 1 (Setup): no dependencies.
- Phase 2 (Foundational): depends on Phase 1 and blocks all user stories.
- Phase 3 (US1): depends on Phase 2.
- Phase 4 (US2): depends on Phase 2 and can run in parallel with US1 once foundational updates are merged.
- Phase 5 (US3): depends on Phase 2 and should run after US1/US2 behavior changes are in place for regression validation.
- Phase 6 (Polish): depends on all targeted stories being complete.

### User Story Dependencies

- US1 (P1): independent once Foundational is complete.
- US2 (P1): independent once Foundational is complete; validates visual stability improvements.
- US3 (P2): depends on completed US1/US2 deltas to verify no regressions.

### Within Each User Story

- Write/adjust tests first and confirm they fail for expected new behavior.
- Implement component/style changes while preserving filter semantics.
- Re-run story-specific tests before marking story complete.

---

## Parallel Execution Examples

### User Story 1

- Run in parallel: T008 and T009
- Run in parallel: T011 and T012

### User Story 2

- Run in parallel: T015 and T016
- Run in parallel: T018 and T019

### User Story 3

- Run in parallel: T022 and T023
- Run in parallel: T024 and T025

---

## Implementation Strategy

### MVP First (US1 Only)

1. Complete Phase 1 and Phase 2.
2. Deliver Phase 3 (US1) with full selected-summary removal.
3. Validate US1 independently before expanding scope.

### Incremental Delivery

1. Ship US1 summary-removal refinements.
2. Add US2 footprint/layout stability hardening.
3. Add US3 non-regression/accessibility/UX continuity checks.
4. Complete Polish phase with benchmark and full-gate verification.

### Parallel Team Strategy

1. Complete setup/foundational work jointly.
2. Assign parallel tracks: summary removal (US1), layout stability (US2), regression hardening (US3).
3. Merge each story only after independent criteria and mandatory tests pass.
