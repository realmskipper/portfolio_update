"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface ChainData {
  blockNumber: number;
  gasGwei: string;
  lastBlockTxCount: number;
  pendingTxCount: number;
  recentTxHashes: string[];
}

interface PriceData {
  price: number | null;
  change24h: number | null;
}

interface BlockchainData {
  chains: { ethereum: ChainData; bsc: ChainData; polygon: ChainData };
  prices: {
    eth: PriceData;
    btc: PriceData;
    bnb: PriceData;
    matic: PriceData;
    pepe: PriceData;
  };
  timestamp: number;
}

/* ── Icons ──────────────────────────────────────────────── */

function BtcIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#F7931A" />
      <path
        d="M22.5 14.2c.3-2-1.2-3.1-3.3-3.8l.7-2.7-1.6-.4-.7 2.7c-.4-.1-.8-.2-1.3-.3l.7-2.7-1.7-.4-.6 2.7c-.3-.1-.7-.2-1-.3l-2.3-.6-.4 1.8s1.2.3 1.2.3c.7.2.8.6.8 1l-.8 3.2c0 .1.1.1.1.2h-.1l-1.1 4.5c-.1.2-.3.5-.8.4 0 0-1.2-.3-1.2-.3l-.8 1.9 2.2.5c.4.1.8.2 1.2.3l-.7 2.8 1.7.4.7-2.7c.4.1.9.2 1.3.3l-.7 2.7 1.7.4.7-2.8c2.8.5 4.9.3 5.8-2.2.7-2-.1-3.2-1.5-3.9 1.1-.3 1.9-1 2.1-2.5zm-3.7 5.2c-.5 2-3.9.9-5 .7l.9-3.6c1.1.3 4.7.8 4.1 2.9zm.5-5.3c-.5 1.8-3.3.9-4.2.7l.8-3.2c.9.2 3.9.6 3.4 2.5z"
        fill="white"
      />
    </svg>
  );
}

function EthIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#627EEA" />
      <path d="M16.5 4v8.9l7.5 3.3L16.5 4z" fill="white" fillOpacity="0.6" />
      <path d="M16.5 4L9 16.2l7.5-3.3V4z" fill="white" />
      <path d="M16.5 21.9v6.1L24 17.6l-7.5 4.3z" fill="white" fillOpacity="0.6" />
      <path d="M16.5 28v-6.1L9 17.6l7.5 10.4z" fill="white" />
      <path d="M16.5 20.6l7.5-4.4-7.5-3.3v7.7z" fill="white" fillOpacity="0.2" />
      <path d="M9 16.2l7.5 4.4v-7.7L9 16.2z" fill="white" fillOpacity="0.6" />
    </svg>
  );
}

function BnbIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#F3BA2F" />
      <path
        d="M12.1 14.5L16 10.6l3.9 3.9 2.3-2.3L16 6l-6.2 6.2 2.3 2.3zm-6.1 1.5l2.3-2.3L10.6 16l-2.3 2.3L6 16zm6.1 1.5L16 21.4l3.9-3.9 2.3 2.3L16 26l-6.2-6.2 2.3-2.3zM21.4 16l2.3-2.3L26 16l-2.3 2.3L21.4 16zM18.3 16L16 13.7 13.7 16 16 18.3 18.3 16z"
        fill="white"
      />
    </svg>
  );
}

function PolygonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#8247E5" />
      <path
        d="M21.1 13.1c-.4-.2-.9-.2-1.3 0l-3 1.7-2 1.1-3 1.7c-.4.2-.9.2-1.3 0l-2.4-1.4c-.4-.2-.6-.6-.6-1.1v-2.7c0-.4.2-.9.6-1.1l2.3-1.3c.4-.2.9-.2 1.3 0l2.3 1.3c.4.2.6.6.6 1.1v1.7l2-1.2v-1.7c0-.4-.2-.9-.6-1.1l-4.3-2.5c-.4-.2-.9-.2-1.3 0L6.1 9.8c-.4.2-.6.6-.6 1.1v5c0 .4.2.9.6 1.1l4.3 2.5c.4.2.9.2 1.3 0l3-1.7 2-1.2 3-1.7c.4-.2.9-.2 1.3 0l2.3 1.4c.4.2.6.6.6 1.1v2.7c0 .4-.2.9-.6 1.1l-2.3 1.3c-.4.2-.9.2-1.3 0l-2.3-1.3c-.4-.2-.6-.6-.6-1.1v-1.7l-2 1.2v1.7c0 .4.2.9.6 1.1l4.3 2.5c.4.2.9.2 1.3 0l4.3-2.5c.4-.2.6-.6.6-1.1v-5c0-.4-.2-.9-.6-1.1l-4.4-2.6z"
        fill="white"
      />
    </svg>
  );
}

function PepeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#3D8C40" />
      <text x="16" y="21" textAnchor="middle" fontSize="14" fill="white">&#x1F438;</text>
    </svg>
  );
}

/* ── Activity Pulse ──────────────────────────────────────── */

function TxPulse({ count, max, label }: { count: number; max: number; label: string }) {
  const pct = max > 0 ? Math.min((count / max) * 100, 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted w-10 text-right">{count}</span>
      <div className="flex-1 h-2 rounded-full bg-background overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${Math.max(pct, 2)}%`,
            background: `linear-gradient(90deg, var(--accent), #60a5fa)`,
            boxShadow: `0 0 8px var(--accent)`,
          }}
        />
      </div>
    </div>
  );
}

/* ── Tx Hash Stream ──────────────────────────────────────── */

interface TxHashEntry {
  hash: string;
  chain: "ethereum" | "bsc" | "polygon";
  id: number;
}

const chainColors = {
  ethereum: "#627EEA",
  bsc: "#F3BA2F",
  polygon: "#8247E5",
};

const chainLabels = {
  ethereum: "ETH",
  bsc: "BNB",
  polygon: "POLY",
};

function TxStream({ chains }: { chains: BlockchainData["chains"] }) {
  const [entries, setEntries] = useState<TxHashEntry[]>([]);
  const counterRef = useRef(0);
  const dataRef = useRef(chains);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  dataRef.current = chains;

  // Hash stream logic
  useEffect(() => {
    const initial: TxHashEntry[] = [];
    (Object.keys(chainColors) as Array<keyof typeof chainColors>).forEach((chain) => {
      const hashes = dataRef.current[chain]?.recentTxHashes ?? [];
      hashes.forEach((hash) => {
        initial.push({ hash, chain, id: counterRef.current++ });
      });
    });
    setEntries(initial.slice(-30));

    let idx = 0;
    const allHashes: TxHashEntry[] = [];
    (Object.keys(chainColors) as Array<keyof typeof chainColors>).forEach((chain) => {
      const hashes = dataRef.current[chain]?.recentTxHashes ?? [];
      hashes.forEach((hash) => {
        allHashes.push({ hash, chain, id: 0 });
      });
    });

    const interval = setInterval(() => {
      if (allHashes.length === 0) return;
      const source = allHashes[idx % allHashes.length];
      idx++;
      setEntries((prev) => {
        const entry = { ...source, id: counterRef.current++ };
        const next = [...prev, entry];
        return next.slice(-30);
      });
    }, 400);

    return () => clearInterval(interval);
  }, [chains]);

  // Background particle logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resize();
    window.addEventListener("resize", resize);

    interface Particle {
      x: number; y: number; vx: number; vy: number;
      r: number; color: string; alpha: number; life: number;
    }

    const particles: Particle[] = [];
    let animId: number;

    const spawn = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const chains = dataRef.current;

      (Object.keys(chainColors) as Array<keyof typeof chainColors>).forEach((chain, i) => {
        const count = chains[chain]?.pendingTxCount || chains[chain]?.lastBlockTxCount || 1;
        const spawnCount = Math.min(Math.ceil(count / 50), 2);
        for (let j = 0; j < spawnCount; j++) {
          particles.push({
            x: (w / 3) * i + (w / 6) + (Math.random() - 0.5) * 60,
            y: h + 5,
            vx: (Math.random() - 0.5) * 0.3,
            vy: -(0.3 + Math.random() * 0.8),
            r: 1 + Math.random() * 2,
            color: chainColors[chain],
            alpha: 0.35,
            life: 1,
          });
        }
      });
    };

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.004;
        p.alpha = p.life * 0.35;

        if (p.life <= 0 || p.y < -10) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      animId = requestAnimationFrame(draw);
    };

    const spawnInterval = setInterval(spawn, 300);
    draw();

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(spawnInterval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="project-card p-6 relative overflow-hidden">
      <div className="relative z-10 mb-4">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-muted">
          Transaction Activity
        </h3>
        <p className="text-xs text-muted mt-1">
          Live transaction hashes from the latest blocks
        </p>
        <div className="flex gap-4 mt-3">
          {(Object.keys(chainColors) as Array<keyof typeof chainColors>).map((chain) => (
            <span key={chain} className="flex items-center gap-1.5 text-xs text-body">
              <span className="inline-block w-2 h-2 rounded-full" style={{ background: chainColors[chain] }} />
              {chain === "ethereum" ? "Ethereum" : chain === "bsc" ? "BNB" : "Polygon"}
            </span>
          ))}
        </div>
      </div>
      <div className="h-48 overflow-hidden relative">
        {/* Background particles */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full z-0"
          style={{ display: "block" }}
        />
        {/* Gradient fades */}
        <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-surface to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-surface to-transparent z-20 pointer-events-none" />
        {/* Hash stream */}
        <div className="relative z-10 flex flex-col-reverse gap-1.5 h-full overflow-hidden">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="flex items-center gap-2 font-mono text-xs animate-fade-in"
            >
              <span
                className="shrink-0 w-1.5 h-1.5 rounded-full"
                style={{ background: chainColors[entry.chain] }}
              />
              <span
                className="shrink-0 text-[10px] font-semibold w-8"
                style={{ color: chainColors[entry.chain] }}
              >
                {chainLabels[entry.chain]}
              </span>
              <span className="text-muted truncate">
                {entry.hash}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Price Card ──────────────────────────────────────────── */

function PriceCard({
  icon,
  label,
  value,
  change,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  change?: number | null;
}) {
  return (
    <div className="project-card p-4 flex flex-col items-center text-center gap-2">
      <div className="shrink-0 w-8 h-8">{icon}</div>
      <span className="text-xs font-semibold uppercase tracking-widest text-muted">
        {label}
      </span>
      <div className="text-base font-bold text-heading truncate w-full">{value}</div>
      {change != null && (
        <span
          className={`text-xs font-medium ${
            change >= 0 ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {change >= 0 ? "+" : ""}
          {change.toFixed(2)}%
        </span>
      )}
    </div>
  );
}

/* ── Chain Card ──────────────────────────────────────────── */

function ChainCard({
  icon,
  label,
  chain,
}: {
  icon: React.ReactNode;
  label: string;
  chain: ChainData;
}) {
  const maxTx = 300;

  return (
    <div className="project-card p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="shrink-0 w-8 h-8">{icon}</div>
        <span className="text-sm font-semibold text-heading">{label}</span>
        <span className="ml-auto relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
        </span>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted">Block</span>
          <span className="text-heading font-mono">{chain.blockNumber.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted">Gas</span>
          <span className="text-heading font-mono">{chain.gasGwei} Gwei</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted">Last Block Txs</span>
          <span className="text-heading font-mono">{chain.lastBlockTxCount}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted">Pending Txs</span>
          <span className="text-heading font-mono">{chain.pendingTxCount}</span>
        </div>
        <div className="pt-1">
          <TxPulse count={chain.pendingTxCount || chain.lastBlockTxCount} max={maxTx} label="activity" />
        </div>
      </div>
    </div>
  );
}

/* ── Main Page ──────────────────────────────────────────── */

export default function BlockchainPage() {
  const [data, setData] = useState<BlockchainData | null>(null);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [countdown, setCountdown] = useState(10);

  const fetchData = useCallback(async () => {
    setRefreshing(true);
    try {
      const res = await fetch("/api/blockchain");
      if (!res.ok) throw new Error();
      setData(await res.json());
      setError(false);
    } catch {
      setError(true);
    } finally {
      setRefreshing(false);
      setCountdown(10);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const dataInterval = setInterval(fetchData, 10000);
    const tickInterval = setInterval(() => {
      setCountdown((c) => (c > 0 ? c - 1 : 10));
    }, 1000);
    return () => {
      clearInterval(dataInterval);
      clearInterval(tickInterval);
    };
  }, [fetchData]);

  const fmt = (n: number | null) =>
    n != null
      ? n < 0.01
        ? `$${n.toFixed(8)}`
        : n.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })
      : "—";

  return (
    <main className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-heading">
            Live From the Blockchain
          </h1>
          <p className="mt-2 text-sm text-muted">
            Real-time chain data &amp; crypto prices
            <span className="ml-2 inline-flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-emerald-400">Live</span>
              <span className="text-muted">· {countdown}s</span>
            </span>
          </p>
        </div>
        <button
          onClick={fetchData}
          disabled={refreshing}
          className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          {refreshing ? "..." : "Refresh"}
        </button>
      </div>

      {error && (
        <div className="mb-8 rounded-xl bg-red-500/10 border border-red-500/20 px-5 py-4 text-sm text-red-400">
          Failed to fetch data. Retrying...
        </div>
      )}

      {data ? (
        <>
          {/* Prices */}
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted">
            Prices
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 mb-10">
            <PriceCard icon={<BtcIcon className="w-10 h-10" />} label="Bitcoin" value={fmt(data.prices.btc.price)} change={data.prices.btc.change24h} />
            <PriceCard icon={<EthIcon className="w-10 h-10" />} label="Ethereum" value={fmt(data.prices.eth.price)} change={data.prices.eth.change24h} />
            <PriceCard icon={<BnbIcon className="w-10 h-10" />} label="BNB" value={fmt(data.prices.bnb.price)} change={data.prices.bnb.change24h} />
            <PriceCard icon={<PolygonIcon className="w-10 h-10" />} label="Polygon" value={fmt(data.prices.matic.price)} change={data.prices.matic.change24h} />
            <PriceCard icon={<PepeIcon className="w-10 h-10" />} label="PEPE" value={fmt(data.prices.pepe.price)} change={data.prices.pepe.change24h} />
          </div>

          {/* Chain Stats */}
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted">
            Chain Stats
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-10">
            <ChainCard icon={<EthIcon className="w-8 h-8" />} label="Ethereum" chain={data.chains.ethereum} />
            <ChainCard icon={<BnbIcon className="w-8 h-8" />} label="BNB Chain" chain={data.chains.bsc} />
            <ChainCard icon={<PolygonIcon className="w-8 h-8" />} label="Polygon" chain={data.chains.polygon} />
          </div>

          {/* Tx Stream */}
          <TxStream chains={data.chains} />
        </>
      ) : !error ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
        </div>
      ) : null}

      {data && (
        <p className="mt-8 text-center text-xs text-muted">
          Last updated: {new Date(data.timestamp).toLocaleTimeString()}
        </p>
      )}
    </main>
  );
}
