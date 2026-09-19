import React from 'react'
import { useAppState } from './useAppState'
import Messages from './screens/Messages'
import Me from './screens/Me'
import Journal from './screens/Journal'
import Profile from './screens/Profile'
import Doctor from './screens/Doctor'
import MessageView from './overlays/MessageView'
import Compose from './overlays/Compose'
import Toast from './overlays/Toast'

export default function App() {
  const v = useAppState()
  const {
    greeting, nav,
    isMe, isDoctor, isMessages, isJournal, isProfile,
    openCompose, openMsg, composeOpen, sentToast,
  } = v

  return (
    <div className="mc-root" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '28px 16px' }}>
      <div className="mc-phone" style={{ width: '390px', height: '844px', background: '#f2f2f0', borderRadius: '44px', boxShadow: '0 30px 80px rgba(0,0,0,.45)', overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column' }}>
        <div className="mc-status" style={{ height: '52px', flex: 'none', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 26px 6px', fontSize: '13px', fontWeight: '700', color: '#1b1c19' }}>
          <span>
            9:41
          </span>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <span style={{ width: '16px', height: '9px', border: '1.5px solid #1b1c19', borderRadius: '2px', display: 'block' }}>
            </span>
            <span style={{ width: '18px', height: '9px', border: '1.5px solid #1b1c19', borderRadius: '2.5px', display: 'block', position: 'relative' }}>
              <span style={{ position: 'absolute', inset: '1.5px', right: '5px', background: '#1b1c19', borderRadius: '1px', display: 'block' }}>
              </span>
            </span>
          </div>
        </div>
        <div className="sc" style={{ flex: '1', overflowY: 'auto', scrollbarWidth: 'none', padding: '8px 0 16px' }}>
          <div style={{ padding: '6px 22px 18px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#6d7069' }}>
                {greeting}
              </span>
              <span style={{ fontSize: '27px', fontWeight: '800', letterSpacing: '-.5px', color: '#15160f' }}>
                John Doe
              </span>
            </div>
            {isDoctor ? (<>
              <div className="mc-h0" role="button" style={{ width: '46px', height: '46px', flex: 'none', borderRadius: '50%', background: '#00b070', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', boxShadow: '0 6px 16px rgba(0,176,112,.35)', cursor: 'pointer' }}>
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 15V10a6 6 0 1 0-12 0v5l-1.5 2.5h15L18 15Z" />
                  <path d="M10 20h4" />
                </svg>
                <span style={{ position: 'absolute', top: '2px', right: '2px', width: '11px', height: '11px', borderRadius: '50%', background: '#ff5a3c', border: '2px solid #f2f2f0' }}>
                </span>
              </div>
            </>) : null}
            {isMessages ? (<>
              <div className="mc-h1" role="button" onClick={openCompose} style={{ width: '46px', height: '46px', flex: 'none', borderRadius: '50%', background: '#00b070', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 16px rgba(0,176,112,.35)', cursor: 'pointer' }}>
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 3L3 10.5l7 2.5 2.5 7L21 3Z" />
                  <path d="M10 13L21 3" />
                </svg>
              </div>
            </>) : null}
          </div>
          {isMessages ? <Messages {...v} /> : null}
          {isMe ? <Me {...v} /> : null}
          {isJournal ? <Journal {...v} /> : null}
          {isProfile ? <Profile {...v} /> : null}
          {isDoctor ? <Doctor {...v} /> : null}
        </div>
        {openMsg ? <MessageView {...v} /> : null}
        {composeOpen ? <Compose {...v} /> : null}
        {sentToast ? <Toast {...v} /> : null}
        <div style={{ flex: 'none', background: '#fff', borderTop: '1px solid #eceee9', padding: '10px 6px 8px', display: 'grid', gridTemplateColumns: 'repeat(5,1fr)' }}>
          {nav.map((n, i3) => (<React.Fragment key={i3}>
            <div role="button" onClick={n.onClick} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', cursor: 'pointer', padding: '4px 0' }}>
              <div style={{ position: 'relative', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {n.icon}
              </div>
              <span style={{ fontSize: '10.5px', fontWeight: '600', color: n.color, maxWidth: '66px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {n.label}
              </span>
            </div>
          </React.Fragment>))}
        </div>
        <div style={{ flex: 'none', height: '22px', background: '#fff', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
          <span style={{ width: '128px', height: '4.5px', borderRadius: '3px', background: '#1b1c19' }}>
          </span>
        </div>
      </div>
    </div>
  )
}
