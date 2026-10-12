import { NextResponse } from 'next/server'
import { z } from 'zod'
import { allow, clientIp, notifyAdmin, saveInterest } from '@/lib/store'

export const dynamic = 'force-dynamic'

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().toLowerCase().email().max(254),
  organisation: z.string().trim().min(2).max(160),
  role: z.string().trim().max(120).optional(),
  country: z.string().trim().max(80).optional(),
  consent: z.literal(true),
  website: z.string().optional(), // honeypot
})

/** POST /api/notify: "tell me when the inaugural edition publishes". */
export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ ok: false, error: 'validation' }, { status: 400 })
  const d = parsed.data
  if (d.website) return NextResponse.json({ ok: true })
  if (!allow(`notify:${clientIp(req)}`)) return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 })

  try {
    await saveInterest({
      kind: 'edition_notify',
      name: d.name,
      email: d.email,
      organisation: d.organisation,
      role: d.role ?? null,
      country: d.country ?? null,
      consent: true,
      user_agent: req.headers.get('user-agent')?.slice(0, 300) ?? null,
    })
    await notifyAdmin(`AEHI: edition sign-up from ${d.organisation}`, [
      `Name: ${d.name}`,
      `Email: ${d.email}`,
      `Organisation: ${d.organisation}`,
      `Role: ${d.role ?? '-'}`,
      `Country: ${d.country ?? '-'}`,
    ], d.email)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[aehi] notify save failed', err instanceof Error ? err.message : err)
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 })
  }
}
