/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "localhost",
        port: "44316",
        pathname: "/**", // This allows all image paths
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/**", // This allows all image paths
      },
      {
        protocol: "https",
        hostname: "kapraywagera.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "th.bing.com",
        pathname: "/**",
      },
            {
        protocol: "https",
        hostname: "zameenblog.s3.amazonaws.com",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    unoptimized: true,
  },
};

export default nextConfig;
