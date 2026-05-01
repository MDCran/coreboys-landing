import type { Metadata } from "next";
import Link from "next/link";
import { GA_ID, SITE_URL } from "@/lib/site";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How the CORE (Create Own Run Everything) maintenance lander handles visitor data, analytics and cookies.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
    <main className="mx-auto max-w-[860px] px-6 pt-20 pb-24 sm:px-10">
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">
        Legal · 02
      </p>
      <h1 className="mt-4 font-display text-[clamp(56px,9vw,120px)] leading-[0.88] tracking-tight">
        Privacy Policy
      </h1>
      <div className="mt-10 space-y-5 leading-relaxed text-[var(--fg)]/85">
        <p>
          CORE Inc. (&ldquo;CORE&rdquo;) operates this
          maintenance lander at{" "}
          <Link href="/" className="underline">
            {SITE_URL}
          </Link>
          . This policy explains what limited data the Site collects and how it
          is used.
        </p>
        <h2>What we collect</h2>
        <p>
          The Site does not require you to create an account, log in, or
          submit any personal information. We collect only the data
          automatically gathered by Google Analytics for traffic measurement
          (property <code>{GA_ID}</code>): page views, anonymized IP, browser
          and device class, referrer, and approximate location at country
          level.
        </p>
        <h2>Cookies</h2>
        <p>
          The Site sets a small number of analytics cookies via Google
          Analytics. See our{" "}
          <Link href="/cookies" className="underline">
            Cookie Policy
          </Link>{" "}
          for the list and durations.
        </p>
        <h2>Third-party links</h2>
        <p>
          The Site links out to YouTube, TikTok, Twitch, Instagram, X and
          Snapchat. Each platform has its own privacy practices; we are not
          responsible for those.
        </p>
        <h2>Live-status data</h2>
        <p>
          The live indicator next to each member queries a public, third-party
          uptime endpoint to determine whether their Twitch channel is
          currently broadcasting. No visitor data is sent in that request.
        </p>
        <h2>Children</h2>
        <p>
          The Site is not directed at children under 13 and does not knowingly
          collect personal data from them.
        </p>
        <h2>Your rights</h2>
        <p>
          Depending on your jurisdiction (GDPR, CCPA, etc.) you may request
          access to or deletion of any personal data tied to you. Because the
          Site collects no account data, requests should be directed to Google
          for the analytics record. You can opt out of Google Analytics at
          any time using the{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noreferrer noopener"
            className="underline"
          >
            Google Analytics opt-out browser add-on
          </a>
          .
        </p>
        <h2>Contact</h2>
        <p>
          CORE Inc. — or via the official group channels linked from the
          homepage.
        </p>
        <p className="mt-10 text-[var(--muted)]">
          Effective date:{" "}
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
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
