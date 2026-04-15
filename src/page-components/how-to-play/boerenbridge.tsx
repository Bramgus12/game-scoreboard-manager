import { CardVisual } from "@/page-components/how-to-play/shared/card-visual";
import { MahjongStoneVisual } from "@/page-components/how-to-play/shared/mahjong-stone-visual";
import { AppFeaturesGrid } from "@/page-components/how-to-play/shared/app-features-grid";
import { BackNavigation } from "@/page-components/how-to-play/shared/back-navigation";
import { CtaSection } from "@/page-components/how-to-play/shared/cta-section";
import { HeroSection } from "@/page-components/how-to-play/shared/hero-section";
import { HowToPlayLayout } from "@/page-components/how-to-play/shared/how-to-play-layout";
import { OverviewGrid } from "@/page-components/how-to-play/shared/overview-grid";
import { StepsList } from "@/page-components/how-to-play/shared/steps-list";
import { RoundStructureSection } from "@/page-components/how-to-play/boerenbridge/round-structure-section";
import { ScoringSection } from "@/page-components/how-to-play/boerenbridge/scoring-section";
import {
    Calculator,
    ChartColumnBig,
    CircleDot,
    Edit,
    Gamepad2,
    Hash,
    Layers,
    ShieldCheck,
    Spade,
    Target,
    TrendingUp,
    Users,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function HowToPlayBoerenbridge() {
    const t = await getTranslations("howToPlayBoerenbridge");

    const playerCount = 4;
    const maxRound = Math.floor(52 / playerCount);
    const totalRounds = maxRound * 2;

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
            {
                "@type": "HowToStep",
                name: t("howToPlay.step5Title"),
                text: t("howToPlay.step5Description"),
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
                cardsFan={
                    <>
                        <div className="-rotate-12">
                            <CardVisual suit="spade" value="A" />
                        </div>
                        <div className="-rotate-6">
                            <CardVisual suit="heart" value="K" />
                        </div>
                        <div>
                            <CardVisual suit="diamond" value="Q" isTrump />
                        </div>
                        <div className="rotate-6">
                            <CardVisual suit="club" value="J" />
                        </div>
                        <div className="rotate-12">
                            <CardVisual suit="heart" value="10" />
                        </div>
                        <div className="translate-y-1 rotate-[16deg]">
                            <MahjongStoneVisual kind="wind" value="E" tone="amber" />
                        </div>
                    </>
                }
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
                        title: t("overview.deckTitle"),
                        description: t("overview.deckDescription"),
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
                        icon: TrendingUp,
                        title: t("overview.roundsTitle"),
                        description: t("overview.roundsDescription"),
                        color: "text-amber-500",
                        bg: "bg-amber-500/10",
                    },
                ]}
            />

            <StepsList
                title={t("howToPlay.title")}
                steps={[
                    {
                        step: 1,
                        icon: Layers,
                        title: t("howToPlay.step1Title"),
                        description: t("howToPlay.step1Description"),
                        visual: (
                            <div className="mt-3 flex items-center gap-2">
                                <div className="flex gap-1">
                                    <CardVisual suit="spade" value="7" small />
                                    <CardVisual suit="heart" value="3" small />
                                    <CardVisual suit="diamond" value="K" small />
                                </div>
                                <span className="text-muted-foreground ml-2 text-xs">
                                    Round 3 = 3 cards
                                </span>
                            </div>
                        ),
                    },
                    {
                        step: 2,
                        icon: Spade,
                        title: t("howToPlay.step2Title"),
                        description: t("howToPlay.step2Description"),
                        visual: (
                            <div className="mt-3 flex items-center gap-3">
                                <CardVisual suit="diamond" value="4" isTrump small />
                                <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                                    Diamonds = trump
                                </span>
                            </div>
                        ),
                    },
                    {
                        step: 3,
                        icon: Target,
                        title: t("howToPlay.step3Title"),
                        description: t("howToPlay.step3Description"),
                        visual: (
                            <div className="mt-3 flex flex-wrap gap-2">
                                {[
                                    { name: "Alice", guess: 1 },
                                    { name: "Bob", guess: 0 },
                                    { name: "Carol", guess: 1 },
                                    { name: "Dave", guess: "?" },
                                ].map((player, i) => (
                                    <div
                                        key={i}
                                        className={`rounded-md px-2.5 py-1.5 text-xs font-medium ${
                                            player.guess === "?"
                                                ? "border border-dashed border-amber-500/50 bg-amber-500/10 text-amber-700 dark:text-amber-300"
                                                : "bg-secondary text-secondary-foreground"
                                        }`}
                                    >
                                        {player.name}: {player.guess}
                                    </div>
                                ))}
                            </div>
                        ),
                    },
                    {
                        step: 4,
                        icon: Gamepad2,
                        title: t("howToPlay.step4Title"),
                        description: t("howToPlay.step4Description"),
                        visual: null,
                    },
                    {
                        step: 5,
                        icon: Calculator,
                        title: t("howToPlay.step5Title"),
                        description: t("howToPlay.step5Description"),
                        visual: null,
                    },
                ]}
            />

            <RoundStructureSection
                title={t("roundStructure.title")}
                description={t("roundStructure.description", { playerCount })}
                ascending={t("roundStructure.ascending")}
                topRound={t("roundStructure.topRound")}
                descending={t("roundStructure.descending")}
                exampleLabel={t("roundStructure.exampleLabel", {
                    playerCount,
                })}
                totalRounds={t("roundStructure.totalRounds", {
                    playerCount,
                    totalRounds,
                })}
                maxCards={t("roundStructure.maxCards")}
                noTrumpTitle={t("roundStructure.noTrumpTitle")}
                noTrumpDescription={t("roundStructure.noTrumpDescription")}
                maxRound={maxRound}
            />

            <ScoringSection
                title={t("scoring.title")}
                correctTitle={t("scoring.correctTitle")}
                correctFormula={t("scoring.correctFormula")}
                correctDescription={t("scoring.correctDescription")}
                wrongTitle={t("scoring.wrongTitle")}
                wrongFormula={t("scoring.wrongFormula")}
                wrongDescription={t("scoring.wrongDescription")}
                strategyTitle={t("scoring.strategyTitle")}
                strategyDescription={t("scoring.strategyDescription")}
            />

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
                        icon: Hash,
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
                        icon: CircleDot,
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
