import { useEffect, useState } from 'react'

const REVEAL_READY_CLASS = 'page-reveal-ready'
const REVEAL_PENDING_CLASS = 'page-reveal-pending'
const INTRO_DELAYED_CLASS = 'intro-reveal-delayed'

export const revealEase = [0.22, 1, 0.36, 1]

export const revealViewport = {
  once: true,
  amount: 0.28,
}

export const revealInView = {
  initial: 'hidden',
  whileInView: 'visible',
  viewport: revealViewport,
}

export const riseReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export const panelReveal = {
  hidden: { opacity: 0, y: 28, scale: 0.975 },
  visible: { opacity: 1, y: 0, scale: 1 },
}

export const revealTransition = (delay = 0, duration = 0.55) => ({
  duration,
  delay,
  ease: revealEase,
})

export function usePageRevealReady() {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (typeof document === 'undefined' || typeof MutationObserver === 'undefined') return undefined

    const root = document.documentElement
    const syncRevealState = () => {
      const isRevealMoment = root.classList.contains(REVEAL_READY_CLASS)
        || (!root.classList.contains(REVEAL_PENDING_CLASS) && !root.classList.contains(INTRO_DELAYED_CLASS))

      setIsReady((wasReady) => wasReady || isRevealMoment)
    }

    syncRevealState()

    const observer = new MutationObserver(syncRevealState)
    observer.observe(root, { attributes: true, attributeFilter: ['class'] })

    return () => observer.disconnect()
  }, [])

  return isReady
}
