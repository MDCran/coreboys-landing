"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SocialButton from "./SocialButton";
import Countdown, { HOUSE_TOUR_TARGET, useCountdownDone } from "./Countdown";
import MembersDropdown from "./MembersDropdown";
import { GROUP, getMember, type SocialKey } from "@/lib/data";

export default function TopTape() {
  const groupChannels = Object.entries(GROUP.socials) as [SocialKey, string][];
  const done = useCountdownDone(HOUSE_TOUR_TARGET);
  const pathname = usePathname();
  const slug = pathname?.replace(/^\//, "").split("/")[0] ?? "";
  const onMemberPage = !!getMember(slug);

  return (
    <div className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--bg)]/85 backdrop-blur supports-[backdrop-filter]:bg-[var(--bg)]/65">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-5 py-3 sm:px-8">
        <div className="flex items-center gap-3">
          {onMemberPage && (
            <Link
              href="/"
              aria-label="Back to TheCoreBoys home"
              className="grid size-7 place-items-center border border-[var(--line)] text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <svg viewBox="0 0 16 16" className="size-3" aria-hidden>
                <path
                  d="M13 8H3M7 4L3 8l4 4"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  fill="none"
                  strokeLinecap="square"
                />
              </svg>
            </Link>
          )}
          <Link
            href="/"
            className="brand-wordmark whitespace-nowrap"
            aria-label="TheCoreBoys home"
          >
            <span className="brand-the">the</span>
            <span>coreboys</span>
          </Link>
          <span className="hidden text-[var(--muted)]/40 md:inline">/</span>
          <div className="hidden md:block">
            <MembersDropdown />
          </div>
        </div>
        <div className="hidden items-center gap-3 md:flex">
          {!done && (
            <Countdown
              target={HOUSE_TOUR_TARGET}
              variant="compact"
              prefix="LIVE ON TWITCH:"
              hideWhenDone
            />
          )}
        </div>
        <div className="flex items-center gap-1">
          <div className="md:hidden">
            <MembersDropdown />
          </div>
          {groupChannels.map(([k, url]) => (
            <SocialButton
              key={k}
              kind={k}
              urls={[url]}
              variant="icon"
              ariaPrefix="CORE on"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
