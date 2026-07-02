import { describe, expect, it } from 'vitest'

import dataset from '../../src/data/pokemon-gen1.json'
import { filterPokemon } from '../../src/domain/filters/filterPokemon'
import { parsePokedexFilter } from '../../src/domain/filters/parsePokedexFilter'

describe('filterPokemon name matching', () => {
  it('matches case-insensitive partial queries', () => {
    const result = filterPokemon({
      pokemonList: dataset,
      nameQuery: 'CHAR',
      selectedTypes: [],
      parsedPokedex: parsePokedexFilter(''),
    })

    expect(result.map((entry) => entry.name)).toEqual([
      'Charmander',
      'Charmeleon',
      'Charizard',
    ])
  })

  it('trims leading and trailing spaces in query', () => {
    const result = filterPokemon({
      pokemonList: dataset,
      nameQuery: '  pika  ',
      selectedTypes: [],
      parsedPokedex: parsePokedexFilter(''),
    })

    expect(result.map((entry) => entry.name)).toEqual(['Pikachu'])
  })
})
