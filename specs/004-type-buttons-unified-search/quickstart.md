# Quickstart: Validate Type Buttons And Unified Search Input

## Prerequisites
- Node.js and npm installed
- Dependencies installed in repo root

## Setup
1. Install dependencies:
   - `npm install`
2. Start development server:
   - `npm run dev`
3. Open the local app URL shown by Vite.

## Validation Scenarios

### Scenario 1: Unified input name lookup
1. Locate the single search input in the UI.
2. Enter partial text (example: `char`).
3. Expected outcome:
   - Matching names appear.
   - Matching is case-insensitive.

### Scenario 2: Unified input exact pokedex lookup
1. In the same input, enter an exact number (example: `25`).
2. Expected outcome:
   - Result list shows the matching pokedex row according to existing semantics.

### Scenario 3: Unified input pokedex range lookup
1. In the same input, enter a valid range (example: `10-20`).
2. Expected outcome:
   - Results include rows within the inclusive range.

### Scenario 4: Invalid numeric/range query
1. Enter an invalid numeric/range query (example: `20-10` or malformed range).
2. Expected outcome:
   - Validation message appears.
   - Invalid numeric filtering is not applied.

### Scenario 5: Type buttons in filter controls
1. Open type filter controls.
2. Verify each type is rendered as a type-style button.
3. Toggle one or multiple types.
4. Expected outcome:
   - Filtering semantics remain unchanged.
   - Button states are visually distinct and keyboard-operable.

### Scenario 6: Type buttons in table rows
1. View rows with one and two types.
2. Expected outcome:
   - Type values are displayed as type-style buttons in rows.
   - Colors map to canonical values (see contract).
   - Layout remains readable in mobile and desktop widths.

### Scenario 7: UX state continuity
1. Trigger loading/empty/error/validation states using existing app flows.
2. Expected outcome:
   - All states remain explicit, readable, and perceivable.

## Test Commands
- Run full tests: `npm test`
- Run lint: `npm run lint`
- Run typecheck (if script exists): `npm run typecheck`

## References
- Data model: `specs/004-type-buttons-unified-search/data-model.md`
- UI contract: `specs/004-type-buttons-unified-search/contracts/unified-search-type-button-ui-contract.md`
- Feature spec: `specs/004-type-buttons-unified-search/spec.md`
