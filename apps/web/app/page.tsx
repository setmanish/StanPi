import MarketTable from './components/MarketTable';
import { provider } from '../lib/data';

// Server component that fetches asset data and renders the market table
export default async function Page() {
  const assets = await provider.listAssets();
  return (
    <main className="p-4">
      <h1 className="mb-4 text-3xl font-semibold text-pink-700">StanPi</h1>
      <MarketTable assets={assets} />
    </main>
  );
}
