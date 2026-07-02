interface FilterActionsProps {
  onClearAll: () => void
  disabled: boolean
}

export function FilterActions({ onClearAll, disabled }: FilterActionsProps) {
  return (
    <div className="panel action-panel">
      <button type="button" onClick={onClearAll} disabled={disabled}>
        Clear all filters
      </button>
    </div>
  )
}
