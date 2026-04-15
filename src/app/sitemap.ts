import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();
    const baseUrl =
        process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ??
        "http://localhost:3000";

    return [
        {
            url: `${baseUrl}/en`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${baseUrl}/nl`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${baseUrl}/en/how-to-play/boerenbridge`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/nl/how-to-play/boerenbridge`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/en/how-to-play/klaverjas`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/nl/how-to-play/klaverjas`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/en/how-to-play/mahjong`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/nl/how-to-play/mahjong`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/en/sign-in`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.5,
        },
        {
            url: `${baseUrl}/nl/sign-in`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.5,
        },
        {
            url: `${baseUrl}/en/sign-up`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.5,
        },
        {
            url: `${baseUrl}/nl/sign-up`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.5,
        },
    ];
}
