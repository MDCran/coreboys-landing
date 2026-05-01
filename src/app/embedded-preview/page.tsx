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
      <div className="mx-auto flex min-h-screen max-w-[1920px] flex-col items-center justify-center gap-6 px-5 py-12 sm:px-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">
          Embed Preview · 1920 × 1080 · Screenshot This Card
        </p>

        {/* The card itself — fixed 16:9 / 1920×1080 aspect ratio */}
        <article
          id="embed-card"
          className="relative aspect-[1920/1080] w-full max-w-[1920px] overflow-hidden border-2 border-[var(--accent)] bg-[#0a0908] shadow-[0_40px_120px_-30px_rgba(255,59,31,0.55)]"
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
              filter: "blur(80px)",
            }}
          />
          <div
            className="absolute -right-[10%] -bottom-[10%] size-[55%] rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, rgba(145,70,255,0.22), transparent 70%)",
              filter: "blur(80px)",
            }}
          />
          <div
            className="absolute right-[20%] top-[10%] size-[200px] rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, rgba(255,220,200,0.30), transparent 70%)",
              filter: "blur(10px)",
              mixBlendMode: "screen",
            }}
          />

          {/* Main content */}
          <div className="relative z-[5] grid h-full grid-cols-12 items-center gap-12 px-16 py-12">
            {/* Left — wordmark, scaled bigger now that the tapes are gone */}
            <div className="col-span-6 flex flex-col">
              <span className="block font-mono text-[20px] tracking-[0.5em] uppercase text-[var(--accent)] mb-5">
                THE
              </span>
              <span className="flex items-end gap-5">
                <span className="font-display text-[260px] leading-[0.78] tracking-tight [text-shadow:0_2px_30px_rgba(0,0,0,0.8)]">
                  CORE
                </span>
                <span className="pb-6 font-mono text-[30px] tracking-[0.45em] uppercase text-[var(--fg)]/85">
                  BOYS
                </span>
              </span>
              <p className="mt-6 font-display text-[60px] leading-[0.95] tracking-tight">
                <span className="text-[var(--accent)]">Create</span>
                <span className="opacity-30">. </span>
                <span>Own</span>
                <span className="opacity-30">. </span>
                <span>Run Everything</span>
                <span className="opacity-30">.</span>
              </p>
            </div>

            {/* Right — 2×3 grid of member portraits, much larger */}
            <div className="col-span-6">
              <div className="grid grid-cols-3 gap-3">
                {MEMBERS.map((m) => (
                  <div
                    key={m.slug}
                    className="relative aspect-[4/5] overflow-hidden border-2 bg-black"
                    style={{ borderColor: MEMBER_COLOR[m.slug] }}
                  >
                    <Image
                      src={m.photo}
                      alt={`${m.alias} — ${m.realName}`}
                      fill
                      sizes="280px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 mix-blend-soft-light"
                      style={{
                        background:
                          "repeating-linear-gradient(to bottom, rgba(255,255,255,0.06) 0, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 3px)",
                      }}
                    />
                    <div className="absolute inset-x-0 bottom-3 px-4">
                      <span
                        className="block font-display text-[44px] leading-[0.95] tracking-tight"
                        style={{ color: MEMBER_COLOR[m.slug] }}
                      >
                        {m.alias}
                      </span>
                    </div>
                    <span className="absolute right-3 top-3 font-mono text-[12px] tracking-[0.2em] text-white/70">
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
          To export: open this page at a 1920-pixel-wide viewport (or use the
          DevTools Device Toolbar at <code className="font-mono text-[var(--fg)]">1920 × 1080</code>),
          then screenshot the bordered card above. The card is sized at the
          standard 16:9 ratio used by Twitter, Discord and most Open Graph
          consumers.
        </p>
      </div>
    </main>
  );
}
