interface StatusMessageProps {
  loading: boolean
  errorMessage: string | null
  validationMessage: string | null
  hasMatches: boolean
}

export function StatusMessage({
  loading,
  errorMessage,
  validationMessage,
  hasMatches,
}: StatusMessageProps) {
  if (loading) {
    return (
      <p className="status status-loading" role="status" aria-live="polite">
        Loading first-generation Pokemon...
      </p>
    )
  }

  if (errorMessage) {
    return (
      <p className="status status-error" role="alert">
        {errorMessage}
      </p>
    )
  }

  if (validationMessage) {
    return (
      <p className="status status-validation" role="status" aria-live="polite">
        {validationMessage}
      </p>
    )
  }

  if (!hasMatches) {
    return (
      <p className="status status-empty" role="status" aria-live="polite">
        No Pokemon match your current filters.
      </p>
    )
  }

  return null
}
