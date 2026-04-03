import HowToPlayKlaverjas from "@/page-components/how-to-play/klaverjas";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

type Props = {
    params: Promise<{ locale: "en" | "nl" }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const { locale } = await props.params;
    const t = await getTranslations({
        locale,
        namespace: "howToPlayKlaverjas.seo",
    });
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
            canonical:
                locale === "en"
                    ? "/en/how-to-play/klaverjas"
                    : "/nl/how-to-play/klaverjas",
            languages: {
                en: "/en/how-to-play/klaverjas",
                nl: "/nl/how-to-play/klaverjas",
            },
        },
        openGraph: {
            title: t("title"),
            description: t("description"),
            type: "website",
            locale: locale === "en" ? "en_US" : "nl_NL",
            url:
                locale === "en"
                    ? "/en/how-to-play/klaverjas"
                    : "/nl/how-to-play/klaverjas",
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

export default async function HowToPlayKlaverjasPage() {
    return <HowToPlayKlaverjas />;
}
