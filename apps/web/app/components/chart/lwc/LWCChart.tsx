"use client";

import { useEffect, useRef } from "react";
import { createChart, ColorType, UTCTimestamp } from "lightweight-charts";
import type { Candle } from "@stanpi/data";
import { themeColors } from "@/lib/chart";

interface LWCChartProps {
  candles: Candle[];
  theme?: "light" | "dark" | "pastel";
}

/**
 * Mode C – Lightweight Charts (default).
 * Renders candlesticks with a volume histogram and a simple 20 period SMA.
 */
export default function LWCChart({ candles, theme }: LWCChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const colors = themeColors(theme);
    const chart = createChart(containerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: colors.background },
        textColor: colors.text,
      },
      width: containerRef.current.clientWidth,
      height: 400,
    });

    const candleSeries = chart.addCandlestickSeries({
      upColor: colors.up,
      borderUpColor: colors.up,
      wickUpColor: colors.up,
      downColor: colors.down,
      borderDownColor: colors.down,
      wickDownColor: colors.down,
    });
    candleSeries.setData(
      candles.map((c) => ({
        time: (c.t / 1000) as UTCTimestamp,
        open: c.o,
        high: c.h,
        low: c.l,
        close: c.c,
      }))
    );

    const volumeSeries = chart.addHistogramSeries({
      priceFormat: { type: "volume" },
      priceScaleId: "",
      color: colors.volumeUp,
    });
    volumeSeries.setData(
      candles.map((c) => ({
        time: (c.t / 1000) as UTCTimestamp,
        value: Math.abs(c.c - c.o),
        color: c.c >= c.o ? colors.volumeUp : colors.volumeDown,
      }))
    );

    // Simple moving average with period 20
    const smaSeries = chart.addLineSeries({ color: colors.accent });
    const smaData: { time: UTCTimestamp; value: number }[] = [];
    for (let i = 19; i < candles.length; i++) {
      const slice = candles.slice(i - 19, i + 1);
      const avg =
        slice.reduce((sum, c) => sum + c.c, 0) / slice.length;
      smaData.push({
        time: (candles[i].t / 1000) as UTCTimestamp,
        value: Number(avg.toFixed(2)),
      });
    }
    smaSeries.setData(smaData);

    chart.timeScale().fitContent();

    return () => chart.remove();
  }, [candles, theme]);

  return <div ref={containerRef} className="w-full" />;
}
