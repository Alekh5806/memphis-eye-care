const thresholdSubscribers = new Set()
const progressSubscribers = new Set()

let isListening = false
let ticking = false

function getScrollY() {
  return typeof window === 'undefined' ? 0 : window.scrollY || window.pageYOffset || 0
}

function getProgress() {
  if (typeof window === 'undefined') return 0

  const max = document.documentElement.scrollHeight - window.innerHeight
  return max > 0 ? Math.min(1, getScrollY() / max) : 0
}

export function isPastScrollThreshold(threshold) {
  return getScrollY() > threshold
}

function flushScrollState() {
  ticking = false

  const scrollY = getScrollY()

  thresholdSubscribers.forEach((subscriber) => {
    const nextValue = scrollY > subscriber.threshold
    if (nextValue !== subscriber.value) {
      subscriber.value = nextValue
      subscriber.callback(nextValue)
    }
  })

  if (progressSubscribers.size) {
    const progress = getProgress()
    progressSubscribers.forEach((callback) => callback(progress))
  }
}

function scheduleScrollFlush() {
  if (ticking) return
  ticking = true
  window.requestAnimationFrame(flushScrollState)
}

function ensureScrollListener() {
  if (isListening || typeof window === 'undefined') return

  isListening = true
  window.addEventListener('scroll', scheduleScrollFlush, { passive: true })
  window.addEventListener('resize', scheduleScrollFlush)
}

function cleanupScrollListener() {
  if (!isListening || thresholdSubscribers.size || progressSubscribers.size) return

  isListening = false
  ticking = false
  window.removeEventListener('scroll', scheduleScrollFlush)
  window.removeEventListener('resize', scheduleScrollFlush)
}

export function subscribeToScrollThreshold(threshold, callback) {
  if (typeof window === 'undefined') return () => {}

  const subscriber = {
    threshold,
    callback,
    value: isPastScrollThreshold(threshold),
  }

  thresholdSubscribers.add(subscriber)
  ensureScrollListener()
  callback(subscriber.value)

  return () => {
    thresholdSubscribers.delete(subscriber)
    cleanupScrollListener()
  }
}

export function subscribeToScrollProgress(callback) {
  if (typeof window === 'undefined') return () => {}

  progressSubscribers.add(callback)
  ensureScrollListener()
  callback(getProgress())

  return () => {
    progressSubscribers.delete(callback)
    cleanupScrollListener()
  }
}
