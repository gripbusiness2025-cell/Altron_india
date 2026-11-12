import { Link } from 'react-router-dom'
import { OptimizedPicture } from './OptimizedPicture'

export function Logo() {
  return (
    <Link to="/" className="logo-block" aria-label="ALTRON — Sense the Difference, ISO certified company">
      <OptimizedPicture
        basePath="/altronlogo"
        fallbackExt="png"
        alt="ALTRON — Sense the Difference. ISO certified company."
        className="logo-mark"
        width={200}
        height={80}
        fetchPriority="high"
        loading="eager"
        decoding="async"
      />
    </Link>
  )
}
