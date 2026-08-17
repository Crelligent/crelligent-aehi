import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Here we would typically submit to HubSpot CRM via their Forms API.
    console.log('Institutional inquiry request:', data);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Submission failed' }, { status: 500 });
  }
}
