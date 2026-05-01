"use client";

import dynamic from "next/dynamic";

const GroupPhoto3D = dynamic(() => import("./GroupPhoto3D"), {
  ssr: false,
  loading: () => (
    <div className="aspect-square w-full animate-pulse bg-[var(--bg)]/40" />
  ),
});

export default function GroupPhoto3DClient(props: { src: string; className?: string }) {
  return <GroupPhoto3D {...props} />;
}
