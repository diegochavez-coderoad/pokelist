import type { Pokemon } from './pokemon'

export interface FilterResultState {
  filteredPokemon: Pokemon[]
  hasMatches: boolean
  isLoading: boolean
  errorMessage: string | null
  validationMessage: string | null
}
