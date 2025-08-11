import React from 'react';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { render, screen, fireEvent, within, act, cleanup } from '@testing-library/react';
import type { Asset } from '@stanpi/data';
import MarketTable from '../MarketTable';

// Mock next/router to capture navigation
const push = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
}));

// Reusable mock asset list with edge cases:
// - rank on third asset is a string to trigger the string sort fallback
// - third asset omits the spark property to ensure missing data is handled
const assets: Asset[] = [
  {
    id: '1',
    name: 'Alpha',
    symbol: 'ALP',
    rank: 1,
    price: 2,
    change24h: 1,
    volume24h: 20,
    marketCap: 200,
    spark: [1, 2, 3],
  },
  {
    id: '2',
    name: 'Beta',
    symbol: 'BET',
    rank: 2,
    price: 3,
    change24h: -2,
    volume24h: 10,
    marketCap: 100,
    spark: [1, 1, 1],
  },
  {
    id: '3',
    name: 'Gamma',
    symbol: 'gam',
    rank: 'z' as any,
    price: 1,
    change24h: 0,
    volume24h: 30,
    marketCap: 300,
    // spark intentionally missing
  },
];

function bodyNames() {
  return screen
    .getAllByRole('row')
    .slice(1)
    .map((row) => within(row).getByText(/Alpha|Beta|Gamma/).textContent);
}

beforeEach(() => {
  push.mockClear();
});

afterEach(() => {
  cleanup();
  vi.clearAllTimers();
  vi.useRealTimers();
});

describe('MarketTable', () => {
  it('renders an empty table when no assets are provided', () => {
    render(<MarketTable assets={[]} />);
    expect(screen.getAllByRole('row')).toHaveLength(1);
  });

  it('renders a single asset row with all columns and navigates on click', () => {
    render(<MarketTable assets={[assets[0]]} />);
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(2);
    const cells = within(rows[1]).getAllByRole('cell');
    expect(cells[0].textContent).toBe('1');
    expect(within(cells[1]).getByText('Alpha')).toBeTruthy();
    expect(within(cells[1]).getByText('ALP')).toBeTruthy();
    expect(cells[2].textContent).toBe('$2.00');
    expect(cells[3].textContent).toBe('+1.00%');
    expect(cells[4].textContent).toBe('20');
    expect(cells[5].textContent).toBe('200');
    expect(cells[6].querySelector('svg')).toBeTruthy();
    fireEvent.click(rows[1]);
    expect(push).toHaveBeenCalledWith('/asset/1');
  });

  it('filters by name and symbol case-insensitively', async () => {
    vi.useFakeTimers();
    render(<MarketTable assets={assets} />);
    const input = screen.getByPlaceholderText(/search assets/i);

    // Filter by name
    fireEvent.change(input, { target: { value: 'gamma' } });
    await act(async () => {
      vi.advanceTimersByTime(250);
    });
    expect(bodyNames()).toEqual(['Gamma']);

    // Filter by symbol (case insensitive)
    fireEvent.change(input, { target: { value: 'bet' } });
    await act(async () => {
      vi.advanceTimersByTime(250);
    });
    expect(bodyNames()).toEqual(['Beta']);
  });

  it('debounces search input ~250ms', async () => {
    vi.useFakeTimers();
    render(<MarketTable assets={assets} />);
    const input = screen.getByPlaceholderText(/search assets/i);
    fireEvent.change(input, { target: { value: 'alp' } });
    expect(bodyNames().length).toBe(3); // immediate list unchanged
    await act(async () => {
      vi.advanceTimersByTime(200);
    });
    expect(bodyNames().length).toBe(3); // still unchanged before debounce
    await act(async () => {
      vi.advanceTimersByTime(60);
    });
    expect(bodyNames()).toEqual(['Alpha']);
  });

  it('sorts numeric columns and toggles direction', () => {
    render(<MarketTable assets={assets} />);
    const click = (label: RegExp) =>
      fireEvent.click(screen.getByRole('button', { name: label }));

    click(/price/i);
    expect(bodyNames()).toEqual(['Gamma', 'Alpha', 'Beta']);
    click(/price/i);
    expect(bodyNames()).toEqual(['Beta', 'Alpha', 'Gamma']);

    click(/24h change/i);
    expect(bodyNames()).toEqual(['Beta', 'Gamma', 'Alpha']);
    click(/24h change/i);
    expect(bodyNames()).toEqual(['Alpha', 'Gamma', 'Beta']);

    click(/volume/i);
    expect(bodyNames()).toEqual(['Beta', 'Alpha', 'Gamma']);
    click(/volume/i);
    expect(bodyNames()).toEqual(['Gamma', 'Alpha', 'Beta']);

    click(/market cap/i);
    expect(bodyNames()).toEqual(['Beta', 'Alpha', 'Gamma']);
    click(/market cap/i);
    expect(bodyNames()).toEqual(['Gamma', 'Alpha', 'Beta']);
  });

  it('falls back to string comparison for non-numeric values', () => {
    render(<MarketTable assets={assets} />);
    fireEvent.click(screen.getByRole('button', { name: /rank/i }));
    expect(bodyNames()[0]).toBe('Gamma'); // string rank sorts last asc, first desc
  });

  it('navigates to the asset page when a row is clicked', () => {
    render(<MarketTable assets={assets} />);
    const row = screen.getByText('Alpha').closest('tr');
    if (!row) throw new Error('row not found');
    fireEvent.click(row);
    expect(push).toHaveBeenCalledWith('/asset/1');
  });
});
