import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { isPastScrollThreshold, subscribeToScrollThreshold } from '../../utils/scrollSignals'

/**
 * Floating back-to-top button. Appears after the user scrolls > 600px.
 */
function BackToTop() {
  const [visible, setVisible] = useState(() => isPastScrollThreshold(600))

  useEffect(() => {
    return subscribeToScrollThreshold(600, setVisible)
  }, [])

  if (!visible) return null

  return (
    <button
      type="button"
      className="back-to-top"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <ArrowUp size={18} />
    </button>
  )
}

export default BackToTop
