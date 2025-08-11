"use client";

import { useEffect, useRef } from "react";

interface EmbeddedWidgetProps {
  symbol: string;
  theme?: "light" | "dark" | "pastel";
}

/**
 * Mode B – TradingView embedded widget.
 *
 * This injects TradingView's own script which displays their data directly.
 * It does **not** use our custom data feed.
 */
export default function EmbeddedWidget({ symbol, theme }: EmbeddedWidgetProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    // Clear previous chart when switching symbols/themes
    ref.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      new (window as any).TradingView.widget({
        symbol,
        container_id: ref.current!,
        autosize: true,
        theme: theme === "dark" ? "dark" : "light",
      });
    };
    ref.current.appendChild(script);
  }, [symbol, theme]);

  return <div ref={ref} className="h-96 w-full" />;
}
