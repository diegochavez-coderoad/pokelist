import type { Pokemon } from '../domain/models/pokemon'

interface PokemonListProps {
  pokemon: Pokemon[]
}

function formatPokedexNumber(value: number): string {
  return `#${value.toString().padStart(3, '0')}`
}

export function PokemonList({ pokemon }: PokemonListProps) {
  return (
    <ul className="pokemon-list" aria-label="Pokemon results">
      {pokemon.map((entry) => (
        <li key={entry.id} className="pokemon-card">
          <h3>{entry.name}</h3>
          <p className="pokedex-number">{formatPokedexNumber(entry.pokedexNumber)}</p>
          <p className="type-line">{entry.types.join(' / ')}</p>
        </li>
      ))}
    </ul>
  )
}
