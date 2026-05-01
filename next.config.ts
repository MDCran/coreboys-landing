import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    // next/image's optimizer needs a server runtime; for `output: 'export'`
    // we ship the original assets and let the browser serve them directly.
    unoptimized: true,
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
