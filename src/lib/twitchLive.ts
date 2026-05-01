/**
 * Client-side Twitch live-status helper.
 *
 * Uses the public decapi.me uptime endpoint, which is CORS-friendly. This
 * lets the live indicator work on a fully statically-exported site (no
 * server runtime required).
 */

import { MEMBERS, type SocialKey } from "./data";

export type LiveStatus = { live: boolean; handle: string | null };

function twitchHandle(url: string): string | null {
  try {
    const u = new URL(url);
    if (!/twitch\.tv/.test(u.hostname)) return null;
    const seg = u.pathname.replace(/^\//, "").replace(/\/$/, "").split("/")[0];
    return seg || null;
  } catch {
    return null;
  }
}

const SLUG_TO_HANDLE: Record<string, string | null> = Object.fromEntries(
  MEMBERS.map((m) => {
    const urls = m.socials["twitch" as SocialKey];
    const handle = urls && urls.length > 0 ? twitchHandle(urls[0]) : null;
    return [m.slug, handle];
  })
);

let cache:
  | { ts: number; statuses: Record<string, LiveStatus> }
  | null = null;
let inflight: Promise<Record<string, LiveStatus>> | null = null;

async function checkOne(handle: string): Promise<boolean> {
  try {
    const res = await fetch(
      `https://decapi.me/twitch/uptime/${encodeURIComponent(handle)}`,
      { cache: "no-store" }
    );
    if (!res.ok) return false;
    const text = (await res.text()).trim().toLowerCase();
    if (!text) return false;
    if (text.includes("offline")) return false;
    if (text.includes("not found") || text.includes("does not exist")) return false;
    if (/\d+\s*(s|m|h|d)/.test(text)) return true;
    return false;
  } catch {
    return false;
  }
}

export async function fetchAllLiveStatuses(): Promise<Record<string, LiveStatus>> {
  if (cache && Date.now() - cache.ts < 45_000) return cache.statuses;
  if (inflight) return inflight;

  inflight = (async () => {
    const entries = await Promise.all(
      MEMBERS.map(async (m) => {
        const handle = SLUG_TO_HANDLE[m.slug];
        if (!handle) {
          return [m.slug, { live: false, handle: null }] as const;
        }
        const live = await checkOne(handle);
        return [m.slug, { live, handle }] as const;
      })
    );
    const statuses = Object.fromEntries(entries);
    cache = { ts: Date.now(), statuses };
    return statuses;
  })();

  try {
    return await inflight;
  } finally {
    inflight = null;
  }
}
