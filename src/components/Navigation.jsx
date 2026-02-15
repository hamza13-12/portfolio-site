import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Smooth progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-accent z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Nav */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className={`fixed top-[2px] left-0 right-0 z-40 transition-all duration-700 ${
          scrolled
            ? 'bg-[#050505]/70 backdrop-blur-2xl border-b border-white/[0.04]'
            : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <a
            href="#top"
            className="group flex items-center gap-2"
          >
            <span className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent text-xs font-bold group-hover:bg-accent group-hover:text-white transition-all duration-300">
              HA
            </span>
          </a>

          <div className="flex items-center gap-6">
            <a
              href="https://www.linkedin.com/in/hamza1312"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-text-primary transition-colors text-sm hidden sm:block"
            >
              LinkedIn
            </a>
            <a
              href="#contact"
              className="text-sm font-medium text-text-primary bg-white/[0.05] border border-white/[0.08] px-5 py-2 rounded-full hover:bg-accent/10 hover:border-accent/30 hover:text-accent transition-all duration-300"
            >
              Let's talk
            </a>
          </div>
        </div>
      </motion.nav>
    </>
  )
}
