import { useEffect, useRef } from 'react'
import { subscribeToScrollProgress } from '../../utils/scrollSignals'

/**
 * Slim progress bar that fills as the user scrolls down the page.
 * Adds reading affordance to long product/landing pages.
 */
function ScrollProgress() {
  const progressRef = useRef(null)

  useEffect(() => {
    return subscribeToScrollProgress((progress) => {
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`
      }
    })
  }, [])

  return (
    <div className="scroll-progress" aria-hidden="true">
      <span ref={progressRef} />
    </div>
  )
}

export default ScrollProgress
