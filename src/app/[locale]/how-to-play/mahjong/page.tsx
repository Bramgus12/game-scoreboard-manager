import HowToPlayMahjong from "@/page-components/how-to-play/mahjong";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

type Props = {
    params: Promise<{ locale: "en" | "nl" }>;
};

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
    const { locale } = await props.params;
    const t = await getTranslations({
        locale,
        namespace: "howToPlayMahjong.seo",
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
                    ? "/en/how-to-play/mahjong"
                    : "/nl/how-to-play/mahjong",
            languages: {
                en: "/en/how-to-play/mahjong",
                nl: "/nl/how-to-play/mahjong",
            },
        },
        openGraph: {
            title: t("title"),
            description: t("description"),
            type: "website",
            locale: locale === "en" ? "en_US" : "nl_NL",
            url:
                locale === "en"
                    ? "/en/how-to-play/mahjong"
                    : "/nl/how-to-play/mahjong",
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

export default async function HowToPlayMahjongPage(props: Props) {
    const { locale } = await props.params;
    setRequestLocale(locale);

    return <HowToPlayMahjong />;
}
