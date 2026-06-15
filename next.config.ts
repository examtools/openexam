import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
