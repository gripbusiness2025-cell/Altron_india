#!/usr/bin/env node
/**
 * WebP + responsive width variants (`{name}-{w}w.webp` and matching raster).
 * Requires `cwebp`; `sips` for raster fallbacks (macOS).
 * Run: npm run optimize-images
 */
import { execSync } from 'node:child_process'
import { existsSync, readdirSync, statSync } from 'node:fs'
import { join, extname, basename } from 'node:path'

const root = join(import.meta.dirname, '..')
const QUALITY = 82

const WIDTH_PRESETS = {
  banner: [480, 768, 1200, 1920],
  logo: [120, 200, 400],
  homeFeature: [480, 768, 1024, 1280],
  reviewBadge: [280, 400, 560],
  clientLogo: [120, 200],
}

function imageWidth(file) {
  try {
    const out = execSync(`sips -g pixelWidth "${file}"`, { encoding: 'utf8' })
    const m = out.match(/pixelWidth:\s*(\d+)/)
    return m ? Number(m[1]) : 9999
  } catch {
    return 9999
  }
}

function toWebp(input, output, width) {
  const resize = width > 0 ? `-resize ${width} 0` : ''
  execSync(`cwebp -quiet -q ${QUALITY} ${resize} "${input}" -o "${output}"`, { stdio: 'pipe' })
}

function presetFor(relFromPublic) {
  const name = basename(relFromPublic).toLowerCase()
  if (relFromPublic.startsWith('corporate/banner')) return WIDTH_PRESETS.banner
  if (name === 'altronlogo.png') return WIDTH_PRESETS.logo
  if (relFromPublic.startsWith('home/clients/')) return WIDTH_PRESETS.clientLogo
  if (name.includes('google-review')) return WIDTH_PRESETS.reviewBadge
  if (relFromPublic.startsWith('home/')) return WIDTH_PRESETS.homeFeature
  if (relFromPublic.startsWith('corporate/')) return WIDTH_PRESETS.homeFeature
  return [480, 768, 1200]
}

const exts = new Set(['.jpg', '.jpeg', '.png'])

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p, out)
    else if (exts.has(extname(name).toLowerCase()) && !/-\d+w\.(jpe?g|png)$/i.test(name)) {
      out.push(p)
    }
  }
  return out
}

const publicDir = join(root, 'public')
const sources = walk(publicDir)

let legacyWebp = 0
let variants = 0

for (const file of sources) {
  const rel = file.slice(publicDir.length + 1)
  const webp = file.replace(/\.(jpe?g|png)$/i, '.webp')

  try {
    toWebp(file, webp, 0)
    legacyWebp++
  } catch {
    console.warn(`Skip legacy WebP: ${rel}`)
    continue
  }

  const nativeW = imageWidth(file)
  const preset = presetFor(rel)
  const widths = [...new Set(preset.map((w) => Math.min(w, nativeW)))].sort((a, b) => a - b)

  const stem = file.replace(/\.(jpe?g|png)$/i, '')
  const ext = extname(file)

  for (const targetW of widths) {
    const outWebp = `${stem}-${targetW}w.webp`
    const outRaster = `${stem}-${targetW}w${ext}`
    try {
      toWebp(file, outWebp, targetW)
      variants++
    } catch {
      console.warn(`Skip WebP ${targetW}w: ${rel}`)
    }
    if (process.platform === 'darwin' && !existsSync(outRaster)) {
      try {
        execSync(`sips --resampleWidth ${targetW} "${file}" --out "${outRaster}"`, { stdio: 'pipe' })
      } catch {
        /* optional */
      }
    }
  }
}

console.log(`WebP legacy: ${legacyWebp}, responsive variants: ${variants}`)
