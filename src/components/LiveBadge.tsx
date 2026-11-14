"use client";

import { useEffect, useState } from "react";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { fetchAllLiveStatuses, type LiveStatus } from "@/lib/twitchLive";

type Status = LiveStatus;

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
      const all = await fetchAllLiveStatuses();
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

  return (
    <span
      className={`inline-flex animate-blink ${className ?? ""}`}
      title={status.handle ? `Live on twitch.tv/${status.handle}` : "Live on Twitch"}
    >
      <BadgeWithDot color="purple" type="pill-color" size={size}>
        Live · Twitch
      </BadgeWithDot>
    </span>
  );
}
