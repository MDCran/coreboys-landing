import { ArrowRight } from "@untitledui/icons";

export default function MaintenanceBanner() {
  return (
    <div className="relative z-50 w-full border-b border-secondary bg-secondary">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-center gap-2 px-4 py-2.5 text-center sm:flex-row sm:gap-3 sm:px-8">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-solid px-2.5 py-0.5 text-xs font-semibold text-white shadow-xs-skeuomorphic ring-1 ring-inset ring-white/12">
          <span className="relative flex size-1.5 shrink-0">
            <span
              className="absolute inset-0 rounded-full bg-white/90 animate-blink"
              aria-hidden
            />
          </span>
          Under Maintenance
        </span>
        <p className="text-sm text-tertiary">
          This is a temporary, unofficial site.
        </p>
        <a
          href="https://forms.gle/rXxGwpb8rY7WJwHC9"
          target="_blank"
          rel="noreferrer noopener"
          className="group inline-flex items-center gap-1 text-sm font-semibold text-brand-secondary transition hover:text-brand-secondary_hover"
        >
          Share feedback
          <ArrowRight
            data-icon
            className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </a>
      </div>
    </div>
  );
}
