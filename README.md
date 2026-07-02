# Pokelist

![Pokelist Banner](docs/hero-pokelist.svg)

A fast, accessible React + TypeScript app for exploring first-generation Pokemon (#001-#151) with unified search and type filters.

## What this project does

Pokelist Explorer helps users quickly find Kanto Pokemon by:

- Name search (case-insensitive text)
- Pokedex number exact match (for example `25`)
- Pokedex number range match (for example `1-50`)
- Type filtering (multi-select with OR semantics)

The project is developed with Speckit workflows (`specify -> plan -> tasks -> analyze -> implement`) and is backed by a strong test suite covering UI, domain logic, contracts, and performance.

## Core capabilities

- Unified search input for name and numeric intent
- Type filter panel using canonical Pokemon type color tokens
- Stable, responsive table layout with sprite fallback behavior
- Accessible controls and feedback states (loading, validation, empty, error)
- Generation-1 scope enforcement in data-loading/filter flow

## Tech stack

- React 19
- TypeScript (strict)
- Vite 8
- Vitest + React Testing Library + jsdom

## Getting started

### Prerequisites

- Node.js 20+ recommended
- npm 10+ recommended

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open the local URL shown by Vite (typically http://localhost:5173).

## Available scripts

- `npm run dev`: start local dev server
- `npm run build`: TypeScript project build + Vite production build
- `npm run preview`: preview the production build locally
- `npm run test`: run all Vitest tests once
- `npm run test:watch`: run tests in watch mode
- `npm run test:ui`: launch Vitest UI
- `npm run typecheck`: run TypeScript project checks
- `npm run lint`: currently configured as `tsc --noEmit` (type-oriented lint gate)

## Search and filter behavior

### Unified query input

The search box accepts either:

- Text: treated as name filtering
- Digits: treated as exact Pokedex filtering
- Numeric range (`start-end`): treated as Pokedex range filtering

When numeric intent is detected, name matching is intentionally bypassed and Pokedex criteria are applied.

### Pokedex validation rules

- Valid bounds are `1` through `151`
- Exact values outside bounds are rejected with a validation message
- Range values outside bounds are rejected with a validation message
- Reverse ranges (for example `50-1`) are rejected with a validation message
- Invalid numeric formats do not crash filtering and fall back safely

### Type filter semantics

- Selecting multiple types uses OR matching
- If no type is selected, type filtering is not applied
- Selected state is conveyed without relying on a check icon

## UI and accessibility notes

- Keyboard-operable controls with semantic elements
- ARIA state usage (for example pressed state on type buttons)
- Live result summary updates for filter outcomes
- Status messaging for loading/empty/error/validation
- Visual selected-state indicators optimized for clarity and stable layout

## Project structure

```text
.
├── src/
│   ├── app/
│   │   └── usePokemonFilters.ts         # App-level filtering and state orchestration
│   ├── components/                      # UI controls and table components
│   ├── data/
│   │   └── pokemon-gen1.json            # Static generation-1 dataset
│   ├── domain/
│   │   ├── filters/                     # Pure filtering/parsing logic
│   │   └── models/                      # Domain and view-model types
│   ├── services/                        # Data loading, mapping, sprite/type token services
│   ├── App.tsx
│   └── main.tsx
├── tests/
│   ├── component/                       # Component behavior and a11y tests
│   ├── contract/                        # Cross-layer behavior contracts
│   ├── unit/                            # Pure logic unit tests
│   ├── performance/                     # Benchmark tests
│   └── setup.ts
├── specs/                               # Speckit feature artifacts (001-007)
└── .specify/                            # Speckit scripts, templates, and constitution
```

## Architecture overview

### Layering

- Presentation: React components in `src/components`
- App orchestration: `src/app/usePokemonFilters.ts`
- Domain logic: `src/domain/filters/*`
- Services and mapping: `src/services/*`
- Data source: `src/data/pokemon-gen1.json`

### Data flow

1. `loadPokemon()` validates and loads static dataset.
2. App hook constrains data to generation-1 bounds.
3. Query intent is parsed into name vs numeric modes.
4. Domain filters combine name + type + Pokedex criteria.
5. Results map to table-ready view models.
6. UI renders status and table without page reloads.

## Testing strategy

The suite is organized by intent:

- Unit tests: filter and parser correctness
- Component tests: interactions, rendering states, and accessibility
- Contract tests: key end-to-end behavioral guarantees across layers
- Snapshot tests: table rendering stability
- Performance benchmarks: filtering responsiveness expectations

Run full quality checks:

```bash
npm run typecheck
npm run test
```

Optional benchmark run:

```bash
npx vitest bench tests/performance/filter-table-performance.bench.ts --run
```

## Speckit workflow

This repository keeps product and implementation artifacts under `specs/` and `.specify/`.

Typical flow:

1. `/speckit.specify` to define requirements and scenarios
2. `/speckit.plan` to design architecture and strategy
3. `/speckit.tasks` to generate executable task breakdown
4. `/speckit.analyze` to find consistency gaps
5. `/speckit.implement` to execute tasks and update code/tests

Recent completed features include:

- `004-type-buttons-unified-search`
- `005-type-selection-clarity`
- `006-fix-type-badge-shift`
- `007-badge-spacing-no-icon`

## Quality gates and standards

Project standards are codified in `.specify/memory/constitution.md` and include:

- Strict TypeScript by default
- Accessibility-first UI requirements
- Fast filtering performance targets
- Clean component/domain/service boundaries
- Mandatory test coverage for search/filter and UX states

## Troubleshooting

### Tests fail after changing JSX-based tests

If a test file contains JSX, use the `.tsx` extension (not `.ts`).

### Type checking fails due to unused imports

Run `npm run typecheck`, remove or use dead imports, and re-run.

### Dev server issues

- Remove `node_modules` and reinstall if dependencies are inconsistent
- Confirm Node.js version is modern (20+ recommended)

## Contributing

1. Start from a feature spec in `specs/`
2. Keep changes scoped and test-backed
3. Preserve domain boundaries (UI vs domain vs services)
4. Run quality gates before merging:

```bash
npm run typecheck
npm run test
npm run build
```

## License

No license is currently declared in this repository.

## README decoration ideas

1. Pokedex Hero (current banner style)
	- Keep the top wave banner and tweak text/height/colors to match your preferred look.
	- Great for a clean, modern first impression with zero local assets.

2. Pokeball Divider Sections
	- Add Pokeball emoji dividers between major sections, for example:
	  `### 🔴⚪ Getting started`
	- Great for lightweight visual rhythm while keeping markdown simple and fast.

3. Sprite Strip Header
	- Add a compact row of Gen1 sprite images under the banner (starters + Pikachu, etc.).
	- Great for nostalgic personality and immediate Pokemon theme recognition.
