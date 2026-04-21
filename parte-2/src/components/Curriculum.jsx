import { motion } from 'framer-motion'
import { Code2, Database, Brain, Bot, Rocket } from 'lucide-react'

const modules = [
  {
    num: '01',
    icon: Code2,
    title: 'A Fundação',
    desc: 'Sintaxe Python 3.12, tipos de dados, estruturas de controle e lógica de programação do zero ao confiante.',
    tags: ['Python 3.12', 'OOP', 'Type Hints', 'Pytest'],
    size: 'col-span-1',
    accent: '#3776AB',
  },
  {
    num: '02',
    icon: Database,
    title: 'Automação Inteligente',
    desc: 'Requests, Pandas e manipulação de dados reais. Automatize planilhas, scraping e pipelines de dados.',
    tags: ['Pandas', 'NumPy', 'BeautifulSoup', 'REST APIs'],
    size: 'col-span-1',
    accent: '#3776AB',
  },
  {
    num: '03',
    icon: Brain,
    title: 'O Cérebro da IA',
    desc: 'Prompt Engineering avançado e integração com a OpenAI SDK. Aprenda a "falar" com a IA de forma precisa.',
    tags: ['GPT-4o', 'OpenAI SDK', 'Embeddings', 'RAG'],
    size: 'col-span-1',
    accent: '#FFD43B',
  },
  {
    num: '04',
    icon: Bot,
    title: 'Agentes Autônomos',
    desc: 'Construa robôs que lêem e-mails, tomam decisões, pesquisam na web e executam tarefas sem intervenção humana.',
    tags: ['LangChain', 'Tool Use', 'Memory', 'ReAct'],
    size: 'col-span-1 md:col-span-2',
    accent: '#3776AB',
  },
  {
    num: '05',
    icon: Rocket,
    title: 'Deployment & Carreira',
    desc: 'Coloque sua IA no ar, monte um portfólio irrecusável e conquiste sua primeira vaga em tech.',
    tags: ['Docker', 'FastAPI', 'Vercel', 'GitHub'],
    size: 'col-span-1',
    accent: '#FFD43B',
  },
]

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const cardAnim = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Curriculum() {
  return (
    <section id="curriculo" className="relative py-28 px-6">
      {/* Section divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-medium tracking-widest uppercase text-[#3776AB] mb-4">
            Currículo
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            O que você vai{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, #3776AB, #FFD43B)' }}
            >
              aprender
            </span>
          </h2>
          <p className="mt-4 text-white/40 max-w-xl mx-auto text-base">
            5 módulos que levam você do zero à IA em produção — sem rodeios.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-3"
        >
          {modules.map((mod) => {
            const Icon = mod.icon
            return (
              <motion.div
                key={mod.num}
                variants={cardAnim}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className={`group relative rounded-2xl p-6 overflow-hidden cursor-default ${mod.size}`}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '0.5px solid rgba(255,255,255,0.09)',
                  transition: 'border-color 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${mod.accent}50`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'
                }}
              >
                {/* Radial glow from top on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(280px circle at 50% -20px, ${mod.accent}18, transparent 70%)`,
                  }}
                />

                {/* Top edge accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${mod.accent}70, transparent)` }}
                />

                <div className="relative z-10 h-full flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <div
                      className="p-2.5 rounded-xl"
                      style={{
                        background: `${mod.accent}15`,
                        border: `0.5px solid ${mod.accent}35`,
                      }}
                    >
                      <Icon size={18} style={{ color: mod.accent }} />
                    </div>
                    <span className="text-xs font-mono text-white/18">{mod.num}</span>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-white mb-2">{mod.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed">{mod.desc}</p>
                  </div>

                  {/* Tech badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {mod.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md font-mono"
                        style={{
                          background: `${mod.accent}10`,
                          border: `0.5px solid ${mod.accent}28`,
                          color: `${mod.accent}CC`,
                        }}
                      >
                        {tag}
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
