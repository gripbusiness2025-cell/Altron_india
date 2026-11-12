import type { ImgHTMLAttributes } from 'react'

type OptimizedPictureProps = {
  /** Path without extension, e.g. `/corporate/banner3-scaled` */
  basePath: string
  /** Fallback format when WebP is missing in the browser (rare) */
  fallbackExt: 'jpg' | 'jpeg' | 'png'
  alt: string
} & Pick<
  ImgHTMLAttributes<HTMLImageElement>,
  'className' | 'width' | 'height' | 'loading' | 'fetchPriority' | 'decoding' | 'sizes' | 'srcSet'
>

/**
 * Serves `/path.webp` with original `/path.ext` fallback (same visual quality, smaller transfer).
 */
export function OptimizedPicture({
  basePath,
  fallbackExt,
  alt,
  className,
  width,
  height,
  loading,
  fetchPriority,
  decoding = 'async',
  sizes,
  srcSet,
}: OptimizedPictureProps) {
  const fallbackSrc = `${basePath}.${fallbackExt}`

  return (
    <picture>
      <source srcSet={`${basePath}.webp`} type="image/webp" sizes={sizes} />
      <img
        src={fallbackSrc}
        srcSet={srcSet}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding={decoding}
        sizes={sizes}
      />
    </picture>
  )
}
