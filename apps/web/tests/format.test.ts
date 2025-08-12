import { describe, it, expect } from 'vitest';
import { formatCurrency, formatPercent } from '@/lib/format';

describe('format helpers', () => {
  it('formats currency', () => {
    expect(formatCurrency(12.5)).toBe('$12.50');
  });
  it('formats percent', () => {
    expect(formatPercent(-1.234)).toBe('-1.23%');
  });
});
