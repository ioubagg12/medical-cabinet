# Medical Cabinet

Mobile health-record prototype: check-up tracker, messages with the clinic,
journal timeline, profile.

## Layout

```
app/        React app — this is the one you work in
index.html  the original single-file prototype (bundled export, kept for reference)
serve.py    static server for that original file
tools/blood-compare/  standalone blood-report comparison prototype (separate from the app)
```

The React app in `app/` is a port of the original. Same screens, same styling,
ordinary source you can edit. See [app/README.md](app/README.md) for the file
map and notes on what changed in the port.

The code is split into 5 epics, one per tab, so several people can work in
parallel: see [EPICS.md](EPICS.md).

## Run

```bash
cd app
npm install
npm run dev
```

Opens on `http://localhost:5173`. The dev server also prints a Network URL —
open that on a phone on the same Wi-Fi to use the app on a real device.

| Script | What |
|---|---|
| `npm run dev` | dev server, hot reload, exposed on the LAN |
| `npm run check` | assertions over the check-up scheduling rules |
| `npm run lint` | oxlint |
| `npm run build` | static bundle into `app/dist/` |
| `npm run preview` | serve that build locally |

## Deploying

`npm run build` produces plain static files. Any static host works — Netlify,
Vercel, GitHub Pages. The web manifest ships with it, so the app installs to a
phone home screen from the deployed URL.
