export default function Compose({ closeCompose, sendMsg }) {
  return (
    <>
      <div style={{ position: 'absolute', inset: '0', background: 'rgba(18,19,15,.45)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '14px', zIndex: '6' }}>
        <div style={{ width: '100%', background: '#fff', borderRadius: '26px', padding: '22px', display: 'flex', flexDirection: 'column', gap: '14px', boxShadow: '0 -10px 40px rgba(0,0,0,.25)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '17px', fontWeight: '800', color: '#15160f' }}>
              New message
            </span>
            <div className="mc-h18" role="button" onClick={closeCompose} style={{ width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: '#f2f2f0', color: '#43463f', cursor: 'pointer' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                <path d="M5 5l14 14M19 5L5 19" />
              </svg>
            </div>
          </div>
          <div style={{ background: '#f7f8f6', borderRadius: '16px', padding: '13px 15px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '.7px', textTransform: 'uppercase', color: '#9a9d94' }}>
              To
            </span>
            <span style={{ fontSize: '14.5px', fontWeight: '700', color: '#15160f' }}>
              Kongevejsparkens Lægehus
            </span>
          </div>
          <div style={{ background: '#f7f8f6', borderRadius: '16px', padding: '13px 15px', minHeight: '104px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '.7px', textTransform: 'uppercase', color: '#9a9d94' }}>
              Your message
            </span>
            <span style={{ fontSize: '14px', color: '#8b8e86', lineHeight: '1.5' }}>
              Describe your symptoms, when they started, and any medication you are taking…
            </span>
          </div>
          <div className="mc-h19" role="button" onClick={sendMsg} style={{ height: '50px', borderRadius: '26px', background: '#00b070', color: '#fff', fontSize: '15px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '9px', cursor: 'pointer' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 3L3 10.5l7 2.5 2.5 7L21 3Z" />
              <path d="M10 13L21 3" />
            </svg>
            Send
          </div>
        </div>
      </div>
    </>
  )
}
