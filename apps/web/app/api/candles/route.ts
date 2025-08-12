import { NextRequest, NextResponse } from 'next/server';
import { provider } from '@/lib/data';
import { candlesSchema } from '@/lib/zod';

export async function GET(req: NextRequest) {
  const parsed = candlesSchema.safeParse(
    Object.fromEntries(req.nextUrl.searchParams),
  );
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 },
    );
  }
  const { symbol, range } = parsed.data;
  const data = await provider.getCandles(symbol, range);
  return NextResponse.json(data);
}
