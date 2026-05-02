import type { Metadata } from "next";

const REDIRECT_URL = "https://corecrew.org";

export const metadata: Metadata = {
  title: "Redirecting to corecrew.org",
  robots: { index: false, follow: false },
  alternates: { canonical: REDIRECT_URL },
};

export default function RootLayout({
  children: _children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="refresh" content={`0; url=${REDIRECT_URL}`} />
        <link rel="canonical" href={REDIRECT_URL} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.location.replace(${JSON.stringify(REDIRECT_URL)});`,
          }}
        />
      </head>
      <body>
        <p>
          Redirecting to <a href={REDIRECT_URL}>{REDIRECT_URL}</a>…
        </p>
      </body>
    </html>
  );
}
