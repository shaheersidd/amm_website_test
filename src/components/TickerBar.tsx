"use client";

import { useEffect, useRef, useState } from "react";

const SYMBOLS = [
  { symbol: "BTCUSDT",  label: "BTC",  color: "#F7931A" },
  { symbol: "ETHUSDT",  label: "ETH",  color: "#00D6FF" },
  { symbol: "SOLUSDT",  label: "SOL",  color: "#8B5CF6" },
  { symbol: "UNIUSDT",  label: "UNI",  color: "#FF007A" },
  { symbol: "AAVEUSDT", label: "AAVE", color: "#3B82F6" },
  { symbol: "LINKUSDT", label: "LINK", color: "#00D6FF" },
  { symbol: "DOTUSDT",  label: "DOT",  color: "#E6007A" },
  { symbol: "BNBUSDT",  label: "BNB",  color: "#F3BA2F" },
];

type TickerData = { price: string; change: string; positive: boolean };
type Tickers    = Record<string, TickerData>;

function formatPrice(price: string): string {
  const num = parseFloat(price);
  if (isNaN(num)) return "—";
  if (num >= 1000) return num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (num >= 1)    return num.toFixed(3);
  return num.toFixed(5);
}

async function fetchPrices(): Promise<Tickers> {
  try {
    const res = await fetch("/api/prices", { cache: "no-store" });
    if (!res.ok) return {};
    const data: Array<{ symbol: string; lastPrice: string; priceChangePercent: string }> = await res.json();
    if (!Array.isArray(data)) return {};
    const result: Tickers = {};
    data.forEach((d) => {
      const change = parseFloat(d.priceChangePercent);
      result[d.symbol] = {
        price:    d.lastPrice,
        change:   d.priceChangePercent,
        positive: change >= 0,
      };
    });
    return result;
  } catch {
    return {};
  }
}

export default function TickerBar() {
  const [tickers, setTickers] = useState<Tickers>({});
  const pollTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Poll every 30 seconds — CoinGecko free tier rate limit safe
  useEffect(() => {
    fetchPrices().then(setTickers);
    pollTimer.current = setInterval(() => fetchPrices().then(setTickers), 30_000);
    return () => { if (pollTimer.current) clearInterval(pollTimer.current); };
  }, []);

  const allItems = [...SYMBOLS, ...SYMBOLS];

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] h-8 overflow-hidden flex items-center"
      style={{
        backgroundColor: "#0a0a0a",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        isolation: "isolate",
      }}
    >
      {/* LIVE badge */}
      <div
        className="flex-shrink-0 flex items-center gap-1.5 px-3 border-r border-white/10 h-full"
        style={{ backgroundColor: "#0a0a0a" }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
        <span className="text-[10px] font-mono font-bold text-white/50 uppercase tracking-wider">
          Live
        </span>
      </div>

      {/* Scrolling strip */}
      <div className="flex-1 overflow-hidden">
        <div className="flex animate-ticker whitespace-nowrap">
          {allItems.map((item, i) => {
            const data = tickers[item.symbol];
            return (
              <div key={i} className="inline-flex items-center gap-1.5 px-5 border-r border-white/5 h-8">
                <span
                  className="text-[11px] font-bold font-mono tracking-wider"
                  style={{ color: item.color }}
                >
                  {item.label}
                </span>

                {data ? (
                  <>
                    <span className="text-[11px] font-mono text-white/85">
                      ${formatPrice(data.price)}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-semibold ${
                        data.positive ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {data.positive ? "▲" : "▼"}
                      {Math.abs(parseFloat(data.change)).toFixed(2)}%
                    </span>
                  </>
                ) : (
                  <span className="inline-block w-16 h-2 rounded bg-white/10 animate-pulse" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
