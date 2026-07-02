import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import App from '../../src/App'

describe('pokemon list fields', () => {
  it('renders name, pokedex number, and type information', async () => {
    const user = userEvent.setup()
    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Showing 151 of 151')).toBeInTheDocument()
    })

    await user.type(screen.getByLabelText('Search by name or Pokedex number'), 'pikachu')

    await waitFor(() => {
      expect(screen.getByText('Pikachu')).toBeInTheDocument()
      expect(screen.getByText('#025')).toBeInTheDocument()
      expect(screen.getByText('Electric', { selector: '.type-badge' })).toBeInTheDocument()
    })
  })
})
