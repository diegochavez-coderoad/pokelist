import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import App from '../../src/App'
import { querySelectedCountSummary } from './helpers/pokemonTableQueries'

describe('status states in dark table context', () => {
  it('shows empty state when no result matches filters', async () => {
    const user = userEvent.setup()
    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Showing 151 of 151')).toBeInTheDocument()
    })

    await user.type(
      screen.getByLabelText('Search by name or Pokedex number'),
      'no-match-mon',
    )

    await waitFor(() => {
      expect(screen.getByText('No Pokemon match your current filters.')).toBeInTheDocument()
    })
  })

  it('shows validation feedback for invalid pokedex range', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByLabelText('Search by name or Pokedex number')
    await user.type(input, '200-10')

    expect(
      await screen.findByText('Enter a range within 1-151 (for example, 1-50).'),
    ).toBeInTheDocument()
  })

  it('keeps background presentation stable while toggling type filters', async () => {
    const user = userEvent.setup()
    render(<App />)

    const initialBodyClass = document.body.className
    const initialStyleAttribute = document.body.getAttribute('style')

    await waitFor(() => {
      expect(screen.getByText('Showing 151 of 151')).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: 'Grass' }))
    await user.click(screen.getByRole('button', { name: 'Poison' }))
    await user.click(screen.getByRole('button', { name: 'Grass' }))

    expect(querySelectedCountSummary()).not.toBeInTheDocument()
    expect(document.body.className).toBe(initialBodyClass)
    expect(document.body.getAttribute('style')).toBe(initialStyleAttribute)
  })

  it('retains viewport-anchored background style configuration', () => {
    render(<App />)

    const bodyStyles = getComputedStyle(document.body)
    expect(bodyStyles.backgroundAttachment).toBe('fixed')
    expect(bodyStyles.minHeight).toBe('100vh')
  })
})
