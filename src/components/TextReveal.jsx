import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function TextReveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-20%' })

  const words = children.split(' ')

  return (
    <span ref={ref} className={`inline ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', rotate: 3 }}
            animate={isInView ? { y: '0%', rotate: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: delay + i * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
