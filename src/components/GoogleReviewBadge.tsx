type GoogleReviewBadgeProps = {
  className?: string
}

/** Small Google review badge (~2.5KB WebP). */
export function GoogleReviewBadge({ className = 'corporate-review-image' }: GoogleReviewBadgeProps) {
  return (
    <img
      src="/corporate/google-review.webp"
      alt="View ALTRON Google reviews"
      className={className}
      width={320}
      height={120}
      loading="lazy"
      decoding="async"
    />
  )
}
