import { pastelTheme } from "./theme";

export type Range = "1D" | "1W" | "1M" | "1Y" | "ALL";
export type Theme = "light" | "dark" | "pastel";

// Map UI range values to TradingView/lightweight resolutions
export function rangeToResolution(range: Range): string {
  const map: Record<Range, string> = {
    "1D": "60", // hourly candles
    "1W": "240", // 4h
    "1M": "D", // daily
    "1Y": "W", // weekly
    ALL: "M", // monthly
  };
  return map[range];
}

// Basic color palettes per theme for charts
export function themeColors(theme: Theme = "light") {
  if (theme === "dark") {
    return {
      background: "#000000",
      text: "#ffffff",
      up: "#26a69a",
      down: "#ef5350",
      accent: "#2962FF",
      volumeUp: "rgba(38,166,154,0.5)",
      volumeDown: "rgba(239,83,80,0.5)",
    };
  }
  if (theme === "pastel") {
    return {
      background: pastelTheme.background,
      text: pastelTheme.foreground,
      up: "#93c5fd",
      down: "#fda4af",
      accent: pastelTheme.accent,
      volumeUp: "rgba(147,197,253,0.5)",
      volumeDown: "rgba(252,165,165,0.5)",
    };
  }
  // light theme
  return {
    background: "#ffffff",
    text: "#000000",
    up: "#26a69a",
    down: "#ef5350",
    accent: "#2962FF",
    volumeUp: "rgba(38,166,154,0.5)",
    volumeDown: "rgba(239,83,80,0.5)",
  };
}
