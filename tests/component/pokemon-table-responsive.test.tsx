import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import App from '../../src/App'
import {
  getBadgeLeft,
  getBadgeLabelLeft,
  queryCheckIconInBadge,
  querySelectedCountSummary,
} from './helpers/pokemonTableQueries'

describe('pokemon table responsive behavior', () => {
  const originalWidth = window.innerWidth

  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, writable: true, value: 375 })
    window.dispatchEvent(new Event('resize'))
  })

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, writable: true, value: originalWidth })
    window.dispatchEvent(new Event('resize'))
  })

  it('keeps table inside overflow-safe scroll container on mobile width', async () => {
    const user = userEvent.setup()
    render(<App />)

    await waitFor(() => {
      expect(screen.getByRole('table', { name: 'Pokemon results table' })).toBeInTheDocument()
    })

    expect(screen.getByRole('region', { name: 'Pokemon table container' })).toBeInTheDocument()

    await user.type(screen.getByLabelText('Search by name or Pokedex number'), 'charizard')

    await waitFor(() => {
      expect(screen.getByText('Charizard')).toBeInTheDocument()
      expect(screen.getByText('Fire', { selector: '.type-badge' })).toBeInTheDocument()
      expect(screen.getByText('Flying', { selector: '.type-badge' })).toBeInTheDocument()
    })
  })

  it('keeps selected ring readable and iconless on mobile viewports', async () => {
    const user = userEvent.setup()
    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Showing 151 of 151')).toBeInTheDocument()
    })

    const electric = screen.getByRole('button', { name: 'Electric' })
    const beforeWaterLeft = getBadgeLeft('Water')
    const beforeElectricLabelLeft = getBadgeLabelLeft('Electric')
    await user.click(electric)

    expect(electric).toHaveClass('is-selected')
    expect(queryCheckIconInBadge('Electric')).not.toBeInTheDocument()
    expect(querySelectedCountSummary()).not.toBeInTheDocument()
    expect(getBadgeLabelLeft('Electric')).toBeGreaterThanOrEqual(beforeElectricLabelLeft)

    await user.click(screen.getByRole('button', { name: 'Water' }))
    await user.click(screen.getByRole('button', { name: 'Flying' }))
    const afterWaterLeft = getBadgeLeft('Water')
    expect(afterWaterLeft).toBe(beforeWaterLeft)
  })
})
