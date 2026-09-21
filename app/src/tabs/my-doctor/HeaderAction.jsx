// Notification bell in the header while the My Doctor tab is open.
export function DoctorHeaderAction() {
  return (
    <div className="doctor-h0" role="button" style={{ width: '46px', height: '46px', flex: 'none', borderRadius: '50%', background: '#00b070', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', boxShadow: '0 6px 16px rgba(0,176,112,.35)', cursor: 'pointer' }}>
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
        <path d="M18 15V10a6 6 0 1 0-12 0v5l-1.5 2.5h15L18 15Z" />
        <path d="M10 20h4" />
      </svg>
      <span style={{ position: 'absolute', top: '2px', right: '2px', width: '11px', height: '11px', borderRadius: '50%', background: '#ff5a3c', border: '2px solid #f2f2f0' }}>
      </span>
    </div>
  )
}
