import { SITE_URL, SITE_NAME, DEFAULT_DESCRIPTION } from './site'

const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/altronlogo.png`,
  description: DEFAULT_DESCRIPTION,
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+91-95512-02222',
      contactType: 'customer service',
      email: 'info@altronindia.com',
      areaServed: 'IN',
      availableLanguage: ['en'],
    },
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Chennai',
    addressCountry: 'IN',
  },
}

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: SITE_NAME,
  image: `${SITE_URL}/altronlogo.png`,
  url: SITE_URL,
  telephone: '+91-95512-02222',
  email: 'info@altronindia.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Chennai',
    addressRegion: 'Tamil Nadu',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 13.0455704,
    longitude: 80.2159869,
  },
  priceRange: '$$',
}

export function GlobalJsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
    </>
  )
}

export function ProductJsonLd({
  name,
  description,
  image,
  url,
}: {
  name: string
  description: string
  image?: string | null
  url: string
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description: description.replace(/<[^>]+>/g, ' ').trim(),
    ...(image ? { image } : {}),
    url,
    brand: {
      '@type': 'Brand',
      name: 'ALTRON',
    },
  }

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}
