import type { CSSProperties } from 'react'

import type { TableRowViewModel } from '../domain/models/tableRowViewModel'
import { hexToRgba } from '../services/typeColorTokens'
import { PokemonSpriteCell } from './PokemonSpriteCell'

interface PokemonTableProps {
  rows: TableRowViewModel[]
}

export function PokemonTable({ rows }: PokemonTableProps) {
  return (
    <div className="pokemon-table-scroll" role="region" aria-label="Pokemon table container">
      <table className="pokemon-table" aria-label="Pokemon results table">
        <thead>
          <tr>
            <th scope="col">Pokedex number</th>
            <th scope="col">Sprite</th>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="table-cell-number">{row.pokedexNumberLabel}</td>
              <td className="table-cell-sprite">
                <PokemonSpriteCell
                  name={row.name}
                  spriteSrc={row.spriteSrc}
                  usesFallbackSilhouette={row.usesFallbackSilhouette}
                />
              </td>
              <td className="table-cell-name">{row.name}</td>
              <td className="table-cell-type">
                <div className="type-line" aria-label={`${row.name} types`}>
                  {row.rowTypeButtons.map((typeButton) => (
                    <span
                      key={`${row.id}-${typeButton.type}`}
                      className="type-badge"
                      style={
                        {
                          borderColor: hexToRgba(typeButton.colorHex, 0.65),
                          backgroundColor: hexToRgba(typeButton.colorHex, 0.28),
                          color: '#f8fafc',
                        } as CSSProperties
                      }
                    >
                      {typeButton.label}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
