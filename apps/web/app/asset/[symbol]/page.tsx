import AssetChart from './Chart';
import { provider } from '@/lib/data';
import { notFound } from 'next/navigation';

interface Params {
  params: { symbol: string };
  searchParams: { range?: string };
}

export default async function AssetPage({ params }: Params) {
  const asset = await provider.getAsset(params.symbol);
  if (!asset) return notFound();
  const candles = await provider.getCandles(params.symbol, '1M');
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">
        {asset.name} ({asset.symbol})
      </h1>
      <div className="text-sm text-gray-500">
        Price: ${asset.price.toFixed(2)}
      </div>
      <AssetChart symbol={asset.symbol} candles={candles} />
    </div>
  );
}
