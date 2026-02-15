import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import MagneticButton from './MagneticButton'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-15%' })

  return (
    <section id="contact" className="relative min-h-[80vh] flex items-center py-32" ref={ref}>
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/[0.07] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-text-muted text-xs font-medium tracking-[0.25em] uppercase mb-8"
          >
            What's next
          </motion.p>

          <h2 className="max-w-3xl mb-8">
            {['Let\'s build', 'something.'].map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  className={`block text-[clamp(2.5rem,7vw,6rem)] font-light leading-[1.1] tracking-[-0.03em] ${
                    i === 1
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400'
                      : 'text-text-primary'
                  }`}
                  initial={{ y: '100%' }}
                  animate={isInView ? { y: '0%' } : {}}
                  transition={{
                    duration: 1,
                    delay: 0.2 + i * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base md:text-lg text-text-secondary leading-relaxed mb-14 max-w-lg"
          >
            Whether it's a research collaboration, a startup idea, or an engineering
            challenge — I'm always up for a conversation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <MagneticButton
              href="mailto:hamzaahmad277@gmail.com"
              className="group relative inline-flex items-center gap-3 text-white bg-accent px-8 py-4 rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_50px_rgba(139,92,246,0.4)] text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
              hamzaahmad277@gmail.com
            </MagneticButton>

            <MagneticButton
              href="https://www.linkedin.com/in/hamza1312"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-text-secondary border border-white/10 px-8 py-4 rounded-full hover:text-text-primary hover:border-white/20 hover:bg-white/[0.03] transition-all duration-300 text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-32 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <p className="text-text-muted text-xs tracking-wide">
            Hamza Ahmad — Lahore, Pakistan
          </p>
          <p className="text-text-muted/50 text-xs italic">
            Built with purpose, not templates.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
