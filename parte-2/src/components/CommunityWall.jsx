import { motion } from 'framer-motion'

const row1 = [
  { name: 'Lucas M.', avatar: 'LM', color: '#3776AB', time: 'hoje às 14:32', msg: 'Finalmente entendi lógica de programação depois de tentar por 2 anos! O método do professor é diferente de tudo que já vi.' },
  { name: 'Ana Paula S.', avatar: 'AP', color: '#FFD43B', time: 'hoje às 11:15', msg: 'Meu primeiro bot de IA rodando em 1 semana! Automatizei todo o relatório da minha empresa. Meu chefe ficou em choque 😂' },
  { name: 'Gabriel R.', avatar: 'GR', color: '#3776AB', time: 'ontem às 22:48', msg: 'A comunidade tira dúvidas em minutos. Postei uma pergunta às 23h e já tinha 3 respostas quando acordei.' },
  { name: 'Fernanda C.', avatar: 'FC', color: '#FFD43B', time: 'ontem às 18:05', msg: 'Consegui minha primeira vaga como dev júnior! O portfólio que montei no módulo 5 foi o que chamou atenção da empresa.' },
  { name: 'Thiago B.', avatar: 'TB', color: '#3776AB', time: '2 dias atrás', msg: 'Nunca pensei que ia conseguir fazer um agente de IA do zero. O módulo 4 é simplesmente genial, muito bem explicado.' },
  { name: 'Mariana L.', avatar: 'ML', color: '#FFD43B', time: '3 dias atrás', msg: 'Já tentei outros cursos e sempre travava em Python. Aqui no módulo 1 tudo fez sentido pela primeira vez. 10/10 recomendo!' },
]

const row2 = [
  { name: 'Rodrigo F.', avatar: 'RF', color: '#FFD43B', time: 'hoje às 09:20', msg: 'Criei um chatbot para o site da minha loja em 3 horas. O ROI desse curso foi imediato 🚀' },
  { name: 'Camila V.', avatar: 'CV', color: '#3776AB', time: 'hoje às 08:47', msg: 'O suporte é incrível! Até o professor responde no grupo. Sinto que estou sendo acompanhada de verdade.' },
  { name: 'Diego A.', avatar: 'DA', color: '#FFD43B', time: 'ontem às 20:30', msg: 'Em 1 mês de curso já sei mais Python do que colegas que estudam há 1 ano. O conteúdo é muito denso (no bom sentido).' },
  { name: 'Juliana P.', avatar: 'JP', color: '#3776AB', time: 'ontem às 16:22', msg: 'Construí um analisador de dados com IA para o meu TCC. Minha orientadora perguntou se eu tinha contratado alguém kkkk' },
  { name: 'Bruno H.', avatar: 'BH', color: '#FFD43B', time: '2 dias atrás', msg: 'Fiz o deploy da minha primeira API com IA no módulo 5. Parece impossível mas o professor torna tudo simples e direto.' },
  { name: 'Natália O.', avatar: 'NO', color: '#3776AB', time: '4 dias atrás', msg: 'Comunidade top demais! +20k alunos e todo mundo se ajuda. Nunca vi isso em outro lugar. Vale muito a pena.' },
]

function Card({ card }) {
  return (
    <motion.div
      whileHover={{ scale: 1.025, y: -2 }}
      transition={{ duration: 0.2 }}
      className="group relative flex-shrink-0 w-72 p-4 rounded-xl cursor-default"
      style={{
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: `0.5px solid rgba(255,255,255,0.08)`,
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
      }}
    >
      {/* Glow ring on hover — colored by user */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          boxShadow: `0 0 20px 2px ${card.color}28`,
          border: `0.5px solid ${card.color}35`,
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0"
            style={{ background: `${card.color}25`, border: `0.5px solid ${card.color}55` }}
          >
            {card.avatar}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-white truncate">{card.name}</p>
            <p className="text-[10px] text-white/30">{card.time}</p>
          </div>
          <div
            className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: card.color, boxShadow: `0 0 5px ${card.color}` }}
          />
        </div>
        <p className="text-xs text-white/55 leading-relaxed">{card.msg}</p>
      </div>
    </motion.div>
  )
}

function MarqueeRow({ cards, reverse = false }) {
  const doubled = [...cards, ...cards]
  return (
    <div
      className="marquee-row overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
      }}
    >
      <div className={`flex gap-3 w-max ${reverse ? 'marquee-track-rev' : 'marquee-track'}`}>
        {doubled.map((card, i) => (
          <Card key={i} card={card} />
        ))}
      </div>
    </div>
  )
}

export default function CommunityWall() {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <span className="inline-block text-xs font-medium tracking-widest uppercase text-[#3776AB] mb-4">
            Comunidade
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            +20.000 alunos já{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, #FFD43B, #3776AB)' }}
            >
              transformaram
            </span>{' '}
            suas carreiras
          </h2>
          <p className="mt-4 text-white/35 max-w-xl mx-auto text-sm">
            Passe o mouse sobre a linha para pausar e ler cada história.
          </p>
        </motion.div>
      </div>

      <div className="flex flex-col gap-4">
        <MarqueeRow cards={row1} />
        <MarqueeRow cards={row2} reverse />
      </div>
    </section>
  )
}
