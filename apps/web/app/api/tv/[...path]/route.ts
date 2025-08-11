import { NextResponse } from "next/server";
import { provider } from "@/lib/data";
import type { Candle } from "@stanpi/data";

// Mock UDF-compatible endpoints for the TradingView library.
// TODO: swap mock provider with real backend implementation.
export async function GET(
  req: Request,
  { params }: { params: { path: string[] } }
) {
  const [endpoint] = params.path || [];
  const { searchParams } = new URL(req.url);

  switch (endpoint) {
    case "time":
      // Return server time in seconds
      return new Response(Math.floor(Date.now() / 1000).toString());

    case "search": {
      const query = searchParams.get("query") ?? "";
      const list = await provider.listAssets({ search: query });
      const results = list.map((a) => ({
        symbol: a.symbol,
        full_name: `${a.symbol}USD`,
        description: a.name,
        ticker: a.symbol,
        type: "crypto",
        exchange: "MockX",
      }));
      return NextResponse.json(results);
    }

    case "symbols": {
      const sym = searchParams.get("symbol") ?? "";
      const list = await provider.listAssets();
      const asset = list.find((a) => a.symbol === sym);
      return NextResponse.json({
        name: sym,
        ticker: sym,
        description: asset?.name ?? sym,
        type: "crypto",
        session: "24x7",
        timezone: "Etc/UTC",
        minmov: 1,
        pricescale: 100,
        has_intraday: true,
        supported_resolutions: ["60", "240", "D", "W", "M"],
      });
    }

    case "history": {
      const sym = searchParams.get("symbol") ?? "";
      const resolution = searchParams.get("resolution") ?? "D";
      const map: Record<string, any> = {
        "60": "1D",
        "240": "1W",
        D: "1M",
        W: "1Y",
        M: "ALL",
      };
      const range = map[resolution] || "1M";
      try {
        const candles = await provider.getHistory(sym, range as any);
        if (!candles.length) return NextResponse.json({ s: "no_data" });
        return NextResponse.json(toUdf(candles));
      } catch (e) {
        return NextResponse.json({ s: "error", errmsg: "unavailable" });
      }
    }
  }

  return NextResponse.json({ error: "Unknown endpoint" }, { status: 404 });
}

function toUdf(candles: Candle[]) {
  return {
    s: "ok",
    t: candles.map((c) => Math.floor(c.t / 1000)),
    o: candles.map((c) => c.o),
    h: candles.map((c) => c.h),
    l: candles.map((c) => c.l),
    c: candles.map((c) => c.c),
    // mock volume from price movement
    v: candles.map((c) => Math.abs(c.c - c.o)),
  };
}
