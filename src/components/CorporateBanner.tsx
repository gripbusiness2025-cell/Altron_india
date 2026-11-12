import { useEffect, useState } from 'react'
import { OptimizedPicture } from './OptimizedPicture'

const slides = [
  { base: '/corporate/banner1-1-scaled', fallbackExt: 'png' as const },
  { base: '/corporate/banner2-1-scaled', fallbackExt: 'jpg' as const },
  { base: '/corporate/banner3-scaled', fallbackExt: 'jpg' as const },
  { base: '/corporate/banner4-scaled', fallbackExt: 'jpg' as const },
  { base: '/corporate/banner5-scaled', fallbackExt: 'jpg' as const },
  { base: '/corporate/banner6-scaled', fallbackExt: 'jpg' as const },
  { base: '/corporate/banner7-scaled', fallbackExt: 'jpg' as const },
  { base: '/corporate/banner8-scaled', fallbackExt: 'jpg' as const },
  { base: '/corporate/banner9', fallbackExt: 'jpg' as const },
] as const

const INTERVAL_MS = 5000
const LCP_PRELOAD = `${slides[0].base}.webp`

type CorporateBannerProps = {
  ariaLabel?: string
}

export function CorporateBanner({ ariaLabel = 'Page highlights' }: CorporateBannerProps) {
  const [active, setActive] = useState(0)

  const [loadedSlides, setLoadedSlides] = useState(() => new Set([0, 1]))

  useEffect(() => {
    setLoadedSlides((prev) => {
      const next = new Set(prev)
      next.add(active)
      next.add((active + 1) % slides.length)
      return next
    })
  }, [active])

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % slides.length)
    }, INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    const existing = document.querySelector(`link[data-preload-banner="1"]`)
    if (existing) return
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = LCP_PRELOAD
    link.type = 'image/webp'
    link.setAttribute('data-preload-banner', '1')
    document.head.appendChild(link)
    return () => {
      link.remove()
    }
  }, [])

  return (
    <section className="corporate-banner" aria-label={ariaLabel}>
      <div className="corporate-banner-track">
        {slides.map((slide, index) => {
          if (!loadedSlides.has(index)) return null
          return (
            <OptimizedPicture
              key={slide.base}
              basePath={slide.base}
              fallbackExt={slide.fallbackExt}
              alt=""
              className={index === active ? 'corporate-banner-slide is-active' : 'corporate-banner-slide'}
              width={1200}
              height={475}
              decoding={index === 0 ? 'sync' : 'async'}
              loading={index === active ? 'eager' : 'lazy'}
              fetchPriority={index === active && active === 0 ? 'high' : undefined}
            />
          )
        })}
      </div>
      <div className="corporate-banner-dots" role="tablist" aria-label="Banner slides">
        {slides.map((slide, index) => (
          <button
            key={slide.base}
            type="button"
            role="tab"
            aria-selected={index === active}
            aria-label={`Slide ${index + 1}`}
            className={index === active ? 'corporate-banner-dot is-active' : 'corporate-banner-dot'}
            onClick={() => setActive(index)}
          />
        ))}
      </div>
    </section>
  )
}
