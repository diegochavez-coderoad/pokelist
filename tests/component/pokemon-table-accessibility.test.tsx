import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import App from '../../src/App'
import { queryCheckIconInBadge, querySelectedCountSummary } from './helpers/pokemonTableQueries'

describe('pokemon table accessibility', () => {
  it('renders semantic table and keeps keyboard usable filters', async () => {
    const user = userEvent.setup()
    render(<App />)

    await waitFor(() => {
      expect(screen.getByRole('table', { name: 'Pokemon results table' })).toBeInTheDocument()
    })

    const search = screen.getByLabelText('Search by name or Pokedex number')
    search.focus()
    await user.keyboard('pika')

    await waitFor(() => {
      expect(screen.getByText('Pikachu')).toBeInTheDocument()
    })
  })

  it('supports keyboard toggles with perceivable selected-state feedback', async () => {
    const user = userEvent.setup()
    render(<App />)

    await waitFor(() => {
      expect(screen.getByRole('table', { name: 'Pokemon results table' })).toBeInTheDocument()
    })

    await user.tab()
    await user.tab()
    await user.keyboard('[Enter]')

    const normalButton = screen.getByRole('button', { name: 'Normal' })
    expect(normalButton).toHaveAttribute('aria-pressed', 'true')
    expect(normalButton).toHaveClass('is-selected')
    expect(queryCheckIconInBadge('Normal')).not.toBeInTheDocument()
    expect(querySelectedCountSummary()).not.toBeInTheDocument()
  })
})
