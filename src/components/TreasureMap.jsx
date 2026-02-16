import { useRef } from 'react'
import { motion } from 'framer-motion' // eslint-disable-line no-unused-vars
import Landmark from './Landmark'
import MapViewport from './MapViewport'
import MapTerrain from './MapTerrain'
import MapPath from './MapPath'

const landmarks = [
  {
    id: 'fccu', name: 'The Academy', label: 'FCCU',
    company: 'Forman Christian College', role: 'B.Sc. Computer Science',
    metric: '3.9 / 4.0', metricLabel: 'Summa Cum Laude · Swami Ram Teerath Medal',
    period: '2020 — 2024', x: 10, y: 78, size: 'medium', type: 'education', labelPos: 'below',
  },
  {
    id: 'foundry', name: 'The Design Lab', label: 'The Foundry',
    company: 'CHISEL Lab — The Foundry', role: 'UI/UX Design Intern',
    metric: 'Published @ CHI EA \'25', metricLabel: 'Systemic toxicity interventions for social platforms',
    period: 'Jul — Aug 2023',
    x: 18, y: 66, size: 'medium', type: 'work', labelPos: 'right',
  },
  {
    id: 'adinteractive', name: 'The Vision Forge', label: 'Adinteractive',
    company: 'Adinteractive Media Inc.', role: 'Software Engineer',
    metric: '10,000+', metricLabel: 'Annotated products · YOLOv8',
    tech: ['YOLOv8', 'Firebase', 'DynamoDB', 'Redis'], period: 'Oct 2023 — Oct 2024',
    x: 28, y: 55, size: 'medium', type: 'work', labelPos: 'right',
  },
  {
    id: 'lums', name: 'The Observatory', label: 'CVGL Lab',
    company: 'CV & Graphics Lab — LUMS', role: 'Research Assistant',
    metric: '27% > SOTA', metricLabel: 'EEG → Images · CATVis → MICCAI 2025',
    tech: ['PyTorch', 'Diffusion Models', 'EEG', 'Transformers'], period: 'Sep 2024 — Jun 2025',
    x: 42, y: 43, size: 'large', type: 'research', labelPos: 'below',
  },
  {
    id: 'tkxel', name: 'The Workshop', label: 'Tkxel',
    company: 'Tkxel', role: 'Associate Software Engineer',
    metric: '50K+ users', metricLabel: 'AI Like Me — digital twins',
    tech: ['Grok LLM', 'ElevenLabs', 'HeyGen', 'Vector Search'], period: 'Jul 2024 — Jun 2025',
    x: 52, y: 56, size: 'medium', type: 'work', labelPos: 'below',
  },
  {
    id: 'uplift', name: 'The Frontier', label: 'Uplift AI',
    company: 'Uplift AI — Y Combinator S25', role: 'Founding AI Engineer',
    metric: '125K in 14 days', metricLabel: 'Voice notes · Viral growth',
    tech: ['React Native', 'AWS Lambda', 'S3', 'DynamoDB'], period: 'Jun — Jul 2025',
    x: 60, y: 35, size: 'large', type: 'startup', labelPos: 'above',
  },
  {
    id: 'uni', name: 'The Nexus', label: 'U.n.I',
    company: 'U.n.I', role: 'AI Engineer',
    metric: '3× connection increase', metricLabel: 'Multi-modal discovery',
    period: 'Mar — Sep 2025', x: 70, y: 28, size: 'medium', type: 'work', labelPos: 'right',
  },
  {
    id: 'cloudpacer', name: 'The Summit', label: 'Cloudpacer',
    company: 'Cloudpacer — Neblo AI', role: 'Technical Lead',
    metric: '2h → 30s', metricLabel: 'Autonomous freight AI',
    tech: ['LangChain', 'Claude', 'GPT', 'Django'], period: 'Sep 2025 — Present',
    x: 82, y: 16, size: 'large', type: 'current', labelPos: 'right',
  },
]

export default function TreasureMap() {
  const containerRef = useRef(null)

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden bg-parchment">

      {/* Background Texture Logic - Independent of map transform */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse at 50% 50%, #F2E2B8 0%, #E8D4A0 100%)`
      }} />

      {/* The Interactive Viewport */}
      <MapViewport mapSize={{ width: 1400, height: 800 }}>

        {/* Layer 1: Terrain (includes ornate border, replaces grid) */}
        <MapTerrain />

        {/* Layer 2: Path */}
        <MapPath />

        {/* Layer 3: Landmarks */}
        <div className="absolute inset-0 z-[20]">
          {landmarks.map((lm, i) => (
            <Landmark key={lm.id} data={lm} index={i} />
          ))}
        </div>

      </MapViewport>

      {/* UI Overlays (Fixed to screen, not map) */}

      {/* Title cartouche — scroll/parchment border style */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="absolute top-6 left-6 md:top-8 md:left-8 z-30 pointer-events-none"
      >
        <div className="relative pointer-events-auto">
          {/* Scroll border — double-line with curled corners */}
          <div className="relative border-2 border-ink/20 px-5 py-4 bg-parchment/90"
            style={{
              clipPath: 'polygon(4% 0%, 96% 0%, 100% 4%, 100% 96%, 96% 100%, 4% 100%, 0% 96%, 0% 4%)',
            }}
          >
            {/* Inner border line */}
            <div className="absolute inset-[3px] border border-ink/10 pointer-events-none"
              style={{
                clipPath: 'polygon(3% 0%, 97% 0%, 100% 3%, 100% 97%, 97% 100%, 3% 100%, 0% 97%, 0% 3%)',
              }}
            />
            <h1 className="font-display text-ink text-lg md:text-2xl tracking-[0.1em]">
              HAMZA AHMAD
            </h1>
            <p className="text-ink-muted text-[10px] md:text-xs tracking-[0.2em] uppercase mt-1">
              AI Engineer · Researcher · Builder
            </p>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-mapred-light opacity-50" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-mapred" />
              </span>
              <span className="text-ink-muted text-[9px]">Technical Lead @ Cloudpacer</span>
            </div>
          </div>
          {/* Corner decorations */}
          <div className="absolute -top-[2px] -left-[2px] w-3 h-3 border-t-2 border-l-2 border-ink/25 rounded-tl-sm" />
          <div className="absolute -top-[2px] -right-[2px] w-3 h-3 border-t-2 border-r-2 border-ink/25 rounded-tr-sm" />
          <div className="absolute -bottom-[2px] -left-[2px] w-3 h-3 border-b-2 border-l-2 border-ink/25 rounded-bl-sm" />
          <div className="absolute -bottom-[2px] -right-[2px] w-3 h-3 border-b-2 border-r-2 border-ink/25 rounded-br-sm" />
        </div>
      </motion.div>

      {/* Contact — top right */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute top-6 right-6 md:top-8 md:right-8 z-30 flex items-center gap-3"
      >
        <a href="https://github.com/hamza13-12" target="_blank" rel="noopener noreferrer"
          className="text-ink-muted hover:text-ink transition-colors text-xs pointer-events-auto">GitHub</a>
        <a href="https://www.linkedin.com/in/hamza1312" target="_blank" rel="noopener noreferrer"
          className="text-ink-muted hover:text-ink transition-colors text-xs pointer-events-auto">LinkedIn</a>
        <a href="mailto:hamzaahmad277@gmail.com"
          className="text-xs text-parchment bg-mapred hover:bg-mapred-light px-4 py-2 rounded-full font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,32,32,0.2)] pointer-events-auto">
          Get in touch
        </a>
      </motion.div>

      {/* Legend — aged-note / torn-paper appearance */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4, duration: 1 }}
        className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-30 pointer-events-none"
      >
        <div className="relative pointer-events-auto">
          <div className="bg-[#EDD9A3]/90 p-3 border border-ink/15 shadow-[2px_2px_0px_rgba(44,24,16,0.08)]"
            style={{
              clipPath: 'polygon(0% 2%, 3% 0%, 97% 0%, 100% 3%, 100% 97%, 98% 100%, 2% 100%, 0% 98%)',
            }}
          >
            {/* Decorative top edge — simulating torn/aged paper */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-ink/10 to-transparent" />

            <p className="font-display text-[9px] text-ink-muted tracking-[0.2em] uppercase mb-2">Legend</p>
            <div className="text-[10px] space-y-1.5">
              {[
                ['bg-mapred', 'Current Position'],
                ['bg-ink-light', 'Engineering'],
                ['bg-mapblue', 'Research'],
                ['bg-mapgreen', 'Education'],
              ].map(([color, label]) => (
                <div key={label} className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${color} border border-parchment`} />
                  <span className="text-ink-dark">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Hint */}
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 4.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-ink-muted text-[10px] tracking-[0.25em] uppercase z-30 font-display pointer-events-none"
      >
        Drag to Explore
      </motion.p>

    </div>
  )
}
