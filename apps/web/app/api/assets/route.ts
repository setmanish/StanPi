import { NextRequest, NextResponse } from 'next/server';
import { provider } from '@/lib/data';
import { paginationSchema } from '@/lib/zod';

export async function GET(req: NextRequest) {
  const parsed = paginationSchema.safeParse(
    Object.fromEntries(req.nextUrl.searchParams),
  );
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 },
    );
  }
  const { search, page, pageSize } = parsed.data;
  const assets = await provider.listAssets();
  const filtered = assets.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.symbol.toLowerCase().includes(search.toLowerCase()),
  );
  const start = (page - 1) * pageSize;
  const paged = filtered.slice(start, start + pageSize);
  return NextResponse.json({ total: filtered.length, data: paged });
}
