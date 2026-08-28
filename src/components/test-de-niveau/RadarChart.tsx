'use client'

import { motion } from 'framer-motion'

export interface RadarDatum {
  label: string
  value: number // 0-100
}

/**
 * Radar de compétences — aplats francs, contours noirs, zéro dégradé/flou
 * (voir docs/DESIGN_SYSTEM.md, direction "ligne claire").
 */
function wrapLabel(label: string): string[] {
  if (label.length <= 14) return [label]
  const words = label.split(' ')
  let a = '', b = ''
  for (const w of words) {
    if ((a + ' ' + w).trim().length <= label.length / 2 + 3 && !b) a = (a + ' ' + w).trim()
    else b = (b + ' ' + w).trim()
  }
  return b ? [a, b] : [a]
}

export function RadarChart({ data, size = 280 }: { data: RadarDatum[]; size?: number }) {
  const padding = 68
  const canvas = size + padding * 2
  const center = canvas / 2
  const maxRadius = size / 2 - 20
  const rings = [0.25, 0.5, 0.75, 1]
  const angleStep = (Math.PI * 2) / data.length

  const pointAt = (index: number, fraction: number) => {
    const angle = angleStep * index - Math.PI / 2
    return {
      x: center + Math.cos(angle) * maxRadius * fraction,
      y: center + Math.sin(angle) * maxRadius * fraction,
    }
  }

  const polygonPoints = data
    .map((d, i) => {
      const p = pointAt(i, Math.max(0.06, d.value / 100))
      return `${p.x},${p.y}`
    })
    .join(' ')

  return (
    <svg viewBox={`0 0 ${canvas} ${canvas}`} width={canvas} height={canvas} role="img" aria-label="Radar de compétences">
      {rings.map((r) => (
        <circle key={r} cx={center} cy={center} r={maxRadius * r} fill="none" stroke="#1F1A14" strokeOpacity={0.15} strokeWidth={1.5} />
      ))}

      {data.map((_, i) => {
        const p = pointAt(i, 1)
        return <line key={i} x1={center} y1={center} x2={p.x} y2={p.y} stroke="#1F1A14" strokeOpacity={0.15} strokeWidth={1.5} />
      })}

      <motion.polygon
        points={polygonPoints}
        fill="#2B5E44"
        fillOpacity={0.85}
        stroke="#1F1A14"
        strokeWidth={3}
        strokeLinejoin="round"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 90, damping: 14, delay: 0.1 }}
        style={{ transformOrigin: `${center}px ${center}px` }}
      />

      {data.map((d, i) => {
        const p = pointAt(i, 1.32)
        const lines = wrapLabel(d.label)
        return (
          <text key={d.label} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle" className="fill-ink font-body text-[10px] font-semibold">
            {lines.map((line, li) => (
              <tspan key={li} x={p.x} dy={li === 0 ? -(lines.length - 1) * 6 : 12}>
                {line}
              </tspan>
            ))}
          </text>
        )
      })}
    </svg>
  )
}
