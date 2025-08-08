// Temporary homepage demo. Remove when MarketTable arrives.
import { provider } from '../lib/data';

export default async function Page() {
  const assets = await provider.listAssets();
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold">StanPi</h1>
      {/* Demo list of mock assets - replace with MarketTable */}
      <ul className="mt-4 space-y-2">
        {assets.slice(0, 10).map((a) => (
          <li
            key={a.id}
            className="flex justify-between border-b border-gray-200 pb-1 text-sm"
          >
            <span>
              {a.name} ({a.symbol})
            </span>
            <span>${a.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
