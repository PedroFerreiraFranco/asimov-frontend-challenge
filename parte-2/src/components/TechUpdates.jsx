import { motion } from 'framer-motion'
import { RefreshCw, Sparkles } from 'lucide-react'

const techs = [
  { label: 'Agentes de IA', color: '#3776AB' },
  { label: 'RAG', color: '#FFD43B' },
  { label: 'Python 3.13', color: '#3776AB' },
  { label: 'LangGraph', color: '#FFD43B' },
  { label: 'Vector DBs', color: '#3776AB' },
  { label: 'Fine-tuning', color: '#FFD43B' },
  { label: 'MCP Protocol', color: '#3776AB' },
  { label: 'GPT-4o mini', color: '#FFD43B' },
]

export default function TechUpdates() {
  return (
    <section className="relative py-24 px-6">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left — heading + description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-5"
          >
            <div className="flex items-center gap-2">
              <RefreshCw size={13} className="text-[#FFD43B]" />
              <span className="text-xs font-medium tracking-widest uppercase text-[#FFD43B]">
                Sempre atualizado
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-snug">
              O mercado muda rápido.{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(90deg, #3776AB, #FFD43B)' }}
              >
                Seu curso também.
              </span>
            </h2>

            <p className="text-sm text-white/45 leading-relaxed">
              Receba atualizações gratuitas para sempre. Novos módulos sobre as
              tecnologias mais quentes do mercado são adicionados continuamente —
              você paga uma vez e acessa tudo que vier a seguir.
            </p>

            {/* New tech highlight badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.45 }}
              className="flex items-start gap-3 p-4 rounded-xl"
              style={{
                background: 'rgba(55,118,171,0.07)',
                border: '0.5px solid rgba(55,118,171,0.22)',
              }}
            >
              <Sparkles size={14} className="text-[#FFD43B] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-white mb-1">Novas tecnologias integradas</p>
                <p className="text-xs text-white/40 leading-relaxed font-mono">
                  Agentes de IA · LangGraph · Python 3.13 · MCP Protocol · RAG avançado
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — tech tags */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4"
          >
            <p className="text-xs text-white/25 font-mono">
              &gt; módulos incluídos no curso
            </p>

            <div className="flex flex-wrap gap-2">
              {techs.map((t, i) => (
                <motion.span
                  key={t.label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.3, type: 'spring', stiffness: 300 }}
                  className="text-xs font-mono px-3 py-1.5 rounded-full"
                  style={{
                    background: `${t.color}10`,
                    border: `0.5px solid ${t.color}30`,
                    color: `${t.color}BB`,
                  }}
                >
                  {t.label}
                </motion.span>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-[#3776AB]/20 via-[#FFD43B]/15 to-transparent mt-2" />

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: '8+', label: 'Tecnologias', color: '#3776AB' },
                { value: '∞', label: 'Atualizações', color: '#FFD43B' },
                { value: 'R$ 0', label: 'Custo extra', color: '#3776AB' },
              ].map((s) => (
                <div key={s.label} className="flex flex-col gap-1">
                  <span
                    className="text-2xl font-bold"
                    style={{ color: s.color }}
                  >
                    {s.value}
                  </span>
                  <span className="text-xs text-white/30">{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
