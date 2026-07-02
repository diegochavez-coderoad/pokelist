import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import App from '../../src/App'

describe('pokedex validation behavior', () => {
  it('shows validation and keeps valid filters applied', async () => {
    const user = userEvent.setup()
    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Showing 151 of 151')).toBeInTheDocument()
    })

    const input = screen.getByLabelText('Search by name or Pokedex number')
    await user.click(screen.getByLabelText('Fire'))
    await user.type(input, '200')

    await waitFor(() => {
      expect(
        screen.getByText('Enter a Pokedex number between 1 and 151.'),
      ).toBeInTheDocument()
      expect(screen.getByText('Charmander')).toBeInTheDocument()
      expect(screen.queryByText('Bulbasaur')).not.toBeInTheDocument()
    })
  })
})
