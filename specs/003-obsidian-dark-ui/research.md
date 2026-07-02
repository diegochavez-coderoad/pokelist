# Research: Obsidian-Style Dark Pokelist UI

## Decision 1: Dark-only theme scope
- Decision: Implement this feature as dark-only with no light mode toggle and no system-theme switching.
- Rationale: Clarified requirement explicitly selected dark-only; reduces theme-state complexity and test surface.
- Alternatives considered:
  - Dark default + light toggle: rejected due to scope expansion.
  - System theme support: rejected because behavior was explicitly excluded.

## Decision 2: Dense table presentation instead of card grid
- Decision: Render Pokemon results in a dense table inspired by Wikidex structure.
- Rationale: Table layout improves scan efficiency for 151 entries and aligns with specified visual direction.
- Alternatives considered:
  - Keep cards and restyle dark: rejected because feature requires a table.
  - Split list/table dual mode: rejected as unnecessary complexity.

## Decision 3: Balanced row density
- Decision: Use balanced density with 28px sprite thumbnails and moderate spacing.
- Rationale: Maintains high information density while preserving readability on mixed viewport sizes.
- Alternatives considered:
  - Compact 24px rows: rejected due to readability/accessibility risk.
  - Comfortable 32px rows: rejected for reduced scan density.

## Decision 4: Local bundled sprites with explicit slug mapping
- Decision: Bundle Gen 1 sprites locally; include explicit lowercase `spriteSlug` per Pokemon to map deterministic paths.
- Rationale: Removes runtime network dependence and avoids edge-case name normalization failures.
- Alternatives considered:
  - Runtime CDN loading only: rejected for reliability and deterministic UX concerns.
  - Derived slug from display name at runtime: rejected due to special-name ambiguity.
  - Store full URL per row: rejected because slug-based pattern is cleaner and easier to validate.

## Decision 5: Sprite source pattern and fallback
- Decision: Use PokemonDB silver/normal naming pattern for asset preparation and render a neutral silhouette placeholder when sprite fails.
- Rationale: Clarified user requirement provides concrete source pattern; silhouette fallback preserves dense-table alignment and polished appearance.
- Alternatives considered:
  - Browser broken-image icon: rejected as visually noisy.
  - Text-only fallback: rejected due to table scan degradation.

## Decision 6: Accessibility and performance continuity
- Decision: Preserve current filter logic and status semantics while applying dark redesign with table semantics and keyboard operability.
- Rationale: Constitution requires accessibility-first and no regression on filtering responsiveness.
- Alternatives considered:
  - Rebuild filtering behavior for table-specific logic: rejected due to regression risk.
  - Defer a11y pass post-implementation: rejected by constitution gates.
