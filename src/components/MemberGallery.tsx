"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";

type Props = {
  slug: string;
  count: number;
  alias: string;
  color: string;
};

export default function MemberGallery({ slug, count, alias, color }: Props) {
  const images = useMemo(
    () => Array.from({ length: count }, (_, i) => `/gallery/${slug}/${i + 1}.jpg`),
    [slug, count]
  );

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length]
  );
  const prev = useCallback(
    () =>
      setOpenIndex((i) =>
        i === null ? null : (i - 1 + images.length) % images.length
      ),
    [images.length]
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openIndex, close, next, prev]);

  if (count <= 0) return null;

  // Split into two strips so we can scroll them in opposite directions.
  // Both strips contain unique images (no repeats inside one cycle).
  const half = Math.ceil(images.length / 2);
  const stripA = { items: images.slice(0, half), startIdx: 0 };
  const stripB = { items: images.slice(half), startIdx: half };

  return (
    <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden border-y border-[var(--line)] bg-[var(--bg)] py-10">
      <header className="mx-auto mb-6 max-w-[1400px] px-5 sm:px-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">
          Gallery
        </p>
        <h2 className="mt-2 font-display text-[clamp(28px,3.6vw,52px)] leading-[0.95] tracking-tight">
          <span style={{ color }}>{alias}</span>
          <span className="text-[var(--muted)]">, in frame.</span>
        </h2>
      </header>

      <Marquee
        items={stripA.items}
        startIdx={stripA.startIdx}
        direction="left"
        onOpen={setOpenIndex}
      />
      <div className="mt-3">
        <Marquee
          items={stripB.items}
          startIdx={stripB.startIdx}
          direction="right"
          speed={75}
          onOpen={setOpenIndex}
        />
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--bg)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--bg)] to-transparent" />

      <Lightbox
        images={images}
        openIndex={openIndex}
        onClose={close}
        onPrev={prev}
        onNext={next}
        alias={alias}
        color={color}
      />
    </section>
  );
}

function Marquee({
  items,
  startIdx,
  direction,
  speed = 60,
  onOpen,
}: {
  items: string[];
  startIdx: number;
  direction: "left" | "right";
  speed?: number;
  onOpen: (idx: number) => void;
}) {
  // Duplicate the strip so the loop is seamless. Use margin-right per item
  // (NOT flex `gap`) so each item is fully self-contained — translateX(-50%)
  // then lands exactly on the start of the second copy with no half-gap
  // jump or blank space.
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <div
        className="flex w-max will-change-transform"
        style={{
          animation: `gallery-${direction} ${speed}s linear infinite`,
        }}
      >
        {doubled.map((src, i) => {
          const realIndex = startIdx + (i % items.length);
          return (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => onOpen(realIndex)}
              aria-label={`Open photo ${realIndex + 1}`}
              className="group relative mr-4 size-[360px] shrink-0 cursor-zoom-in overflow-hidden border border-[var(--line)] bg-black transition-transform duration-300 hover:-translate-y-1 hover:border-[var(--accent)] sm:size-[420px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                loading="eager"
                decoding="async"
                className="block size-full select-none object-cover transition duration-500 group-hover:scale-[1.03]"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Lightbox({
  images,
  openIndex,
  onClose,
  onPrev,
  onNext,
  alias,
  color,
}: {
  images: string[];
  openIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  alias: string;
  color: string;
}) {
  return (
    <AnimatePresence>
      {openIndex !== null && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md"
          onClick={onClose}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Previous"
            className="absolute left-4 top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur transition hover:border-[var(--accent)] hover:text-[var(--accent)] sm:left-8"
          >
            <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
              <path
                d="M11 2L5 8l6 6"
                stroke="currentColor"
                strokeWidth="1.6"
                fill="none"
                strokeLinecap="square"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Next"
            className="absolute right-4 top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur transition hover:border-[var(--accent)] hover:text-[var(--accent)] sm:right-8"
          >
            <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
              <path
                d="M5 2l6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.6"
                fill="none"
                strokeLinecap="square"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
              <path
                d="M3 3l10 10M13 3L3 13"
                stroke="currentColor"
                strokeWidth="1.6"
                fill="none"
                strokeLinecap="square"
              />
            </svg>
          </button>

          <motion.div
            key={openIndex}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.2, 0.7, 0.2, 1] }}
            className="relative mx-4 max-h-[88vh] w-[min(1100px,92vw)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/5] max-h-[88vh] w-full overflow-hidden border border-[var(--line)] bg-black sm:aspect-auto sm:h-[88vh]">
              <Image
                src={images[openIndex]}
                alt={`${alias} — frame ${openIndex + 1}`}
                fill
                sizes="(max-width: 640px) 92vw, min(1100px, 92vw)"
                className="object-contain"
                priority
              />
            </div>
            <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--muted)]">
              <span style={{ color }}>{alias}</span>
              <span>
                {openIndex + 1} / {images.length}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
