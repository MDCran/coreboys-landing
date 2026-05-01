export default function MaintenanceBanner() {
  return (
    <div className="relative z-50 w-full border-b border-[var(--accent)]/25 bg-[var(--bg)]">
      <div className="mx-auto flex max-w-[1400px] items-center justify-center gap-2.5 px-5 py-1.5 sm:px-8">
        <span className="relative flex size-1.5 shrink-0">
          <span
            className="absolute inset-0 rounded-full bg-[var(--accent)] animate-blink"
            aria-hidden
          />
        </span>
        <p className="text-center font-mono text-[10px] tracking-[0.2em] text-[var(--muted)]">
          <span className="uppercase text-[var(--accent)]">Under Maintenance</span>
          <span className="mx-2 text-[var(--muted)]/40">·</span>
          This is a temporary, unofficial site. If you enjoy it, maybe I can
          make an official website.
        </p>
      </div>
    </div>
  );
}
