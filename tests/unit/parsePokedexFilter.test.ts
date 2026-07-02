import { describe, expect, it } from 'vitest'

import { parsePokedexFilter } from '../../src/domain/filters/parsePokedexFilter'

describe('parsePokedexFilter', () => {
  it('parses exact number input', () => {
    expect(parsePokedexFilter('25')).toEqual({
      mode: 'exact',
      exact: 25,
      rangeStart: null,
      rangeEnd: null,
      validationMessage: null,
    })
  })

  it('parses valid range input', () => {
    expect(parsePokedexFilter('1-50')).toEqual({
      mode: 'range',
      exact: null,
      rangeStart: 1,
      rangeEnd: 50,
      validationMessage: null,
    })
  })

  it('returns validation error for reversed range', () => {
    const parsed = parsePokedexFilter('50-1')
    expect(parsed.mode).toBe('none')
    expect(parsed.validationMessage).toContain('Range start')
  })

  it('returns validation error for out-of-range value', () => {
    const parsed = parsePokedexFilter('200')
    expect(parsed.mode).toBe('none')
    expect(parsed.validationMessage).toContain('between 1 and 151')
  })
})
