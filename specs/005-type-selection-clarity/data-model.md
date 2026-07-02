# Data Model: Type Filter Selection Clarity

## Entity: TypeFilterSelectionState
- Description: Runtime state for selected type filters and derived summary count.
- Fields:
  - selectedTypes: string[]
  - selectedCount: number
- Validation rules:
  - selectedCount MUST equal selectedTypes.length.
  - selectedTypes entries MUST be unique.

## Entity: TypeButtonVisualState
- Description: Visual/UI representation for each type button state.
- Fields:
  - type: string
  - isSelected: boolean
  - showsSelectedMarker: boolean
  - showsStrongSelectedRing: boolean
  - isFocusVisible: boolean
  - ariaPressed: boolean
- Validation rules:
  - isSelected=true MUST imply showsSelectedMarker=true and showsStrongSelectedRing=true.
  - ariaPressed MUST mirror isSelected state.
  - Focus-visible and selected visuals MUST be distinguishable.

## Entity: SelectedTypesSummary
- Description: Lightweight informational summary displayed near type controls.
- Fields:
  - label: string (`Selected`)
  - count: number
  - displayText: string (`Selected: N`)
- Validation rules:
  - count MUST always match TypeFilterSelectionState.selectedCount.
  - displayText MUST update immediately after selection changes.

## Relationships
- TypeFilterSelectionState drives TypeButtonVisualState for each rendered type.
- TypeFilterSelectionState.selectedCount drives SelectedTypesSummary.count.
- SelectedTypesSummary is presentation-only and does not alter filter logic.

## State Transitions
1. Toggle type on -> add type to selectedTypes -> recompute selectedCount -> update button marker/ring and `Selected: N`.
2. Toggle type off -> remove type from selectedTypes -> recompute selectedCount -> remove marker/ring and update summary.
3. Clear filters -> selectedTypes=[] -> selectedCount=0 -> summary becomes `Selected: 0`.
4. Keyboard interaction (space/enter) follows same transitions with semantic pressed state updates.
