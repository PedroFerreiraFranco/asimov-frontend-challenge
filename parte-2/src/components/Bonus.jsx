import { motion } from 'framer-motion'
import { LayoutTemplate, BookMarked, Users } from 'lucide-react'

const bonuses = [
  {
    icon: LayoutTemplate,
    label: 'Bônus 01',
    title: 'Template de Portfólio Premium',
    desc: 'Um template profissional, dark e moderno para você publicar seus projetos de IA e impressionar recrutadores desde o primeiro dia.',
    value: 'R$ 197',
    accent: '#3776AB',
  },
  {
    icon: BookMarked,
    label: 'Bônus 02',
    title: 'E-book: Prompt Engineering para Devs',
    desc: '80 páginas com os padrões de prompt mais usados na indústria: CoT, Few-shot, ReAct e técnicas avançadas com exemplos em Python.',
    value: 'R$ 97',
    accent: '#FFD43B',
  },
  {
    icon: Users,
    label: 'Bônus 03',
    title: 'Grupo de Networking Vitalício',
    desc: 'Acesso permanente à comunidade privada no Discord com +20.000 devs, vagas exclusivas, code reviews e encontros mensais ao vivo.',
    value: 'Priceless',
    accent: '#3776AB',
  },
]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Bonus() {
  return (
    <section className="relative py-28 px-6">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-medium tracking-widest uppercase text-[#FFD43B] mb-4">
            Bônus exclusivos
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            O stack de{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, #FFD43B, #3776AB)' }}
            >
              aceleração
            </span>
          </h2>
          <p className="mt-4 text-white/40 max-w-lg mx-auto">
            Além do curso, você recebe ferramentas que encurtam em meses o seu caminho.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {bonuses.map((b) => {
            const Icon = b.icon
            return (
              <motion.div
                key={b.title}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                className="group relative p-6 rounded-2xl flex flex-col gap-5 overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '0.5px solid rgba(255,255,255,0.09)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
                }}
              >
                {/* Top border accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${b.accent}60, transparent)` }}
                />

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center border"
                  style={{ background: `${b.accent}12`, borderColor: `${b.accent}30` }}
                >
                  <Icon size={22} style={{ color: b.accent }} />
                </div>

                <div className="flex-1 flex flex-col gap-2">
                  <span className="text-[10px] font-medium tracking-widest uppercase" style={{ color: b.accent }}>
                    {b.label}
                  </span>
                  <h3 className="text-base font-semibold text-white leading-snug">{b.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{b.desc}</p>
                </div>

                {/* Value badge */}
                <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                  <span className="text-xs text-white/30">Valor separado</span>
                  <span
                    className="text-sm font-bold"
                    style={{ color: b.accent }}
                  >
                    {b.value}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Total value callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-white/30">
            Valor total dos bônus:{' '}
            <span className="line-through text-white/20">R$ 294+</span>{' '}
            <span className="text-[#FFD43B] font-semibold">Incluídos no curso</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
