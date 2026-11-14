import { ArrowRight, Users01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { BackgroundPattern } from "@/components/shared-assets/background-patterns";

/**
 * Untitled UI gradient CTA block — brand-solid section with a centered
 * FeaturedIcon accent, grid background pattern, subtle grain texture and a
 * single primary CTA (one primary per screen). On-brand signal red.
 */
export default function BrandCTA() {
  return (
    <section className="relative px-4 pb-16 sm:px-8">
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-2xl bg-brand-solid shadow-xl ring-1 ring-inset ring-white/10">
        {/* Grid pattern accent — top-centred, masked radially */}
        <BackgroundPattern
          pattern="grid"
          size="lg"
          className="absolute left-1/2 top-0 z-0 -translate-x-1/2 -translate-y-1/4 text-white/15"
        />
        {/* Subtle grain texture */}
        <div className="grain absolute inset-0 z-[1]" aria-hidden />
        {/* Warm radial light */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(60%_80%_at_50%_-10%,_rgba(255,255,255,0.18),_transparent_70%)]"
        />

        <div className="relative z-10 flex flex-col items-center px-6 py-16 text-center sm:px-10 sm:py-20 lg:py-24">
          <FeaturedIcon
            icon={<Users01 className="size-7" />}
            color="brand"
            theme="dark"
            size="xl"
            className="bg-white/10 ring-1 ring-inset ring-white/20 before:border-white/20"
          />

          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-white/70">
            Create · Own · Run · Everything
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-[clamp(40px,6vw,84px)] leading-[0.9] tracking-tight text-white text-balance">
            Six creators. One house.
          </h2>
          <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-white/85">
            Built, owned and run by the people on screen. Meet the roster or
            follow CORE across every channel.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button
              href="#members"
              size="xl"
              color="secondary"
              iconTrailing={<ArrowRight data-icon className="size-5 shrink-0" />}
            >
              Meet the roster
            </Button>
            <a
              href="https://x.com/thecoreboys"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/90 ring-1 ring-inset ring-white/30 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Follow @thecoreboys
              <ArrowRight data-icon className="size-4 shrink-0" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
