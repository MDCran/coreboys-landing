import Link from "next/link";
import { ArrowUpRight } from "@untitledui/icons";
import SocialButton from "./SocialButton";
import SocialIcon from "./SocialIcon";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { GROUP, MEMBERS, MEMBER_COLOR, SOCIAL_LABEL, type SocialKey } from "@/lib/data";

export default function SiteFooter() {
  const groupChannels = Object.entries(GROUP.socials) as [SocialKey, string][];
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-16 px-4 pb-10 sm:px-8">
      <div className="mx-auto max-w-[1400px] overflow-hidden rounded-2xl border border-secondary bg-secondary shadow-xl ring-1 ring-inset ring-secondary_alt">
        <div className="grid grid-cols-12 gap-8 p-6 sm:gap-6 sm:p-10 lg:p-12">
          {/* Brand column */}
          <div className="col-span-12 md:col-span-6">
            <div className="mb-5 flex items-center gap-3">
              <BadgeWithDot color="success" type="pill-color" size="md">
                Live & maintained
              </BadgeWithDot>
            </div>
            <h2 className="font-display tracking-tight">
              <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.5em] text-brand-secondary sm:mb-4 sm:text-[clamp(11px,1.1vw,14px)]">
                THE
              </span>
              <span className="flex items-end gap-3 sm:gap-4">
                <span className="font-display text-[clamp(56px,14vw,150px)] leading-[0.78] text-primary">
                  CORE
                </span>
                <span className="pb-1.5 font-mono text-[clamp(11px,2.4vw,20px)] uppercase tracking-[0.4em] text-tertiary sm:pb-3">
                  BOYS
                </span>
              </span>
            </h2>
            <p className="mt-5 max-w-md font-display text-[clamp(18px,2.6vw,28px)] leading-[1.15] tracking-tight text-primary">
              <span className="text-brand-secondary">Create</span>
              <span className="opacity-30">. </span>
              <span>Own</span>
              <span className="opacity-30">. </span>
              <span>Run Everything</span>
              <span className="opacity-30">.</span>
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-tertiary">
              The Unofficial Website for{" "}
              <a
                href="https://x.com/thecoreboys"
                target="_blank"
                rel="noreferrer noopener"
                className="font-semibold text-brand-secondary underline-offset-2 transition hover:text-brand-secondary_hover hover:underline"
              >
                @thecoreboys
              </a>
              .
            </p>

            {/* Social utility buttons */}
            <div className="mt-7 flex flex-wrap items-center gap-2">
              {groupChannels.map(([k, url]) => (
                <ButtonUtility
                  key={k}
                  href={url}
                  target="_blank"
                  rel="noreferrer noopener"
                  color="secondary"
                  size="sm"
                  tooltip={`CORE on ${SOCIAL_LABEL[k]}`}
                  icon={<SocialIcon kind={k} className="size-5" />}
                />
              ))}
            </div>
          </div>

          {/* Links column */}
          <div className="col-span-12 md:col-span-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-tertiary">
              Group Socials
            </p>
            <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {groupChannels.map(([k, url]) => (
                <li key={k}>
                  <SocialButton kind={k} urls={[url]} variant="row" ariaPrefix="CORE on" />
                </li>
              ))}
            </ul>

            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-tertiary">
              Member Pages
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {MEMBERS.map((m) => (
                <li key={m.slug}>
                  <Link
                    href={`/${m.slug}`}
                    title={`${m.alias} — ${m.realName}`}
                    data-tooltip={`${m.alias} · ${m.realName}`}
                    style={{
                      ["--name-color" as string]:
                        MEMBER_COLOR[m.slug] ?? "var(--accent)",
                    }}
                    className="member-pill tooltipped group flex items-center justify-between rounded-lg border border-secondary bg-primary px-3 py-2 text-secondary shadow-xs-skeuomorphic ring-1 ring-inset ring-transparent transition"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em]">
                      {m.alias}
                    </span>
                    <ArrowUpRight
                      data-icon
                      className="size-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-secondary bg-primary">
          <div className="mx-auto flex flex-col items-center gap-4 px-6 py-5 text-center text-tertiary sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-6 sm:px-10 sm:text-left lg:px-12">
            <p className="font-mono text-xs uppercase tracking-[0.22em] sm:tracking-[0.25em]">
              © {year} CORE Inc.
            </p>
            <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 font-mono text-xs uppercase tracking-[0.22em] sm:gap-x-5 sm:tracking-[0.25em]">
              <li>
                <a
                  href="https://forms.gle/rXxGwpb8rY7WJwHC9"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="rounded-sm text-brand-secondary transition hover:text-brand-secondary_hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg)]"
                >
                  Give Feedback ↗
                </a>
              </li>
              <li>
                <Link href="/terms" className="rounded-sm transition hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg)]">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="rounded-sm transition hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg)]">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="rounded-sm transition hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg)]">
                  Cookies
                </Link>
              </li>
            </ul>
            <p className="font-mono text-xs uppercase tracking-[0.22em] sm:tracking-[0.25em]">
              Website by{" "}
              <a
                href="https://x.com/berryeyu"
                target="_blank"
                rel="noreferrer noopener"
                className="rounded-sm font-semibold text-brand-secondary underline-offset-2 transition hover:text-brand-secondary_hover hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg)]"
              >
                MDCran
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
