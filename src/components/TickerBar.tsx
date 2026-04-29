"use client";

import { useEffect, useRef, useState } from "react";

const SYMBOLS = [
  { symbol: "BTCUSDT", label: "BTC" },
  { symbol: "ETHUSDT", label: "ETH" },
  { symbol: "SOLUSDT", label: "SOL" },
  { symbol: "UNIUSDT", label: "UNI" },
  { symbol: "AAVEUSDT", label: "AAVE" },
  { symbol: "LINKUSDT", label: "LINK" },
  { symbol: "MATICUSDT", label: "POL" },
  { symbol: "BNBUSDT", label: "BNB" },
];

type TickerData = {
  price: string;
  change: string;
  positive: boolean;
};

type Tickers = Record<string, TickerData>;

function formatPrice(price: string): string {
  const num = parseFloat(price);
  if (num >= 1000) return num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (num >= 1) return num.toFixed(3);
  return num.toFixed(5);
}

export default function TickerBar() {
  const [tickers, setTickers] = useState<Tickers>({});
  const [connected, setConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const connect = () => {
    const streams = SYMBOLS.map((s) => `${s.symbol.toLowerCase()}@ticker`).join("/");
    const ws = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${streams}`);
    wsRef.current = ws;

    ws.onopen = () => setConnected(true);

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        const d = msg.data;
        if (!d || !d.s) return;
        const change = parseFloat(d.P);
        setTickers((prev) => ({
          ...prev,
          [d.s]: {
            price: d.c,
            change: d.P,
            positive: change >= 0,
          },
        }));
      } catch {
        // ignore parse errors
      }
    };

    ws.onclose = () => {
      setConnected(false);
      // Auto-reconnect after 3 seconds
      reconnectTimer.current = setTimeout(connect, 3000);
    };

    ws.onerror = () => ws.close();
  };

  useEffect(() => {
    connect();
    return () => {
      if (wsRef.current) wsRef.current.close();
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
    };
  }, []);

  const items = SYMBOLS.map((s) => {
    const data = tickers[s.symbol];
    return { ...s, data };
  });

  // Duplicate items for seamless loop
  const allItems = [...items, ...items];

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-8 bg-[#030303]/90 backdrop-blur-sm border-b border-white/5 overflow-hidden flex items-center">
      {/* Live indicator */}
      <div className="flex-shrink-0 flex items-center gap-1.5 px-3 border-r border-white/10 h-full bg-[#030303]">
        <span
          className={`w-1.5 h-1.5 rounded-full ${connected ? "bg-emerald-400 animate-pulse" : "bg-red-400"}`}
        />
        <span className="text-[10px] font-mono font-semibold text-white/40 uppercase tracking-wider">
          Live
        </span>
      </div>

      {/* Scrolling ticker */}
      <div className="flex-1 overflow-hidden relative">
        <div className="flex animate-ticker whitespace-nowrap">
          {allItems.map((item, i) => {
            const data = item.data;
            return (
              <div key={i} className="inline-flex items-center gap-1.5 px-5 border-r border-white/5">
                <span className="text-[11px] font-bold text-white/70 tracking-wider font-mono">
                  {item.label}
                </span>
                {data ? (
                  <>
                    <span className="text-[11px] font-mono text-white/90">
                      ${formatPrice(data.price)}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-semibold ${
                        data.positive ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {data.positive ? "▲" : "▼"}{Math.abs(parseFloat(data.change)).toFixed(2)}%
                    </span>
                  </>
                ) : (
                  <span className="text-[11px] font-mono text-white/30">loading…</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
