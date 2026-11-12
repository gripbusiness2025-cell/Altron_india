import { CorporateBanner } from '../components/CorporateBanner'

const MAP_URL =
  'https://www.google.com/maps/place/Altron+Security+Engineering+India+Private+Limited/@13.0455704,80.2159869,15z/data=!4m7!3m6!1s0x0:0xdb2cd0ab3b049bf7!8m2!3d13.0455704!4d80.2159869!9m1!1b1'

const altronCredentials = [
  'ALTRON (An ISO Certified Company)',
  'ALTRON has been approved by HR & CE Government of Tamil Nadu',
  'ALTRON has been approved by IDOL Wing CID Government of Tamil Nadu',
  'ALTRON has been approved by (SSI) Small Scale Industry Government of Tamil Nadu',
  'ALTRON has been approved by (MSME) Ministry of Micro, Small & Medium Enterprises',
]

const altroxCertifications = [
  'CE (Conformité Européene)',
  'FCC (Federal Communications Commission)',
  'RoHS (Restriction of Hazardous Substances)',
  'STQC (Standardization, Testing and Quality Certification)',
  'ISO 9001:2008 (International Organization for Standardization)',
]

const academyObjectives = [
  'Creating awareness about Safety & Security Systems to protect Life & Property.',
  'Conducting Seminars & Practical demonstrations about new technologies & latest innovations.',
  'Organising Training Courses in Safety & Security Technologies.',
  'Affiliating & getting International Accreditations from similar organizations.',
  'Encouraging R&D activities in Safety & Security Technology Areas.',
]

const academyAccreditations = [
  'NIESBUD – The National Institute for Entrepreneurship and Small Business Development; Ministry of Skill Development and',
  'Entrepreneurship, Government of India.',
  'MSME – Micro, Small and Medium Enterprises Govt. of India',
  'An ISO Certified Institute (BSA JAS-ANZ From New Zealand & Australia)',
]

export function AltronECampusPage() {
  return (
    <main className="corporate-page">
      <CorporateBanner ariaLabel="Altron e-Campus highlights" />

      <article className="corporate-content">
        <header className="corporate-content-header">
          <h1 className="corporate-title">e-campus</h1>
        </header>

        <div className="corporate-prose ecampus-prose">
          <ol className="corporate-list ecampus-ventures">
            <li>ALTRON SECURITY ENGINEERING PVT. LTD. (Electronic Safety &amp; Security Integration Solutions)</li>
            <li>
              <a href="https://altroxworld.com/" target="_blank" rel="noopener noreferrer">
                ALTROX WORLD CORP. (CCTV Surveillance System Manufacturer)
              </a>
            </li>
            <li>
              <a href="https://altroneducation.com/" target="_blank" rel="noopener noreferrer">
                ALTRON SAFETY &amp; SECURITY ACADEMY (CCTV, Safety &amp; Security Practical Training)
              </a>
            </li>
            <li>
              <a href="http://www.altroninterior.com/" target="_blank" rel="noopener noreferrer">
                ALTRON INTERIOR DESIGNERS (Feel the Difference &amp; Technology)
              </a>
            </li>
          </ol>

          <p className="ecampus-heading">ALTRON SECURITY ENGINEERING PVT. LTD. – SINCE 2000</p>
          <p>
            We are the leading &amp; efficient solution providers of Safety &amp; Security Systems in India &amp;
            Overseas, having strong clientele &amp; testimonials. It is our commitment for quality, innovation &amp;
            service that brings our customers back again &amp; again for all the Security &amp; Surveillance needs.
          </p>
          <ol className="corporate-list corporate-list--marker">
            {altronCredentials.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
          <p>
            Our core area is &quot;TOTAL INTELLIGENT SECURITY BUILDING MANAGEMENT SYSTEM&quot; We have a team of
            technocrats who are capable of completing the work in line with our customers requirements adhering to
            International Standards and On-time Completion.
          </p>

          <p className="ecampus-heading">
            <a href="https://altroxworld.com/" target="_blank" rel="noopener noreferrer">
              ALTROX WORLD CORP. – SINCE 2007
            </a>
          </p>
          <p>
            ALTROX, is a Global Company which manufactures quality products to fulfill the present leads of today.
            Leader in advanced Security &amp; Surveillance Solutions, takes it roots from ALTROX WORLD CORP., Chennai,
            South India. Incepted in 2007, with a vision and commitment to provide Security and Surveillance Solutions
            with Ease of use, Simplicity and Cost effective. It aims to understand the challenges faced by security
            professionals and customers alike, to provide efficient solutions by amalgamating the path-breaking
            technologies &amp; innovation on a consistent basis. ALTROX with its large product portfolio &amp; range
            enables the surveillance solutions architects in India and Qatar, to create a robust system design &amp;
            solutions across varied business verticals, without any black-hole or compromise on security. The brand takes
            inspiration from its compelling resolve to secure the world by bringing high-resolution video coverage that
            can prove effective in deterrence and enforcement.
          </p>
          <p>
            ALTROX promises making your Dream of 24 X 7 with 360° Surveillance come true, backed by world class Service
            &amp; Technical Support infrastructure.
          </p>
          <p>ALTROX Products have been accredited with major international system certifications</p>
          <ol className="corporate-list corporate-list--marker">
            {altroxCertifications.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
          <p>ALTROX offers a broad range of products across India, Qatar and Dubai for all the major sectors.</p>

          <p className="ecampus-heading">
            <a href="https://altroneducation.com/" target="_blank" rel="noopener noreferrer">
              ALTRON SAFETY &amp; SECURITY ACADEMY (CCTV, Safety &amp; Security Practical Training)
            </a>
          </p>
          <p>
            Altron Institute of Safety &amp; Security Technology has been churning out Professionals in the areas of
            Safety &amp; Security Systems since 2008.
          </p>

          <p className="ecampus-heading">Objectives</p>
          <ol className="corporate-list corporate-list--marker">
            {academyObjectives.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>

          <p className="ecampus-heading">Accreditations</p>
          <ol className="corporate-list corporate-list--marker">
            {academyAccreditations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>

          <p className="ecampus-heading">Job Placements</p>
          <p>
            We are providing Professional Course in CCTV Surveillance Engineering / Diploma Course in CCTV Surveillance
            Training for persons who had completed 10th and 12th Std. After the Completion of Course they will be getting
            placements in Tamil Nadu also overseas.
          </p>

          <p className="ecampus-heading">Gainful Employment</p>
          <p>
            In this leading hour, several corporate are in need of qualified technical person in this field. Our training
            to the students makes the corporate to observe them into their concerns without any hesitation. By this, we
            are laying a bridge between the corporate and students. The students will also get more salary as they wish.
          </p>

          <p className="ecampus-heading">
            <a href="http://www.altroninterior.com/" target="_blank" rel="noopener noreferrer">
              ALTRON INTERIOR DESIGNERS – SINCE 2016
            </a>
          </p>
          <p>
            Altron Interior Designers is a reputed interior design with Technology oriented organisation. We are the
            trend setters in offering Home / Commercial Interiors and Home Redesign administrations. We are the
            Competitive Interior Designers with Highly Experienced Professionals.
          </p>
          <p>
            We are the professional interior designers. Being the best and affordable interior designers, our
            consistently developing customer base stands declaration to our quality standards. We Deal Each Project
            with Small Interdisciplinary Teams. End-to-End Interior Design Solution with Technology
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
