# Type Badge Stability UI Contract

## Purpose

Define verifiable behavior for removing selected-count summary text and keeping
type badge layout stable across selection toggles.

## Inputs

- `selectedTypes: string[]`
- Type toggle interactions (mouse and keyboard)
- Responsive viewport changes (desktop/mobile)

## Outputs

- Type badges with clear selected-state visuals that do not change badge footprint
- No visible `Selected: N` summary in the filter panel
- Unchanged filtering semantics and status-state behavior

## Contract Rules

1. Summary removal
- Filter panel MUST NOT render visible `Selected: N` text in any selection state.

2. Badge footprint stability
- Selected and unselected badge states MUST keep consistent dimensions.
- Toggling badge state MUST NOT displace neighboring badges due to size change.
- Marker/ring affordances MUST remain clear while preserving layout invariance.

3. Accessibility and semantics
- Type controls MUST remain keyboard operable.
- `aria-pressed` state MUST continue to reflect selected state.
- Accessible naming and perceivable selected-state feedback MUST remain intact.

4. Filtering continuity
- Type filter result semantics MUST remain unchanged.
- Toggle interactions MUST continue without full-page refresh.

5. Visual stability and UX states
- Background presentation MUST remain stable during toggles.
- Loading, empty, validation, and error states MUST remain unchanged.

## Minimum Contract Test Scenarios

1. With zero, one, and many selected types, no `Selected:` summary text appears.
2. Selected and unselected badge dimensions remain equal for representative type chips.
3. Repeated toggles do not change container layout order or wrapped-row spacing due to chip growth.
4. Existing OR-semantics filtering scenarios produce unchanged result sets.
5. Keyboard toggles preserve `aria-pressed` and perceivable selected state.
6. Toggle actions do not modify location/navigation state (no full-page refresh).
7. Background and status-state behavior remains stable while toggling types.
