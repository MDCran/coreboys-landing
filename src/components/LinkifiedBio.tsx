import type { Member, SocialKey } from "@/lib/data";

type Token =
  | { type: "text"; value: string }
  | { type: "link"; value: string; href: string; label: string };

function buildLookup(m: Member): Map<string, string> {
  const map = new Map<string, string>();
  const addHandle = (key: string, url: string) => {
    const norm = key.toLowerCase();
    if (!map.has(norm)) map.set(norm, url);
  };

  for (const k of Object.keys(m.socials) as SocialKey[]) {
    const urls = m.socials[k];
    if (!urls) continue;
    for (const url of urls) {
      try {
        const u = new URL(url);
        // Twitch — strip /
        if (/twitch\.tv$/.test(u.hostname.replace(/^www\./, ""))) {
          const seg = u.pathname.replace(/^\//, "").replace(/\/$/, "").split("/")[0];
          if (seg) addHandle(`twitch.tv/${seg}`, url);
        }
        // YouTube — match @handle
        if (/youtube\.com$/.test(u.hostname.replace(/^www\./, ""))) {
          const at = u.pathname.match(/@[A-Za-z0-9._-]+/);
          if (at) addHandle(at[0], url);
          const c = u.pathname.match(/\/c\/([A-Za-z0-9._-]+)/);
          if (c) addHandle(`@${c[1]}`, url);
        }
        // X / Twitter — match @handle from path
        if (/(^|\.)x\.com$|(^|\.)twitter\.com$/.test(u.hostname)) {
          const seg = u.pathname.replace(/^\//, "").replace(/\/$/, "").split("/")[0];
          if (seg) addHandle(`@${seg}`, url);
        }
      } catch {
        // ignore bad URLs
      }
    }
  }
  return map;
}

const TOKEN_RE = /(twitch\.tv\/[A-Za-z0-9_-]+|@[A-Za-z0-9._-]+)/g;

function tokenize(bio: string, lookup: Map<string, string>): Token[] {
  const out: Token[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  TOKEN_RE.lastIndex = 0;
  while ((m = TOKEN_RE.exec(bio))) {
    const matched = m[0];
    const start = m.index;
    if (start > last) {
      out.push({ type: "text", value: bio.slice(last, start) });
    }
    const href = lookup.get(matched.toLowerCase());
    if (href) {
      out.push({ type: "link", value: matched, href, label: matched });
    } else {
      out.push({ type: "text", value: matched });
    }
    last = start + matched.length;
  }
  if (last < bio.length) {
    out.push({ type: "text", value: bio.slice(last) });
  }
  return out;
}

export default function LinkifiedBio({ member }: { member: Member }) {
  const lookup = buildLookup(member);
  const tokens = tokenize(member.bio, lookup);
  return (
    <p className="mt-6 max-w-xl leading-relaxed text-[var(--fg)]/90 [overflow-wrap:anywhere] sm:text-lg">
      {tokens.map((t, i) =>
        t.type === "text" ? (
          <span key={i}>{t.value}</span>
        ) : (
          <a
            key={i}
            href={t.href}
            target="_blank"
            rel="noreferrer noopener"
            className="font-medium text-[var(--fg)] underline decoration-[color:color-mix(in_oklch,_var(--accent)_50%,_transparent)] decoration-2 underline-offset-[3px] transition hover:text-[var(--accent)] hover:decoration-[var(--accent)]"
            title={t.label}
          >
            {t.value}
          </a>
        )
      )}
    </p>
  );
}
