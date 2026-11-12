import { CorporateBanner } from '../components/CorporateBanner'
import { ESTEEMED_CLIENT_LOGOS, esteemedClientLogoUrl } from '../content/esteemedClientsLogos'

const MAP_URL =
  'https://www.google.com/maps/place/Altron+Security+Engineering+India+Private+Limited/@13.0455704,80.2159869,15z/data=!4m7!3m6!1s0x0:0xdb2cd0ab3b049bf7!8m2!3d13.0455704!4d80.2159869!9m1!1b1'

export function EsteemedClientsPage() {
  return (
    <main className="corporate-page esteemed-clients-page">
      <CorporateBanner ariaLabel="ALTRON highlights" />

      <article className="corporate-content">
        <header className="corporate-content-header">
          <h1 className="corporate-title">Esteemed Clients</h1>
        </header>

        <ul className="esteemed-clients-grid" aria-label="Client logos">
          {ESTEEMED_CLIENT_LOGOS.map((file) => (
            <li key={file} className="esteemed-clients-item">
              <img
                src={esteemedClientLogoUrl(file)}
                alt=""
                width={200}
                height={200}
                loading="lazy"
                decoding="async"
                className="esteemed-clients-logo"
              />
            </li>
          ))}
        </ul>

        <section className="corporate-reviews" aria-label="Google reviews">
          <a href={MAP_URL} target="_blank" rel="noopener noreferrer">
            <img
              src="/corporate/google-review.webp"
              alt="View ALTRON Google reviews"
              className="corporate-review-image"
              loading="lazy"
            />
          </a>
        </section>
      </article>
    </main>
  )
}
