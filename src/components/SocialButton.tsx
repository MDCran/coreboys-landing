"use client";

import { useEffect, useRef, useState } from "react";
import SocialIcon from "./SocialIcon";
import { type SocialKey, SOCIAL_LABEL } from "@/lib/data";
import { BRAND_COLOR, BRAND_GRADIENT, BRAND_TEXT_ON, handleFromUrl, labelForChannel } from "@/lib/socials";

type Variant = "icon" | "row" | "compact";

type Props = {
  kind: SocialKey;
  urls: string[];
  variant?: Variant;
  ariaPrefix?: string;
};

export default function SocialButton({
  kind,
  urls,
  variant = "icon",
  ariaPrefix,
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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

  if (!urls || urls.length === 0) return null;

  const single = urls.length === 1;
  const primaryUrl = urls[0];
  const handle = handleFromUrl(primaryUrl, kind);
  const tooltip = `${SOCIAL_LABEL[kind]} · ${handle}${urls.length > 1 ? ` (+${urls.length - 1})` : ""}`;
  const ariaLabel = `${ariaPrefix ?? ""} ${SOCIAL_LABEL[kind]} ${handle}`.trim();
  const brand = BRAND_COLOR[kind];
  const onBrand = BRAND_TEXT_ON[kind];

  const sharedHover: React.CSSProperties = {
    // expose brand color + gradient so CSS hover can reach them
    ["--brand" as string]: brand,
    ["--on-brand" as string]: onBrand,
    ["--brand-gradient" as string]: BRAND_GRADIENT[kind],
  };

  const content = (() => {
    switch (variant) {
      case "row":
        return (
          <span className="flex items-center gap-3">
            <SocialIcon kind={kind} className="size-4" />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em]">
              {SOCIAL_LABEL[kind]}
            </span>
          </span>
        );
      case "compact":
        return (
          <span className="flex items-center justify-center gap-1.5">
            <SocialIcon kind={kind} className="size-3.5" />
            {urls.length > 1 && (
              <span className="font-mono text-[9px] leading-none">
                ×{urls.length}
              </span>
            )}
          </span>
        );
      case "icon":
      default:
        return <SocialIcon kind={kind} className="size-3.5" />;
    }
  })();

  const baseClass = (() => {
    switch (variant) {
      case "row":
        return "group brand-hover flex w-full items-center justify-between gap-3 border border-[var(--line)] bg-[var(--bg)]/40 px-3 py-2.5 text-sm text-[var(--fg)] transition hover:border-[var(--brand)] hover:text-[var(--on-brand)]";
      case "compact":
        return "relative brand-hover flex w-full items-center justify-center gap-1.5 border border-[var(--line)] px-2 py-2.5 text-[var(--fg)] transition hover:border-[var(--brand)] hover:text-[var(--on-brand)]";
      case "icon":
      default:
        return "brand-hover-icon grid size-7 sm:size-9 place-items-center rounded-full text-[var(--muted)] transition hover:text-[var(--on-brand)]";
    }
  })();

  if (single) {
    return (
      <a
        href={primaryUrl}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={ariaLabel}
        title={tooltip}
        data-tooltip={tooltip}
        style={sharedHover}
        className={`${baseClass} tooltipped`}
      >
        {content}
        {variant === "row" && <Arrow />}
      </a>
    );
  }

  return (
    <div ref={ref} className="relative" style={sharedHover}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`${ariaLabel} — ${urls.length} channels`}
        title={tooltip}
        data-tooltip={tooltip}
        className={`${baseClass} tooltipped`}
      >
        {content}
        {variant === "row" && <Arrow />}
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+6px)] z-50 min-w-[240px] origin-top-right border border-[var(--line)] bg-[var(--bg)]/95 p-1 shadow-2xl backdrop-blur-md"
          style={{ borderColor: brand }}
        >
          <div className="border-b border-[var(--line)] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
            {SOCIAL_LABEL[kind]} · {urls.length} channels
          </div>
          <ul className="py-1">
            {urls.map((u) => (
              <li key={u}>
                <a
                  href={u}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group/item flex items-center justify-between gap-3 px-3 py-2 text-sm transition hover:bg-[var(--brand)] hover:text-[var(--on-brand)]"
                  onClick={() => setOpen(false)}
                >
                  <span className="font-mono text-[11px] tracking-[0.05em]">
                    {labelForChannel(u, kind)}
                  </span>
                  <Arrow small />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function Arrow({ small }: { small?: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`${small ? "size-2.5" : "size-3"} -rotate-45 transition group-hover:rotate-0 group-hover/item:rotate-0`}
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
