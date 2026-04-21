import { motion } from 'framer-motion'
import { ShieldCheck, CheckCircle2, ArrowRight, Lock } from 'lucide-react'

const features = [
  '5 módulos + projetos reais do dia 1',
  '+40h de conteúdo em vídeo HD',
  'Certificado reconhecido pelo mercado',
  'Template de Portfólio Premium',
  'E-book Prompt Engineering para Devs',
  'Acesso vitalício ao grupo de networking',
  'Suporte da comunidade com +20.000 alunos',
  'Atualizações gratuitas para sempre',
]

export default function Pricing() {
  return (
    <section id="preco" className="relative py-28 px-6">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-medium tracking-widest uppercase text-[#3776AB] mb-4">
            Investimento
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Comece hoje,{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, #3776AB, #FFD43B)' }}
            >
              sem risco
            </span>
          </h2>
        </motion.div>

        {/* Glassmorphism card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.055) 0%, rgba(55,118,171,0.04) 50%, rgba(0,0,0,0.35) 100%)',
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
            border: '0.5px solid rgba(255,255,255,0.10)',
            boxShadow: '0 32px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07)',
          }}
        >
          {/* Rainbow top border */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, #3776AB90, #FFD43B90, transparent)' }}
          />

          {/* Popular badge */}
          <div className="absolute top-5 right-5">
            <span className="text-[10px] font-semibold tracking-wider uppercase px-3 py-1.5 rounded-full bg-[#FFD43B]/10 border border-[#FFD43B]/20 text-[#FFD43B]">
              Mais popular
            </span>
          </div>

          <div className="p-8 sm:p-10">
            {/* Price */}
            <div className="mb-8">
              <p className="text-xs text-white/30 mb-2">Acesso completo por</p>
              <div>
                <span className="text-4xl sm:text-5xl font-bold text-white">12x</span>
                <span className="text-4xl sm:text-5xl font-bold ml-2" style={{ color: '#3776AB' }}>R$ 97</span>
                <p className="text-sm text-white/30 mt-1">ou R$ 997 à vista</p>
              </div>
            </div>

            {/* Features */}
            <ul className="flex flex-col gap-3 mb-8">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-white/65">
                  <CheckCircle2 size={15} className="flex-shrink-0 text-[#3776AB]" />
                  {f}
                </li>
              ))}
            </ul>

            {/* CTA — pulsing glow */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-glow-pulse w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-white text-base"
              style={{
                background: 'linear-gradient(135deg, #3776AB 0%, #2a5c87 100%)',
              }}
            >
              Quero começar agora
              <ArrowRight size={18} />
            </motion.button>

            <div className="flex items-center justify-center gap-2 mt-4">
              <Lock size={13} className="text-white/20" />
              <p className="text-xs text-white/25">Pagamento 100% seguro via Hotmart</p>
            </div>
          </div>

          {/* Guarantee footer */}
          <div
            className="flex items-center gap-5 px-8 sm:px-10 py-5 border-t"
            style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.015)' }}
          >
            <ShieldCheck size={34} className="flex-shrink-0 text-[#FFD43B]" />
            <div>
              <p className="text-sm font-semibold text-white">Garantia incondicional de 7 dias</p>
              <p className="text-xs text-white/35 mt-0.5">
                Não gostou? Peça reembolso total em até 7 dias — sem perguntas, sem burocracia.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center text-xs text-white/20 mt-6"
        >
          Mais de 20.000 alunos já começaram. Você não está sozinho.
        </motion.p>
      </div>
    </section>
  )
}
