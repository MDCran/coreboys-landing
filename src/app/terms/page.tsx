import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for the CORE (Create Own Run Everything) maintenance lander operated by CORE Inc.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <LegalShell title="Terms of Service" eyebrow="Legal · 01">
      <p>
        These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and
        use of the CORE (Create Own Run Everything) maintenance lander located
        at <Link href="/" className="underline">{SITE_URL}</Link> (the
        &ldquo;Site&rdquo;), operated by CORE Inc., 3712 Brawdlawn Dr.
        (&ldquo;CORE,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;). By using the
        Site you agree to these Terms.
      </p>
      <h2>1. The Site</h2>
      <p>
        The Site is a temporary lander published while the primary CORE website
        is undergoing maintenance. It exists to surface official links to the
        CORE group and member social channels and contains no
        user-account features, e-commerce, or paid services.
      </p>
      <h2>2. Member channels</h2>
      <p>
        Links to channels operated by CORE members and the group are provided
        for convenience. Those third-party platforms have their own terms of
        service which govern your use of those channels.
      </p>
      <h2>3. Intellectual property</h2>
      <p>
        The CORE name, the &ldquo;Create Own Run Everything&rdquo; mark, the
        member aliases and likenesses, and the layout, text and design of the
        Site are owned by CORE Inc. or the individual members and may not be
        reproduced without permission.
      </p>
      <h2>4. No warranty</h2>
      <p>
        The Site is provided on an &ldquo;as is&rdquo; basis. We make no
        warranties of any kind regarding availability, accuracy of third-party
        links, or live-status indicators that depend on external services.
      </p>
      <h2>5. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, CORE Inc. and its members are
        not liable for any indirect, incidental or consequential damages
        arising out of your use of the Site.
      </p>
      <h2>6. Changes</h2>
      <p>
        We may update these Terms from time to time. Material changes will be
        reflected by an updated effective date below. Continued use of the
        Site constitutes acceptance of the updated Terms.
      </p>
      <h2>7. Contact</h2>
      <p>
        Questions about these Terms can be directed to CORE Inc., 3712
        Brawdlawn Dr., or via the official group channels linked from the
        homepage.
      </p>
      <p className="mt-10 text-[var(--muted)]">
        Effective date: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
      </p>
    </LegalShell>
  );
}

function LegalShell({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="mx-auto max-w-[860px] px-6 pt-20 pb-24 sm:px-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">
          {eyebrow}
        </p>
        <h1 className="mt-4 font-display text-[clamp(56px,9vw,120px)] leading-[0.88] tracking-tight">
          {title}
        </h1>
        <div className="legal-prose mt-10 space-y-5 text-[var(--fg)]/85 leading-relaxed">
          {children}
        </div>
        <Link
          href="/"
          className="mt-16 inline-flex items-center gap-2 border border-[var(--line)] px-4 py-3 font-mono text-[11px] uppercase tracking-[0.18em] transition hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--bg)]"
        >
          ← Back to CORE
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
