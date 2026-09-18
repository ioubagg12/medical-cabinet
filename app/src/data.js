// Demo content for the prototype. Organ and message records are the originals,
// extracted verbatim from the single-file export.

export const ORGANS = {
      heart: { name: 'Heart', speciality: 'Cardiology', last: '2026-07-18', freq: 12,
        icon: { vb: '320 348 92 122', parts: [{ d: 'M11.885 12.863c.117-2.127.233-2.966.1-4.537-.147-1.44-.397-2.495-.75-3.522s-3.313-.626-2.959 1.138c.353 1.764.593 6.809.451 8.45 1.548-.984 3.158-1.529 3.158-1.529z', t: 'translate(308, 350) scale(3.2)' }, { d: 'M10.275 13.408c-2.139 1.07-4.278 3.209-4.278 6.417 0 8.735 7.83 10.749 14.248 12.888 6.417 2.139 7.181 1.578 9.283-.053 1.07-2.139.414-13.672-2.795-17.95-2.314-3.085-11.58-3.741-16.458-1.302z', t: 'translate(308, 350) scale(3.2)' }, { d: 'M10.275 13.408c-2.139 1.07-4.278 3.209-4.278 6.417 0 8.735 9.83 13.581 13.353 14.415 6.275 1.486 9.108.559 10.177-1.58-1.783 1.113-9.316-.614-13.309-4.172-4.187-3.732-6.074-10.238-3.383-13.552.071-1.036-.118-1.587-.118-2.416-.886.228-1.713.523-2.442.888z', t: 'translate(308, 350) scale(3.2)' }, { d: 'M12.836 14.936c-1.413-2.139-2.156-6.05.648-9.015 2.65-2.802 7.77-2.842 10.224.973 2.086 3.243.471 9.722.471 9.722s-4.804-4.98-6.248-2.649c-1.442 2.332-4.872 1.306-5.095.969z', t: 'translate(308, 350) scale(3.2)' }, { d: 'M23.951 17.58c1.156-1.632 1.156-4.168 1.156-4.168s.323-1.489 3.701-.538c.33.093 1.339-1.479.707-1.718-2.296-.869-3.93-.309-3.93-.309s1.129-.835 2.772-1.033c.652-.079.123-1.37-.525-1.357-.7.014-1.337.184-2.092.514-.353.154-.72-.109-.852-.24-1.988-1.975-4.223-1.689-5.587-1.083-1.455.647-2.06 2.478-1.165 3.718s.013 2.178-.543 3.169c-.9 1.602 4.831 5.201 6.358 3.045z', t: 'translate(308, 350) scale(3.2)' }, { d: 'M15.252 6.673c-.744-1.708-1.59-2.473-2.694-3.533s.751-2.384 1.943-1.236 2.296 3.312 2.473 3.842-1.278 1.945-1.722.927z', t: 'translate(308, 350) scale(3.2)' }, { d: 'M16.219 4.228c1.134-.593 1.506-2.235 1.594-2.765.088-.53 1.722-.574 1.545.574s.013 1.919.013 1.919.87-1.483 1.753-2.234 1.896.443 1.41 1.142-.579 1.98-.35 2.433c.229.453-2.242 1.022-3.815.713-1.571-.308-2.15-1.782-2.15-1.782z', t: 'translate(308, 350) scale(3.2)' }, { d: 'M7.85 25.525c-.23 0-.438-.16-.488-.394-.023-.106-.556-2.621.183-4.262.661-1.469 1.637-2.033 2.497-2.53 1.024-.592 1.764-1.019 1.911-2.855.022-.275.263-.476.539-.458.275.022.48.263.458.539-.189 2.359-1.317 3.011-2.407 3.641-.801.463-1.557.899-2.085 2.074-.603 1.34-.122 3.616-.117 3.64.058.27-.113.536-.383.594-.038.007-.073.011-.108.011z', t: 'translate(308, 350) scale(3.2)' }, { d: 'M20.262 28.778c-.174 0-.343-.091-.436-.253-.137-.239-.053-.545.187-.682.02-.011 1.878-1.084 2.481-2.424.627-1.394.331-2.007-.116-2.935-.413-.856-.927-1.923-.776-3.8.021-.275.27-.479.538-.458.275.022.48.263.458.539-.128 1.607.283 2.46.681 3.286.486 1.009.946 1.961.128 3.779-.738 1.64-2.811 2.833-2.898 2.883-.079.044-.164.065-.247.065z', t: 'translate(308, 350) scale(3.2)' }, { d: 'M24.8 28.275c-.037 0-.075-.004-.112-.013-.27-.062-.438-.331-.375-.6.038-.162-.042-.503-.262-.816-.191-.271-.438-.449-.659-.475-1.191-.141-2.52-2.244-2.73-3.243-.057-.271.116-.536.386-.593.273-.054.536.115.593.386.186.879 1.338 2.395 1.869 2.456.514.061.997.378 1.359.894.368.522.528 1.142.419 1.616-.055.232-.261.388-.488.388z', t: 'translate(308, 350) scale(3.2)' }] },
        files: [{ name: 'cardio_ecg_report.pdf', date: '18 Jul 2026' }, { name: 'bp_home_log_q3.pdf', date: '2 Aug 2026' }] },
      lungs: { name: 'Lungs', speciality: 'Pulmonology', last: '2025-11-18', freq: 12,
        icon: { vb: '288 336 148 134', parts: [{ d: 'M356 356c-6-6-16-8-27-5-14 4-22 14-25 28-4 20-4 44 1 62 3 12 10 19 20 19 12 0 19-8 22-20 5-20 9-42 9-62z', t: 'translate(362 412) scale(1.18) translate(-362 -412)' }, { d: 'M356 356c-6-6-16-8-27-5-14 4-22 14-25 28-4 20-4 44 1 62 3 12 10 19 20 19 12 0 19-8 22-20 5-20 9-42 9-62z', t: 'translate(724,0) scale(-1,1) translate(362 412) scale(1.18) translate(-362 -412)' }] },
        files: [{ name: 'spirometry_nov2025.pdf', date: '18 Nov 2025' }] },
      eyes: { name: 'Eyes', speciality: 'Ophthalmology', last: '2026-06-18', freq: 24,
        icon: { vb: '296 142 142 48', parts: [{ d: 'M337 167a10 6.6 0 1 0 20 0a10 6.6 0 1 0 -20 0z', t: 'translate(362 167) scale(2.6) translate(-362 -167)' }, { d: 'M371 167a10 6.6 0 1 0 20 0a10 6.6 0 1 0 -20 0z', t: 'translate(362 167) scale(2.6) translate(-362 -167)' }] },
        files: [{ name: 'vision_test_june.jpg', date: '18 Jun 2026' }] },
      kidneys: { name: 'Kidneys', speciality: 'Nephrology', last: '2025-03-18', freq: 12,
        icon: { vb: '313 537 98 76', parts: [{ d: 'M330 546c11-2 18 8 19 21 1 15-5 30-15 34-9 4-16-2-15-12 1-9 4-13 4-22s-4-20 7-21z', t: 'translate(334 574) scale(1.25) translate(-334 -574)' }, { d: 'M330 546c11-2 18 8 19 21 1 15-5 30-15 34-9 4-16-2-15-12 1-9 4-13 4-22s-4-20 7-21z', t: 'translate(724,0) scale(-1,1) translate(334 574) scale(1.25) translate(-334 -574)' }] },
        files: [{ name: 'creatinine_mar2025.pdf', date: '18 Mar 2025' }] },
      blood: { name: 'Blood / Vitals', speciality: 'Haematology', last: '2026-08-18', freq: 12,
        icon: { vb: '268 253 188 253', d: 'M362 300c34 42 58 72 58 101a58 58 0 01-116 0c0-29 24-59 58-101z', t: 'translate(362 380) scale(1.5) translate(-362 -380)' },
        files: [{ name: 'blood_work_june.pdf', date: '18 Jun 2026' }, { name: 'vitamin_panel_aug.pdf', date: '18 Aug 2026' }] }
    }

export const MESSAGES = [
    { id: 1, from: 'Dr. Mette Holm', initials: 'MH', clinic: 'Kongevejsparkens Lægehus', time: '14:05', subject: 'Your blood test results', preview: 'Everything looks normal apart from…', unread: true,
      body: 'Hi Gabriel. I have reviewed your blood test from 10 May. Your values are within the normal range apart from vitamin D, which is slightly low. I suggest a daily supplement of 38 µg through the winter. No further tests are needed for now — write back here if you notice any tiredness or muscle pain.' },
    { id: 2, from: 'Clinic secretary', initials: 'CS', clinic: 'Kongevejsparkens Lægehus', time: 'Yesterday', subject: 'Prescription renewed', preview: 'Your prescription is ready at the pharmacy', unread: false,
      body: 'Your prescription has been renewed and sent to Apoteket Sønderborg. It can be collected from tomorrow morning and is valid for six months.' },
    { id: 3, from: 'Dr. Mette Holm', initials: 'MH', clinic: 'Kongevejsparkens Lægehus', time: '8 May', subject: 'After your visit', preview: 'Thanks for coming in — a short summary', unread: false,
      body: 'Thanks for coming in on Tuesday. Keep taking the medication for the full ten days even if the symptoms disappear earlier, and book a follow-up if the cough is still there in two weeks.' }
  ]

export const FACTS = [
  { label: 'Date of birth', value: '14 March 1991' },
  { label: 'Blood type', value: 'A rh+' },
  { label: 'Height', value: '182 cm' },
  { label: 'Weight', value: '78 kg' },
]

export const FLAGS = [
  { label: 'Penicillin allergy', tone: '#7a2418', bg: '#fdeae6' },
  { label: 'Lactose intolerant', tone: '#7a5a18', bg: '#fdf3e0' },
  { label: 'Organ donor', tone: '#026b48', bg: '#e8f7f0' },
]

export const SETTINGS = [
  { label: 'Personal details', meta: 'Address, phone, email' },
  { label: 'Emergency contact', meta: 'Ana Creanga · +45 28 41 09 66' },
  { label: 'Sharing & consent', meta: 'Who can see your journal' },
  { label: 'Log in & security', meta: 'MitID, biometrics' },
]

export const TIMELINE = [
  { date: '12 May 2026', title: 'Blood test reviewed', meta: 'Dr. Mette Holm · vitamin D slightly low', dot: '#00b070', ring: '#d8f2e6' },
  { date: '8 May 2026', title: 'Consultation — spring cough', meta: 'Kongevejsparkens Lægehus · resolved', dot: '#00b070', ring: '#d8f2e6' },
  { date: '2 Apr 2026', title: 'Migraine follow-up', meta: 'Sumatriptan 50 mg renewed', dot: '#c2c7bd', ring: '#eceee9' },
  { date: '19 Feb 2026', title: 'MRI left knee', meta: 'Sønderborg Hospital · no damage found', dot: '#c2c7bd', ring: '#eceee9' },
  { date: '22 Nov 2024', title: 'Tetanus booster', meta: 'Left arm · next due 2034', dot: '#c2c7bd', ring: '#eceee9' },
  { date: '3 Oct 2019', title: 'Lactose intolerance confirmed', meta: 'Lab result · positive', dot: '#c2c7bd', ring: '#eceee9' },
]
