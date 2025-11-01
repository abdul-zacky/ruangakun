/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "www.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "static.canva.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "cnbl-cdn.bamgrid.com",
      },
      {
        protocol: "https",
        hostname: "www.viu.com",
      },
      {
        protocol: "https",
        hostname: "music.youtube.com",
      },
      {
        protocol: "https",
        hostname: "www.adobe.com",
      },
    ],
  },
};

export default nextConfig;
