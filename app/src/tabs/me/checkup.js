// Check-up scheduling: how overdue each organ's last visit is.

export const STATUS = {
  green:  { key: 'green',  label: 'Up to date', color: '#10b981', bg: '#e8f7f0', fg: '#026b48' },
  amber:  { key: 'amber',  label: 'Due soon',   color: '#f59e0b', bg: '#fdf3e0', fg: '#7a5a18' },
  orange: { key: 'orange', label: 'Due now',    color: '#f97316', bg: '#fdeee4', fg: '#8a3d10' },
  black:  { key: 'black',  label: 'OVERDUE',    color: '#1f2024', bg: '#e8e9e6', fg: '#1f2024' },
}

// The mock data is dated around this day; the demo reads the same either way.
// ponytail: fixed "today", swap for new Date() once the data is real.
export const TODAY = new Date(2026, 8, 18)
export const DAY = 86400000
const MONTH = DAY * 30.44

export const iso = (d) =>
  d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0')

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
export const fmt = (d) => `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`

export const addMonths = (d, m) => {
  const n = new Date(d.getTime())
  n.setMonth(n.getMonth() + m)
  return n
}

export const monthsBetween = (from, to) => (to - from) / MONTH

export function statusOf(organ) {
  const m = monthsBetween(new Date(organ.last), TODAY)
  if (m > organ.freq) return STATUS.black
  if (m >= organ.freq - 1) return STATUS.orange
  if (m >= organ.freq * 0.5) return STATUS.amber
  return STATUS.green
}

// "Due in 3 weeks" / "Overdue by 8 months" for the selected organ.
export function dueLabels(organ, status) {
  const last = new Date(organ.last)
  const next = addMonths(last, organ.freq)
  const days = Math.round((next - TODAY) / DAY)

  if (days < 0) {
    const n = Math.abs(Math.round(days / 30.44))
    return { next, days, dueLabel: `Overdue by ${n} months`, badgeText: 'OVERDUE' }
  }
  if (days === 0) return { next, days, dueLabel: 'Due today', badgeText: 'Due today' }
  if (days <= 31) {
    const w = days <= 14 ? `${days} days` : `${Math.round(days / 7)} weeks`
    return { next, days, dueLabel: `Due in ${w}`, badgeText: `Due in ${w}` }
  }
  return { next, days, dueLabel: `In ${Math.round(days / 30.44)} months`, badgeText: status.label }
}
