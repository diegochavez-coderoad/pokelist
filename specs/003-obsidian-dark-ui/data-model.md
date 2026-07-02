# Data Model: Obsidian-Style Dark Pokelist UI

## Entity: Pokemon
- Description: Canonical generation-1 Pokemon record used for filtering and row rendering.
- Fields:
  - id: number (1..151, unique)
  - pokedexNumber: number (1..151, unique)
  - name: string (display name)
  - types: string[] (length 1..2, controlled values)
  - spriteSlug: string (lowercase URL-safe slug for sprite mapping)
- Validation rules:
  - `spriteSlug` must be lowercase and URL-safe (`[a-z0-9-]+`).
  - `pokedexNumber` ordering remains deterministic ascending in default view.

## Entity: SpriteAssetMapping
- Description: Deterministic mapping contract between Pokemon data and local sprite file path.
- Fields:
  - spriteSlug: string
  - sourcePattern: string (`https://img.pokemondb.net/sprites/silver/normal/{spriteSlug}.png` for acquisition)
  - localAssetPath: string (bundled app path resolved at build/runtime)
- Validation rules:
  - Every Pokemon row must resolve to either a valid local asset or a neutral silhouette fallback state.

## Entity: TableRowViewModel
- Description: UI-facing row model for dense dark table rendering.
- Fields:
  - pokedexNumberLabel: string (`#001` format)
  - name: string
  - typesLabel: string or segmented type cells
  - spriteSrc: string | null
  - spriteAlt: string
  - usesFallbackSilhouette: boolean
- Validation rules:
  - `usesFallbackSilhouette=true` when sprite cannot render.
  - Row layout must retain alignment regardless of sprite load success.

## Entity: SearchCriteria
- Description: Existing user-entered filter state.
- Fields:
  - nameQuery: string
  - selectedTypes: string[]
  - pokedexInput: string
- Validation rules:
  - Existing parsing/validation behavior is unchanged.

## Entity: FilterResultState
- Description: Existing derived search output state plus status messaging.
- Fields:
  - filteredPokemon: Pokemon[]
  - hasMatches: boolean
  - isLoading: boolean
  - errorMessage: string | null
  - validationMessage: string | null
- Validation rules:
  - Existing semantics for loading/empty/error/validation remain unchanged.

## Relationships
- `SearchCriteria` + `Pokemon[]` => `FilterResultState.filteredPokemon`
- `Pokemon` + `SpriteAssetMapping` => `TableRowViewModel`
- `TableRowViewModel` drives dense dark table rendering in UI layer.

## State Transitions
1. Data Loaded -> Build table rows with sprite lookup.
2. Sprite success -> Render normal sprite cell.
3. Sprite failure -> Render neutral silhouette placeholder.
4. Criteria changes -> Recompute filtered rows while preserving status semantics.
