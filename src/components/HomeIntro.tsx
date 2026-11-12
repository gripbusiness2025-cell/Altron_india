import { OptimizedPicture } from './OptimizedPicture'
import { SIZES, WIDTHS } from '../lib/responsiveImage'

const credentials = [
  'ALTRON (An ISO Certified Company)',
  'ALTRON has been approved by HR & CE Government of Tamil Nadu',
  'ALTRON has been approved by IDOL Wing CID Government of Tamil Nadu',
  'ALTRON has been approved by Small Scale Industry Government of Tamil Nadu',
  'ALTRON has been approved by (MSME) Ministry of Micro, Small & Medium Enterprises.',
]

export function HomeIntro() {
  return (
    <section className="home-story home-story--about" aria-labelledby="home-intro-heading">
      <div className="home-story__inner">
        <div className="home-story__copy">
          <p className="home-story__eyebrow">About ALTRON</p>
          <p className="home-story__lead" id="home-intro-heading">
            Altron Security Engineering Pvt. Ltd., is a Electronic Security Solutions Provider company
            more than 24 Years experience in the Safety &amp; Security Industry.
          </p>
          <ul className="home-story__credentials">
            {credentials.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="home-story__closing">
            We are the leading &amp; efficient solution providers of Safety &amp; Security Systems in India
            &amp; Overseas, having strong clientele &amp; testimonials. It is our commitment for quality,
            innovation &amp; service that brings our customers back again &amp; again for all the Security
            &amp; Surveillance needs.
          </p>
        </div>
        <figure className="home-story__figure">
          <div className="home-story__media">
            <OptimizedPicture
              basePath="/home/ola-ads"
              fallbackExt="jpg"
              alt="ALTRON project collage including Ola Electric Bike Factory at Pochampalli SIPCOT"
              responsiveWidths={WIDTHS.homeFeature}
              sizes={SIZES.homeFeature}
              width={1024}
              height={714}
              loading="lazy"
              decoding="async"
            />
          </div>
          <figcaption className="home-story__caption">
            Ola Electric Bike Factory @ Pochampalli SIPCOT — field installation highlights
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
