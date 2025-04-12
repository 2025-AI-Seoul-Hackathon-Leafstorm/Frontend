import type { NextConfig } from "next";

const config: NextConfig = {
    images: {
        unoptimized: true,
    },
  // No custom webpack config needed for Turbopack
};

export default config;
