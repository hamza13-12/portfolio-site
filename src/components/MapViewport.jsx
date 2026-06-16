import { useRef, useEffect, useCallback } from 'react'
import { useSpring, animated, to } from '@react-spring/web' // eslint-disable-line no-unused-vars
import { useGesture } from '@use-gesture/react'

const MAX_SCALE = 1.4

// Responsive 1:1 feel for dragging/pinching.
const DRAG_CONFIG = { mass: 0.5, tension: 280, friction: 26 }
// Smooth, predictable "camera move" for tap/tour focus — a coordinated tween
// keeps x, y and scale in lock-step instead of each spring settling on its own.
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const FOCUS_CONFIG = { duration: 700, easing: easeInOutCubic }

export default function MapViewport({
    children,
    mapSize = { width: 1400, height: 800 },
    isMobile = false,
    // { mx, my, scale, anchorX, anchorY } in map coordinates — animate to center this point.
    // scale may be a number or 'fit'. Pass a fresh object each time to retrigger.
    focusTarget = null,
}) {
    const containerRef = useRef(null)

    // Scale that fits the whole map inside the viewport (with a little breathing room).
    const getFitScale = useCallback(() => {
        const vw = window.innerWidth
        const vh = window.innerHeight
        return Math.min(vw / mapSize.width, vh / mapSize.height) * 0.97
    }, [mapSize])

    const [{ x, y, scale }, api] = useSpring(() => ({
        x: 0,
        y: 0,
        scale: 1,
        config: DRAG_CONFIG,
    }))

    // Clamp a translation so the (scaled) map stays within the viewport.
    const clamp = useCallback((nx, ny, s) => {
        const vw = window.innerWidth
        const vh = window.innerHeight
        const sw = mapSize.width * s
        const sh = mapSize.height * s
        const [minX, maxX] = sw >= vw ? [vw - sw, 0] : [0, vw - sw]
        const [minY, maxY] = sh >= vh ? [vh - sh, 0] : [0, vh - sh]
        return [
            Math.max(minX, Math.min(maxX, nx)),
            Math.max(minY, Math.min(maxY, ny)),
        ]
    }, [mapSize])

    // Initial framing: desktop keeps the original 1:1 centering; mobile fits the
    // whole journey on screen so the map reads as a single illustration.
    useEffect(() => {
        const vw = window.innerWidth
        const vh = window.innerHeight
        const s = isMobile ? getFitScale() : 1
        const nx = (vw - mapSize.width * s) / 2
        const ny = (vh - mapSize.height * s) / 2
        api.start({ x: nx, y: ny, scale: s, immediate: true })
    }, [mapSize, api, isMobile, getFitScale])

    // Re-center / re-clamp on resize and orientation change.
    useEffect(() => {
        const onResize = () => {
            if (isMobile) {
                const vw = window.innerWidth
                const vh = window.innerHeight
                const s = getFitScale()
                api.start({
                    x: (vw - mapSize.width * s) / 2,
                    y: (vh - mapSize.height * s) / 2,
                    scale: s,
                })
            } else {
                const [cx, cy] = clamp(x.get(), y.get(), scale.get())
                api.start({ x: cx, y: cy })
            }
        }
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [api, isMobile, getFitScale, clamp, x, y, scale, mapSize])

    // Animate to a requested focus point (used by mobile tour / tap-to-open).
    useEffect(() => {
        if (!focusTarget) return
        const vw = window.innerWidth
        const vh = window.innerHeight
        const s = focusTarget.scale === 'fit' || focusTarget.scale == null
            ? getFitScale()
            : focusTarget.scale
        const ax = focusTarget.anchorX ?? 0.5
        const ay = focusTarget.anchorY ?? 0.5
        const [nx, ny] = clamp(vw * ax - focusTarget.mx * s, vh * ay - focusTarget.my * s, s)
        api.start({ x: nx, y: ny, scale: s, config: FOCUS_CONFIG })
    }, [focusTarget, api, clamp, getFitScale])

    useGesture(
        {
            onDrag: ({ offset: [ox, oy], pinching, cancel }) => {
                if (pinching) return cancel()
                api.start({ x: ox, y: oy, config: DRAG_CONFIG })
            },
            onPinch: ({ offset: [s], origin: [ox, oy], memo }) => {
                const start = memo ?? { x: x.get(), y: y.get(), scale: scale.get(), ox, oy }
                const ratio = s / start.scale
                // Keep the point under the fingers anchored while scaling.
                const [nx, ny] = clamp(
                    start.ox - (start.ox - start.x) * ratio,
                    start.oy - (start.oy - start.y) * ratio,
                    s,
                )
                api.start({ x: nx, y: ny, scale: s, immediate: true })
                return start
            },
        },
        {
            target: containerRef,
            drag: {
                from: () => [x.get(), y.get()],
                filterTaps: true,
                // Auto-clamp the drag offset so the map can never be lost off-screen.
                bounds: () => {
                    const vw = window.innerWidth
                    const vh = window.innerHeight
                    const s = scale.get()
                    const sw = mapSize.width * s
                    const sh = mapSize.height * s
                    const [left, right] = sw >= vw ? [vw - sw, 0] : [0, vw - sw]
                    const [top, bottom] = sh >= vh ? [vh - sh, 0] : [0, vh - sh]
                    return { left, right, top, bottom }
                },
                rubberband: 0.15,
            },
            pinch: {
                enabled: isMobile,
                from: () => [scale.get(), 0],
                scaleBounds: () => ({ min: getFitScale(), max: MAX_SCALE }),
                rubberband: 0.1,
            },
        }
    )

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 overflow-hidden bg-[#F0DEB0] touch-none cursor-grab active:cursor-grabbing"
        >
            <animated.div
                style={{
                    transform: to([x, y, scale], (px, py, s) => `translate3d(${px}px, ${py}px, 0) scale(${s})`),
                    width: mapSize.width,
                    height: mapSize.height,
                    transformOrigin: '0 0',
                }}
                className="relative will-change-transform"
            >
                {children}
            </animated.div>

            {/* Vignette — no blend mode for perf */}
            <div className="absolute inset-0 pointer-events-none z-[100]"
                style={{
                    background: 'radial-gradient(circle at center, transparent 50%, rgba(44, 24, 16, 0.08) 100%)',
                }}
            />
        </div>
    )
}
