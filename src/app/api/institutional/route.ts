import { NextResponse } from 'next/server'
import { z } from 'zod'
import { allow, clientIp, notifyAdmin, saveInterest } from '@/lib/store'

export const dynamic = 'force-dynamic'

const schema = z.object({
  firstName: z.string().trim().min(2).max(60),
  lastName: z.string().trim().min(2).max(60),
  email: z.string().trim().toLowerCase().email().max(254),
  institution: z.string().trim().min(2).max(160),
  institutionType: z.string().trim().min(2).max(80),
  interest: z.string().trim().min(2).max(80),
  message: z.string().trim().max(1500).optional(),
  consent: z.literal(true),
  website: z.string().optional(), // honeypot
})

/** POST /api/institutional: research partnership and data-access enquiries. */
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
  if (!allow(`inst:${clientIp(req)}`)) return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 })

  try {
    await saveInterest({
      kind: 'partner_inquiry',
      name: `${d.firstName} ${d.lastName}`,
      email: d.email,
      organisation: d.institution,
      org_type: d.institutionType,
      interest: d.interest,
      message: d.message ?? null,
      consent: true,
      user_agent: req.headers.get('user-agent')?.slice(0, 300) ?? null,
    })
    await notifyAdmin(`AEHI: ${d.interest} enquiry from ${d.institution}`, [
      `Name: ${d.firstName} ${d.lastName}`,
      `Email: ${d.email}`,
      `Institution: ${d.institution} (${d.institutionType})`,
      `Interest: ${d.interest}`,
      '',
      d.message ?? '',
    ], d.email)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[aehi] institutional save failed', err instanceof Error ? err.message : err)
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 })
  }
}
