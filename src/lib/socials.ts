import type { SocialKey } from "./data";

export const BRAND_COLOR: Record<SocialKey, string> = {
  youtube: "#FF0033",
  tiktok: "#25F4EE",
  instagram: "#E1306C",
  twitch: "#9146FF",
  x: "#FFFFFF",
  snapchat: "#FFFC00",
};

export const BRAND_GRADIENT: Record<SocialKey, string> = {
  youtube: "linear-gradient(135deg, #ff0033 0%, #ff4d2b 60%, #ff8a00 100%)",
  tiktok:
    "linear-gradient(135deg, #25f4ee 0%, #00d6cf 35%, #1a1a1a 60%, #fe2c55 100%)",
  instagram:
    "linear-gradient(135deg, #515bd4 0%, #833ab4 25%, #c13584 50%, #e1306c 70%, #fd1d1d 85%, #fcaf45 100%)",
  twitch: "linear-gradient(135deg, #4f1bb3 0%, #6f3dd1 45%, #9146ff 100%)",
  x: "linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 60%, #f2eee5 100%)",
  snapchat:
    "linear-gradient(135deg, #fffc00 0%, #ffd54a 60%, #ff9c2b 100%)",
};

export const BRAND_TEXT_ON: Record<SocialKey, string> = {
  youtube: "#ffffff",
  tiktok: "#0a0908",
  instagram: "#ffffff",
  twitch: "#ffffff",
  x: "#0a0908",
  snapchat: "#0a0908",
};

const PLATFORM_HOST: Record<SocialKey, RegExp> = {
  youtube: /youtube\.com/,
  tiktok: /tiktok\.com/,
  instagram: /instagram\.com/,
  twitch: /twitch\.tv/,
  x: /(x\.com|twitter\.com)/,
  snapchat: /snapchat\.com/,
};

export function handleFromUrl(url: string, kind: SocialKey): string {
  try {
    const u = new URL(url);
    if (kind === "youtube") {
      const m = u.pathname.match(/@[A-Za-z0-9._-]+/);
      if (m) return m[0];
      const m2 = u.pathname.match(/\/(c|channel|user)\/([A-Za-z0-9._-]+)/);
      if (m2) return `@${m2[2]}`;
      return u.pathname.replace(/\/$/, "").split("/").pop() || u.hostname;
    }
    const seg = u.pathname.replace(/^\//, "").replace(/\/$/, "").split("/")[0];
    if (kind === "snapchat") return `@${seg.replace(/^@/, "")}`;
    if (PLATFORM_HOST[kind].test(u.hostname)) {
      return `@${seg.replace(/^@/, "")}`;
    }
    return u.hostname;
  } catch {
    return url;
  }
}

export function labelForChannel(url: string, kind: SocialKey): string {
  const handle = handleFromUrl(url, kind);
  if (kind !== "youtube") return handle;
  const lower = handle.toLowerCase();
  if (lower.includes("vod")) return `${handle} · VODs`;
  if (lower.includes("clip")) return `${handle} · Clips`;
  if (lower.includes("live") || lower.includes("irl")) return `${handle} · Live/IRL`;
  if (lower.includes("otherside")) return `${handle} · Other Side`;
  return `${handle} · Main`;
}
