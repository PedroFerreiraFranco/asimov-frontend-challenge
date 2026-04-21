import GradientMesh from './GradientMesh'

export default function PageCanvas({ children }) {
  return (
    <div className="relative min-h-screen bg-[#050505]">
      {/* Animated gradient mesh — primary light source */}
      <GradientMesh />

      {/* Noise texture */}
      <div className="noise-overlay fixed inset-0 z-[1]" />

      {/* Page content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
