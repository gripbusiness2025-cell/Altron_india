import type { ReactNode } from 'react'
import { CorporateBanner } from '../components/CorporateBanner'

const MAP_URL =
  'https://www.google.com/maps/place/Altron+Security+Engineering+India+Private+Limited/@13.0455704,80.2159869,15z/data=!4m7!3m6!1s0x0:0xdb2cd0ab3b049bf7!8m2!3d13.0455704!4d80.2159869!9m1!1b1'

type ContactBlock = {
  id: string
  title: string
  lines: ReactNode[]
}

const CHENNAI_OFFICE = (
  <>
    #79A/44A, S1, Panchaliamman Koil Street,
    <br />
    Jai Nagar, Arumbakkam, Chennai – 600 106.
    <br />
    Phone: +91 – 44 – 2363 3050
  </>
)

const THANJAVUR_OFFICE = (
  <>
    #3A, Thiruvalluvar Nagar 4th Street,
    <br />
    3rd Floor, New Bus Stand,
    <br />
    Thanjavur – 613 005
  </>
)

const CONTACT_BLOCKS: ContactBlock[] = [
  {
    id: 'corporate',
    title: 'CORPORATE',
    lines: [
      'Mr. R. Pratheep Gandhi – Managing Director',
      CHENNAI_OFFICE,
      <>
        Mobile: <a href="tel:+919551205555">+91 95512 05555</a>
        <br />
        E-mail:{' '}
        <a href="mailto:md@altronindia.com">md@altronindia.com</a>
      </>,
    ],
  },
  {
    id: 'projects',
    title: 'PROJECTS',
    lines: [
      'Mr. S. Kumar – GM – Project',
      CHENNAI_OFFICE,
      <>
        Mobile: <a href="tel:+919841047974">+91 98410 47974</a>
        <br />
        E-mail:{' '}
        <a href="mailto:project@altronindia.com">project@altronindia.com</a>
      </>,
    ],
  },
  {
    id: 'sales',
    title: 'SALES & SOLUTIONS',
    lines: [
      'Mr. K. Gajendran – GM – Sales',
      CHENNAI_OFFICE,
      <>
        Mobile: <a href="tel:+919841058328">+91 98410 58328</a>
        <br />
        E-mail: <a href="mailto:gaja@altronindia.com">gaja@altronindia.com</a>
      </>,
    ],
  },
  {
    id: 'rotn',
    title: 'REST OF TAMILNADU',
    lines: [
      'Mr. R. T. Kumar – Manager – ROTN',
      THANJAVUR_OFFICE,
      <>
        Mobile: <a href="tel:+919551202222">+91 95512 02222</a>
        <br />
        E-mail: <a href="mailto:tnj@altronindia.com">tnj@altronindia.com</a>
      </>,
    ],
  },
  {
    id: 'thanjavur',
    title: 'TANJAVUR',
    lines: [
      'Mrs. T. Mayuri – Sales',
      THANJAVUR_OFFICE,
      <>
        Mobile: <a href="tel:+919841012721">+91 98410 12721</a>
        <br />
        E-mail: <a href="mailto:tnj@altronindia.com">tnj@altronindia.com</a>
      </>,
    ],
  },
  {
    id: 'tirupati',
    title: 'TIRUPATI',
    lines: [
      'Mr. K. Lokesh – Sales Executive',
      <>
        # 4-64, RF Road, Kothapeta,
        <br />
        Chandragiri, Tirupati – 517 501
      </>,
      <>
        Mobile: <a href="tel:+919841058328">+91 98410 58328</a>
        <br />
        Mobile: <a href="tel:+919032944067">+91 90329 44067</a>
        <br />
        E-mail:{' '}
        <a href="mailto:tirupati@altronindia.com">tirupati@altronindia.com</a>
      </>,
    ],
  },
]

function MapPinIcon() {
  return (
    <svg className="contact-card-icon" viewBox="0 0 512 512" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M464 215c-19.2-96.6-88-145.8-208-145.8S67.2 118.4 48 215c-8.9 44.8 9.4 91.7 52.2 125.6 36.4 28.9 80.9 65.8 120.2 108.7l9.8 10.6 9.8-10.6c39.3-42.9 83.8-79.8 120.2-108.7 42.8-33.9 61.1-80.8 52.2-125.6zm-46.7 99.6c-32.9 26.2-75.3 60.8-111.3 100.3-36 39.5-79.4 74.1-111.3 100.3C152.7 472.4 128 433 128 384c0-53 43-96 96-96s96 43 96 96c0 49 24.7 88.4 66.7 68.9 36-26.2 78.4-60.8 111.3-100.3 4.3-3.4 8.4-7 12.3-10.6zM256 320c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"
      />
    </svg>
  )
}

export function ContactPage() {
  return (
    <main className="corporate-page contact-page">
      <CorporateBanner ariaLabel="ALTRON highlights" />

      <article className="corporate-content">
        <header className="corporate-content-header">
          <h1 className="corporate-title">Contact</h1>
        </header>

        <div className="contact-grid">
          {CONTACT_BLOCKS.map((block) => (
            <section key={block.id} className="contact-card">
              <MapPinIcon />
              <h2 className="contact-card-title">{block.title}</h2>
              <div className="contact-card-body corporate-prose">
                {block.lines.map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="contact-support" aria-label="24/7 customer care">
          <img
            src="/contact/24-7-customercare.png"
            alt="24/7 customer care"
            className="contact-support-image"
            width={247}
            height={60}
            loading="lazy"
          />
        </section>

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
