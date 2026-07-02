import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { PokemonTable } from '../../src/components/PokemonTable'

describe('pokemon table shell snapshot', () => {
  it('matches baseline dense table shell', () => {
    const { container } = render(
      <PokemonTable
        rows={[
          {
            id: 25,
            pokedexNumberLabel: '#025',
            name: 'Pikachu',
            types: ['Electric'],
            typesLabel: 'Electric',
            rowTypeButtons: [
              {
                type: 'Electric',
                label: 'Electric',
                colorHex: '#F8D030',
                isInteractive: false,
                isSelected: false,
                showsSelectedMarker: false,
                showsStrongSelectedRing: false,
              },
            ],
            spriteSrc: '/assets/pokemon/sprites/pikachu.svg',
            spriteAlt: 'Pikachu sprite',
            usesFallbackSilhouette: false,
          },
        ]}
      />,
    )

    expect(container.firstChild).toMatchSnapshot()
  })
})
