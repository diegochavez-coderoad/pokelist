# Tasks: Type Buttons And Unified Search Input

**Input**: Design documents from `/specs/004-type-buttons-unified-search/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Tests are mandatory for this feature by constitution (search/filter
logic and loading/empty/error state behavior).

**Organization**: Tasks are grouped by user story so each story can be
implemented and validated independently.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create shared scaffolding required across stories.

- [X] T001 Create unified search criteria type scaffold in src/domain/models/searchCriteria.ts
- [X] T002 [P] Create canonical type token definitions in src/domain/models/typeColorToken.ts
- [X] T003 [P] Add shared type-button CSS token scaffold in src/app/app.css

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core shared pieces that all user stories depend on.

**CRITICAL**: Complete this phase before user story implementation.

- [X] T004 Implement canonical type-color lookup utility in src/services/typeColorTokens.ts
- [X] T005 [P] Extend row view typing for type-button presentation in src/domain/models/tableRowViewModel.ts
- [X] T006 [P] Add global type-button style primitives in src/App.css
- [X] T032 Consolidate single source of truth for type-button tokens in src/services/typeColorTokens.ts and remove duplicate token definitions from src/app/app.css
- [X] T007 [P] Add reusable type-button test queries in tests/component/helpers/pokemonTableQueries.ts
- [X] T008 Add canonical palette contract assertions in tests/contract/pokemon-table-ui.contract.test.ts

**Checkpoint**: Shared foundations complete; stories can proceed.

---

## Phase 3: User Story 1 - Unified Search Input (Priority: P1) 🎯 MVP

**Goal**: Replace separate name and pokedex search controls with one input while
preserving existing name and numeric/range semantics.

**Independent Test**: Use one input to complete partial-name, exact-number,
and range queries with validation feedback for invalid numeric/range queries.

### Tests for User Story 1

- [X] T009 [P] [US1] Add unified-input numeric/range parsing cases in tests/unit/parsePokedexFilter.test.ts
- [X] T010 [P] [US1] Add unified input behavior contract scenarios in tests/contract/filtering-contract.test.ts
- [X] T011 [US1] Add component validation flow tests for one input in tests/component/pokedex-validation.test.tsx

### Implementation for User Story 1

- [X] T012 [P] [US1] Refactor search criteria model to single query text in src/domain/models/searchCriteria.ts
- [X] T013 [P] [US1] Update filter orchestration for unified query parsing in src/app/usePokemonFilters.ts
- [X] T014 [US1] Implement single combined search control in src/components/SearchBar.tsx
- [X] T015 [US1] Remove separate pokedex input behavior from component flow in src/components/PokedexFilterInput.tsx
- [X] T016 [US1] Integrate unified search state and handlers in src/App.tsx
- [X] T033 [US1] Remove residual legacy pokedex input wiring and dead paths in src/components/PokedexFilterInput.tsx and src/App.tsx
- [X] T034 [P] [US1] Add explicit no-full-page-refresh verification for unified search updates in tests/component/search-by-name.test.tsx
- [X] T035 [P] [US1] Add explicit no-full-page-refresh verification for type toggle updates in tests/component/filter-controls-table.test.tsx
- [X] T036 [P] [US1] Add generation-1 scope regression assertions in tests/contract/filtering-contract.test.ts
- [X] T037 [US1] Enforce generation-1 boundary in filtering pipeline in src/app/usePokemonFilters.ts
- [X] T017 [US1] Update name search component expectations for unified input in tests/component/search-by-name.test.tsx

**Checkpoint**: Unified input works independently with existing semantics.

---

## Phase 4: User Story 2 - Type Buttons In Filter Controls (Priority: P2)

**Goal**: Render type filter options as canonical type-style buttons while
preserving existing selection semantics.

**Independent Test**: Toggle type filter controls rendered as buttons and
confirm filtering results remain correct and keyboard-operable.

### Tests for User Story 2

- [X] T018 [P] [US2] Add filter control type-button accessibility coverage in tests/component/filter-controls.test.tsx
- [X] T019 [P] [US2] Add filter type-button color/token contract checks in tests/contract/pokemon-table-ui.contract.test.ts

### Implementation for User Story 2

- [X] T020 [P] [US2] Render filter controls as interactive type buttons in src/components/TypeFilterPanel.tsx
- [X] T021 [US2] Apply canonical selected/unselected type-button styles in src/App.css
- [X] T022 [US2] Preserve type filter semantics with button toggles in src/app/usePokemonFilters.ts
- [X] T023 [US2] Update filter-to-table integration assertions for button controls in tests/component/filter-controls-table.test.tsx

**Checkpoint**: Type filter controls are buttonized and independently testable.

---

## Phase 5: User Story 3 - Type Buttons In Table Rows (Priority: P3)

**Goal**: Display row-level Pokemon types with the same canonical type-button
visual language.

**Independent Test**: Verify rows with one/two types render button-style labels
that remain readable and responsive on desktop/mobile.

### Tests for User Story 3

- [X] T024 [P] [US3] Add row type-button rendering checks in tests/component/pokemon-list-fields.test.tsx
- [X] T025 [P] [US3] Add dual-type responsive row layout checks in tests/component/pokemon-table-responsive.test.tsx

### Implementation for User Story 3

- [X] T026 [P] [US3] Map row type-button view data with canonical color tokens in src/services/pokemonTableMapper.ts
- [X] T027 [US3] Render non-interactive type buttons in table rows in src/components/PokemonTable.tsx
- [X] T028 [US3] Verify row type-button accessibility semantics in tests/component/pokemon-table-accessibility.test.tsx

**Checkpoint**: Row type-button presentation is complete and independently testable.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final cross-story quality, performance, and state coverage checks.

- [X] T029 [P] Extend combined search + type filter performance benchmark in tests/performance/filter-table-performance.bench.ts
- [X] T030 [P] Add regression coverage for loading/empty/error continuity in tests/component/status-states.test.tsx
- [X] T031 Validate and document end-to-end feature scenarios in specs/004-type-buttons-unified-search/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- Phase 1 (Setup): No dependencies.
- Phase 2 (Foundational): Depends on Phase 1 and blocks all stories.
- Phase 3 (US1): Depends on Phase 2.
- Phase 4 (US2): Depends on Phase 2; can run in parallel with US1 after shared pieces are stable.
- Phase 5 (US3): Depends on Phase 2; can run in parallel with US2 but is easiest after US2 styles exist.
- Phase 6 (Polish): Depends on completion of all selected user stories.

### User Story Dependencies

- US1 (P1): No dependency on other stories once Foundational is done.
- US2 (P2): No hard dependency on US1 behavior; depends only on foundational shared style/token work.
- US3 (P3): No hard dependency on US1; shares style/token foundations and should align with US2 button visuals.

### Within Each User Story

- Write tests first and confirm they fail for the intended new behavior.
- Implement typed model/logic changes before component wiring.
- Integrate and then re-run relevant contract/component/performance tests.

---

## Parallel Execution Examples

### User Story 1

- Run in parallel: T009 and T010
- Run in parallel: T012 and T013
- Run in parallel: T034, T035, and T036

### User Story 2

- Run in parallel: T018 and T019
- Run in parallel: T020 and T021

### User Story 3

- Run in parallel: T024 and T025
- Run in parallel: T026 and T027

---

## Implementation Strategy

### MVP First (US1)

1. Complete Phase 1 and Phase 2.
2. Deliver Phase 3 (US1) and validate independent test criteria.
3. Demo/deploy MVP with unified input behavior.

### Incremental Delivery

1. Finish foundations once.
2. Ship US1 (core user value), then US2 (filter control UX), then US3 (row readability).
3. Finish with cross-cutting quality and performance checks in Phase 6.

### Team Parallelization

1. Complete Phase 1 and 2 as a shared effort.
2. Assign US1, US2, and US3 to separate developers in parallel.
3. Merge after each story passes its independent criteria and required tests.
