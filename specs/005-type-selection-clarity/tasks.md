# Tasks: Type Filter Selection Clarity

**Input**: Design documents from `/specs/005-type-selection-clarity/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Tests are mandatory for this feature by constitution (search/filter behavior, UX-state transitions, and accessibility feedback).

**Organization**: Tasks are grouped by user story so each story can be implemented and tested independently.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare shared scaffolding for selected-state clarity enhancements.

- [ ] T001 Add selected marker icon utility and exports in src/components/TypeFilterPanel.tsx
- [ ] T002 [P] Add selected-count text token scaffold in src/app/app.css
- [ ] T003 [P] Add test helper support for selected-state queries in tests/component/helpers/pokemonTableQueries.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared prerequisites that all stories depend on.

**CRITICAL**: No user story work should begin until this phase completes.

- [ ] T004 Extend type button view typing for marker/ring flags in src/domain/models/tableRowViewModel.ts
- [ ] T005 [P] Add selected-state style primitives for ring and marker in src/App.css
- [ ] T006 [P] Add accessibility state hooks for type buttons in src/components/TypeFilterPanel.tsx
- [ ] T007 Add baseline contract assertions for selected marker/ring semantics in tests/contract/pokemon-table-ui.contract.test.ts

**Checkpoint**: Shared foundations complete; user stories can proceed.

---

## Phase 3: User Story 1 - Obvious Selected Types (Priority: P1) 🎯 MVP

**Goal**: Make selected type filters instantly recognizable with marker + strong selected ring.

**Independent Test**: Toggle one or many types and verify selected states are obvious at glance and removable on deselect.

### Tests for User Story 1

- [ ] T008 [P] [US1] Add component tests for selected marker visibility in tests/component/filter-controls.test.tsx
- [ ] T009 [P] [US1] Add component tests for strong selected ring class/state in tests/component/filter-controls.test.tsx
- [ ] T010 [US1] Add keyboard-toggle selected visual assertions in tests/component/pokemon-table-accessibility.test.tsx
- [ ] T029 [P] [US1] Add explicit OR-semantics regression assertions for type filtering in tests/contract/filtering-contract.test.ts

### Implementation for User Story 1

- [ ] T011 [P] [US1] Render selected marker icon for active types in src/components/TypeFilterPanel.tsx
- [ ] T012 [P] [US1] Apply stronger selected ring style for active types in src/App.css
- [ ] T013 [US1] Ensure selected/unselected visuals are distinct without subtle-only color shift in src/components/TypeFilterPanel.tsx
- [ ] T014 [US1] Preserve existing type filter OR semantics by avoiding filter-logic changes while applying new selected visuals in src/components/TypeFilterPanel.tsx

**Checkpoint**: Selected-state clarity is independently demonstrable and behavior semantics remain unchanged.

---

## Phase 4: User Story 2 - Selected Count Feedback (Priority: P2)

**Goal**: Provide a lightweight `Selected: N` indicator near type filters with exact real-time updates.

**Independent Test**: Toggle and clear filters and verify count transitions (`0 -> N -> 0`) are always accurate.

### Tests for User Story 2

- [ ] T015 [P] [US2] Add selected-count rendering tests in tests/component/filter-controls-table.test.tsx
- [ ] T016 [P] [US2] Add clear-all reset count regression test in tests/component/clear-filters.test.tsx

### Implementation for User Story 2

- [ ] T017 [P] [US2] Add selected-count summary rendering in src/components/TypeFilterPanel.tsx
- [ ] T018 [US2] Wire selected count from filter state into type panel in src/App.tsx
- [ ] T019 [US2] Ensure clear filters resets selected count to zero in src/app/usePokemonFilters.ts

**Checkpoint**: Selected-count summary works independently and remains synchronized with selected types.

---

## Phase 5: User Story 3 - Stable Visual Presentation (Priority: P3)

**Goal**: Keep background appearance stable during type toggles while preserving desktop/mobile readability.

**Independent Test**: Repeatedly toggle type filters across low/high result counts and verify background remains stable and layout remains readable.

### Tests for User Story 3

- [ ] T020 [P] [US3] Add background stability regression test coverage in tests/component/status-states-dark-table.test.tsx
- [ ] T021 [P] [US3] Add responsive readability checks for selected marker/ring in tests/component/pokemon-table-responsive.test.tsx
- [ ] T030 [P] [US3] Add deterministic background-style assertions for stable viewport-anchored rendering in tests/component/status-states-dark-table.test.tsx

### Implementation for User Story 3

- [ ] T022 [P] [US3] Stabilize background rendering during filter toggles in src/App.css
- [ ] T023 [US3] Verify selected marker/ring spacing readability on mobile in src/App.css
- [ ] T024 [US3] Keep selection updates no-refresh and stable across many toggles in src/components/TypeFilterPanel.tsx

**Checkpoint**: Visual stability and responsive readability are independently validated.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final quality, contract, and performance safeguards across stories.

- [ ] T025 [P] Add contract scenario coverage for `Selected: N` accuracy and selected marker/ring in tests/contract/pokemon-table-ui.contract.test.ts
- [ ] T026 [P] Re-run filter interaction performance benchmark with new selected-state UI in tests/performance/filter-table-performance.bench.ts
- [ ] T027 [P] Verify loading/empty/error state visibility remains unchanged in tests/component/status-states.test.tsx
- [ ] T028 Run end-to-end quickstart validation updates in specs/005-type-selection-clarity/quickstart.md
- [ ] T031 Run SC-001 usability validation script and record evidence (task owner: product/design) in specs/005-type-selection-clarity/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- Phase 1 (Setup): no dependencies.
- Phase 2 (Foundational): depends on Phase 1 and blocks all user stories.
- Phase 3 (US1): depends on Phase 2.
- Phase 4 (US2): depends on Phase 2; can run in parallel with US1 after shared styles/hooks are stable.
- Phase 5 (US3): depends on Phase 2; can run in parallel with US2 but should align with finalized selected visual treatment.
- Phase 6 (Polish): depends on completion of all desired user stories.

### User Story Dependencies

- US1 (P1): independent once Foundational is done.
- US2 (P2): independent once Foundational is done; integrates with US1 selected-state visuals.
- US3 (P3): independent once Foundational is done; validates stability around already-integrated selection UI.

### Within Each User Story

- Write tests first and confirm they fail for expected new behavior.
- Implement component/style updates with semantic accessibility continuity.
- Re-run relevant component/contract/performance tests before closing story.

---

## Parallel Execution Examples

### User Story 1

- Run in parallel: T008 and T009
- Run in parallel: T011 and T012
- Run in parallel: T010 and T029

### User Story 2

- Run in parallel: T015 and T016
- Run in parallel: T017 and T018

### User Story 3

- Run in parallel: T020 and T021
- Run in parallel: T022 and T030

---

## Implementation Strategy

### MVP First (US1 Only)

1. Complete Phase 1 and Phase 2.
2. Deliver Phase 3 (US1) with selected marker + strong ring clarity.
3. Validate independent test criteria before expanding scope.

### Incremental Delivery

1. Ship US1 selected-state clarity.
2. Add US2 selected-count feedback and validate reset/count accuracy.
3. Add US3 visual stability hardening and responsive verification.
4. Finalize with contract/performance/state-regression checks in Phase 6.

### Parallel Team Strategy

1. Complete setup/foundational work together.
2. Assign story tracks in parallel: clarity (US1), count feedback (US2), stability/readability (US3).
3. Merge each story after passing independent criteria and mandatory tests.
