# StanPi

A web app for custom data analysis.

**Goal:** pastel default theme (Microsoft 365 vibe) + user theme controls (background, text, accent colors).

## MVP Features
- Asset list (rank, name, price, 24h change, volume, market cap)
- Search, sort, filters
- Candlestick/line charts per asset
- Theme switcher (pastel default)
- Pluggable custom data provider (REST/CSV/DB)

## Proposed Stack
- Next.js 14 + TypeScript
- Tailwind CSS + shadcn/ui
- Lightweight Charts (TradingView-style)
- Zod (validation)
- (Optional) Prisma + Postgres if persistence is needed

## Roadmap
- [ ] Scaffold Next.js app (`apps/web`)
- [ ] Theme system + pastel default
- [ ] Listing table + sorting/filtering
- [ ] Chart page with candlesticks
- [ ] Pluggable custom data provider
- [ ] Deploy (Vercel)

## Charts

The Asset page supports three pluggable chart renderers:

1. **Lightweight Charts** – default, uses our mock data provider.
2. **TradingView Charting Library** – drop the official `charting_library/`
   folder into `apps/web/public/` and set
   `NEXT_PUBLIC_TV_DATAFEED_URL=/api/tv` to use the mock UDF endpoints.
3. **TradingView Embedded Widget** – injects TradingView's own data; no custom
   data feed.

Use the selector on the asset page to switch modes. If the Charting Library
files are missing the app falls back to the lightweight renderer.
