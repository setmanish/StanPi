import { NextRequest, NextResponse } from 'next/server';

// Demo endpoint: no persistence, returns 200
export async function POST(
  _req: NextRequest,
  { params }: { params: { symbol: string } },
) {
  return NextResponse.json({ symbol: params.symbol, watched: true });
}
