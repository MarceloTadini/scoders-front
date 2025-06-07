import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Permite imagens de qualquer domínio
      },
    ],
  },
  env:{
    BASE_URL: "https://product-api-7chz.onrender.com",//http://localhost:3000/
  }
};

export default nextConfig;