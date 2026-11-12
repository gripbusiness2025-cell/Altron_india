import { CorporateBanner } from '../components/CorporateBanner'
import { HomeIntro } from '../components/HomeIntro'
import { HomePromises } from '../components/HomePromises'
import { ClientsCarousel } from '../components/ClientsCarousel'
import { HomeQuickLinks } from '../components/HomeQuickLinks'
import { GoogleReviewBadge } from '../components/GoogleReviewBadge'

const MAP_URL =
  'https://www.google.com/maps/place/Altron+Security+Engineering+India+Private+Limited/@13.0455704,80.2159869,15z/data=!4m7!3m6!1s0x0:0xdb2cd0ab3b049bf7!8m2!3d13.0455704!4d80.2159869!9m1!1b1'

export function HomePage() {
  return (
    <main className="home-page">
      <h1 className="sr-only">
        ALTRON Security Engineering — Electronic security solutions in India since 2000
      </h1>
      <CorporateBanner ariaLabel="ALTRON highlights" />
      <div className="home-page-body">
        <HomeIntro />
        <HomePromises />
        <section className="home-distributor" aria-labelledby="home-distributor-heading">
          <h2 id="home-distributor-heading" className="home-section-title">
            AUTHORISED DISTRIBUTOR
          </h2>
          <a href="https://altroxworld.com/" target="_blank" rel="noopener noreferrer">
            <img src="/home/altrox.png" alt="ALTROX World Corp." width={300} height={87} loading="lazy" />
          </a>
        </section>
        <ClientsCarousel />
        <HomeQuickLinks />
        <section className="home-cta" aria-labelledby="home-cta-heading">
          <h2 id="home-cta-heading" className="home-cta-title">
            WANT TO KNOW MORE? IT&apos;S AS EASY.. CALL US ON (+91) 95512 02222
          </h2>
        </section>
        <section className="home-reviews" aria-label="Google reviews">
          <a href={MAP_URL} target="_blank" rel="noopener noreferrer">
            <GoogleReviewBadge />
          </a>
        </section>
      </div>
    </main>
  )
}
