#!/usr/bin/env node
/**
 * Regenerate WebP companions for key raster assets (requires `cwebp` on PATH).
 * Run: npm run optimize-images
 */
import { execSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { readdirSync, statSync } from 'node:fs'
import { join, extname } from 'node:path'

const root = join(import.meta.dirname, '..')

const targets = [
  'public/corporate',
  'public/home',
  'public',
]

const exts = new Set(['.jpg', '.jpeg', '.png'])

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p, out)
    else if (exts.has(extname(name).toLowerCase())) out.push(p)
  }
  return out
}

let converted = 0
for (const rel of targets) {
  const dir = join(root, rel)
  if (!existsSync(dir)) continue
  for (const file of walk(dir)) {
    const webp = file.replace(/\.(jpe?g|png)$/i, '.webp')
    try {
      execSync(`cwebp -quiet -q 82 "${file}" -o "${webp}"`, { stdio: 'inherit' })
      converted++
    } catch {
      console.warn(`Skip (cwebp failed): ${file}`)
    }
  }
}

console.log(`WebP update complete (${converted} files).`)
