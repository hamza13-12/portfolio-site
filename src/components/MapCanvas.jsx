import { useEffect, useRef } from 'react'

export default function MapCanvas({ mousePos }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    // Warm dust motes floating in light
    const PARTICLE_COUNT = 40
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.15 - 0.05,
      radius: Math.random() * 1.2 + 0.3,
      alpha: Math.random() * 0.15 + 0.03,
      pulseOffset: Math.random() * Math.PI * 2,
    }))

    let time = 0

    const animate = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      ctx.clearRect(0, 0, w, h)
      time++

      const mx = mousePos.current?.x ?? -1000
      const my = mousePos.current?.y ?? -1000

      particles.forEach((p) => {
        p.x += p.vx + Math.sin(time * 0.003 + p.pulseOffset) * 0.08
        p.y += p.vy + Math.cos(time * 0.004 + p.pulseOffset) * 0.06

        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w }
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y > h + 10) { p.y = -10; p.x = Math.random() * w }

        // Brighten near mouse
        const dx = p.x - mx
        const dy = p.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        const boost = dist < 250 ? (1 - dist / 250) * 0.2 : 0

        const pulse = Math.sin(time * 0.015 + p.pulseOffset) * 0.04
        const alpha = Math.min(p.alpha + pulse + boost, 0.4)

        // Warm brown dust mote
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(120, 85, 40, ${alpha})`
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas ref={canvasRef} className="absolute inset-0 z-[5] pointer-events-none" />
  )
}
