"use client";

import { useState } from 'react';
import type { Candle } from "@stanpi/data";
import AdvancedChart from "./tv/AdvancedChart";
import EmbeddedWidget from "./tv/EmbeddedWidget";
import LWCChart from "./lwc/LWCChart";

export type Renderer =
  | "tradingview-library"
  | "tradingview-widget"
  | "lightweight";

export interface ChartProps {
  renderer: Renderer;
  symbol: string;
  range: "1D" | "1W" | "1M" | "1Y" | "ALL";
  theme?: "light" | "dark" | "pastel";
  /**
   * Candle history used by the lightweight chart fallback.
   * When switching renderers we persist the choice in localStorage
   * (see Asset page – simple settings UI to flip renderers coming later).
   */
  candles?: Candle[];
}

export default function Chart({
  renderer,
  symbol,
  range,
  theme,
  candles = [],
}: ChartProps) {
  const [fallback, setFallback] = useState(false);

  if (fallback || renderer === "lightweight") {
    return fallback ? (
      <>
        <p className="mb-2 text-sm text-red-600">TradingView library not found. Falling back to lightweight charts.</p>
        <LWCChart candles={candles} theme={theme} />
      </>) : (
        <LWCChart candles={candles} theme={theme} />
      );
  }

  if (renderer === "tradingview-widget") {
    return <EmbeddedWidget symbol={symbol} theme={theme} />;
  }

  if (renderer === "tradingview-library") {
    return (
      <AdvancedChart
        symbol={symbol}
        range={range}
        theme={theme}
        onUnavailable={() => setFallback(true)}
      />
    );
  }

  return null;
}
