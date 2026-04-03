import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl =
        process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ??
        "http://localhost:3000";

    return {
        rules: [
            {
                userAgent: "*",
                allow: [
                    "/",
                    "/en",
                    "/nl",
                    "/en/sign-in",
                    "/nl/sign-in",
                    "/en/how-to-play/",
                    "/nl/how-to-play/",
                ],
                disallow: [
                    "/api/",
                    "/en/scoreboards",
                    "/nl/scoreboards",
                    "/en/scoreboard/",
                    "/nl/scoreboard/",
                ],
            },
        ],
        sitemap: [`${baseUrl}/sitemap.xml`],
    };
}
