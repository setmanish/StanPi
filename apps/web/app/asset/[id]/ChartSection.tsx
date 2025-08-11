"use client";

import { useEffect, useState } from "react";
import type { Candle } from "@stanpi/data";
import Chart, { Renderer } from "@/app/components/chart/Chart";

interface ChartSectionProps {
  symbol: string;
  candles: Candle[];
}

export default function ChartSection({ symbol, candles }: ChartSectionProps) {
  const [renderer, setRenderer] = useState<Renderer>("lightweight");

  useEffect(() => {
    const stored = localStorage.getItem("activeRenderer") as Renderer | null;
    if (stored) setRenderer(stored);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value as Renderer;
    setRenderer(value);
    localStorage.setItem("activeRenderer", value);
  }

  return (
    <div className="relative">
      <div className="absolute right-0 top-0 z-10">
        <select
          className="border rounded p-1 text-sm"
          value={renderer}
          onChange={handleChange}
        >
          <option value="lightweight">Lightweight</option>
          <option value="tradingview-library">TV Library</option>
          <option value="tradingview-widget">TV Widget</option>
        </select>
      </div>
      <Chart renderer={renderer} symbol={symbol} range="1M" candles={candles} />
    </div>
  );
}
