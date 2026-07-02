# Unified Search + Type Button UI Contract

## Purpose
Define externally verifiable behavior for single-input search parsing and
consistent type-button rendering across filter controls and table rows.

## Inputs
- pokemonList: Pokemon[]
- unifiedSearchQuery: string
- selectedTypes: string[]
- typeColorTokens: canonical type->hex mapping

## Output
- Filtered rows with type-button presentation and status states.

## Contract Rules
1. Unified search input
- A single input MUST accept both name query text and pokedex query text.
- Name matching MUST stay case-insensitive and partial.
- Exact and range numeric semantics MUST remain consistent with existing behavior.

2. Invalid numeric/range behavior
- Invalid numeric/range query MUST keep numeric filter unapplied.
- Validation feedback MUST remain perceivable and explicit.

3. Type-button rendering consistency
- Filter control types MUST be rendered as type-style buttons.
- Table row types MUST use the same type-button visual language.
- Type-button labels MUST remain readable in primary desktop/mobile viewports.

4. Canonical type colors
- Type button colors MUST use explicit canonical hex mapping:
  - Normal #A8A878, Fire #F08030, Water #6890F0, Electric #F8D030, Grass #78C850
  - Ice #98D8D8, Fighting #C03028, Poison #A040A0, Ground #E0C068, Flying #A890F0
  - Psychic #F85888, Bug #A8B820, Rock #B8A038, Ghost #705898, Dragon #7038F8
  - Dark #705848, Steel #B8B8D0, Fairy #EE99AC

5. Scope and continuity
- Generation-1 row scope remains unchanged.
- Loading/empty/error/validation states remain explicit and perceivable.
- Filtering updates remain dynamic and do not require full-page refresh.

## Minimum Contract Test Scenarios
1. Single input text query finds expected name matches.
2. Single input exact numeric query returns exact pokedex match.
3. Single input range query returns inclusive range results.
4. Invalid numeric/range query shows validation and does not apply numeric filter.
5. Filter controls render types as buttons with canonical colors.
6. Table rows render row type labels as buttons with canonical colors.
7. Existing empty/loading/error states still render accessibly with new UI style.
