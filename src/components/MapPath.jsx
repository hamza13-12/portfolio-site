import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion' // eslint-disable-line no-unused-vars

const journeyPathD = `
  M 140 624
  C 180 590, 220 560, 252 528
  C 280 500, 350 460, 392 440
  C 430 420, 520 360, 588 344
  C 620 334, 680 370, 728 448
  C 750 470, 780 430, 840 280
  C 870 230, 920 220, 980 224
  C 1020 226, 1080 180, 1148 128
`

// Approximate milestone positions along the path (landmark intersections)
const milestones = [
    { x: 140, y: 624 },   // FCCU (start)
    { x: 252, y: 528 },   // The Foundry
    { x: 392, y: 440 },   // Adinteractive
    { x: 588, y: 344 },   // LUMS
    { x: 728, y: 448 },   // Tkxel
    { x: 840, y: 280 },   // Uplift/YC
    { x: 980, y: 224 },   // U.n.I
    { x: 1148, y: 128 },  // Cloudpacer (end)
]

export default function MapPath({ isMobile = false }) {
    const [pathLength, setPathLength] = useState(0)
    const pathRef = useRef(null)

    useEffect(() => {
        if (pathRef.current) setPathLength(pathRef.current.getTotalLength())
    }, [])

    return (
        <svg className="w-full h-full absolute inset-0 pointer-events-none" viewBox="0 0 1400 800" preserveAspectRatio="xMidYMid slice" fill="none">
            {/* Gradient definition — education blue → career brown → current red */}
            <defs>
                <linearGradient id="pathGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#2B5070" />
                    <stop offset="40%" stopColor="#5C3D28" />
                    <stop offset="100%" stopColor="#8B2020" />
                </linearGradient>
                {/* Golden glow — simple circle, no filter */}
            </defs>

            {/* 1. Underlying Ink Spill (faint, no filter) */}
            <path d={journeyPathD} stroke="#8B2020" strokeWidth="10" strokeLinecap="round" opacity="0.04" />

            {/* 2. Dashed 'Footsteps' Path */}
            <path
                d={journeyPathD}
                stroke="#5C3D28"
                strokeWidth="2"
                strokeDasharray="4 8"
                strokeLinecap="round"
                opacity="0.4"
            />

            {/* 3. Animated Gradient Path */}
            <path
                ref={pathRef}
                d={journeyPathD}
                stroke="url(#pathGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={pathLength || 2200}
                strokeDashoffset={pathLength || 2200}
                style={{
                    animation: pathLength ? 'drawPath 4s ease-out 0.5s forwards' : 'none',
                    /* no drop-shadow for perf */
                }}
            />

            {/* 4. Milestone dots at each landmark intersection */}
            {milestones.map((m, i) => (
                <motion.circle
                    key={`ms${i}`}
                    cx={m.x}
                    cy={m.y}
                    r="4"
                    fill="#F0DEB0"
                    stroke="#5C3D28"
                    strokeWidth="1.2"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.3, duration: 0.3, type: 'spring' }}
                />
            ))}

            {/* 5. Leader/Avatar Token — skipped on mobile (constant SMIL repaint fights the camera) */}
            {pathLength > 0 && !isMobile && (
                <circle r="6" fill="#F0DEB0" stroke="#8B2020" strokeWidth="2">
                    <animateMotion dur="8s" repeatCount="indefinite" path={journeyPathD.trim()} keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
                </circle>
            )}

            {/* 6. X marks the spot — much larger with golden glow */}
            <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3.5, duration: 0.6, type: 'spring', stiffness: 200 }}
                transform="translate(1130, 100)"
            >
                {/* Outer glow ring — shimmer animation */}
                <circle r="35" fill="none" stroke="#8B6914" strokeWidth="1.5" opacity="0.3" className="shimmer-ring" />
                <circle r="30" fill="rgba(139, 105, 20, 0.08)" stroke="rgba(139, 105, 20, 0.25)" strokeWidth="1" />

                {/* Inner glow — no filter */}
                <circle r="22" fill="rgba(139, 105, 20, 0.08)" stroke="none" />

                {/* The X — larger, bolder */}
                <line x1="-14" y1="-14" x2="14" y2="14" stroke="#9B2335" strokeWidth="4" strokeLinecap="round" />
                <line x1="14" y1="-14" x2="-14" y2="14" stroke="#9B2335" strokeWidth="4" strokeLinecap="round" />

                {/* Center dot */}
                <circle r="3" fill="#8B6914" opacity="0.6" />
            </motion.g>

            {/* Publication branch from LUMS */}
            <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
            >
                <path d="M588 344 Q560 310, 530 280" stroke="rgba(155, 35, 53, 0.3)" strokeWidth="1" strokeDasharray="3 5" />
                <circle cx="530" cy="280" r="3" fill="#9B2335" opacity="0.5" />
            </motion.g>
        </svg>
    )
}
