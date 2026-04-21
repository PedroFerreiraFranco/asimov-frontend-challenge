/**
 * Static SVG gradient mesh — zero animation, zero compositing cost.
 * SVG radialGradients are GPU-cheap vs CSS filter:blur on large divs.
 */
export default function GradientMesh() {
  return (
    <svg
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Blue — upper left */}
        <radialGradient id="g1" cx="15%" cy="12%" r="55%">
          <stop offset="0%" stopColor="#3776AB" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#3776AB" stopOpacity="0" />
        </radialGradient>

        {/* Yellow — upper right */}
        <radialGradient id="g2" cx="85%" cy="8%" r="45%">
          <stop offset="0%" stopColor="#FFD43B" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#FFD43B" stopOpacity="0" />
        </radialGradient>

        {/* Blue — mid left */}
        <radialGradient id="g3" cx="10%" cy="52%" r="50%">
          <stop offset="0%" stopColor="#3776AB" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#3776AB" stopOpacity="0" />
        </radialGradient>

        {/* Yellow — lower right */}
        <radialGradient id="g4" cx="88%" cy="72%" r="45%">
          <stop offset="0%" stopColor="#FFD43B" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#FFD43B" stopOpacity="0" />
        </radialGradient>

        {/* Blue — bottom center */}
        <radialGradient id="g5" cx="50%" cy="95%" r="40%">
          <stop offset="0%" stopColor="#3776AB" stopOpacity="0.13" />
          <stop offset="100%" stopColor="#3776AB" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="100%" height="100%" fill="url(#g1)" />
      <rect width="100%" height="100%" fill="url(#g2)" />
      <rect width="100%" height="100%" fill="url(#g3)" />
      <rect width="100%" height="100%" fill="url(#g4)" />
      <rect width="100%" height="100%" fill="url(#g5)" />
    </svg>
  )
}
