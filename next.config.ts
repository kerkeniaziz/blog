import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn-icons-png.flaticon.com',
        port: '',
        pathname: '/512/888/**',
        search: '',
      },
      {
        protocol: "https",
        hostname: "cdn.flyonui.com",
        port: "",
        pathname: "/fy-assets/avatar/**",
        search: "",
      },
    ],


},
}

export default nextConfig;
