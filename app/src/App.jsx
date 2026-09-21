// App shell: phone frame, status bar, greeting header, active tab, bottom nav.
// Owned by: shared core. Each tab lives in src/tabs/<tab>/ and is imported
// only through its index file, so tabs can be worked on independently.
import React, { useState } from 'react'
import { TABS } from './shared/icons.jsx'
import { MeScreen, useMe } from './tabs/me/index.js'
import { DoctorScreen, DoctorHeaderAction, useDoctor } from './tabs/my-doctor/index.js'
import { MessagesScreen, MessagesHeaderAction, MessagesOverlays, useMessages } from './tabs/messages/index.js'
import { JournalScreen } from './tabs/journal/index.js'
import { ProfileScreen } from './tabs/profile/index.js'

const greetingFor = (hour) => (hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening')

export default function App() {
  const [tab, setTab] = useState('Me')
  // Tab state lives here, not in the screens, so it survives switching tabs.
  const me = useMe()
  const doctor = useDoctor()
  const messages = useMessages()

  const screens = {
    'Me': <MeScreen {...me} />,
    'My Doctor': <DoctorScreen {...doctor} />,
    'Messages': <MessagesScreen {...messages} />,
    'Journal': <JournalScreen />,
    'Profile': <ProfileScreen />,
  }
  const headerActions = {
    'My Doctor': <DoctorHeaderAction />,
    'Messages': <MessagesHeaderAction openCompose={messages.openCompose} />,
  }

  return (
    <div className="mc-root" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '28px 16px' }}>
      {/* contact.js (Profile) mounts its edit sheet inside .mc-phone */}
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
                {greetingFor(new Date().getHours())}
              </span>
              <span style={{ fontSize: '27px', fontWeight: '800', letterSpacing: '-.5px', color: '#15160f' }}>
                John Doe
              </span>
            </div>
            {headerActions[tab] || null}
          </div>
          {screens[tab]}
        </div>
        <MessagesOverlays {...messages} />
        <div style={{ flex: 'none', background: '#fff', borderTop: '1px solid #eceee9', padding: '10px 6px 8px', display: 'grid', gridTemplateColumns: 'repeat(5,1fr)' }}>
          {TABS.map((t) => { const on = tab === t.label; const c = on ? '#00b070' : '#8b8e86'; return (<React.Fragment key={t.label}>
            <div role="button" onClick={() => setTab(t.label)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', cursor: 'pointer', padding: '4px 0' }}>
              <div style={{ position: 'relative', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {t.icon(c, on)}
              </div>
              <span style={{ fontSize: '10.5px', fontWeight: '600', color: on ? '#15160f' : '#8b8e86', maxWidth: '66px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {t.label}
              </span>
            </div>
          </React.Fragment>) })}
        </div>
        <div style={{ flex: 'none', height: '22px', background: '#fff', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
          <span style={{ width: '128px', height: '4.5px', borderRadius: '3px', background: '#1b1c19' }}>
          </span>
        </div>
      </div>
    </div>
  )
}
