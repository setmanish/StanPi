import { describe, it, expect } from 'vitest';
import { paginationSchema } from '@/lib/zod';

describe('pagination schema', () => {
  it('parses defaults', () => {
    const result = paginationSchema.parse({});
    expect(result.page).toBe(1);
    expect(result.pageSize).toBe(20);
  });
  it('rejects invalid', () => {
    expect(() => paginationSchema.parse({ page: 0 })).toThrow();
  });
});
