import type { CSSProperties } from 'react'

import { POKEMON_TYPES } from '../domain/models/pokemon'
import { getTypeColorHex, hexToRgba } from '../services/typeColorTokens'

interface TypeFilterPanelProps {
  selectedTypes: string[]
  onToggleType: (type: string) => void
}

export function TypeFilterPanel({ selectedTypes, onToggleType }: TypeFilterPanelProps) {
  return (
    <section className="panel type-panel" aria-label="Filter by type">
      <h2 className="type-title">Filter by type</h2>
      <div className="chip-grid">
        {POKEMON_TYPES.map((type) => {
          const isSelected = selectedTypes.includes(type)
          const baseColor = getTypeColorHex(type)
          const chipStyle: CSSProperties = {
            borderColor: isSelected ? baseColor : hexToRgba(baseColor, 0.55),
            backgroundColor: isSelected ? hexToRgba(baseColor, 0.32) : hexToRgba(baseColor, 0.16),
            color: '#f8fafc',
          }

          return (
            <button
              key={type}
              type="button"
              aria-pressed={isSelected}
              aria-label={type}
              data-selected={isSelected ? 'true' : 'false'}
              className={isSelected ? 'chip checked type-chip-button is-selected' : 'chip type-chip-button'}
              style={chipStyle}
              onClick={() => onToggleType(type)}
            >
              <span className="type-chip-label">{type}</span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
