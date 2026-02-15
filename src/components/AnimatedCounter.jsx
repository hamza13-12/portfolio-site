import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

export default function AnimatedCounter({ value, suffix = '', prefix = '', duration = 1.5 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const numericValue = parseFloat(value.toString().replace(/[^0-9.]/g, ''))
    if (isNaN(numericValue)) return

    const startTime = performance.now()
    const animate = (currentTime) => {
      const elapsed = (currentTime - startTime) / 1000
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * numericValue)
      setDisplay(current)
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [isInView, value, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{isInView ? display.toLocaleString() : '0'}{suffix}
    </span>
  )
}
