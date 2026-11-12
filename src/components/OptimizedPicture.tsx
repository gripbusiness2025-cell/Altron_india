import type { ImgHTMLAttributes } from 'react'
import {
  buildWidthSrcSet,
  defaultSrcFromSet,
  type ResponsiveWidths,
} from '../lib/responsiveImage'

type OptimizedPictureProps = {
  /** Path without extension, e.g. `/corporate/banner3-scaled` */
  basePath: string
  /** Fallback format when WebP is missing in the browser (rare) */
  fallbackExt: 'jpg' | 'jpeg' | 'png'
  alt: string
  /** Pre-generated `{base}-{w}w` assets from `npm run optimize-images` */
  responsiveWidths?: ResponsiveWidths
  sizes?: string
} & Pick<
  ImgHTMLAttributes<HTMLImageElement>,
  'className' | 'width' | 'height' | 'loading' | 'fetchPriority' | 'decoding'
>

/**
 * Serves responsive WebP (`srcset` + `sizes`) with original-format fallback.
 */
export function OptimizedPicture({
  basePath,
  fallbackExt,
  alt,
  responsiveWidths,
  sizes,
  className,
  width,
  height,
  loading,
  fetchPriority,
  decoding = 'async',
}: OptimizedPictureProps) {
  const legacyWebp = `${basePath}.webp`
  const legacyFallback = `${basePath}.${fallbackExt}`

  const webpSrcSet = responsiveWidths?.length
    ? buildWidthSrcSet(basePath, 'webp', responsiveWidths)
    : legacyWebp
  const fallbackSrcSet = responsiveWidths?.length
    ? buildWidthSrcSet(basePath, fallbackExt, responsiveWidths)
    : undefined

  const imgSrc = responsiveWidths?.length
    ? defaultSrcFromSet(basePath, fallbackExt, responsiveWidths)
    : legacyFallback

  return (
    <picture>
      <source
        srcSet={webpSrcSet}
        type="image/webp"
        sizes={responsiveWidths?.length ? sizes : undefined}
      />
      <img
        src={imgSrc}
        srcSet={fallbackSrcSet}
        sizes={responsiveWidths?.length ? sizes : undefined}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding={decoding}
      />
    </picture>
  )
}
