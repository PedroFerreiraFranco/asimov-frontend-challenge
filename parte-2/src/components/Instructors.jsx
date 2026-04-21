import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Award, Users, BookOpen } from 'lucide-react'

/* ── Instructor data ──────────────────────────────────────────── */
const instructors = [
  {
    name: 'Rodrigo Tadewald',
    role: 'CTO & Sócio Fundador',
    tag: 'Machine Learning',
    bio: 'Engenheiro Químico (UFRGS). Especialista em Machine Learning e Cloud. Sócio fundador da Asimov.',
    img: 'https://asimov.academy/wp-content/uploads/2025/02/image.png.webp',
    stats: [
      { icon: Users,    value: '+20k',  label: 'Alunos' },
      { icon: BookOpen, value: '+8',    label: 'Anos ensinando' },
      { icon: Award,    value: 'Top 1%', label: 'Instrutores' },
    ],
    accent: '#3776AB',
    neuralDelay: '0s',
  },
  {
    name: 'Adriano Soares',
    role: 'Co-fundador & Quant Specialist',
    tag: 'Data Science',
    bio: 'Engenheiro Químico (UFRGS). Especialista em estratégias quantitativas e cofundador da Asimov.',
    img: 'https://asimov.academy/wp-content/uploads/2025/02/img-2.png.webp',
    stats: [
      { icon: Users,    value: '+15k',  label: 'Alunos' },
      { icon: BookOpen, value: '+10',   label: 'Anos de mercado' },
      { icon: Award,    value: 'Expert', label: 'Quant & IA' },
    ],
    accent: '#FFD43B',
    neuralDelay: '0.9s',
  },
  {
    name: 'Juliano Faccioni',
    role: 'Instrutor Sênior',
    tag: 'Analytics',
    bio: 'Doutor em Biologia Celular (UFRGS). Especialista em análise de dados e pensamento analítico.',
    img: 'https://asimov.academy/wp-content/uploads/2025/02/image-2.png.webp',
    stats: [
      { icon: Users,    value: '+12k',  label: 'Alunos' },
      { icon: BookOpen, value: 'PhD',   label: 'UFRGS' },
      { icon: Award,    value: 'Expert', label: 'Análise de Dados' },
    ],
    accent: '#3776AB',
    neuralDelay: '1.8s',
  },
]

/* ── Neural network geometry (static, generated once) ─────────── */
const NEURAL_NODES = [
  { x: 12, y: 20 }, { x: 38, y: 8  }, { x: 62, y: 30 }, { x: 80, y: 15 },
  { x: 25, y: 50 }, { x: 55, y: 60 }, { x: 85, y: 48 }, { x: 10, y: 75 },
  { x: 42, y: 82 }, { x: 70, y: 78 }, { x: 90, y: 70 },
]
const NEURAL_EDGES = [
  [0,1],[0,4],[1,2],[1,4],[2,3],[2,5],[3,6],[4,5],[4,7],[5,6],[5,8],[6,9],[6,10],[7,8],[8,9],[9,10],
]

/* ── Typewriter hook ──────────────────────────────────────────── */
function useTypewriter(text, active, speed = 22, onDone) {
  const [displayed, setDisplayed] = useState('')
  const timerRef = useRef(null)
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)

    if (!active) {
      setDisplayed('')
      return
    }

    setDisplayed('')
    let i = 0
    function tick() {
      i++
      setDisplayed(text.slice(0, i))
      if (i < text.length) {
        timerRef.current = setTimeout(tick, speed)
      } else {
        onDoneRef.current?.()
      }
    }
    timerRef.current = setTimeout(tick, 80)
    return () => clearTimeout(timerRef.current)
  }, [active, text, speed])

  return displayed
}

/* ── Neural SVG background ────────────────────────────────────── */
function NeuralBackground({ accent, delay }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {NEURAL_EDGES.map(([a, b], i) => (
        <line
          key={i}
          className="neural-line"
          x1={NEURAL_NODES[a].x} y1={NEURAL_NODES[a].y}
          x2={NEURAL_NODES[b].x} y2={NEURAL_NODES[b].y}
          stroke={accent}
          strokeWidth="0.5"
          style={{ animationDelay: `${(i * 0.18) % 2.8}s` }}
        />
      ))}
      {NEURAL_NODES.map((n, i) => (
        <circle
          key={i}
          className="neural-node"
          cx={n.x} cy={n.y} r="2.5"
          fill={accent}
          style={{ animationDelay: `${delay || ((i * 0.25) % 2.8)}s` }}
        />
      ))}
    </svg>
  )
}

/* ── Terminal bio block ──────────────────────────────────────── */
function TerminalBio({ text, active, accent, onDone }) {
  const displayed = useTypewriter(text, active, 22, onDone)
  const isDone = displayed.length === text.length

  return (
    <motion.div
      initial={false}
      animate={{ opacity: active ? 1 : 0, y: active ? 0 : 6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="rounded-lg px-3 py-2.5 text-xs leading-relaxed"
      style={{
        background: 'rgba(0,0,0,0.55)',
        border: `0.5px solid ${accent}25`,
        fontFamily: "'JetBrains Mono', monospace",
        minHeight: 52,
        color: 'rgba(255,255,255,0.70)',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <span className="text-green-400/60 select-none">$ </span>
      {displayed}
      {/* Cursor: blinks while typing and stays blinking when done */}
      {active && (
        <span
          style={{
            display: 'inline-block',
            width: 7,
            height: 13,
            background: accent,
            verticalAlign: 'text-bottom',
            marginLeft: 2,
            animation: 'blink 1s step-end infinite',
          }}
        />
      )}
    </motion.div>
  )
}

/* ── Gradient border photo frame ─────────────────────────────── */
function GradientFrame({ children, accent }) {
  return (
    <div
      className="rounded-xl p-[1.5px] flex-shrink-0"
      style={{
        background: `linear-gradient(135deg, ${accent} 0%, #FFD43B 50%, ${accent} 100%)`,
        boxShadow: `0 0 16px ${accent}28`,
      }}
    >
      <div className="rounded-[10px] overflow-hidden bg-[#050505]">{children}</div>
    </div>
  )
}

/* ── Single instructor card ──────────────────────────────────── */
function InstructorCard({ ins, index, isTouch }) {
  const [hovered, setHovered] = useState(false)
  const [tapped,  setTapped]  = useState(false)
  const [revealed, setRevealed] = useState(false)

  // active = hover OR tap OR already revealed (text persists after first read)
  const active = hovered || tapped || revealed

  const handleClick = () => {
    if (!revealed && !tapped) setTapped(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={handleClick}
      className="relative flex flex-col gap-4 p-5 rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: active
          ? `0.5px solid ${ins.accent}45`
          : '0.5px solid rgba(255,255,255,0.09)',
        boxShadow: active
          ? `0 0 40px ${ins.accent}18, inset 0 1px 0 rgba(255,255,255,0.06)`
          : 'inset 0 1px 0 rgba(255,255,255,0.04)',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        cursor: revealed ? 'default' : isTouch ? 'pointer' : 'default',
      }}
    >
      {/* Neural background */}
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ zIndex: 0 }}
      >
        <NeuralBackground accent={ins.accent} delay={ins.neuralDelay} />
      </motion.div>

      {/* Accent top line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${ins.accent}70, transparent)`, zIndex: 1 }}
      />

      {/* Photo */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <GradientFrame accent={ins.accent}>
          <img
            src={ins.img}
            alt={ins.name}
            className="w-full object-cover object-top"
            style={{ height: 210 }}
            loading="lazy"
          />
        </GradientFrame>
      </div>

      {/* Name + tag */}
      <div className="flex items-center justify-between" style={{ position: 'relative', zIndex: 2 }}>
        <div>
          <h3 className="text-sm font-bold text-white">{ins.name}</h3>
          <p className="text-[11px] text-white/40 mt-0.5">{ins.role}</p>
        </div>
        <span
          className="text-[10px] font-medium px-2 py-0.5 rounded-full"
          style={{
            background: `${ins.accent}14`,
            border: `0.5px solid ${ins.accent}35`,
            color: ins.accent,
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          {ins.tag}
        </span>
      </div>

      {/* Terminal bio */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <TerminalBio
          text={ins.bio}
          active={active}
          accent={ins.accent}
          onDone={() => setRevealed(true)}
        />

        {/* Touch hint — shown only on touch devices when not yet activated */}
        {isTouch && !revealed && !tapped && (
          <p
            className="mt-1.5 text-center text-[10px] text-white/20"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            toque para ver o perfil ↑
          </p>
        )}
      </div>

      {/* Stats row */}
      <div
        className="grid grid-cols-3 gap-2 pt-3 border-t"
        style={{ borderColor: 'rgba(255,255,255,0.06)', position: 'relative', zIndex: 2 }}
      >
        {ins.stats.map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} className="flex flex-col items-center gap-1 text-center">
              <Icon size={11} style={{ color: ins.accent }} />
              <span className="text-xs font-bold text-white">{s.value}</span>
              <span className="text-[9px] text-white/30 leading-tight">{s.label}</span>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}

/* ── Section ─────────────────────────────────────────────────── */
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }

export default function Instructors() {
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    setIsTouch(window.matchMedia('(hover: none) and (pointer: coarse)').matches)
  }, [])

  return (
    <section className="relative py-28 px-6">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-medium tracking-widest uppercase text-[#3776AB] mb-4">
            Instrutores
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Aprenda com{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, #3776AB, #FFD43B)' }}
            >
              especialistas
            </span>
          </h2>
          <p className="mt-4 text-white/35 max-w-md mx-auto text-sm">
            Profissionais que vivem o que ensinam — com histórico comprovado no mercado.
          </p>
          <p
            className="mt-3 text-[11px] text-white/20"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {isTouch
              ? '// toque no card para ver o perfil'
              : '// passe o mouse sobre o card para ver o perfil'}
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {instructors.map((ins, i) => (
            <InstructorCard key={ins.name} ins={ins} index={i} isTouch={isTouch} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
