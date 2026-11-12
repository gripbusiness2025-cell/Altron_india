type ProductGridLoaderProps = {
  count?: number
}

export function ProductGridLoader({ count = 6 }: ProductGridLoaderProps) {
  return (
    <ul className="product-grid" aria-busy="true">
      {Array.from({ length: count }, (_, i) => (
        <li key={i} className="product-card product-card--skeleton" aria-hidden="true">
          <div className="product-skeleton-media product-loader-shimmer" />
          <div className="product-skeleton-title product-loader-shimmer" />
          <div className="product-skeleton-title product-skeleton-title--short product-loader-shimmer" />
          <div className="product-skeleton-btn product-loader-shimmer" />
        </li>
      ))}
    </ul>
  )
}
