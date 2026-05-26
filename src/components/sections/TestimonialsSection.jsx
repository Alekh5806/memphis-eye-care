import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import Container from '../common/Container'
import SectionHeading from '../common/SectionHeading'
import testimonials from '../../data/testimonials.json'

function TestimonialsSection() {
  return (
    <section className="testimonials-section">
      <Container>
        <SectionHeading
          eyebrow="Partner voices"
          title="A partner that hospitals, distributors and pharma teams keep coming back to."
          text="Selected feedback from procurement leaders, regulatory teams, and distribution partners we work with across our active markets."
        />
        <div className="testimonials-grid">
          {testimonials.map((item, i) => (
            <motion.figure
              className="testimonial-card"
              key={item.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <Quote size={22} className="testimonial-quote-icon" aria-hidden="true" />
              <blockquote>{item.quote}</blockquote>
              <div className="testimonial-rating" aria-label={`${item.rating} out of 5 stars`}>
                {Array.from({ length: item.rating }).map((_, idx) => (
                  <Star key={idx} size={14} fill="currentColor" stroke="none" />
                ))}
              </div>
              <figcaption>
                <strong>{item.name}</strong>
                <span>{item.role} · {item.organization}</span>
                <small>{item.country}</small>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default TestimonialsSection
