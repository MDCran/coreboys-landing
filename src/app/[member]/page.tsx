import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  MEMBERS,
  SOCIAL_LABEL,
  getMember,
  type SocialKey,
  type Member,
} from "@/lib/data";
import { SITE_URL } from "@/lib/site";
import { breadcrumbSchema, faqSchema, personSchema } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import SocialButton from "@/components/SocialButton";
import LiveBadge from "@/components/LiveBadge";
import SiteFooter from "@/components/SiteFooter";
import LinkifiedBio from "@/components/LinkifiedBio";
import MemberGallery from "@/components/MemberGallery";
import TwitchStatusButton from "@/components/TwitchStatusButton";

const SOCIAL_ORDER: SocialKey[] = [
  "twitch",
  "youtube",
  "tiktok",
  "instagram",
  "x",
  "snapchat",
];

export function generateStaticParams() {
  return MEMBERS.map((m) => ({ member: m.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(
  props: PageProps<"/[member]">
): Promise<Metadata> {
  const { member } = await props.params;
  const m = getMember(member);
  if (!m) return { title: "Off-Air · 404", robots: { index: false, follow: false } };

  const title = `${m.alias} (${m.realName}) — CORE Member`;
  const description = m.bio;
  const url = `${SITE_URL}/${m.slug}`;

  return {
    title,
    description,
    keywords: m.keywords,
    alternates: { canonical: `/${m.slug}` },
    openGraph: {
      type: "profile",
      url,
      title,
      description,
      images: [{ url: m.photo, width: 1200, height: 1500, alt: `${m.alias} — ${m.realName}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [m.photo],
    },
  };
}

export default async function MemberPage(props: PageProps<"/[member]">) {
  const { member } = await props.params;
  const m = getMember(member);
  if (!m) notFound();

  const personLd = personSchema(m);
  const breadcrumbLd = breadcrumbSchema([
    { name: "CORE", url: SITE_URL },
    { name: m.alias, url: `${SITE_URL}/${m.slug}` },
  ]);
  const faqLd = faqSchema([
    {
      q: `Who is ${m.alias}?`,
      a: m.bio,
    },
    {
      q: `What is ${m.alias}'s real name?`,
      a: `${m.alias}'s real name is ${m.realName}.`,
    },
    {
      q: `Where can I follow ${m.alias}?`,
      a: `You can follow ${m.alias} (${m.realName}) on ${Object.keys(m.socials).map((k) => SOCIAL_LABEL[k as SocialKey]).join(", ")}. Every official link is on this page.`,
    },
  ]);

  const others = MEMBERS.filter((x) => x.slug !== m.slug);

  return (
    <main className="relative">
      <JsonLd id={`ld-person-${m.slug}`} data={personLd} />
      <JsonLd id={`ld-breadcrumb-${m.slug}`} data={breadcrumbLd} />
      <JsonLd id={`ld-faq-${m.slug}`} data={faqLd} />

      <section className="relative mx-auto max-w-[1400px] px-5 pb-12 pt-10 sm:px-8 lg:pt-16">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden border border-[var(--line)] bg-black">
              <Image
                src={m.photo}
                alt={`${m.alias} (${m.realName}) — CORE member portrait`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/80 via-transparent to-transparent" />
              <div className="absolute left-4 top-4 flex items-center gap-2">
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--muted)]">
                  {m.index}
                </span>
                <span className="h-px w-8 bg-[var(--line)]" />
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--muted)]">
                  Member
                </span>
              </div>
              <div className="absolute right-4 top-4">
                <LiveBadge slug={m.slug} size="md" />
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7 lg:pl-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--accent)]">
                CORE · Member · {m.index}
              </p>
              {m.socials.twitch?.[0] && (
                <TwitchStatusButton
                  slug={m.slug}
                  twitchUrl={m.socials.twitch[0]}
                />
              )}
            </div>
            <h1 className="mt-3 font-display text-[clamp(72px,12vw,200px)] leading-[0.82] tracking-tight">
              {m.alias}
            </h1>
            <p className="mt-1 font-display text-[clamp(20px,2.4vw,38px)] leading-[1] tracking-tight text-[var(--muted)]">
              {m.realName}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              {m.born && m.bornISO && (
                <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--muted)]">
                  Born <time dateTime={m.bornISO}>{m.born}</time>
                  <span className="mx-2 text-[var(--muted)]/50">·</span>
                  <span>{computeAge(m.bornISO)} yrs</span>
                </p>
              )}
              {m.community && (
                <span
                  className="inline-flex items-center gap-3 border-2 px-3 py-2 font-mono text-[11px] tracking-[0.25em] uppercase"
                  style={{
                    borderColor: m.color,
                    background: `color-mix(in oklch, ${m.color} 14%, transparent)`,
                    color: m.color,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={m.community.logo}
                    alt={`${m.community.name} community logo`}
                    className="h-7 w-auto"
                    style={{ mixBlendMode: "screen" }}
                  />
                  <span className="text-[var(--fg)]">
                    <span className="text-[var(--muted)]">Community ·</span>{" "}
                    <span style={{ color: m.color }}>{m.community.name}</span>
                  </span>
                </span>
              )}
            </div>

            <LinkifiedBio member={m} />

            <div className="mt-8">
              <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--muted)]">
                Socials · Click to open
              </p>
              <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {SOCIAL_ORDER.map((k) => {
                  const urls = m.socials[k];
                  if (!urls || urls.length === 0) return null;
                  return (
                    <li key={k}>
                      <SocialButton
                        kind={k}
                        urls={urls}
                        variant="row"
                        ariaPrefix={`${m.alias} on`}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {m.galleryCount && m.galleryCount > 0 ? (
        <MemberGallery
          slug={m.slug}
          count={m.galleryCount}
          alias={m.alias}
          color={m.color}
        />
      ) : null}

      <FactSheet m={m} />

      <RelatedRoster others={others} />

      <SiteFooter />
    </main>
  );
}

function computeAge(iso: string): number {
  const dob = new Date(iso);
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  const m = now.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) age--;
  return age;
}

function FactSheet({ m }: { m: Member }) {
  const rows: { k: string; v: string }[] = [
    { k: "Alias", v: m.alias },
    { k: "Real name", v: m.realName },
    ...(m.born ? [{ k: "Born", v: `${m.born} (${m.bornISO ? computeAge(m.bornISO) : "—"} yrs)` }] : []),
    { k: "Role", v: m.role },
    ...(m.community ? [{ k: "Community", v: m.community.name }] : []),
  ];
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:py-20">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">
            Fact Sheet
          </p>
        </div>
        <div className="col-span-12 md:col-span-9">
          <dl className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {rows.map(({ k, v }) => (
              <div
                key={k}
                className="grid grid-cols-1 gap-2 py-4 sm:grid-cols-[200px_1fr]"
              >
                <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--muted)]">
                  {k}
                </dt>
                <dd className="text-base">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function RelatedRoster({ others }: { others: Member[] }) {
  return (
    <section className="border-t border-[var(--line)]">
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-6 px-5 py-16 sm:px-8 lg:py-20">
        <div className="col-span-12 md:col-span-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">
            Roster · Other Members
          </p>
          <p className="mt-2 font-display text-[clamp(28px,3vw,44px)] leading-[0.95]">
            The rest of the house.
          </p>
        </div>
        <div className="col-span-12 md:col-span-9">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/${o.slug}`}
                  className="group block overflow-hidden border border-[var(--line)] transition hover:border-[var(--accent)]"
                >
                  <div className="relative aspect-square overflow-hidden bg-black">
                    <Image
                      src={o.photo}
                      alt={`${o.alias} — ${o.realName}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 20vw"
                      className="object-cover grayscale transition group-hover:grayscale-0"
                    />
                  </div>
                  <div className="flex items-center justify-between px-3 py-2">
                    <span className="font-display text-2xl tracking-tight">
                      {o.alias}
                    </span>
                    <Arrow />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="size-3 -rotate-45 transition group-hover:rotate-0"
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
  );
}
