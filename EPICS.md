# Medical Cabinet: epics and code ownership

The app is split into **5 epics, one per bottom-nav tab**. Each epic owns one folder under `app/src/tabs/`.
Two people working on different epics edit different files, so their changes do not conflict.

| # | Epic | Folder | What it covers |
|---|------|--------|----------------|
| 1 | **Me** | `app/src/tabs/me/` | Body map, organ chips, check-up tracker (status summary, due dates), "Log new check-up", uploaded files per organ, scheduling rules (`checkup.js`, tested by `npm run check`) |
| 2 | **My Doctor** | `app/src/tabs/my-doctor/` | Doctor card, fake-message notice, quick actions (Call, Write, Book appointment, Start video), tiles (Prescriptions, Test results, Vaccinations, Family), header bell |
| 3 | **Messages** | `app/src/tabs/messages/` | Inbox list, message view, compose sheet, "message sent" toast, header compose button |
| 4 | **Journal** | `app/src/tabs/journal/` | Blood test advice (card + sub-page built only from the blood analysis: markers, nutrition/exercise tips; `AdvicePage.jsx`, data in `advice.js`), record categories (Medicine, Lab results, Diagnoses, Vaccinations), health timeline |
| 5 | **Profile** | `app/src/tabs/profile/` | Personal facts, flags (allergies, donor), settings rows, contact edit sheet (`contact.js`) and its `/api/contact` save in `app/public/serve.py` |

## Shared core (not part of any epic)

These files affect every tab. Change them in a small, separate pull request and tell the other person first.

- `app/src/App.jsx`: phone frame, status bar, greeting header, tab switching, bottom nav
- `app/src/main.jsx`, `app/index.html`, `app/vite.config.js`, `app/package.json`
- `app/src/shared/`: icon helpers + tab icons (`icons.jsx`), base CSS, fonts
- `app/public/` and `app/scripts/` (except the Profile part of `serve.py`)

## Folder layout of an epic

```
app/src/tabs/<tab>/
  index.js        public entry: the ONLY file App.jsx imports from
  <Tab>Screen.jsx the screen component
  use<Tab>.js     state hook, for tabs whose state must survive switching tabs
  data.js(x)      static content for the tab
  <tab>.css       hover styles; class names start with the tab prefix
```

## Rules for working in parallel

1. **Stay in your folder.** Epic work changes only `app/src/tabs/<your-tab>/`.
2. **Import other tabs only through their `index.js`.** Never reach into another tab's files.
3. **Prefix CSS class names with your tab**: `me-`, `doctor-`, `messages-`, `journal-`, `profile-`. Then two people can never create the same class name.
4. **Keep the cross-tab contracts stable.** If you must change one, agree with the other tab's owner first:
   - `App.jsx` renders `MessagesOverlays` (message view, compose, toast) above every tab.
   - `App.jsx` shows `DoctorHeaderAction` / `MessagesHeaderAction` in the header for those tabs.
   - `contact.js` (Profile) mounts its edit sheet inside the `.mc-phone` element from `App.jsx`.
5. **One branch per epic** (e.g. `epic/me`, `epic/messages`). Merge often and keep pull requests small.
6. **A new tab** means a new `app/src/tabs/<tab>/` folder plus a shared-core change to `App.jsx` and `TABS` in `app/src/shared/icons.jsx`.
