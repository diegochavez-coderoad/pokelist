import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import App from '../../src/App'
import {
  getBadgeLeft,
  getBadgeLabelLeft,
  getTableBodyRows,
  querySelectedCountSummary,
} from './helpers/pokemonTableQueries'

describe('filter controls with table results', () => {
  it('updates table rows as filters change', async () => {
    const user = userEvent.setup()
    render(<App />)
    const initialHref = window.location.href

    await waitFor(() => {
      expect(screen.getByText('Showing 151 of 151')).toBeInTheDocument()
    })

    await user.click(screen.getByLabelText('Electric'))

    await waitFor(() => {
      expect(screen.getByText('Pikachu')).toBeInTheDocument()
      expect(screen.queryByText('Bulbasaur')).not.toBeInTheDocument()
    })

    expect(getTableBodyRows().length).toBeGreaterThan(0)
    expect(window.location.href).toBe(initialHref)
  })

  it('keeps location/navigation stable across repeated type toggles', async () => {
    const user = userEvent.setup()
    render(<App />)

    const initialHref = window.location.href
    const initialPathname = window.location.pathname
    const initialSearch = window.location.search

    await waitFor(() => {
      expect(screen.getByText('Showing 151 of 151')).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: 'Fire' }))
    await user.click(screen.getByRole('button', { name: 'Water' }))
    await user.click(screen.getByRole('button', { name: 'Fire' }))
    await user.click(screen.getByRole('button', { name: 'Water' }))

    expect(querySelectedCountSummary()).not.toBeInTheDocument()
    expect(window.location.href).toBe(initialHref)
    expect(window.location.pathname).toBe(initialPathname)
    expect(window.location.search).toBe(initialSearch)
  })

  it('keeps neighboring badge positions stable during repeated toggles', async () => {
    const user = userEvent.setup()
    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Showing 151 of 151')).toBeInTheDocument()
    })

    const beforeWaterLeft = getBadgeLeft('Water')
    const beforeWaterLabelLeft = getBadgeLabelLeft('Water')

    await user.click(screen.getByRole('button', { name: 'Fire' }))
    await user.click(screen.getByRole('button', { name: 'Fire' }))
    await user.click(screen.getByRole('button', { name: 'Fire' }))

    const afterWaterLeft = getBadgeLeft('Water')
    const afterWaterLabelLeft = getBadgeLabelLeft('Water')
    expect(afterWaterLeft).toBe(beforeWaterLeft)
    expect(afterWaterLabelLeft).toBe(beforeWaterLabelLeft)
  })
})
