import { AppFeaturesGrid } from "@/page-components/how-to-play/shared/app-features-grid";
import { BackNavigation } from "@/page-components/how-to-play/shared/back-navigation";
import { CtaSection } from "@/page-components/how-to-play/shared/cta-section";
import { HeroSection } from "@/page-components/how-to-play/shared/hero-section";
import { HowToPlayLayout } from "@/page-components/how-to-play/shared/how-to-play-layout";
import { MahjongStonesFan } from "@/page-components/how-to-play/shared/mahjong-stone-visual";
import { OverviewGrid } from "@/page-components/how-to-play/shared/overview-grid";
import { StepsList } from "@/page-components/how-to-play/shared/steps-list";
import MahjongCoreFlowSection from "@/page-components/how-to-play/mahjong/core-flow-section";
import MahjongPointsSection from "@/page-components/how-to-play/mahjong/points-section";
import MahjongVisualGuideSection from "@/page-components/how-to-play/mahjong/visual-guide-section";
import {
    Calculator,
    ChartColumnBig,
    Crown,
    Edit,
    Flame,
    Layers,
    Scale,
    ShieldCheck,
    Shuffle,
    Target,
    Users,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function HowToPlayMahjong() {
    const t = await getTranslations("howToPlayMahjong");

    const schema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: t("title"),
        description: t("subtitle"),
        step: [
            {
                "@type": "HowToStep",
                name: t("howToPlay.step1Title"),
                text: t("howToPlay.step1Description"),
            },
            {
                "@type": "HowToStep",
                name: t("howToPlay.step2Title"),
                text: t("howToPlay.step2Description"),
            },
            {
                "@type": "HowToStep",
                name: t("howToPlay.step3Title"),
                text: t("howToPlay.step3Description"),
            },
            {
                "@type": "HowToStep",
                name: t("howToPlay.step4Title"),
                text: t("howToPlay.step4Description"),
            },
        ],
    };

    return (
        <HowToPlayLayout>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(schema),
                }}
            />
            <BackNavigation label={t("backToHome")} />

            <HeroSection
                badge={t("badge")}
                title={t("title")}
                subtitle={t("subtitle")}
                learnMore={t("learnMore")}
                cardsFan={<MahjongStonesFan />}
            />

            <OverviewGrid
                title={t("overview.title")}
                items={[
                    {
                        icon: Users,
                        title: t("overview.playersTitle"),
                        description: t("overview.playersDescription"),
                        color: "text-blue-500",
                        bg: "bg-blue-500/10",
                    },
                    {
                        icon: Layers,
                        title: t("overview.tilesTitle"),
                        description: t("overview.tilesDescription"),
                        color: "text-purple-500",
                        bg: "bg-purple-500/10",
                    },
                    {
                        icon: Target,
                        title: t("overview.goalTitle"),
                        description: t("overview.goalDescription"),
                        color: "text-emerald-500",
                        bg: "bg-emerald-500/10",
                    },
                    {
                        icon: Shuffle,
                        title: t("overview.roundsTitle"),
                        description: t("overview.roundsDescription"),
                        color: "text-amber-500",
                        bg: "bg-amber-500/10",
                    },
                ]}
            />

            <MahjongVisualGuideSection />

            <StepsList
                title={t("howToPlay.title")}
                steps={[
                    {
                        step: 1,
                        icon: Crown,
                        title: t("howToPlay.step1Title"),
                        description: t("howToPlay.step1Description"),
                        visual: null,
                    },
                    {
                        step: 2,
                        icon: Flame,
                        title: t("howToPlay.step2Title"),
                        description: t("howToPlay.step2Description"),
                        visual: null,
                    },
                    {
                        step: 3,
                        icon: Calculator,
                        title: t("howToPlay.step3Title"),
                        description: t("howToPlay.step3Description"),
                        visual: null,
                    },
                    {
                        step: 4,
                        icon: Scale,
                        title: t("howToPlay.step4Title"),
                        description: t("howToPlay.step4Description"),
                        visual: null,
                    },
                ]}
            />

            <MahjongCoreFlowSection />
            <MahjongPointsSection />

            <AppFeaturesGrid
                title={t("appFeatures.title")}
                features={[
                    {
                        icon: Calculator,
                        title: t("appFeatures.feature1Title"),
                        description: t("appFeatures.feature1Description"),
                        color: "text-blue-500",
                        bg: "bg-blue-500/10",
                    },
                    {
                        icon: Shuffle,
                        title: t("appFeatures.feature2Title"),
                        description: t("appFeatures.feature2Description"),
                        color: "text-purple-500",
                        bg: "bg-purple-500/10",
                    },
                    {
                        icon: ChartColumnBig,
                        title: t("appFeatures.feature3Title"),
                        description: t("appFeatures.feature3Description"),
                        color: "text-emerald-500",
                        bg: "bg-emerald-500/10",
                    },
                    {
                        icon: Edit,
                        title: t("appFeatures.feature4Title"),
                        description: t("appFeatures.feature4Description"),
                        color: "text-amber-500",
                        bg: "bg-amber-500/10",
                    },
                    {
                        icon: ShieldCheck,
                        title: t("appFeatures.feature5Title"),
                        description: t("appFeatures.feature5Description"),
                        color: "text-rose-500",
                        bg: "bg-rose-500/10",
                    },
                    {
                        icon: Crown,
                        title: t("appFeatures.feature6Title"),
                        description: t("appFeatures.feature6Description"),
                        color: "text-cyan-500",
                        bg: "bg-cyan-500/10",
                    },
                ]}
            />

            <CtaSection
                title={t("cta.title")}
                description={t("cta.description")}
                goToGames={t("cta.goToGames")}
                loginButton={t("cta.loginButton")}
                signUpButton={t("cta.signUpButton")}
            />
        </HowToPlayLayout>
    );
}
