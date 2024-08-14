/** @type {import('next').NextConfig} */

import { execSync } from "child_process";

const nextConfig = {
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    config.module.rules.push({
      test: /\.(js|ts|jsx|tsx)$/,
      use: [
        {
          loader: '@qa-compass/code-jump-webpack-react',
          options: {
            service: "github",
            repoUrl: 'https://github.com/qa-compass/nextjs-postgres-nextauth-tailwindcss-template-playground',
            branch: process.env.VERCEL_GIT_COMMIT_REF || execSync("git rev-parse --abbrev-ref HEAD").toString().trimEnd(),
            commit: execSync("git rev-parse HEAD").toString().trimEnd(),
          }
        }
      ],
      exclude: /node_modules/,
    }
    );
    // When developing on localhost, the code jump feature will not notice
    // if you change your branch unless you disable webpack's cache.
    // Alternatively you can do this after every branch change:
    // rm -rf node_modules/.cache
    // The cache might be in a different place e.g. for Turbopack:
    // rm -rf node_modules/.next/cache
    // config.cache = false
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com'
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com'
      }
    ]
  }
};

export default nextConfig;
