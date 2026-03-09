import type { NextConfig } from "next";

const isGithubPages = process.env.NEXT_PUBLIC_DEPLOY_TARGET === "github-pages";
const repoName = process.env.NEXT_PUBLIC_GITHUB_REPO ?? "";

const nextConfig: NextConfig = {
  ...(isGithubPages
    ? {
        output: "export",
        images: { unoptimized: true },
        trailingSlash: true,
        basePath: repoName ? `/${repoName}` : "",
        assetPrefix: repoName ? `/${repoName}/` : undefined,
      }
    : {}),
};

export default nextConfig;
