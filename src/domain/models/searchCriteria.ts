export type PokedexFilterMode = 'none' | 'exact' | 'range'

export interface SearchCriteria {
  queryText: string
  selectedTypes: string[]
}

export interface ParsedPokedexFilter {
  mode: PokedexFilterMode
  exact: number | null
  rangeStart: number | null
  rangeEnd: number | null
  validationMessage: string | null
}
