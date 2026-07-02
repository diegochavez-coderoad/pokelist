# Data Model: Badge Spacing Without Check Icon

## Overview

This feature introduces no backend schema or persisted data. It refines UI
presentation state for type filter badges.

## Entities

### 1. TypeBadgeLabelPresentationState

Represents label spacing and alignment in badge rendering.

- Fields:
  - `type: string`
  - `isSelected: boolean`
  - `hasLeadingSpacingArtifact: boolean`
  - `textAlignmentStableAcrossStates: boolean`
- Validation rules:
  - `hasLeadingSpacingArtifact` must remain false in unselected state.
  - `textAlignmentStableAcrossStates` must remain true while toggling.

### 2. TypeBadgeSelectionAffordanceState

Represents selected-state visual treatment without iconography.

- Fields:
  - `isSelected: boolean`
  - `usesWhiteOverlayRing: boolean`
  - `usesCheckIcon: false`
  - `ariaPressed: boolean`
- Validation rules:
  - `usesCheckIcon` is always false.
  - `usesWhiteOverlayRing` and `ariaPressed` track `isSelected`.

### 3. TypeFilterInteractionState

Represents active type selections and interaction behavior.

- Fields:
  - `selectedTypes: string[]`
  - `isKeyboardOperable: boolean`
  - `noFullPageRefresh: boolean`
  - `backgroundStableOnToggle: boolean`
- Validation rules:
  - Selected types are unique canonical type names.
  - `noFullPageRefresh` remains true for toggle flows.
  - `backgroundStableOnToggle` remains true in validation checks.

## Relationships

- `TypeFilterInteractionState.selectedTypes` determines
  `TypeBadgeSelectionAffordanceState.isSelected`.
- `TypeBadgeSelectionAffordanceState` and `TypeBadgeLabelPresentationState`
  jointly define user-visible badge behavior.

## State Transitions

1. Toggle on type:
- Badge enters selected state with white overlay/ring.
- No icon appears.
- Label alignment remains stable.

2. Toggle off type:
- Badge returns to unselected state.
- No icon placeholder spacing remains.
- Leading spacing artifact remains absent.

3. Clear filters:
- All badges unselected.
- Labels remain cleanly aligned with no indentation artifact.
