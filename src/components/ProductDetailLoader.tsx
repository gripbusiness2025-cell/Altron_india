export function ProductDetailLoader() {
  return (
    <div className="product-detail product-detail--skeleton" aria-busy="true">
      <div className="product-skeleton-heading product-loader-shimmer" />
      <div className="product-detail-media product-skeleton-detail-media product-loader-shimmer" />
      <div className="product-skeleton-paragraph product-loader-shimmer" />
      <div className="product-skeleton-paragraph product-loader-shimmer" />
      <div className="product-skeleton-paragraph product-skeleton-paragraph--short product-loader-shimmer" />
      <div className="product-skeleton-btn product-skeleton-btn--inline product-loader-shimmer" />
    </div>
  )
}
