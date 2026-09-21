// Mirror the built app into the local copy people actually run.
import { cpSync, readdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'

const dest = process.env.MC_SYNC_DEST
  ?? 'C:/Users/VivoS/Downloads/medical-cabinet_1/medical-cabinet'

// contact.json holds the contact details saved through serve.py: keep it.
const KEEP = new Set(['contact.json'])
for (const name of readdirSync(dest)) {
  if (!KEEP.has(name)) rmSync(join(dest, name), { recursive: true, force: true })
}
cpSync('dist', dest, { recursive: true })
console.log(`synced dist -> ${dest}`)
