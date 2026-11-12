import { Link } from 'react-router-dom'
import { OptimizedPicture } from './OptimizedPicture'
import { SIZES, WIDTHS } from '../lib/responsiveImage'

export function Logo() {
  return (
    <Link to="/" className="logo-block" aria-label="ALTRON — Sense the Difference, ISO certified company">
      <OptimizedPicture
        basePath="/altronlogo"
        fallbackExt="png"
        alt="ALTRON — Sense the Difference. ISO certified company."
        className="logo-mark"
        responsiveWidths={WIDTHS.logo}
        sizes={SIZES.logo}
        width={200}
        height={80}
        loading="eager"
        decoding="async"
      />
    </Link>
  )
}
