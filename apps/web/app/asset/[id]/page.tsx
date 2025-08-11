import Link from 'next/link';
import ChartSection from './ChartSection';
import { provider } from '@/lib/data';

interface AssetPageProps {
  params: { id: string };
}

export default async function AssetPage({ params }: AssetPageProps) {
  const { id } = params;
  const symbol = `${id.toUpperCase()}USD`;
  const candles = await provider.getHistory(id, '1M');

  return (
    <main className="p-4">
      <h1 className="text-2xl font-semibold">{id}</h1>
      <div className="mt-4">
        <ChartSection symbol={symbol} candles={candles} />
      </div>
      <p className="mt-4">
        <Link href="/" className="text-blue-600 underline">
          Back to markets
        </Link>
      </p>
    </main>
  );
}
