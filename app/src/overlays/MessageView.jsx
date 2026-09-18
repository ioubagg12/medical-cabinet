export default function MessageView({ openMsg, closeMsg, openCompose }) {
  return (
    <>
      <div style={{ position: 'absolute', inset: '0', background: 'rgba(18,19,15,.45)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '14px', zIndex: '5' }}>
        <div style={{ width: '100%', background: '#fff', borderRadius: '26px', padding: '22px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 -10px 40px rgba(0,0,0,.25)' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ width: '44px', height: '44px', flex: 'none', borderRadius: '50%', background: '#e8f7f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', fontWeight: '800', color: '#00875a' }}>
              {openMsg.initials}
            </div>
            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '2px', minWidth: '0' }}>
              <span style={{ fontSize: '15.5px', fontWeight: '800', color: '#15160f' }}>
                {openMsg.from}
              </span>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#8b8e86' }}>
                {openMsg.clinic} · {openMsg.time}
              </span>
            </div>
            <div className="mc-h15" role="button" onClick={closeMsg} style={{ width: '30px', height: '30px', flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: '#f2f2f0', color: '#43463f', cursor: 'pointer' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                <path d="M5 5l14 14M19 5L5 19" />
              </svg>
            </div>
          </div>
          <span style={{ fontSize: '17px', fontWeight: '800', color: '#15160f', lineHeight: '1.3' }}>
            {openMsg.subject}
          </span>
          <p style={{ margin: '0', fontSize: '14px', lineHeight: '1.6', color: '#43463f', textWrap: 'pretty' }}>
            {openMsg.body}
          </p>
          <div style={{ display: 'flex', gap: '10px', paddingTop: '2px' }}>
            <div className="mc-h16" role="button" onClick={openCompose} style={{ flex: '1', height: '48px', borderRadius: '26px', background: '#00b070', color: '#fff', fontSize: '14.5px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 3L3 10.5l7 2.5 2.5 7L21 3Z" />
              </svg>
              Reply
            </div>
            <div className="mc-h17" role="button" onClick={closeMsg} style={{ width: '110px', height: '48px', borderRadius: '26px', background: '#f2f2f0', color: '#43463f', fontSize: '14.5px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              Archive
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
