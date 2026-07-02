interface PokedexFilterInputProps {
  value: string
  onChange: (nextValue: string) => void
}

// Legacy component retained as a no-op shim after unified search rollout.
export function PokedexFilterInput({ value, onChange }: PokedexFilterInputProps) {
  void value
  void onChange
  return null
}
