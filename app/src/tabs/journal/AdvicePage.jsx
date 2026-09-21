// Blood test advice: a sub-page of the Journal tab, opened by tapping the
// advice card. Everything on it comes from the latest blood analysis: the
// markers, then nutrition or exercise tips based on them. Owned by: Journal epic.
// Presentational only: `advice` comes from advice.js (see the shape there).
import { useState } from 'react'

const INK = '#0f3b2b'
const MINT = '#7de3b4'
const GREEN = '#00b070'

const MARKER_STATUS = {
  low: { label: 'Low', dot: '#f59e0b', fg: '#7a5a18', bg: '#fdf3e0' },
  normal: { label: 'Normal', dot: '#10b981', fg: '#026b48', bg: '#e8f7f0' },
  high: { label: 'High', dot: '#f97316', fg: '#8a3d10', bg: '#fdeee4' },
}

const KINDS = [
  { key: 'nutrition', label: 'Nutrition' },
  { key: 'exercise', label: 'Exercise' },
]

const icon = (paths) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {paths.map((d) => <path key={d} d={d} />)}
  </svg>
)

const KIND_ICON = {
  // leaf
  nutrition: icon(['M5 19c0-8 5-13 14-14-1 9-6 14-14 14Z', 'M5 19l7-7']),
  // running figure
  exercise: icon(['M13 4.5a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0', 'M8 21l3-6 3 2v4', 'M6 12l3-4 4 1 2 3 3 1', 'M11 15l1-6']),
}

const card = { background: '#fff', borderRadius: '22px', boxShadow: '0 2px 10px rgba(20,22,16,.05)' }
const sectionTitle = { fontSize: '15px', fontWeight: '800', color: '#15160f' }

export default function AdvicePage({ advice, onBack }) {
  const [kind, setKind] = useState('nutrition')
  const { source, markers, recommendations } = advice
  const flagged = markers.filter((m) => m.status !== 'normal')
  const tips = recommendations.filter((r) => r.kind === kind)

  return (
    <>
      <div style={{ padding: '0 22px 14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div className="journal-back" role="button" onClick={onBack} style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: '700', color: '#6d7069', padding: '6px 12px 6px 6px', margin: '0 0 0 -6px', borderRadius: '20px', cursor: 'pointer' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 5l-7 7 7 7" />
          </svg>
          Journal
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '10px' }}>
          <span style={{ fontSize: '24px', fontWeight: '800', letterSpacing: '-.4px', color: '#15160f' }}>
            Blood test advice
          </span>
          <span style={{ fontSize: '12px', fontWeight: '700', color: '#6d7069', whiteSpace: 'nowrap' }}>
            {source.date}
          </span>
        </div>
      </div>

      <div style={{ margin: '0 18px 16px', background: INK, borderRadius: '26px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '30px', height: '30px', flex: 'none', borderRadius: '10px', background: 'rgba(255,255,255,.14)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={MINT} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3a6 6 0 0 0-3.5 10.9V17h7v-3.1A6 6 0 0 0 12 3Z" />
              <path d="M10 20h4" />
            </svg>
          </div>
          <span style={{ fontSize: '15px', fontWeight: '800', color: '#fff' }}>
            {flagged.length ? `${flagged.length} of ${markers.length} values need attention` : 'All values in range'}
          </span>
        </div>
        <p style={{ margin: '0', fontSize: '13.5px', lineHeight: '1.55', color: '#cfe5da', textWrap: 'pretty' }}>
          {flagged.length
            ? `${flagged.map((m) => m.name).join(', ')} ${flagged.length === 1 ? 'is' : 'are'} outside the normal range. The tips below are picked to help bring ${flagged.length === 1 ? 'it' : 'them'} back up.`
            : 'Everything from your latest blood test is in the normal range. Keep your current habits.'}
        </p>
      </div>

      <div style={{ margin: '0 18px 16px', ...card, padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span style={sectionTitle}>
            Your blood results
          </span>
          <span style={{ fontSize: '11.5px', fontWeight: '700', color: '#8b8e86' }}>
            Reviewed by {source.reviewedBy}
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {markers.map((m) => {
            const st = MARKER_STATUS[m.status]
            const off = m.status !== 'normal'
            return (
              <div key={m.name} style={{ background: off ? st.bg : '#fafbf9', border: `1px solid ${off ? st.dot : '#eceee9'}`, borderRadius: '14px', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                  <span style={{ fontSize: '11.5px', fontWeight: '700', color: '#6d7069' }}>
                    {m.name}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10.5px', fontWeight: '800', color: st.fg }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: st.dot }} />
                    {st.label}
                  </span>
                </div>
                <span style={{ fontSize: '16px', fontWeight: '800', color: '#15160f' }}>
                  {m.value} <span style={{ fontSize: '11px', fontWeight: '600', color: '#6d7069' }}>{m.unit}</span>
                </span>
                <span style={{ fontSize: '10.5px', fontWeight: '600', color: '#8b8e86' }}>
                  Normal {m.range}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      <div style={{ margin: '0 18px 12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <span style={{ ...sectionTitle, padding: '0 4px' }}>
          Recommendations
        </span>
        <div role="tablist" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', background: '#e6e7e3', borderRadius: '14px', padding: '4px' }}>
          {KINDS.map((k) => {
            const on = kind === k.key
            return (
              <div key={k.key} role="tab" aria-selected={on} className={on ? undefined : 'journal-advice-tab'} onClick={() => setKind(k.key)} style={{ textAlign: 'center', fontSize: '13px', fontWeight: '800', padding: '9px 0', borderRadius: '10px', cursor: 'pointer', background: on ? '#fff' : 'transparent', color: on ? '#15160f' : '#6d7069', boxShadow: on ? '0 1px 4px rgba(20,22,16,.1)' : 'none' }}>
                {k.label}
              </div>
            )
          })}
        </div>
        {tips.map((t) => (
          <div key={t.title} style={{ ...card, display: 'grid', gridTemplateColumns: '36px 1fr', gap: '12px', padding: '14px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: '#e8f7f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {KIND_ICON[t.kind]}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: 0 }}>
              <span style={{ fontSize: '14px', fontWeight: '800', color: '#15160f' }}>
                {t.title}
              </span>
              <span style={{ fontSize: '12.5px', lineHeight: '1.5', color: '#6d7069' }}>
                {t.detail}
              </span>
              {t.marker ? (
                <span style={{ alignSelf: 'flex-start', marginTop: '4px', fontSize: '10.5px', fontWeight: '700', color: '#026b48', background: '#e8f7f0', padding: '3px 8px', borderRadius: '8px' }}>
                  For {t.marker}
                </span>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      <p style={{ margin: '0 22px 22px', fontSize: '11.5px', lineHeight: '1.45', color: '#8b8e86' }}>
        This advice is generated only from your blood analysis. It is general guidance, not a diagnosis. Talk to your doctor before big changes.
      </p>
    </>
  )
}
