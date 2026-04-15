import { CardVisual } from "@/page-components/how-to-play/shared/card-visual";
import { MahjongStoneVisual } from "@/page-components/how-to-play/shared/mahjong-stone-visual";
import { AppFeaturesGrid } from "@/page-components/how-to-play/shared/app-features-grid";
import { BackNavigation } from "@/page-components/how-to-play/shared/back-navigation";
import { CtaSection } from "@/page-components/how-to-play/shared/cta-section";
import { HeroSection } from "@/page-components/how-to-play/shared/hero-section";
import { HowToPlayLayout } from "@/page-components/how-to-play/shared/how-to-play-layout";
import { OverviewGrid } from "@/page-components/how-to-play/shared/overview-grid";
import { StepsList } from "@/page-components/how-to-play/shared/steps-list";
import { CardValuesSection } from "@/page-components/how-to-play/klaverjas/card-values-section";
import { RoemSection } from "@/page-components/how-to-play/klaverjas/roem-section";
import { KlaverjasScoring } from "@/page-components/how-to-play/klaverjas/scoring-section";
import { VariantsSection } from "@/page-components/how-to-play/klaverjas/variants-section";
import {
    Calculator,
    ChartColumnBig,
    Crown,
    Edit,
    Gamepad2,
    Layers,
    ShieldCheck,
    Sparkles,
    Star,
    Swords,
    Target,
    Trophy,
    Users,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function HowToPlayKlaverjas() {
    const t = await getTranslations("howToPlayKlaverjas");

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
                        <div className="-rotate-9">
                            <CardVisual suit="club" value="J" isTrump />
                        </div>
                        <div className="-rotate-3">
                            <CardVisual suit="club" value="9" isTrump />
                        </div>
                        <div className="rotate-3">
                            <CardVisual suit="heart" value="10" />
                        </div>
                        <div className="rotate-9">
                            <CardVisual suit="diamond" value="K" />
                        </div>
                        <div className="translate-y-1 rotate-12">
                            <MahjongStoneVisual
                                kind="dragon"
                                value="F"
                                tone="emerald"
                            />
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
                        icon: Swords,
                        title: t("overview.teamsTitle"),
                        description: t("overview.teamsDescription"),
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
                            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
                                <div className="flex flex-wrap gap-1">
                                    {[
                                        { s: "spade" as const, v: "A" },
                                        { s: "heart" as const, v: "K" },
                                        { s: "heart" as const, v: "9" },
                                        { s: "diamond" as const, v: "J" },
                                        { s: "club" as const, v: "10" },
                                        { s: "club" as const, v: "8" },
                                        { s: "spade" as const, v: "Q" },
                                        { s: "diamond" as const, v: "7" },
                                    ].map((c, i) => (
                                        <CardVisual
                                            key={i}
                                            suit={c.s}
                                            value={c.v}
                                            small
                                        />
                                    ))}
                                </div>
                                <span className="text-muted-foreground text-xs sm:ml-2">
                                    8 cards each
                                </span>
                            </div>
                        ),
                    },
                    {
                        step: 2,
                        icon: Crown,
                        title: t("howToPlay.step2Title"),
                        description: t("howToPlay.step2Description"),
                        visual: (
                            <div className="mt-3 flex items-center gap-3">
                                <CardVisual suit="club" value="J" isTrump small />
                                <div className="flex flex-col">
                                    <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                                        Jack = highest trump (20 pts)
                                    </span>
                                    <span className="text-muted-foreground text-xs">
                                        Nine = second highest (14 pts)
                                    </span>
                                </div>
                            </div>
                        ),
                    },
                    {
                        step: 3,
                        icon: Gamepad2,
                        title: t("howToPlay.step3Title"),
                        description: t("howToPlay.step3Description"),
                        visual: null,
                    },
                    {
                        step: 4,
                        icon: Calculator,
                        title: t("howToPlay.step4Title"),
                        description: t("howToPlay.step4Description"),
                        visual: null,
                    },
                    {
                        step: 5,
                        icon: Trophy,
                        title: t("howToPlay.step5Title"),
                        description: t("howToPlay.step5Description"),
                        visual: null,
                    },
                ]}
            />

            <CardValuesSection
                title={t("cardValues.title")}
                description={t("cardValues.description")}
                trumpTitle={t("cardValues.trumpTitle")}
                nonTrumpTitle={t("cardValues.nonTrumpTitle")}
                trumpRows={[
                    { card: t("cardValues.jack"), points: 20 },
                    { card: t("cardValues.nine"), points: 14 },
                    { card: t("cardValues.ace"), points: 11 },
                    { card: t("cardValues.ten"), points: 10 },
                    { card: t("cardValues.king"), points: 4 },
                    { card: t("cardValues.queen"), points: 3 },
                    { card: t("cardValues.eight"), points: 0 },
                    { card: t("cardValues.seven"), points: 0 },
                ]}
                nonTrumpRows={[
                    { card: t("cardValues.ace"), points: 11 },
                    { card: t("cardValues.ten"), points: 10 },
                    { card: t("cardValues.king"), points: 4 },
                    { card: t("cardValues.queen"), points: 3 },
                    { card: t("cardValues.jack"), points: 2 },
                    { card: t("cardValues.nine"), points: 0 },
                    { card: t("cardValues.eight"), points: 0 },
                    { card: t("cardValues.seven"), points: 0 },
                ]}
                totalTitle={t("cardValues.totalTitle")}
                totalDescription={t("cardValues.totalDescription")}
            />

            <RoemSection
                title={t("roem.title")}
                description={t("roem.description")}
                items={[
                    {
                        label: t("roem.threeInRow"),
                        points: "20",
                        icon: Star,
                    },
                    {
                        label: t("roem.fourInRow"),
                        points: "50",
                        icon: Star,
                    },
                    {
                        label: t("roem.fourOfKind"),
                        points: "100",
                        icon: Sparkles,
                    },
                    {
                        label: t("roem.fourJacks"),
                        points: "200",
                        icon: Crown,
                    },
                    {
                        label: t("roem.stuk"),
                        points: "20",
                        icon: Swords,
                    },
                ]}
                stukNote={t("roem.stukNote")}
            />

            <VariantsSection
                title={t("variants.title")}
                description={t("variants.description")}
                amsterdamsTitle={t("variants.amsterdamsTitle")}
                amsterdamsDescription={t("variants.amsterdamsDescription")}
                rotterdamsTitle={t("variants.rotterdamsTitle")}
                rotterdamsDescription={t("variants.rotterdamsDescription")}
                comparisonTitle={t("variants.comparisonTitle")}
                rules={[
                    {
                        amsterdams: t("variants.rule1"),
                        rotterdams: t("variants.rule1"),
                    },
                    {
                        amsterdams: t("variants.rule2Amsterdams"),
                        rotterdams: t("variants.rule2Rotterdams"),
                    },
                    {
                        amsterdams: t("variants.rule3Amsterdams"),
                        rotterdams: t("variants.rule3Rotterdams"),
                    },
                    {
                        amsterdams: t("variants.rule4Amsterdams"),
                        rotterdams: t("variants.rule4Rotterdams"),
                    },
                ]}
                keyDifferenceTitle={t("variants.keyDifferenceTitle")}
                keyDifferenceDescription={t("variants.keyDifferenceDescription")}
            />

            <KlaverjasScoring
                title={t("scoring.title")}
                winTitle={t("scoring.winTitle")}
                winDescription={t("scoring.winDescription")}
                natTitle={t("scoring.natTitle")}
                natDescription={t("scoring.natDescription")}
                pitTitle={t("scoring.pitTitle")}
                pitDescription={t("scoring.pitDescription")}
                lastTrickTitle={t("scoring.lastTrickTitle")}
                lastTrickDescription={t("scoring.lastTrickDescription")}
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
                        icon: Sparkles,
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
                        icon: Users,
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
