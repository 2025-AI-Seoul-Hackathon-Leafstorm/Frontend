import type { NextConfig } from "next";

const config: NextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    
    return config;
  },
};

export default config;
