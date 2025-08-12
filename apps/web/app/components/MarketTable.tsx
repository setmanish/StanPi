'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Asset } from '@stanpi/data';
import Sparkline from './Sparkline';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Column keys that support sorting. All current keys map to numeric Asset fields,
// but the sort routine below also guards against future string additions.
const sortKeys = [
  'rank',
  'price',
  'change24h',
  'volume24h',
  'marketCap',
] as const;
type SortKey = (typeof sortKeys)[number];

// Narrow unknown values to numbers at runtime
function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

interface MarketTableProps {
  assets: Asset[];
}

export default function MarketTable({ assets }: MarketTableProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [debounced, setDebounced] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('rank');
  const [ascending, setAscending] = useState(true);

  // Debounce the search input to avoid filtering on every keystroke
  useEffect(() => {
    const id = setTimeout(() => setDebounced(query), 250);
    return () => clearTimeout(id);
  }, [query]);

  // Filter and sort the asset list whenever dependencies change
  const list = useMemo(() => {
    const q = debounced.toLowerCase();
    const filtered = assets.filter(
      (a) =>
        a.name.toLowerCase().includes(q) || a.symbol.toLowerCase().includes(q),
    );
    const sorted = [...filtered].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      // Use numeric subtraction when both values are numbers; otherwise fall back
      // to string comparison. This prevents NaN results if a string slips in.
      const res =
        isNumber(av) && isNumber(bv)
          ? av - bv
          : String(av).localeCompare(String(bv));
      return ascending ? res : -res;
    });
    return sorted;
  }, [assets, debounced, sortKey, ascending]);

  // Toggle sort direction or switch column
  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setAscending(!ascending);
    } else {
      setSortKey(key);
      setAscending(true);
    }
  }

  // Helper to render arrow indicator
  function sortIndicator(key: SortKey) {
    if (sortKey !== key) return null;
    return ascending ? '▲' : '▼';
  }

  return (
    <Card className="overflow-x-auto">
      <div className="p-4">
        <Input
          placeholder="Search assets..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="mb-4 max-w-xs"
        />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('rank')}>
                  Rank {sortIndicator('rank')}
                </Button>
              </TableHead>
              <TableHead>Watch</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('price')}>
                  Price {sortIndicator('price')}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('change24h')}>
                  24h Change {sortIndicator('change24h')}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('volume24h')}>
                  Volume {sortIndicator('volume24h')}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('marketCap')}>
                  Market Cap {sortIndicator('marketCap')}
                </Button>
              </TableHead>
              <TableHead>Spark</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map((a) => (
              <TableRow
                key={a.symbol}
                onClick={() => router.push(`/asset/${a.symbol}`)}
                className="cursor-pointer hover:bg-blue-50"
              >
                <TableCell>{a.rank}</TableCell>
                <TableCell>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      fetch(`/api/assets/${a.symbol}/watchlist`, {
                        method: 'POST',
                      });
                    }}
                  >
                    ☆
                  </button>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{a.name}</span>
                    <span className="text-xs text-gray-500">{a.symbol}</span>
                  </div>
                </TableCell>
                <TableCell>${a.price.toFixed(2)}</TableCell>
                <TableCell
                  className={
                    a.change24h >= 0 ? 'text-green-600' : 'text-red-600'
                  }
                >
                  {a.change24h >= 0 ? '+' : ''}
                  {a.change24h.toFixed(2)}%
                </TableCell>
                <TableCell>{a.volume24h.toLocaleString()}</TableCell>
                <TableCell>{a.marketCap.toLocaleString()}</TableCell>
                <TableCell>
                  <Sparkline data={a.spark ?? []} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
