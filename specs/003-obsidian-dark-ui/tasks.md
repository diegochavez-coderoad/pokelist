# Tasks: Obsidian-Style Dark Pokelist UI

**Input**: Design documents from `/specs/003-obsidian-dark-ui/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are mandatory by constitution for search/filter behavior and loading/empty/error UX states.

**Organization**: Tasks are grouped by user story so each story can be implemented and tested independently.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare shared project scaffolding for dark-table UI and sprite assets.

- [X] T001 Create sprite asset folders in src/assets/pokemon/sprites/.gitkeep and src/assets/pokemon/.gitkeep
- [X] T002 Add neutral silhouette placeholder asset in src/assets/pokemon/silhouette.svg
- [X] T003 [P] Add table test helper utilities in tests/component/helpers/pokemonTableQueries.ts
- [X] T004 [P] Add sprite test fixture placeholder in tests/fixtures/sprites/.gitkeep

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Build shared data/model/mapping foundations required by all user stories.

**⚠️ CRITICAL**: No user story implementation should start until this phase is complete.

- [X] T005 Extend Pokemon domain model with spriteSlug in src/domain/models/pokemon.ts
- [X] T006 Create sprite asset mapping model in src/domain/models/spriteAsset.ts
- [X] T007 [P] Add lowercase spriteSlug for all 151 entries in src/data/pokemon-gen1.json
- [X] T008 [P] Enforce spriteSlug validation in repository loader in src/services/pokemonRepository.ts
- [X] T009 Implement sprite resolver service using local assets in src/services/spriteResolver.ts
- [X] T010 Create table row view model definition in src/domain/models/tableRowViewModel.ts
- [X] T011 Implement Pokemon-to-table-row mapper in src/services/pokemonTableMapper.ts
- [X] T012 Update filter hook to expose mapped table rows in src/app/usePokemonFilters.ts

**Checkpoint**: Foundational data and mapping layer complete.

---

## Phase 3: User Story 1 - Scan Pokemon In Dark Dense Table (Priority: P1) 🎯 MVP

**Goal**: Render generation-1 results in an Obsidian-style dark dense table with required row fields.

**Independent Test**: Open unfiltered view and verify table rows render with number, sprite, name, and type in dark-only styling.

### Tests for User Story 1

- [X] T013 [P] [US1] Add component test for table layout and required columns in tests/component/pokemon-table-layout.test.tsx
- [X] T014 [P] [US1] Add component test for balanced row density (28px sprite) in tests/component/pokemon-table-density.test.tsx
- [X] T015 [P] [US1] Add contract test for row composition in tests/contract/pokemon-table-ui.contract.test.ts

### Implementation for User Story 1

- [X] T016 [P] [US1] Create sprite cell component in src/components/PokemonSpriteCell.tsx
- [X] T017 [P] [US1] Create dense table component in src/components/PokemonTable.tsx
- [X] T018 [US1] Replace card list usage with PokemonTable in src/App.tsx
- [X] T019 [US1] Implement dark-only table styling and balanced spacing in src/App.css
- [X] T020 [US1] Align base dark theme tokens and typography in src/index.css
- [X] T021 [US1] Wire mapped table rows to PokemonTable in src/app/usePokemonFilters.ts and src/App.tsx

**Checkpoint**: US1 delivers a complete dark dense table browsing experience.

---

## Phase 4: User Story 2 - Preserve Existing Filtering In Redesigned UI (Priority: P2)

**Goal**: Keep name/type/pokedex filtering semantics unchanged while rendering results in the new table.

**Independent Test**: Run existing filter interactions and verify row output, validation behavior, and empty-state behavior remain unchanged.

### Tests for User Story 2

- [X] T022 [P] [US2] Add regression unit tests for unchanged filter semantics with spriteSlug data in tests/unit/filterPokemon.regression.test.ts
- [X] T023 [P] [US2] Add component test for filter controls updating table rows in tests/component/filter-controls-table.test.tsx
- [X] T024 [P] [US2] Add component tests for loading/empty/error/validation states in dark table context in tests/component/status-states-dark-table.test.tsx

### Implementation for User Story 2

- [X] T025 [US2] Preserve filter pipeline behavior while adapting data shape in src/domain/filters/filterPokemon.ts and src/domain/filters/parsePokedexFilter.ts
- [X] T026 [US2] Keep result summary and status rendering behavior with table view in src/App.tsx and src/components/StatusMessage.tsx
- [X] T027 [US2] Integrate neutral silhouette fallback behavior in src/components/PokemonSpriteCell.tsx and src/services/spriteResolver.ts
- [X] T028 [US2] Ensure clear-all and filter reset flows remain correct with table results in src/app/usePokemonFilters.ts and src/components/FilterActions.tsx

**Checkpoint**: US2 preserves functional filtering behavior in the redesigned UI.

---

## Phase 5: User Story 3 - Maintain Accessibility And Cross-Viewport Usability (Priority: P3)

**Goal**: Ensure keyboard-accessible, overflow-safe, readable dark table UX on desktop and mobile.

**Independent Test**: Validate semantic table markup, keyboard operation, focus visibility, and no clipping/overflow in common viewports.

### Tests for User Story 3

- [X] T029 [P] [US3] Add accessibility-focused component tests for table semantics and keyboard usage in tests/component/pokemon-table-accessibility.test.tsx
- [X] T030 [P] [US3] Add responsive component tests for no clipping/overflow in tests/component/pokemon-table-responsive.test.tsx
- [X] T031 [P] [US3] Add contract test for sprite fallback UI behavior in tests/contract/pokemon-sprite-fallback.contract.test.tsx

### Implementation for User Story 3

- [X] T032 [US3] Add semantic table headers, cell labeling, and aria metadata in src/components/PokemonTable.tsx
- [X] T033 [US3] Implement overflow-safe responsive table container styles in src/App.css
- [X] T034 [US3] Add visible focus styling for keyboard navigation in src/App.css
- [X] T035 [US3] Tune mobile spacing and typography for readability in src/App.css and src/index.css

**Checkpoint**: US3 delivers accessible, responsive, dark-table usability.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final quality hardening, performance verification, and documentation updates.

- [X] T036 [P] Update quickstart validation scenarios and commands in specs/003-obsidian-dark-ui/quickstart.md
- [X] T037 [P] Add table rendering + filtering performance benchmark in tests/performance/filter-table-performance.bench.ts
- [X] T038 [P] Add component snapshot/regression test for dark table shell in tests/component/pokemon-table.snapshot.test.tsx
- [X] T039 Run full validation suite and capture results in specs/003-obsidian-dark-ui/quickstart.md
- [X] T040 Final strict typing pass for spriteSlug and row mappers in src/domain/models/pokemon.ts, src/services/pokemonTableMapper.ts, and src/services/spriteResolver.ts

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies.
- **Phase 2 (Foundational)**: Depends on Phase 1; blocks all user stories.
- **Phase 3 (US1)**: Depends on Phase 2; defines MVP.
- **Phase 4 (US2)**: Depends on Phase 2; can proceed after US1 starts but must preserve behavior.
- **Phase 5 (US3)**: Depends on Phase 2; best after US1 layout is present.
- **Phase 6 (Polish)**: Depends on target user stories completion.

### User Story Dependencies

- **US1 (P1)**: Independent once foundations are complete.
- **US2 (P2)**: Uses US1 table components but must keep filter semantics unchanged.
- **US3 (P3)**: Builds on US1 table structure and US2 fallback/status behavior.

### Within Each User Story

- Write story tests first and verify failure before implementation.
- Implement model/service logic before UI wiring where relevant.
- Verify each story independently at checkpoint before moving on.

---

## Parallel Opportunities

- Setup: T003 and T004 can run in parallel after T001/T002.
- Foundational: T007 and T008 can run in parallel after T005/T006.
- US1: T013, T014, and T015 can run in parallel; T016 and T017 can run in parallel.
- US2: T022, T023, and T024 can run in parallel.
- US3: T029, T030, and T031 can run in parallel.
- Polish: T036, T037, and T038 can run in parallel.

---

## Parallel Example: User Story 1

```bash
# Parallel tests for US1
Task: "T013 [US1] table layout test in tests/component/pokemon-table-layout.test.tsx"
Task: "T014 [US1] row density test in tests/component/pokemon-table-density.test.tsx"
Task: "T015 [US1] contract row composition test in tests/contract/pokemon-table-ui.contract.test.ts"

# Parallel implementation for US1
Task: "T016 [US1] sprite cell in src/components/PokemonSpriteCell.tsx"
Task: "T017 [US1] table component in src/components/PokemonTable.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 and Phase 2.
2. Complete US1 tests and implementation (Phase 3).
3. Validate MVP with unfiltered dense dark table flow.

### Incremental Delivery

1. Deliver US1 (table and dark theme core).
2. Deliver US2 (filter semantics preservation and fallback integration).
3. Deliver US3 (accessibility and responsive hardening).
4. Execute polish and full validation.

### Parallel Team Strategy

1. Team aligns on Setup + Foundational phases.
2. Then parallelize by story:
   - Developer A: US1 table and styling.
   - Developer B: US2 filter regression and fallback behavior.
   - Developer C: US3 accessibility and responsive quality.
3. Coordinate merges for shared files (`src/App.tsx`, `src/App.css`, `src/app/usePokemonFilters.ts`).

---

## Notes

- `[P]` tasks indicate safe parallel execution.
- `[US1]`, `[US2]`, `[US3]` labels map tasks to independently testable stories.
- Keep dependencies minimal and preserve constitution constraints (strict typing, accessibility, performance, boundary separation, and mandatory tests).
