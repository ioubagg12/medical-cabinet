import React from 'react'

import { ACTIONS, TILES } from './data.jsx'

const noop = () => {}
const actions = ACTIONS.map((a) => ({ ...a, onClick: noop }))
const tiles = TILES

export default function DoctorScreen({ noticeOpen, closeNotice }) {
  return (
    <>
      {noticeOpen ? (<>
        <div style={{ margin: '0 18px 22px', background: '#fff', borderRadius: '22px', padding: '20px 20px 16px', boxShadow: '0 2px 10px rgba(20,22,16,.05)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '16.5px', fontWeight: '800', color: '#15160f', maxWidth: '230px', lineHeight: '1.25' }}>
              Watch out for fake messages
            </span>
            <div className="doctor-h11" role="button" onClick={closeNotice} style={{ width: '26px', height: '26px', margin: '-4px -4px 0 0', flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', cursor: 'pointer', color: '#8b8e86' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                <path d="M5 5l14 14M19 5L5 19" />
              </svg>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <p style={{ margin: '0', fontSize: '13.5px', lineHeight: '1.5', color: '#5d6058', flex: '1', textWrap: 'pretty' }}>
              Fraudulent texts and emails are circulating that claim to come from your clinic. We never ask for card details or logins.
            </p>
            <div style={{ width: '82px', height: '72px', flex: 'none', borderRadius: '12px', background: 'repeating-linear-gradient(135deg,#eef0ec 0 6px,#e3e6e0 6px 12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
              <span style={{ font: '500 7.5px/1.3 ui-monospace,Menlo,monospace', color: '#8b8e86' }}>
                SPOOFED
                <br />
                SMS ART
              </span>
            </div>
          </div>
          <span style={{ fontSize: '11.5px', fontWeight: '600', color: '#9a9d94', letterSpacing: '.2px' }}>
            12 MAY 2026
          </span>
        </div>
      </>) : null}
      <div style={{ padding: '0 22px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '.9px', textTransform: 'uppercase', color: '#8b8e86' }}>
          Contact
        </span>
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#15160f' }}>
          </span>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#cfd2ca' }}>
          </span>
        </div>
      </div>
      <div style={{ margin: '0 18px 26px', background: '#fff', borderRadius: '24px', boxShadow: '0 2px 10px rgba(20,22,16,.05)', overflow: 'hidden' }}>
        <div style={{ padding: '20px 22px 16px', borderBottom: '1px solid #f0f1ee' }}>
          <span style={{ fontSize: '19px', fontWeight: '800', color: '#15160f' }}>
            My doctor
          </span>
        </div>
        <div className="doctor-h12" role="button" style={{ padding: '18px 22px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '3px', fontSize: '15px', color: '#43463f', lineHeight: '1.45' }}>
            <span style={{ fontWeight: '700', color: '#15160f' }}>
              Kongevejsparkens Lægehus
            </span>
            <span>
              Ringgade 175
            </span>
            <span>
              6400 Sønderborg
            </span>
          </div>
          <svg width="9" height="16" viewBox="0 0 10 18" fill="none" stroke="#9a9d94" strokeWidth="2.2" strokeLinecap="round">
            <path d="M1.5 1.5L8 9l-6.5 7.5" />
          </svg>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '6px', padding: '4px 14px 24px' }}>
          {actions.map((a, i6) => (<React.Fragment key={i6}>
            <div role="button" onClick={a.onClick} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '9px', cursor: 'pointer', padding: '6px 0' }}>
              <div className="doctor-h13" style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#00b070', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 14px rgba(0,176,112,.3)' }}>
                {a.icon}
              </div>
              <span style={{ fontSize: '11.5px', fontWeight: '600', color: '#5d6058', textAlign: 'center', lineHeight: '1.25' }}>
                {a.label}
              </span>
            </div>
          </React.Fragment>))}
        </div>
      </div>
      <div style={{ padding: '0 22px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '.9px', textTransform: 'uppercase', color: '#8b8e86' }}>
          More functions
        </span>
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#15160f' }}>
          </span>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#cfd2ca' }}>
          </span>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#cfd2ca' }}>
          </span>
        </div>
      </div>
      <div className="sc" style={{ display: 'flex', gap: '12px', overflowX: 'auto', scrollbarWidth: 'none', padding: '0 18px 4px' }}>
        {tiles.map((t, i5) => (<React.Fragment key={i5}>
          <div className="doctor-h14" role="button" style={{ flex: 'none', width: '132px', background: '#fff', borderRadius: '20px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '22px', boxShadow: '0 2px 10px rgba(20,22,16,.05)', cursor: 'pointer' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '11px', background: '#e8f7f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {t.icon}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <span style={{ fontSize: '14px', fontWeight: '700', color: '#15160f' }}>
                {t.label}
              </span>
              <span style={{ fontSize: '11.5px', color: '#8b8e86' }}>
                {t.meta}
              </span>
            </div>
          </div>
        </React.Fragment>))}
      </div>
    </>
  )
}
