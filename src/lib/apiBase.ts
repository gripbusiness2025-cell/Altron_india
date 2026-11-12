/** Browser calls same-origin `/api` (Vite proxy in dev). Override with VITE_API_URL in production. */
export function apiBase(): string {
  const fromEnv = import.meta.env.VITE_API_URL as string | undefined
  if (fromEnv?.trim()) return fromEnv.replace(/\/$/, '')
  if (typeof window !== 'undefined') return '/api'
  return 'http://localhost:3001/api'
}
