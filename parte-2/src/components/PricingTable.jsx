import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight, Zap, Star, Building2, Lock } from 'lucide-react'

const plans = [
  {
    id: 'pro',
    Icon: Zap,
    name: 'PRO',
    subtitle: 'Foco individual',
    price: '97',
    full: '997',
    accent: '#3776AB',
    features: [
      'Acesso vitalício ao curso',
      '+40h de conteúdo em vídeo HD',
      'Certificado reconhecido pelo mercado',
      'Comunidade privada no Discord',
      'Template de Portfólio Premium',
      'E-book Prompt Engineering',
      'Atualizações gratuitas',
    ],
    cta: 'Começar com PRO',
  },
  {
    id: 'plus',
    Icon: Star,
    name: 'PLUS',
    subtitle: 'Foco em carreira',
    price: '147',
    full: '1.497',
    accent: '#FFD43B',
    badge: 'Mais escolhido',
    highlighted: true,
    features: [
      'Tudo do plano PRO',
      'Mentoria mensal 1:1 (1h/mês)',
      'Acesso antecipado a novos módulos',
      'Code review de projetos',
      'Badge "Aluno PLUS" na comunidade',
      'Grupo VIP de networking',
      'Suporte prioritário (48h SLA)',
    ],
    cta: 'Começar com PLUS',
  },
  {
    id: 'enterprise',
    Icon: Building2,
    name: 'ENTERPRISE',
    subtitle: 'Para equipes',
    price: null,
    accent: 'rgba(255,255,255,0.7)',
    features: [
      'Tudo do plano PLUS',
      'Dashboard de progresso da equipe',
      'Suporte dedicado (24h SLA)',
      'Faturamento por CNPJ',
      'Onboarding exclusivo',
      'Customização de trilha de aprendizado',
      'Relatórios executivos mensais',
    ],
    cta: 'Falar com consultor',
  },
]

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const cardAnim = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

export default function PricingTable() {
  return (
    <section id="preco" className="relative py-28 px-6">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-medium tracking-widest uppercase text-[#3776AB] mb-4">
            Planos
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Escolha seu{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, #3776AB, #FFD43B)' }}
            >
              nível de aceleração
            </span>
          </h2>
          <p className="mt-4 text-white/35 max-w-md mx-auto text-sm">
            Todos os planos incluem garantia incondicional de 7 dias. Sem risco.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start"
        >
          {plans.map((plan) => {
            const { Icon } = plan
            return (
              <motion.div
                key={plan.id}
                variants={cardAnim}
                className={`relative rounded-2xl overflow-hidden flex flex-col ${plan.highlighted ? 'md:-mt-4 md:mb-4' : ''}`}
                style={{
                  background: plan.highlighted
                    ? 'linear-gradient(145deg, rgba(255,212,59,0.06) 0%, rgba(255,255,255,0.04) 100%)'
                    : 'rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: plan.highlighted
                    ? '0.5px solid rgba(255,212,59,0.30)'
                    : '0.5px solid rgba(255,255,255,0.08)',
                  boxShadow: plan.highlighted
                    ? '0 0 60px rgba(255,212,59,0.08), inset 0 1px 0 rgba(255,255,255,0.08)'
                    : 'inset 0 1px 0 rgba(255,255,255,0.04)',
                }}
              >
                {/* Top gradient border */}
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${plan.accent}80, transparent)`,
                  }}
                />

                {/* Badge */}
                {plan.badge && (
                  <div className="absolute top-4 right-4">
                    <span
                      className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full"
                      style={{
                        background: `${plan.accent}18`,
                        border: `0.5px solid ${plan.accent}40`,
                        color: plan.accent,
                      }}
                    >
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="p-6 sm:p-7 flex flex-col gap-6 flex-1">
                  {/* Header */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        background: `${plan.accent}14`,
                        border: `0.5px solid ${plan.accent}30`,
                      }}
                    >
                      <Icon size={18} style={{ color: plan.accent }} />
                    </div>
                    <div>
                      <p className="text-xs font-mono text-white/30">{plan.subtitle}</p>
                      <h3
                        className="text-base font-bold tracking-wide"
                        style={{ color: plan.accent }}
                      >
                        {plan.name}
                      </h3>
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    {plan.price ? (
                      <>
                        <div className="flex items-baseline gap-1">
                          <span className="text-xs text-white/30 font-mono">12x</span>
                          <span className="text-3xl font-bold text-white">R$ {plan.price}</span>
                        </div>
                        <p className="text-xs text-white/25 font-mono mt-1">
                          ou R$ {plan.full} à vista
                        </p>
                      </>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Lock size={14} className="text-white/30" />
                        <span className="text-xl font-bold text-white/60">Sob consulta</span>
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="flex flex-col gap-2.5 flex-1">
                    {plan.features.map((f, i) => (
                      <li key={f} className="flex items-start gap-2.5 text-xs text-white/55">
                        <CheckCircle2
                          size={14}
                          className="flex-shrink-0 mt-0.5"
                          style={{ color: plan.accent }}
                        />
                        <span className={i === 0 && plan.id !== 'pro' ? 'text-white/80 font-medium' : ''}>
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className={`relative w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm overflow-hidden ${plan.highlighted ? 'btn-glow-pulse' : ''}`}
                    style={
                      plan.highlighted
                        ? { background: `linear-gradient(135deg, #c9a800, #FFD43B)`, color: '#000' }
                        : plan.price
                        ? {
                            background: 'rgba(55,118,171,0.15)',
                            border: '0.5px solid rgba(55,118,171,0.35)',
                            color: '#3776AB',
                          }
                        : {
                            background: 'rgba(255,255,255,0.06)',
                            border: '0.5px solid rgba(255,255,255,0.15)',
                            color: 'rgba(255,255,255,0.6)',
                          }
                    }
                  >
                    {/* Shimmer strip */}
                    <span
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.12) 50%,transparent 100%)',
                        animation: 'shimmer 3s ease-in-out infinite',
                      }}
                    />
                    {plan.cta}
                    <ArrowRight size={15} />
                  </motion.button>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Guarantee row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center"
        >
          <p className="text-xs text-white/25 font-mono">
            🛡️ Garantia incondicional de 7 dias em todos os planos — reembolso sem perguntas.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
