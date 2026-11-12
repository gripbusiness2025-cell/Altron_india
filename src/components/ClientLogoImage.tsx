import { SIZES, WIDTHS, buildWidthSrcSet, defaultSrcFromSet } from '../lib/responsiveImage'

type ClientLogoImageProps = {
  name: string
}

/** Client marquee logo — responsive WebP with JPG fallback. */
export function ClientLogoImage({ name }: ClientLogoImageProps) {
  const base = `/home/clients/${name}`
  const widths = WIDTHS.clientLogo
  return (
    <picture>
      <source
        type="image/webp"
        srcSet={buildWidthSrcSet(base, 'webp', widths)}
        sizes={SIZES.clientLogo}
      />
      <img
        src={defaultSrcFromSet(base, 'jpg', widths, 200)}
        srcSet={buildWidthSrcSet(base, 'jpg', widths)}
        sizes={SIZES.clientLogo}
        alt=""
        width={200}
        height={182}
        loading="lazy"
        decoding="async"
      />
    </picture>
  )
}
