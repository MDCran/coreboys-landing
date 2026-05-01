import Image from "next/image";
import type { Metadata } from "next";
import { MEMBERS, MEMBER_COLOR } from "@/lib/data";

export const metadata: Metadata = {
  title: "Embed Preview · TheCoreBoys",
  description:
    "Static preview card sized for Twitter / Discord embed screenshots.",
  alternates: { canonical: "/embedded-preview" },
  robots: { index: false, follow: false },
};

export default function EmbedPreviewPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      <div className="mx-auto flex min-h-screen max-w-[1400px] flex-col items-center justify-center gap-6 px-5 py-12 sm:px-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">
          Embed Preview · 1200 × 630 · Screenshot This Card
        </p>

        {/* The card itself — fixed 1200×630 aspect ratio for OG / Twitter / Discord */}
        <article
          id="embed-card"
          className="relative aspect-[1200/630] w-full max-w-[1200px] overflow-hidden border-2 border-[var(--accent)] bg-[#0a0908] shadow-[0_40px_120px_-30px_rgba(255,59,31,0.55)]"
        >
          {/* Texture layer 1 — dot grid */}
          <div className="absolute inset-0 bg-dot-grid opacity-[0.18]" />
          {/* Texture layer 2 — gridlines */}
          <div className="absolute inset-0 bg-thin-grid opacity-[0.10]" />

          {/* Accent blooms */}
          <div
            className="absolute -left-[10%] -top-[10%] size-[60%] rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, rgba(255,59,31,0.30), transparent 70%)",
              filter: "blur(60px)",
            }}
          />
          <div
            className="absolute -right-[10%] -bottom-[10%] size-[55%] rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, rgba(145,70,255,0.22), transparent 70%)",
              filter: "blur(60px)",
            }}
          />
          <div
            className="absolute right-[20%] top-[10%] size-[140px] rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, rgba(255,220,200,0.30), transparent 70%)",
              filter: "blur(8px)",
              mixBlendMode: "screen",
            }}
          />

          {/* Diagonal lens-flare streak */}
          <div
            className="absolute top-[10%] left-[-10%] h-[3px] w-[120%] origin-left"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,90,60,0.6), rgba(255,180,120,0.4), transparent)",
              filter: "blur(2px)",
              transform: "rotate(-14deg)",
            }}
          />

          {/* Top tape — broadcast-style bar */}
          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between border-b border-[var(--line)] bg-black/40 px-7 py-3 backdrop-blur">
            <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--fg)]">
              <span className="size-1.5 rounded-full bg-[var(--accent)]" />
              <span className="text-[var(--accent)]">the</span>coreboys
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--muted)]">
              Create Own Run Everything
            </span>
          </div>

          {/* Bottom tape */}
          <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between border-t border-[var(--line)] bg-black/40 px-7 py-3 backdrop-blur">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">
              Six Channels · One Family
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)]">
              Now Streaming
            </span>
          </div>

          {/* Main content */}
          <div className="relative z-[5] grid h-full grid-cols-12 items-center gap-6 px-7 pt-12 pb-12">
            {/* Left — wordmark */}
            <div className="col-span-7 flex flex-col">
              <span className="block font-mono text-[12px] tracking-[0.5em] uppercase text-[var(--accent)] mb-3">
                THE
              </span>
              <span className="flex items-end gap-3">
                <span className="font-display text-[150px] leading-[0.78] tracking-tight [text-shadow:0_2px_30px_rgba(0,0,0,0.8)]">
                  CORE
                </span>
                <span className="pb-3 font-mono text-[18px] tracking-[0.45em] uppercase text-[var(--fg)]/85">
                  BOYS
                </span>
              </span>
              <p className="mt-3 font-display text-[32px] leading-[0.95] tracking-tight">
                <span className="text-[var(--accent)]">Create</span>
                <span className="opacity-30">. </span>
                <span>Own</span>
                <span className="opacity-30">. </span>
                <span>Run Everything</span>
                <span className="opacity-30">.</span>
              </p>

              {/* Member chips with names */}
              <div className="mt-6 flex flex-wrap gap-2">
                {MEMBERS.map((m) => (
                  <span
                    key={m.slug}
                    className="inline-flex items-center gap-2 border px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em]"
                    style={{
                      borderColor: MEMBER_COLOR[m.slug],
                      color: MEMBER_COLOR[m.slug],
                      background: `color-mix(in oklch, ${MEMBER_COLOR[m.slug]} 12%, transparent)`,
                    }}
                  >
                    <span
                      className="size-1.5 rounded-full"
                      style={{ background: MEMBER_COLOR[m.slug] }}
                    />
                    {m.alias}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — 2×3 grid of member portraits */}
            <div className="col-span-5">
              <div className="grid grid-cols-3 gap-2">
                {MEMBERS.map((m) => (
                  <div
                    key={m.slug}
                    className="relative aspect-[4/5] overflow-hidden border bg-black"
                    style={{ borderColor: MEMBER_COLOR[m.slug] }}
                  >
                    <Image
                      src={m.photo}
                      alt={`${m.alias} — ${m.realName}`}
                      fill
                      sizes="160px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 mix-blend-soft-light"
                      style={{
                        background:
                          "repeating-linear-gradient(to bottom, rgba(255,255,255,0.06) 0, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 3px)",
                      }}
                    />
                    <div className="absolute inset-x-0 bottom-1.5 px-2">
                      <span
                        className="block font-display text-[22px] leading-[0.95] tracking-tight"
                        style={{ color: MEMBER_COLOR[m.slug] }}
                      >
                        {m.alias}
                      </span>
                    </div>
                    <span className="absolute right-1.5 top-1.5 font-mono text-[8px] tracking-[0.2em] text-white/70">
                      {m.index}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Inset frame line */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-3 border border-white/8"
          />
        </article>

        <p className="mt-2 max-w-prose text-center text-sm text-[var(--muted)]">
          To export: open this page at a 1200-pixel-wide viewport (or use the
          DevTools Device Toolbar at 1200×630), then screenshot the bordered
          card above. The card is sized at the standard{" "}
          <code className="font-mono text-[var(--fg)]">1200 × 630</code> ratio
          used by Twitter, Discord and most Open Graph consumers.
        </p>
      </div>
    </main>
  );
}
