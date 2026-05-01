"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import * as THREE from "three";

function PhotoPlane({ url }: { url: string }) {
  const tex = useLoader(THREE.TextureLoader, url);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;

  const mesh = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime();
    // Gentle autonomous drift only — outer card handles the mouse parallax
    mesh.current.rotation.y = Math.sin(t * 0.18) * 0.03;
    mesh.current.rotation.x = Math.cos(t * 0.13) * 0.02;
  });

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[3.6, 3.6, 32, 32]} />
      <meshBasicMaterial map={tex} toneMapped={false} />
    </mesh>
  );
}

type Props = {
  src: string;
  className?: string;
};

export default function GroupPhoto3D({ src, className }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, mx: 50, my: 50, hover: false });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!wrapRef.current) return;
    const r = wrapRef.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    // Tilt: ±10° on Y, ±8° on X
    const ry = (px - 0.5) * 16;
    const rx = -(py - 0.5) * 12;
    setTilt({ rx, ry, mx: px * 100, my: py * 100, hover: true });
  };

  const onLeave = () => {
    setTilt({ rx: 0, ry: 0, mx: 50, my: 50, hover: false });
  };

  return (
    <div
      ref={wrapRef}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`relative aspect-square w-full ${className ?? ""}`}
      style={{ perspective: "1400px" }}
    >
      {/* Card surface that tilts with the mouse */}
      <div
        className="relative size-full transition-transform duration-200 ease-out will-change-transform"
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${tilt.hover ? 1.02 : 1})`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Photo frame — rounded corners, overflow-hidden internally */}
        <div className="absolute inset-0 overflow-hidden rounded-[28px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt="TheCoreBoys group photo — Marlon, Lacy, Silky, Adapt, Ron and Jason"
            className="absolute inset-0 size-full object-cover"
            loading="eager"
          />
          <Canvas
            camera={{ position: [0, 0, 4.5], fov: 38 }}
            dpr={[1, 1.4]}
            gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
            style={{ background: "transparent" }}
          >
            <Suspense fallback={null}>
              <PhotoPlane url={src} />
            </Suspense>
          </Canvas>

          {/* Mouse-following gloss highlight (sits on top of the image) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 mix-blend-screen transition-opacity duration-300"
            style={{
              opacity: tilt.hover ? 0.5 : 0,
              background: `radial-gradient(circle at ${tilt.mx}% ${tilt.my}%, rgba(255,255,255,0.18), transparent 45%)`,
            }}
          />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 mix-blend-soft-light"
            style={{
              background:
                "repeating-linear-gradient(to bottom, rgba(255,255,255,0.04) 0, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 3px)",
            }}
          />

          {/* Inset rim — sits forward in 3D space */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-2 rounded-[20px] border border-white/5"
          />
        </div>

      </div>

      {/* Soft accent bloom under the card (stays put — sells depth) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[40px] opacity-50 blur-2xl transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(255,59,31,0.18), transparent 70%)",
          opacity: tilt.hover ? 0.85 : 0.45,
        }}
      />
    </div>
  );
}
