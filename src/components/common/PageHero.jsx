import Container from './Container'

function PageHero({ eyebrow, title, text }) {
  return (
    <section className="page-hero">
      <Container>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {text && <p>{text}</p>}
      </Container>
    </section>
  )
}

export default PageHero
