import { describe, expect, it } from 'vitest'

import dataset from '../../src/data/pokemon-gen1.json'
import type { Pokemon } from '../../src/domain/models/pokemon'
import { filterPokemon } from '../../src/domain/filters/filterPokemon'
import { parsePokedexFilter } from '../../src/domain/filters/parsePokedexFilter'
import { mapPokemonToTableRows } from '../../src/services/pokemonTableMapper'

function percentile(sorted: number[], p: number): number {
  if (sorted.length === 0) {
    return 0
  }
  const index = Math.ceil((p / 100) * sorted.length) - 1
  return sorted[Math.max(index, 0)]
}

describe('filter + table mapping performance budget', () => {
  it('stays within 100ms p95 for 151-record dataset', () => {
    const runs = 300
    const durations: number[] = []

    for (let index = 0; index < runs; index += 1) {
      const start = performance.now()
      const filtered = filterPokemon({
        pokemonList: dataset as Pokemon[],
        nameQuery: 'a',
        selectedTypes: ['Fire', 'Water', 'Flying'],
        parsedPokedex: parsePokedexFilter('1-120'),
      })
      mapPokemonToTableRows(filtered)
      durations.push(performance.now() - start)
    }

    const p95 = percentile([...durations].sort((a, b) => a - b), 95)
    expect(p95).toBeLessThanOrEqual(100)
  })
})
