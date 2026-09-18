import React from 'react'

export default function Profile({ facts, flags, settings }) {
  return (
    <>
      <div style={{ padding: '0 22px 6px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '10px' }}>
        <span style={{ fontSize: '24px', fontWeight: '800', letterSpacing: '-.4px', color: '#15160f' }}>
          Profile
        </span>
        <span style={{ fontSize: '12px', fontWeight: '700', color: '#6d7069' }}>
          CPR 140391-1842
        </span>
      </div>
      <div style={{ margin: '0 18px 16px', background: '#fff', borderRadius: '26px', boxShadow: '0 2px 10px rgba(20,22,16,.05)', padding: '20px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '62px', height: '62px', flex: 'none', borderRadius: '50%', background: '#e8f7f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '21px', fontWeight: '800', color: '#026b48' }}>
            GC
          </div>
          <div style={{ flex: '1', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <span style={{ fontSize: '18px', fontWeight: '800', color: '#15160f' }}>
              Gabriel Creanga
            </span>
            <span style={{ fontSize: '12.5px', color: '#6d7069' }}>
              Kongevejsparkens Lægehus · Sønderborg
            </span>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {facts.map((f, i6) => (<React.Fragment key={i6}>
            <div style={{ background: '#f6f7f4', borderRadius: '16px', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#8b8e86', letterSpacing: '.2px' }}>
                {f.label}
              </span>
              <span style={{ fontSize: '14px', fontWeight: '700', color: '#15160f' }}>
                {f.value}
              </span>
            </div>
          </React.Fragment>))}
        </div>
      </div>
      <div style={{ margin: '0 18px 16px', background: '#fff', borderRadius: '26px', boxShadow: '0 2px 10px rgba(20,22,16,.05)', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <span style={{ fontSize: '15px', fontWeight: '800', color: '#15160f' }}>
          Important to know
        </span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {flags.map((fl, i6) => (<React.Fragment key={i6}>
            <span style={{ fontSize: '12px', fontWeight: '700', padding: '7px 13px', borderRadius: '20px', background: fl.bg, color: fl.tone }}>
              {fl.label}
            </span>
          </React.Fragment>))}
        </div>
      </div>
      <div style={{ margin: '0 18px 22px', background: '#fff', borderRadius: '26px', boxShadow: '0 2px 10px rgba(20,22,16,.05)', overflow: 'hidden' }}>
        {settings.map((s, i5) => (<React.Fragment key={i5}>
          <div className="mc-h10" role="button" onClick={s.onClick} style={{ padding: '15px 20px', display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid #f0f1ee', cursor: 'pointer' }}>
            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: '14px', fontWeight: '700', color: '#15160f' }}>
                {s.label}
              </span>
              <span style={{ fontSize: '12px', color: '#8b8e86' }}>
                {s.meta}
              </span>
            </div>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#b6bab1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </React.Fragment>))}
      </div>
    </>
  )
}
