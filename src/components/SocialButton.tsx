"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "@untitledui/icons";
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
        return "group brand-hover flex w-full items-center justify-between gap-3 rounded-lg border border-secondary bg-secondary px-3.5 py-2.5 text-sm font-semibold text-secondary shadow-xs-skeuomorphic ring-1 ring-inset ring-transparent transition hover:border-[var(--brand)] hover:text-[var(--on-brand)]";
      case "compact":
        return "relative brand-hover flex w-full items-center justify-center gap-1.5 rounded-lg border border-secondary bg-secondary px-2 py-2.5 text-secondary shadow-xs-skeuomorphic transition hover:border-[var(--brand)] hover:text-[var(--on-brand)]";
      case "icon":
      default:
        return "brand-hover-icon grid size-11 sm:size-9 place-items-center rounded-lg text-fg-quaternary ring-1 ring-inset ring-transparent transition hover:text-[var(--on-brand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg)]";
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
          className="dropdown-panel absolute right-0 top-[calc(100%+8px)] z-50 min-w-[240px] origin-top-right overflow-hidden rounded-2xl border border-secondary bg-primary p-1.5 shadow-xl ring-1 ring-inset ring-secondary_alt backdrop-blur-md"
          style={{ borderColor: brand }}
        >
          <div className="border-b border-secondary px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-tertiary">
            {SOCIAL_LABEL[kind]} · {urls.length} channels
          </div>
          <ul className="py-1">
            {urls.map((u) => (
              <li key={u}>
                <a
                  href={u}
                  role="menuitem"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group/item flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm text-secondary transition hover:bg-[var(--brand)] hover:text-[var(--on-brand)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring-focus)]"
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
    <ArrowUpRight
      data-icon
      className={`${small ? "size-3" : "size-3.5"} shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5`}
      aria-hidden
    />
  );
}
