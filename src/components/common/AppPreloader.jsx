import { useEffect, useInsertionEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const INTRO_STORAGE_KEY = 'memphis_intro_seen'
const REVEAL_READY_CLASS = 'page-reveal-ready'
const REVEAL_PENDING_CLASS = 'page-reveal-pending'
const INTRO_DELAYED_CLASS = 'intro-reveal-delayed'
const REVEAL_CLASS_DURATION = 2200
const ROUTE_REVEAL_DELAY = 140
const INTRO_REVEAL_DELAY = 760

function hasSeenIntro() {
  try {
    return window.sessionStorage.getItem(INTRO_STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

function markIntroSeen() {
  try {
    window.sessionStorage.setItem(INTRO_STORAGE_KEY, 'true')
  } catch {
    // Storage can be unavailable in private modes; the loader still works.
  }
}

function AppPreloader() {
  const [isVisible, setIsVisible] = useState(() => (typeof window === 'undefined' ? false : !hasSeenIntro()))
  const [isLeaving, setIsLeaving] = useState(false)
  const location = useLocation()

  useInsertionEffect(() => {
    if (typeof document === 'undefined') return undefined

    document.documentElement.classList.add(REVEAL_PENDING_CLASS)
    if (isVisible) {
      document.documentElement.classList.add(INTRO_DELAYED_CLASS)
    }
    return undefined
  }, [])

  useEffect(() => {
    if (isVisible || typeof window === 'undefined' || typeof document === 'undefined') return undefined

    document.documentElement.classList.add(REVEAL_PENDING_CLASS)
    document.documentElement.classList.remove(REVEAL_READY_CLASS)

    const revealTimer = window.setTimeout(() => {
      document.documentElement.classList.remove(REVEAL_PENDING_CLASS)
      document.documentElement.classList.add(REVEAL_READY_CLASS)
    }, document.documentElement.classList.contains(INTRO_DELAYED_CLASS) ? INTRO_REVEAL_DELAY : ROUTE_REVEAL_DELAY)
    const timer = window.setTimeout(() => {
      document.documentElement.classList.remove(REVEAL_READY_CLASS, INTRO_DELAYED_CLASS)
    }, REVEAL_CLASS_DURATION)

    return () => {
      window.clearTimeout(revealTimer)
      window.clearTimeout(timer)
    }
  }, [isVisible, location.pathname, location.search])

  useEffect(() => {
    if (!isVisible) return undefined

    const leaveTimer = window.setTimeout(() => setIsLeaving(true), 420)
    const removeTimer = window.setTimeout(() => {
      markIntroSeen()
      setIsVisible(false)
    }, 680)

    return () => {
      window.clearTimeout(leaveTimer)
      window.clearTimeout(removeTimer)
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <section
      className={`app-preloader${isLeaving ? ' app-preloader--leaving' : ''}`}
      aria-label="Loading Memphis Vision Care"
      aria-live="polite"
    >
      <div className="app-preloader__mark" aria-hidden="true">
        <span className="app-preloader__orbit" />
        <span className="app-preloader__scan" />
        <img src="/images/logo/memphis-vision-care-logo.svg" alt="" />
      </div>
      <div className="app-preloader__copy">
        <span>Sterile PFS manufacturing</span>
        <strong>Memphis Vision Care</strong>
        <p>Passionate to healthcare</p>
      </div>
      <div className="app-preloader__progress" aria-hidden="true">
        <span />
      </div>
      <span className="sr-only">Loading Memphis Vision Care website</span>
    </section>
  )
}

export default AppPreloader
