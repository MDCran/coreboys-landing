"use client";

import { useEffect, useState } from "react";

type Status = { live: boolean; handle: string | null };

let cache:
  | {
      ts: number;
      statuses: Record<string, Status>;
    }
  | null = null;

let inflight: Promise<Record<string, Status>> | null = null;

async function fetchAll(): Promise<Record<string, Status>> {
  if (cache && Date.now() - cache.ts < 45_000) return cache.statuses;
  if (inflight) return inflight;
  inflight = (async () => {
    try {
      const res = await fetch("/api/live", { cache: "no-store" });
      if (!res.ok) return {};
      const data = (await res.json()) as { statuses?: Record<string, Status> };
      const statuses = data.statuses ?? {};
      cache = { ts: Date.now(), statuses };
      return statuses;
    } catch {
      return {};
    } finally {
      inflight = null;
    }
  })();
  return inflight;
}

type Props = {
  slug: string;
  size?: "sm" | "md";
  className?: string;
};

export default function LiveBadge({ slug, size = "sm", className }: Props) {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    let cancelled = false;
    const tick = async () => {
      const all = await fetchAll();
      if (!cancelled) setStatus(all[slug] ?? { live: false, handle: null });
    };
    tick();
    const id = setInterval(tick, 60_000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [slug]);

  if (!status?.live) return null;
  const dotSize = size === "md" ? "size-1.5" : "size-1";
  const text = size === "md" ? "text-[10px]" : "text-[9px]";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border border-[#9146FF]/60 bg-[#9146FF]/15 px-2 py-0.5 font-mono ${text} tracking-[0.18em] uppercase text-[#d6c5ff] ${className ?? ""}`}
      title={status.handle ? `Live on twitch.tv/${status.handle}` : "Live on Twitch"}
    >
      <span className={`${dotSize} rounded-full bg-[#9146FF] animate-blink`} />
      Live · Twitch
    </span>
  );
}
