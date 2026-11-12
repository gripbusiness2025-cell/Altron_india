const partners = [
  'SECURICO',
  'HIKVISION',
  'ALBA urmet',
  'Honeywell',
  'Dahua TECHNOLOGY',
  'ALTROX',
  'Kolumn',
  'Pyronix',
]

export function PartnerStrip() {
  return (
    <section className="partner-strip" aria-label="Partner brands">
      <div className="partner-inner">
        {partners.map((name) => (
          <div className="partner-logo" key={name}>
            <span>{name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
