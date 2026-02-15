import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const awards = [
  'Summa Cum Laude',
  'Swami Ram Teerath Medal — Highest CGPA in Faculty',
  'Vice Rector\'s List — 6 times (Perfect 4.0 semesters)',
  'MICCAI 2025 RISE Travel Grant — Daejeon, South Korea',
]

const leadership = [
  { role: 'President', org: 'Google Developer Student Club FCCU', detail: 'Led TechSeekho workshops & Code Wars' },
  { role: 'Founder & President', org: 'OmniLife VR FCCU', detail: 'VR/AR society · 70+ members' },
  { role: 'Event Head', org: 'Forman Ignite', detail: 'Inter-university tech event' },
  { role: 'Teaching Assistant', org: 'FCCU — 3 courses', detail: 'ML, Linear Algebra, DSA · 300+ students' },
]

export default function Education() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section className="py-32 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Education + Awards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="h-[1px] w-12 bg-accent" />
              <span className="text-accent text-xs font-semibold tracking-[0.3em] uppercase">
                Foundation
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-text-primary tracking-tight mb-10">
              Education
            </h2>

            <div className="bg-bg-elevated border border-white/[0.06] rounded-2xl p-8 mb-8">
              <p className="text-text-primary font-semibold text-lg">
                Forman Christian College
              </p>
              <p className="text-text-secondary text-sm mt-1">
                B.Sc. Computer Science
              </p>
              <div className="flex items-center gap-4 mt-3">
                <span className="text-2xl font-semibold text-accent">3.9/4.0</span>
                <span className="text-text-muted text-sm">CGPA · 2020 — 2024</span>
              </div>
            </div>

            <div className="space-y-3">
              {awards.map((award, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                  className="flex items-start gap-3 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/60 mt-2 shrink-0 group-hover:bg-accent transition-colors" />
                  <p className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">{award}</p>
                </motion.div>
              ))}
            </div>

            {/* International */}
            <div className="mt-10 pt-8 border-t border-white/[0.04]">
              <p className="text-text-muted text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                International
              </p>
              <div className="space-y-2">
                {[
                  ['MICCAI 2025', 'Daejeon, South Korea'],
                  ['Soliya Connect', 'Global Discourse Program'],
                  ['UFMG Summer School', 'Brazil · 60 hrs, 2 ECTS'],
                ].map(([name, detail], i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="text-sm text-text-secondary"
                  >
                    <span className="text-text-primary font-medium">{name}</span>
                    <span className="text-text-muted"> — {detail}</span>
                  </motion.p>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Leadership */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="h-[1px] w-12 bg-accent" />
              <span className="text-accent text-xs font-semibold tracking-[0.3em] uppercase">
                Beyond Code
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-text-primary tracking-tight mb-10">
              Leadership
            </h2>

            <div className="space-y-6">
              {leadership.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="group bg-bg-elevated border border-white/[0.04] rounded-xl p-6 hover:border-accent/20 transition-all duration-500"
                >
                  <p className="text-text-primary font-medium group-hover:text-accent transition-colors">
                    {item.role}
                  </p>
                  <p className="text-text-secondary text-sm mt-1">{item.org}</p>
                  <p className="text-text-muted text-sm mt-2">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
