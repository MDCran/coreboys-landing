"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MEMBERS, MEMBER_COLOR, getMember } from "@/lib/data";

export default function MembersDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Detect if we're currently on a member page
  const slug = pathname?.replace(/^\//, "").split("/")[0] ?? "";
  const current = getMember(slug);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      {current ? (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="menu"
          aria-expanded={open}
          className="dropdown-trigger flex items-center gap-2 border border-[var(--line)] bg-[var(--bg)]/40 py-1 pl-1 pr-3 hover:border-[var(--accent)]"
          style={{
            ["--name-color" as string]:
              MEMBER_COLOR[current.slug] ?? "var(--accent)",
          }}
        >
          <span className="relative size-7 overflow-hidden rounded-full bg-black">
            <Image
              src={current.twitchAvatar ?? current.photo}
              alt={`${current.alias}`}
              fill
              sizes="28px"
              className="object-cover"
            />
          </span>
          <span
            className="font-mono text-[11px] uppercase tracking-[0.25em]"
            style={{ color: MEMBER_COLOR[current.slug] }}
          >
            {current.alias}
          </span>
          <svg
            viewBox="0 0 12 12"
            className={`size-2.5 text-[var(--muted)] transition ${open ? "rotate-180" : ""}`}
            aria-hidden
          >
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.4" fill="none" />
          </svg>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="menu"
          aria-expanded={open}
          className="dropdown-trigger flex items-center gap-2 border border-[var(--line)] bg-[var(--bg)]/40 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          Members
          <svg
            viewBox="0 0 12 12"
            className={`size-2.5 transition ${open ? "rotate-180" : ""}`}
            aria-hidden
          >
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.4" fill="none" />
          </svg>
        </button>
      )}

      {open && (
        <div
          role="menu"
          className="absolute left-0 top-[calc(100%+8px)] z-50 w-[300px] origin-top border border-[var(--line)] bg-[var(--bg)]/95 p-1 shadow-2xl backdrop-blur-md"
        >
          <div className="border-b border-[var(--line)] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--muted)]">
            The Roster · 6
          </div>
          <ul className="py-1">
            {MEMBERS.map((m) => {
              const isActive = current?.slug === m.slug;
              return (
                <li key={m.slug}>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      router.push(`/${m.slug}`);
                    }}
                    style={{
                      ["--name-color" as string]:
                        MEMBER_COLOR[m.slug] ?? "var(--accent)",
                    }}
                    className={`member-row group flex w-full items-center justify-between gap-3 px-2 py-2 text-left transition ${isActive ? "is-active" : ""}`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="relative size-9 shrink-0 overflow-hidden rounded-full border border-[var(--line)] bg-black">
                        <Image
                          src={m.twitchAvatar ?? m.photo}
                          alt={`${m.alias} portrait`}
                          fill
                          sizes="36px"
                          className="object-cover"
                        />
                      </span>
                      <span className="flex flex-col leading-tight">
                        <span className="flex items-baseline gap-2">
                          <span className="font-mono text-[9px] tracking-[0.18em] text-[var(--muted)]">
                            {m.index}
                          </span>
                          <span className="font-display text-xl tracking-tight">
                            {m.alias}
                          </span>
                        </span>
                        <span className="font-mono text-[10px] tracking-[0.05em] text-[var(--muted)]">
                          {m.realName}
                        </span>
                      </span>
                    </span>
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
                  </button>
                </li>
              );
            })}
          </ul>
          {current && (
            <div className="border-t border-[var(--line)]">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="flex w-full items-center gap-2 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--muted)] transition hover:text-[var(--accent)]"
              >
                ← Back to TheCoreBoys
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
