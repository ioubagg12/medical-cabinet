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

The code is split into one folder per tab so people can work on different
tabs without touching the same files. Ownership rules: [../EPICS.md](../EPICS.md).

| Path | What |
|---|---|
| `src/App.jsx` | Phone frame, header, bottom nav; picks the active tab |
| `src/shared/` | Icon helpers + tab icons, base CSS, Manrope faces |
| `src/tabs/me/` | Body map, check-up tracker (`checkup.js`), organ data, `useMe` state |
| `src/tabs/my-doctor/` | Doctor screen, quick actions, tiles, header bell |
| `src/tabs/messages/` | Inbox, message view, compose sheet, toast, `useMessages` state |
| `src/tabs/journal/` | Record categories and timeline |
| `src/tabs/profile/` | Profile screen, contact edit sheet (`contact.js`) |
| `scripts/check.mjs` | Assertions over the scheduling rules |

Each tab exposes only its `index.js`. State that must survive switching tabs
(`useMe`, `useDoctor`, `useMessages`) is called in `App` and spread into the
screen; everything else the screens import themselves.

Profile contact edits save through `serve.py` (`/api/contact`, written to
`contact.json`). In dev, run `python public/serve.py` next to `npm run dev`
(Vite forwards `/api` to it); without it, edits stay in the browser.

## Notes on the port

- The original measured organ bounding boxes with `getBBox` into a `boxes`
  state that nothing ever read. Dropped, along with the only DOM query.
- `style-hover` attributes have no inline-style equivalent in React, so they
  were hoisted into real `:hover` rules, now in each tab's own CSS file.
- `checkup.js` pins "today" to 18 Sep 2026, matching the demo data.
- Fonts, icons and the web manifest moved to `public/`, so the app still
  installs as a PWA.
