/** Minimal suspense fallback — preserves layout shell (header/nav already rendered). */
export function RouteFallback() {
  return <div className="route-fallback" aria-hidden="true" />
}
