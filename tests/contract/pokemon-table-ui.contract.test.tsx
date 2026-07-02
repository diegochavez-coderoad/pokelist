import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'

import dataset from '../../src/data/pokemon-gen1.json'
import { TypeFilterPanel } from '../../src/components/TypeFilterPanel'
import type { Pokemon } from '../../src/domain/models/pokemon'
import { mapPokemonToTableRows } from '../../src/services/pokemonTableMapper'
import { getSilhouetteSpriteUrl } from '../../src/services/spriteResolver'
import { getCanonicalTypeColorTokens, getTypeColorHex } from '../../src/services/typeColorTokens'

describe('pokemon table UI contract', () => {
  it('maps rows with required table fields', () => {
    const rows = mapPokemonToTableRows(dataset as Pokemon[])

    expect(rows).toHaveLength(151)
    expect(rows[0]).toMatchObject({
      pokedexNumberLabel: '#001',
      name: 'Bulbasaur',
    })
    expect(rows[0].types.length).toBeGreaterThanOrEqual(1)
  })

  it('uses non-fallback sprite for known bundled asset', () => {
    const rows = mapPokemonToTableRows(dataset as Pokemon[])
    const pikachu = rows.find((row) => row.name === 'Pikachu')

    expect(pikachu).toBeDefined()
    expect(pikachu?.usesFallbackSilhouette).toBe(false)
    expect(pikachu?.spriteSrc).toBeTruthy()
    expect(pikachu?.spriteSrc).not.toBe(getSilhouetteSpriteUrl())
  })

  it('assembles expected PokemonDB URL format when local sprite is not bundled', () => {
    const rows = mapPokemonToTableRows(dataset as Pokemon[])
    const dratini = rows.find((row) => row.name === 'Dratini')

    expect(dratini).toBeDefined()
    expect(dratini?.spriteSrc).toBe('https://img.pokemondb.net/sprites/silver/normal/dratini.png')
    expect(dratini?.usesFallbackSilhouette).toBe(false)
  })

  it('exposes canonical type-color mapping values', () => {
    const tokens = getCanonicalTypeColorTokens()

    expect(tokens.Normal).toBe('#A8A878')
    expect(tokens.Fire).toBe('#F08030')
    expect(tokens.Water).toBe('#6890F0')
    expect(tokens.Electric).toBe('#F8D030')
    expect(tokens.Grass).toBe('#78C850')
    expect(tokens.Ice).toBe('#98D8D8')
    expect(tokens.Fighting).toBe('#C03028')
    expect(tokens.Poison).toBe('#A040A0')
    expect(tokens.Ground).toBe('#E0C068')
    expect(tokens.Flying).toBe('#A890F0')
    expect(tokens.Psychic).toBe('#F85888')
    expect(tokens.Bug).toBe('#A8B820')
    expect(tokens.Rock).toBe('#B8A038')
    expect(tokens.Ghost).toBe('#705898')
    expect(tokens.Dragon).toBe('#7038F8')
    expect(tokens.Dark).toBe('#705848')
    expect(tokens.Steel).toBe('#B8B8D0')
    expect(tokens.Fairy).toBe('#EE99AC')
  })

  it('maps row type buttons with canonical colors', () => {
    const rows = mapPokemonToTableRows(dataset as Pokemon[])
    const pikachu = rows.find((row) => row.name === 'Pikachu')

    expect(pikachu).toBeDefined()
    expect(pikachu?.rowTypeButtons).toHaveLength(1)
    expect(pikachu?.rowTypeButtons[0].label).toBe('Electric')
    expect(pikachu?.rowTypeButtons[0].colorHex).toBe(getTypeColorHex('Electric'))
    expect(pikachu?.rowTypeButtons[0].showsSelectedMarker).toBe(false)
    expect(pikachu?.rowTypeButtons[0].showsStrongSelectedRing).toBe(false)
  })

  it('renders iconless selected ring semantics and no selected summary text', async () => {
    const { rerender } = render(
      <TypeFilterPanel
        selectedTypes={[]}
        onToggleType={() => {}}
      />,
    )

    expect(screen.queryByText(/Selected:\s*\d+/i)).not.toBeInTheDocument()

    const fire = screen.getByRole('button', { name: 'Fire' })
    expect(fire).toHaveAttribute('data-selected', 'false')
    const beforeStyles = getComputedStyle(fire)

    rerender(
      <TypeFilterPanel
        selectedTypes={['Fire']}
        onToggleType={() => {}}
      />,
    )

    const selectedFire = screen.getByRole('button', { name: 'Fire' })
    const selectedStyles = getComputedStyle(selectedFire)
    expect(selectedFire).toHaveAttribute('aria-pressed', 'true')
    expect(selectedFire).toHaveClass('is-selected')
    expect(within(selectedFire).queryByText('✓')).not.toBeInTheDocument()
    expect(screen.queryByText(/Selected:\s*\d+/i)).not.toBeInTheDocument()
    expect(selectedStyles.borderWidth).toBe(beforeStyles.borderWidth)
    expect(selectedStyles.paddingLeft).toBe(beforeStyles.paddingLeft)
    expect(selectedStyles.paddingRight).toBe(beforeStyles.paddingRight)
  })
})
