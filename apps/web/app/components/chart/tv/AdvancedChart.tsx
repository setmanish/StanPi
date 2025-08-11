"use client";

import { useEffect, useRef } from "react";
import { rangeToResolution } from "@/lib/chart";

interface AdvancedChartProps {
  symbol: string;
  range: "1D" | "1W" | "1M" | "1Y" | "ALL";
  theme?: "light" | "dark" | "pastel";
  /** Callback fired when the TradingView library is missing. */
  onUnavailable?: () => void;
}

/**
 * Mode A – TradingView Charting Library.
 *
 * Drop the official `charting_library/` folder into `apps/web/public/` and set
 * `NEXT_PUBLIC_TV_DATAFEED_URL=/api/tv` to feed custom data. The library is not
 * bundled; we dynamically load it from the public folder at runtime.
 */
export default function AdvancedChart({
  symbol,
  range,
  theme,
  onUnavailable,
}: AdvancedChartProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let widget: any;

    async function init() {
      try {
        // Check that the library files exist in /public/charting_library
        const head = await fetch(
          "/charting_library/charting_library.js",
          { method: "HEAD" }
        );
        if (!head.ok) {
          onUnavailable?.();
          return;
        }
        // Load the script dynamically if not already present
        if (!(window as any).TradingView) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "/charting_library/charting_library.js";
            script.onload = () => resolve();
            script.onerror = reject;
            document.body.appendChild(script);
          });
        }
        const tv = (window as any).TradingView;
        const datafeed = new (window as any).Datafeeds.UDFCompatibleDatafeed(
          process.env.NEXT_PUBLIC_TV_DATAFEED_URL || "/api/tv"
        );
        widget = new tv.widget({
          container_id: ref.current!,
          symbol,
          interval: rangeToResolution(range),
          datafeed,
          library_path: "/charting_library/",
          theme: theme === "dark" ? "dark" : "light",
          autosize: true,
          studies: ["Volume@tv-basicstudies"],
          overrides: { "paneProperties.crossHairMode": 1 },
          time_frames: [
            { text: "1D", resolution: "60", description: "1 Day" },
            { text: "1W", resolution: "240", description: "1 Week" },
            { text: "1M", resolution: "D", description: "1 Month" },
            { text: "1Y", resolution: "W", description: "1 Year" },
            { text: "ALL", resolution: "M", description: "All" },
          ],
        });
      } catch (err) {
        onUnavailable?.();
      }
    }

    init();
    return () => widget?.remove?.();
  }, [symbol, range, theme, onUnavailable]);
  return <div ref={ref} className="h-96 w-full" />;
}
