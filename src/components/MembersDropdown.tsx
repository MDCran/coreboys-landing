"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight, ChevronDown } from "@untitledui/icons";
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
          className="dropdown-trigger flex items-center gap-1.5 rounded-full border border-secondary bg-secondary py-0.5 pl-0.5 pr-2.5 shadow-xs-skeuomorphic ring-1 ring-inset ring-transparent transition hover:bg-primary_hover sm:gap-2 sm:py-1 sm:pl-1 sm:pr-3"
          style={{
            ["--name-color" as string]:
              MEMBER_COLOR[current.slug] ?? "var(--accent)",
          }}
        >
          <span className="relative size-6 overflow-hidden rounded-full bg-black sm:size-7">
            <Image
              src={current.twitchAvatar ?? current.photo}
              alt={`${current.alias}`}
              fill
              sizes="28px"
              className="object-cover"
            />
          </span>
          <span
            className="font-mono text-[10px] uppercase tracking-[0.2em] sm:text-[11px] sm:tracking-[0.25em]"
            style={{ color: MEMBER_COLOR[current.slug] }}
          >
            {current.alias}
          </span>
          <ChevronDown
            data-icon
            className={`size-3.5 shrink-0 text-[var(--muted)] transition ${open ? "rotate-180" : ""}`}
            aria-hidden
          />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="menu"
          aria-expanded={open}
          className="dropdown-trigger flex items-center gap-1.5 rounded-lg border border-secondary bg-secondary px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-secondary shadow-xs-skeuomorphic ring-1 ring-inset ring-transparent transition hover:bg-primary_hover hover:text-secondary_hover sm:gap-2 sm:text-[11px] sm:tracking-[0.3em]"
        >
          Members
          <ChevronDown
            data-icon
            className={`size-3.5 shrink-0 transition ${open ? "rotate-180" : ""}`}
            aria-hidden
          />
        </button>
      )}

      {open && (
        <div
          role="menu"
          className="dropdown-panel absolute right-0 md:left-0 md:right-auto top-[calc(100%+10px)] z-50 w-[min(320px,calc(100vw-2rem))] origin-top overflow-hidden rounded-2xl border border-secondary bg-primary p-1.5 shadow-xl ring-1 ring-inset ring-secondary_alt backdrop-blur-md"
        >
          <div className="border-b border-secondary px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.25em] text-tertiary">
            The Roster · 6
          </div>
          <ul className="py-1">
            {MEMBERS.map((m) => {
              const isActive = current?.slug === m.slug;
              return (
                <li key={m.slug}>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setOpen(false);
                      router.push(`/${m.slug}`);
                    }}
                    style={{
                      ["--name-color" as string]:
                        MEMBER_COLOR[m.slug] ?? "var(--accent)",
                    }}
                    className={`member-row group flex w-full items-center justify-between gap-3 rounded-lg px-2 py-2 text-left transition ${isActive ? "is-active" : ""}`}
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
                    <ArrowUpRight
                      data-icon
                      className="size-3.5 shrink-0 text-[var(--muted)] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </button>
                </li>
              );
            })}
          </ul>
          {current && (
            <div className="mt-1 border-t border-secondary pt-1">
              <Link
                href="/"
                role="menuitem"
                onClick={() => setOpen(false)}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-tertiary transition hover:bg-primary_hover hover:text-brand-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring-focus)]"
              >
                <ArrowLeft data-icon className="size-3.5 shrink-0" aria-hidden />
                Back to TheCoreBoys
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
