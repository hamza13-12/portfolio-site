import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion' // eslint-disable-line no-unused-vars
import LandmarkDetails from './LandmarkDetails'

const MarkerIcons = {
  education: (
    <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Open book / scroll */}
      <path d="M4 19 Q4 6, 12 6 Q20 6, 20 19" />
      <path d="M4 19 L4 8 Q4 5, 8 5 L12 6" />
      <path d="M20 19 L20 8 Q20 5, 16 5 L12 6" />
      <line x1="12" y1="6" x2="12" y2="19" />
      {/* Page lines */}
      <line x1="7" y1="10" x2="10" y2="10.5" opacity="0.5" />
      <line x1="7" y1="13" x2="10" y2="13.5" opacity="0.5" />
      <line x1="14" y1="10.5" x2="17" y2="10" opacity="0.5" />
      <line x1="14" y1="13.5" x2="17" y2="13" opacity="0.5" />
    </svg>
  ),
  work: (
    <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Compass / gear */}
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3" />
      <line x1="12" y1="3" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="21" />
      <line x1="3" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="21" y2="12" />
      {/* Diagonal ticks */}
      <line x1="5.6" y1="5.6" x2="7.8" y2="7.8" opacity="0.6" />
      <line x1="16.2" y1="16.2" x2="18.4" y2="18.4" opacity="0.6" />
      <line x1="18.4" y1="5.6" x2="16.2" y2="7.8" opacity="0.6" />
      <line x1="5.6" y1="18.4" x2="7.8" y2="16.2" opacity="0.6" />
    </svg>
  ),
  research: (
    <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Telescope / spyglass */}
      <path d="M3 20 L10 13" />
      <circle cx="10" cy="13" r="1.5" />
      <path d="M10 13 L17 6" />
      <path d="M15 8 L20 3 L22 5 L17 10" />
      {/* Lens flare */}
      <circle cx="21" cy="4" r="2" opacity="0.3" />
      {/* Tripod legs */}
      <line x1="3" y1="20" x2="1" y2="22" />
      <line x1="3" y1="20" x2="5" y2="22" />
    </svg>
  ),
  startup: (
    <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Rocket */}
      <path d="M12 2 Q8 8, 8 14 L10 16 L14 16 L16 14 Q16 8, 12 2Z" />
      {/* Window */}
      <circle cx="12" cy="10" r="2" />
      {/* Fins */}
      <path d="M8 14 Q5 14, 4 17 L8 16" />
      <path d="M16 14 Q19 14, 20 17 L16 16" />
      {/* Flames */}
      <path d="M10 16 Q11 19, 12 22 Q13 19, 14 16" opacity="0.6" />
      <path d="M11 16 Q12 18, 13 16" opacity="0.4" />
    </svg>
  ),
  current: (
    <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Large flag / banner */}
      <line x1="5" y1="2" x2="5" y2="22" />
      <path d="M5 3 L20 3 L17 8 L20 13 L5 13" fill="currentColor" opacity="0.15" />
      <path d="M5 3 L20 3 L17 8 L20 13 L5 13" />
      {/* Flag detail lines */}
      <line x1="8" y1="6" x2="15" y2="6" opacity="0.4" />
      <line x1="8" y1="10" x2="14" y2="10" opacity="0.4" />
      {/* Base */}
      <circle cx="5" cy="22" r="1" fill="currentColor" opacity="0.4" />
    </svg>
  )
}

export default function Landmark({ data, index, isMobile = false, isActive = false, onSelect }) {
  const [hovered, setHovered] = useState(false)

  const icon = MarkerIcons[data.type] || MarkerIcons.work

  // Show tooltip below when landmark is in top ~40% of map
  const showBelow = data.y < 40

  // Desktop reveals details on hover; touch has no hover, so a tap opens the
  // detail sheet (handled by the parent) instead.
  const showTooltip = !isMobile && hovered

  return (
    <div
      className={`absolute group ${hovered || isActive ? 'z-50' : 'z-20'}`}
      style={{ left: `${data.x}%`, top: `${data.y}%`, transform: 'translate(-50%, -50%)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => { if (isMobile) onSelect?.() }}
      role={isMobile ? 'button' : undefined}
      aria-label={isMobile ? `${data.label} — ${data.role}` : undefined}
    >
      {/* Icon + label wrapper — this is the visual anchor */}
      <div className={`relative flex items-center justify-center cursor-pointer transition-transform duration-300 ${isActive ? 'scale-110' : 'hover:scale-110'}`}>

        {/* Enlarged transparent hit target for touch (clicks bubble to the wrapper) */}
        {isMobile && <span className="absolute -inset-4 rounded-full" aria-hidden="true" />}

        {/* Ink-drop shadow beneath marker */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 h-1.5 bg-ink/10 rounded-full" />

        {/* Base Glow — no blur for perf */}
        <div className="absolute inset-0 rounded-full opacity-30 bg-parchment-dark" />

        {/* Selected highlight ring (mobile tap / tour) */}
        {isActive && (
          <span className="absolute -inset-2 rounded-full border-2 border-mapred/70 bg-mapred/5" aria-hidden="true" />
        )}

        {/* Marker Icon Container */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 + index * 0.1, type: 'spring' }}
          className={`
                relative flex items-center justify-center
                ${data.size === 'large' ? 'w-12 h-12' : data.size === 'medium' ? 'w-10 h-10' : 'w-8 h-8'}
                ${data.type === 'current' ? 'text-mapred' : 'text-ink-dark'}
            `}
        >
          {icon}
        </motion.div>

        {/* Current: Pulse Effect — skipped on mobile to avoid constant repaints */}
        {data.type === 'current' && !isMobile && (
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-mapred/30 -z-10"
          />
        )}

        {/* Label — Banner / Ribbon Style */}
        {(data.size === 'large' || data.size === 'medium') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 + index * 0.1 }}
            className="absolute whitespace-nowrap"
            style={{
              top: data.labelPos === 'above' ? '-22px' : 'auto',
              bottom: data.labelPos === 'below' ? '-22px' : 'auto',
              left: data.labelPos === 'right' ? '120%' : data.labelPos === 'left' ? 'auto' : '50%',
              right: data.labelPos === 'left' ? '120%' : 'auto',
              transform: data.labelPos === 'above' || data.labelPos === 'below' ? 'translateX(-50%)' : 'none',
            }}
          >
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 24"
              preserveAspectRatio="none"
              fill="none"
            >
              <path
                d="M4 0 L96 0 L100 12 L96 24 L4 24 L0 12 Z"
                fill="#F0DEB0"
                fillOpacity="0.85"
                stroke="#5C3D28"
                strokeWidth="0.8"
                strokeOpacity="0.3"
              />
            </svg>
            <span
              className={`relative z-10 inline-block text-[9px] md:text-[11px] tracking-[0.15em] uppercase font-display px-3 py-0.5 ${data.type === 'current' ? 'text-mapred font-bold' : 'text-ink font-semibold'
                }`}
            >
              {data.label}
            </span>
          </motion.div>
        )}

        {/* Tooltip — desktop hover only; mobile uses the detail sheet */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: showBelow ? -6 : 6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: showBelow ? -4 : 4, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute left-1/2 -translate-x-1/2 w-72 z-50 pointer-events-none"
              style={showBelow
                ? { top: '100%', marginTop: '2px' }
                : { bottom: '100%', marginBottom: '2px' }
              }
            >
              <div className="bg-[#F5E8C8] border-2 border-ink/40 rounded-sm p-4 shadow-[4px_4px_0px_rgba(44,24,16,0.15)] relative text-left">

                {/* Decorative tape */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-[#E0C090] opacity-80 rotate-1 shadow-sm" />

                {/* Arrow — always centered, flips direction */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-[#F5E8C8] rotate-45"
                  style={showBelow
                    ? { top: '-7px', borderTop: '2px solid rgba(44,24,16,0.4)', borderLeft: '2px solid rgba(44,24,16,0.4)' }
                    : { bottom: '-7px', borderBottom: '2px solid rgba(44,24,16,0.4)', borderRight: '2px solid rgba(44,24,16,0.4)' }
                  }
                />

                <LandmarkDetails data={data} />

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
