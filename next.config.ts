import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";



const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "www.shutterstock.com",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
      },
         {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
      },

    {
      protocol:"https",
      hostname:"picsum.photos"
    }



      
    ],
  },
};


const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
