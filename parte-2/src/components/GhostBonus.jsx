import { useState, useRef, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

/* ── Game data ─────────────────────────────────────────────────── */
const VIEWBOX_W = 480
const VIEWBOX_H = 160
const NODE_R = 20
const SNAP_R = 36   // proximity to auto-connect

const NODES = [
  { id: 1, x: 60,  y: 80  },
  { id: 2, x: 160, y: 28  },
  { id: 3, x: 240, y: 80  },
  { id: 4, x: 320, y: 132 },
  { id: 5, x: 420, y: 80  },
]

const SECRETS = [
  { icon: '🎯', title: 'Mentoria Individual (1h)', desc: 'Uma sessão 1:1 com o instrutor para revisar seu projeto e traçar seu plano de carreira.' },
  { icon: '📋', title: 'Templates de Currículo Tech', desc: '5 templates ATS-friendly otimizados para vagas de dev júnior com IA no portfólio.' },
  { icon: '🔑', title: 'Acesso Antecipado ao Módulo 6', desc: 'Primeiros 100 alunos recebem o módulo de MLOps & Fine-tuning antes do lançamento oficial.' },
]

/* Confetti pieces — generated once */
const CONFETTI = Array.from({ length: 32 }, (_, i) => ({
  id: i,
  color: ['#3776AB', '#FFD43B', '#4a8fcc', '#ffffff'][i % 4],
  dx: (Math.random() - 0.5) * 480,
  dy: -(60 + Math.random() * 140),
  rotate: Math.random() * 720 - 360,
  size: 5 + Math.random() * 9,
  isRect: Math.random() > 0.5,
  delay: Math.random() * 0.22,
}))

/* ── Helpers ───────────────────────────────────────────────────── */
const hypot = (a, b) => Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2)

function buildPath(connected, cursor) {
  const pts = connected.map(i => NODES[i])
  if (cursor) pts.push(cursor)
  if (pts.length < 2) return ''
  return pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
}

/* ── Sub-components ────────────────────────────────────────────── */
function ConfettiLayer({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 30 }}>
          {CONFETTI.map(p => (
            <motion.div
              key={p.id}
              style={{
                position: 'absolute',
                top: '50%', left: '50%',
                width: p.size, height: p.isRect ? p.size * 0.55 : p.size,
                borderRadius: p.isRect ? 2 : '50%',
                background: p.color,
                marginLeft: -p.size / 2, marginTop: -p.size / 2,
              }}
              initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
              animate={{ x: p.dx, y: p.dy, opacity: 0, rotate: p.rotate, scale: 0.4 }}
              transition={{ duration: 0.9 + Math.random() * 0.4, delay: p.delay, ease: 'easeOut' }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  )
}

function NodeCircle({ node, state }) {
  // state: 'idle' | 'next' | 'connected' | 'done'
  const isConnected = state === 'connected' || state === 'done'
  const isNext = state === 'next'
  const color = isConnected ? '#3776AB' : '#3776AB'

  return (
    <g style={{ cursor: isNext ? 'pointer' : 'default' }}>
      {/* Pulse ring on the next node to connect */}
      {isNext && (
        <motion.circle
          cx={node.x} cy={node.y} r={NODE_R + 10}
          fill="none" stroke="#3776AB" strokeWidth="1"
          animate={{ opacity: [0.6, 0, 0.6], r: [NODE_R + 6, NODE_R + 16, NODE_R + 6] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* Main circle */}
      <motion.circle
        cx={node.x} cy={node.y} r={NODE_R}
        fill={isConnected ? 'rgba(55,118,171,0.90)' : 'rgba(55,118,171,0.12)'}
        stroke={isConnected ? '#4a8fcc' : isNext ? '#3776AB' : 'rgba(55,118,171,0.35)'}
        strokeWidth={isNext ? 1.5 : 1}
        animate={isConnected ? { scale: [1, 1.18, 1] } : {}}
        transition={{ duration: 0.3 }}
      />

      {/* Number / check */}
      {isConnected ? (
        <motion.text
          x={node.x} y={node.y + 5}
          textAnchor="middle" fill="#FFD43B"
          fontSize="14" fontWeight="700" fontFamily="'JetBrains Mono', monospace"
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          ✓
        </motion.text>
      ) : (
        <text
          x={node.x} y={node.y + 5}
          textAnchor="middle"
          fill={isNext ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)'}
          fontSize="13" fontWeight="600" fontFamily="'JetBrains Mono', monospace"
        >
          {node.id}
        </text>
      )}
    </g>
  )
}

/* ── Main component ─────────────────────────────────────────────── */
export default function GhostBonus() {
  const svgRef = useRef(null)
  const [connected, setConnected] = useState([])   // 0-based indices of connected nodes
  const [dragging, setDragging] = useState(false)
  const [cursor, setCursor] = useState(null)
  const [done, setDone] = useState(false)
  const [confetti, setConfetti] = useState(false)

  /* Convert pointer event → SVG coordinate space */
  const toSVG = useCallback((e) => {
    const svg = svgRef.current
    if (!svg) return null
    const r = svg.getBoundingClientRect()
    const cx = e.clientX - r.left
    const cy = e.clientY - r.top
    return { x: (cx / r.width) * VIEWBOX_W, y: (cy / r.height) * VIEWBOX_H }
  }, [])

  const handlePointerDown = useCallback((e) => {
    if (done) return
    e.preventDefault()
    const pos = toSVG(e)
    if (!pos) return
    if (connected.length === 0 && hypot(NODES[0], pos) <= SNAP_R) {
      svgRef.current.setPointerCapture(e.pointerId)
      setConnected([0])
      setDragging(true)
      setCursor(pos)
    }
  }, [done, connected, toSVG])

  const handlePointerMove = useCallback((e) => {
    if (!dragging) return
    e.preventDefault()
    const pos = toSVG(e)
    if (!pos) return
    setCursor(pos)

    const lastIdx = connected[connected.length - 1]
    const nextIdx = lastIdx + 1
    if (nextIdx < NODES.length && hypot(NODES[nextIdx], pos) <= SNAP_R) {
      const next = [...connected, nextIdx]
      setConnected(next)
      if (next.length === NODES.length) {
        setDragging(false)
        setCursor(null)
        setDone(true)
        setConfetti(true)
        setTimeout(() => setConfetti(false), 1400)
      }
    }
  }, [dragging, connected, toSVG])

  const handlePointerUp = useCallback(() => {
    if (done) return
    setDragging(false)
    setCursor(null)
    if (connected.length < NODES.length) {
      setTimeout(() => setConnected([]), 350)
    }
  }, [done, connected])

  const trail = buildPath(connected, dragging ? cursor : null)

  /* Background dot grid */
  const dots = useMemo(() => {
    const arr = []
    for (let x = 40; x < VIEWBOX_W; x += 48) {
      for (let y = 20; y < VIEWBOX_H; y += 40) {
        arr.push({ x, y, key: `${x}-${y}` })
      }
    }
    return arr
  }, [])

  return (
    <section className="relative py-28 px-6 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10"
        >
          <span className="inline-block text-xs font-medium tracking-widest uppercase text-[#FFD43B] mb-4">
            Bônus secreto
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Conecte os{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg,#3776AB,#FFD43B)' }}
            >
              5 nós
            </span>{' '}
            para desbloquear
          </h2>
          <p className="mt-3 text-white/35 text-sm max-w-xs mx-auto" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            {done ? '> Bônus desbloqueado! 🎉' : '> Clique no nó 1 e arraste até o 5.'}
          </p>
        </motion.div>

        {/* Game card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: done ? '0.5px solid rgba(55,118,171,0.45)' : '0.5px solid rgba(255,255,255,0.08)',
            boxShadow: done ? '0 0 60px rgba(55,118,171,0.15), inset 0 1px 0 rgba(255,255,255,0.08)' : 'none',
            transition: 'box-shadow 0.5s ease, border-color 0.5s ease',
          }}
        >
          {/* Top border beam */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-px"
            animate={{ opacity: done ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            style={{ background: 'linear-gradient(90deg,transparent,#3776AB80,#FFD43B80,transparent)' }}
          />

          {/* Confetti */}
          <ConfettiLayer show={confetti} />

          {/* SVG Game */}
          <div className="p-4 sm:p-6">
            <svg
              ref={svgRef}
              viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
              className="w-full rounded-xl select-none"
              style={{
                touchAction: 'none',
                background: 'rgba(0,0,0,0.25)',
                cursor: done ? 'default' : 'crosshair',
                minHeight: 120,
              }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              {/* Dot grid */}
              {dots.map(d => (
                <circle key={d.key} cx={d.x} cy={d.y} r="1.2" fill="rgba(255,255,255,0.06)" />
              ))}

              {/* Dashed guide lines between unconnected nodes */}
              {!done && NODES.slice(0, -1).map((n, i) => (
                <line
                  key={i}
                  x1={n.x} y1={n.y}
                  x2={NODES[i + 1].x} y2={NODES[i + 1].y}
                  stroke="rgba(55,118,171,0.12)"
                  strokeWidth="1.5"
                  strokeDasharray="4 6"
                />
              ))}

              {/* Snake trail */}
              {trail && (
                <>
                  {/* Glow layer */}
                  <path
                    d={trail}
                    fill="none"
                    stroke="rgba(55,118,171,0.25)"
                    strokeWidth="14"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Main stroke */}
                  <path
                    d={trail}
                    fill="none"
                    stroke="#3776AB"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Highlight */}
                  <path
                    d={trail}
                    fill="none"
                    stroke="rgba(74,143,204,0.7)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </>
              )}

              {/* Nodes */}
              {NODES.map((node, i) => {
                let state = 'idle'
                if (connected.includes(i)) state = done ? 'done' : 'connected'
                else if (i === connected.length && !done) state = connected.length === 0 ? 'next' : (dragging ? 'next' : 'idle')
                return <NodeCircle key={node.id} node={node} state={state} />
              })}
            </svg>
          </div>

          {/* Bonus reveal */}
          <AnimatePresence>
            {done && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="px-4 sm:px-6 pb-6">
                  <div className="h-px bg-gradient-to-r from-transparent via-[#3776AB]/30 to-transparent mb-6" />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {SECRETS.map((s, i) => (
                      <motion.div
                        key={s.title}
                        initial={{ opacity: 0, scale: 0.85, y: 16 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.15 + i * 0.1, duration: 0.45, type: 'spring', stiffness: 280 }}
                        className="flex flex-col gap-2 p-4 rounded-xl"
                        style={{
                          background: 'rgba(55,118,171,0.08)',
                          border: '0.5px solid rgba(55,118,171,0.25)',
                        }}
                      >
                        <span className="text-2xl">{s.icon}</span>
                        <h4 className="text-sm font-semibold text-white leading-snug">{s.title}</h4>
                        <p className="text-xs text-white/40 leading-relaxed">{s.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Reset hint */}
        {done && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={() => { setDone(false); setConnected([]) }}
            className="mt-4 mx-auto block text-xs text-white/20 hover:text-white/40 transition-colors"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            $ reset_game
          </motion.button>
        )}
      </div>
    </section>
  )
}
