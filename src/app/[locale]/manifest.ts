import type { MetadataRoute } from "next";

type Props = {
    params: Promise<{ locale: "en" | "nl" }>;
};

export default async function manifest(
    props: Props,
): Promise<MetadataRoute.Manifest> {
    const { locale } = await props.params;
    const startUrl = locale === "en" ? "/en" : "/nl";

    return {
        name: "Game Scoreboard Manager",
        short_name: "Scoreboard",
        description:
            "Track game scores online with easy scoreboards and live totals.",
        start_url: startUrl,
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#111827",
        icons: [
            {
                src: "/light-mode-icon.svg",
                sizes: "32x32",
                type: "image/svg+xml",
            },
        ],
    };
}
