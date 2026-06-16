import { useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion' // eslint-disable-line no-unused-vars
import Landmark from './Landmark'
import LandmarkDetails from './LandmarkDetails'
import MapViewport from './MapViewport'
import MapTerrain from './MapTerrain'
import MapPath from './MapPath'
import useIsMobile from '../useIsMobile'

const MAP_W = 1400
const MAP_H = 800
// Stable reference — passing a fresh object literal would re-fire MapViewport's
// framing effect on every render (snapping zoom back to "fit" mid-tour).
const MAP_SIZE = { width: MAP_W, height: MAP_H }

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
  const isMobile = useIsMobile()
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [focusTarget, setFocusTarget] = useState(null)

  // Pan/zoom the map to a landmark and open its detail sheet (mobile).
  const selectLandmark = useCallback((i) => {
    const lm = landmarks[i]
    if (!lm) return
    setSelectedIndex(i)
    setFocusTarget({
      mx: (lm.x / 100) * MAP_W,
      my: (lm.y / 100) * MAP_H,
      scale: 0.85,
      anchorY: 0.32, // sit the landmark in the upper third, above the sheet
    })
  }, [])

  // Zoom back out to the whole journey.
  const showOverview = useCallback(() => {
    setSelectedIndex(null)
    setFocusTarget({ mx: MAP_W / 2, my: MAP_H / 2, scale: 'fit', anchorY: 0.5 })
  }, [])

  // Step through the journey (also starts it when nothing is selected).
  const step = useCallback((dir) => {
    const base = selectedIndex == null ? -1 : selectedIndex
    selectLandmark(Math.min(landmarks.length - 1, Math.max(0, base + dir)))
  }, [selectedIndex, selectLandmark])

  const selected = selectedIndex == null ? null : landmarks[selectedIndex]

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden bg-parchment">

      {/* Background Texture Logic - Independent of map transform */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse at 50% 50%, #F2E2B8 0%, #E8D4A0 100%)`
      }} />

      {/* The Interactive Viewport */}
      <MapViewport mapSize={MAP_SIZE} isMobile={isMobile} focusTarget={focusTarget}>

        {/* Layer 1: Terrain (includes ornate border, replaces grid) */}
        <MapTerrain />

        {/* Layer 2: Path */}
        <MapPath isMobile={isMobile} />

        {/* Layer 3: Landmarks */}
        <div className="absolute inset-0 z-[20]">
          {landmarks.map((lm, i) => (
            <Landmark
              key={lm.id}
              data={lm}
              index={i}
              isMobile={isMobile}
              isActive={selectedIndex === i}
              onSelect={() => selectLandmark(i)}
            />
          ))}
        </div>

      </MapViewport>

      {/* UI Overlays (Fixed to screen, not map) */}

      {/* Title cartouche — scroll/parchment border style */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="absolute top-3 left-3 md:top-8 md:left-8 z-30 pointer-events-none"
      >
        <div className="relative pointer-events-auto">
          {/* Scroll border — double-line with curled corners */}
          <div className="relative border-2 border-ink/20 px-3 py-2.5 md:px-5 md:py-4 bg-parchment/90"
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
            <h1 className="font-display text-ink text-base sm:text-lg md:text-2xl tracking-[0.1em]">
              HAMZA AHMAD
            </h1>
            <p className="text-ink-muted text-[9px] sm:text-[10px] md:text-xs tracking-[0.18em] md:tracking-[0.2em] uppercase mt-1">
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

      {/* Contact — top right (desktop) */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute top-8 right-8 z-30 hidden md:flex items-center gap-3"
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

      {/* Contact — top right (mobile, compact & stacked to avoid colliding with the title) */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute top-3 right-3 z-30 flex md:hidden flex-col items-end gap-1.5"
      >
        <div className="flex items-center gap-3">
          <a href="https://github.com/hamza13-12" target="_blank" rel="noopener noreferrer"
            className="text-ink-muted text-[11px]">GitHub</a>
          <a href="https://www.linkedin.com/in/hamza1312" target="_blank" rel="noopener noreferrer"
            className="text-ink-muted text-[11px]">LinkedIn</a>
        </div>
        <a href="mailto:hamzaahmad277@gmail.com"
          className="text-[10px] text-parchment bg-mapred px-3 py-1 rounded-full font-medium tracking-wide">
          Get in touch
        </a>
      </motion.div>

      {/* Legend — aged-note / torn-paper appearance */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4, duration: 1 }}
        className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-30 pointer-events-none hidden md:block"
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

      {/* Hint (desktop) */}
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 4.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-ink-muted text-[10px] tracking-[0.25em] uppercase z-30 font-display pointer-events-none hidden md:block"
      >
        Drag to Explore
      </motion.p>

      {/* Mobile bottom UI — pill (overview) / detail sheet (selected).
          Lives inside a 100dvh layer pinned to the top so its flex-end content
          sits above the iOS Safari toolbar; safe-bottom clears the home indicator. */}
      {isMobile && (
        <>
          {/* Tap-away backdrop, only while a sheet is open */}
          <AnimatePresence>
            {selected && (
              <motion.div
                key="sheet-backdrop"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={showOverview}
                className="fixed inset-0 z-40 bg-ink/10 md:hidden"
              />
            )}
          </AnimatePresence>

          <div className="fixed inset-x-0 top-0 z-50 h-[100dvh] flex flex-col justify-end px-3 safe-bottom pointer-events-none md:hidden">
            <AnimatePresence mode="wait" initial={false}>
              {selected ? (
                <motion.div
                  key="sheet"
                  initial={{ y: '110%' }} animate={{ y: 0 }} exit={{ y: '110%' }}
                  transition={{ type: 'spring', damping: 32, stiffness: 320 }}
                  className="pointer-events-auto"
                >
                  <div className="relative bg-[#F5E8C8] border-2 border-ink/40 rounded-xl shadow-[4px_4px_0px_rgba(44,24,16,0.18)] p-4 pt-3">
                    {/* Grab handle */}
                    <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-ink/20" />

                    {/* Close */}
                    <button
                      type="button"
                      onClick={showOverview}
                      aria-label="Close"
                      className="absolute top-2.5 right-2.5 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-ink/5 text-ink-muted active:text-ink text-sm leading-none"
                    >
                      ✕
                    </button>

                    <div className="pr-7">
                      <LandmarkDetails data={selected} />
                    </div>

                    {/* Tour controls */}
                    <div className="mt-4 flex items-center justify-between border-t border-ink/15 pt-3">
                      <button
                        type="button"
                        onClick={() => step(-1)}
                        disabled={selectedIndex === 0}
                        className="text-[11px] font-display tracking-[0.15em] uppercase text-ink-light px-2 py-1.5 disabled:opacity-30"
                      >
                        ◀ Prev
                      </button>
                      <span className="font-display text-[10px] tracking-[0.2em] text-ink-muted uppercase">
                        {selectedIndex + 1} / {landmarks.length}
                      </span>
                      <button
                        type="button"
                        onClick={() => step(1)}
                        disabled={selectedIndex === landmarks.length - 1}
                        className="text-[11px] font-display tracking-[0.15em] uppercase text-ink-light px-2 py-1.5 disabled:opacity-30"
                      >
                        Next ▶
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="pill"
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.4 }}
                  className="self-center pointer-events-auto flex items-center gap-3 bg-parchment/95 border border-ink/20 rounded-full pl-4 pr-1.5 py-1.5 shadow-[2px_2px_0_rgba(44,24,16,0.12)]"
                >
                  <span className="text-ink-muted text-[10px] tracking-[0.15em] uppercase font-display">Tap a landmark</span>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    className="text-[10px] text-parchment bg-mapred active:bg-mapred-light px-3 py-1.5 rounded-full font-medium tracking-wide"
                  >
                    Start tour ▶
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </>
      )}

    </div>
  )
}
