/** When false, no `/api/catalog/*` requests (avoids 404 on static-only hosts). */
export function shouldLoadRemoteCatalog(): boolean {
  const mode = import.meta.env.VITE_CATALOG_SOURCE as string | undefined
  if (mode === 'static') return false
  if (mode === 'mongodb') return true
  const apiUrl = (import.meta.env.VITE_API_URL as string | undefined)?.trim()
  return Boolean(apiUrl)
}
