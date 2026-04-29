import { NextResponse } from "next/server";

const SYMBOLS = ["BTCUSDT", "ETHUSDT", "SOLUSDT", "UNIUSDT", "AAVEUSDT", "LINKUSDT", "MATICUSDT", "BNBUSDT"];

export async function GET() {
  try {
    const symbolList = SYMBOLS.map((s) => `"${s}"`).join(",");
    const res = await fetch(
      `https://api.binance.com/api/v3/ticker/24hr?symbols=[${symbolList}]`,
      { next: { revalidate: 15 } }
    );
    const data = await res.json();
    return NextResponse.json(data, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch prices" }, { status: 500 });
  }
}
