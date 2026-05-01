import Link from "next/link";
import type { Metadata } from "next";
import { MEMBERS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Off-Air · 404",
  description:
    "This signal isn't part of the CORE broadcast. Head back to the lander or jump to a member channel.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="relative mx-auto flex min-h-screen max-w-[1100px] flex-col justify-center px-6 py-24 sm:px-10">
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)]">
        404 · Off-Air
      </p>
      <h1 className="mt-4 font-display text-[clamp(72px,13vw,180px)] leading-[0.85] tracking-tight">
        Lost <span className="text-[var(--accent)]">signal.</span>
      </h1>
      <p className="mt-6 max-w-xl text-balance text-base leading-relaxed text-[var(--fg)]/80 sm:text-lg">
        This page isn&apos;t part of the current CORE transmission. The page
        you&apos;re looking for might have been moved, renamed, or taken off
        the air.
      </p>
      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-7">
        <Link
          href="/"
          className="border border-[var(--line)] px-4 py-3 font-mono text-[11px] uppercase tracking-[0.18em] transition hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--bg)]"
        >
          ← Back to CORE
        </Link>
        {MEMBERS.map((m) => (
          <Link
            key={m.slug}
            href={`/${m.slug}`}
            className="border border-[var(--line)] px-4 py-3 font-mono text-[11px] uppercase tracking-[0.18em] transition hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--bg)]"
          >
            {m.alias}
          </Link>
        ))}
      </div>
    </main>
  );
}
