# Research: Type Filter Selection Clarity

## Decision 1: Use dual cue selected state (marker + strong ring)
- Decision: Apply a visible check marker and stronger selected ring for active type buttons.
- Rationale: Selection visibility should not depend on subtle saturation changes.
- Alternatives considered:
  - Color-only selected state: rejected due to low contrast in dense multi-type layouts.
  - Text weight only: rejected because it is weak at glance distance.

## Decision 2: Add lightweight selected-count summary near filter controls
- Decision: Surface `Selected: N` directly in the type filter section.
- Rationale: Reduces rescanning overhead and confirms active filter scope in real time.
- Alternatives considered:
  - Full selected-pill summary strip: rejected as unnecessary layout complexity for this scope.
  - No summary text: rejected because selected-state count is a direct user need.

## Decision 3: Preserve filter semantics and domain behavior
- Decision: Keep type-filter logic unchanged (same OR behavior and result correctness).
- Rationale: Feature is a UX clarity refinement, not a filtering behavior change.
- Alternatives considered:
  - Rework filter semantics while touching UI: rejected due to higher regression risk.

## Decision 4: Keep background presentation stable during toggles
- Decision: Ensure page background rendering is decoupled from selected badge state and result count changes.
- Rationale: Visual stability is part of acceptance criteria and avoids distracting interaction artifacts.
- Alternatives considered:
  - Allow subtle background shifts: rejected because it undermines user confidence.

## Decision 5: Preserve accessibility and keyboard clarity
- Decision: Maintain semantic pressed-state controls and add clear focus vs selected differentiation.
- Rationale: Constitution requires keyboard operability and perceivable feedback.
- Alternatives considered:
  - Visual-only selected cue without keyboard-state distinction: rejected for accessibility risk.

## Decision 6: Validate with targeted component + contract regression tests
- Decision: Extend tests for selected cues, selected count accuracy, semantics non-regression, and background stability checks.
- Rationale: Constitution mandates robust search/filter and UX-state test coverage.
- Alternatives considered:
  - Manual QA only: rejected due to regression risk and weaker repeatability.
