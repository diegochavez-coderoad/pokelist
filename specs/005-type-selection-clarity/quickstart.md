# Quickstart: Validate Type Selection Clarity

## Prerequisites
- Node.js and npm installed
- Dependencies installed at repo root

## Setup
1. Install dependencies: `npm install`
2. Run development server: `npm run dev`
3. Open the local Vite URL in desktop and mobile viewport sizes

## Validation Scenarios

### Scenario 1: Selected marker and strong ring visibility
1. Open the type filter panel.
2. Toggle one type on.
3. Expected outcome:
   - The selected type shows a clear marker.
   - The selected type shows a stronger ring/outline than unselected types.

### Scenario 2: Multi-selection readability
1. Select three or more types.
2. Expected outcome:
   - Selected types are immediately distinguishable at glance.
   - Unselected types remain clearly different.

### Scenario 3: Selected count summary
1. Observe summary with no selection.
2. Toggle two types on, then one off.
3. Expected outcome:
   - Summary shows `Selected: 0` initially.
   - Summary updates to `Selected: 2` then `Selected: 1` without delay.

### Scenario 4: Clear filters behavior
1. With active type selections, click clear filters.
2. Expected outcome:
   - Selected marker/ring is removed from all type buttons.
   - Summary returns to `Selected: 0`.

### Scenario 5: Keyboard and semantic interaction
1. Focus type buttons via keyboard tab navigation.
2. Toggle selection with keyboard activation.
3. Expected outcome:
   - Selection visuals update correctly.
   - Pressed/selected semantics remain accurate and perceivable.

### Scenario 6: Filter semantics non-regression
1. Apply known type combinations previously validated.
2. Expected outcome:
   - Result set matches existing semantics and correctness expectations.

### Scenario 7: Background stability
1. Toggle between zero, one, and many active types repeatedly.
2. Expected outcome:
   - Background appearance remains stable while only controls/results update.

## Test Commands
- Run test suite: `npm test`
- Run type/lint gate: `npm run lint`
- Run typecheck build: `npm run typecheck`

## References
- Spec: `specs/005-type-selection-clarity/spec.md`
- Data model: `specs/005-type-selection-clarity/data-model.md`
- UI contract: `specs/005-type-selection-clarity/contracts/type-selection-clarity-ui-contract.md`
