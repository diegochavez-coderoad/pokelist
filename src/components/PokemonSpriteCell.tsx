import { useState } from 'react'

import { getSilhouetteSpriteUrl } from '../services/spriteResolver'

interface PokemonSpriteCellProps {
  name: string
  spriteSrc: string | null
  usesFallbackSilhouette?: boolean
}

export function PokemonSpriteCell({
  name,
  spriteSrc,
  usesFallbackSilhouette = false,
}: PokemonSpriteCellProps) {
  const silhouette = getSilhouetteSpriteUrl()
  const [failed, setFailed] = useState(false)

  const finalSrc = failed || spriteSrc === null ? silhouette : spriteSrc
  const isFallback = usesFallbackSilhouette || failed || spriteSrc === null

  return (
    <img
      className={`pokemon-sprite ${isFallback ? 'pokemon-sprite-fallback' : ''}`}
      src={finalSrc}
      alt={isFallback ? `${name} silhouette placeholder` : `${name} sprite`}
      width={28}
      height={28}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      data-fallback={isFallback ? 'true' : 'false'}
    />
  )
}
