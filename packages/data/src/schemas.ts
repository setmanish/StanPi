/**
 * Zod schemas validating data from providers.
 * Replace when hooking up to a real API.
 */
import { z } from 'zod';

export const assetSchema = z.object({
  id: z.string(),
  rank: z.number(),
  symbol: z.string(),
  name: z.string(),
  price: z.number(),
  change24h: z.number(),
  volume24h: z.number(),
  marketCap: z.number(),
  spark: z.array(z.number()).optional(),
});

export const candleSchema = z.object({
  t: z.number(),
  o: z.number(),
  h: z.number(),
  l: z.number(),
  c: z.number(),
});

export const assetArraySchema = z.array(assetSchema);
export const candleArraySchema = z.array(candleSchema);
