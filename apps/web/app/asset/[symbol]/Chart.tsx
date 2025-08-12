'use client';
import { useState } from 'react';
import LightweightChart from '@/components/charts/LightweightChart';
import AdvancedChart from '@/components/charts/AdvancedChart';

type Candle = { t: number; o: number; h: number; l: number; c: number };

interface Props {
  symbol: string;
  candles: Candle[];
}

export default function AssetChart({ symbol, candles }: Props) {
  const [renderer, setRenderer] = useState<'light' | 'advanced'>('light');
  return (
    <div>
      <div className="mb-2 flex gap-2">
        <button className="underline" onClick={() => setRenderer('light')}>
          Lightweight
        </button>
        <button className="underline" onClick={() => setRenderer('advanced')}>
          TV Library
        </button>
      </div>
      {renderer === 'light' ? (
        <LightweightChart candles={candles} />
      ) : (
        <AdvancedChart
          symbol={symbol}
          onUnavailable={() => setRenderer('light')}
        />
      )}
    </div>
  );
}
