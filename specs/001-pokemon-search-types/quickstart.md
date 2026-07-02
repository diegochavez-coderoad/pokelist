# Quickstart Validation Guide

## Prerequisites
- Node.js and npm installed.
- Project dependencies installed.

## Setup
1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open the local URL displayed by Vite.

## Validation Scenarios

### Scenario 1: Name search
1. Enter partial query `char`.
2. Verify only matching first-generation Pokemon are shown.
3. Clear input and verify full #001-#151 list returns.

Expected outcome:
- Case-insensitive matching works and updates are immediate.

### Scenario 2: Type filtering (OR semantics)
1. Select type `Fire`.
2. Add type `Flying`.
3. Verify results include Pokemon with either selected type.

Expected outcome:
- Multi-type selection broadens result set with inclusive OR logic.

### Scenario 3: Pokedex exact and range
1. Enter exact number `25` and verify only Pikachu is shown.
2. Enter range `1-50` and verify only Pokemon #001 through #050 are shown.

Expected outcome:
- Exact and range filters both function within #001-#151 bounds.

### Scenario 4: Invalid Pokedex input
1. Enter invalid value `200`.
2. Enter invalid range `50-1`.

Expected outcome:
- Validation message is shown.
- Invalid pokedex filter is not applied until corrected.

### Scenario 5: No results state
1. Apply criteria that produce no matches (for example name query with unmatched text).
2. Verify explicit no-results UI state is displayed.

Expected outcome:
- Empty-state message is perceivable and clear.

## Test Commands
Run automated tests:

```bash
npm test
```

Run type checks/linting:

```bash
npm run typecheck
npm run lint
```

Run performance validation:

```bash
npm test -- tests/performance/filter-performance.bench.ts
```

## Final Verification Notes

- `npm test` should pass all unit, component, contract, and performance checks.
- `npm run typecheck` should complete with no TypeScript errors.
- `npm run lint` is configured as a strict TypeScript compile guard (`tsc --noEmit`).
- Performance benchmark expectation: p95 <= 100ms for the 151-record dataset.

## References
- Specification: specs/001-pokemon-search-types/spec.md
- Data model: specs/001-pokemon-search-types/data-model.md
- Contract: specs/001-pokemon-search-types/contracts/filtering-contract.md
