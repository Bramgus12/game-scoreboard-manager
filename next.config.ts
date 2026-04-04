import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { withPostHogConfig } from "@posthog/nextjs-config";

const nextConfig: NextConfig = {
    async rewrites() {
        return {
            beforeFiles: [
                {
                    source: "/p/static/:path*",
                    destination: "https://eu-assets.i.posthog.com/static/:path*",
                },
                {
                    source: "/p/:path*",
                    destination: "https://eu.i.posthog.com/:path*",
                },
            ],
            afterFiles: [],
            fallback: [],
        };
    },
    skipTrailingSlashRedirect: true,
};

const enableSourcemaps =
    process.env.POSTHOG_API_KEY != null && process.env.POSTHOG_PROJECT_ID != null;

const withNextIntl = createNextIntlPlugin();
const withIntlConfig = withNextIntl(nextConfig);

export default enableSourcemaps
    ? withPostHogConfig(withIntlConfig, {
          personalApiKey: process.env.POSTHOG_API_KEY!,
          projectId: process.env.POSTHOG_PROJECT_ID!,
          host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
          sourcemaps: {
              enabled: true,
              deleteAfterUpload: true,
          },
      })
    : withIntlConfig;
