import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Signal01 } from "@untitledui/icons";
import { MEMBERS } from "@/lib/data";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { TextIllustration } from "@/components/shared-assets/not-found/illustrations";

export const metadata: Metadata = {
  title: "Off-Air · 404",
  description:
    "This signal isn't part of the CORE broadcast. Head back to the lander or jump to a member channel.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 py-24 sm:px-10">
      {/* Untitled UI illustration — radial-masked, sits behind the content */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 opacity-[0.07] [mask-image:radial-gradient(closest-side,black,transparent)]"
      >
        <TextIllustration className="w-[min(120vw,1100px)] text-[var(--fg)]" />
      </div>
      <div className="grain absolute inset-0 z-0 opacity-[0.12]" aria-hidden />

      <div className="relative z-10 mx-auto w-full max-w-[1100px]">
        <FeaturedIcon
          icon={<Signal01 className="size-7" />}
          color="brand"
          theme="dark"
          size="xl"
        />
        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)]">
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

        <div className="mt-8">
          <Button
            href="/"
            size="xl"
            color="primary"
            iconLeading={<ArrowLeft data-icon className="size-5 shrink-0" />}
          >
            Back to CORE
          </Button>
        </div>

        <p className="mt-12 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">
          Or jump to a member
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {MEMBERS.map((m) => (
            <Link
              key={m.slug}
              href={`/${m.slug}`}
              className="rounded-lg border border-[var(--line)] px-4 py-3 font-mono text-[11px] uppercase tracking-[0.18em] shadow-xs-skeuomorphic ring-1 ring-inset ring-transparent transition hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              {m.alias}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
