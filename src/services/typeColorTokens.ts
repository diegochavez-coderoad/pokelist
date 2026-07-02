import {
  CANONICAL_TYPE_COLOR_TOKENS,
  type CanonicalPokemonType,
} from '../domain/models/typeColorToken'

const DEFAULT_TYPE_COLOR_HEX = '#7A8799'

export function getTypeColorHex(type: string): string {
  return CANONICAL_TYPE_COLOR_TOKENS[type as CanonicalPokemonType] ?? DEFAULT_TYPE_COLOR_HEX
}

export function getCanonicalTypeColorTokens() {
  return CANONICAL_TYPE_COLOR_TOKENS
}

export function hexToRgba(hex: string, alpha: number): string {
  const normalized = hex.replace('#', '')
  const expanded =
    normalized.length === 3
      ? normalized
          .split('')
          .map((char) => `${char}${char}`)
          .join('')
      : normalized

  const red = Number.parseInt(expanded.slice(0, 2), 16)
  const green = Number.parseInt(expanded.slice(2, 4), 16)
  const blue = Number.parseInt(expanded.slice(4, 6), 16)

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`
}
