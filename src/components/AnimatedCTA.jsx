import { Sparkles } from 'lucide-react'

const AnimatedCTA = ({ onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all hover:shadow-[0_20px_40px_rgba(37,99,235,0.15)] hover:-translate-y-1 active:translate-y-0 ${className}`}
      style={{ minWidth: '200px', height: '56px' }}
    >
      <div className="relative z-10 flex items-center justify-center gap-3 px-8 h-full">
        <div className="flex items-center gap-3">
          View Designs
          <Sparkles size={16} className="text-blue-400 group-hover:rotate-12 transition-transform" />
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-0" />
    </button>
  )
}

export default AnimatedCTA