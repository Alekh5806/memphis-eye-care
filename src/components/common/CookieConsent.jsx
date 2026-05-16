import { useEffect, useState } from 'react'
import { Cookie, Settings2, ShieldCheck, X } from 'lucide-react'

const CONSENT_STORAGE_KEY = 'memphis-cookie-consent'
const CONSENT_EVENT = 'memphis:open-cookie-preferences'

const defaultConsent = {
  necessary: true,
  analytics: false,
  marketing: false,
  savedAt: null,
}

function readStoredConsent() {
  try {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY)
    return stored ? { ...defaultConsent, ...JSON.parse(stored) } : null
  } catch {
    return null
  }
}

function writeStoredConsent(consent) {
  const savedConsent = {
    necessary: true,
    analytics: Boolean(consent.analytics),
    marketing: Boolean(consent.marketing),
    savedAt: new Date().toISOString(),
  }

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(savedConsent))
  } catch {
    // Consent still applies for the current session if browser storage is unavailable.
  }

  window.dispatchEvent(new CustomEvent('memphis:cookie-consent-updated', { detail: savedConsent }))

  return savedConsent
}

function getInitialConsentState() {
  const storedConsent = readStoredConsent()

  return {
    isVisible: !storedConsent,
    preferences: storedConsent ?? defaultConsent,
  }
}

function PreferenceToggle({ checked, description, disabled = false, label, onChange }) {
  return (
    <label className={`cookie-toggle ${disabled ? 'cookie-toggle-locked' : ''}`}>
      <span>
        <strong>{label}</strong>
        <small>{description}</small>
      </span>
      <input checked={checked} disabled={disabled} onChange={onChange} type="checkbox" />
      <span className="cookie-switch" aria-hidden="true" />
    </label>
  )
}

function CookieConsent() {
  const [initialConsentState] = useState(getInitialConsentState)
  const [isVisible, setIsVisible] = useState(initialConsentState.isVisible)
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false)
  const [preferences, setPreferences] = useState(initialConsentState.preferences)

  useEffect(() => {
    const openPreferences = () => {
      setPreferences(readStoredConsent() ?? defaultConsent)
      setIsVisible(true)
      setIsPreferencesOpen(true)
    }

    window.addEventListener(CONSENT_EVENT, openPreferences)
    return () => window.removeEventListener(CONSENT_EVENT, openPreferences)
  }, [])

  const saveConsent = (nextConsent) => {
    const savedConsent = writeStoredConsent(nextConsent)
    setPreferences(savedConsent)
    setIsVisible(false)
    setIsPreferencesOpen(false)
  }

  const updatePreference = (key) => {
    setPreferences((current) => ({
      ...current,
      [key]: !current[key],
    }))
  }

  if (!isVisible) {
    return null
  }

  return (
    <>
      <section className="cookie-consent" aria-label="Cookie consent">
        <div className="cookie-consent-icon" aria-hidden="true">
          <Cookie size={24} />
        </div>
        <div className="cookie-consent-copy">
          <strong>Your privacy choices</strong>
          <p>
            We use necessary cookies to keep this website reliable. With your permission, we may
            also use analytics and communication cookies to improve the business enquiry
            experience.
          </p>
        </div>
        <div className="cookie-consent-actions">
          <button className="btn btn-secondary" onClick={() => setIsPreferencesOpen(true)} type="button">
            <Settings2 size={17} />
            Manage preferences
          </button>
          <button className="btn btn-outline" onClick={() => saveConsent(defaultConsent)} type="button">
            Reject optional
          </button>
          <button
            className="btn btn-primary"
            onClick={() => saveConsent({ ...defaultConsent, analytics: true, marketing: true })}
            type="button"
          >
            Accept all
          </button>
        </div>
      </section>

      {isPreferencesOpen && (
        <div className="cookie-modal-backdrop" role="presentation">
          <section
            aria-labelledby="cookie-preferences-title"
            aria-modal="true"
            className="cookie-modal"
            role="dialog"
          >
            <div className="cookie-modal-header">
              <div>
                <span className="eyebrow">Privacy center</span>
                <h2 id="cookie-preferences-title">Cookie preferences</h2>
              </div>
              <button
                aria-label="Close cookie preferences"
                className="icon-button"
                onClick={() => setIsPreferencesOpen(false)}
                type="button"
              >
                <X size={18} />
              </button>
            </div>
            <p className="cookie-modal-intro">
              Choose which optional cookies Memphis Vision Care may use. Necessary cookies are
              always active because the website cannot work properly without them.
            </p>
            <div className="cookie-preference-list">
              <PreferenceToggle
                checked
                description="Required for security, page navigation, and remembering your consent choices."
                disabled
                label="Strictly necessary"
              />
              <PreferenceToggle
                checked={preferences.analytics}
                description="Helps us understand which pages and product information visitors use most."
                label="Analytics"
                onChange={() => updatePreference('analytics')}
              />
              <PreferenceToggle
                checked={preferences.marketing}
                description="Supports relevant enquiry follow-up and partner communication measurement."
                label="Marketing and communication"
                onChange={() => updatePreference('marketing')}
              />
            </div>
            <div className="cookie-modal-note">
              <ShieldCheck size={18} />
              <span>You can reopen these settings from the footer at any time.</span>
            </div>
            <div className="cookie-modal-actions">
              <button className="btn btn-outline" onClick={() => saveConsent(defaultConsent)} type="button">
                Reject optional
              </button>
              <button className="btn btn-secondary" onClick={() => saveConsent(preferences)} type="button">
                Save choices
              </button>
              <button
                className="btn btn-primary"
                onClick={() => saveConsent({ ...defaultConsent, analytics: true, marketing: true })}
                type="button"
              >
                Accept all
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  )
}

export { CONSENT_EVENT }
export default CookieConsent
