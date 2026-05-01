import Link from "next/link";
import SocialButton from "./SocialButton";
import { GROUP, MEMBERS, MEMBER_COLOR, type SocialKey } from "@/lib/data";

export default function SiteFooter() {
  const groupChannels = Object.entries(GROUP.socials) as [SocialKey, string][];
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-16 border-t border-[var(--line)]">
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-8 px-5 py-10 sm:gap-6 sm:px-8 sm:py-12">
        <div className="col-span-12 md:col-span-6">
          <h2 className="font-display tracking-tight">
            <span className="block font-mono text-[10px] tracking-[0.5em] uppercase text-[var(--accent)] mb-3 sm:text-[clamp(11px,1.1vw,14px)] sm:mb-4">
              THE
            </span>
            <span className="flex items-end gap-3 sm:gap-4">
              <span className="font-display text-[clamp(64px,16vw,180px)] leading-[0.78]">
                CORE
              </span>
              <span className="pb-1.5 sm:pb-3 font-mono text-[clamp(11px,2.4vw,20px)] tracking-[0.4em] uppercase text-[var(--fg)]/85">
                BOYS
              </span>
            </span>
          </h2>
          <p className="mt-5 max-w-md font-display text-[clamp(18px,2.6vw,28px)] leading-[1.15] tracking-tight">
            <span className="text-[var(--accent)]">Create</span>
            <span className="opacity-30">. </span>
            <span>Own</span>
            <span className="opacity-30">. </span>
            <span>Run Everything</span>
            <span className="opacity-30">.</span>
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--muted)]">
            The Unofficial Website for{" "}
            <a
              href="https://x.com/thecoreboys"
              target="_blank"
              rel="noreferrer noopener"
              className="text-[var(--fg)] underline transition hover:text-[var(--accent)]"
            >
              @thecoreboys
            </a>
            .
          </p>
        </div>

        <div className="col-span-12 md:col-span-6">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--muted)]">
            Group Socials
          </p>
          <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {groupChannels.map(([k, url]) => (
              <li key={k}>
                <SocialButton kind={k} urls={[url]} variant="row" ariaPrefix="CORE on" />
              </li>
            ))}
          </ul>

          <p className="mt-6 font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--muted)]">
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
                  className="member-pill tooltipped group flex items-center justify-between border border-[var(--line)] px-2.5 py-2 transition sm:px-3"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em]">
                    {m.alias}
                  </span>
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
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--line)]">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-4 px-5 py-5 text-center text-[var(--muted)] sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-6 sm:px-8 sm:text-left">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] sm:tracking-[0.25em]">
            © {year} CORE Inc. · 3712 Brawdlawn Dr.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 font-mono text-[10px] uppercase tracking-[0.22em] sm:gap-x-5 sm:tracking-[0.25em]">
            <li>
              <a
                href="https://forms.gle/rXxGwpb8rY7WJwHC9"
                target="_blank"
                rel="noreferrer noopener"
                className="text-[var(--accent)] transition hover:text-[var(--fg)]"
              >
                Give Feedback ↗
              </a>
            </li>
            <li>
              <Link href="/terms" className="transition hover:text-[var(--fg)]">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="transition hover:text-[var(--fg)]">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="transition hover:text-[var(--fg)]">
                Cookies
              </Link>
            </li>
          </ul>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] sm:tracking-[0.25em]">
            Website by{" "}
            <a
              href="https://x.com/berryeyu"
              target="_blank"
              rel="noreferrer noopener"
              className="text-[var(--fg)] underline transition hover:text-[var(--accent)]"
            >
              MDCran
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
