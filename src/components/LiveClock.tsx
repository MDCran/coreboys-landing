"use client";

import { useEffect, useState } from "react";

export default function LiveClock() {
  const [now, setNow] = useState<string>("--:--:--");

  useEffect(() => {
    const fmt = () => {
      const d = new Date();
      const hh = String(d.getUTCHours()).padStart(2, "0");
      const mm = String(d.getUTCMinutes()).padStart(2, "0");
      const ss = String(d.getUTCSeconds()).padStart(2, "0");
      return `${hh}:${mm}:${ss} UTC`;
    };
    setNow(fmt());
    const id = setInterval(() => setNow(fmt()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--muted)]">
      {now}
    </span>
  );
}
