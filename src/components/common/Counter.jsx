import { useEffect, useRef, useState } from 'react'

/**
 * Counts from 0 to `to` when the element scrolls into view.
 * `to` may include a numeric value; non-numeric prefixes/suffixes are preserved.
 * Example: <Counter to="25+" /> => animates 0..25 then appends "+"
 */
function parseValue(raw) {
  if (typeof raw === 'number') return { num: raw, prefix: '', suffix: '' }
  const str = String(raw ?? '')
  const match = str.match(/^(\D*)([\d.,]+)(.*)$/)
  if (!match) return { num: null, prefix: str, suffix: '' }
  const num = parseFloat(match[2].replace(/,/g, ''))
  return Number.isFinite(num)
    ? { num, prefix: match[1] || '', suffix: match[3] || '' }
    : { num: null, prefix: str, suffix: '' }
}

function format(n, hasDecimals) {
  if (hasDecimals) return n.toFixed(1)
  return Math.round(n).toLocaleString('en-IN')
}

function Counter({ to, duration = 1600, className = '' }) {
  const ref = useRef(null)
  const { num, prefix, suffix } = parseValue(to)
  const hasDecimals = String(to).includes('.')
  const initialDisplay =
    num == null ? `${prefix}${suffix}` : `${prefix}${format(0, hasDecimals)}${suffix}`
  const [display, setDisplay] = useState(initialDisplay)
  const animatedRef = useRef(false)

  useEffect(() => {
    if (num == null) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplay(`${prefix}${format(num, hasDecimals)}${suffix}`)
      return
    }

    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || animatedRef.current) return
          animatedRef.current = true

          const start = performance.now()
          const tick = (now) => {
            const t = Math.min(1, (now - start) / duration)
            const eased = 1 - Math.pow(1 - t, 3)
            setDisplay(`${prefix}${format(num * eased, hasDecimals)}${suffix}`)
            if (t < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        })
      },
      { threshold: 0.4 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [num, prefix, suffix, duration, hasDecimals])

  return (
    <span className={className} ref={ref}>
      {display}
    </span>
  )
}

export default Counter
