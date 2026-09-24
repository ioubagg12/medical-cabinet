import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './shared/fonts.css'
import './shared/styles.css'
import App from './App.jsx'
import AuthGate from './shared/AuthGate.jsx'
import { connectProfile } from './tabs/profile/index.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthGate onSignedIn={connectProfile}>
      <App />
    </AuthGate>
  </StrictMode>,
)
