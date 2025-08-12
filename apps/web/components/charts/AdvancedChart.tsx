'use client';
import { useEffect, useRef } from 'react';

interface Props {
  symbol: string;
  onUnavailable?: () => void;
}

export default function AdvancedChart({ symbol, onUnavailable }: Props) {
  const id = useRef(`tv_${Math.random().toString(36).slice(2)}`);
  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch('/charting_library/charting_library.js', {
          method: 'HEAD',
        });
        if (!res.ok) throw new Error('missing');
        const w = window as any;
        if (!w.TradingView) {
          await import('/charting_library/charting_library.js');
        }
        if (!w.Datafeeds?.UDFCompatibleDatafeed) {
          await import('/charting_library/datafeeds/udf/dist/bundle.js');
        }
        if (mounted && w.TradingView && w.Datafeeds) {
          const datafeed = new w.Datafeeds.UDFCompatibleDatafeed(
            process.env.NEXT_PUBLIC_TV_DATAFEED_URL || '/api/tv',
          );
          new w.TradingView.widget({
            symbol,
            interval: 'D',
            container_id: id.current,
            datafeed,
            library_path: '/charting_library/',
          });
        }
      } catch (e) {
        onUnavailable?.();
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [symbol, onUnavailable]);

  return <div id={id.current} className="h-[300px] w-full" />;
}
