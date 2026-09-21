// Green "new message" button in the header while the Messages tab is open.
export function MessagesHeaderAction({ openCompose }) {
  return (
    <div className="messages-h1" role="button" onClick={openCompose} style={{ width: '46px', height: '46px', flex: 'none', borderRadius: '50%', background: '#00b070', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 16px rgba(0,176,112,.35)', cursor: 'pointer' }}>
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 3L3 10.5l7 2.5 2.5 7L21 3Z" />
        <path d="M10 13L21 3" />
      </svg>
    </div>
  )
}
