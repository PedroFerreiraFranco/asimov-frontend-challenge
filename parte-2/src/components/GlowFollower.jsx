import { useEffect, useRef } from 'react'

/**
 * Pure CSS approach — moves a div via direct style mutation (no React state,
 * no Framer Motion spring). Uses requestAnimationFrame throttling.
 * This avoids re-renders and React reconciliation on every mousemove.
 */
export default function GlowFollower() {
  const ref = useRef(null)
  const raf = useRef(null)
  const pos = useRef({ x: -600, y: -600 })

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (raf.current) return
      raf.current = requestAnimationFrame(() => {
        if (ref.current) {
          ref.current.style.transform = `translate(${pos.current.x - 300}px, ${pos.current.y - 300}px)`
        }
        raf.current = null
      })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed top-0 left-0 z-[2] w-[600px] h-[600px] rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(55,118,171,0.06) 0%, transparent 65%)',
        transform: 'translate(-600px, -600px)',
        transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
        willChange: 'transform',
      }}
    />
  )
}
