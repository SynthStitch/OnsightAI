import { useEffect, useState } from 'react'

export const cn = (...c) => c.filter(Boolean).join(' ')

export function Glass({ raised, className, ...props }) {
  return <div className={cn(raised ? 'glass-raised' : 'glass', 'rounded-[1.75rem]', className)} {...props} />
}

export function Eyebrow({ children, className }) {
  return <p className={cn('font-mono text-xs uppercase tracking-[0.25em] text-slate-500', className)}>{children}</p>
}

export function Count({ children, muted }) {
  return (
    <span className={cn('rounded-md px-1.5 py-0.5 text-xs font-semibold ring-1 ring-white/70',
      muted ? 'bg-white/40 text-slate-400' : 'bg-slate-400/20 text-slate-700')}>
      {children}
    </span>
  )
}

export function Pill({ icon: Icon, children, className }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full bg-white/60 px-3 py-1 text-xs font-medium text-slate-600 ring-1 ring-white/80', className)}>
      {Icon && <Icon size={14} stroke={1.75} />}{children}
    </span>
  )
}

export function Toggle({ on, onChange }) {
  return (
    <button type="button" role="switch" aria-checked={on} onClick={() => onChange(!on)}
      className={cn('relative h-6 w-11 shrink-0 rounded-full ring-1 ring-white/70 transition',
        on ? 'bg-ink' : 'bg-slate-400/30')}>
      <span className={cn('absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all', on ? 'left-[22px]' : 'left-0.5')} />
    </button>
  )
}

export function Meter({ value, label, detail }) {
  return (
    <div>
      <div className="mb-1.5 flex justify-between text-sm"><span className="text-slate-600">{label}</span><span className="font-medium">{detail}</span></div>
      <div className="h-2 rounded-full bg-slate-400/20 ring-1 ring-white/60">
        <div className="h-full rounded-full bg-gradient-to-r from-slate-500 to-ink" style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

export function useNow() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t) }, [])
  return now
}

// Analog clock from reference 1
export function Clock({ size = 180 }) {
  const now = useNow()
  const s = now.getSeconds(), m = now.getMinutes() + s / 60, h = (now.getHours() % 12) + m / 60
  const hand = (deg, len, w, color) => (
    <line x1="50" y1="50" x2="50" y2={50 - len} stroke={color} strokeWidth={w} strokeLinecap="round" transform={`rotate(${deg} 50 50)`} />
  )
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-label={now.toLocaleTimeString()}>
      {Array.from({ length: 60 }, (_, i) => (
        <line key={i} x1="50" y1="6" x2="50" y2={i % 5 ? 7.5 : 10} stroke={i % 5 ? '#cbd5e1' : '#334155'}
          strokeWidth={i % 5 ? 0.5 : 0.8} transform={`rotate(${i * 6} 50 50)`} />
      ))}
      {hand(h * 30, 22, 2.2, '#111a2e')}
      {hand(m * 6, 34, 1.6, '#111a2e')}
      {hand(s * 6, 36, 0.5, '#93a5c4')}
      <circle cx="50" cy="50" r="3" fill="#111a2e" />
    </svg>
  )
}
