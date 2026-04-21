import { useRef } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight, BookOpen } from 'lucide-react'
import CodeOrb from './CodeOrb'

const bullets = [
  '+40 horas de conteúdo direto ao ponto',
  'Projetos com Python + IA desde o módulo 1',
  'Suporte da comunidade com +20.000 alunos',
  'Certificado reconhecido pelo mercado',
]

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* LEFT */}
        <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col gap-8">
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase px-4 py-2 rounded-full border border-[#3776AB]/30 bg-[#3776AB]/10 text-[#3776AB]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFD43B] animate-pulse" />
              Curso Python + IA — Turma 2026
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight text-white"
          >
            Aprenda Python do zero e construa{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, #3776AB 0%, #FFD43B 100%)' }}
            >
              projetos reais com IA
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg text-white/50 leading-relaxed max-w-xl">
            O curso mais prático do Brasil para quem quer entrar em tecnologia sem enrolação.
          </motion.p>

          <motion.ul variants={fadeUp} className="flex flex-col gap-3">
            {bullets.map((b) => (
              <li key={b} className="flex items-center gap-3 text-sm text-white/70">
                <CheckCircle2 size={16} className="flex-shrink-0 text-[#3776AB]" />
                {b}
              </li>
            ))}
          </motion.ul>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById('preco')?.scrollIntoView({ behavior: 'smooth' })}
              className="relative flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-white"
              style={{
                background: 'linear-gradient(135deg, #3776AB 0%, #2a5c87 100%)',
                boxShadow: '0 0 28px rgba(55,118,171,0.50)',
              }}
            >
              Quero começar agora
              <ArrowRight size={16} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03, borderColor: 'rgba(55,118,171,0.55)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                const el = document.getElementById('curriculo')
                if (el) window.scrollTo({ top: el.offsetTop - 32, behavior: 'smooth' })
              }}
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-white/80 border border-white/10 bg-white/5 backdrop-blur-sm transition-colors duration-300"
            >
              <BookOpen size={16} />
              Ver o que vou aprender
            </motion.button>
          </motion.div>

          <motion.p variants={fadeUp} className="text-xs text-white/30">
            Mais de <span className="text-white/60 font-medium">20.000 alunos</span> já transformaram suas carreiras.
          </motion.p>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:flex justify-center items-center"
        >
          <CodeOrb />
        </motion.div>
      </div>
    </section>
  )
}
