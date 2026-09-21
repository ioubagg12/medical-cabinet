// Profile facts, flags and settings rows. Owned by: Profile epic.

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
  // meta is a getter: contact.js holds the saved values and can change them at runtime.
  { label: 'Personal details', get meta() { return window.MC_meta ? window.MC_meta('personal') : 'Address, phone, email' } },
  { label: 'Emergency contact', get meta() { return window.MC_meta ? window.MC_meta('emergency') : 'Ana Creanga · +45 28 41 09 66' } },
  { label: 'Sharing & consent', meta: 'Who can see your journal' },
  { label: 'Log in & security', meta: 'MitID, biometrics' },
]
