import { motion } from 'framer-motion'

export function ProgressBar({ value }: { value: number }) {
  const pct = Math.round(Math.min(1, Math.max(0, value)) * 100)
  return (
    <div
      className="h-2.5 w-full overflow-hidden border-2 border-ink bg-cream"
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        className="h-full bg-forest"
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
      />
    </div>
  )
}
