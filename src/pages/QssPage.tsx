import { CorporateBanner } from '../components/CorporateBanner'

const MAP_URL =
  'https://www.google.com/maps/place/Altron+Security+Engineering+India+Private+Limited/@13.0455704,80.2159869,15z/data=!4m7!3m6!1s0x0:0xdb2cd0ab3b049bf7!8m2!3d13.0455704!4d80.2159869!9m1!1b1'

export function QssPage() {
  return (
    <main className="corporate-page qss-page">
      <CorporateBanner ariaLabel="QSS highlights" />

      <article className="corporate-content">
        <header className="corporate-content-header">
          <h1 className="corporate-title">QSS</h1>
        </header>

        <div className="corporate-prose qss-prose">
          <p>
            <strong>
              It is the Policy of ALTRON SECURITY ENGINEERING PVT. LTD. to distinguish itself as the
              market leader by superior, Cost-effective and quality Products &amp; Services to its
              Customers.
            </strong>
          </p>
          <p>To achieve this we will :</p>
          <p>
            Provide each employee with the training, Skills and Motivation to deliver high quality
            Products &amp; Services which meet or exceed our Customer&apos;s needs.
          </p>
          <p>
            Continually improving the effectiveness of the Quality Management System and Processes.
          </p>
          <p>We support by giving complete product training at our Studio.</p>
          <p>
            We do support in designing and site study appropriate Safety and Security Products for
            your projects.
          </p>
          <p>For any kind of technical clarifications and product demo, contact</p>
          <p className="qss-care-line">
            <strong>24 X 7 Customer Care: </strong>
            <a href="tel:+919551202222">+91 95512 02222</a>
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
