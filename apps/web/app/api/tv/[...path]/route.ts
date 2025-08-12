import { NextRequest, NextResponse } from 'next/server';
import { provider } from '@/lib/data';

export async function GET(
  req: NextRequest,
  { params }: { params: { path: string[] } },
) {
  const [endpoint] = params.path;
  const url = req.nextUrl;
  if (endpoint === 'time') {
    return NextResponse.json(Math.floor(Date.now() / 1000));
  }
  if (endpoint === 'search') {
    const query = url.searchParams.get('query')?.toLowerCase() || '';
    const assets = await provider.listAssets();
    return NextResponse.json(
      assets
        .filter(
          (a) =>
            a.symbol.toLowerCase().includes(query) ||
            a.name.toLowerCase().includes(query),
        )
        .map((a) => ({
          symbol: a.symbol,
          full_name: a.name,
          description: a.name,
        })),
    );
  }
  if (endpoint === 'symbols') {
    const symbol = url.searchParams.get('symbol');
    const asset = symbol ? await provider.getAsset(symbol) : null;
    if (!asset) return NextResponse.json({ s: 'error', errmsg: 'not found' });
    return NextResponse.json({
      name: asset.name,
      ticker: asset.symbol,
      type: 'stock',
      session: '24x7',
      has_intraday: true,
      supported_resolutions: ['60', '240', 'D', 'W', 'M'],
    });
  }
  if (endpoint === 'history') {
    const symbol = url.searchParams.get('symbol');
    const resolution = url.searchParams.get('resolution') || 'D';
    const from = Number(url.searchParams.get('from') || 0) * 1000;
    const to = Number(url.searchParams.get('to') || Date.now()) * 1000;
    if (!symbol) return NextResponse.json({ s: 'error', errmsg: 'no symbol' });
    const range = '1M'; // Simplified mapping
    const candles = await provider.getCandles(symbol, range);
    const filtered = candles.filter((c) => c.t >= from && c.t <= to);
    return NextResponse.json({
      s: 'ok',
      t: filtered.map((c) => Math.floor(c.t / 1000)),
      o: filtered.map((c) => c.o),
      h: filtered.map((c) => c.h),
      l: filtered.map((c) => c.l),
      c: filtered.map((c) => c.c),
      v: filtered.map((c) => c.v),
    });
  }
  return NextResponse.json({ error: 'Unknown endpoint' }, { status: 404 });
}
