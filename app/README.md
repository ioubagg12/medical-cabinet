# Medical Cabinet

React port of the original single-file prototype (`../index.html`), which was a
bundled export: a `{{ }}` template plus a props object, stitched together at
runtime by a generated `dc-runtime`. Same screens, same styling, now ordinary
React source you can edit.

## Run

```bash
npm install
npm run dev      # --host, so a phone on the same Wi-Fi can open it too
```

Other scripts: `npm run build`, `npm run preview`, `npm run lint`, `npm run check`.

## Layout

| Path | What |
|---|---|
| `src/App.jsx` | Phone frame, header, bottom nav; picks the active screen |
| `src/useAppState.js` | All state, and the values derived from it |
| `src/checkup.js` | Check-up scheduling: status thresholds and due labels |
| `src/data.js` | Demo content (organs, messages, timeline, profile) |
| `src/icons.jsx` | Inline SVG icon sets |
| `src/screens/` | One file per tab |
| `src/overlays/` | Message view, compose sheet, sent toast |
| `src/styles.css` | Base rules + hover states |
| `src/fonts.css` | Manrope faces, served from `public/fonts/` |
| `scripts/check.mjs` | Assertions over the scheduling rules |

Screens are presentational: `App` spreads the state object into them, and each
one destructures the values it uses.

## Notes on the port

- The original measured organ bounding boxes with `getBBox` into a `boxes`
  state that nothing ever read. Dropped, along with the only DOM query.
- `style-hover` attributes have no inline-style equivalent in React, so they
  were hoisted into real `.mc-h*:hover` rules in `styles.css`.
- `checkup.js` pins "today" to 18 Sep 2026, matching the demo data.
- Fonts, icons and the web manifest moved to `public/`, so the app still
  installs as a PWA.
