import type { ParsedPokedexFilter } from '../models/searchCriteria'

const MIN_POKEDEX = 1
const MAX_POKEDEX = 151

function isOutOfRange(value: number): boolean {
  return value < MIN_POKEDEX || value > MAX_POKEDEX
}

export function parsePokedexFilter(input: string): ParsedPokedexFilter {
  const normalized = input.trim()

  if (!normalized) {
    return {
      mode: 'none',
      exact: null,
      rangeStart: null,
      rangeEnd: null,
      validationMessage: null,
    }
  }

  const exactMatch = normalized.match(/^\d+$/)
  if (exactMatch) {
    const exact = Number.parseInt(normalized, 10)
    if (isOutOfRange(exact)) {
      return {
        mode: 'none',
        exact: null,
        rangeStart: null,
        rangeEnd: null,
        validationMessage: 'Enter a Pokedex number between 1 and 151.',
      }
    }

    return {
      mode: 'exact',
      exact,
      rangeStart: null,
      rangeEnd: null,
      validationMessage: null,
    }
  }

  const rangeMatch = normalized.match(/^(\d+)\s*-\s*(\d+)$/)
  if (rangeMatch) {
    const start = Number.parseInt(rangeMatch[1], 10)
    const end = Number.parseInt(rangeMatch[2], 10)

    if (isOutOfRange(start) || isOutOfRange(end)) {
      return {
        mode: 'none',
        exact: null,
        rangeStart: null,
        rangeEnd: null,
        validationMessage: 'Enter a range within 1-151 (for example, 1-50).',
      }
    }

    if (start > end) {
      return {
        mode: 'none',
        exact: null,
        rangeStart: null,
        rangeEnd: null,
        validationMessage: 'Range start must be less than or equal to range end.',
      }
    }

    return {
      mode: 'range',
      exact: null,
      rangeStart: start,
      rangeEnd: end,
      validationMessage: null,
    }
  }

  return {
    mode: 'none',
    exact: null,
    rangeStart: null,
    rangeEnd: null,
    validationMessage:
      'Use an exact number (for example, 25) or range (for example, 1-50).',
  }
}
