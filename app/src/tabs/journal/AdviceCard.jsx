// Advice card on the Journal tab: blood markers from the latest test, then
// nutrition or exercise tips based on them. Owned by: Journal epic.
// Presentational only: `advice` comes from advice.js (see the shape there).
import { useState } from 'react'

const INK = '#0f3b2b'
const MINT = '#7de3b4'
const SOFT = '#cfe5da'

const MARKER_STATUS = {
  low: { label: 'Low', dot: '#f5b94a' },
  normal: { label: 'Normal', dot: MINT },
  high: { label: 'High', dot: '#ff8a6b' },
}

const KINDS = [
  { key: 'nutrition', label: 'Nutrition' },
  { key: 'exercise', label: 'Exercise' },
]

const icon = (paths) => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={MINT} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {paths.map((d) => <path key={d} d={d} />)}
  </svg>
)

const KIND_ICON = {
  // leaf
  nutrition: icon(['M5 19c0-8 5-13 14-14-1 9-6 14-14 14Z', 'M5 19l7-7']),
  // running figure
  exercise: icon(['M13 4.5a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0', 'M8 21l3-6 3 2v4', 'M6 12l3-4 4 1 2 3 3 1', 'M11 15l1-6']),
}

export default function AdviceCard({ advice, openCompose }) {
  const [kind, setKind] = useState('nutrition')
  const { source, markers, recommendations } = advice
  const flagged = markers.filter((m) => m.status !== 'normal')
  const tips = recommendations.filter((r) => r.kind === kind)

  return (
    <div style={{ margin: '0 18px 16px', background: INK, borderRadius: '26px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '30px', height: '30px', flex: 'none', borderRadius: '10px', background: 'rgba(255,255,255,.14)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={MINT} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3a6 6 0 0 0-3.5 10.9V17h7v-3.1A6 6 0 0 0 12 3Z" />
            <path d="M10 20h4" />
          </svg>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', minWidth: 0 }}>
          <span style={{ fontSize: '15px', fontWeight: '800', color: '#fff' }}>
            Advice
          </span>
          <span style={{ fontSize: '11.5px', fontWeight: '600', color: SOFT, opacity: 0.8 }}>
            Based on your {source.test.toLowerCase()} · {source.date}
          </span>
        </div>
      </div>

      <p style={{ margin: '0', fontSize: '13.5px', lineHeight: '1.55', color: SOFT, textWrap: 'pretty' }}>
        {flagged.length
          ? `${flagged.map((m) => m.name).join(', ')} ${flagged.length === 1 ? 'needs' : 'need'} attention. Everything else is in the normal range.`
          : 'All your values are in the normal range. Keep it up.'}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        {markers.map((m) => {
          const st = MARKER_STATUS[m.status]
          const off = m.status !== 'normal'
          return (
            <div key={m.name} style={{ background: off ? 'rgba(245,185,74,.14)' : 'rgba(255,255,255,.07)', border: `1px solid ${off ? 'rgba(245,185,74,.45)' : 'transparent'}`, borderRadius: '14px', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                <span style={{ fontSize: '11.5px', fontWeight: '700', color: SOFT }}>
                  {m.name}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10.5px', fontWeight: '800', color: st.dot }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: st.dot }} />
                  {st.label}
                </span>
              </div>
              <span style={{ fontSize: '15px', fontWeight: '800', color: '#fff' }}>
                {m.value} <span style={{ fontSize: '11px', fontWeight: '600', color: SOFT }}>{m.unit}</span>
              </span>
              <span style={{ fontSize: '10.5px', fontWeight: '600', color: SOFT, opacity: 0.7 }}>
                Normal {m.range}
              </span>
            </div>
          )
        })}
      </div>

      <div role="tablist" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', background: 'rgba(255,255,255,.08)', borderRadius: '14px', padding: '4px' }}>
        {KINDS.map((k) => {
          const on = kind === k.key
          return (
            <div key={k.key} role="tab" aria-selected={on} className={on ? undefined : 'journal-advice-tab'} onClick={() => setKind(k.key)} style={{ textAlign: 'center', fontSize: '12.5px', fontWeight: '800', padding: '8px 0', borderRadius: '10px', cursor: 'pointer', background: on ? MINT : 'transparent', color: on ? INK : SOFT }}>
              {k.label}
            </div>
          )
        })}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {tips.map((t) => (
          <div key={t.title} style={{ display: 'grid', gridTemplateColumns: '34px 1fr', gap: '12px', background: 'rgba(255,255,255,.07)', borderRadius: '16px', padding: '12px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '11px', background: 'rgba(125,227,180,.16)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {KIND_ICON[t.kind]}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: 0 }}>
              <span style={{ fontSize: '13.5px', fontWeight: '800', color: '#fff' }}>
                {t.title}
              </span>
              <span style={{ fontSize: '12.5px', lineHeight: '1.45', color: SOFT }}>
                {t.detail}
              </span>
              {t.marker ? (
                <span style={{ alignSelf: 'flex-start', marginTop: '3px', fontSize: '10.5px', fontWeight: '700', color: MINT, background: 'rgba(125,227,180,.12)', padding: '3px 8px', borderRadius: '8px' }}>
                  For {t.marker}
                </span>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
        <span style={{ fontSize: '11px', lineHeight: '1.4', color: SOFT, opacity: 0.7 }}>
          General guidance, not a diagnosis. Reviewed by {source.reviewedBy}.
        </span>
        <div className="journal-h8" role="button" onClick={openCompose} style={{ flex: 'none', fontSize: '12.5px', fontWeight: '700', color: INK, background: MINT, padding: '9px 15px', borderRadius: '20px', cursor: 'pointer' }}>
          Ask a question
        </div>
      </div>
    </div>
  )
}
