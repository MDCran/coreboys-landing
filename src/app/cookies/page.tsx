import type { Metadata } from "next";
import { Cube01 } from "@untitledui/icons";
import { GA_ID } from "@/lib/site";
import LegalShell from "@/components/LegalShell";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "What cookies the CORE (Create Own Run Everything) maintenance lander sets and why.",
  alternates: { canonical: "/cookies" },
  robots: { index: true, follow: true },
};

export default function CookiesPage() {
  return (
    <LegalShell
      eyebrow="Legal · 03"
      title="Cookie Policy"
      supportingText="The cookies the CORE maintenance lander sets, what they do, and how to disable them."
      icon={<Cube01 className="size-7" />}
    >
      <p>
        A cookie is a small text file a website stores on your device. The CORE
        maintenance lander uses cookies sparingly, and only to measure aggregate
        traffic and remember your preferences for the lander.
      </p>
      <h2>Cookies we set</h2>
      <div className="not-prose mt-4 overflow-x-auto rounded-xl border border-secondary shadow-xs">
        <table className="w-full text-left text-sm">
          <thead className="bg-primary">
            <tr className="font-mono text-[10px] uppercase tracking-[0.18em] text-tertiary">
              <th className="px-4 py-3 font-medium">Cookie</th>
              <th className="px-4 py-3 font-medium">Provider</th>
              <th className="px-4 py-3 font-medium">Purpose</th>
              <th className="px-4 py-3 font-medium">Duration</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border-secondary)] text-secondary">
            <tr>
              <td className="px-4 py-3 font-mono text-xs text-brand-secondary">_ga</td>
              <td className="px-4 py-3">Google Analytics ({GA_ID})</td>
              <td className="px-4 py-3">Distinguishes unique visitors</td>
              <td className="px-4 py-3">2 years</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-xs text-brand-secondary">_ga_*</td>
              <td className="px-4 py-3">Google Analytics ({GA_ID})</td>
              <td className="px-4 py-3">Persists session state</td>
              <td className="px-4 py-3">2 years</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-xs text-brand-secondary">_gid</td>
              <td className="px-4 py-3">Google Analytics ({GA_ID})</td>
              <td className="px-4 py-3">Distinguishes users</td>
              <td className="px-4 py-3">24 hours</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2>Embedded content</h2>
      <p>
        The lander embeds a YouTube video on the homepage. YouTube may set its own
        cookies once you press play, governed by Google&apos;s privacy and cookie
        policies.
      </p>
      <h2>Disabling cookies</h2>
      <p>
        You can disable cookies in your browser settings or install the{" "}
        <a
          href="https://tools.google.com/dlpage/gaoptout"
          target="_blank"
          rel="noreferrer noopener"
        >
          Google Analytics opt-out browser add-on
        </a>
        . The lander will continue to work fully without cookies.
      </p>
      <p className="text-tertiary">
        Effective date:{" "}
        {new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
    </LegalShell>
  );
}
