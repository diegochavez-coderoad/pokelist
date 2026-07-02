import { useEffect, useMemo, useState } from 'react'

import { filterPokemon } from '../domain/filters/filterPokemon'
import { parsePokedexFilter } from '../domain/filters/parsePokedexFilter'
import type { Pokemon } from '../domain/models/pokemon'
import { mapPokemonToTableRows } from '../services/pokemonTableMapper'
import { loadPokemon } from '../services/pokemonRepository'

const MIN_POKEDEX = 1
const MAX_POKEDEX = 151

function getNoPokedexFilter() {
  return {
    mode: 'none' as const,
    exact: null,
    rangeStart: null,
    rangeEnd: null,
    validationMessage: null,
  }
}

function isNumericIntent(rawInput: string): boolean {
  const normalized = rawInput.trim()
  return normalized.length > 0 && /^[\d\s-]+$/.test(normalized) && /\d/.test(normalized)
}

export function usePokemonFilters() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
  const [queryText, setQueryText] = useState('')
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    loadPokemon()
      .then((loadedPokemon) => {
        if (!mounted) {
          return
        }
        setPokemonList(
          loadedPokemon.filter(
            (entry) =>
              entry.pokedexNumber >= MIN_POKEDEX && entry.pokedexNumber <= MAX_POKEDEX,
          ),
        )
      })
      .catch(() => {
        if (!mounted) {
          return
        }
        setErrorMessage('Failed to load first-generation Pokemon.')
      })
      .finally(() => {
        if (!mounted) {
          return
        }
        setIsLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [])

  const numericIntent = useMemo(() => isNumericIntent(queryText), [queryText])
  const parsedPokedex = useMemo(
    () => (numericIntent ? parsePokedexFilter(queryText) : getNoPokedexFilter()),
    [numericIntent, queryText],
  )
  const nameQuery = useMemo(
    () => (numericIntent ? '' : queryText),
    [numericIntent, queryText],
  )

  const filteredPokemon = useMemo(
    () =>
      filterPokemon({
        pokemonList,
        nameQuery,
        selectedTypes,
        // Summary removal is presentation-only; filtering semantics remain unchanged.
        // Invalid pokedex inputs intentionally return mode=none, keeping other filters active.
        parsedPokedex,
      }),
    [pokemonList, nameQuery, selectedTypes, parsedPokedex],
  )

  const tableRows = useMemo(() => mapPokemonToTableRows(filteredPokemon), [filteredPokemon])

  function toggleType(type: string) {
    setSelectedTypes((previous) =>
      previous.includes(type)
        ? previous.filter((value) => value !== type)
        : [...previous, type],
    )
  }

  function clearAllFilters() {
    setQueryText('')
    setSelectedTypes([])
  }

  return {
    pokemonList,
    filteredPokemon,
    tableRows,
    isLoading,
    errorMessage,
    validationMessage: parsedPokedex.validationMessage,
    criteria: {
      queryText,
      selectedTypes,
    },
    actions: {
      setQueryText,
      toggleType,
      clearAllFilters,
    },
  }
}
