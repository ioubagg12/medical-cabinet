// Sign-in gate. Owned by: shared core.
// With Supabase configured, the app renders only for a signed-in user;
// `onSignedIn(supabase, user)` runs first so tabs can load that user's data.
// Without Supabase (no app/.env), children render as before.
import { useEffect, useState } from 'react'
import { supabase } from './supabase.js'

const INK = '#15160f', GREY = '#6d7069', GREEN = '#00b070'
const input = { font: 'inherit', fontSize: '16px', fontWeight: 600, color: INK, background: '#f6f7f4', border: '1.5px solid #e3e5df', borderRadius: '14px', padding: '13px 14px', width: '100%' }
const label = { fontSize: '11px', fontWeight: 700, color: GREY, display: 'flex', flexDirection: 'column', gap: '6px' }
const button = { font: 'inherit', fontSize: '15px', fontWeight: 800, border: 0, borderRadius: '16px', minHeight: '50px', cursor: 'pointer', background: GREEN, color: '#fff' }
const page = { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '28px 16px' }

export default function AuthGate({ children, onSignedIn }) {
  const [session, setSession] = useState(undefined) // undefined = still checking
  const [readyFor, setReadyFor] = useState(null)
  const userId = session?.user.id

  useEffect(() => {
    if (!supabase) return
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data } = supabase.auth.onAuthStateChange((_event, s) => setSession(s))
    return () => data.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!userId) return
    Promise.resolve(onSignedIn?.(supabase, session.user))
      .catch((e) => console.error('Loading user data failed', e))
      .finally(() => setReadyFor(userId))
    // Runs once per signed-in user, not on every token refresh.
  }, [userId])

  if (!supabase) return children
  if (session === undefined || (userId && readyFor !== userId)) return <div style={page}><span style={{ color: GREY, fontWeight: 600 }}>Loading…</span></div>
  if (!session) return <SignIn />
  return (
    <>
      <div style={{ position: 'fixed', top: '12px', right: '16px', zIndex: 100, display: 'flex', gap: '10px', alignItems: 'center', fontSize: '13px', fontWeight: 600, color: GREY }}>
        <span>{session.user.email}</span>
        <button type="button" onClick={() => supabase.auth.signOut()} style={{ ...button, minHeight: '34px', padding: '0 14px', fontSize: '13px', background: '#e6e7e3', color: INK }}>Sign out</button>
      </div>
      {children}
    </>
  )
}

function SignIn() {
  const [mode, setMode] = useState('signin') // 'signin' | 'signup'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState(null) // { text, error }

  async function submit(e) {
    e.preventDefault()
    setBusy(true); setMessage(null)
    const { data, error } = mode === 'signin'
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password })
    setBusy(false)
    if (error) setMessage({ text: error.message === 'Failed to fetch' ? 'Cannot reach the server. Check your connection.' : error.message, error: true })
    else if (mode === 'signup' && !data.session) setMessage({ text: 'Account created. Check your email to confirm it, then sign in.' })
  }

  const signup = mode === 'signup'
  return (
    <div style={page}>
      <form onSubmit={submit} style={{ width: '100%', maxWidth: '360px', background: '#fff', borderRadius: '28px', padding: '28px 22px', display: 'flex', flexDirection: 'column', gap: '14px', boxShadow: '0 20px 60px rgba(0,0,0,.12)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-.4px', color: INK }}>Medical Cabinet</span>
          <span style={{ fontSize: '14px', fontWeight: 500, color: GREY }}>{signup ? 'Create an account' : 'Sign in to your account'}</span>
        </div>
        <label style={label}>Email
          <input style={input} type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label style={label}>Password
          <input style={input} type="password" autoComplete={signup ? 'new-password' : 'current-password'} required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        {message && <span role="status" style={{ fontSize: '13px', fontWeight: 600, color: message.error ? '#a8321f' : '#026b48' }}>{message.text}</span>}
        <button type="submit" disabled={busy} style={{ ...button, opacity: busy ? 0.6 : 1 }}>{busy ? 'Please wait…' : signup ? 'Create account' : 'Sign in'}</button>
        <button type="button" onClick={() => { setMode(signup ? 'signin' : 'signup'); setMessage(null) }} style={{ ...button, background: 'none', color: INK, minHeight: '36px', fontWeight: 700 }}>
          {signup ? 'I already have an account' : 'Create a new account'}
        </button>
        <span style={{ fontSize: '12px', fontWeight: 600, color: '#7a5a18', background: '#fdf3e0', borderRadius: '12px', padding: '9px 12px' }}>Demo app: use fictional data only.</span>
      </form>
    </div>
  )
}
