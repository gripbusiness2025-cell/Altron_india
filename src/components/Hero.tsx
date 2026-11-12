const smartFeatures = [
  'Lighting',
  'Security',
  'Camera',
  'Motion sensor',
  'Temperature',
  'Heating',
]

export function Hero() {
  return (
    <section className="hero-section" id="home" aria-label="Smart security solutions">
      <div className="hero-visual">
        <img
          src="/hero-smart-home.jpg"
          alt="Modern smart home secured with ALTRON electronic solutions"
          className="hero-image"
        />
        <div className="hero-badge-grid" aria-hidden="true">
          {smartFeatures.map((label) => (
            <div className="hero-badge" key={label}>
              <span className="hero-badge-icon" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
