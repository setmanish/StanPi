/**
 * Shared data types for the data layer.
 * Swap out the mock provider with a real API implementation later.
 */
export type Asset = {
  id: string;
  rank: number;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  spark?: number[];
};
export type Candle = { t: number; o: number; h: number; l: number; c: number };
export interface DataProvider {
  listAssets(params?: { search?: string; sort?: string }): Promise<Asset[]>;
  getHistory(id: string, range: '1D'|'1W'|'1M'|'1Y'|'ALL'): Promise<Candle[]>;
}
