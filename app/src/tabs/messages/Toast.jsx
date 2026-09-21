export default function Toast() {
  return (
    <>
      <div style={{ position: 'absolute', left: '18px', right: '18px', bottom: '104px', zIndex: '7', background: '#15160f', color: '#fff', borderRadius: '18px', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13.5px', fontWeight: '600', boxShadow: '0 10px 30px rgba(0,0,0,.3)' }}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#00e08d" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12.5l4.5 4.5L19 7" />
        </svg>
        Message sent to your clinic
      </div>
    </>
  )
}
