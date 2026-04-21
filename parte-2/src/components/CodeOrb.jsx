import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ── Boot sequence ────────────────────────────────────────────── */
const BOOT_STEPS = [
  { msg: '[SYS] INITIALIZING PYTHON 3.12 ENV...', ok: null,         delay: 300  },
  { msg: '[SYS] CONNECTING TO GPT-4o API...',     ok: ' [OK]',      delay: 660  },
  { msg: '[SYS] LOADING NEURAL WEIGHTS...',        ok: ' [SUCCESS]', delay: 580  },
  { msg: '[SYS] ENV READY. LAUNCHING IDE...',     ok: null,         delay: 460  },
]

/* ── Code lines ───────────────────────────────────────────────── */
const LINES = [
  { i: 0, toks: [{ t:'from ',   kw:1 }, { t:'openai',            y:1 }, { t:' import ', kw:1 }, { t:'OpenAI',    b:1 }] },
  { i: 0, toks: [{ t:'import ', kw:1 }, { t:'pandas',            y:1 }, { t:' as ',     kw:1 }, { t:'pd',        b:1 }] },
  { i: 0, toks: [] },
  { i: 0, toks: [{ t:'def ',    kw:1 }, { t:'analyze_data',      y:1 }, { t:'(df):',    d:1 }] },
  { i: 1, toks: [{ t:'client',  w:1 }, { t:' = ', d:1 }, { t:'OpenAI',  b:1 }, { t:'()',   d:1 }] },
  { i: 1, toks: [{ t:'prompt',  w:1 }, { t:' = ', d:1 }, { t:'f"Analise: {df.head()}"', g:1 }] },
  { i: 1, toks: [] },
  { i: 1, toks: [{ t:'response',w:1 }, { t:' = ', d:1 }, { t:'client',  b:1 }, { t:'.chat', d:1 }] },
  { i: 2, toks: [{ t:'.completions', d:1 }, { t:'.create(',      d:1 }] },
  { i: 3, toks: [{ t:'model',   y:1 }, { t:'=', d:1 }, { t:'"gpt-4o"', g:1 }, { t:', ', d:1 }] },
  { i: 3, toks: [{ t:'messages',y:1 }, { t:'=[{', d:1 }, { t:'"role"', y:1 }, { t:':"user",', d:1 }] },
  { i: 4, toks: [{ t:'"content"',y:1 }, { t:': prompt}])', d:1 }] },
  { i: 1, toks: [{ t:'return ', kw:1 }, { t:'response.choices[0].message.content', w:1 }] },
]

const OUTPUT_TEXT = '> analyzing dataset...\n• 15 cols | 1.2k rows\n• avg: 42.3 | std: 8.1\n• anomalies: 3 detected'

/* ── Token style resolver ─────────────────────────────────────── */
function ts(t) {
  if (t.kw) return { color: '#3776AB', textShadow: '0 0 12px rgba(55,118,171,0.70)' }
  if (t.y)  return { color: '#FFD43B' }
  if (t.b)  return { color: '#5aa5d8' }
  if (t.g)  return { color: '#4ade80' }
  if (t.w)  return { color: 'rgba(255,255,255,0.82)' }
  return { color: 'rgba(255,255,255,0.33)' }
}

const JB = "'JetBrains Mono', monospace"

/* ── Component ────────────────────────────────────────────────── */
export default function CodeOrb() {
  const [bootStep,   setBootStep]   = useState(0)
  const [phase,      setPhase]      = useState('boot') // 'boot' | 'ide' | 'output'
  const [outputText, setOutputText] = useState('')

  /* Boot → IDE → Output timeline */
  useEffect(() => {
    const timers = []
    let acc = 0
    BOOT_STEPS.forEach((s, i) => {
      acc += s.delay
      timers.push(setTimeout(() => setBootStep(i + 1), acc))
    })
    acc += 520
    timers.push(setTimeout(() => setPhase('ide'), acc))
    acc += 1100
    timers.push(setTimeout(() => setPhase('output'), acc))
    return () => timers.forEach(clearTimeout)
  }, [])

  /* Output typewriter */
  useEffect(() => {
    if (phase !== 'output') return
    let i = 0
    const id = setInterval(() => {
      i++
      setOutputText(OUTPUT_TEXT.slice(0, i))
      if (i >= OUTPUT_TEXT.length) clearInterval(id)
    }, 26)
    return () => clearInterval(id)
  }, [phase])

  return (
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
      className="relative w-[500px] h-[450px]"
    >
      {/* Ambient glow behind card */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: '-20px',
          background: 'radial-gradient(ellipse 65% 55% at 48% 38%, rgba(55,118,171,0.16) 0%, transparent 80%)',
          boxShadow: '0 0 100px 30px rgba(55,118,171,0.08)',
        }}
      />

      {/* ════ Main IDE Card ════ */}
      <div
        className="absolute top-0 left-0 right-0 h-[348px] rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(155deg, rgba(10,13,24,0.99) 0%, rgba(5,7,15,0.99) 100%)',
          border: '0.5px solid rgba(255,255,255,0.09)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          boxShadow: [
            '0 32px 90px rgba(0,0,0,0.80)',
            '0 0 0 0.5px rgba(55,118,171,0.14)',
            'inset 0 1px 0 rgba(255,255,255,0.06)',
            '0 0 40px rgba(55,118,171,0.06)',
          ].join(', '),
        }}
      >

        {/* ── Tab bar ── */}
        <div
          className="flex items-center h-[42px] border-b select-none"
          style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.32)' }}
        >
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5 px-4 flex-shrink-0">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,95,86,0.80)' }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,189,46,0.80)' }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(39,201,63,0.80)' }} />
          </div>

          <div className="w-px h-4 flex-shrink-0" style={{ background: 'rgba(255,255,255,0.07)', margin: '0 4px' }} />

          {/* File tabs */}
          <div className="flex items-end h-full overflow-hidden flex-1 min-w-0">
            {/* Active: main.py */}
            <div
              className="relative flex items-center gap-1.5 px-3 h-full text-[11px] font-medium flex-shrink-0"
              style={{
                color: 'rgba(255,255,255,0.78)',
                fontFamily: JB,
                borderRight: '0.5px solid rgba(255,255,255,0.07)',
                background: 'rgba(55,118,171,0.07)',
              }}
            >
              <span style={{ fontSize: 10 }}>🐍</span>
              main.py
              {/* Active underline */}
              <div className="absolute bottom-0 left-0 right-0 h-[1.5px]" style={{ background: '#3776AB' }} />
            </div>
            {/* Inactive: openai_service.py */}
            <div
              className="flex items-center gap-1.5 px-3 h-full text-[11px] flex-shrink-0"
              style={{
                color: 'rgba(255,255,255,0.28)',
                fontFamily: JB,
                borderRight: '0.5px solid rgba(255,255,255,0.06)',
              }}
            >
              <span style={{ fontSize: 10, opacity: 0.5 }}>🐍</span>
              openai_service.py
            </div>
          </div>

          {/* Window actions */}
          <div
            className="flex items-center gap-2.5 px-4 flex-shrink-0 text-[13px]"
            style={{ color: 'rgba(255,255,255,0.18)', fontFamily: 'monospace', letterSpacing: '-0.5px' }}
          >
            <span>─</span>
            <span>□</span>
            <span>✕</span>
          </div>
        </div>

        {/* ── Breadcrumb ── */}
        <div
          className="flex items-center gap-1.5 px-5 h-[28px] border-b text-[10px] select-none"
          style={{
            borderColor: 'rgba(255,255,255,0.05)',
            fontFamily: JB,
            color: 'rgba(255,255,255,0.22)',
            background: 'rgba(0,0,0,0.18)',
          }}
        >
          <span>src</span>
          <span style={{ color: 'rgba(255,255,255,0.12)' }}>›</span>
          <span>models</span>
          <span style={{ color: 'rgba(255,255,255,0.12)' }}>›</span>
          <span style={{ color: 'rgba(255,255,255,0.48)' }}>ai_agent.py</span>
        </div>

        {/* ── Content (Boot or Code) ── */}
        <div className="relative h-[278px] overflow-hidden">
          <AnimatePresence mode="wait">
            {phase === 'boot' ? (
              /* ── Boot terminal ── */
              <motion.div
                key="boot"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 px-5 py-4"
                style={{ fontFamily: JB, fontSize: 11 }}
              >
                {BOOT_STEPS.slice(0, bootStep).map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.22 }}
                    className="flex items-baseline gap-1 leading-[22px]"
                  >
                    <span style={{ color: 'rgba(255,255,255,0.22)' }}>{'>'}</span>
                    <span style={{ color: 'rgba(255,255,255,0.52)' }}>{s.msg}</span>
                    {s.ok && <span style={{ color: '#4ade80', fontWeight: 600 }}>{s.ok}</span>}
                  </motion.div>
                ))}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.85, repeat: Infinity }}
                  style={{
                    display: 'inline-block', marginTop: 4,
                    width: 7, height: 14, background: '#3776AB', verticalAlign: 'text-bottom',
                  }}
                />
              </motion.div>
            ) : (
              /* ── IDE Code view ── */
              <motion.div
                key="code"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0"
              >
                {/* Scanline overlay */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{
                    background: 'repeating-linear-gradient(180deg, transparent 0px, transparent 3px, rgba(0,0,0,0.045) 3px, rgba(0,0,0,0.045) 4px)',
                  }}
                />

                {/* Lines */}
                <div
                  className="px-4 py-3 h-full overflow-hidden select-none"
                  style={{ fontFamily: JB, fontSize: 11, lineHeight: '22px' }}
                >
                  {LINES.map((line, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.052, duration: 0.26 }}
                      className="flex"
                    >
                      {/* Line number */}
                      <span
                        className="w-5 mr-4 text-right flex-shrink-0"
                        style={{ color: 'rgba(255,255,255,0.11)' }}
                      >
                        {idx + 1}
                      </span>
                      {/* Code */}
                      <span style={{ paddingLeft: `${line.i * 14}px` }}>
                        {line.toks.map((tok, j) => (
                          <span key={j} style={ts(tok)}>{tok.t}</span>
                        ))}
                      </span>
                    </motion.div>
                  ))}

                  {/* Blinking cursor */}
                  <motion.div className="flex">
                    <span className="w-5 mr-4 flex-shrink-0" />
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      style={{
                        display: 'inline-block',
                        marginLeft: 14,
                        width: 6, height: 14,
                        background: '#3776AB',
                        verticalAlign: 'text-bottom',
                      }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ════ SVG connector (code → output) ════ */}
      <AnimatePresence>
        {phase === 'output' && (
          <motion.svg
            key="svg-connector"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 pointer-events-none"
            width="500" height="450"
            viewBox="0 0 500 450"
            style={{ overflow: 'visible' }}
          >
            {/* Glow halo */}
            <motion.path
              d="M 230 304 C 290 304, 330 315, 355 320"
              fill="none"
              stroke="rgba(55,118,171,0.22)"
              strokeWidth="7"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
            />
            {/* Main dashed line */}
            <motion.path
              d="M 230 304 C 290 304, 330 315, 355 320"
              fill="none"
              stroke="#3776AB"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="5 3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
            />
            {/* Origin dot */}
            <motion.circle
              cx="230" cy="304" r="3"
              fill="#3776AB"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.25 }}
            />
            {/* Endpoint dot */}
            <motion.circle
              cx="355" cy="320" r="3"
              fill="#3776AB"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.25 }}
            />
          </motion.svg>
        )}
      </AnimatePresence>

      {/* ════ Output card ════ */}
      <AnimatePresence>
        {phase === 'output' && (
          <motion.div
            key="output-card"
            initial={{ opacity: 0, scale: 0.88, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute w-[210px] rounded-xl overflow-hidden"
            style={{
              top: 310,
              right: 0,
              zIndex: 20,
              background: 'rgba(5,9,20,0.97)',
              border: '0.5px solid rgba(55,118,171,0.38)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.70), 0 0 0 0.5px rgba(55,118,171,0.10)',
            }}
          >
            {/* Card header */}
            <div
              className="flex items-center gap-2 px-3 py-2 border-b"
              style={{ borderColor: 'rgba(55,118,171,0.22)', background: 'rgba(55,118,171,0.07)' }}
            >
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.4, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: '#4ade80', boxShadow: '0 0 6px rgba(74,222,128,0.8)' }}
              />
              <span style={{ color: '#4ade80', fontSize: 10, fontFamily: JB, fontWeight: 600, letterSpacing: '0.05em' }}>
                OUTPUT
              </span>
              <span style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.15)', fontSize: 9, fontFamily: JB }}>
                gpt-4o
              </span>
            </div>

            {/* Typewriter output */}
            <div
              className="px-3 py-2.5 whitespace-pre-wrap"
              style={{
                fontFamily: JB,
                fontSize: 10,
                lineHeight: '18px',
                color: 'rgba(255,255,255,0.62)',
                minHeight: 82,
              }}
            >
              {outputText}
              {outputText.length < OUTPUT_TEXT.length && (
                <span
                  style={{
                    display: 'inline-block',
                    width: 5, height: 11,
                    background: '#4ade80',
                    verticalAlign: 'text-bottom',
                    marginLeft: 1,
                    animation: 'blink 0.8s step-end infinite',
                  }}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════ Python badge ════ */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.25, duration: 0.4 }}
        className="absolute -bottom-3 -left-4 flex items-center gap-2 px-3 py-2 rounded-xl backdrop-blur-sm"
        style={{
          border: '0.5px solid rgba(255,212,59,0.25)',
          background: 'rgba(255,212,59,0.08)',
          zIndex: 25,
        }}
      >
        <span className="text-base">🐍</span>
        <div>
          <p style={{ fontSize: 10, fontWeight: 600, color: '#FFD43B', fontFamily: JB }}>Python 3.12</p>
          <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.38)', fontFamily: JB }}>+ OpenAI SDK</p>
        </div>
      </motion.div>
    </motion.div>
  )
}
