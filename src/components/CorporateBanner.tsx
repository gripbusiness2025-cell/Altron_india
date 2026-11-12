import { useEffect, useState } from 'react'
import { OptimizedPicture } from './OptimizedPicture'
import { SIZES, WIDTHS } from '../lib/responsiveImage'

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
type CorporateBannerProps = {
  ariaLabel?: string
}

export function CorporateBanner({ ariaLabel = 'Page highlights' }: CorporateBannerProps) {
  const [active, setActive] = useState(0)
  const [loadedSlides, setLoadedSlides] = useState(() => new Set([0]))

  useEffect(() => {
    let cancelled = false
    const addNext = () => {
      if (!cancelled) {
        setLoadedSlides((prev) => {
          const next = new Set(prev)
          next.add(1)
          return next
        })
      }
    }
    if (typeof requestIdleCallback !== 'undefined') {
      const id = requestIdleCallback(addNext, { timeout: 3000 })
      return () => {
        cancelled = true
        cancelIdleCallback(id)
      }
    }
    const t = window.setTimeout(addNext, 2500)
    return () => {
      cancelled = true
      clearTimeout(t)
    }
  }, [])

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

  return (
    <section className="corporate-banner" aria-label={ariaLabel} aria-roledescription="carousel">
      <div className="corporate-banner-track" aria-live="off">
        {slides.map((slide, index) => {
          if (!loadedSlides.has(index)) return null
          const isActive = index === active
          const isFirstHero = index === 0 && active === 0
          return (
            <div
              key={slide.base}
              id={`banner-slide-${index}`}
              role="tabpanel"
              aria-hidden={!isActive}
              className={isActive ? 'corporate-banner-slide is-active' : 'corporate-banner-slide'}
            >
              <OptimizedPicture
                basePath={slide.base}
                fallbackExt={slide.fallbackExt}
                alt={isActive && index === 0 ? 'ALTRON security solutions highlight' : ''}
                responsiveWidths={WIDTHS.banner}
                sizes={SIZES.banner}
                width={1200}
                height={475}
                decoding={isFirstHero ? 'sync' : 'async'}
                loading={isFirstHero ? 'eager' : 'lazy'}
                fetchPriority={isFirstHero ? 'high' : undefined}
              />
            </div>
          )
        })}
      </div>
      <div className="corporate-banner-dots" role="tablist" aria-label="Choose banner slide">
        {slides.map((slide, index) => (
          <button
            key={slide.base}
            type="button"
            role="tab"
            aria-selected={index === active}
            aria-controls={`banner-slide-${index}`}
            id={`banner-tab-${index}`}
            aria-label={`Show slide ${index + 1} of ${slides.length}`}
            className={index === active ? 'corporate-banner-dot is-active' : 'corporate-banner-dot'}
            onClick={() => setActive(index)}
          />
        ))}
      </div>
    </section>
  )
}
