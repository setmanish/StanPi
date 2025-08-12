import { describe, it, expect } from 'vitest';
import { rangeToResolution } from '@/lib/chart';

describe('rangeToResolution', () => {
  it('maps ranges', () => {
    expect(rangeToResolution('1D')).toBe('60');
    expect(rangeToResolution('1M')).toBe('D');
  });
});
