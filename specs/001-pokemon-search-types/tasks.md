# Tasks: First-Gen Pokemon Search

**Input**: Design documents from `/specs/001-pokemon-search-types/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are required by the project constitution for search/filter logic and loading, empty, and error states.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize Vite + React + TypeScript project and test tooling with minimal dependencies.

- [X] T001 Initialize Vite React TypeScript app scaffold in package.json, tsconfig.json, vite.config.ts, src/main.tsx, and src/App.tsx
- [X] T002 Configure minimal dependency policy and scripts in package.json
- [X] T003 [P] Configure Vitest + React Testing Library setup in vitest.config.ts and tests/setup.ts
- [X] T004 [P] Create planned project folders in src/data/.gitkeep, src/domain/models/.gitkeep, src/domain/filters/.gitkeep, src/services/.gitkeep, src/components/.gitkeep, src/app/.gitkeep, tests/unit/.gitkeep, tests/component/.gitkeep, and tests/contract/.gitkeep

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Build shared data/domain/filtering foundations required by all user stories.

**⚠️ CRITICAL**: No user story work should begin until this phase is complete.

- [X] T005 Add bundled first-generation dataset in src/data/pokemon-gen1.json
- [X] T006 Create core domain models in src/domain/models/pokemon.ts, src/domain/models/searchCriteria.ts, and src/domain/models/filterResultState.ts
- [X] T007 [P] Implement local data repository service in src/services/pokemonRepository.ts
- [X] T008 [P] Implement filtering engine skeleton in src/domain/filters/filterPokemon.ts and src/domain/filters/parsePokedexFilter.ts
- [X] T009 Create shared filter state hook in src/app/usePokemonFilters.ts
- [X] T010 Add app-level shared style foundation in src/app/app.css

**Checkpoint**: Foundation ready - user story implementation can now begin.

---

## Phase 3: User Story 1 - Search by Name (Priority: P1) 🎯 MVP

**Goal**: Let users find first-generation Pokemon quickly using case-insensitive partial name search.

**Independent Test**: Enter partial name queries and verify only matching Pokemon are shown; clear query and verify full #001-#151 list returns.

### Tests for User Story 1

- [X] T011 [P] [US1] Add unit tests for case-insensitive partial name matching in tests/unit/filterPokemon.name.test.ts
- [X] T012 [US1] Add component test for search input behavior and list updates in tests/component/search-by-name.test.tsx

### Implementation for User Story 1

- [X] T013 [US1] Implement name-query filtering logic in src/domain/filters/filterPokemon.ts
- [X] T014 [P] [US1] Build search input UI in src/components/SearchBar.tsx
- [X] T015 [US1] Build Pokemon result list UI showing Pokemon name, pokedex number, and type information in src/components/PokemonList.tsx
- [X] T016 [US1] Wire name-search flow in src/app/usePokemonFilters.ts and src/App.tsx
- [X] T036 [US1] Add component test for clear-all reset behavior in tests/component/clear-filters.test.tsx
- [X] T037 [US1] Implement clear-all control and reset logic in src/components/FilterActions.tsx, src/app/usePokemonFilters.ts, and src/App.tsx
- [X] T038 [US1] Add component test asserting name, pokedex number, and type rendering in tests/component/pokemon-list-fields.test.tsx

**Checkpoint**: User Story 1 is independently functional and testable.

---

## Phase 4: User Story 2 - Filter by Types and Pokedex Number (Priority: P2)

**Goal**: Let users narrow results by one or more types (OR semantics) and by pokedex exact/range filters.

**Independent Test**: Select one or more types and apply valid pokedex exact/range input; verify results match OR type semantics plus valid number constraints.

### Tests for User Story 2

- [X] T017 [P] [US2] Add unit tests for type OR semantics in tests/unit/filterPokemon.types.test.ts
- [X] T018 [P] [US2] Add unit tests for pokedex exact/range parsing and validation in tests/unit/parsePokedexFilter.test.ts
- [X] T019 [US2] Add component tests for type and pokedex controls in tests/component/filter-controls.test.tsx

### Implementation for User Story 2

- [X] T020 [P] [US2] Implement type filter UI in src/components/TypeFilterPanel.tsx
- [X] T021 [P] [US2] Implement pokedex filter input UI in src/components/PokedexFilterInput.tsx
- [X] T022 [US2] Implement validated pokedex parsing logic in src/domain/filters/parsePokedexFilter.ts
- [X] T023 [US2] Extend filtering engine for type OR + pokedex exact/range behavior in src/domain/filters/filterPokemon.ts
- [X] T024 [US2] Integrate type and pokedex criteria in src/app/usePokemonFilters.ts and src/App.tsx

**Checkpoint**: User Stories 1 and 2 both work independently.

---

## Phase 5: User Story 3 - Combined Feedback States (Priority: P3)

**Goal**: Provide clear no-results, loading, error, and validation feedback during combined filtering.

**Independent Test**: Trigger empty, invalid input, and simulated load-failure paths and verify clear feedback while preserving valid filters.

### Tests for User Story 3

- [X] T025 [P] [US3] Add component tests for loading, empty, error, and validation states in tests/component/status-states.test.tsx
- [X] T026 [US3] Add contract tests from filtering contract scenarios in tests/contract/filtering-contract.test.ts

### Implementation for User Story 3

- [X] T027 [P] [US3] Implement feedback component for loading/empty/error/validation in src/components/StatusMessage.tsx
- [X] T028 [US3] Implement no-results and validation rendering in src/App.tsx
- [X] T029 [US3] Implement repository load-error propagation in src/services/pokemonRepository.ts and src/app/usePokemonFilters.ts
- [X] T030 [US3] Add accessible status announcements for state transitions in src/components/StatusMessage.tsx

**Checkpoint**: All user stories are independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Hardening, optimization, and final verification across stories.

- [X] T031 [P] Add regression tests for edge cases in tests/unit/filterPokemon.edge.test.ts and tests/component/pokedex-validation.test.tsx
- [X] T032 [P] Optimize filter recomputation and rendering paths in src/app/usePokemonFilters.ts and src/App.tsx
- [X] T033 [P] Final accessibility pass for filter controls in src/components/SearchBar.tsx, src/components/TypeFilterPanel.tsx, and src/components/PokedexFilterInput.tsx
- [X] T034 [P] Align quickstart validation steps with implemented scripts in specs/001-pokemon-search-types/quickstart.md
- [X] T035 Run full validation commands and capture final verification notes in specs/001-pokemon-search-types/quickstart.md
- [X] T039 [P] Add filter performance benchmark harness and assertions for p95 <= 100ms in tests/performance/filter-performance.bench.ts
- [X] T040 Add performance validation run and result capture in specs/001-pokemon-search-types/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies; starts immediately.
- **Phase 2 (Foundational)**: Depends on Phase 1; blocks all user stories.
- **Phase 3+ (User Stories)**: Depend on Phase 2 completion.
- **Phase 6 (Polish)**: Depends on completion of all targeted user stories.

### User Story Dependencies

- **US1 (P1)**: Starts after Phase 2; delivers MVP independently.
- **US2 (P2)**: Starts after Phase 2; can be developed independently but shares integration files (`src/App.tsx`, `src/app/usePokemonFilters.ts`) that require merge coordination.
- **US3 (P3)**: Starts after Phase 2; builds on shared state and UI feedback layers, recommended after US1/US2 integration.

### Within Each User Story

- Write tests first and confirm failure before implementation.
- Implement domain/filter logic before UI integration.
- Integrate in `src/app/usePokemonFilters.ts` and `src/App.tsx` after component/domain changes.
- Validate each story independently at checkpoint.

---

## Parallel Opportunities

- **Setup**: T003 and T004 can run in parallel after T001/T002.
- **Foundational**: T007 and T008 can run in parallel after T005/T006.
- **US1**: T011 and T014 can run in parallel, then converge on T016.
- **US2**: T017 and T018 can run in parallel; T020 and T021 can run in parallel.
- **US3**: T025 and T027 can run in parallel before final integration tasks.
- **Polish**: T031, T032, T033, and T034 can run in parallel.

---

## Parallel Example: User Story 2

```bash
# Parallel tests for US2:
Task: "T017 [US2] type OR semantics tests in tests/unit/filterPokemon.types.test.ts"
Task: "T018 [US2] pokedex parsing tests in tests/unit/parsePokedexFilter.test.ts"

# Parallel UI implementation for US2:
Task: "T020 [US2] type filter UI in src/components/TypeFilterPanel.tsx"
Task: "T021 [US2] pokedex filter UI in src/components/PokedexFilterInput.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 (Setup).
2. Complete Phase 2 (Foundational).
3. Complete Phase 3 (US1).
4. Validate US1 independently as MVP.

### Incremental Delivery

1. Deliver MVP with US1.
2. Add US2 filtering breadth (types + pokedex).
3. Add US3 feedback-state robustness.
4. Finish with polish and full validation.

### Parallel Team Strategy

1. Team aligns on Phase 1 and Phase 2 together.
2. After foundations:
   - Developer A: US1
   - Developer B: US2
   - Developer C: US3 feedback-state groundwork
3. Coordinate merges for shared files (`src/App.tsx`, `src/app/usePokemonFilters.ts`).

---

## Notes

- `[P]` marks tasks safe for parallel execution.
- `[US1]`, `[US2]`, `[US3]` labels maintain traceability to user stories.
- Keep dependency count minimal; justify any additional library in plan/PR notes.
- Use Vite as the default runtime and build tool (`npm run dev`, `npm run build`).
- Maintain constitution compliance checks during implementation and review.
