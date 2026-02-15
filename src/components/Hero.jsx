import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import NeuralCanvas from './NeuralCanvas'
import MagneticButton from './MagneticButton'

export default function Hero() {
  const containerRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.8], [0, -100])
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95])

  useEffect(() => {
    const handleMouse = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  const nameChars = 'Hamza Ahmad'.split('')

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative h-[110vh] flex items-center justify-center overflow-hidden"
    >
      {/* Neural particle background */}
      <NeuralCanvas />

      {/* Animated gradient orb */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(139,92,246,0.05) 40%, transparent 70%)',
          x: mousePos.x * 2,
          y: mousePos.y * 2,
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Content with parallax on scroll */}
      <motion.div
        style={{ opacity, y, scale }}
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full"
      >
        <div className="max-w-5xl">
          {/* Status indicator */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex items-center gap-2 mb-10"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-text-muted text-xs font-medium tracking-wide">
              Currently Technical Lead at Cloudpacer
            </span>
          </motion.div>

          {/* Name with character-by-character reveal + parallax */}
          <motion.h1
            className="mb-6"
            style={{
              x: mousePos.x * 0.5,
              y: mousePos.y * 0.5,
            }}
          >
            <span className="block text-[clamp(3rem,10vw,9rem)] font-light leading-[0.9] tracking-[-0.04em] text-text-primary">
              {nameChars.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 80, rotate: 5 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{
                    delay: 0.5 + i * 0.04,
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block"
                  style={{ marginRight: char === ' ' ? '0.25em' : '0' }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          {/* Role tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-wrap gap-3 mb-10"
          >
            {['AI Engineer', 'Researcher', 'Builder'].map((tag, i) => (
              <span
                key={i}
                className="text-xs font-medium tracking-[0.15em] uppercase text-text-muted border border-white/10 rounded-full px-4 py-2"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed"
          >
            I build AI systems that ship at startup speed and publish at research depth.
            Published at{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400 font-medium">
              MICCAI & CHI
            </span>
            . Founding engineer at{' '}
            <span className="text-text-primary font-medium">YC S25</span>.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.8 }}
            className="mt-12 flex flex-wrap items-center gap-5"
          >
            <MagneticButton
              href="#proof-1"
              className="group relative text-sm font-medium text-bg bg-text-primary px-8 py-4 rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(139,92,246,0.3)]"
            >
              <span className="relative z-10">See the proof</span>
              <span className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center text-white text-sm font-medium">
                See the proof
              </span>
            </MagneticButton>

            <MagneticButton
              href="mailto:hamzaahmad277@gmail.com"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors border-b border-white/20 hover:border-accent pb-1"
            >
              hamzaahmad277@gmail.com
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator — animated line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-text-muted text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          className="w-[1px] h-8 bg-gradient-to-b from-accent/50 to-transparent origin-top"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
