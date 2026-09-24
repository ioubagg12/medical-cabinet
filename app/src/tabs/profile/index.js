// Public entry of the Profile tab. The app shell imports only from this file.
// contact.js must run before the first render: it loads the saved contact
// details and defines window.MC_meta / window.MC_edit.
import './contact.js'
import './profile.css'

export { default as ProfileScreen } from './ProfileScreen.jsx'

// Called by the sign-in gate after sign-in: loads this user's contact details from Supabase.
export const connectProfile = (supabase, user) => window.MC_connectContact(supabase, user.id)
