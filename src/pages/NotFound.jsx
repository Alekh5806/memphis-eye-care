import Button from '../components/common/Button'
import Container from '../components/common/Container'

function NotFound() {
  return (
    <section className="section">
      <Container>
        <div className="empty-state">
          <h1>Page not found</h1>
          <p>The page you are looking for does not exist.</p>
          <Button to="/">Go home</Button>
        </div>
      </Container>
    </section>
  )
}

export default NotFound
