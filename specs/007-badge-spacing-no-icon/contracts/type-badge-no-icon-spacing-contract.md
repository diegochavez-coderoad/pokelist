# Type Badge No-Icon and Spacing Contract

## Purpose

Define verifiable behavior for removing check icons from type badges while
keeping white selected overlay/ring and eliminating odd leading label spacing.

## Inputs

- `selectedTypes: string[]`
- Type badge toggle events (mouse and keyboard)
- Desktop/mobile viewport layouts

## Outputs

- Selected badges with no internal check icon
- White selected overlay/ring remains visible for selected state
- Unselected labels render without odd leading spacing
- Unchanged filtering behavior and stability characteristics

## Contract Rules

1. Icon removal
- Selected badges MUST NOT render a check icon or hidden icon placeholder.

2. Selected-state clarity
- Selected badges MUST continue to use white overlay/ring treatment.
- Selected-state feedback MUST remain perceivable without iconography.

3. Label spacing/alignment
- Unselected badge labels MUST NOT include odd leading indentation.
- Selected/unselected transitions MUST preserve stable, readable text alignment.

4. Accessibility and semantics
- Badge controls MUST remain keyboard operable.
- `aria-pressed` MUST remain accurate with selected state.

5. Behavior continuity
- Existing type-filter semantics MUST remain unchanged.
- Toggle actions MUST NOT trigger full-page refresh/navigation changes.
- Loading, empty, validation, and error state messaging MUST remain unchanged.
- Background presentation MUST remain stable during toggles.

## Minimum Contract Test Scenarios

1. Selected badge shows no check icon while still showing selected overlay/ring.
2. Unselected badges render labels with no odd leading spacing.
3. Repeated toggles keep label alignment stable and readable.
4. Existing OR-semantics filtering scenarios remain unchanged.
5. Keyboard toggles keep `aria-pressed` accurate and perceivable selected state.
6. Toggle flows keep URL/navigation stable (no refresh).
7. Background and status-state behavior remains unchanged.
