import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Lock, CheckCircle2, Code2, Database, Brain, Bot, Rocket } from 'lucide-react'

const steps = [
  {
    module: '01',
    badge: '🌱',
    title: 'Semente',
    subtitle: 'A Fundação',
    desc: 'Você planta a semente. Sintaxe Python 3.12, tipos de dados, OOP e lógica de programação do zero.',
    xp: 500,
    tags: ['Python 3.12', 'Type Hints', 'OOP', 'Pytest'],
    icon: Code2,
    accent: '#3776AB',
  },
  {
    module: '02',
    badge: '⚡',
    title: 'Aprendiz',
    subtitle: 'Automação Inteligente',
    desc: 'Você ganha velocidade. Pandas, Requests e automação de pipelines de dados reais do mercado.',
    xp: 800,
    tags: ['Pandas', 'NumPy', 'REST APIs', 'BeautifulSoup'],
    icon: Database,
    accent: '#3776AB',
  },
  {
    module: '03',
    badge: '🧠',
    title: 'Arquiteto',
    subtitle: 'O Cérebro da IA',
    desc: 'Você domina o idioma da IA. Prompt Engineering avançado, embeddings e OpenAI SDK na prática.',
    xp: 1200,
    tags: ['GPT-4o', 'OpenAI SDK', 'Embeddings', 'RAG'],
    icon: Brain,
    accent: '#FFD43B',
  },
  {
    module: '04',
    badge: '🤖',
    title: 'Construtor',
    subtitle: 'Agentes Autônomos',
    desc: 'Você cria inteligência. Robôs que lêem, decidem e agem — sem intervenção humana.',
    xp: 1500,
    tags: ['LangChain', 'Tool Use', 'Memory', 'ReAct'],
    icon: Bot,
    accent: '#FFD43B',
  },
  {
    module: '05',
    badge: '🏆',
    title: 'Mestre em IA',
    subtitle: 'Deployment & Carreira',
    desc: 'Você vai ao ar. Deploy em cloud, portfólio matador e a vaga que você sempre quis.',
    xp: 2000,
    tags: ['Docker', 'FastAPI', 'Vercel', 'GitHub'],
    icon: Rocket,
    accent: '#3776AB',
    isFinal: true,
  },
]

const totalXP = steps.reduce((s, m) => s + m.xp, 0)

function XPCounter({ value, inView }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      className="font-mono font-bold tabular-nums"
    >
      {inView && (
        <motion.span
          initial={{ count: 0 }}
          animate={{ count: value }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
        >
          {/* Pure CSS counter via motion value — render with rounded value */}
        </motion.span>
      )}
      +{value.toLocaleString('pt-BR')} XP
    </motion.span>
  )
}

function Step({ step, index, isLast }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const Icon = step.icon

  return (
    <div ref={ref} className="relative flex gap-6 sm:gap-10">
      {/* Timeline spine */}
      {!isLast && (
        <div className="absolute left-[19px] sm:left-[23px] top-12 bottom-0 w-px">
          <motion.div
            className="h-full w-full origin-top"
            style={{ background: `linear-gradient(to bottom, ${step.accent}60, ${step.accent}10)` }}
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      )}

      {/* Icon column */}
      <div className="flex-shrink-0 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center"
          style={{
            background: `${step.accent}18`,
            border: `1px solid ${step.accent}45`,
            boxShadow: inView ? `0 0 20px ${step.accent}25` : 'none',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.3, rotate: -20 }}
            animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            {inView
              ? <CheckCircle2 size={20} style={{ color: step.accent }} />
              : <Lock size={18} className="text-white/30" />
            }
          </motion.div>
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="pb-14 flex-1 min-w-0"
      >
        {/* Header row */}
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <span className="text-xl">{step.badge}</span>
          <div>
            <span className="text-xs font-mono text-white/30 mr-2">Módulo {step.module}</span>
            <span
              className="text-xs font-semibold tracking-wide uppercase"
              style={{ color: step.accent }}
            >
              {step.title}
            </span>
          </div>
          {/* XP badge */}
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.35, type: 'spring', stiffness: 300 }}
            className="ml-auto text-[10px] font-bold font-mono px-2.5 py-1 rounded-full"
            style={{
              background: `${step.accent}15`,
              border: `0.5px solid ${step.accent}40`,
              color: step.accent,
            }}
          >
            +{step.xp.toLocaleString('pt-BR')} XP
          </motion.span>
        </div>

        <h3 className={`text-lg sm:text-xl font-bold text-white mb-1 ${step.isFinal ? 'text-2xl' : ''}`}>
          {step.subtitle}
        </h3>
        <p className="text-sm text-white/40 leading-relaxed mb-4 max-w-lg">{step.desc}</p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {step.tags.map((t) => (
            <span
              key={t}
              className="text-[10px] font-mono px-2 py-0.5 rounded-md"
              style={{
                background: `${step.accent}10`,
                border: `0.5px solid ${step.accent}28`,
                color: `${step.accent}BB`,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default function Roadmap() {
  return (
    <section id="curriculo" className="relative py-28 px-6">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-medium tracking-widest uppercase text-[#3776AB] mb-4">
            Jornada
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Sua evolução,{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, #3776AB, #FFD43B)' }}
            >
              passo a passo
            </span>
          </h2>
          <p className="mt-4 text-white/40 max-w-md mx-auto text-sm">
            Cada módulo que você completa desbloqueia o próximo nível. De zero ao deploy em IA.
          </p>

          {/* Total XP */}
          <div className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-full border border-[#FFD43B]/20 bg-[#FFD43B]/8">
            <span className="text-sm">🏆</span>
            <span className="text-xs text-white/60">XP total do curso:</span>
            <span className="text-sm font-bold font-mono text-[#FFD43B]">
              {totalXP.toLocaleString('pt-BR')} XP
            </span>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {steps.map((step, i) => (
            <Step key={step.module} step={step} index={i} isLast={i === steps.length - 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
