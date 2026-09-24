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

## Accounts and data (Supabase, optional)

Without configuration the app runs as before, with no sign-in. To turn on
accounts:

1. Create a free project at [supabase.com](https://supabase.com) (EU region).
2. In the dashboard, open **SQL Editor** and run every file in
   `supabase/migrations/` in order. This creates the `profiles` table with
   row level security (each user sees only their own row).
3. For testing: **Authentication > Sign In / Providers > Email**, turn off
   "Confirm email", so new accounts can sign in straight away.
4. Copy `app/.env.example` to `app/.env` and fill in the Project URL and the
   publishable key from **Project Settings > API Keys**. Never use the secret
   key here, and never commit `.env`.
5. Restart `npm run dev`. The app now opens on a sign-in screen, and the
   Profile contact details are saved per user in Supabase.

Demo app: use fictional data only.

## Deploying

`npm run build` produces plain static files. Any static host works — Netlify,
Vercel, GitHub Pages. The web manifest ships with it, so the app installs to a
phone home screen from the deployed URL.
