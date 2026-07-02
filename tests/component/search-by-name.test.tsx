import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import App from '../../src/App'

describe('search by name UI', () => {
  it('filters list by partial name and resets when cleared', async () => {
    const user = userEvent.setup()
    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Showing 151 of 151')).toBeInTheDocument()
    })

    const input = screen.getByLabelText('Search by name or Pokedex number')
    const initialHref = window.location.href
    await user.type(input, 'char')

    await waitFor(() => {
      expect(screen.getByText('Charmander')).toBeInTheDocument()
      expect(screen.queryByText('Bulbasaur')).not.toBeInTheDocument()
    })

    await user.clear(input)

    await waitFor(() => {
      expect(screen.getByText('Showing 151 of 151')).toBeInTheDocument()
      expect(screen.getByText('Bulbasaur')).toBeInTheDocument()
    })

    expect(window.location.href).toBe(initialHref)
  })
})
