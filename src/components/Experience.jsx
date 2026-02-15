import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const experiences = [
  {
    company: 'Cloudpacer',
    role: 'Technical Lead',
    period: 'Sep 2025 — Present',
    highlight: 'Autonomous freight AI platform',
    active: true,
  },
  {
    company: 'U.n.I',
    role: 'AI Engineer',
    period: 'Mar — Sep 2025',
    highlight: 'Multi-modal user discovery · 3x connection requests',
  },
  {
    company: 'Uplift AI',
    role: 'Founding AI Engineer',
    period: 'Jun — Jul 2025',
    highlight: 'Y Combinator S25 · Voice AI',
  },
  {
    company: 'Tkxel',
    role: 'Associate Software Engineer',
    period: 'Jul 2024 — Jun 2025',
    highlight: 'AI digital twins · 50K+ users',
  },
  {
    company: 'LUMS — CV&G Lab',
    role: 'Research Assistant',
    period: 'Sep 2024 — Jun 2025',
    highlight: 'Brain-computer interfaces · MICCAI',
  },
  {
    company: 'Adinteractive',
    role: 'Software Engineer',
    period: 'Oct 2023 — Oct 2024',
    highlight: 'YOLOv8 product detection',
  },
  {
    company: 'Crowdbotics',
    role: 'Back End Engineer',
    period: 'Oct 2024 — Jun 2025',
    highlight: 'Rec engines · Payment systems',
  },
]

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section className="py-32 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="h-[1px] w-12 bg-accent" />
            <span className="text-accent text-xs font-semibold tracking-[0.3em] uppercase">
              The Full Picture
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-text-primary tracking-tight">
            Experience
          </h2>
        </motion.div>

        <div>
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
              className="group relative"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 py-5 md:py-6 border-b border-white/[0.04] hover:border-accent/20 transition-all duration-500 cursor-default">
                {/* Company */}
                <div className="md:col-span-3 flex items-center gap-3">
                  {exp.active && (
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                  )}
                  <p className="text-text-primary font-medium group-hover:text-accent transition-colors duration-300">
                    {exp.company}
                  </p>
                </div>

                {/* Role */}
                <div className="md:col-span-3">
                  <p className="text-text-secondary text-sm">{exp.role}</p>
                </div>

                {/* Period */}
                <div className="md:col-span-3">
                  <p className="text-text-muted text-sm font-mono">{exp.period}</p>
                </div>

                {/* Highlight */}
                <div className="md:col-span-3">
                  <p className="text-text-muted text-sm md:text-right opacity-0 md:opacity-100 group-hover:text-text-secondary transition-colors duration-300">
                    {exp.highlight}
                  </p>
                </div>
              </div>

              {/* Hover accent line */}
              <motion.div
                className="absolute left-0 bottom-0 h-[1px] bg-accent"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
