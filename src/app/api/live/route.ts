import { NextResponse } from "next/server";
import { MEMBERS, type SocialKey } from "@/lib/data";

export const revalidate = 60;

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

async function checkLive(handle: string, signal: AbortSignal): Promise<boolean> {
  try {
    const res = await fetch(
      `https://decapi.me/twitch/uptime/${encodeURIComponent(handle)}`,
      {
        signal,
        next: { revalidate: 60 },
        headers: { "user-agent": "thecoreboys-landing/1.0" },
      }
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

export async function GET() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const checks = await Promise.all(
      MEMBERS.map(async (m) => {
        const twitchUrls = m.socials["twitch" as SocialKey];
        if (!twitchUrls || twitchUrls.length === 0) {
          return [m.slug, { live: false, handle: null }] as const;
        }
        const handle = twitchHandle(twitchUrls[0]);
        if (!handle) return [m.slug, { live: false, handle: null }] as const;
        const live = await checkLive(handle, controller.signal);
        return [m.slug, { live, handle }] as const;
      })
    );
    clearTimeout(timeout);
    return NextResponse.json(
      {
        updatedAt: new Date().toISOString(),
        statuses: Object.fromEntries(checks),
      },
      {
        headers: {
          "cache-control": "public, s-maxage=60, stale-while-revalidate=120",
        },
      }
    );
  } catch {
    clearTimeout(timeout);
    return NextResponse.json(
      { updatedAt: new Date().toISOString(), statuses: {} },
      { status: 200 }
    );
  }
}
