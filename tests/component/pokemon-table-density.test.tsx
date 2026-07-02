import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import App from '../../src/App'

describe('pokemon table density', () => {
  it('renders sprite thumbnails at 28px target size', async () => {
    const user = userEvent.setup()
    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Showing 151 of 151')).toBeInTheDocument()
    })

    await user.type(screen.getByLabelText('Search by name or Pokedex number'), 'pikachu')

    const sprite = await screen.findByRole('img', { name: 'Pikachu sprite' })
    expect(sprite).toHaveAttribute('width', '28')
    expect(sprite).toHaveAttribute('height', '28')
  })
})
