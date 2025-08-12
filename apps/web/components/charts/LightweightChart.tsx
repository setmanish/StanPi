'use client';
import { createChart, ColorType, IChartApi } from 'lightweight-charts';
import { useEffect, useRef } from 'react';

type Candle = { t: number; o: number; h: number; l: number; c: number };

interface Props {
  candles: Candle[];
}

export default function LightweightChart({ candles }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const chart: IChartApi = createChart(ref.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'white' },
        textColor: 'black',
      },
      width: ref.current.clientWidth,
      height: 300,
    });
    const series = chart.addCandlestickSeries();
    series.setData(
      candles.map((c) => ({
        time: c.t / 1000,
        open: c.o,
        high: c.h,
        low: c.l,
        close: c.c,
      })),
    );
    return () => chart.remove();
  }, [candles]);

  return <div ref={ref} className="w-full" />;
}
