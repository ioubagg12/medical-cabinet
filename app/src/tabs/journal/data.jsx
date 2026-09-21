// Journal record categories and timeline. Owned by: Journal epic.
import { ACCENT, svg, p, line } from '../../shared/icons.jsx'

export const RUBRICS = [
  { label: 'Medicine', meta: '3 active', icon: svg([p('M9 4h6l1 3H8l1-3Z'), p('M8 7h8l-1 13H9L8 7Z', 'b'), p('M10 12h4', 'c')], line(ACCENT)) },
  { label: 'Lab results', meta: '12 reports', icon: svg([p('M10 3v6.2L5.6 17a2.4 2.4 0 0 0 2.1 3.6h8.6a2.4 2.4 0 0 0 2.1-3.6L14 9.2V3'), p('M8.6 3h6.8', 'b'), p('M7.6 14.5h8.8', 'c')], line(ACCENT)) },
  { label: 'Diagnoses', meta: '4 on file', icon: svg([p('M7 4h7l4 4v12H7V4Z'), p('M14 4v4h4', 'b'), p('M12 11v5M9.5 13.5h5', 'c')], line(ACCENT)) },
  { label: 'Vaccinations', meta: '4 on record', icon: svg([p('M17 3l4 4'), p('M14.5 5.5l4 4', 'b'), p('M16.5 7.5L8 16l-3 1 1-3 8.5-8.5', 'c'), p('M10.5 9.5l4 4', 'd')], line(ACCENT)) },
]

export const TIMELINE = [
  { date: '12 May 2026', title: 'Blood test reviewed', meta: 'Dr. Mette Holm · vitamin D slightly low', dot: '#00b070', ring: '#d8f2e6' },
  { date: '8 May 2026', title: 'Consultation — spring cough', meta: 'Kongevejsparkens Lægehus · resolved', dot: '#00b070', ring: '#d8f2e6' },
  { date: '2 Apr 2026', title: 'Migraine follow-up', meta: 'Sumatriptan 50 mg renewed', dot: '#c2c7bd', ring: '#eceee9' },
  { date: '19 Feb 2026', title: 'MRI left knee', meta: 'Sønderborg Hospital · no damage found', dot: '#c2c7bd', ring: '#eceee9' },
  { date: '22 Nov 2024', title: 'Tetanus booster', meta: 'Left arm · next due 2034', dot: '#c2c7bd', ring: '#eceee9' },
  { date: '3 Oct 2019', title: 'Lactose intolerance confirmed', meta: 'Lab result · positive', dot: '#c2c7bd', ring: '#eceee9' },
]
