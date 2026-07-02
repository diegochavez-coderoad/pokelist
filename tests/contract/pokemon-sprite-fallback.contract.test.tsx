import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { PokemonSpriteCell } from '../../src/components/PokemonSpriteCell'

describe('pokemon sprite fallback contract', () => {
  it('renders fallback silhouette when sprite source is missing', () => {
    render(<PokemonSpriteCell name="Missingno" spriteSrc={null} />)

    const image = screen.getByRole('img', { name: 'Missingno silhouette placeholder' })
    expect(image).toHaveAttribute('data-fallback', 'true')
  })

  it('switches to fallback on image load error', () => {
    render(<PokemonSpriteCell name="Pikachu" spriteSrc="/not-found.png" />)

    const image = screen.getByRole('img', { name: 'Pikachu sprite' })
    fireEvent.error(image)

    expect(screen.getByRole('img', { name: 'Pikachu silhouette placeholder' })).toHaveAttribute(
      'data-fallback',
      'true',
    )
  })
})
