interface SearchBarProps {
  value: string
  onChange: (nextValue: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="panel search-panel">
      <label htmlFor="searchQuery">Search by name or Pokedex number</label>
      <input
        id="searchQuery"
        name="searchQuery"
        type="text"
        value={value}
        placeholder="Name, 25, or 1-50"
        onChange={(event) => onChange(event.target.value)}
      />
      <p className="hint">Use text for names or numeric values for exact/range queries.</p>
    </div>
  )
}
