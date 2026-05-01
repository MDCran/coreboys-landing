import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
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
          color: "#ff3b1f",
          fontSize: 56,
          fontWeight: 800,
          fontFamily: "Helvetica, Arial, sans-serif",
          letterSpacing: -2,
          lineHeight: 1,
          paddingBottom: 4,
        }}
      >
        C
      </div>
    ),
    { ...size }
  );
}
