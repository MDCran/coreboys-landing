import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import LiveBadge from "@/components/LiveBadge";
import SocialButton from "@/components/SocialButton";
import SceneClient from "@/components/SceneClient";
import HouseTour from "@/components/HouseTour";
import SiteFooter from "@/components/SiteFooter";
import GroupPhoto3DClient from "@/components/GroupPhoto3DClient";
import JsonLd from "@/components/JsonLd";
import { GROUP, MEMBERS, MEMBER_COLOR, type SocialKey } from "@/lib/data";
import { faqSchema, personSchema, HOME_FAQ } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";


export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Page() {
  const personLds = MEMBERS.map(personSchema);
  const faqLd = faqSchema(HOME_FAQ);

  return (
    <main className="relative">
      <JsonLd id="ld-faq-home" data={faqLd} />
      {personLds.map((p, i) => (
        <JsonLd key={i} id={`ld-person-${MEMBERS[i].slug}`} data={p} />
      ))}

      <Hero />
      <HouseTour />
      <Marquee />
      <Roster />
      <SrRoster />
      <SiteFooter />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="vignette pointer-events-none absolute inset-0 z-[1]" />
      <div className="absolute inset-0 z-0 opacity-90">
        <SceneClient />
      </div>
      {/* Left-side fade so text reads cleanly over the orb */}
      <div className="hero-fade-left pointer-events-none absolute inset-0 z-[2]" />
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(60%_50%_at_50%_120%,_rgba(255,59,31,0.18),_transparent_70%)]" />

      <div className="relative z-10 mx-auto flex max-w-[1400px] flex-col px-5 pt-14 pb-24 sm:px-8 lg:pt-24 lg:pb-32">
        <div className="grid grid-cols-12 gap-x-6">
          <div
            className="col-span-12 lg:col-span-6 reveal"
            style={{ animationDelay: "100ms" }}
          >
            <p className="mb-6 inline-flex items-center gap-2 border border-[var(--accent)]/60 bg-[var(--bg)]/70 px-3 py-1 font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--accent)] shadow-[0_0_30px_rgba(255,59,31,0.15)] backdrop-blur">
              <span className="size-1.5 rounded-full bg-[var(--accent)] animate-blink" />
              Future Org of the Year
            </p>

            <Wordmark />

            <p className="mt-4 font-display text-[6vw] leading-[0.95] text-[var(--fg)] sm:text-[3.6vw] lg:text-[clamp(34px,3.4vw,56px)] [text-shadow:0_2px_18px_rgba(0,0,0,0.7)]">
              <span className="text-[var(--accent)]">Create</span>
              <span className="opacity-30">. </span>
              <span>Own</span>
              <span className="opacity-30">. </span>
              <span>Run Everything</span>
              <span className="opacity-30">.</span>
            </p>

            <div className="mt-6">
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--muted)]">
                Group Socials
              </p>
              <ul className="mt-3 grid max-w-[420px] grid-cols-2 gap-2">
                {(Object.entries(GROUP.socials) as [SocialKey, string][]).map(
                  ([k, url]) => (
                    <li key={k}>
                      <SocialButton
                        kind={k}
                        urls={[url]}
                        variant="row"
                        ariaPrefix="CORE on"
                      />
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          <div
            className="col-span-12 mt-10 flex flex-col gap-6 lg:col-span-6 lg:mt-2 lg:pl-6 reveal"
            style={{ animationDelay: "320ms" }}
          >
            <GroupPhoto3DClient src="/group/main.v2.jpg" />
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex max-w-[1400px] items-end justify-end gap-4 px-5 pb-6 sm:px-8">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--muted)]">
          Scroll ↓
        </span>
      </div>
    </section>
  );
}

function Wordmark() {
  return (
    <h1 className="font-display tracking-tight text-balance">
      <span className="block font-mono text-[clamp(11px,1.2vw,15px)] tracking-[0.5em] uppercase text-[var(--accent)] mb-5 sm:mb-7 lg:mb-9">
        THE
      </span>
      <span className="flex items-end gap-3 sm:gap-5">
        <span className="font-display text-[24vw] leading-[0.78] sm:text-[18vw] lg:text-[clamp(180px,17vw,300px)] [text-shadow:0_2px_30px_rgba(0,0,0,0.7)]">
          CORE
        </span>
        <span className="pb-3 sm:pb-5 lg:pb-8 font-mono text-[clamp(14px,2vw,24px)] tracking-[0.45em] uppercase text-[var(--fg)]/85">
          BOYS
        </span>
      </span>
    </h1>
  );
}

function Marquee() {
  const phrase = "CREATE · OWN · RUN · EVERYTHING ·";
  const repeated = Array.from({ length: 12 }, () => phrase).join(" ");
  return (
    <section
      aria-hidden
      className="border-y border-[var(--line)] bg-[var(--bg)] py-5 overflow-hidden"
    >
      <div className="flex whitespace-nowrap will-change-transform animate-marquee">
        <span className="font-display text-[clamp(48px,7vw,120px)] leading-none tracking-tight pr-10">
          {repeated}
        </span>
        <span className="font-display text-[clamp(48px,7vw,120px)] leading-none tracking-tight pr-10">
          {repeated}
        </span>
      </div>
    </section>
  );
}

function Roster() {
  return (
    <section
      id="members"
      className="relative mx-auto max-w-[1400px] px-5 py-24 sm:px-8 lg:py-32"
    >
      <header className="mb-10 grid grid-cols-12 items-end gap-6">
        <div className="col-span-12 md:col-span-6">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--muted)]">
            Roll Call
          </p>
          <h2 className="mt-3 font-display text-[clamp(48px,7vw,120px)] leading-[0.88] tracking-tight">
            The Roster<span className="text-[var(--accent)]">.</span>
          </h2>
        </div>
        <div className="col-span-12 md:col-span-6 md:text-right">
          <p className="font-display text-[clamp(22px,2.6vw,38px)] leading-[1.15] tracking-tight">
            <span className="block">
              Six creators.{" "}
              <span className="text-[var(--accent)]">One house.</span>
            </span>
            <span className="block text-[var(--muted)]">
              Built, owned and run by the people on screen.
            </span>
          </p>
        </div>
      </header>

      <ul className="grid grid-cols-2 gap-x-px gap-y-px overflow-hidden border border-[var(--line)] sm:grid-cols-3 lg:grid-cols-6">
        {MEMBERS.map((m) => (
          <li
            key={m.slug}
            className="member-card group relative bg-[var(--bg)] outline outline-[var(--line)]"
            style={{
              ["--name-color" as string]: MEMBER_COLOR[m.slug] ?? "var(--accent)",
            }}
          >
            <Link
              href={`/${m.slug}`}
              className="block h-full"
              aria-label={`Open ${m.alias} (${m.realName}) page`}
            >
              <article className="flex h-full flex-col">
                <div className="relative block aspect-[4/5] overflow-hidden bg-black">
                  <Image
                    src={m.photo}
                    alt={`${m.alias} — ${m.realName}, CORE member portrait`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="member-photo object-cover grayscale-[0.35] transition duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/95 via-[var(--bg)]/10 to-transparent" />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 mix-blend-soft-light"
                    style={{
                      background:
                        "repeating-linear-gradient(to bottom, rgba(255,255,255,0.06) 0, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 3px)",
                    }}
                  />
                  <div className="absolute left-3 top-3 flex items-center gap-2">
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--muted)]">
                      {m.index}
                    </span>
                  </div>
                  <div className="absolute right-3 top-3">
                    <LiveBadge slug={m.slug} />
                  </div>
                </div>

                <div className="flex flex-col gap-1 px-4 py-4 transition">
                  <h3 className="member-name font-display text-[clamp(28px,3vw,44px)] leading-[0.9] tracking-tight">
                    {m.alias}
                  </h3>
                  <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--muted)]">
                    {m.realName}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--muted)] opacity-0 transition group-hover:opacity-100">
                    Open page
                    <svg
                      viewBox="0 0 16 16"
                      className="size-2.5 -rotate-45 transition group-hover:rotate-0"
                      aria-hidden
                    >
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        fill="none"
                        strokeLinecap="square"
                      />
                    </svg>
                  </span>
                </div>
              </article>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* FAQ section removed by request — keep canonical roster string for SEO. */
function SrRoster() {
  return (
    <p className="sr-only">
      Canonical CORE / TheCoreBoys roster: Marlon (Marlon Garcia, Mar3lg),
      Lacy (Nicholas Fosco, LacyHimself), Silky (Jerry Woo, YungSilk), Adapt
      (Alex Prynkiewicz, FaZe Adapt), Ron (Stable Ronaldo, Rani Netz), Jason
      (JasonTheWeen, Jason Nguyen). Site: {SITE_URL}.
    </p>
  );
}
