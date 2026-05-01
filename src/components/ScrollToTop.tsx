"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-top"
          type="button"
          onClick={toTop}
          aria-label="Scroll to top"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.22, ease: [0.2, 0.7, 0.2, 1] }}
          className="group fixed bottom-6 right-6 z-50 grid size-12 place-items-center rounded-full border border-[var(--accent)]/40 bg-[var(--bg)]/85 text-[var(--fg)] shadow-[0_12px_32px_-8px_rgba(255,59,31,0.45)] backdrop-blur-md transition hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--bg)] sm:bottom-8 sm:right-8 sm:size-14"
        >
          <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
            <path
              d="M8 13V3M3 7l5-4 5 4"
              stroke="currentColor"
              strokeWidth="1.6"
              fill="none"
              strokeLinecap="square"
            />
          </svg>
          <span className="sr-only">Scroll to top</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
