# Research: Type Badge Stability and Summary Removal

## Decision 1: Use non-box-model selected emphasis so badges keep fixed footprint

- Decision: Prefer selected-state emphasis via `outline` (with offset) or an always-reserved visual layer rather than changing border thickness, padding, or transform scale.
- Rationale: Outline/ring techniques can strengthen selected affordance without increasing badge width/height, preventing badge-to-badge movement during toggles.
- Alternatives considered:
  - Increase border width on selected state: rejected because it changes badge dimensions.
  - Scale selected badge with transform: rejected because it causes perceived and measured layout instability.
  - Conditional outer shadow without fixed reservation: rejected because visual envelope can shift spacing expectations in wrapped rows.

## Decision 2: Reserve marker slot width in both selected and unselected states

- Decision: Keep a fixed marker slot in each badge (rendered as visible check when selected and inert placeholder when unselected).
- Rationale: Reserving icon space prevents text/gap reflow when check marker appears or disappears.
- Alternatives considered:
  - Conditionally add/remove marker node: rejected because flex item count changes can shift labels.
  - Absolutely-positioned marker overlay: rejected due to more brittle alignment/responsive behavior.

## Decision 3: Remove visible `Selected: N` summary while preserving accessibility cues

- Decision: Remove the visible selected-count text element and ensure each type control remains semantically clear with `aria-pressed` and accessible name continuity.
- Rationale: The requested simplification removes distracting summary text while keeping state perceivable through control semantics and visual selected state.
- Alternatives considered:
  - Keep hidden live-region count announcements: optional, but not required by current request and can add noise.
  - Keep visible count in a reduced style: rejected because requirement is explicit removal.

## Decision 4: Validate stability and non-regression with deterministic assertions

- Decision: Add/retain automated assertions for no-refresh behavior, semantic filter correctness, stable background configuration, and selected badge dimension/layout stability across toggles.
- Rationale: The feature is a UI refinement with high regression risk in interaction feel; deterministic tests provide guardrails.
- Alternatives considered:
  - Manual-only validation: rejected as insufficient for constitution-required behavior coverage.
  - Snapshot-only checks: rejected because snapshots may not catch subtle dimension displacement.
