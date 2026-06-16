import { useState, useEffect } from 'react'

// Tracks whether the viewport is a small/touch screen.
// Uses matchMedia so it stays in sync on resize / orientation change.
export default function useIsMobile(query = '(max-width: 767px)') {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  )

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setIsMobile(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return isMobile
}
