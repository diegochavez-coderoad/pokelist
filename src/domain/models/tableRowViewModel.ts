export interface TypeButtonViewModel {
  type: string
  label: string
  colorHex: string
  isInteractive: boolean
  isSelected: boolean
  showsSelectedMarker: boolean
  showsStrongSelectedRing: boolean
}

export interface TableRowViewModel {
  id: number
  pokedexNumberLabel: string
  name: string
  types: string[]
  typesLabel: string
  rowTypeButtons: TypeButtonViewModel[]
  spriteSrc: string | null
  spriteAlt: string
  usesFallbackSilhouette: boolean
}
