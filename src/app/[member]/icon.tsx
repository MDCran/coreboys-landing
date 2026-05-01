import fs from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { MEMBERS, getMember } from "@/lib/data";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export function generateStaticParams() {
  return MEMBERS.map((m) => ({ member: m.slug }));
}

// Detect image format from the first few bytes — important because some of
// the community "PNG" files are actually WebP under the hood, which Satori
// (next/og) cannot decode. We use the detected format to set the correct
// MIME type when embedding the image in the rendered SVG.
function detectMime(buf: Buffer): string | null {
  if (buf.length < 12) return null;
  if (
    buf[0] === 0x89 &&
    buf[1] === 0x50 &&
    buf[2] === 0x4e &&
    buf[3] === 0x47
  ) return "image/png";
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "image/jpeg";
  if (
    buf[0] === 0x52 &&
    buf[1] === 0x49 &&
    buf[2] === 0x46 &&
    buf[3] === 0x46 &&
    buf[8] === 0x57 &&
    buf[9] === 0x45 &&
    buf[10] === 0x42 &&
    buf[11] === 0x50
  ) return "image/webp";
  if (buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46) return "image/gif";
  return null;
}

export default async function Icon({
  params,
}: {
  params: Promise<{ member: string }>;
}) {
  const { member } = await params;
  const m = getMember(member);

  if (m?.community?.logo) {
    try {
      const filePath = path.join(
        process.cwd(),
        "public",
        m.community.logo.replace(/^\//, "")
      );
      const buf = await fs.readFile(filePath);
      const mime = detectMime(buf);

      // Satori (next/og) supports PNG and JPEG. If the source is one of
      // those we render through ImageResponse so the favicon is consistent.
      // Otherwise (e.g. WebP) we serve the raw file directly with the right
      // content-type — browsers handle WebP favicons natively.
      if (mime === "image/png" || mime === "image/jpeg") {
        const dataUri = `data:${mime};base64,${buf.toString("base64")}`;
        return new ImageResponse(
          (
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "#0a0908",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={dataUri}
                alt=""
                width={size.width - 8}
                height={size.height - 8}
                style={{ objectFit: "contain" }}
              />
            </div>
          ),
          { ...size }
        );
      }

      if (mime) {
        return new Response(new Uint8Array(buf), {
          headers: {
            "content-type": mime,
            "cache-control": "public, max-age=31536000, immutable",
          },
        });
      }
    } catch {
      // fall through to letter fallback
    }
  }

  // Last-resort fallback — alias's first letter
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0908",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: m?.color ?? "#ff3b1f",
          fontSize: 48,
          fontWeight: 800,
          fontFamily: "Helvetica, Arial, sans-serif",
        }}
      >
        {m?.alias?.[0] ?? "C"}
      </div>
    ),
    { ...size }
  );
}
