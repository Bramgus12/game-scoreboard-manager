import PublicHome from "@/page-components/root/public-home";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

type Props = {
    params: Promise<{ locale: "en" | "nl" }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const { locale } = await props.params;
    const t = await getTranslations({ locale, namespace: "homeSeo" });
    const rawKeywords = t.raw("keywords");
    const keywords = Array.isArray(rawKeywords)
        ? rawKeywords.filter(
              (keyword): keyword is string => typeof keyword === "string",
          )
        : undefined;

    return {
        title: t("title"),
        description: t("description"),
        keywords,
        alternates: {
            canonical: locale === "en" ? "/en" : "/nl",
            languages: {
                en: "/en",
                nl: "/nl",
            },
        },
        openGraph: {
            title: t("title"),
            description: t("description"),
            type: "website",
            locale: locale === "en" ? "en_US" : "nl_NL",
            url: locale === "en" ? "/en" : "/nl",
            siteName: "Game Scoreboard Manager",
        },
        twitter: {
            card: "summary_large_image",
            title: t("title"),
            description: t("description"),
        },
        other: {
            "application-name": "Game Scoreboard Manager",
        },
    };
}

export default async function Home() {
    return <PublicHome />;
}
