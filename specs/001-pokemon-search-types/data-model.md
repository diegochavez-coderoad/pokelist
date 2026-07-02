# Data Model: First-Gen Pokemon Search

## Entity: Pokemon
- Description: Canonical first-generation Pokemon record used for display and filtering.
- Fields:
  - id: number (1-151, unique, required)
  - pokedexNumber: number (1-151, unique, required)
  - name: string (required, non-empty)
  - types: string[] (length 1-2, each value from controlled Type set)
  - spriteUrl: string (optional in spec scope, recommended for UI)
- Validation rules:
  - id/pokedexNumber must be integer in range 1..151.
  - name comparison for search uses normalized lowercase text.
  - types must contain only known generation-1 type names.

## Entity: SearchCriteria
- Description: User-entered filtering state that drives derived result set.
- Fields:
  - nameQuery: string (default empty)
  - selectedTypes: string[] (default empty)
  - pokedexExact: number | null (mutually exclusive with range when set)
  - pokedexRangeStart: number | null
  - pokedexRangeEnd: number | null
- Validation rules:
  - nameQuery is trimmed before comparison.
  - selectedTypes supports zero or more values.
  - If exact is set, it must be in 1..151.
  - If range is set, start/end must both be in 1..151 and start <= end.
  - Invalid pokedex inputs do not apply filter and must produce validation feedback.

## Entity: FilterResultState
- Description: Derived UI state for rendering and feedback.
- Fields:
  - filteredPokemon: Pokemon[]
  - hasMatches: boolean
  - isLoading: boolean
  - errorMessage: string | null
  - validationMessage: string | null
- State transitions:
  - Idle -> Filtering on criteria change.
  - Filtering -> Ready when derived results computed.
  - Ready(hasMatches=false) -> EmptyState.
  - Any -> Error when dataset fails to load (non-core if static import succeeds at build).
  - Any -> ValidationWarning when pokedex input invalid.

## Relationships
- SearchCriteria is applied to Pokemon collection to produce FilterResultState.filteredPokemon.
- Filter order (deterministic):
  1. Name query (case-insensitive partial match)
  2. Type filter (OR semantics)
  3. Pokedex exact/range filter

## Controlled Value Set: PokemonType
- Values: Normal, Fire, Water, Electric, Grass, Ice, Fighting, Poison, Ground, Flying, Psychic, Bug, Rock, Ghost, Dragon
