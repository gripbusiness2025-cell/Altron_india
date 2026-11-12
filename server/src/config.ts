import 'dotenv/config'

function requireEnv(name: string, optional = false): string {
  const v = process.env[name]?.trim()
  if (!v && !optional) {
    throw new Error(`Missing environment variable: ${name}`)
  }
  return v || ''
}

export const config = {
  port: Number(process.env.PORT || 3001),
  mongoUri: requireEnv('MONGODB_URI'),
  adminApiKey: requireEnv('ADMIN_API_KEY', true),
  jwtSecret: requireEnv('JWT_SECRET', true) || 'dev-only-change-me',
  corsOrigin: process.env.CORS_ORIGIN?.split(',').map((s) => s.trim()) || ['http://localhost:5173'],
}
