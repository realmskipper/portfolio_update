import { NextResponse } from "next/server";

async function rpc(url: string, method: string, params: unknown[] = []) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
  });
  const data = await res.json();
  return data.result;
}

export async function GET() {
  try {
    const [
      ethBlockHex, ethGasHex,
      bscBlockHex, bscGasHex,
      polyBlockHex, polyGasHex,
      ethLatestBlock, bscLatestBlock, polyLatestBlock,
      ethPendingCount, bscPendingCount, polyPendingCount,
      priceRes,
    ] = await Promise.all([
      rpc("https://ethereum-rpc.publicnode.com", "eth_blockNumber"),
      rpc("https://ethereum-rpc.publicnode.com", "eth_gasPrice"),
      rpc("https://bsc-rpc.publicnode.com", "eth_blockNumber"),
      rpc("https://bsc-rpc.publicnode.com", "eth_gasPrice"),
      rpc("https://polygon-bor-rpc.publicnode.com", "eth_blockNumber"),
      rpc("https://polygon-bor-rpc.publicnode.com", "eth_gasPrice"),
      rpc("https://ethereum-rpc.publicnode.com", "eth_getBlockByNumber", ["latest", false]),
      rpc("https://bsc-rpc.publicnode.com", "eth_getBlockByNumber", ["latest", false]),
      rpc("https://polygon-bor-rpc.publicnode.com", "eth_getBlockByNumber", ["latest", false]),
      rpc("https://ethereum-rpc.publicnode.com", "eth_getBlockTransactionCountByNumber", ["pending"]),
      rpc("https://bsc-rpc.publicnode.com", "eth_getBlockTransactionCountByNumber", ["pending"]),
      rpc("https://polygon-bor-rpc.publicnode.com", "eth_getBlockTransactionCountByNumber", ["pending"]),
      fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin,binancecoin,matic-network,pepe&vs_currencies=usd&include_24hr_change=true"
      ).then((r) => r.json()),
    ]);

    return NextResponse.json({
      chains: {
        ethereum: {
          blockNumber: parseInt(ethBlockHex, 16),
          gasGwei: (parseInt(ethGasHex, 16) / 1e9).toFixed(2),
          lastBlockTxCount: ethLatestBlock?.transactions?.length ?? 0,
          pendingTxCount: ethPendingCount ? parseInt(ethPendingCount, 16) : 0,
          recentTxHashes: (ethLatestBlock?.transactions ?? []).slice(0, 20) as string[],
        },
        bsc: {
          blockNumber: parseInt(bscBlockHex, 16),
          gasGwei: (parseInt(bscGasHex, 16) / 1e9).toFixed(2),
          lastBlockTxCount: bscLatestBlock?.transactions?.length ?? 0,
          pendingTxCount: bscPendingCount ? parseInt(bscPendingCount, 16) : 0,
          recentTxHashes: (bscLatestBlock?.transactions ?? []).slice(0, 20) as string[],
        },
        polygon: {
          blockNumber: parseInt(polyBlockHex, 16),
          gasGwei: (parseInt(polyGasHex, 16) / 1e9).toFixed(2),
          lastBlockTxCount: polyLatestBlock?.transactions?.length ?? 0,
          pendingTxCount: polyPendingCount ? parseInt(polyPendingCount, 16) : 0,
          recentTxHashes: (polyLatestBlock?.transactions ?? []).slice(0, 20) as string[],
        },
      },
      prices: {
        eth: {
          price: priceRes.ethereum?.usd ?? null,
          change24h: priceRes.ethereum?.usd_24h_change ?? null,
        },
        btc: {
          price: priceRes.bitcoin?.usd ?? null,
          change24h: priceRes.bitcoin?.usd_24h_change ?? null,
        },
        bnb: {
          price: priceRes.binancecoin?.usd ?? null,
          change24h: priceRes.binancecoin?.usd_24h_change ?? null,
        },
        matic: {
          price: priceRes["matic-network"]?.usd ?? null,
          change24h: priceRes["matic-network"]?.usd_24h_change ?? null,
        },
        pepe: {
          price: priceRes.pepe?.usd ?? null,
          change24h: priceRes.pepe?.usd_24h_change ?? null,
        },
      },
      timestamp: Date.now(),
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch blockchain data" },
      { status: 500 }
    );
  }
}
