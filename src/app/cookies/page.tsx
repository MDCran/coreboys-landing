import type { Metadata } from "next";
import Link from "next/link";
import { GA_ID } from "@/lib/site";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "What cookies the CORE (Create Own Run Everything) maintenance lander sets and why.",
  alternates: { canonical: "/cookies" },
  robots: { index: true, follow: true },
};

export default function CookiesPage() {
  return (
    <>
    <main className="mx-auto max-w-[860px] px-6 pt-20 pb-24 sm:px-10">
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">
        Legal · 03
      </p>
      <h1 className="mt-4 font-display text-[clamp(56px,9vw,120px)] leading-[0.88] tracking-tight">
        Cookie Policy
      </h1>
      <div className="mt-10 space-y-5 leading-relaxed text-[var(--fg)]/85">
        <p>
          A cookie is a small text file a website stores on your device. The
          CORE maintenance lander uses cookies sparingly, and only to measure
          aggregate traffic and remember your preferences for the lander.
        </p>
        <h2>Cookies we set</h2>
        <div className="overflow-x-auto border border-[var(--line)]">
          <table className="w-full text-left text-sm">
            <thead className="bg-[var(--bg)]/40">
              <tr className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
                <th className="px-4 py-3">Cookie</th>
                <th className="px-4 py-3">Provider</th>
                <th className="px-4 py-3">Purpose</th>
                <th className="px-4 py-3">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--line)]">
              <tr>
                <td className="px-4 py-3 font-mono text-xs">_ga</td>
                <td className="px-4 py-3">Google Analytics ({GA_ID})</td>
                <td className="px-4 py-3">Distinguishes unique visitors</td>
                <td className="px-4 py-3">2 years</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">_ga_*</td>
                <td className="px-4 py-3">Google Analytics ({GA_ID})</td>
                <td className="px-4 py-3">Persists session state</td>
                <td className="px-4 py-3">2 years</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">_gid</td>
                <td className="px-4 py-3">Google Analytics ({GA_ID})</td>
                <td className="px-4 py-3">Distinguishes users</td>
                <td className="px-4 py-3">24 hours</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h2>Embedded content</h2>
        <p>
          The lander embeds a YouTube video on the homepage. YouTube may set
          its own cookies once you press play, governed by Google&apos;s
          privacy and cookie policies.
        </p>
        <h2>Disabling cookies</h2>
        <p>
          You can disable cookies in your browser settings or install the{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noreferrer noopener"
            className="underline"
          >
            Google Analytics opt-out browser add-on
          </a>
          . The lander will continue to work fully without cookies.
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
