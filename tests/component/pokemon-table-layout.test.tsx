import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import App from '../../src/App'
import { getTableBodyRows, getPokemonTable } from './helpers/pokemonTableQueries'

describe('pokemon table layout', () => {
  it('renders a table with required columns and results', async () => {
    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Showing 151 of 151')).toBeInTheDocument()
    })

    const table = getPokemonTable()
    expect(table).toBeInTheDocument()

    expect(screen.getByRole('columnheader', { name: 'Pokedex number' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Sprite' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Type' })).toBeInTheDocument()

    const rows = getTableBodyRows()
    expect(rows.length).toBe(151)
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument()
    expect(screen.getByText('#001')).toBeInTheDocument()
  })
})
