// Mirror the built app into the local copy people actually run.
import { cpSync, readdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'

const dest = process.env.MC_SYNC_DEST
  ?? 'C:/Users/VivoS/Downloads/medical-cabinet_1/medical-cabinet'

for (const name of readdirSync(dest)) rmSync(join(dest, name), { recursive: true, force: true })
cpSync('dist', dest, { recursive: true })
console.log(`synced dist -> ${dest}`)
