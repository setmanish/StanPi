import { z } from 'zod';

export const paginationSchema = z.object({
  search: z.string().trim().default(''),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});

export const symbolSchema = z.object({
  symbol: z.string().min(1),
});

export const candlesSchema = z.object({
  symbol: z.string().min(1),
  range: z.enum(['1D', '1W', '1M', '1Y', 'ALL']).default('1M'),
});
