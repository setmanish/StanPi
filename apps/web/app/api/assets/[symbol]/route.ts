import { NextRequest, NextResponse } from 'next/server';
import { provider } from '@/lib/data';

export async function GET(
  _req: NextRequest,
  { params }: { params: { symbol: string } },
) {
  const asset = await provider.getAsset(params.symbol);
  if (!asset) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(asset);
}
