import { useId, useState, type ReactNode } from 'react'

export type FaqAccordionItem = {
  id: string
  title: string
  content: ReactNode
}

type FaqAccordionProps = {
  items: FaqAccordionItem[]
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const baseId = useId()
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null)

  return (
    <div className="faq-accordion">
      {items.map((item) => {
        const isOpen = openId === item.id
        const panelId = `${baseId}-${item.id}-panel`
        const buttonId = `${baseId}-${item.id}-button`

        return (
          <section key={item.id} className={`faq-item${isOpen ? ' is-open' : ''}`}>
            <h2 className="faq-item-heading">
              <button
                type="button"
                id={buttonId}
                className="faq-item-trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
              >
                <span>{item.title}</span>
                <span className="faq-item-icon" aria-hidden="true">
                  {isOpen ? '−' : '+'}
                </span>
              </button>
            </h2>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="faq-item-panel"
              hidden={!isOpen}
            >
              <div className="faq-item-content corporate-prose">{item.content}</div>
            </div>
          </section>
        )
      })}
    </div>
  )
}
