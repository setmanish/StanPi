import MarketTable from '../components/MarketTable';
import { provider } from '@/lib/data';

export default async function MarketsPage() {
  const assets = await provider.listAssets();
  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">Markets</h1>
      <MarketTable assets={assets} />
    </div>
  );
}
