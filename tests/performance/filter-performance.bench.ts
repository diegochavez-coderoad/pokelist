import { describe, expect, it } from 'vitest'

import dataset from '../../src/data/pokemon-gen1.json'
import { filterPokemon } from '../../src/domain/filters/filterPokemon'
import { parsePokedexFilter } from '../../src/domain/filters/parsePokedexFilter'

function percentile(sorted: number[], p: number): number {
  if (sorted.length === 0) {
    return 0
  }
  const index = Math.ceil((p / 100) * sorted.length) - 1
  return sorted[Math.max(index, 0)]
}

describe('filter performance budget', () => {
  it('stays within 100ms p95 for 151-record dataset', () => {
    const runs = 300
    const durations: number[] = []

    for (let index = 0; index < runs; index += 1) {
      const start = performance.now()
      filterPokemon({
        pokemonList: dataset,
        nameQuery: 'a',
        selectedTypes: ['Fire', 'Water', 'Flying'],
        parsedPokedex: parsePokedexFilter('1-120'),
      })
      durations.push(performance.now() - start)
    }

    const p95 = percentile([...durations].sort((a, b) => a - b), 95)
    expect(p95).toBeLessThanOrEqual(100)
  })
})
