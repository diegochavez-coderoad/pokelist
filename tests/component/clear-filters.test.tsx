import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import App from '../../src/App'
import { queryCheckIconInBadge, querySelectedCountSummary } from './helpers/pokemonTableQueries'

describe('clear filters', () => {
  it('resets search, type, and pokedex filters', async () => {
    const user = userEvent.setup()
    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Showing 151 of 151')).toBeInTheDocument()
    })

    const searchInput = screen.getByLabelText('Search by name or Pokedex number')

    await user.type(searchInput, 'char')
    await user.click(screen.getByLabelText('Fire'))
    await user.clear(searchInput)
    await user.type(searchInput, '25')
    expect(querySelectedCountSummary()).not.toBeInTheDocument()

    await waitFor(() => {
      expect(
        screen.getByText('No Pokemon match your current filters.'),
      ).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: 'Clear all filters' }))

    await waitFor(() => {
      expect(screen.getByText('Showing 151 of 151')).toBeInTheDocument()
      expect(querySelectedCountSummary()).not.toBeInTheDocument()
      expect(queryCheckIconInBadge('Fire')).not.toBeInTheDocument()
      expect((searchInput as HTMLInputElement).value).toBe('')
      expect(screen.getByText('Bulbasaur')).toBeInTheDocument()
    })
  })
})
