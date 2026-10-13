// Blood test advice: a sub-page of the Journal tab, opened by tapping the
// advice card. Everything on it comes from the latest blood analysis: the
// markers, then nutrition or exercise tips based on them. Owned by: Journal epic.
import { useState } from 'react'

const INK = '#0f3b2b'
const MINT = '#7de3b4'
const GREEN = '#00b070'

const MARKER_STATUS = {
  low: { label: 'Low', dot: '#f59e0b', fg: '#7a5a18', bg: '#fdf3e0' },
  normal: { label: 'Normal', dot: '#10b981', fg: '#026b48', bg: '#e8f7f0' },
  high: { label: 'High', dot: '#f97316', fg: '#8a3d10', bg: '#fdeee4' },
  none: { label: 'Unmatched', dot: '#8b8e86', fg: '#4b5563', bg: '#f3f4f6' },
}

const KINDS = [
  { key: 'nutrition', label: 'Nutrition' },
  { key: 'exercise', label: 'Exercise' },
]

const icon = (paths) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {paths.map((d) => <path key={d} d={d} />)}
  </svg>
)

const KIND_ICON = {
  nutrition: icon(['M5 19c0-8 5-13 14-14-1 9-6 14-14 14Z', 'M5 19l7-7']),
  exercise: icon(['M13 4.5a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0', 'M8 21l3-6 3 2v4', 'M6 12l3-4 4 1 2 3 3 1', 'M11 15l1-6']),
}

const card = { background: '#fff', borderRadius: '22px', boxShadow: '0 2px 10px rgba(20,22,16,.05)' }
const sectionTitle = { fontSize: '15px', fontWeight: '800', color: '#15160f' }

const SAMPLE_CSV = `marker,value,unit,range
Hemoglobin,12.4,g/dL
Hematocrit,39,%
WBC,11.8,10^9/L
Platelets,250,10^3/uL
Glucose,5.9,mmol/L
HbA1c,5.9,%
Sodium,139,mmol/L
Potassium,4.2,mmol/L,3.5-5.1
Chloride,103,mmol/L
CO2,24,mmol/L
Creatinine,97,umol/L
Calcium,8.4,mg/dL
Albumin,3.1,g/dL
ALT,41,U/L
AST,30,U/L
Total cholesterol,5.8,mmol/L
HDL,1.1,mmol/L
Triglycerides,1.9,mmol/L
Vitamin D,18,ng/mL
Ferritin,18,ug/L
CRP,6,mg/L`

const MAX_BLOOD_CSV = `marker,value,unit,range
Fier (sideremie),14.5,umol/L,5.83 - 34.5
Creatinina,75,umol/L,< 106
Urea,3.22,mmol/L,< 8.3
Urea nitrogen (BUN),1.505,mmol/L,< 3.88
Numar leucocite,7.22,10^3/uL,4 - 10
Numar eritrocite,5.24,10^6/uL,4.3 - 5.7
Hemoglobina {Hb},154,g/L,132 - 173
Hematocrit,44.7,%,39 - 49
Volum eritrocitar mediu {VEM},85.3,fL,80 - 99
Hemoglobina eritrocitara medie {HEM},29.4,pg/cell,27 - 34
Concentratie medie a Hb/eritrocit,34.5,g/dL,32 - 37
Largimea distributiei eritrocitare,12,%,11.6 - 14.8
Numar trombocite,285,10^3/uL,150 - 450
Volum trombocitar mediu {VTM},10.7,fL,7.4 - 13
Largimea distributiei trombocitare,13,fL,8 - 16.5
Neutrofil,36.7,%,45 - 80
Neutrofil,2.65,10^3/uL,2 - 8
Limfocit,49,%,20 - 55
Limfocit,3.54,10^3/uL,1 - 4
Monocit,9.6,%,<= 15
Monocit,0.69,10^3/uL,0.3 - 1
Eozinofil,3.5,%,<= 7
Eozinofil,0.25,10^3/uL,0.05 - 0.7
Bazofil,1.2,%,<= 2
Bazofil,0.09,10^3/uL,<= 0.2
VSH,5,mm/h,< 15
Anti-TPO,< 8,UI/mL,< 8
FT4 ( Tiroxina libera ),21.7,pmol/L,11.9 - 21.6
TSH ( Hormon de stimulare tiroidiana ),4.54,uIU/mL,0.27 - 4.2
Alaninaminotransferaza (GPT/ALAT/ALT),16.2,U/L,< 50
Aspartataminotransferaza (GOT/ASAT/AST),14.4,U/L,< 50
Bilirubina totala,7.99,umol/L,< 20.5
Bilirubina directa,3.87,umol/L,<= 5.1
Bilirubina indirecta,4.12,umol/L,<= 17.1
Gama - glutamiltransferaza,11.2,U/L,< 60
Glucoza,5.35,mmol/L,3.33 - 5.54
Amilaza pancreatica in ser,19.2,U/L,13 - 53
Lipaza,22.5,U/L,<= 60`

export default function AdvicePage({ advice, onUpload, onReset, onBack }) {
  const [kind, setKind] = useState('nutrition')
  const [showUploadModal, setShowUploadModal] = useState(false)

  // Upload modal inputs
  const [age, setAge] = useState(advice.profile?.age ?? 35)
  const [sex, setSex] = useState(advice.profile?.sex ?? 'M')
  const [fasting, setFasting] = useState(advice.profile?.fasting ?? true)
  const [inputText, setInputText] = useState(advice.rawText ?? '')

  const { source, markers, recommendations } = advice
  const flagged = markers.filter((m) => m.status === 'low' || m.status === 'high')
  const tips = recommendations.filter((r) => r.kind === kind)

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (evt) => {
        if (typeof evt.target?.result === 'string') {
          setInputText(evt.target.result)
        }
      }
      reader.readAsText(file)
    }
  }

  const handleApplyUpload = () => {
    if (!inputText.trim()) return
    onUpload?.(inputText, {
      age: Number(age) || 35,
      sex,
      fasting: !!fasting,
      trimester: 0,
      altitude: 0,
      method: null,
    })
    setShowUploadModal(false)
  }

  return (
    <>
      <div style={{ padding: '0 22px 14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div className="journal-back" role="button" onClick={onBack} style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: '700', color: '#6d7069', padding: '6px 12px 6px 6px', margin: '0 0 0 -6px', borderRadius: '20px', cursor: 'pointer' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 5l-7 7 7 7" />
          </svg>
          Journal
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '10px' }}>
          <span style={{ fontSize: '24px', fontWeight: '800', letterSpacing: '-.4px', color: '#15160f' }}>
            Blood test advice
          </span>
          <span style={{ fontSize: '12px', fontWeight: '700', color: '#6d7069', whiteSpace: 'nowrap' }}>
            {source.date}
          </span>
        </div>
      </div>

      {/* Action Bar: Upload / Reset */}
      <div style={{ margin: '0 18px 12px', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <button
          type="button"
          onClick={() => setShowUploadModal(true)}
          style={{ background: '#0f3b2b', color: '#fff', border: 'none', borderRadius: '12px', padding: '7px 14px', fontSize: '12.5px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          Upload report
        </button>
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            style={{ background: '#fff', color: '#6d7069', border: '1px solid #d1d5db', borderRadius: '12px', padding: '7px 12px', fontSize: '12.5px', fontWeight: '700', cursor: 'pointer' }}
          >
            Reset
          </button>
        )}
      </div>

      {/* Highlight Banner */}
      <div style={{ margin: '0 18px 16px', background: INK, borderRadius: '26px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '30px', height: '30px', flex: 'none', borderRadius: '10px', background: 'rgba(255,255,255,.14)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={MINT} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3a6 6 0 0 0-3.5 10.9V17h7v-3.1A6 6 0 0 0 12 3Z" />
              <path d="M10 20h4" />
            </svg>
          </div>
          <span style={{ fontSize: '15px', fontWeight: '800', color: '#fff' }}>
            {flagged.length ? `${flagged.length} of ${markers.length} values need attention` : 'All values in range'}
          </span>
        </div>
        <p style={{ margin: '0', fontSize: '13.5px', lineHeight: '1.55', color: '#cfe5da', textWrap: 'pretty' }}>
          {flagged.length
            ? `${flagged.map((m) => m.name).join(', ')} ${flagged.length === 1 ? 'is' : 'are'} outside standard reference ranges. Evidence-based lifestyle recommendations are generated below.`
            : 'Everything from your latest blood test is within optimal reference ranges. Keep your current dietary and fitness baseline.'}
        </p>
      </div>

      {/* Blood Results Grid */}
      <div style={{ margin: '0 18px 16px', ...card, padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span style={sectionTitle}>
            Your blood results
          </span>
          <span style={{ fontSize: '11px', fontWeight: '700', color: '#8b8e86' }}>
            Reviewed by {source.reviewedBy}
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '8px' }}>
          {markers.map((m) => {
            const st = MARKER_STATUS[m.status] || MARKER_STATUS.none
            const off = m.status === 'low' || m.status === 'high'
            return (
              <div
                key={m.name}
                style={{
                  background: off ? st.bg : '#fafbf9',
                  border: `1px solid ${off ? st.dot : '#eceee9'}`,
                  borderRadius: '12px',
                  padding: '8px 10px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '4px',
                  minWidth: 0,
                  boxSizing: 'border-box',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4px', minWidth: 0 }}>
                  <span
                    title={m.name}
                    style={{
                      fontSize: '11px',
                      fontWeight: '700',
                      color: '#6d7069',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      minWidth: 0,
                      flex: 1,
                    }}
                  >
                    {m.name}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '10px', fontWeight: '800', color: st.fg, flexShrink: 0 }}>
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: st.dot, flexShrink: 0 }} />
                    {st.label}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '15px', fontWeight: '800', color: '#15160f', lineHeight: 1.1 }}>
                    {m.value}
                  </span>
                  {m.unit && <span style={{ fontSize: '10.5px', fontWeight: '600', color: '#6d7069' }}>{m.unit}</span>}
                  {m.isCalculated && (
                    <span style={{ marginLeft: 'auto', fontSize: '8px', fontWeight: '800', background: '#e0e7ff', color: '#3730a3', padding: '1px 4px', borderRadius: '3px', letterSpacing: '.2px', flexShrink: 0 }}>
                      CALC
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
                  <span style={{ fontSize: '9.5px', fontWeight: '600', color: '#8b8e86', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    Ref: {m.range}
                  </span>
                  {m.tier && (
                    <span
                      title={m.tier}
                      style={{
                        fontSize: '9px',
                        fontWeight: '700',
                        color: '#b45309',
                        background: 'rgba(245,158,11,.15)',
                        padding: '1px 4px',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        display: 'block',
                      }}
                    >
                      {m.tier}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Recommendations */}
      <div style={{ margin: '0 18px 12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <span style={{ ...sectionTitle, padding: '0 4px' }}>
          Recommendations
        </span>
        <div role="tablist" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', background: '#e6e7e3', borderRadius: '14px', padding: '4px' }}>
          {KINDS.map((k) => {
            const on = kind === k.key
            return (
              <div key={k.key} role="tab" aria-selected={on} className={on ? undefined : 'journal-advice-tab'} onClick={() => setKind(k.key)} style={{ textAlign: 'center', fontSize: '13px', fontWeight: '800', padding: '9px 0', borderRadius: '10px', cursor: 'pointer', background: on ? '#fff' : 'transparent', color: on ? '#15160f' : '#6d7069', boxShadow: on ? '0 1px 4px rgba(20,22,16,.1)' : 'none' }}>
                {k.label}
              </div>
            )
          })}
        </div>
        {tips.map((t) => (
          <div key={t.title} style={{ ...card, display: 'grid', gridTemplateColumns: '36px 1fr', gap: '12px', padding: '14px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: '#e8f7f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {KIND_ICON[t.kind]}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: 0 }}>
              <span style={{ fontSize: '14px', fontWeight: '800', color: '#15160f' }}>
                {t.title}
              </span>
              <span style={{ fontSize: '12.5px', lineHeight: '1.5', color: '#6d7069' }}>
                {t.detail}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginTop: '4px' }}>
                {t.marker && (
                  <span style={{ fontSize: '10.5px', fontWeight: '700', color: '#026b48', background: '#e8f7f0', padding: '3px 8px', borderRadius: '8px' }}>
                    For {t.marker}
                  </span>
                )}
                {t.evidence && (
                  <span style={{ fontSize: '10px', fontWeight: '600', color: '#4b5563', background: '#f3f4f6', padding: '3px 7px', borderRadius: '6px' }}>
                    {t.evidence}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <p style={{ margin: '0 22px 22px', fontSize: '11.5px', lineHeight: '1.45', color: '#8b8e86' }}>
        This advice is generated only from your blood analysis. It is general guidance, not a diagnosis. Talk to your doctor before big changes.
      </p>

      {/* Upload/Paste Modal */}
      {showUploadModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px' }}>
          <div style={{ background: '#fff', borderRadius: '24px', width: '100%', maxWidth: '360px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 40px rgba(0,0,0,.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '17px', fontWeight: '800', color: '#15160f' }}>
                Upload lab report
              </span>
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                style={{ background: 'none', border: 'none', fontSize: '18px', fontWeight: '700', color: '#9ca3af', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            {/* Demographics Prompt */}
            <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: '800', color: '#475569' }}>
                Patient Demographics
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '2px' }}>Age (years)</label>
                  <input
                    type="number"
                    min="0"
                    max="120"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    style={{ width: '100%', padding: '6px 8px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '2px' }}>Biological Sex</label>
                  <select
                    value={sex}
                    onChange={(e) => setSex(e.target.value)}
                    style={{ width: '100%', padding: '6px 8px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', background: '#fff' }}
                  >
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                </div>
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#475569', fontWeight: '600', marginTop: '2px' }}>
                <input
                  type="checkbox"
                  checked={fasting}
                  onChange={(e) => setFasting(e.target.checked)}
                />
                Fasting sample (8h+)
              </label>
            </div>

            {/* Lab Input Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#374151' }}>
                  CSV / JSON Lab Data
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setAge(20)
                      setSex('M')
                      setInputText(MAX_BLOOD_CSV)
                    }}
                    style={{ background: 'none', border: 'none', color: '#00b070', fontSize: '11px', fontWeight: '800', cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Load Max's PDF data
                  </button>
                  <button
                    type="button"
                    onClick={() => setInputText(SAMPLE_CSV)}
                    style={{ background: 'none', border: 'none', color: '#6b7280', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}
                  >
                    Generic sample
                  </button>
                </div>
              </div>

              <textarea
                rows={6}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="marker,value,unit&#10;Hemoglobin,12.4,g/dL&#10;Glucose,5.9,mmol/L&#10;LDL,140,mg/dL"
                style={{ width: '100%', padding: '8px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '12px', fontFamily: 'monospace' }}
              />

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                <label style={{ fontSize: '11.5px', color: '#6b7280', fontWeight: '600' }}>Or select file:</label>
                <input
                  type="file"
                  accept=".csv,.json,.txt"
                  onChange={handleFileUpload}
                  style={{ fontSize: '11.5px', color: '#4b5563' }}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                style={{ flex: 1, padding: '9px 0', borderRadius: '12px', border: '1px solid #d1d5db', background: '#fff', fontSize: '13px', fontWeight: '700', color: '#4b5563', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApplyUpload}
                style={{ flex: 1, padding: '9px 0', borderRadius: '12px', border: 'none', background: '#0f3b2b', fontSize: '13px', fontWeight: '700', color: '#fff', cursor: 'pointer' }}
              >
                Analyze & Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
