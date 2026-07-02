import { describe, expect, it } from 'vitest'

import dataset from '../../src/data/pokemon-gen1.json'
import { filterPokemon } from '../../src/domain/filters/filterPokemon'
import { parsePokedexFilter } from '../../src/domain/filters/parsePokedexFilter'

describe('filtering contract scenarios', () => {
  it('name query char returns charmander line', () => {
    const result = filterPokemon({
      pokemonList: dataset,
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

  it('type filter fire/flying behaves as OR', () => {
    const result = filterPokemon({
      pokemonList: dataset,
      nameQuery: '',
      selectedTypes: ['Fire', 'Flying'],
      parsedPokedex: parsePokedexFilter(''),
    })

    expect(result.some((entry) => entry.types.includes('Fire') && !entry.types.includes('Flying'))).toBe(
      true,
    )
    expect(result.some((entry) => entry.types.includes('Flying') && !entry.types.includes('Fire'))).toBe(
      true,
    )
    expect(result.every((entry) => entry.types.includes('Fire') || entry.types.includes('Flying'))).toBe(
      true,
    )
    expect(result.some((entry) => entry.name === 'Gyarados')).toBe(true)
    expect(result.some((entry) => entry.name === 'Moltres')).toBe(true)
    expect(result.some((entry) => entry.name === 'Charizard')).toBe(true)
    expect(result.length).toBe(29)
  })

  it('type filter semantics remain unchanged for water/electric OR combinations', () => {
    const result = filterPokemon({
      pokemonList: dataset,
      nameQuery: '',
      selectedTypes: ['Water', 'Electric'],
      parsedPokedex: parsePokedexFilter(''),
    })

    expect(result.every((entry) => entry.types.includes('Water') || entry.types.includes('Electric'))).toBe(
      true,
    )
    expect(result.some((entry) => entry.name === 'Pikachu')).toBe(true)
    expect(result.some((entry) => entry.name === 'Squirtle')).toBe(true)
    expect(result.some((entry) => entry.name === 'Bulbasaur')).toBe(false)
  })

  it('exact pokedex 25 returns Pikachu', () => {
    const result = filterPokemon({
      pokemonList: dataset,
      nameQuery: '',
      selectedTypes: [],
      parsedPokedex: parsePokedexFilter('25'),
    })
    expect(result.map((entry) => entry.name)).toEqual(['Pikachu'])
  })

  it('range 1-3 returns Bulbasaur line', () => {
    const result = filterPokemon({
      pokemonList: dataset,
      nameQuery: '',
      selectedTypes: [],
      parsedPokedex: parsePokedexFilter('1-3'),
    })
    expect(result.map((entry) => entry.name)).toEqual([
      'Bulbasaur',
      'Ivysaur',
      'Venusaur',
    ])
  })

  it('invalid range keeps pokedex filter unapplied', () => {
    const parsed = parsePokedexFilter('50-1')
    expect(parsed.mode).toBe('none')
    expect(parsed.validationMessage).toBeTruthy()

    const result = filterPokemon({
      pokemonList: dataset,
      nameQuery: 'char',
      selectedTypes: [],
      parsedPokedex: parsed,
    })

    expect(result.map((entry) => entry.name)).toEqual([
      'Charmander',
      'Charmeleon',
      'Charizard',
    ])
  })

  it('dataset and filtered outputs remain within generation-1 boundary', () => {
    const allFiltered = filterPokemon({
      pokemonList: dataset,
      nameQuery: '',
      selectedTypes: [],
      parsedPokedex: parsePokedexFilter(''),
    })

    expect(allFiltered).toHaveLength(151)
    expect(allFiltered.every((entry) => entry.pokedexNumber >= 1 && entry.pokedexNumber <= 151)).toBe(
      true,
    )
  })

  it('numeric-intent unified input can still be combined with type filters', () => {
    const result = filterPokemon({
      pokemonList: dataset,
      nameQuery: '',
      selectedTypes: ['Electric'],
      parsedPokedex: parsePokedexFilter('25'),
    })

    expect(result.map((entry) => entry.name)).toEqual(['Pikachu'])
  })
})
