# StanPi Markets

A modern, responsive crypto market dashboard built with Next.js 14 and TypeScript. Features a searchable markets table, watchlist, and asset detail pages with candlestick charts.

## Install & Database

```bash
pnpm i
docker compose up -d
pnpm prisma migrate dev
pnpm prisma db seed
```

## Run

```bash
pnpm dev
# open http://localhost:3000/markets
```

## Quick API checks

```bash
curl "http://localhost:3000/api/assets?search=ast&page=1&pageSize=20"
curl "http://localhost:3000/api/assets/AST01"
curl "http://localhost:3000/api/candles?symbol=AST01&range=1M"
```

## TradingView Library (optional)

To enable the TradingView Charting Library drop the official files into `apps/web/public/charting_library/` and ensure these URLs return 200:

- `/charting_library/charting_library.js`
- `/charting_library/datafeeds/udf/dist/bundle.js`

In DevTools console on an asset page:

```js
Boolean(window.TradingView) && Boolean(window.Datafeeds?.UDFCompatibleDatafeed);
```

## Tests

```bash
pnpm test
pnpm e2e
```

## Lint/format

```bash
pnpm lint
pnpm format
```
