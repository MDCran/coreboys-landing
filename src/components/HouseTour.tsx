"use client";

import { useRef, useState } from "react";
import Countdown, { HOUSE_TOUR_TARGET, useCountdownDone } from "./Countdown";

const VIDEO_ID = "Wrc7pCsGKTI";

function PlayTriangle() {
  // Optical-centered equilateral triangle. The geometric centroid (1/3 from
  // base) is offset right so the eye perceives it as centered on the disc.
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5 translate-x-[1.5px] text-[var(--bg)]"
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M7 5.5c0-1.1 1.2-1.8 2.1-1.2l9.7 6.5c.9.6.9 1.9 0 2.5l-9.7 6.5c-.9.6-2.1-.1-2.1-1.2V5.5Z"
      />
    </svg>
  );
}

export default function HouseTour() {
  const [playing, setPlaying] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, mx: 50, my: 50 });
  const wrapRef = useRef<HTMLDivElement>(null);
  const done = useCountdownDone(HOUSE_TOUR_TARGET);
  const thumb = `https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!wrapRef.current || playing) return;
    const r = wrapRef.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const ry = (px - 0.5) * 14;
    const rx = -(py - 0.5) * 10;
    setTilt({ rx, ry, mx: px * 100, my: py * 100 });
  };

  const onLeave = () => {
    setTilt({ rx: 0, ry: 0, mx: 50, my: 50 });
  };

  return (
    <section
      id="house-tour"
      className="relative mx-auto max-w-[1400px] px-5 pt-16 pb-24 sm:px-8 lg:pt-24 lg:pb-40"
    >
      <header className="mx-auto mb-10 flex max-w-[1080px] flex-col items-center gap-3 text-center">
        <h2 className="font-display text-[clamp(40px,6vw,96px)] leading-[0.9] tracking-tight">
          $20M house tour.{" "}
          <span className="text-[var(--accent)]">Roll the tape.</span>
        </h2>
      </header>

      <div
        ref={wrapRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ perspective: "1400px" }}
        className="group/tour relative mx-auto max-w-[1080px]"
      >
        {/* Idle glow that pulses to signal "this is clickable" */}
        {!playing && (
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-2 -z-10 rounded-[36px] bg-[radial-gradient(60%_60%_at_50%_50%,_rgba(255,59,31,0.35),_transparent_70%)] opacity-50 blur-2xl transition-opacity duration-500 group-hover/tour:opacity-90 animate-glow-pulse"
          />
        )}
        <div
          className="relative aspect-video w-full cursor-pointer overflow-hidden rounded-[28px] border border-[var(--line)] bg-black shadow-[0_30px_120px_-20px_rgba(255,59,31,0.35),0_10px_60px_-15px_rgba(0,0,0,0.9)] transition-[transform,border-color,box-shadow] duration-200 ease-out will-change-transform group-hover/tour:border-[var(--accent)]/60"
          style={{
            transform: playing
              ? "rotateX(0deg) rotateY(0deg) scale(1)"
              : `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(1.005)`,
            transformStyle: "preserve-3d",
          }}
        >
          {!playing ? (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label="Play CORE $20 million house tour"
              className="group absolute inset-0 grid place-items-center"
            >
              <picture>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thumb}
                  alt="CORE — $20 million house tour preview"
                  className="absolute inset-0 size-full object-cover opacity-85 transition group-hover:opacity-100"
                  loading="lazy"
                />
              </picture>

              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 mix-blend-screen transition-opacity duration-300"
                style={{
                  opacity: 0.6,
                  background: `radial-gradient(circle at ${tilt.mx}% ${tilt.my}%, rgba(255,255,255,0.22), transparent 45%)`,
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/85 via-[var(--bg)]/20 to-transparent" />
              <div className="absolute inset-0 mix-blend-screen bg-[radial-gradient(60%_50%_at_50%_50%,_rgba(255,59,31,0.18),_transparent_70%)]" />

              <div
                className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4"
                style={{
                  transform: "translateZ(60px)",
                  transformStyle: "preserve-3d",
                }}
              >
                <span
                  aria-hidden
                  className="play-btn relative inline-flex size-[60px] items-center justify-center rounded-full"
                >
                  <PlayTriangle />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--fg)]/85">
                  Watch on YouTube
                </span>
              </div>

              <div
                aria-hidden
                className="pointer-events-none absolute inset-2 rounded-[20px] border border-white/5"
              />
            </button>
          ) : (
            <iframe
              className="absolute inset-0 size-full rounded-[26px]"
              src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
              title="CORE — $20 million house tour"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          )}
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 -bottom-10 h-24 w-[80%] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(closest-side,_rgba(255,59,31,0.35),_transparent)] blur-2xl"
          style={{ transform: `translateX(-50%) rotateX(70deg) scale(${1 + Math.abs(tilt.ry) * 0.005})` }}
        />
      </div>

      {!done && (
        <div className="mt-20 grid grid-cols-12 gap-6 lg:mt-28">
          <div className="col-span-12 md:col-span-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">
              Twitch Livestream
            </p>
            <p className="mt-2 font-display text-[clamp(48px,8vw,108px)] leading-[0.85] tracking-tight">
              May 2 · <span className="text-[var(--accent)]">2 PM PST</span>
            </p>
            <p className="mt-3 max-w-md text-balance leading-relaxed text-[var(--fg)]/85">
              Mark your calendars for the boys&apos; first stream together as
              CORE!
            </p>
          </div>
          <div className="col-span-12 md:col-span-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">
              Countdown · Live
            </p>
            <Countdown
              target={HOUSE_TOUR_TARGET}
              variant="dramatic"
              className="mt-3"
              hideWhenDone
            />
          </div>
        </div>
      )}
    </section>
  );
}
