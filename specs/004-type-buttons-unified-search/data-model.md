# Data Model: Type Buttons And Unified Search Input

## Entity: UnifiedSearchCriteria
- Description: Single user-entered text value interpreted for name and pokedex filtering intents.
- Fields:
  - queryText: string (raw input value)
  - parsedNameQuery: string (trimmed text for name matching)
  - parsedPokedex: ParsedPokedexFilter (existing exact/range/validation representation)
- Validation rules:
  - Empty query keeps filters unapplied.
  - Invalid numeric/range values preserve current validation semantics.

## Entity: TypeColorToken
- Description: Canonical mapping between Pokemon type labels and deterministic hex colors.
- Fields:
  - type: string (e.g., Fire, Water)
  - hex: string (canonical value, e.g., #F08030)
- Validation rules:
  - Type tokens must be unique per type key.
  - Hex values must be stable and explicit in specification contract.

## Entity: TypeButtonViewModel
- Description: UI-facing representation for a type-style button used in filters and rows.
- Fields:
  - type: string
  - label: string
  - colorHex: string
  - isSelected: boolean (filter controls)
  - isInteractive: boolean (true for filter buttons, false for row labels)
- Validation rules:
  - Filter buttons must remain keyboard-operable.
  - Row labels must remain readable on dark surfaces.

## Entity: FilteredTableRowView
- Description: Existing result row model extended with type-button presentation token references.
- Fields:
  - id: number
  - pokedexNumberLabel: string
  - name: string
  - spriteSrc: string | null
  - types: string[]
  - rowTypeButtons: TypeButtonViewModel[]
- Validation rules:
  - Row order remains deterministic by existing behavior.
  - One or two type buttons per row must render without clipping key content.

## Relationships
- UnifiedSearchCriteria + Pokemon[] -> filtered result set.
- TypeColorToken + type label -> TypeButtonViewModel.
- FilteredTableRowView consumes TypeButtonViewModel in table UI.

## State Transitions
1. Query input change -> parse query for name + pokedex intent.
2. Criteria evaluation -> recompute filtered set with unchanged semantics.
3. Filter/type toggle -> recompute filtered set and button selected states.
4. Status rendering -> loading/empty/error/validation remains perceivable.
