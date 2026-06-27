import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Scrolls window to top on route change so pages start at the hero.
 * Respects prefers-reduced-motion.
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}

export default ScrollToTop
