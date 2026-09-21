// Shared icon helpers + bottom-nav tab icons. Owned by: shared core.
// Icons are built with createElement rather than JSX: each one is a list of
// path strings, and a bare d-string reads better than a wrapped <path /> tag.
import { createElement as h } from 'react'

export const ACCENT = '#00b070'

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
