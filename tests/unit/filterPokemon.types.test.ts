import { describe, expect, it } from 'vitest'

import dataset from '../../src/data/pokemon-gen1.json'
import { filterPokemon } from '../../src/domain/filters/filterPokemon'
import { parsePokedexFilter } from '../../src/domain/filters/parsePokedexFilter'

describe('filterPokemon type semantics', () => {
  it('applies OR semantics across selected types', () => {
    const result = filterPokemon({
      pokemonList: dataset,
      nameQuery: '',
      selectedTypes: ['Fire', 'Flying'],
      parsedPokedex: parsePokedexFilter(''),
    })

    expect(result.some((entry) => entry.name === 'Charizard')).toBe(true)
    expect(result.some((entry) => entry.name === 'Moltres')).toBe(true)
    expect(result.some((entry) => entry.name === 'Pikachu')).toBe(false)
  })
})
