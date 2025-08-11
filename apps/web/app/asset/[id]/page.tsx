import Link from 'next/link';

interface AssetPageProps {
  params: { id: string };
}

export default function AssetPage({ params }: AssetPageProps) {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-semibold">{params.id}</h1>
      <p className="mt-2">
        <Link href="/" className="text-blue-600 underline">
          Back to markets
        </Link>
      </p>
      {/* TODO: will render TradingView chart in a later PR */}
    </main>
  );
}
