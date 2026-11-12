import { Logo } from './Logo'

const infoColumns = [
  {
    title: 'ALTRON',
    lines: ['SINCE 2000', '24+ Years Experience'],
  },
  {
    title: 'ALTRON',
    lines: ['Leading Electronic Security', 'Solutions Provider'],
  },
  {
    title: 'Email',
    lines: ['info@altronindia.com', 'project@altronindia.com'],
    links: ['mailto:info@altronindia.com', 'mailto:project@altronindia.com'],
  },
  {
    title: 'Call',
    lines: ['95512 02222', '044 - 2363 3050'],
    links: ['tel:+919551202222', 'tel:+914423633050'],
  },
]

export function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Logo />
        <div className="header-info">
          {infoColumns.map((col) => (
            <div className="info-col" key={col.title + col.lines[0]}>
              <strong>{col.title}</strong>
              {col.lines.map((line, i) =>
                col.links ? (
                  <a key={line} href={col.links[i]} className="info-link">
                    {line}
                  </a>
                ) : (
                  <span key={line}>{line}</span>
                ),
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  )
}
