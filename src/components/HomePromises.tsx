import { OptimizedPicture } from './OptimizedPicture'
import { SIZES, WIDTHS } from '../lib/responsiveImage'

const promises = [
  {
    title: '24 / 7 / 365 SUPPORT',
    text: 'We affirm to provide 24 x 7 Customer Care.',
  },
  {
    title: 'AFFORDABLE RATES',
    text: 'We promise to deliver only the highest caliber security equipment.',
  },
  {
    title: 'TRUSTWORTHY',
    text: 'We promise to provide world class design & installation standards.',
  },
  {
    title: 'RELIABLE AND PROVEN',
    text: 'We promise to complete the Projects On-time, every time.',
  },
  {
    title: 'DIFFERENT RANGE',
    text: 'We promise to visit Preventing Maintenance once in 3 months In Warranty Period',
  },
  {
    title: 'EXPERTS AND STAFF',
    text: 'We pledge free technical support and the best warranty and repair service.',
  },
  {
    title: 'CUSTOMER DEMAND',
    text: 'We pledge to continually improve our product lines to reflect emerging technology & customer demand',
  },
] as const

export function HomePromises() {
  return (
    <section className="home-story home-story--pledges" aria-labelledby="home-pledges-heading">
      <div className="home-story__inner home-story__inner--media-first">
        <figure className="home-story__figure">
          <div className="home-story__media">
            <OptimizedPicture
              basePath="/home/altron-home1"
              fallbackExt="jpg"
              alt="ALTRON Security Engineering team at corporate office"
              responsiveWidths={WIDTHS.homeFeature}
              sizes={SIZES.homeFeature}
              loading="lazy"
              decoding="async"
              width={960}
              height={640}
            />
          </div>
          <figcaption className="home-story__caption">Our team at the ALTRON corporate office</figcaption>
        </figure>

        <div className="home-story__copy">
          <p className="home-story__eyebrow" id="home-pledges-heading">
            Our commitments
          </p>
          <ul className="home-pledge-grid">
            {promises.map((item, index) => (
              <li key={item.title} className="home-pledge-card">
                <span className="home-pledge-card__index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="home-pledge-card__body">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
