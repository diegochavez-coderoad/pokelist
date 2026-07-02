import type { Pokemon } from '../models/pokemon'
import type { ParsedPokedexFilter } from '../models/searchCriteria'

interface FilterInput {
  pokemonList: Pokemon[]
  nameQuery: string
  selectedTypes: string[]
  parsedPokedex: ParsedPokedexFilter
}

function matchesName(pokemon: Pokemon, query: string): boolean {
  if (!query) {
    return true
  }
  return pokemon.name.toLowerCase().includes(query.toLowerCase())
}

function matchesType(pokemon: Pokemon, selectedTypes: string[]): boolean {
  if (selectedTypes.length === 0) {
    return true
  }
  return pokemon.types.some((type) => selectedTypes.includes(type))
}

function matchesPokedex(pokemon: Pokemon, parsedPokedex: ParsedPokedexFilter): boolean {
  if (parsedPokedex.mode === 'none') {
    return true
  }

  if (parsedPokedex.mode === 'exact') {
    return pokemon.pokedexNumber === parsedPokedex.exact
  }

  return (
    pokemon.pokedexNumber >= (parsedPokedex.rangeStart ?? 1) &&
    pokemon.pokedexNumber <= (parsedPokedex.rangeEnd ?? 151)
  )
}

export function filterPokemon({
  pokemonList,
  nameQuery,
  selectedTypes,
  parsedPokedex,
}: FilterInput): Pokemon[] {
  const normalizedQuery = nameQuery.trim()

  return pokemonList.filter(
    (pokemon) =>
      matchesName(pokemon, normalizedQuery) &&
      matchesType(pokemon, selectedTypes) &&
      matchesPokedex(pokemon, parsedPokedex),
  )
}
