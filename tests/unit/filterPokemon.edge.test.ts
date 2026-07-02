import { describe, expect, it } from 'vitest'

import dataset from '../../src/data/pokemon-gen1.json'
import { filterPokemon } from '../../src/domain/filters/filterPokemon'
import { parsePokedexFilter } from '../../src/domain/filters/parsePokedexFilter'

describe('filterPokemon edge cases', () => {
  it('returns full list when no filters are applied', () => {
    const result = filterPokemon({
      pokemonList: dataset,
      nameQuery: '',
      selectedTypes: [],
      parsedPokedex: parsePokedexFilter(''),
    })

    expect(result).toHaveLength(151)
  })

  it('preserves valid filters when pokedex input is invalid', () => {
    const result = filterPokemon({
      pokemonList: dataset,
      nameQuery: 'char',
      selectedTypes: [],
      parsedPokedex: parsePokedexFilter('200'),
    })

    expect(result.map((entry) => entry.name)).toEqual([
      'Charmander',
      'Charmeleon',
      'Charizard',
    ])
  })
})
