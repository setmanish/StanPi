import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

// Simple deterministic pseudo-random number generator
function rng(seed: number) {
  return function () {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

const rand = rng(42);

function randomBetween(min: number, max: number) {
  return min + (max - min) * rand();
}

async function main() {
  // create user
  await prisma.user.create({
    data: {
      id: 1,
      email: 'demo@stanpi.local',
    },
  });

  const assets: Prisma.AssetCreateInput[] = [];
  for (let i = 1; i <= 200; i++) {
    assets.push({
      symbol: `AST${String(i).padStart(3, '0')}`,
      name: `Asset ${i}`,
      rank: i,
      marketCap: new Prisma.Decimal(randomBetween(1e6, 1e9).toFixed(2)),
    });
  }
  await prisma.asset.createMany({ data: assets });

  const assetRecords = await prisma.asset.findMany();

  // create candles
  const dayMs = 24 * 60 * 60 * 1000;
  const candles: Prisma.CandleCreateManyInput[] = [];
  const start = new Date(Date.now() - 365 * dayMs);

  for (const asset of assetRecords) {
    let price = randomBetween(1, 1000);
    for (let i = 0; i < 365; i++) {
      const t = new Date(start.getTime() + i * dayMs);
      const change = randomBetween(-5, 5);
      const o = price;
      price = Math.max(0.1, price + change);
      const c = price;
      const h = Math.max(o, c) + randomBetween(0, 5);
      const l = Math.min(o, c) - randomBetween(0, 5);
      candles.push({
        assetId: asset.id,
        t,
        o: new Prisma.Decimal(o.toFixed(2)),
        h: new Prisma.Decimal(h.toFixed(2)),
        l: new Prisma.Decimal(l.toFixed(2)),
        c: new Prisma.Decimal(c.toFixed(2)),
        v: new Prisma.Decimal(randomBetween(1000, 100000).toFixed(2)),
      });
    }
  }

  // insert in batches to avoid huge payload
  const batchSize = 5000;
  for (let i = 0; i < candles.length; i += batchSize) {
    await prisma.candle.createMany({ data: candles.slice(i, i + batchSize) });
  }

  // watchlist with 10 random assets
  const watch: Prisma.WatchlistCreateManyInput[] = [];
  for (let i = 0; i < 10; i++) {
    const asset = assetRecords[Math.floor(rand() * assetRecords.length)];
    watch.push({ userId: 1, assetId: asset.id });
  }
  await prisma.watchlist.createMany({ data: watch, skipDuplicates: true });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
