/**
 * Saves AEHI site submissions to Supabase (table public.aehi_interest) over the REST API.
 * Server-only. Needs SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) and SUPABASE_SECRET_KEY in the
 * environment. Never expose the secret key to the browser.
 */
export type InterestKind = 'edition_notify' | 'partner_inquiry'

export interface InterestRow {
  kind: InterestKind
  name: string
  email: string
  organisation?: string | null
  role?: string | null
  org_type?: string | null
  interest?: string | null
  message?: string | null
  country?: string | null
  consent: boolean
  user_agent?: string | null
}

export async function saveInterest(row: InterestRow): Promise<void> {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SECRET_KEY
  if (!url || !key) throw new Error('Storage is not configured (SUPABASE_URL / SUPABASE_SECRET_KEY)')

  const headers: Record<string, string> = {
    apikey: key,
    'Content-Type': 'application/json',
    Prefer: 'return=minimal',
  }
  // Legacy JWT service keys also need the Authorization header; new sb_secret_ keys use apikey only.
  if (key.startsWith('eyJ')) headers.Authorization = `Bearer ${key}`

  const res = await fetch(`${url.replace(/\/$/, '')}/rest/v1/aehi_interest`, {
    method: 'POST',
    headers,
    body: JSON.stringify(row),
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`Supabase insert failed: ${res.status} ${await res.text().catch(() => '')}`)
}

/** Optional email to admin@ via Resend. Skips silently when RESEND_API_KEY is not set. Never throws. */
export async function notifyAdmin(subject: string, lines: string[], replyTo?: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.AEHI_NOTIFY_FROM || 'AEHI <aehi@crelligent.com>',
        to: ['admin@crelligent.com'],
        reply_to: replyTo,
        subject,
        text: lines.join('\n'),
      }),
      signal: AbortSignal.timeout(8000),
    })
  } catch (err) {
    console.error('[aehi] notify failed', err instanceof Error ? err.message : err)
  }
}

/** Very small in-memory rate limit per IP (per server instance). */
const hits = new Map<string, number[]>()
export function allow(ip: string, limit = 5, windowMs = 60 * 60 * 1000): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs)
  if (recent.length >= limit) return false
  recent.push(now)
  hits.set(ip, recent)
  return true
}

export function clientIp(req: Request): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown'
}
