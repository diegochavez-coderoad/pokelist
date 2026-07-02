# Pokemon Table UI Contract

## Purpose
Define externally verifiable behavior for the Obsidian-style dark table UI,
including row composition, sprite mapping expectations, fallback behavior,
and filter-state continuity.

## Inputs
- pokemonList: Pokemon[]
- searchCriteria: SearchCriteria
- spriteAssets: local bundled assets derived from `spriteSlug`

## Output
- Rendered table rows and status states in dark-only UI.

## Contract Rules
1. Table structure
- Results MUST render as table rows, not card tiles.
- Required columns per row: Pokedex number, sprite cell, Pokemon name, type information.

2. Row density
- Sprite thumbnail target size is 28px with moderate spacing.
- Density MUST remain balanced and readable on desktop/mobile.

3. Sprite mapping
- Data includes explicit lowercase `spriteSlug`.
- Asset acquisition pattern for preparation:
  - `https://img.pokemondb.net/sprites/silver/normal/{spriteSlug}.png`
- Runtime display uses local bundled sprite assets.

4. Sprite fallback
- If sprite load fails or is missing, UI MUST render a neutral silhouette placeholder in the sprite cell.
- Broken-image browser icon MUST NOT be shown.
- Row alignment MUST remain stable in fallback state.

5. Filter behavior continuity
- Name/type/pokedex filtering semantics remain unchanged.
- Invalid pokedex input handling and messages remain unchanged.
- Loading/empty/error/validation states remain explicit and perceivable in dark theme.

6. Theme scope
- UI is dark-only for this feature.
- No light-toggle or system-theme switching behavior.

## Minimum Contract Test Scenarios
1. Table renders required columns and row count for unfiltered generation-1 list.
2. Row with valid sprite displays 28px thumbnail and correct alt text.
3. Forced sprite failure renders neutral silhouette placeholder (no broken icon).
4. Name/type/pokedex filters produce same result sets as pre-redesign behavior.
5. Empty/validation/error/loading states remain visible and readable in dark UI.
6. Mobile viewport does not clip key row content in primary user flow.
