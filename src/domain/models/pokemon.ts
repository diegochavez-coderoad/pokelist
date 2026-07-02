export const POKEMON_TYPES = [
  'Normal',
  'Fire',
  'Water',
  'Electric',
  'Grass',
  'Ice',
  'Fighting',
  'Poison',
  'Ground',
  'Flying',
  'Psychic',
  'Bug',
  'Rock',
  'Ghost',
  'Dragon',
] as const

export type PokemonType = (typeof POKEMON_TYPES)[number]

export interface Pokemon {
  id: number
  pokedexNumber: number
  name: string
  types: string[]
  spriteSlug: string
}
