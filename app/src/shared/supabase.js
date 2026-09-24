// Supabase client. Owned by: shared core.
// Reads the project URL and publishable key from app/.env (see app/.env.example).
// Without them `supabase` is null and the app runs as before: no sign-in,
// contact details saved through serve.py or in the browser.
import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export const supabase = url && key ? createClient(url, key) : null
