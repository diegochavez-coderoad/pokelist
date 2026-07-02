# Research: Badge Spacing Without Check Icon

## Decision 1: Remove icon and marker-slot reservation from unselected badges

- Decision: Do not render an internal check icon, and do not reserve icon slot space in unselected badge state.
- Rationale: Hidden icon placeholders are the direct cause of odd leading label indentation.
- Alternatives considered:
  - Keep hidden icon with opacity: rejected because spacing artifact persists.
  - Keep icon but reduce size: rejected because request requires icon removal.

## Decision 2: Preserve selected affordance using white overlay/ring only

- Decision: Keep selected-state clarity via existing white overlay/ring classes and `aria-pressed` semantics.
- Rationale: Maintains clear selection indication without iconography.
- Alternatives considered:
  - Add new symbol or glyph: rejected because it reintroduces inline icon clutter.
  - Use color-only distinction: rejected due to weaker perceptibility on dark backgrounds.

## Decision 3: Make spacing/alignment deterministic and testable

- Decision: Add/adjust tests to assert no odd leading gap for unselected labels and stable readable alignment across toggles.
- Rationale: Prevents regression where hidden marker space returns.
- Alternatives considered:
  - Rely on manual visual checks only: rejected by constitution test requirements.
  - Snapshot-only checks: rejected because subtle spacing regressions are hard to detect reliably.

## Decision 4: Keep behavior/performance and UX states unchanged

- Decision: Preserve existing OR filter semantics, no-refresh behavior, status-state messaging, and background stability assertions.
- Rationale: Feature is presentation-only and must not alter core behavior.
- Alternatives considered:
  - Refactor filter logic while touching UI: rejected as out of scope and riskier.
