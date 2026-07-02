# Type Selection Clarity UI Contract

## Purpose
Define verifiable behavior for selected-state visibility and selected-count feedback in the type filter control group while preserving existing filtering semantics.

## Inputs
- selectedTypes: string[]
- availableTypes: string[]
- toggle interaction events (mouse/keyboard)

## Outputs
- Updated type button visuals (selected marker + strong selected ring)
- Accurate `Selected: N` summary text
- Filtered result set with unchanged existing semantics

## Contract Rules
1. Selected-state clarity
- Selected type buttons MUST display a selected marker.
- Selected type buttons MUST display a strong selected ring/outline.
- Selected and unselected states MUST be visually distinguishable without relying solely on subtle saturation shifts.

2. Selected-count summary
- Filter section MUST display `Selected: N`.
- `N` MUST match the exact number of selected types at all times.
- Clearing filters MUST reset summary to `Selected: 0`.

3. Semantic and accessibility continuity
- Type controls MUST remain keyboard operable.
- Semantic pressed state MUST reflect selected state.
- Focus-visible and selected state indicators MUST remain distinguishable.

4. Filtering behavior continuity
- Type filtering semantics and result correctness MUST remain unchanged.
- Selection updates MUST occur without full-page refresh.

5. Visual stability
- Page background appearance MUST remain stable while type selections change.

## Minimum Contract Test Scenarios
1. Selecting one type applies marker + strong ring and sets `Selected: 1`.
2. Selecting multiple types updates `Selected: N` exactly and preserves marker/ring per selected type.
3. Deselecting a selected type removes marker/ring and decrements summary count correctly.
4. Clearing filters resets all selected visuals and summary to `Selected: 0`.
5. Keyboard toggles update semantic pressed state and selected visuals.
6. Existing type-filter result semantics remain unchanged under all selection states.
7. Background presentation remains visually stable across single and multi-type toggle flows.
