import { createMockProvider } from '@stanpi/data';

const base = createMockProvider(42);

export const provider = {
  ...base,
  async getAsset(symbol: string) {
    const list = await base.listAssets();
    return list.find((a) => a.symbol === symbol);
  },
  async getCandles(symbol: string, range: '1D' | '1W' | '1M' | '1Y' | 'ALL') {
    const asset = await provider.getAsset(symbol);
    if (!asset) return [];
    return base.getHistory(asset.id, range);
  },
};
