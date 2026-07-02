# Research: Type Buttons And Unified Search Input

## Decision 1: Single combined search input behavior
- Decision: Use one input field to handle both name-query and pokedex-query behavior.
- Rationale: User request explicitly requires one input instead of separate fields and reduces interaction friction.
- Alternatives considered:
  - Keep two dedicated inputs: rejected because it conflicts with requested behavior.
  - Add mode toggle (name vs pokedex): rejected as unnecessary complexity for current scope.

## Decision 2: Preserve existing filter semantics
- Decision: Reuse existing case-insensitive name matching and existing exact/range pokedex semantics.
- Rationale: Constitution prioritizes reliability and no regression in search/filter behavior.
- Alternatives considered:
  - Introduce new query grammar in unified input: rejected due to regression risk.
  - Prioritize numeric parse over name parse always: rejected because ambiguous mixed input handling should remain predictable and testable.

## Decision 3: Canonical type color palette
- Decision: Define explicit canonical Pokemon type hex mapping as stable style tokens.
- Rationale: Clarification selected canonical palette and requirement now mandates exact mapping values.
- Alternatives considered:
  - Keep ad-hoc custom palette: rejected due to inconsistency and unclear design contract.
  - Dynamic color generation from type names: rejected due to poor determinism and testing difficulty.

## Decision 4: Type-button style applied in both filter and table rows
- Decision: Apply same type-button visual system to filter controls and row-level type labels.
- Rationale: This preserves recognition continuity and satisfies primary feature intent.
- Alternatives considered:
  - Style only filter controls: rejected because rows would remain visually inconsistent.
  - Style only table rows: rejected because filter controls are part of requested change.

## Decision 5: Keep non-Gen1 type tokens as shared style definitions
- Decision: Retain full canonical type token set (including Dark, Steel, Fairy) while generation-1 data only renders applicable types.
- Rationale: Matches clarified requirement and improves style-token reusability without changing data scope.
- Alternatives considered:
  - Keep Gen1-only tokens: rejected because requirement includes non-Gen1 shared tokens.

## Decision 6: Accessibility and performance continuity
- Decision: Preserve keyboard operability and status-state readability while introducing type-button visuals and unified input.
- Rationale: Constitution gates require accessibility-first and filtering performance continuity.
- Alternatives considered:
  - Accessibility pass deferred to later: rejected by constitution.
  - Heavy visual effects for buttons: rejected due to potential readability/performance regression.
