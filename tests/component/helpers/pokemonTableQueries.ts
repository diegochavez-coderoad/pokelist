import { screen, within } from '@testing-library/react'

export function getPokemonTable(): HTMLTableElement {
  return screen.getByRole('table', { name: 'Pokemon results table' })
}

export function getTableBodyRows(): HTMLElement[] {
  const table = getPokemonTable()
  const rowgroups = within(table).getAllByRole('rowgroup')
  const body = rowgroups[rowgroups.length - 1]
  return within(body).getAllByRole('row')
}

export function getTypeBadgesForRow(row: HTMLElement): HTMLElement[] {
  const typeContainer = within(row).getByLabelText(/types$/i)
  return within(typeContainer).getAllByText(/.+/, { selector: '.type-badge' })
}

export function getSelectedTypeButtons(): HTMLButtonElement[] {
  return screen
    .getAllByRole('button')
    .filter(
      (element): element is HTMLButtonElement =>
        element instanceof HTMLButtonElement && element.getAttribute('aria-pressed') === 'true',
    )
}

export function getTypeFilterButton(name: string): HTMLButtonElement {
  return screen.getByRole('button', { name }) as HTMLButtonElement
}

export function querySelectedCountSummary(): HTMLElement | null {
  return screen.queryByText(/Selected:\s*\d+/i)
}

export function getBadgeFootprint(name: string): DOMRect {
  return getTypeFilterButton(name).getBoundingClientRect()
}

export function getBadgeLeft(name: string): number {
  return getBadgeFootprint(name).left
}

export function queryCheckIconInBadge(name: string): HTMLElement | null {
  return within(getTypeFilterButton(name)).queryByText('✓')
}

export function getBadgeLabelLeft(name: string): number {
  const label = within(getTypeFilterButton(name)).getByText(name)
  return label.getBoundingClientRect().left
}
