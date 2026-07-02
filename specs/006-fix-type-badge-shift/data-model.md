# Data Model: Type Badge Stability and Summary Removal

## Overview

This feature does not add backend entities or persisted data. It refines UI
presentation/state behavior for existing type-filter controls.

## Entities

### 1. TypeBadgeVisualState

Represents render-time state for each type filter chip.

- Fields:
  - `type: string` (canonical type name)
  - `isSelected: boolean` (selected state)
  - `showsSelectedMarker: boolean` (check marker visibility)
  - `showsStrongSelectedRing: boolean` (selected ring visibility)
  - `hasReservedMarkerSlot: boolean` (ensures icon-space stability)
  - `footprintInvariant: boolean` (selected/unselected dimensions expected equal)
- Validation rules:
  - `type` must exist in canonical type list.
  - `showsSelectedMarker` and `showsStrongSelectedRing` must track `isSelected`.
  - `hasReservedMarkerSlot` must remain true for both selected/unselected states.

### 2. TypeFilterInteractionState

Represents active type selections and toggle interactions.

- Fields:
  - `selectedTypes: string[]`
  - `toggleActionType: 'select' | 'deselect'`
  - `lastToggledType: string | null`
  - `noFullPageRefresh: boolean`
- Validation rules:
  - `selectedTypes` contains unique canonical type names.
  - `noFullPageRefresh` remains true for all toggle transitions.

### 3. FilterPanelPresentationState

Represents filter-panel rendering rules for this feature.

- Fields:
  - `showsSelectedCountSummary: false`
  - `isKeyboardOperable: boolean`
  - `hasPerceivablePressedFeedback: boolean`
  - `isResponsiveReadable: boolean`
  - `isBackgroundStableOnToggle: boolean`
- Validation rules:
  - `showsSelectedCountSummary` is always false.
  - Accessibility/readability/stability flags remain true in acceptance checks.

## Relationships

- `TypeFilterInteractionState.selectedTypes` drives `TypeBadgeVisualState.isSelected`.
- `TypeBadgeVisualState` instances collectively define `FilterPanelPresentationState` stability/readability outcomes.

## State Transitions

1. Toggle on type:
- `selectedTypes` adds type.
- Corresponding badge sets selected marker/ring true.
- Badge footprint remains invariant; no layout displacement introduced.

2. Toggle off type:
- `selectedTypes` removes type.
- Corresponding badge sets selected marker/ring false.
- Reserved marker slot remains present; label alignment unchanged.

3. Clear filters:
- `selectedTypes` becomes empty.
- All badges unselected with stable footprint.
- No selected-count summary is displayed.
