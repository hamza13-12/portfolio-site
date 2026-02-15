import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const publications = [
  {
    title: 'CATVis: Context-Aware Thought Visualization',
    venue: 'MICCAI 2025',
    venueFullName: 'Medical Image Computing and Computer Assisted Intervention',
    authors: 'Mehmood, T., Ahmad, H., Shakeel, M. H., & Taj, M.',
    description: 'Novel 5-stage EEG-to-image framework achieving 27% higher classification accuracy and 37% FID reduction over state-of-the-art through supervised learning and cross-modal alignment.',
    tag: 'Computer Vision',
    venueColor: 'from-violet-500 to-purple-600',
    borderColor: 'hover:border-violet-500/30',
  },
  {
    title: 'Mitigating Toxicity in Social Media: Redesign Guidelines for Cultivating Positive User Interactions',
    venue: 'CHI EA \'25',
    venueFullName: 'Extended Abstracts of the CHI Conference on Human Factors in Computing Systems',
    authors: 'Ahmad, H., Khan, N., & Shahid, S.',
    description: 'Comprehensive toxicity mitigation framework for social media platforms through AI-driven moderation, collaborative fact-checking, and user behavior analysis.',
    tag: 'HCI',
    venueColor: 'from-cyan-500 to-blue-600',
    borderColor: 'hover:border-cyan-500/30',
  },
]

export default function Publications() {
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
              Research
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-text-primary tracking-tight">
            Publications
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {publications.map((pub, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className={`group bg-bg-elevated border border-white/[0.06] rounded-2xl p-8 ${pub.borderColor} transition-all duration-500 relative overflow-hidden`}
            >
              {/* Top gradient line */}
              <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${pub.venueColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="flex items-center gap-3 mb-6">
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full bg-gradient-to-r ${pub.venueColor} text-white`}>
                  {pub.venue}
                </span>
                <span className="text-xs text-text-muted border border-white/[0.08] px-3 py-1 rounded-full">
                  {pub.tag}
                </span>
              </div>

              <h3 className="text-lg font-medium text-text-primary mb-3 group-hover:text-accent transition-colors duration-300 leading-snug">
                {pub.title}
              </h3>

              <p className="text-sm text-text-muted mb-4">{pub.authors}</p>

              <p className="text-sm text-text-secondary leading-relaxed">
                {pub.description}
              </p>

              <p className="text-xs text-text-muted mt-6 pt-4 border-t border-white/[0.04]">
                {pub.venueFullName}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
