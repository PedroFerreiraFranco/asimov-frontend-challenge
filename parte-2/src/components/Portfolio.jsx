import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

/* ── Mini UI Mockups ──────────────────────────────────────────── */

function EmailMockup() {
  const emails = [
    { from: 'Proposta Comercial', label: 'Trabalho', color: '#3776AB', read: true },
    { from: 'Promoção Imperdível!', label: 'Spam', color: '#ef4444', read: false },
    { from: 'Reunião amanhã 10h', label: 'Trabalho', color: '#3776AB', read: true },
    { from: 'Feliz aniversário!', label: 'Pessoal', color: '#FFD43B', read: false },
  ]
  return (
    <div className="rounded-xl overflow-hidden border border-white/[0.07] bg-black/30 text-[10px] font-mono">
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/[0.06] bg-white/[0.02]">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
        <span className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
        <span className="ml-2 text-white/30">📬 inbox — IA Classifier</span>
      </div>
      <div className="divide-y divide-white/[0.04]">
        {emails.map((e, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * i, duration: 0.3 }}
            className="flex items-center justify-between px-3 py-2 gap-3"
            style={{ opacity: e.read ? 0.6 : 1 }}
          >
            <span className="text-white/70 truncate flex-1">{e.from}</span>
            <motion.span
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 * i + 0.2, type: 'spring', stiffness: 400 }}
              className="flex-shrink-0 px-1.5 py-0.5 rounded text-[9px] font-bold"
              style={{ background: `${e.color}20`, color: e.color }}
            >
              {e.label}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function SentimentMockup() {
  return (
    <div className="rounded-xl overflow-hidden border border-white/[0.07] bg-black/30 font-mono text-[10px]">
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/[0.06] bg-white/[0.02]">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
        <span className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
        <span className="ml-2 text-white/30">🤖 SentimentBot</span>
      </div>
      <div className="p-3 flex flex-col gap-2">
        {[
          { who: 'user', msg: 'Adorei o produto, superou minhas expectativas!', sentiment: null },
          { who: 'bot', msg: null, sentiment: { emoji: '😊', label: 'Positivo', pct: '96%', color: '#22c55e' } },
          { who: 'user', msg: 'Entrega atrasou e atendimento péssimo.', sentiment: null },
          { who: 'bot', msg: null, sentiment: { emoji: '😤', label: 'Negativo', pct: '91%', color: '#ef4444' } },
        ].map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.3 }}
            className={`flex ${line.who === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {line.msg && (
              <span className="px-2 py-1 rounded-lg bg-[#3776AB]/20 text-white/70 max-w-[80%]">
                {line.msg}
              </span>
            )}
            {line.sentiment && (
              <span
                className="px-2 py-1 rounded-lg font-bold"
                style={{ background: `${line.sentiment.color}18`, color: line.sentiment.color }}
              >
                {line.sentiment.emoji} {line.sentiment.label} · {line.sentiment.pct}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function DalleMockup() {
  return (
    <div className="rounded-xl overflow-hidden border border-white/[0.07] bg-black/30 font-mono text-[10px]">
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/[0.06] bg-white/[0.02]">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
        <span className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
        <span className="ml-2 text-white/30">🎨 DALL-E Generator</span>
      </div>
      <div className="p-3 flex flex-col gap-2">
        <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06]">
          <span className="text-white/30">prompt:</span>
          <span className="text-[#FFD43B]/80 truncate">"robô em cidade futurista, neon blue"</span>
        </div>
        {/* Generated image placeholder */}
        <motion.div
          className="relative h-20 rounded-lg overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #3776AB22 0%, #FFD43B18 40%, #3776AB30 70%, #FFD43B22 100%)',
            border: '0.5px solid rgba(255,212,59,0.2)',
          }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)',
            }}
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-1">
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 h-1 rounded-full bg-[#FFD43B]/60"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </div>
              <span className="text-[9px] text-white/30">gerando imagem...</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

/* ── Project data ─────────────────────────────────────────────── */

const projects = [
  {
    title: 'Classificador de E-mails',
    desc: 'IA que lê e categoriza automaticamente e-mails em Trabalho, Pessoal e Spam com 97% de precisão.',
    stack: ['Python', 'OpenAI', 'NLP', 'FastAPI'],
    mockup: EmailMockup,
    accent: '#3776AB',
  },
  {
    title: 'Bot de Análise de Sentimentos',
    desc: 'Analisa reviews de produtos e mensagens em tempo real, retornando score de sentimento com emoji.',
    stack: ['Python', 'NLTK', 'GPT-4o', 'Discord API'],
    mockup: SentimentMockup,
    accent: '#FFD43B',
  },
  {
    title: 'Gerador de Imagens com DALL-E',
    desc: 'Interface que aceita prompts em PT-BR, refina com GPT-4o e gera imagens profissionais com DALL-E 3.',
    stack: ['Python', 'DALL-E 3', 'GPT-4o', 'Streamlit'],
    mockup: DalleMockup,
    accent: '#3776AB',
  },
]

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const cardAnim = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Portfolio() {
  return (
    <section className="relative py-28 px-6">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-medium tracking-widest uppercase text-[#FFD43B] mb-4">
            Projetos do curso
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            O que você vai{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, #FFD43B, #3776AB)' }}
            >
              construir
            </span>
          </h2>
          <p className="mt-4 text-white/40 max-w-lg mx-auto text-sm">
            Projetos reais, prontos para o portfólio. Não é CRUD — é IA em produção.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {projects.map((proj) => {
            const Mockup = proj.mockup
            return (
              <motion.div
                key={proj.title}
                variants={cardAnim}
                whileHover={{ y: -4, borderColor: `${proj.accent}55` }}
                className="group relative flex flex-col gap-4 p-5 rounded-2xl overflow-hidden cursor-default"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '0.5px solid rgba(255,255,255,0.09)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
                  transition: 'border-color 0.3s ease, transform 0.2s ease',
                }}
              >
                {/* Top accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${proj.accent}70, transparent)` }}
                />

                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{ background: `radial-gradient(250px circle at 50% 0%, ${proj.accent}10, transparent 70%)` }}
                />

                {/* Mini mockup */}
                <div className="relative z-10">
                  <Mockup />
                </div>

                {/* Info */}
                <div className="relative z-10 flex flex-col gap-3 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold text-white leading-snug">{proj.title}</h3>
                    <ExternalLink
                      size={14}
                      className="flex-shrink-0 text-white/20 group-hover:text-white/50 transition-colors mt-0.5"
                    />
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed">{proj.desc}</p>

                  {/* Stack */}
                  <div className="flex flex-wrap gap-1.5 mt-auto pt-2 border-t border-white/[0.06]">
                    {proj.stack.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md"
                        style={{
                          background: `${proj.accent}10`,
                          border: `0.5px solid ${proj.accent}28`,
                          color: `${proj.accent}BB`,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
