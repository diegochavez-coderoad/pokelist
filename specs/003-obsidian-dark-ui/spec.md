# Feature Specification: Obsidian-Style Dark Pokelist UI

**Feature Branch**: `003-obsidian-dark-ui`

**Created**: 2026-07-02

**Status**: Draft

**Input**: User description: "Build/update the feature specification for Pokelist with a visual redesign focused on a dark, slick experience inspired by Obsidian app aesthetics. Keep the current product purpose: explore first-generation Pokemon and filter by name, type, and pokedex number. Redesign the UI so it feels premium, minimal, and dark-first. Present results in a dense, readable table inspired by Wikidex. Include a small Pokemon image in each row. Dark theme with layered charcoal surfaces, high readability, subtle depth with restrained glow accents, clean compact typography, polished controls, and a professional knowledge-tool feel. Existing filtering behavior remains unchanged. Table must include pokedex number, sprite image, name, and type information. Loading, empty, validation, and error states must be integrated with the dark design. Layout must work on desktop and mobile without overflow or clipping. Keyboard accessibility and perceivable status feedback are mandatory. Out of scope: no changes to dataset scope, auth, favorites, pagination, or multi-generation expansion."

## Clarifications

### Session 2026-07-02

- Q: Should the redesign support light-mode alternatives? -> A: Dark-only UI for this feature.
- Q: What should be the source strategy for Pokemon row sprites? -> A: Use locally bundled Gen 1 sprites sourced from PokemonDB (https://pokemondb.net/sprites).
- Q: What row density should the dark table use? -> A: Balanced rows (28px sprite, moderate spacing, dense but easy to scan).
- Q: How should sprite URL mapping be represented in local data? -> A: Add explicit `spriteSlug` per Pokemon, all lowercase.
- Q: What should happen when a row sprite fails to load? -> A: Show a neutral placeholder silhouette in the image cell.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Scan Pokemon In Dark Dense Table (Priority: P1)

As a user browsing first-generation Pokemon, I want to scan a dense dark-themed
table with readable rows so I can identify Pokemon quickly in a premium
knowledge-tool style interface.

**Why this priority**: The primary value of the app is fast discovery, and the
main surface for discovery is the result list presentation.

**Independent Test**: Open the list with no filters and verify a dense table view
is rendered with readable dark-theme contrast and stable row structure.

**Acceptance Scenarios**:

1. **Given** the first-generation dataset is loaded, **When** the results view renders, **Then** Pokemon entries appear in a table layout with a dark premium visual style.
2. **Given** a row is visible, **When** the user reads it, **Then** it shows Pokedex number, small image, Pokemon name, and type information.

---

### User Story 2 - Preserve Existing Filtering In Redesigned UI (Priority: P2)

As a user applying search and filters, I want filtering behavior to remain
unchanged in the redesigned interface so I do not lose current workflows.

**Why this priority**: Functional continuity is critical; visual redesign must
not break the existing search/filter product behavior.

**Independent Test**: Run name/type/pokedex filtering scenarios and confirm row
results, validation, and empty state behavior match existing logic.

**Acceptance Scenarios**:

1. **Given** active filter controls, **When** name/type/pokedex criteria change, **Then** table rows update immediately according to existing filter semantics.
2. **Given** invalid pokedex input is entered, **When** validation is evaluated, **Then** the same validation behavior and feedback remain intact in the dark UI.

---

### User Story 3 - Maintain Accessibility And Cross-Viewport Usability (Priority: P3)

As a user on desktop or mobile, including keyboard and assistive-tech users,
I want the redesigned interface to remain accessible and unclipped so I can
complete tasks reliably in low-light usage.

**Why this priority**: The redesign adds visual complexity and must still satisfy
accessibility and layout quality expectations from the constitution.

**Independent Test**: Validate keyboard navigation, perceivable feedback states,
and responsive layouts at common mobile and desktop widths.

**Acceptance Scenarios**:

1. **Given** the dark table UI is rendered, **When** the user navigates controls with keyboard, **Then** all key interactions remain operable with visible focus and semantic labeling.
2. **Given** narrow viewport widths, **When** list and filter controls render, **Then** content stays within containers without clipping or horizontal overflow in primary flows.

---

### Edge Cases

- Pokemon image assets are missing or fail to load for one or more rows.
- Very long names or combined type labels challenge row density.
- Low-brightness displays require adequate contrast for text and state feedback.
- Rapid filter changes trigger frequent table updates.
- Empty and error states are shown while preserving table layout context.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST preserve first-generation Pokemon scope (#001 to #151) with no dataset expansion.
- **FR-002**: System MUST present results in a dense table format inspired by Wikidex information structure.
- **FR-003**: Each visible row MUST include Pokedex number, a small Pokemon image (or fallback), Pokemon name, and type information.
- **FR-004**: System MUST preserve current name, type, and pokedex filtering behavior and semantics.
- **FR-005**: System MUST retain existing invalid pokedex validation behavior and user feedback rules.
- **FR-006**: Loading, empty, validation, and error states MUST remain explicitly perceivable in the redesigned UI.
- **FR-007**: System MUST apply a dark-first visual style with layered charcoal surfaces and high readability across core screens.
- **FR-007a**: System MUST be dark-only for this feature scope and MUST NOT add a light-mode toggle or system-theme switching behavior.
- **FR-008**: System MUST provide visually consistent controls and row states aligned with the premium, minimal, professional design direction.
- **FR-009**: Layout MUST remain usable on desktop and mobile without clipping critical content in normal app workflows.
- **FR-010**: Existing out-of-scope capabilities (auth, favorites, pagination, multi-generation support) MUST remain excluded.
- **FR-011**: Pokemon row sprites MUST be bundled locally in the application package and sourced from PokemonDB's Gen 1 sprite set (https://pokemondb.net/sprites) during asset preparation.
- **FR-012**: Sprite URL mapping used to build local assets MUST follow the PokemonDB pattern `https://img.pokemondb.net/sprites/silver/normal/{pokemon-name}.png` (for example, `.../charmander.png`) using normalized lowercase Pokemon names.
- **FR-013**: Balanced row density MUST be used: 28px sprite thumbnails with moderate spacing that preserves high scan speed and readability.
- **FR-014**: Local Pokemon data MUST include an explicit `spriteSlug` field for each entry; `spriteSlug` values MUST be lowercase URL-safe strings used to construct sprite paths.
- **FR-015**: If a row sprite cannot be displayed, the UI MUST show a neutral placeholder silhouette in the image cell (not a broken-image icon), while preserving row alignment and readability.

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

- **Pokemon Table Row**: A result entry containing number, image thumbnail/fallback, name, and type cells.
- **Dark Theme Surface**: A visual container layer defining contrast, depth, and readability behavior for controls and results.
- **Filter Result State**: Derived row set and status feedback produced by current name/type/pokedex criteria.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 95% of users can locate a specific first-generation Pokemon in under 10 seconds using the redesigned table UI.
- **SC-002**: 100% of visible result rows include required fields (number, image or fallback, name, type).
- **SC-003**: Filter updates remain within 100ms p95 in local development for the generation-1 dataset and become visible in under 1 second in normal usage.
- **SC-004**: 100% of loading, empty, validation, and error states remain perceivable and readable in the dark theme.
- **SC-005**: At least 90% of users can complete a combined filter task without layout-related confusion on desktop and mobile test viewports.

## Assumptions

- Existing filtering domain logic and data source remain unchanged and reused.
- Dark premium styling is inspired by Obsidian-like aesthetics but is not required to be a pixel-identical clone of another product.
- Small Pokemon images are available for first-generation entries or can be represented with stable fallback behavior.
- This feature changes presentation and UX quality only; it does not add new business capabilities beyond current exploration/filtering scope.
