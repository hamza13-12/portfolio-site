import { useRef, useEffect } from 'react'
import { useSpring, animated, to } from '@react-spring/web' // eslint-disable-line no-unused-vars
import { useGesture } from '@use-gesture/react'

export default function MapViewport({ children, mapSize = { width: 2000, height: 1200 } }) {
    const containerRef = useRef(null)

    const [{ x, y }, api] = useSpring(() => ({
        x: 0,
        y: 0,
        config: { mass: 0.5, tension: 280, friction: 26 }
    }))

    useEffect(() => {
        const initialX = (window.innerWidth - mapSize.width) / 2
        const initialY = (window.innerHeight - mapSize.height) / 2
        api.start({ x: initialX, y: initialY, immediate: true })
    }, [mapSize, api])

    useGesture(
        {
            onDrag: ({ offset: [ox, oy] }) => {
                api.start({ x: ox, y: oy })
            },
        },
        {
            target: containerRef,
            drag: {
                from: () => [x.get(), y.get()],
                filterTaps: true,
            },
        }
    )

    return (
        <div ref={containerRef} className="fixed inset-0 overflow-hidden bg-[#F0DEB0] touch-none cursor-grab active:cursor-grabbing">
            <animated.div
                style={{
                    transform: to([x, y], (x, y) => `translate3d(${x}px, ${y}px, 0)`),
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
