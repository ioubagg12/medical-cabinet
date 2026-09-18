// Icons are built with createElement rather than JSX: each one is a list of
// path strings, and a bare d-string reads better than a wrapped <path /> tag.
import { createElement as h } from 'react'

const ACCENT = '#00b070'

export const svg = (children, props = {}) =>
  h('svg', {
    width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: '#fff',
    strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', ...props,
  }, ...children)

export const p = (d, k) => h('path', { d, key: k })

export const line = (c) => ({
  width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none',
  stroke: c, strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round',
})

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

export const RUBRICS = [
  { label: 'Medicine', meta: '3 active', icon: svg([p('M9 4h6l1 3H8l1-3Z'), p('M8 7h8l-1 13H9L8 7Z', 'b'), p('M10 12h4', 'c')], line(ACCENT)) },
  { label: 'Lab results', meta: '12 reports', icon: svg([p('M10 3v6.2L5.6 17a2.4 2.4 0 0 0 2.1 3.6h8.6a2.4 2.4 0 0 0 2.1-3.6L14 9.2V3'), p('M8.6 3h6.8', 'b'), p('M7.6 14.5h8.8', 'c')], line(ACCENT)) },
  { label: 'Diagnoses', meta: '4 on file', icon: svg([p('M7 4h7l4 4v12H7V4Z'), p('M14 4v4h4', 'b'), p('M12 11v5M9.5 13.5h5', 'c')], line(ACCENT)) },
  { label: 'Vaccinations', meta: '4 on record', icon: svg([p('M17 3l4 4'), p('M14.5 5.5l4 4', 'b'), p('M16.5 7.5L8 16l-3 1 1-3 8.5-8.5', 'c'), p('M10.5 9.5l4 4', 'd')], line(ACCENT)) },
]

// Tab icons take the current colour and whether the tab is active, so the
// active one can fill as well as stroke.
export const TABS = [
  { label: 'My Doctor', icon: (c, on) => svg([p('M12 20S4 14.5 4 9.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5C20 14.5 12 20 12 20Z')], { ...line(c), width: 24, height: 24, fill: on ? c : 'none' }) },
  { label: 'Messages', icon: (c) => svg([h('rect', { x: 2.5, y: 5, width: 19, height: 14, rx: 2.5, key: 'r' }), p('M3 7l9 6 9-6', 'a')], { ...line(c), width: 24, height: 24 }) },
  { label: 'Me', icon: (c, on) => svg([
      h('circle', { cx: 12, cy: 4.5, r: 2.5, key: 'hd', fill: on ? c : 'none' }),
      h('path', { key: 'bd', fill: on ? c : 'none', d: 'M12 8.25c-1.95 0-3.45.35-4.45 1.15-.85.7-1.3 1.7-1.55 2.9l-.6 3a.92.92 0 0 0 1.8.4l.7-2.75.15 2.5-.9 6a1.02 1.02 0 0 0 2 .4l1.5-5.35h1.3l1.5 5.35a1.02 1.02 0 0 0 2-.4l-.9-6 .15-2.5.7 2.75a.92.92 0 0 0 1.8-.4l-.6-3c-.25-1.2-.7-2.2-1.55-2.9-1-.8-2.5-1.15-4.45-1.15Z' }),
    ], { ...line(c), width: 24, height: 24, strokeWidth: 1.5 }) },
  { label: 'Journal', icon: (c) => svg([h('rect', { x: 5, y: 3, width: 14, height: 18, rx: 2.5, key: 'r' }), p('M9 8h6M9 12h6M9 16h3', 'a')], { ...line(c), width: 24, height: 24 }) },
  { label: 'Profile', icon: (c, on) => svg([h('circle', { cx: 12, cy: 8.2, r: 3.7, key: 'c', fill: on ? c : 'none' }), h('path', { key: 'b', fill: on ? c : 'none', d: 'M4.8 20a7.2 7.2 0 0 1 14.4 0' })], { ...line(c), width: 24, height: 24 }) },
]
