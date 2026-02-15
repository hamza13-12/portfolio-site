import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const skillGroups = [
  {
    category: 'Languages',
    skills: ['Python', 'C++', 'JavaScript', 'SQL'],
  },
  {
    category: 'Machine Learning',
    skills: ['PyTorch', 'TensorFlow', 'Keras', 'Scikit-learn', 'OpenCV', 'Transformers', 'HuggingFace', 'LangChain'],
  },
  {
    category: 'Infrastructure',
    skills: ['AWS', 'Docker', 'Redis', 'PostgreSQL', 'MongoDB', 'DynamoDB', 'Firebase'],
  },
  {
    category: 'Frameworks',
    skills: ['React Native', 'Django', 'FastAPI', 'Git'],
  },
  {
    category: 'AI / LLMs',
    skills: ['Claude', 'GPT', 'ElevenLabs', 'HeyGen', 'Vector Databases', 'RAG'],
  },
]

export default function Skills() {
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
              Stack
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-text-primary tracking-tight">
            Tools of the trade
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {skillGroups.map((group, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
            >
              <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-5">
                {group.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, j) => (
                  <motion.span
                    key={j}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="text-sm text-text-secondary bg-bg-elevated border border-white/[0.06] rounded-lg px-4 py-2 hover:text-accent hover:border-accent/30 hover:bg-accent/5 hover:shadow-[0_0_20px_rgba(139,92,246,0.1)] transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
