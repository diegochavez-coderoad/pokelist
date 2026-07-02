import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import App from '../../src/App'
import {
  getBadgeFootprint,
  getBadgeLabelLeft,
  querySelectedCountSummary,
  queryCheckIconInBadge,
  getSelectedTypeButtons,
  getTypeFilterButton,
} from './helpers/pokemonTableQueries'

describe('type and pokedex controls', () => {
  it('applies type OR semantics and exact pokedex filter', async () => {
    const user = userEvent.setup()
    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Showing 151 of 151')).toBeInTheDocument()
    })

    await user.click(screen.getByLabelText('Fire'))
    await waitFor(() => {
      expect(screen.getByText('Charizard')).toBeInTheDocument()
      expect(screen.queryByText('Squirtle')).not.toBeInTheDocument()
    })
    expect(screen.getByRole('button', { name: 'Fire' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )

    await user.click(screen.getByLabelText('Flying'))
    await waitFor(() => {
      expect(screen.getByText('Pidgey')).toBeInTheDocument()
    })

    await user.click(screen.getByLabelText('Fire'))
    await user.click(screen.getByLabelText('Flying'))
    expect(screen.getByRole('button', { name: 'Fire' })).toHaveAttribute(
      'aria-pressed',
      'false',
    )

    const pokedexInput = screen.getByLabelText('Search by name or Pokedex number')
    await user.clear(pokedexInput)
    await user.type(pokedexInput, '25')

    await waitFor(() => {
      expect(screen.getByText('Pikachu')).toBeInTheDocument()
      expect(screen.queryByText('Charizard')).not.toBeInTheDocument()
    })
  })

  it('shows iconless selected ring for active types', async () => {
    const user = userEvent.setup()
    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Showing 151 of 151')).toBeInTheDocument()
    })

    const fire = getTypeFilterButton('Fire')
    await user.click(fire)

    expect(fire).toHaveAttribute('aria-pressed', 'true')
    expect(fire).toHaveClass('is-selected')
    expect(queryCheckIconInBadge('Fire')).not.toBeInTheDocument()

    const selectedButtons = getSelectedTypeButtons()
    expect(selectedButtons.map((button) => button.getAttribute('aria-label'))).toEqual(['Fire'])
  })

  it('updates selected count summary as types are toggled', async () => {
    const user = userEvent.setup()
    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Showing 151 of 151')).toBeInTheDocument()
    })

    expect(querySelectedCountSummary()).not.toBeInTheDocument()

    await user.click(getTypeFilterButton('Water'))
    await user.click(getTypeFilterButton('Flying'))
    expect(querySelectedCountSummary()).not.toBeInTheDocument()

    await user.click(getTypeFilterButton('Water'))
    expect(querySelectedCountSummary()).not.toBeInTheDocument()
  })

  it('keeps unselected labels free of odd leading spacing while toggling', async () => {
    const user = userEvent.setup()
    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Showing 151 of 151')).toBeInTheDocument()
    })

    const fire = getTypeFilterButton('Fire')
    const before = getBadgeFootprint('Fire')
    const labelBefore = getBadgeLabelLeft('Fire')

    await user.click(fire)
    const afterSelect = getBadgeFootprint('Fire')
    const labelAfterSelect = getBadgeLabelLeft('Fire')

    await user.click(fire)
    const afterDeselect = getBadgeFootprint('Fire')
    const labelAfterDeselect = getBadgeLabelLeft('Fire')

    expect(afterSelect.width).toBeGreaterThanOrEqual(before.width)
    expect(afterSelect.height).toBe(before.height)
    expect(afterDeselect.width).toBe(before.width)
    expect(afterDeselect.height).toBe(before.height)
    expect(labelAfterDeselect).toBe(labelBefore)
    expect(labelAfterSelect).toBeGreaterThanOrEqual(labelBefore)
  })
})
