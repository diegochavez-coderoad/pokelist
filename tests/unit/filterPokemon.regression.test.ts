import { describe, expect, it } from 'vitest'

import dataset from '../../src/data/pokemon-gen1.json'
import type { Pokemon } from '../../src/domain/models/pokemon'
import { filterPokemon } from '../../src/domain/filters/filterPokemon'
import { parsePokedexFilter } from '../../src/domain/filters/parsePokedexFilter'

const pokemonDataset = dataset as Pokemon[]

describe('filterPokemon regressions with spriteSlug', () => {
  it('preserves name matching behavior', () => {
    const result = filterPokemon({
      pokemonList: pokemonDataset,
      nameQuery: 'char',
      selectedTypes: [],
      parsedPokedex: parsePokedexFilter(''),
    })

    expect(result.map((entry) => entry.name)).toEqual([
      'Charmander',
      'Charmeleon',
      'Charizard',
    ])
  })

  it('preserves type OR behavior', () => {
    const result = filterPokemon({
      pokemonList: pokemonDataset,
      nameQuery: '',
      selectedTypes: ['Fire', 'Flying'],
      parsedPokedex: parsePokedexFilter(''),
    })

    expect(result.some((entry) => entry.name === 'Moltres')).toBe(true)
    expect(result.some((entry) => entry.name === 'Charizard')).toBe(true)
  })

  it('keeps invalid pokedex input from overriding other filters', () => {
    const parsed = parsePokedexFilter('50-1')
    const result = filterPokemon({
      pokemonList: pokemonDataset,
      nameQuery: 'char',
      selectedTypes: [],
      parsedPokedex: parsed,
    })

    expect(parsed.mode).toBe('none')
    expect(result.map((entry) => entry.name)).toEqual([
      'Charmander',
      'Charmeleon',
      'Charizard',
    ])
  })
})
