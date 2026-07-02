import silhouetteUrl from '../assets/pokemon/silhouette.svg'
import type { SpriteAssetMapping } from '../domain/models/spriteAsset'

const SOURCE_PATTERN = 'https://img.pokemondb.net/sprites/silver/normal/{spriteSlug}.png'

const spriteAssets = import.meta.glob('../assets/pokemon/sprites/*.{png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

function isValidSpriteSlug(spriteSlug: string): boolean {
  return /^[a-z0-9-]+$/.test(spriteSlug)
}

function normalizeAssetPath(path: string): string {
  const fileName = path.split('/').pop() ?? ''
  return fileName.replace(/\.[^.]+$/, '').toLowerCase()
}

const bySlug = new Map<string, string>()
for (const [path, assetUrl] of Object.entries(spriteAssets)) {
  bySlug.set(normalizeAssetPath(path), assetUrl)
}

export function resolveSpriteMapping(spriteSlug: string): SpriteAssetMapping {
  const localAssetPath = isValidSpriteSlug(spriteSlug) ? (bySlug.get(spriteSlug) ?? null) : null

  return {
    spriteSlug,
    localAssetPath,
    sourcePattern: SOURCE_PATTERN,
  }
}

export function buildSourceSpriteUrl(spriteSlug: string): string | null {
  if (!isValidSpriteSlug(spriteSlug)) {
    return null
  }

  return SOURCE_PATTERN.replace('{spriteSlug}', spriteSlug)
}

export function getSilhouetteSpriteUrl(): string {
  return silhouetteUrl
}
