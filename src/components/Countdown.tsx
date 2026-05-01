"use client";

import { useEffect, useState } from "react";

export const HOUSE_TOUR_TARGET = "2026-05-02T14:00:00-07:00";

export function useCountdownDone(target: string = HOUSE_TOUR_TARGET): boolean {
  const [done, setDone] = useState<boolean>(false);
  useEffect(() => {
    const t = new Date(target).getTime();
    const tick = () => setDone(Date.now() >= t);
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return done;
}

type Variant = "compact" | "dramatic";

type Parts = {
  d: string;
  h: string;
  m: string;
  s: string;
  done: boolean;
  total: number;
};

function compute(target: number, now: number): Parts {
  let diff = Math.max(0, target - now);
  const done = diff <= 0;
  const day = 86400000;
  const hr = 3600000;
  const min = 60000;
  const d = Math.floor(diff / day);
  diff -= d * day;
  const h = Math.floor(diff / hr);
  diff -= h * hr;
  const m = Math.floor(diff / min);
  diff -= m * min;
  const s = Math.floor(diff / 1000);
  return {
    d: String(d).padStart(2, "0"),
    h: String(h).padStart(2, "0"),
    m: String(m).padStart(2, "0"),
    s: String(s).padStart(2, "0"),
    done,
    total: target - now,
  };
}

type Props = {
  target?: string;
  variant?: Variant;
  className?: string;
  prefix?: string;
  hideWhenDone?: boolean;
};

export default function Countdown({
  target = HOUSE_TOUR_TARGET,
  variant = "compact",
  className,
  prefix,
  hideWhenDone,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [parts, setParts] = useState<Parts>(() =>
    compute(new Date(target).getTime(), Date.now())
  );

  useEffect(() => {
    setMounted(true);
    const t = new Date(target).getTime();
    const tick = () => setParts(compute(t, Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  if (!mounted) {
    if (variant === "dramatic") {
      return (
        <div className={`flex items-end gap-2 ${className ?? ""}`}>
          <Cell label="DAYS" value="--" big />
          <Sep big />
          <Cell label="HRS" value="--" big />
          <Sep big />
          <Cell label="MIN" value="--" big />
          <Sep big />
          <Cell label="SEC" value="--" big />
        </div>
      );
    }
    return (
      <span
        className={`font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--muted)] ${className ?? ""}`}
      >
        {prefix ? `${prefix} ` : ""}--d --:--:--
      </span>
    );
  }

  if (parts.done) {
    if (hideWhenDone) return null;
    return (
      <span
        className={`font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--accent)] ${className ?? ""}`}
      >
        Live now
      </span>
    );
  }

  if (variant === "dramatic") {
    return (
      <div
        className={`relative flex flex-wrap items-end gap-2 sm:gap-3 ${className ?? ""}`}
      >
        <Cell label="DAYS" value={parts.d} big />
        <Sep big />
        <Cell label="HRS" value={parts.h} big />
        <Sep big />
        <Cell label="MIN" value={parts.m} big />
        <Sep big />
        <Cell label="SEC" value={parts.s} big pulse />
      </div>
    );
  }

  return (
    <span
      className={`font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--fg)] ${className ?? ""}`}
    >
      {prefix ? <span className="text-[var(--muted)] mr-1">{prefix}</span> : null}
      <span className="text-[var(--accent)]">{parts.d}</span>d{" "}
      <span>{parts.h}</span>:<span>{parts.m}</span>:<span>{parts.s}</span>
    </span>
  );
}

function Cell({
  label,
  value,
  big,
  pulse,
}: {
  label: string;
  value: string;
  big?: boolean;
  pulse?: boolean;
}) {
  return (
    <div className="flex flex-col items-start">
      <span
        className={`${
          big ? "text-[clamp(56px,10vw,140px)]" : "text-2xl"
        } font-display leading-[0.85] tracking-tight ${pulse ? "text-[var(--accent)]" : ""}`}
      >
        {value}
      </span>
      <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--muted)]">
        {label}
      </span>
    </div>
  );
}

function Sep({ big }: { big?: boolean }) {
  return (
    <span
      className={`${big ? "text-[clamp(56px,10vw,140px)]" : "text-2xl"} font-display leading-[0.85] text-[var(--muted)]/40`}
      aria-hidden
    >
      :
    </span>
  );
}
