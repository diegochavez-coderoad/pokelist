import type { Pokemon } from '../domain/models/pokemon'
import rawPokemon from '../data/pokemon-gen1.json'

function isValidSpriteSlug(value: string): boolean {
  return /^[a-z0-9-]+$/.test(value)
}

function isValidPokemon(value: unknown): value is Pokemon {
  if (!value || typeof value !== 'object') {
    return false
  }

  const candidate = value as Partial<Pokemon>

  return (
    typeof candidate.id === 'number' &&
    typeof candidate.pokedexNumber === 'number' &&
    typeof candidate.name === 'string' &&
    typeof candidate.spriteSlug === 'string' &&
    isValidSpriteSlug(candidate.spriteSlug) &&
    Array.isArray(candidate.types) &&
    candidate.types.every((type) => typeof type === 'string')
  )
}

export async function loadPokemon(): Promise<Pokemon[]> {
  const mapped = (rawPokemon as unknown[]).filter(isValidPokemon)

  mapped.sort((a, b) => a.pokedexNumber - b.pokedexNumber)

  return mapped
}
