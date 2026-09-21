// Quick actions and tiles on the My Doctor tab. Owned by: My Doctor epic.
import { createElement as h } from 'react'
import { ACCENT, svg, p, line } from '../../shared/icons.jsx'

export const ACTIONS = [
  { label: 'Call', icon: svg([p('M7 3h3l1.5 4-2 1.5a10 10 0 0 0 6 6L17 12.5 21 14v3a2 2 0 0 1-2.2 2A16 16 0 0 1 5 5.2A2 2 0 0 1 7 3Z')]) },
  { label: 'Write', icon: svg([p('M21 3L3 10.5l7 2.5 2.5 7L21 3Z'), p('M10 13L21 3', 'b')]) },
  { label: 'Book appointment', icon: svg([h('circle', { cx: 12, cy: 12, r: 8.5, key: 'c' }), p('M12 7.5V12l3 2', 'a')]) },
  { label: 'Start video', icon: svg([h('rect', { x: 2.5, y: 6.5, width: 12.5, height: 11, rx: 2.5, key: 'r' }), p('M15 11l6-3.5v9L15 13', 'a')]) },
]

export const TILES = [
  { label: 'Prescriptions', meta: '2 ready to renew', icon: svg([p('M9 4h6l1 3H8l1-3Z'), p('M8 7h8l-1 13H9L8 7Z', 'b'), p('M10 12h4', 'c')], line(ACCENT)) },
  { label: 'Test results', meta: 'Updated 3 days ago', icon: svg([p('M6 3h12v18H6V3Z'), p('M9 8h6M9 12h6M9 16h3', 'b')], line(ACCENT)) },
  { label: 'Vaccinations', meta: '4 on record', icon: svg([h('circle', { cx: 12, cy: 12, r: 8.5, key: 'c' }), p('M8.5 12l2.5 2.5L16 9.5', 'a')], line(ACCENT)) },
  { label: 'Family', meta: '2 profiles', icon: svg([h('circle', { cx: 9, cy: 9, r: 3.2, key: 'c' }), p('M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5', 'a'), p('M16 7.5a3 3 0 0 1 0 6', 'b')], line(ACCENT)) },
]
