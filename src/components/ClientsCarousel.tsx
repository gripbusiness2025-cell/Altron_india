const clientFiles = [
  '1-2',
  '2-1',
  '3-1',
  '4-1',
  '5-1',
  '6-1',
  '7-1',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27-1',
  '28',
  '29-1',
  '30',
  '31',
  '32',
] as const

export function ClientsCarousel() {
  const track = [...clientFiles, ...clientFiles]

  return (
    <section className="home-clients" aria-labelledby="home-clients-heading">
      <h2 id="home-clients-heading" className="home-section-title">
        ESTEEMED CLIENTS
      </h2>
      <div className="clients-marquee" aria-hidden="false">
        <div className="clients-track">
          {track.map((name, index) => (
            <img
              key={`${name}-${index}`}
              src={`/home/clients/${name}.jpg`}
              alt=""
              width={200}
              height={182}
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
