"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { fetchAllLiveStatuses, type LiveStatus } from "@/lib/twitchLive";

/* Twitch brand colors — named platform constants (mapped to CSS tokens in
 * globals.css). Third-party brand colors are exempt from the no-hex rule but
 * must be named rather than inlined as raw hex. */
const TWITCH_ON = "var(--platform-twitch-on)";
const TWITCH_OFFLINE_FG = "var(--platform-twitch-offline-fg)";
const TWITCH_PURPLE = "var(--platform-twitch)";

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
    <Button
      href={twitchUrl}
      target="_blank"
      rel="noreferrer noopener"
      size="lg"
      color={live ? "primary" : "secondary"}
      iconLeading={<TwitchGlyph />}
      iconTrailing={ArrowUpRight}
      aria-label={
        live
          ? "Live on Twitch — watch now"
          : "Twitch channel (currently offline)"
      }
      className="twitch-status group"
      style={{
        ...(live
          ? {
              backgroundColor: TWITCH_PURPLE,
              color: TWITCH_ON,
            }
          : {
              color: TWITCH_OFFLINE_FG,
            }),
      }}
    >
      {live ? (
        <span className="inline-flex items-center gap-2">
          <span className="relative inline-flex size-2">
            <span
              className="absolute inset-0 rounded-full"
              style={{ background: TWITCH_ON }}
            />
            <span
              className="absolute inset-0 rounded-full opacity-60 animate-blink"
              style={{ background: TWITCH_ON }}
            />
          </span>
          Live · Watch Now
        </span>
      ) : (
        "Offline"
      )}
    </Button>
  );
}

function TwitchGlyph() {
  return (
    <svg data-icon="leading" viewBox="0 0 24 24" className="size-4" aria-hidden>
      <path
        fill="currentColor"
        d="M4.3 2 3 5.3v14.4h4.7V22h2.7l2.3-2.3h3.7L21 15V2H4.3Zm15.4 12L17 16.7h-4.7l-2.3 2.3v-2.3H6.3V3.7h13.4V14ZM15 6.7h1.7v5H15v-5Zm-4.3 0h1.6v5h-1.6v-5Z"
      />
    </svg>
  );
}
