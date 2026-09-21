import React, { useState } from 'react'

import { RUBRICS, TIMELINE } from './data.jsx'
import { ADVICE } from './advice.js'
import AdvicePage from './AdvicePage.jsx'

const noop = () => {}
const rubrics = RUBRICS.map((r) => ({ ...r, onClick: noop }))
const timeline = TIMELINE

// openCompose comes from the Messages tab (the "write to clinic" button).
export default function JournalScreen({ openCompose }) {
  // Sub-page of this tab: 'advice' shows AdvicePage instead of the journal.
  const [page, setPage] = useState(null)
  if (page === 'advice') return <AdvicePage advice={ADVICE} onBack={() => setPage(null)} openCompose={openCompose} />

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
      <div style={{ margin: '0 18px 16px', background: '#0f3b2b', borderRadius: '26px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '30px', height: '30px', borderRadius: '10px', background: 'rgba(255,255,255,.14)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#7de3b4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3a6 6 0 0 0-3.5 10.9V17h7v-3.1A6 6 0 0 0 12 3Z" />
              <path d="M10 20h4" />
            </svg>
          </div>
          <span style={{ fontSize: '15px', fontWeight: '800', color: '#fff' }}>
            Advice
          </span>
        </div>
        <p style={{ margin: '0', fontSize: '13.5px', lineHeight: '1.55', color: '#cfe5da', textWrap: 'pretty' }}>
          Your vitamin D was slightly low in May. Keep the daily 38 µg supplement through the winter and book a repeat blood test in November.
        </p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <div className="journal-h8" role="button" onClick={openCompose} style={{ fontSize: '12.5px', fontWeight: '700', color: '#0f3b2b', background: '#7de3b4', padding: '9px 15px', borderRadius: '20px', cursor: 'pointer' }}>
            Ask a question
          </div>
          <div className="journal-advice-open" role="button" onClick={() => setPage('advice')} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12.5px', fontWeight: '700', color: '#7de3b4', border: '1.5px solid rgba(125,227,180,.5)', padding: '7.5px 12px 7.5px 15px', borderRadius: '20px', cursor: 'pointer' }}>
            See full advice
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
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
