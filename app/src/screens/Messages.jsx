import React from 'react'

export default function Messages({ threads, openCompose }) {
  return (
    <>
      <div style={{ padding: '0 22px 16px', display: 'flex', alignItems: 'baseline', gap: '10px' }}>
        <span style={{ fontSize: '24px', fontWeight: '800', letterSpacing: '-.4px', color: '#15160f' }}>
          Messages
        </span>
        <span style={{ fontSize: '12px', fontWeight: '700', color: '#026b48', background: '#e8f7f0', padding: '4px 9px', borderRadius: '20px' }}>
          1 new
        </span>
      </div>
      <div style={{ margin: '0 18px 22px', background: '#fff', borderRadius: '24px', boxShadow: '0 2px 10px rgba(20,22,16,.05)', overflow: 'hidden' }}>
        {threads.map((m, i5) => (<React.Fragment key={i5}>
          <div className="mc-h2" role="button" onClick={m.onClick} style={{ padding: '16px 20px', display: 'flex', gap: '13px', alignItems: 'flex-start', borderTop: '1px solid #f0f1ee', cursor: 'pointer' }}>
            <div style={{ width: '40px', height: '40px', flex: 'none', borderRadius: '50%', background: '#e8f7f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '800', color: '#00875a' }}>
              {m.initials}
            </div>
            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '3px', minWidth: '0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', alignItems: 'baseline' }}>
                <span style={{ fontSize: '14.5px', fontWeight: m.weight, color: '#15160f', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {m.from}
                </span>
                <span style={{ fontSize: '11px', fontWeight: '600', color: '#9a9d94', flex: 'none' }}>
                  {m.time}
                </span>
              </div>
              <span style={{ fontSize: '13px', fontWeight: m.weight, color: '#43463f', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {m.subject}
              </span>
              <span style={{ fontSize: '12.5px', color: '#8b8e86', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {m.preview}
              </span>
            </div>
            {m.unread ? (<>
              <span style={{ width: '9px', height: '9px', flex: 'none', marginTop: '6px', borderRadius: '50%', background: '#00b070' }}>
              </span>
            </>) : null}
          </div>
        </React.Fragment>))}
      </div>
      <div style={{ padding: '0 22px 10px' }}>
        <span style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '.9px', textTransform: 'uppercase', color: '#8b8e86' }}>
          Start a new message
        </span>
      </div>
      <div style={{ margin: '0 18px 8px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div className="mc-h3" role="button" onClick={openCompose} style={{ background: '#fff', borderRadius: '20px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '18px', boxShadow: '0 2px 10px rgba(20,22,16,.05)', cursor: 'pointer' }}>
          <div style={{ width: '34px', height: '34px', borderRadius: '11px', background: '#e8f7f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00b070" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 20h16" />
              <path d="M14.5 4.5l5 5L9 20H4v-5L14.5 4.5Z" />
            </svg>
          </div>
          <span style={{ fontSize: '14px', fontWeight: '700', color: '#15160f' }}>
            Medical question
          </span>
        </div>
        <div className="mc-h4" role="button" onClick={openCompose} style={{ background: '#fff', borderRadius: '20px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '18px', boxShadow: '0 2px 10px rgba(20,22,16,.05)', cursor: 'pointer' }}>
          <div style={{ width: '34px', height: '34px', borderRadius: '11px', background: '#e8f7f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00b070" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 4h6l1 3H8l1-3Z" />
              <path d="M8 7h8l-1 13H9L8 7Z" />
            </svg>
          </div>
          <span style={{ fontSize: '14px', fontWeight: '700', color: '#15160f' }}>
            Renew prescription
          </span>
        </div>
      </div>
    </>
  )
}
