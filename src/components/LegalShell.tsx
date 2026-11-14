"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { BackgroundPattern } from "@/components/shared-assets/background-patterns";
import SiteFooter from "@/components/SiteFooter";

type Props = {
  /** Small numbered eyebrow, e.g. "Legal · 01" */
  eyebrow: string;
  /** Display heading, e.g. "Privacy Policy" */
  title: string;
  /** One-line supporting description shown under the title */
  supportingText: string;
  /** FeaturedIcon glyph element, e.g. <FileShield02 /> */
  icon: ReactNode;
  children: ReactNode;
};

export default function LegalShell({
  eyebrow,
  title,
  supportingText,
  icon,
  children,
}: Props) {
  return (
    <>
      <main className="relative mx-auto max-w-[920px] px-4 pt-16 pb-24 sm:px-8 lg:pt-24">
        {/* Decorative grid pattern behind the section header */}
        <BackgroundPattern
          pattern="grid"
          size="md"
          className="absolute left-0 top-0 z-0 -translate-x-1/3 -translate-y-1/4 text-border-secondary/70"
        />
        {/* Section header */}
        <header className="relative z-10 flex flex-col items-start gap-5">
          <FeaturedIcon icon={icon} color="brand" theme="dark" size="xl" />
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-brand-secondary">
            {eyebrow}
          </p>
          <h1 className="font-display text-[clamp(48px,8vw,104px)] leading-[0.9] tracking-tight text-primary">
            {title}
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-tertiary">
            {supportingText}
          </p>
        </header>

        {/* Body card */}
        <div className="mt-10 rounded-2xl border border-secondary bg-secondary p-6 shadow-xl ring-1 ring-inset ring-secondary_alt sm:mt-12 sm:p-10">
          <article
            className="legal-prose prose prose-invert max-w-none
              prose-headings:font-display prose-headings:tracking-tight prose-headings:text-primary
              prose-h2:mt-8 prose-h2:mb-3 prose-h2:text-2xl
              prose-p:text-secondary prose-p:leading-relaxed
              prose-li:text-secondary
              prose-a:font-semibold prose-a:text-brand-secondary prose-a:no-underline hover:prose-a:underline hover:prose-a:text-brand-secondary_hover
              prose-code:rounded-md prose-code:bg-primary prose-code:px-1.5 prose-code:py-0.5 prose-code:text-brand-secondary prose-code:before:content-none prose-code:after:content-none
              prose-strong:text-primary
              prose-table:overflow-hidden prose-th:text-tertiary prose-td:text-secondary"
          >
            {children}
          </article>
        </div>

        {/* Back CTA */}
        <div className="mt-10">
          <Button href="/" color="secondary" size="lg" iconLeading={ArrowLeft}>
            Back to CORE
          </Button>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

export { Link };
