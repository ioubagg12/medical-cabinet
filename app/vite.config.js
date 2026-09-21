import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Profile contact edits save through serve.py (/api/contact). Run it next to
    // the dev server to save to disk; without it, edits stay in the browser.
    proxy: { '/api': 'http://localhost:8000' },
  },
})
