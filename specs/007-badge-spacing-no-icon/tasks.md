# Tasks: Badge Spacing Without Check Icon

**Input**: Design documents from `/specs/007-badge-spacing-no-icon/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Tests are mandatory for this feature by constitution (search/filter behavior, accessibility feedback, and loading/empty/error state continuity).

**Organization**: Tasks are grouped by user story so each story can be implemented and tested independently.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare shared scaffolding for no-icon and spacing-alignment validation.

- [X] T001 Add helper queries for chip label alignment and selected-overlay assertions in tests/component/helpers/pokemonTableQueries.ts
- [X] T002 [P] Add helper assertions for absence of check-icon nodes in filter chips in tests/component/helpers/pokemonTableQueries.ts
- [X] T003 [P] Add badge spacing variable tokens for iconless layout tuning in src/app/app.css

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared prerequisites all stories depend on.

**CRITICAL**: No user story work should begin until this phase completes.

- [X] T004 Remove selected-marker icon component export and icon-slot rendering contract from type panel in src/components/TypeFilterPanel.tsx
- [X] T005 [P] Remove legacy icon-slot style hooks from global stylesheet in src/App.css
- [X] T006 [P] Preserve selected white overlay/ring primitives for iconless selected state in src/App.css
- [X] T007 Add baseline contract assertions for icon absence and selected overlay continuity in tests/contract/pokemon-table-ui.contract.test.tsx

**Checkpoint**: Shared foundations complete; user stories can proceed.

---

## Phase 3: User Story 1 - Remove Check Icon From Type Badges (Priority: P1) 🎯 MVP

**Goal**: Remove internal check icon from badges while keeping clear selected overlay/ring.

**Independent Test**: Toggle single and multiple badges and verify selected chips show no check icon while selected state remains perceivable.

### Tests for User Story 1

- [X] T008 [P] [US1] Add component assertions that selected badges render with no check icon text/node in tests/component/filter-controls.test.tsx
- [X] T009 [P] [US1] Add responsive assertions that selected chips remain iconless on mobile in tests/component/pokemon-table-responsive.test.tsx
- [X] T010 [US1] Add clear-all regression assertion ensuring no icon placeholders reappear after reset in tests/component/clear-filters.test.tsx

### Implementation for User Story 1

- [X] T011 [P] [US1] Remove check icon markup from type chip button content in src/components/TypeFilterPanel.tsx
- [X] T012 [P] [US1] Remove selected-marker CSS classes no longer used by icon rendering in src/App.css
- [X] T013 [US1] Ensure selected chips retain white overlay/ring visibility with icon removed in src/App.css
- [X] T014 [US1] Update helper utilities and selector assumptions that referenced marker icon in tests/component/helpers/pokemonTableQueries.ts

**Checkpoint**: Selected chips are iconless and independently verifiable.

---

## Phase 4: User Story 2 - Fix Leading Label Spacing in Unselected Badges (Priority: P1)

**Goal**: Eliminate odd leading spacing before type labels when badges are unselected.

**Independent Test**: With no selected badges and during toggles, labels remain consistently aligned with no indentation artifact.

### Tests for User Story 2

- [X] T015 [P] [US2] Add unselected-label leading-spacing assertions in tests/component/filter-controls.test.tsx
- [X] T016 [P] [US2] Add toggle transition alignment assertions (selected to unselected) in tests/component/filter-controls-table.test.tsx
- [X] T017 [US2] Add wrapped-row label-spacing stability assertions for mobile widths in tests/component/pokemon-table-responsive.test.tsx

### Implementation for User Story 2

- [X] T018 [P] [US2] Remove hidden marker-slot reservation from chip markup in src/components/TypeFilterPanel.tsx
- [X] T019 [P] [US2] Adjust chip gap/padding rules for iconless unselected labels in src/App.css
- [X] T020 [US2] Remove obsolete marker-size and marker-gap variable usage tied to indentation artifact in src/app/app.css
- [X] T021 [US2] Verify stable readable label alignment under multi-toggle and wrapped-row conditions in src/components/TypeFilterPanel.tsx

**Checkpoint**: Unselected labels render without odd leading spacing and alignment stays stable.

---

## Phase 5: User Story 3 - Preserve Selection Clarity and Existing Behavior (Priority: P2)

**Goal**: Keep filtering semantics, keyboard accessibility, no-refresh behavior, and visual stability unchanged.

**Independent Test**: Existing filter and keyboard flows continue to pass with iconless spacing-fixed chips.

### Tests for User Story 3

- [X] T022 [P] [US3] Extend filtering contract regressions to confirm unchanged OR semantics post iconless spacing fix in tests/contract/filtering-contract.test.ts
- [X] T023 [P] [US3] Add keyboard accessibility assertions for perceivable selected state without icon in tests/component/pokemon-table-accessibility.test.tsx
- [X] T024 [P] [US3] Add deterministic no-refresh navigation assertions through repeated toggles in tests/component/filter-controls-table.test.tsx
- [X] T025 [P] [US3] Add status-state continuity assertions while toggling iconless badges in tests/component/status-states.test.tsx
- [X] T026 [US3] Add background stability regression assertions for iconless chip toggles in tests/component/status-states-dark-table.test.tsx

### Implementation for User Story 3

- [X] T027 [US3] Preserve `aria-pressed` semantics and keyboard interaction behavior with iconless chips in src/components/TypeFilterPanel.tsx
- [X] T028 [US3] Ensure selection logic remains unchanged and presentation-only updates do not alter filter behavior in src/app/usePokemonFilters.ts
- [X] T029 [US3] Update contract fixture expectations for iconless selected chips and spacing-aligned labels in tests/contract/pokemon-table-ui.contract.test.tsx

**Checkpoint**: Behavior, accessibility, and stability regressions are prevented.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final cross-story validation and quality gates.

- [X] T030 [P] Re-run filter/table performance budget benchmark after iconless spacing changes in tests/performance/filter-table-performance.bench.ts
- [X] T031 [P] Refresh affected snapshots for control markup/style updates in tests/component/pokemon-table.snapshot.test.tsx
- [X] T032 [P] Execute full quickstart validation scenarios and record evidence in specs/007-badge-spacing-no-icon/quickstart.md
- [X] T033 Run repository quality gates (test, lint, typecheck) and capture final verification notes in specs/007-badge-spacing-no-icon/plan.md

---

## Dependencies & Execution Order

### Phase Dependencies

- Phase 1 (Setup): no dependencies.
- Phase 2 (Foundational): depends on Phase 1 and blocks all user stories.
- Phase 3 (US1): depends on Phase 2.
- Phase 4 (US2): depends on Phase 2 and can run in parallel with US1 once foundational changes land.
- Phase 5 (US3): depends on Phase 2 and should follow US1/US2 implementation for regression coverage.
- Phase 6 (Polish): depends on completion of targeted stories.

### User Story Dependencies

- US1 (P1): independent once Foundational is complete.
- US2 (P1): independent once Foundational is complete; validates spacing/alignment behavior.
- US3 (P2): depends on completed US1 and US2 deltas to verify non-regressions.

### Within Each User Story

- Write and run failing tests first for intended behavior changes.
- Implement component/style updates while preserving filtering logic.
- Re-run story tests and contracts before closing each story.

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
2. Deliver Phase 3 (US1) with iconless selected badges and preserved overlay clarity.
3. Validate US1 independently before expanding scope.

### Incremental Delivery

1. Ship US1 icon removal and selected overlay continuity.
2. Add US2 spacing/alignment stabilization.
3. Add US3 behavior/accessibility/stability non-regressions.
4. Complete Polish phase with benchmark and full-gate validation.

### Parallel Team Strategy

1. Complete setup and foundational tasks together.
2. Split parallel tracks: icon removal (US1), spacing alignment (US2), regression hardening (US3).
3. Merge story-by-story only after independent criteria and mandatory tests pass.
