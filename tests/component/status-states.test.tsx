import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import App from '../../src/App'
import { StatusMessage } from '../../src/components/StatusMessage'

describe('status message states', () => {
  it('renders loading state', () => {
    render(
      <StatusMessage
        loading
        errorMessage={null}
        validationMessage={null}
        hasMatches
      />, 
    )

    expect(screen.getByText('Loading first-generation Pokemon...')).toBeInTheDocument()
  })

  it('renders error state', () => {
    render(
      <StatusMessage
        loading={false}
        errorMessage="Failed to load first-generation Pokemon."
        validationMessage={null}
        hasMatches
      />, 
    )

    expect(screen.getByRole('alert')).toHaveTextContent('Failed to load')
  })

  it('renders empty state', () => {
    render(
      <StatusMessage
        loading={false}
        errorMessage={null}
        validationMessage={null}
        hasMatches={false}
      />, 
    )

    expect(screen.getByText('No Pokemon match your current filters.')).toBeInTheDocument()
  })

  it('renders validation state', () => {
    render(
      <StatusMessage
        loading={false}
        errorMessage={null}
        validationMessage="Use an exact number"
        hasMatches
      />, 
    )

    expect(screen.getByText('Use an exact number')).toBeInTheDocument()
  })

  it('preserves status-state behavior while toggling type filters', async () => {
    const user = userEvent.setup()
    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Showing 151 of 151')).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: 'Fire' }))
    await user.type(screen.getByLabelText('Search by name or Pokedex number'), 'no-match-mon')

    await waitFor(() => {
      expect(screen.getByText('No Pokemon match your current filters.')).toBeInTheDocument()
    })
  })
})
