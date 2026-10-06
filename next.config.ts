import { execSync } from "node:child_process";
import type { NextConfig } from "next";

// The site's build number is how many commits the branch has. Counted at build
// time and baked into the footer, so every deploy reports its own number. If git
// isn't available (or history is shallow), the footer falls back to "dev".
function commitCount(): string | undefined {
  try {
    return execSync("git rev-list --count HEAD", {
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
  } catch {
    return undefined;
  }
}

const nextConfig: NextConfig = {
  env: {
    SITE_BUILD_NUMBER: commitCount() ?? "dev",
  },
};

export default nextConfig;
