import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Terminal } from 'lucide-react'

const JB = "'JetBrains Mono', monospace"

/* Fixed deadline: 30/04/2026 at 23:59:59 */
const DEADLINE = new Date('2026-04-30T23:59:59').getTime()

function getTarget() {
  return new Date(DEADLINE)
}

function getRemaining(target) {
  const diff = target - Date.now()
  if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 }
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff % 86400000) / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
  }
}

function Digit({ value, label }) {
  const str = String(value).padStart(2, '0')
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative overflow-hidden">
        <motion.span
          key={str}
          initial={{ y: -12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 12, opacity: 0 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="block tabular-nums text-xl sm:text-2xl font-bold"
          style={{ fontFamily: JB, color: '#3776AB' }}
        >
          {str}
        </motion.span>
      </div>
      <span className="text-[9px] text-white/25 uppercase tracking-widest" style={{ fontFamily: JB }}>
        {label}
      </span>
    </div>
  )
}

export default function CountdownBanner() {
  const target = useRef(getTarget())
  const [time, setTime] = useState(() => getRemaining(target.current))

  useEffect(() => {
    const id = setInterval(() => setTime(getRemaining(target.current)), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="mx-6 lg:mx-auto max-w-4xl rounded-xl overflow-hidden"
      style={{
        background: 'rgba(0,0,0,0.60)',
        border: '0.5px solid rgba(55,118,171,0.25)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      {/* Chrome bar */}
      <div
        className="flex items-center justify-between px-4 py-2 border-b border-white/[0.05] bg-black/25"
        style={{ fontFamily: JB }}
      >
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500/60" />
          <span className="w-2 h-2 rounded-full bg-yellow-400/60" />
          <span className="w-2 h-2 rounded-full bg-green-500/60" />
          <Terminal size={11} className="ml-2 text-white/20" />
          <span className="text-[10px] text-white/25 ml-1 truncate">
            asimov@academy:~$ watch --interval=1 matriculas_2026
          </span>
        </div>

        {/* Fixed deadline notice */}
        <span
          className="text-[9px] px-2 py-1 rounded text-yellow-400/80"
          style={{ background: 'rgba(255,212,59,0.08)', border: '0.5px solid rgba(255,212,59,0.18)' }}
        >
          ⏰ Prazo: 30/04/2026
        </span>
      </div>

      {/* Body */}
      <div
        className="flex flex-col sm:flex-row items-center gap-4 px-5 sm:px-8 py-4"
        style={{ fontFamily: JB }}
      >
        {/* Prompt line */}
        <div className="flex-1 text-xs sm:text-sm leading-relaxed text-center sm:text-left">
          <span className="text-green-400/70">✓ </span>
          <span className="text-white/40">Matrículas da </span>
          <span className="text-white/80 font-semibold">1ª Turma de 2026</span>
          <span className="text-white/40"> encerram em</span>
          <span
            className="inline-block w-[2px] h-[14px] bg-[#3776AB] ml-1 align-middle rounded-sm"
            style={{ animation: 'blink 1s step-end infinite' }}
          />
        </div>

        {/* Timer + Fixed date badge */}
        <div className="flex items-end gap-3 flex-shrink-0">
          <div className="flex items-end gap-2 sm:gap-3">
            <Digit value={time.d} label="dias" />
            <span className="text-[#3776AB]/35 text-lg pb-5" style={{ fontFamily: JB }}>:</span>
            <Digit value={time.h} label="horas" />
            <span className="text-[#3776AB]/35 text-lg pb-5" style={{ fontFamily: JB }}>:</span>
            <Digit value={time.m} label="min" />
            <span className="text-[#3776AB]/35 text-lg pb-5" style={{ fontFamily: JB }}>:</span>
            <Digit value={time.s} label="seg" />
          </div>

          {/* Fixed date indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg flex-shrink-0"
            style={{
              background: 'rgba(255,212,59,0.10)',
              border: '0.5px solid rgba(255,212,59,0.25)',
            }}
            title="Data limite: 30 de Abril de 2026"
          >
            <span style={{ fontSize: 10, color: '#FFD43B', fontFamily: JB, fontWeight: 600 }}>
              📅 30/04
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
