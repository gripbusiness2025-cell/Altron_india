import { CorporateBanner } from '../components/CorporateBanner'

const MAP_URL =
  'https://www.google.com/maps/place/Altron+Security+Engineering+India+Private+Limited/@13.0455704,80.2159869,15z/data=!4m7!3m6!1s0x0:0xdb2cd0ab3b049bf7!8m2!3d13.0455704!4d80.2159869!9m1!1b1'

export function AltronCarePage() {
  return (
    <main className="corporate-page">
      <CorporateBanner ariaLabel="Altron Care highlights" />

      <article className="corporate-content">
        <header className="corporate-content-header">
          <h1 className="corporate-title">Altron Care</h1>
        </header>

        <div className="corporate-prose">
          <p className="care-lead">
            ALTRON CARE is one of the most advanced fields in CCTV Surveillance Industry. It
            services, repairs all brands with any technology of Cameras, Recorders and Power Supply
            and get fit within 48 WORKING HOURS to the entire satisfaction of the dealers /
            customers. For this purpose Two Service Centers are function at THANJAVUR &amp; CHENNAI.
            We proudly mentioned that Chip Level Service &amp; Repairs are carried out in above
            centers.
          </p>
          <p>
            We are the only Corporate in South-India which provides Chip Level Service &amp; Repairs
            any Brand, any technology in any Condition.
          </p>
          <p className="care-callout">
            ANY BRAND! ANY CONDITION! ANY TECHNOLOGY!
            <br />
            (Service Under One Roof within 48 Hours)
          </p>
          <p className="care-callout">
            <a href="tel:+919841012721">THANJAI CARE CENTRE : +91 98410 12721</a>
          </p>
          <p className="care-callout">
            <a href="tel:+919841058328">CHENNAI CARE CENTRE : +91 98410 58328</a>
          </p>
        </div>

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
