import type { Pokemon } from '../domain/models/pokemon'
import type { TableRowViewModel } from '../domain/models/tableRowViewModel'
import {
  buildSourceSpriteUrl,
  getSilhouetteSpriteUrl,
  resolveSpriteMapping,
} from './spriteResolver'
import { getTypeColorHex } from './typeColorTokens'

function formatPokedexNumber(value: number): string {
  return `#${value.toString().padStart(3, '0')}`
}

export function mapPokemonToTableRows(pokemon: Pokemon[]): TableRowViewModel[] {
  return pokemon.map((entry) => {
    const sprite = resolveSpriteMapping(entry.spriteSlug)
    const sourceUrl = buildSourceSpriteUrl(entry.spriteSlug)
    const spriteSrc = sprite.localAssetPath ?? sourceUrl
    const usesFallbackSilhouette = spriteSrc === null

    return {
      id: entry.id,
      pokedexNumberLabel: formatPokedexNumber(entry.pokedexNumber),
      name: entry.name,
      types: entry.types,
      typesLabel: entry.types.join(' / '),
      rowTypeButtons: entry.types.map((type) => ({
        type,
        label: type,
        colorHex: getTypeColorHex(type),
        isInteractive: false,
        isSelected: false,
        showsSelectedMarker: false,
        showsStrongSelectedRing: false,
      })),
      spriteSrc: usesFallbackSilhouette ? getSilhouetteSpriteUrl() : spriteSrc,
      spriteAlt: usesFallbackSilhouette
        ? `${entry.name} silhouette placeholder`
        : `${entry.name} sprite`,
      usesFallbackSilhouette,
    }
  })
}
