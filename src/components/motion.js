// Shared motion tokens: one easing curve, one set of durations, reused by every page.
export const ease = [0.25, 0.46, 0.45, 0.94]
export const viewportOnce = { once: true, margin: '-60px' }

export const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }
export const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } }
export const imageReveal = { hidden: { opacity: 0, scale: 0.97 }, show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease } } }
export const pageTransition = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease } } }

export const cardHover = { y: -4, boxShadow: '0 12px 24px -8px rgba(6,43,38,0.18)', transition: { duration: 0.3, ease: 'easeOut' } }
export const imageHover = { scale: 1.01, transition: { duration: 0.3, ease: 'easeOut' } }
export const tap = { scale: 0.97 }
