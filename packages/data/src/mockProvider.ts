/**
 * Deterministic mock data provider used during early development.
 * Swap this out for a real API client when backend endpoints exist.
 */
import { assetArraySchema, candleArraySchema } from './schemas';
import type { Asset, Candle, DataProvider } from './types';

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createMockProvider(seed = 42): DataProvider {
  const rand = mulberry32(seed);

  const assets: Asset[] = Array.from({ length: 50 }, (_, i) => {
    const price = rand() * 1000 + 1;
    const change24h = (rand() - 0.5) * 20;
    const volume24h = rand() * 1_000_000;
    const marketCap = rand() * 1_000_000_000;
    const spark = Array.from({ length: 24 }, () => rand() * 100);
    return {
      id: `asset-${i + 1}`,
      rank: i + 1,
      symbol: `AST${(i + 1).toString().padStart(2, '0')}`,
      name: `Asset ${i + 1}`,
      price: Number(price.toFixed(2)),
      change24h: Number(change24h.toFixed(2)),
      volume24h: Math.round(volume24h),
      marketCap: Math.round(marketCap),
      spark: spark.map((v) => Number(v.toFixed(2))),
    };
  });
  const assetList = assetArraySchema.parse(assets);

  return {
    async listAssets(params) {
      let list = assetList;
      if (params?.search) {
        const q = params.search.toLowerCase();
        list = list.filter(
          (a) =>
            a.name.toLowerCase().includes(q) ||
            a.symbol.toLowerCase().includes(q)
        );
      }
      if (params?.sort) {
        const dir = params.sort.startsWith('-') ? -1 : 1;
        const key = params.sort.replace(/^[-+]/, '');
        list = [...list].sort(
          (a: any, b: any) => (a[key] > b[key] ? dir : -dir)
        );
      }
      return assetArraySchema.parse(list);
    },
    async getHistory(id, range) {
      const base = assetList.find((a) => a.id === id)?.price ?? 100;
      const rangeMap: Record<string, number> = {
        '1D': 24,
        '1W': 7 * 24,
        '1M': 30 * 24,
        '1Y': 365,
        ALL: 365 * 5,
      };
      const count = rangeMap[range];
      const step = range === '1Y' || range === 'ALL' ? 86_400_000 : 3_600_000;
      const now = Date.now();
      let prev = base;
      const candles: Candle[] = Array.from({ length: count }, (_, i) => {
        const t = now - (count - i) * step;
        const o = prev;
        const change = (rand() - 0.5) * (base * 0.02);
        const c = o + change;
        const h = Math.max(o, c) + rand() * base * 0.01;
        const l = Math.min(o, c) - rand() * base * 0.01;
        prev = c;
        return {
          t,
          o: Number(o.toFixed(2)),
          h: Number(h.toFixed(2)),
          l: Number(l.toFixed(2)),
          c: Number(c.toFixed(2)),
        };
      });
      return candleArraySchema.parse(candles);
    },
  };
}
