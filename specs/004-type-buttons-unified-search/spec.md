# Feature Specification: Type Buttons And Unified Search Input

**Feature Branch**: `004-type-buttons-unified-search`

**Created**: 2026-07-02

**Status**: Draft

**Input**: User description: "the app should use these type of buttons when showing types in the table and in the filter by type section, also the search by name and pokedex number search should be just one input and not two"

## Clarifications

### Session 2026-07-02

- Q: Which type-color strategy should be used for type buttons? -> A: Use canonical Pokemon type palette with explicit hex per type (including Dark, Steel, Fairy for shared style tokens).

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.

  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - Unified Search Input (Priority: P1)

As a user exploring first-generation Pokemon, I want one combined search input
for name and pokedex query behavior so I can search quickly without choosing
between separate fields.

**Why this priority**: Search is the highest-frequency interaction and reducing
input friction directly improves core task completion speed.

**Independent Test**: Open the app and use only the combined input to find
Pokemon by partial name, exact pokedex number, and pokedex range.

**Acceptance Scenarios**:

1. **Given** the Pokemon list is loaded, **When** a user enters partial text,
  **Then** matching Pokemon names are shown using existing name-search behavior.
2. **Given** the Pokemon list is loaded, **When** a user enters an exact
  numeric query, **Then** the matching pokedex result is shown using existing
  numeric semantics.
3. **Given** the Pokemon list is loaded, **When** a user enters a valid range
  query, **Then** Pokemon within that inclusive range are shown.
4. **Given** a user enters an invalid numeric/range query, **When** validation
  runs, **Then** validation feedback is shown and invalid numeric filtering is
  not applied.

---

### User Story 2 - Type Buttons In Filter Controls (Priority: P2)

As a user filtering Pokemon by type, I want the filter controls to use
recognizable type-style buttons so I can scan and select types faster.

**Why this priority**: Type filtering is a core discovery path, and visual type
buttons improve recognition and selection confidence.

**Independent Test**: Open the type filter section and verify each type appears
as a styled type button and remains fully selectable/deselectable.

**Acceptance Scenarios**:

1. **Given** the filter section is visible, **When** a user views type options,
   **Then** each option is rendered as a type-style button.
2. **Given** one or more type buttons are toggled, **When** filtering updates,
   **Then** result behavior remains unchanged from existing type semantics.

---

### User Story 3 - Type Buttons In Table Rows (Priority: P3)

As a user reviewing search results, I want Pokemon types in table rows displayed
as type-style buttons so type information is easier to compare at a glance.

**Why this priority**: Row-level type readability improves scanning quality but
depends on the table rendering already being present.

**Independent Test**: With unfiltered and filtered results visible, verify table
rows display type values using the same visual type-button style and remain
readable on desktop and mobile.

**Acceptance Scenarios**:

1. **Given** table rows are visible, **When** a row includes one or two types,
   **Then** each type appears using the defined type-button visual treatment.
2. **Given** small viewport widths, **When** rows include two type buttons,
   **Then** layout remains readable without clipping primary row content.

---

### Edge Cases

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right edge cases.
-->

- Unified search input receives mixed alphanumeric text that resembles both name
  and numeric intent.
- Unified search input is empty after prior searches and filters were applied.
- Type-button labels with longer names (for example, Electric, Fighting) must
  remain readable at small widths.
- Rows with dual types must keep button spacing stable and avoid overlap.
- Existing loading, empty, error, and validation messages remain visible while
  new type-button styling is applied.

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: System MUST provide one combined search input that supports both
  name search behavior and pokedex query behavior.
- **FR-002**: Name search semantics in the combined input MUST remain
  case-insensitive partial matching.
- **FR-003**: Exact-number and range query semantics in the combined input MUST
  remain consistent with existing pokedex behavior.
- **FR-004**: Invalid numeric/range query handling in the combined input MUST
  preserve current validation behavior and messaging expectations.
- **FR-005**: Type controls in the filter section MUST render as type-style
  buttons rather than plain text-style controls.
- **FR-006**: Type values in result table rows MUST render using the same
  type-style button visual language.
- **FR-007**: Selecting or deselecting type buttons MUST preserve existing type
  filtering semantics and result correctness.
- **FR-008**: Updating search text and type selections MUST continue to update
  results dynamically without full-page refresh.
- **FR-009**: Existing loading, empty, validation, and error states MUST remain
  explicitly perceivable after these UI changes.
- **FR-010**: Feature scope MUST remain limited to generation-1 Pokemon
  exploration and existing filter workflows.
- **FR-011**: System MUST define explicit canonical type-color mappings via
  stable hex values for type button rendering.
- **FR-012**: Canonical type-color mappings MUST include: Normal `#A8A878`,
  Fire `#F08030`, Water `#6890F0`, Electric `#F8D030`, Grass `#78C850`,
  Ice `#98D8D8`, Fighting `#C03028`, Poison `#A040A0`, Ground `#E0C068`,
  Flying `#A890F0`, Psychic `#F85888`, Bug `#A8B820`, Rock `#B8A038`,
  Ghost `#705898`, Dragon `#7038F8`, Dark `#705848`, Steel `#B8B8D0`,
  Fairy `#EE99AC`.
- **FR-013**: For generation-1 rows, only applicable types MUST be displayed,
  while non-generation-1 mappings MAY remain as shared style tokens.

### Quality & UX Requirements *(mandatory)*

- **QR-001**: Features involving typed application logic MUST define type safety
  expectations and avoid untyped domain behavior.
- **QR-002**: User-facing flows MUST define accessibility behavior for keyboard
  interaction and semantic feedback.
- **QR-003**: Features with search or filtering MUST define explicit
  performance expectations and matching/filter semantics.
- **QR-004**: Specifications MUST define expected loading, empty, and error
  states where applicable.
- **QR-005**: Specifications MUST identify required automated tests for
  behavior-critical logic and UX-state transitions.

### Key Entities *(include if feature involves data)*

- **UnifiedSearchCriteria**: User-entered text interpreted for name and numeric
  pokedex intents within one input flow.
- **TypeButtonStyleToken**: Visual style definition applied consistently to type
  controls and row-level type indicators.
- **FilteredTableRowView**: Pokemon result row including pokedex number, sprite,
  name, and one or two styled type labels.

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: 95% of users can complete name or pokedex lookup from the single
  combined input in under 10 seconds.
- **SC-002**: 100% of filter types and row-level type values are rendered using
  the defined type-button visual style.
- **SC-003**: Filtering interactions remain within 100ms p95 in local
  development for the generation-1 dataset.
- **SC-004**: 100% of validation, loading, empty, and error states remain
  readable and perceivable after redesign changes.

## Assumptions

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right assumptions based on reasonable defaults
  chosen when the feature description did not specify certain details.
-->

- Existing generation-1 dataset and filtering rules remain the source of truth
  for result behavior.
- Single-input behavior uses current name and pokedex semantics rather than
  introducing new query grammar.
- Mobile and desktop compatibility remain required for both filter controls and
  row type-button rendering.
- No new capabilities such as authentication, favorites, pagination, or
  multi-generation browsing are introduced by this feature.
