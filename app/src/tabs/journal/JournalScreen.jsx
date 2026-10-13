import React, { useState } from 'react'
import { RUBRICS, TIMELINE } from './data.jsx'
import { useBloodAdvice } from './advice.js'
import AdvicePage from './AdvicePage.jsx'

const noop = () => {}
const rubrics = RUBRICS.map((r) => ({ ...r, onClick: noop }))
const timeline = TIMELINE

export default function JournalScreen() {
  const [page, setPage] = useState(null)
  const { advice, uploadReport, resetReport } = useBloodAdvice()
  if (page === 'advice') return <AdvicePage advice={advice} onUpload={uploadReport} onReset={resetReport} onBack={() => setPage(null)} />

  return (
    <>
      <div style={{ padding: '0 22px 6px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '10px' }}>
        <span style={{ fontSize: '24px', fontWeight: '800', letterSpacing: '-.4px', color: '#15160f' }}>
          Journal
        </span>
        <span style={{ fontSize: '12px', fontWeight: '700', color: '#6d7069' }}>
          Your full history
        </span>
      </div>
      <div className="journal-advice-card" role="button" onClick={() => setPage('advice')} style={{ margin: '0 18px 16px', background: '#0f3b2b', borderRadius: '26px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', cursor: 'pointer' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '30px', height: '30px', flex: 'none', borderRadius: '10px', background: 'rgba(255,255,255,.14)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* blood drop */}
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#7de3b4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3c3.5 4.2 6 7.4 6 10.5a6 6 0 0 1-12 0C6 10.4 8.5 7.2 12 3Z" />
            </svg>
          </div>
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '1px', minWidth: 0 }}>
            <span style={{ fontSize: '15px', fontWeight: '800', color: '#fff' }}>
              Blood test advice
            </span>
            <span style={{ fontSize: '11.5px', fontWeight: '600', color: '#cfe5da', opacity: 0.8 }}>
              Based on your blood analysis · <span style={{ whiteSpace: 'nowrap' }}>{advice.source.date}</span>
            </span>
          </div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7de3b4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none' }}>
            <path d="M9 5l7 7-7 7" />
          </svg>
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {advice.markers.map((m) => {
            const off = m.status !== 'normal'
            return (
              <span key={m.name} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11.5px', fontWeight: '700', color: off ? '#fff' : '#cfe5da', background: off ? 'rgba(245,158,11,.22)' : 'rgba(255,255,255,.08)', border: `1px solid ${off ? 'rgba(245,158,11,.6)' : 'transparent'}`, padding: '4px 9px', borderRadius: '10px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: off ? '#f59e0b' : '#7de3b4' }} />
                {m.name}{off ? ` · ${m.status}` : ''}
              </span>
            )
          })}
        </div>
        <p style={{ margin: '0', fontSize: '13.5px', lineHeight: '1.55', color: '#cfe5da', textWrap: 'pretty' }}>
          Nutrition and exercise tips picked from your blood results.
        </p>
      </div>
      <div style={{ margin: '0 18px 16px', background: '#fff', borderRadius: '26px', boxShadow: '0 2px 10px rgba(20,22,16,.05)', padding: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '10px', marginBottom: '8px' }}>
          <span style={{ fontSize: '15px', fontWeight: '800', color: '#15160f' }}>
            Timeline
          </span>
          <span style={{ fontSize: '11.5px', fontWeight: '700', color: '#8b8e86' }}>
            2019 — 2026
          </span>
        </div>
        {timeline.map((t, i5) => (<React.Fragment key={i5}>
          <div style={{ display: 'grid', gridTemplateColumns: '18px 1fr', gap: '12px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: t.dot, border: '2px solid #fff', boxShadow: `0 0 0 2px ${t.ring}`, marginTop: '4px' }}>
              </span>
              <span style={{ flex: '1', width: '2px', background: '#eceee9', margin: '4px 0 0' }}>
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', paddingBottom: '18px' }}>
              <span style={{ fontSize: '11.5px', fontWeight: '700', color: '#8b8e86', letterSpacing: '.2px' }}>
                {t.date}
              </span>
              <span style={{ fontSize: '14px', fontWeight: '700', color: '#15160f' }}>
                {t.title}
              </span>
              <span style={{ fontSize: '12.5px', lineHeight: '1.5', color: '#6d7069' }}>
                {t.meta}
              </span>
            </div>
          </div>
        </React.Fragment>))}
      </div>
      <div style={{ margin: '0 18px 22px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {rubrics.map((r, i5) => (<React.Fragment key={i5}>
          <div className="journal-h9" role="button" onClick={r.onClick} style={{ background: '#fff', borderRadius: '20px', boxShadow: '0 2px 10px rgba(20,22,16,.05)', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px', cursor: 'pointer' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '11px', background: '#e8f7f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {r.icon}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <span style={{ fontSize: '14px', fontWeight: '800', color: '#15160f' }}>
                {r.label}
              </span>
              <span style={{ fontSize: '11.5px', fontWeight: '600', color: '#8b8e86' }}>
                {r.meta}
              </span>
            </div>
          </div>
        </React.Fragment>))}
      </div>
    </>
  )
}
