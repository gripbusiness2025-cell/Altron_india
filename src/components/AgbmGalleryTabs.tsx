import { useId, useState } from 'react'
import { AGBM_GALLERY_TABS, type AgbmGalleryImage, type AgbmGalleryTab } from '../content/agbmGalleries'

export function AgbmGalleryTabs() {
  const baseId = useId()
  const [activeId, setActiveId] = useState(AGBM_GALLERY_TABS[0]?.id ?? '')

  const activeTab = AGBM_GALLERY_TABS.find((tab) => tab.id === activeId) ?? AGBM_GALLERY_TABS[0]

  return (
    <div className="agbm-tabs">
      <div className="agbm-tabs-heading" role="tablist" aria-label="AGBM photo categories">
        {AGBM_GALLERY_TABS.map((tab) => {
          const isActive = tab.id === activeTab?.id
          const tabId = `${baseId}-tab-${tab.id}`
          const panelId = `${baseId}-panel-${tab.id}`

          return (
            <button
              key={tab.id}
              type="button"
              id={tabId}
              role="tab"
              className={`agbm-tab-trigger${isActive ? ' is-active' : ''}`}
              aria-selected={isActive}
              aria-controls={panelId}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveId(tab.id)}
            >
              {tab.title}
            </button>
          )
        })}
      </div>

      {activeTab && (
        <AgbmGalleryPanel key={activeTab.id} tab={activeTab} baseId={baseId} />
      )}
    </div>
  )
}

function AgbmGalleryPanel({ tab, baseId }: { tab: AgbmGalleryTab; baseId: string }) {
  const panelId = `${baseId}-panel-${tab.id}`
  const tabId = `${baseId}-tab-${tab.id}`

  return (
    <div
      id={panelId}
      role="tabpanel"
      aria-labelledby={tabId}
      className={`agbm-tab-panel agbm-gallery agbm-gallery--${tab.layout}`}
    >
      <ul className="agbm-gallery-grid">
        {tab.images.map((image, index) => (
          <li key={`${image.full}-${index}`} className="agbm-gallery-item">
            <a href={image.full} target="_blank" rel="noopener noreferrer">
              <AgbmGalleryImage image={image} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function AgbmGalleryImage({ image }: { image: AgbmGalleryImage }) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  return (
    <span className={`agbm-gallery-frame${!loaded && !failed ? ' is-loading' : ''}${failed ? ' is-failed' : ''}`}>
      {!loaded && !failed && (
        <span className="agbm-gallery-loader" aria-hidden="true">
          <span className="agbm-gallery-spinner" />
        </span>
      )}
      {failed ? (
        <span className="agbm-gallery-fallback">Image unavailable</span>
      ) : (
        <img
          src={image.thumb}
          alt=""
          loading="lazy"
          decoding="async"
          className={`agbm-gallery-image${loaded ? ' is-loaded' : ''}`}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      )}
    </span>
  )
}
