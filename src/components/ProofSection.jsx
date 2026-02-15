import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import AnimatedCounter from './AnimatedCounter'

function MetricCard({ metric, index, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group bg-bg-elevated border border-white/[0.06] rounded-2xl p-6 md:p-8 hover:border-accent/20 transition-colors duration-500 relative overflow-hidden"
    >
      {/* Subtle glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <p className="text-metric text-text-primary relative z-10">
        {metric.value}
      </p>
      <p className="text-text-muted text-sm mt-2 relative z-10">{metric.label}</p>
    </motion.div>
  )
}

export default function ProofSection({
  id,
  claim,
  company,
  role,
  period,
  description,
  metrics,
  tech,
  index = 0,
}) {
  const claimRef = useRef(null)
  const evidenceRef = useRef(null)
  const claimInView = useInView(claimRef, { once: true, margin: '-30%' })
  const evidenceInView = useInView(evidenceRef, { once: true, margin: '-10%' })

  // Parallax for claim text
  const { scrollYProgress } = useScroll({
    target: claimRef,
    offset: ['start end', 'end start'],
  })
  const claimY = useTransform(scrollYProgress, [0, 1], [60, -60])

  // Split claim into lines for staggered animation
  const claimLines = claim.split('\n')

  return (
    <>
      {/* PART 1: The Claim — full screen, centered, dramatic */}
      <section
        id={id}
        ref={claimRef}
        className="flex items-center relative overflow-hidden py-32 md:py-44"
      >
        {/* Background number */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[20vw] font-bold text-white/[0.02] select-none">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <motion.div style={{ y: claimY }} className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={claimInView ? { opacity: 1, width: 'auto' } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="h-[1px] w-12 bg-accent" />
            <span className="text-accent text-xs font-semibold tracking-[0.3em] uppercase">
              Proof {String(index + 1).padStart(2, '0')}
            </span>
          </motion.div>

          {/* Claim text — each line animates separately */}
          <h2 className="max-w-5xl">
            {claimLines.map((line, lineIdx) => (
              <span key={lineIdx} className="block overflow-hidden">
                <motion.span
                  className="block text-[clamp(2.5rem,7.5vw,6.5rem)] font-light leading-[1.05] tracking-[-0.03em] text-text-primary"
                  initial={{ y: '100%' }}
                  animate={claimInView ? { y: '0%' } : {}}
                  transition={{
                    duration: 1,
                    delay: 0.2 + lineIdx * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h2>

          {/* Subtitle context */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={claimInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-text-muted text-base md:text-lg mt-8 max-w-lg"
          >
            {company} — {role}
          </motion.p>
        </motion.div>
      </section>

      {/* PART 2: The Evidence */}
      <section ref={evidenceRef} className="pb-24 md:pb-32 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Left: Context */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={evidenceInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-4"
            >
              <div className="lg:sticky lg:top-32 space-y-6">
                <div>
                  <p className="text-text-primary font-semibold text-xl">{company}</p>
                  <p className="text-accent text-sm font-medium mt-1">{role}</p>
                  <p className="text-text-muted text-sm mt-2">{period}</p>
                </div>

                <div className="h-[1px] bg-white/10" />

                <p className="text-text-secondary text-[15px] leading-relaxed">
                  {description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {tech.map((t, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={evidenceInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.5 + i * 0.05 }}
                      className="text-xs font-medium text-text-muted bg-white/[0.03] border border-white/[0.06] rounded-full px-3 py-1.5 hover:text-accent hover:border-accent/30 hover:bg-accent/5 transition-all duration-300"
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right: Metrics */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
                {metrics.map((metric, i) => (
                  <MetricCard
                    key={i}
                    metric={metric}
                    index={i}
                    isInView={evidenceInView}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
