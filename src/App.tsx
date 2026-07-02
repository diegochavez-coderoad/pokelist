import { FilterActions } from './components/FilterActions'
import { PokemonTable } from './components/PokemonTable'
import { SearchBar } from './components/SearchBar'
import { StatusMessage } from './components/StatusMessage'
import { TypeFilterPanel } from './components/TypeFilterPanel'
import { usePokemonFilters } from './app/usePokemonFilters'
import './app/app.css'
import './App.css'

function App() {
  const {
    pokemonList,
    filteredPokemon,
    tableRows,
    isLoading,
    errorMessage,
    validationMessage,
    criteria,
    actions,
  } = usePokemonFilters()

  const hasMatches = filteredPokemon.length > 0
  const clearDisabled =
    criteria.queryText.trim().length === 0 && criteria.selectedTypes.length === 0

  return (
    <main className="app-shell">
      <header className="app-header">
        <p className="eyebrow">Kanto 001-151</p>
        <h1>Pokelist Explorer</h1>
        <p className="subtitle">
          Search by name or Pokedex number, then refine by type.
        </p>
      </header>

      <section className="filter-grid" aria-label="Search and filter controls">
        <SearchBar value={criteria.queryText} onChange={actions.setQueryText} />
        <TypeFilterPanel
          selectedTypes={criteria.selectedTypes}
          onToggleType={actions.toggleType}
        />
        <FilterActions onClearAll={actions.clearAllFilters} disabled={clearDisabled} />
      </section>

      <section className="results-panel" aria-label="Pokemon search results">
        <div className="result-summary" role="status" aria-live="polite">
          Showing {filteredPokemon.length} of {pokemonList.length}
        </div>

        <StatusMessage
          loading={isLoading}
          errorMessage={errorMessage}
          validationMessage={validationMessage}
          hasMatches={hasMatches}
        />

        {!isLoading && !errorMessage && hasMatches ? (
          <PokemonTable rows={tableRows} />
        ) : null}
      </section>
    </main>
  )
}

export default App
