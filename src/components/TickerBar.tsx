"use client";

import { useEffect, useRef, useState } from "react";

const SYMBOLS = [
  { symbol: "BTCUSDT",   label: "BTC",  color: "#F7931A" },
  { symbol: "ETHUSDT",   label: "ETH",  color: "#00D6FF" },
  { symbol: "SOLUSDT",   label: "SOL",  color: "#8B5CF6" },
  { symbol: "UNIUSDT",   label: "UNI",  color: "#FF007A" },
  { symbol: "AAVEUSDT",  label: "AAVE", color: "#3B82F6" },
  { symbol: "LINKUSDT",  label: "LINK", color: "#00D6FF" },
  { symbol: "MATICUSDT", label: "POL",  color: "#8B5CF6" },
  { symbol: "BNBUSDT",   label: "BNB",  color: "#F3BA2F" },
];

type TickerData = { price: string; change: string; positive: boolean };
type Tickers    = Record<string, TickerData>;

function formatPrice(price: string): string {
  const num = parseFloat(price);
  if (num >= 1000) return num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (num >= 1)    return num.toFixed(3);
  return num.toFixed(5);
}

export default function TickerBar() {
  const [tickers, setTickers] = useState<Tickers>({});
  const wsRef          = useRef<WebSocket | null>(null);
  const reconnectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── REST prefetch via our server-side proxy (no CORS) ──────────────────
  useEffect(() => {
    fetch("/api/prices")
      .then((r) => r.json())
      .then((data: Array<{ symbol: string; lastPrice: string; priceChangePercent: string }>) => {
        if (!Array.isArray(data)) return;
        const initial: Tickers = {};
        data.forEach((d) => {
          const change = parseFloat(d.priceChangePercent);
          initial[d.symbol] = {
            price:    d.lastPrice,
            change:   d.priceChangePercent,
            positive: change >= 0,
          };
        });
        setTickers(initial);
      })
      .catch(() => { /* WebSocket will fill in */ });
  }, []);

  // ── WebSocket for real-time tick updates ────────────────────────────────
  const connect = () => {
    const streams = SYMBOLS.map((s) => `${s.symbol.toLowerCase()}@ticker`).join("/");
    const ws = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${streams}`);
    wsRef.current = ws;

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data as string);
        const d   = msg?.data;
        if (!d?.s) return;
        const change = parseFloat(d.P);
        setTickers((prev) => ({
          ...prev,
          [d.s]: { price: d.c, change: d.P, positive: change >= 0 },
        }));
      } catch { /* ignore */ }
    };

    ws.onclose = () => {
      reconnectTimer.current = setTimeout(connect, 3000);
    };

    ws.onerror = () => ws.close();
  };

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const allItems = [...SYMBOLS, ...SYMBOLS];

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-8 bg-[#030303]/95 backdrop-blur-sm border-b border-white/5 overflow-hidden flex items-center">

      {/* Always-on LIVE badge with red dot */}
      <div className="flex-shrink-0 flex items-center gap-1.5 px-3 border-r border-white/10 h-full bg-[#030303]">
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
                    <span className={`text-[10px] font-mono font-semibold ${data.positive ? "text-emerald-400" : "text-red-400"}`}>
                      {data.positive ? "▲" : "▼"}{Math.abs(parseFloat(data.change)).toFixed(2)}%
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
