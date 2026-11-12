import { Link } from 'react-router-dom'
import { QuickLinkIcon, type QuickLinkIconName } from './QuickLinkIcon'

type QuickLink = {
  label: string
  icon: QuickLinkIconName
  href?: string
  to?: string
  external?: boolean
}

const links: QuickLink[] = [
  {
    label: 'Education',
    href: 'https://altroneducation.com/',
    external: true,
    icon: 'education',
  },
  {
    label: 'Enquiry',
    to: '/contact',
    icon: 'enquiry',
  },
  {
    label: 'Confirm',
    icon: 'confirm',
  },
  {
    label: 'Stay Calm',
    icon: 'calm',
  },
]

function QuickLinkContent({ item }: { item: QuickLink }) {
  return (
    <>
      <span className="home-quick-link-icon" aria-hidden="true">
        <QuickLinkIcon name={item.icon} />
      </span>
      <span className="home-quick-link-label">{item.label}</span>
    </>
  )
}

export function HomeQuickLinks() {
  return (
    <section className="home-quick-links" aria-label="Quick links">
      <ul className="home-quick-links-grid">
        {links.map((item) => (
          <li key={item.label}>
            {item.to ? (
              <Link to={item.to} className="home-quick-link">
                <QuickLinkContent item={item} />
              </Link>
            ) : item.href ? (
              <a
                href={item.href}
                className="home-quick-link"
                {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <QuickLinkContent item={item} />
              </a>
            ) : (
              <div className="home-quick-link home-quick-link--static">
                <QuickLinkContent item={item} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
