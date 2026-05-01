"use client";

import { motion } from "motion/react";

/**
 * Site-wide ambient texture: faint dot grid + drifting blooms + subtle
 * anamorphic lens-flare streaks. Pure GPU transforms — no layout cost.
 */
export default function BackgroundFx() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Dot grid texture */}
      <div className="absolute inset-0 bg-dot-grid opacity-[0.10]" />

      {/* Subtle gridlines on top of the dots */}
      <div className="absolute inset-0 bg-thin-grid opacity-[0.05]" />

      {/* Bloom A — accent red, top left */}
      <motion.div
        className="absolute -left-[10vw] top-[-20vh] size-[80vh] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,59,31,0.24), transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{ x: [0, 60, -20, 0], y: [0, 30, -20, 0] }}
        transition={{ duration: 38, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Bloom B — purple, mid-right */}
      <motion.div
        className="absolute right-[-10vw] top-[40vh] size-[70vh] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(145, 70, 255, 0.20), transparent 70%)",
          filter: "blur(50px)",
        }}
        animate={{ x: [0, -50, 30, 0], y: [0, 40, -30, 0] }}
        transition={{ duration: 46, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />

      {/* Bloom C — soft amber, bottom-center */}
      <motion.div
        className="absolute left-1/2 bottom-[-20vh] size-[90vh] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(244, 196, 67, 0.12), transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{ x: ["-50%", "-40%", "-58%", "-50%"], y: [0, -30, 20, 0] }}
        transition={{ duration: 54, repeat: Infinity, ease: "easeInOut", delay: 8 }}
      />

      {/* Anamorphic lens-flare streak — top right diagonal */}
      <motion.div
        className="absolute top-[5vh] right-[-15vw] h-[3px] w-[80vw] origin-left"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,90,60,0.45), rgba(255,180,120,0.35), transparent)",
          filter: "blur(2px)",
          transform: "rotate(-18deg)",
        }}
        animate={{ opacity: [0.0, 0.9, 0.4, 0.7, 0.0], x: [-20, 30, -10, 20, -20] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Lens-flare streak — mid left diagonal */}
      <motion.div
        className="absolute top-[55vh] left-[-15vw] h-[2px] w-[70vw] origin-left"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(180,140,255,0.35), rgba(220,200,255,0.25), transparent)",
          filter: "blur(2px)",
          transform: "rotate(12deg)",
        }}
        animate={{ opacity: [0.0, 0.6, 0.2, 0.55, 0.0], x: [0, 40, 10, 30, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 6 }}
      />

      {/* Tight lens-flare hot spot — pulses softly */}
      <motion.div
        className="absolute right-[18vw] top-[18vh] size-[180px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,220,200,0.35), transparent 70%)",
          filter: "blur(8px)",
          mixBlendMode: "screen",
        }}
        animate={{ opacity: [0.4, 0.9, 0.5, 0.85, 0.4], scale: [0.9, 1.08, 0.95, 1.05, 0.9] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Secondary flare hot spot */}
      <motion.div
        className="absolute left-[8vw] bottom-[20vh] size-[120px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(180,180,255,0.30), transparent 70%)",
          filter: "blur(6px)",
          mixBlendMode: "screen",
        }}
        animate={{ opacity: [0.3, 0.7, 0.4, 0.75, 0.3], scale: [0.92, 1.06, 0.95, 1.04, 0.92] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />

      {/* Subtle vignette to keep edges anchored */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_50%,_transparent_55%,_rgba(0,0,0,0.55)_100%)]" />
    </div>
  );
}
