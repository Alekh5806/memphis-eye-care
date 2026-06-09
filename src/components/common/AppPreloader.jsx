import { useEffect, useState } from 'react'

const INTRO_STORAGE_KEY = 'memphis_intro_seen'

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

  useEffect(() => {
    if (!isVisible) return undefined

    const leaveTimer = window.setTimeout(() => setIsLeaving(true), 850)
    const removeTimer = window.setTimeout(() => {
      markIntroSeen()
      setIsVisible(false)
    }, 1200)

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
