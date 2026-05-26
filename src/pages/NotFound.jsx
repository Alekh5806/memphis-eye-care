import { Home as HomeIcon, Search } from 'lucide-react'
import Button from '../components/common/Button'
import Container from '../components/common/Container'
import DocumentHead from '../components/common/DocumentHead'

function NotFound() {
  return (
    <>
      <DocumentHead title="Page not found" description="The page you are looking for does not exist." />
      <section className="section not-found-section">
        <Container>
          <div className="empty-state not-found-state">
            <span className="not-found-code" aria-hidden="true">404</span>
            <h1>This page wandered off the production line.</h1>
            <p>The page you are looking for does not exist or may have moved. Use the buttons below to continue exploring Memphis Vision Care.</p>
            <div className="hero-actions">
              <Button to="/"><HomeIcon size={16} /> Back to home</Button>
              <Button to="/products" variant="outline"><Search size={16} /> Browse products</Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

export default NotFound
