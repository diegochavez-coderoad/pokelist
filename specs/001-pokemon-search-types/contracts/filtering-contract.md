# Filtering Contract

## Purpose
Define the expected behavior of the Pokelist filtering module and UI interaction contract.

## Inputs
- pokemonList: Pokemon[] (first-generation only)
- criteria: SearchCriteria

## Output
- FilterResultState

## Behavioral Rules
1. Name filtering
- Match is case-insensitive partial containment on Pokemon.name.
- Empty nameQuery means no name constraint.

2. Type filtering
- selectedTypes empty means no type constraint.
- One or more selected types apply OR matching: Pokemon matches when any of its types is selected.

3. Pokedex filtering
- Supports exact value (for example 25) OR inclusive range (for example 1-50).
- Exact and range are mutually exclusive at evaluation time.
- Valid values are bounded to 1..151.

4. Invalid Pokedex input
- If exact or range input is invalid:
  - Do not apply the pokedex filter.
  - Preserve other valid filters.
  - Return validationMessage with user-facing guidance.

5. Empty results
- If no records match active valid filters, hasMatches=false and UI must show no-results state.

## Contract Test Scenarios (minimum)
1. Name query "char" returns Charmander, Charmeleon, Charizard.
2. Type filter {"Fire","Flying"} includes Pokemon that have either type.
3. Exact pokedex 25 returns Pikachu only.
4. Range 1-3 returns Bulbasaur, Ivysaur, Venusaur.
5. Invalid range 50-1 produces validationMessage and leaves pokedex filter unapplied.
6. Combined criteria name+type+pokedex applies all valid constraints deterministically.
