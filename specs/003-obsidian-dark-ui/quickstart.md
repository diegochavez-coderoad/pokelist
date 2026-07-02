# Quickstart Validation Guide

## Prerequisites
- Node.js + npm installed.
- Dependencies installed in repository root.

## Setup
1. Install dependencies:

```bash
npm install
```

2. Run development server:

```bash
npm run dev
```

3. Open the Vite local URL.

## Validation Scenarios

### Scenario 1: Dark-only Obsidian-style table loads
1. Open app with no filters.
2. Verify interface is dark-only and list is rendered as a table-like dense row layout.
3. Confirm required row fields appear: Pokedex number, small sprite, name, types.

Expected outcome:
- No card-grid presentation remains.
- Dark premium styling is cohesive and readable.

### Scenario 2: Balanced row density
1. Inspect multiple rows on desktop and mobile widths.
2. Verify sprite thumbnails appear at balanced density target (28px) with moderate spacing.

Expected outcome:
- Rows feel dense but legible.
- No clipped content in primary flows.

### Scenario 3: Sprite mapping and fallback
1. Verify normal rows display bundled sprites sourced via prepared PokemonDB silver/normal mapping.
2. Simulate missing/broken sprite for one row.

Expected outcome:
- Missing sprite row shows neutral silhouette placeholder.
- No broken-image icon appears.
- Row alignment remains intact.

### Scenario 4: Filtering regression guard
1. Run existing name/type/pokedex filter interactions.
2. Verify result sets remain consistent with existing semantics.

Expected outcome:
- Filtering behavior unchanged functionally.
- Table rows update immediately.

### Scenario 5: Status feedback in dark theme
1. Trigger invalid pokedex validation.
2. Trigger no-result state.
3. Trigger loading and simulated repository error states.

Expected outcome:
- All status messages remain perceivable and readable in dark UI.

## Automated Validation Commands

```bash
npm test
npm run typecheck
npm run lint
```

Optional targeted run:

```bash
npm test -- tests/performance/filter-table-performance.bench.ts
```

## Validation Record

- Date: 2026-07-02
- Commands executed:
	- `npm test --silent`
	- `npm run typecheck --silent`
	- `npm run lint --silent`
- Result: PASS (21 test files, 38 tests)

## References
- Spec: specs/003-obsidian-dark-ui/spec.md
- Plan: specs/003-obsidian-dark-ui/plan.md
- Research: specs/003-obsidian-dark-ui/research.md
- Data model: specs/003-obsidian-dark-ui/data-model.md
- Contract: specs/003-obsidian-dark-ui/contracts/pokemon-table-ui-contract.md
