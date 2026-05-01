"use client";

import { useEffect, useState } from "react";
import { fetchAllLiveStatuses, type LiveStatus } from "@/lib/twitchLive";

const TWITCH_PURPLE = "#9146FF";

type Props = {
  slug: string;
  twitchUrl: string;
};

export default function TwitchStatusButton({ slug, twitchUrl }: Props) {
  const [status, setStatus] = useState<LiveStatus | null>(null);

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

  const live = !!status?.live;

  return (
    <a
      href={twitchUrl}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={
        live
          ? "Live on Twitch — watch now"
          : "Twitch channel (currently offline)"
      }
      className="twitch-status group inline-flex items-center gap-2.5 border-2 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] transition"
      style={{
        borderColor: live ? TWITCH_PURPLE : "rgba(145, 70, 255, 0.45)",
        background: live
          ? `color-mix(in oklch, ${TWITCH_PURPLE} 22%, transparent)`
          : "transparent",
        color: live ? "#e9dcff" : "#c8b8ff",
      }}
    >
      <TwitchGlyph color={TWITCH_PURPLE} />
      {live ? (
        <span className="flex items-center gap-2">
          <span className="relative inline-flex size-2">
            <span
              className="absolute inset-0 rounded-full"
              style={{ background: TWITCH_PURPLE }}
            />
            <span
              className="absolute inset-0 rounded-full opacity-60"
              style={{ background: TWITCH_PURPLE, animation: "blink 1.4s ease-in-out infinite" }}
            />
          </span>
          <span>Live · Watch Now</span>
        </span>
      ) : (
        <span>Offline</span>
      )}
      <svg
        viewBox="0 0 16 16"
        className="size-2.5 -rotate-45 transition group-hover:rotate-0"
        aria-hidden
      >
        <path
          d="M3 8h10M9 4l4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="square"
        />
      </svg>
    </a>
  );
}

function TwitchGlyph({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
      <path
        fill={color}
        d="M4.3 2 3 5.3v14.4h4.7V22h2.7l2.3-2.3h3.7L21 15V2H4.3Zm15.4 12L17 16.7h-4.7l-2.3 2.3v-2.3H6.3V3.7h13.4V14ZM15 6.7h1.7v5H15v-5Zm-4.3 0h1.6v5h-1.6v-5Z"
      />
    </svg>
  );
}
