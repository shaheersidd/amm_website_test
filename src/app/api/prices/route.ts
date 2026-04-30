import { NextResponse } from "next/server";

// Kraken actual response keys → our normalized symbol names
// Keys confirmed from live API: XXBTZUSD, XETHZUSD, SOLUSD, UNIUSD, AAVEUSD, LINKUSD, BNBUSD
const PAIRS: { queryPair: string; responseKey: string; symbol: string }[] = [
  { queryPair: "XBTUSD",   responseKey: "XXBTZUSD", symbol: "BTCUSDT"  },
  { queryPair: "ETHUSD",   responseKey: "XETHZUSD", symbol: "ETHUSDT"  },
  { queryPair: "SOLUSD",   responseKey: "SOLUSD",   symbol: "SOLUSDT"  },
  { queryPair: "UNIUSD",   responseKey: "UNIUSD",   symbol: "UNIUSDT"  },
  { queryPair: "AAVEUSD",  responseKey: "AAVEUSD",  symbol: "AAVEUSDT" },
  { queryPair: "LINKUSD",  responseKey: "LINKUSD",  symbol: "LINKUSDT" },
  { queryPair: "BNBUSD",   responseKey: "BNBUSD",   symbol: "BNBUSDT"  },
  { queryPair: "DOTUSD",   responseKey: "DOTUSD",   symbol: "DOTUSDT"  }, // replacing MATIC (delisted on Kraken)
];

export async function GET() {
  try {
    const pairStr = PAIRS.map((p) => p.queryPair).join(",");
    const res = await fetch(
      `https://api.kraken.com/0/public/Ticker?pair=${pairStr}`,
      { next: { revalidate: 30 } }
    );

    if (!res.ok) throw new Error(`Kraken error: ${res.status}`);
    const json = await res.json();
    if (json.error?.length) throw new Error(json.error.join(", "));

    const result = json.result as Record<string, {
      c: string; // "price volume" space-separated
      o: string; // today's opening price
    }>;

    const data = PAIRS.map((pair) => {
      const entry = result[pair.responseKey];
      if (!entry) return { symbol: pair.symbol, lastPrice: "0", priceChangePercent: "0.00" };

      // Kraken serializes arrays as space-separated strings when via PowerShell but
      // as real arrays in JSON — handle both
      const lastPrice = Array.isArray(entry.c) ? parseFloat(entry.c[0]) : parseFloat(entry.c.toString().split(" ")[0]);
      const openPrice = parseFloat(entry.o.toString());
      const changePct = openPrice !== 0
        ? (((lastPrice - openPrice) / openPrice) * 100).toFixed(2)
        : "0.00";

      return {
        symbol:             pair.symbol,
        lastPrice:          lastPrice.toString(),
        priceChangePercent: changePct,
      };
    });

    return NextResponse.json(data, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (err) {
    console.error("Prices API error:", err);
    return NextResponse.json({ error: "Failed to fetch prices" }, { status: 500 });
  }
}
