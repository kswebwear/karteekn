import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { email } = await req.json() as { email?: string }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  const ghostUrl = process.env.GHOST_URL!

  const res = await fetch(`${ghostUrl}/members/api/send-magic-link/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      emailType: 'subscribe',
      labels: [],
    }),
  })

  if (!res.ok) {
    return NextResponse.json({ error: 'Subscription failed' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
