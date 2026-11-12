import { CorporateBanner } from '../components/CorporateBanner'
import { OptimizedPicture } from '../components/OptimizedPicture'
import { GoogleReviewBadge } from '../components/GoogleReviewBadge'
import { SIZES, WIDTHS } from '../lib/responsiveImage'

const credentials = [
  'ALTRON (An ISO Certified Company)',
  'ALTRON has been approved by HR & CE Government of Tamil Nadu',
  'ALTRON has been approved by IDOL Wing CID Government of Tamil Nadu',
  'ALTRON has been approved by Small Scale Industry Government of Tamil Nadu',
  'ALTRON has been approved by (MSME) Ministry of Micro, Small & Medium Enterprises',
]

const reasons = [
  'The success of our company is in our constant endeavor to provide state-of-art technology',
  'We have a very strong network comprising of more than 50 well trained professionals.',
  'We are the leading & efficient solution providers of Safety and Security Systems in India',
  '20 Years experience in the Safety & Security Industry.',
  'High end Security and Global viewing systems to our clients',
]

const MAP_URL =
  'https://www.google.com/maps/place/Altron+Security+Engineering+India+Private+Limited/@13.0455704,80.2159869,15z/data=!4m7!3m6!1s0x0:0xdb2cd0ab3b049bf7!8m2!3d13.0455704!4d80.2159869!9m1!1b1'

export function CorporatePage() {
  return (
    <main className="corporate-page">
      <CorporateBanner ariaLabel="Corporate highlights" />

      <article className="corporate-content">
        <header className="corporate-content-header">
          <h1 className="corporate-title">Corporate</h1>
        </header>

        <div className="corporate-prose">
          <p>
            <strong>ALTRON SECURITY ENGINEERING PVT. LTD.,</strong> is a Electronic Security Solutions
            Provider Company with more than{' '}
            <strong>23 Years Experience in the Safety &amp; Security Industry.</strong>
          </p>
          <p>
            We are the leading &amp; efficient solution providers of Safety and Security Systems in India
            and Overseas, having strong clientele testimonials. We have been in this field for over a
            decade and have earned good reputations in India and Overseas. The success of our company is
            in our constant endeavor to provide state-of-art technology, quality products and prompt
            Service.
          </p>
          <p>
            We provide full-Security Solutions for Industrial, Commercial and Residential Places with CCTV
            Surveillance Systems like Analogue Solutions, AHD Solutions, Network Solutions, WIFI Solutions,
            Thermal Imaging Solutions, Conventional Fire Alarm Systems, Addressable Fire Alarm, Fire Hydrant
            Systems, Sprinkler Systems, Fire Extinguisher, Door Access Control System, Bio-metric Attendance
            System, Finger Print Attendance System, IP Based Access Control, Networking Bio-metric Attendance
            System, Alarm Systems, Public Address System, Audio Solutions, Home Security Solutions, Burglar
            Alarm, Wireless Intrusion Alarm Solutions, Video Door Phone, Apartment System Solutions, Child /
            Vehicle Tracking System, Under Vehicle Scanner Solutions and Boom Barrier Solutions
          </p>
          <p>
            Combining our business experience, technical expertise, profound knowledge of latest industry
            trends and quality-driven delivery model we offer progressive end-to-end Solutions.
          </p>
          <p>
            Our core area is{' '}
            <strong>&quot;TOTAL INTELLIGENT SECURITY BUILDING MANAGEMENT SYSTEM&quot;</strong> We have a
            team of technocrats who are capable of completing the work in line with our customer&apos;s
            requirements adhering to <strong>International Standards and On-time Completion.</strong>
          </p>
          <p>
            We are in this field for more than a decade, we have gained lot of clients by understanding their
            requirements. We bagged turnkey projects from{' '}
            <strong>
              Government Organizations, Banking Sector, Manufacturing Industry, International Projects, IT
              Industry, Exim Industry, Health Industry, Education Institutes, Telecommunication Industry,
              Consultancy, Real Estate Industry, Cine Industry, Jewelry &amp; Fashion Industry, Hospitality
              Industry, retail Industry etc.,
            </strong>{' '}
            where we have installed <strong>High end Security Systems.</strong>
          </p>
          <p>
            We can proudly say that we are one of the{' '}
            <strong>
              best solution providers by extending High end Security and Global viewing systems to our
              clients.
            </strong>
          </p>
          <p>
            We have a very strong network comprising of more than{' '}
            <strong>50 well trained professionals</strong>
          </p>
          <p>
            We are Providing the required services for our Clients{' '}
            <strong>24 x 7 Basis</strong>
          </p>
          <ol className="corporate-list corporate-list--marker">
            {credentials.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>

        <section className="corporate-reasons" aria-labelledby="corporate-reasons-heading">
          <h2 id="corporate-reasons-heading" className="corporate-reasons-title">
            5 Reasons to Choose Uss
          </h2>
          <div className="corporate-reasons-grid">
            <ul className="corporate-list corporate-list--marker">
              {reasons.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <OptimizedPicture
              basePath="/corporate/home-960x480"
              fallbackExt="jpg"
              alt="ALTRON security solutions"
              className="corporate-reasons-image"
              responsiveWidths={WIDTHS.homeFeature}
              sizes={SIZES.homeFeature}
              width={960}
              height={480}
              loading="lazy"
              decoding="async"
            />
          </div>
        </section>

        <section className="corporate-range" aria-label="Product range">
          <img
            src="/corporate/range.png"
            alt="ALTRON product and service range"
            className="corporate-range-image"
            width={896}
            height={288}
            loading="lazy"
          />
        </section>

        <section className="corporate-reviews" aria-label="Google reviews">
          <a href={MAP_URL} target="_blank" rel="noopener noreferrer">
            <GoogleReviewBadge />
          </a>
        </section>
      </article>
    </main>
  )
}
