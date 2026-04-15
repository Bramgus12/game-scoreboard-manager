import { AppFeaturesGrid } from "@/page-components/how-to-play/shared/app-features-grid";
import { BackNavigation } from "@/page-components/how-to-play/shared/back-navigation";
import { CtaSection } from "@/page-components/how-to-play/shared/cta-section";
import { HeroSection } from "@/page-components/how-to-play/shared/hero-section";
import { HowToPlayLayout } from "@/page-components/how-to-play/shared/how-to-play-layout";
import {
    MahjongStoneKind,
    MahjongStoneTone,
    MahjongStoneVisual,
    MahjongStonesFan,
} from "@/page-components/how-to-play/shared/mahjong-stone-visual";
import { OverviewGrid } from "@/page-components/how-to-play/shared/overview-grid";
import { StepsList } from "@/page-components/how-to-play/shared/steps-list";
import {
    ArrowDown,
    ArrowLeft,
    ArrowRight,
    ArrowUp,
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

type TileStoneProps = {
    kind: MahjongStoneKind;
    value: string;
    label: string;
    tone: MahjongStoneTone;
};

function TileStone(props: TileStoneProps) {
    const { kind, value, label, tone } = props;
    return (
        <MahjongStoneVisual kind={kind} value={value} label={label} tone={tone} />
    );
}

function TileRow({
    title,
    tiles,
}: {
    title: string;
    tiles: Array<{
        kind: TileStoneProps["kind"];
        value: string;
        label: string;
        tone: TileStoneProps["tone"];
    }>;
}) {
    return (
        <div className="space-y-2">
            <h4 className="text-sm font-semibold">{title}</h4>
            <div className="flex gap-2 overflow-x-auto pb-1">
                {tiles.map((tile) => (
                    <TileStone
                        key={`${tile.kind}-${tile.value}-${tile.label}`}
                        kind={tile.kind}
                        value={tile.value}
                        label={tile.label}
                        tone={tile.tone}
                    />
                ))}
            </div>
        </div>
    );
}

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

            <section className="space-y-4">
                <h2 className="text-xl font-semibold md:text-2xl">
                    {t("visuals.title")}
                </h2>
                <p className="text-muted-foreground text-sm md:text-base">
                    {t("visuals.description")}
                </p>

                <article className="space-y-4 rounded-xl border-2 border-emerald-200/70 bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-5 dark:border-emerald-500/30 dark:from-emerald-950/20 dark:via-slate-950 dark:to-sky-950/20">
                    <h3 className="font-semibold">{t("visuals.tilesTitle")}</h3>
                    <TileRow
                        title={t("visuals.characters")}
                        tiles={[
                            {
                                kind: "character",
                                value: "1",
                                label: "1",
                                tone: "rose",
                            },
                            {
                                kind: "character",
                                value: "2",
                                label: "2",
                                tone: "rose",
                            },
                            {
                                kind: "character",
                                value: "3",
                                label: "3",
                                tone: "rose",
                            },
                            {
                                kind: "character",
                                value: "4",
                                label: "4",
                                tone: "rose",
                            },
                            {
                                kind: "character",
                                value: "5",
                                label: "5",
                                tone: "rose",
                            },
                            {
                                kind: "character",
                                value: "6",
                                label: "6",
                                tone: "rose",
                            },
                            {
                                kind: "character",
                                value: "7",
                                label: "7",
                                tone: "rose",
                            },
                            {
                                kind: "character",
                                value: "8",
                                label: "8",
                                tone: "rose",
                            },
                            {
                                kind: "character",
                                value: "9",
                                label: "9",
                                tone: "rose",
                            },
                        ]}
                    />
                    <TileRow
                        title={t("visuals.bamboos")}
                        tiles={[
                            {
                                kind: "bamboo",
                                value: "1",
                                label: "1",
                                tone: "emerald",
                            },
                            {
                                kind: "bamboo",
                                value: "2",
                                label: "2",
                                tone: "emerald",
                            },
                            {
                                kind: "bamboo",
                                value: "3",
                                label: "3",
                                tone: "emerald",
                            },
                            {
                                kind: "bamboo",
                                value: "4",
                                label: "4",
                                tone: "emerald",
                            },
                            {
                                kind: "bamboo",
                                value: "5",
                                label: "5",
                                tone: "emerald",
                            },
                            {
                                kind: "bamboo",
                                value: "6",
                                label: "6",
                                tone: "emerald",
                            },
                            {
                                kind: "bamboo",
                                value: "7",
                                label: "7",
                                tone: "emerald",
                            },
                            {
                                kind: "bamboo",
                                value: "8",
                                label: "8",
                                tone: "emerald",
                            },
                            {
                                kind: "bamboo",
                                value: "9",
                                label: "9",
                                tone: "emerald",
                            },
                        ]}
                    />
                    <TileRow
                        title={t("visuals.circles")}
                        tiles={[
                            { kind: "circle", value: "1", label: "1", tone: "sky" },
                            { kind: "circle", value: "2", label: "2", tone: "sky" },
                            { kind: "circle", value: "3", label: "3", tone: "sky" },
                            { kind: "circle", value: "4", label: "4", tone: "sky" },
                            { kind: "circle", value: "5", label: "5", tone: "sky" },
                            { kind: "circle", value: "6", label: "6", tone: "sky" },
                            { kind: "circle", value: "7", label: "7", tone: "sky" },
                            { kind: "circle", value: "8", label: "8", tone: "sky" },
                            { kind: "circle", value: "9", label: "9", tone: "sky" },
                        ]}
                    />
                    <div className="grid gap-4 md:grid-cols-2">
                        <TileRow
                            title={t("visuals.winds")}
                            tiles={[
                                {
                                    kind: "wind",
                                    value: "E",
                                    label: "E",
                                    tone: "amber",
                                },
                                {
                                    kind: "wind",
                                    value: "S",
                                    label: "S",
                                    tone: "amber",
                                },
                                {
                                    kind: "wind",
                                    value: "W",
                                    label: "W",
                                    tone: "amber",
                                },
                                {
                                    kind: "wind",
                                    value: "N",
                                    label: "N",
                                    tone: "amber",
                                },
                            ]}
                        />
                        <TileRow
                            title={t("visuals.dragons")}
                            tiles={[
                                {
                                    kind: "dragon",
                                    value: "C",
                                    label: t("visuals.redDragon"),
                                    tone: "rose",
                                },
                                {
                                    kind: "dragon",
                                    value: "F",
                                    label: t("visuals.greenDragon"),
                                    tone: "emerald",
                                },
                                {
                                    kind: "dragon",
                                    value: "P",
                                    label: t("visuals.whiteDragon"),
                                    tone: "indigo",
                                },
                            ]}
                        />
                    </div>
                    <p className="text-muted-foreground text-xs">
                        {t("visuals.tilesNote")}
                    </p>
                </article>

                <div className="grid gap-4 md:grid-cols-2">
                    <article className="rounded-xl border-2 border-amber-200/70 bg-gradient-to-br from-amber-50 via-white to-orange-50 p-5 dark:border-amber-500/30 dark:from-amber-950/20 dark:via-slate-950 dark:to-orange-950/20">
                        <h3 className="font-semibold">{t("visuals.wallTitle")}</h3>
                        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                            {t("visuals.wallDescription")}
                        </p>
                        <div className="mt-4 rounded-lg border border-amber-300/60 bg-white/80 p-3 dark:bg-slate-950/40">
                            <svg
                                viewBox="0 0 280 280"
                                className="mx-auto h-48 w-48"
                                aria-hidden="true"
                            >
                                <rect
                                    x="24"
                                    y="24"
                                    width="232"
                                    height="232"
                                    rx="8"
                                    fill="#fff8e8"
                                    stroke="#e0c994"
                                    strokeWidth="3"
                                />
                                <rect
                                    x="52"
                                    y="52"
                                    width="176"
                                    height="176"
                                    rx="6"
                                    fill="#ffffff"
                                    stroke="#d7e2f0"
                                    strokeWidth="2"
                                />

                                {Array.from({ length: 17 }).map((_, index) => (
                                    <g key={`top-wall-${index}`}>
                                        <rect
                                            x={28 + index * 13}
                                            y="28"
                                            width="11"
                                            height="11"
                                            rx="2"
                                            fill="#d9a450"
                                        />
                                        <rect
                                            x={28 + index * 13}
                                            y="40"
                                            width="11"
                                            height="11"
                                            rx="2"
                                            fill="#e7bb73"
                                        />
                                    </g>
                                ))}
                                {Array.from({ length: 17 }).map((_, index) => (
                                    <g key={`bottom-wall-${index}`}>
                                        <rect
                                            x={28 + index * 13}
                                            y="229"
                                            width="11"
                                            height="11"
                                            rx="2"
                                            fill="#d9a450"
                                        />
                                        <rect
                                            x={28 + index * 13}
                                            y="241"
                                            width="11"
                                            height="11"
                                            rx="2"
                                            fill="#e7bb73"
                                        />
                                    </g>
                                ))}
                                {Array.from({ length: 15 }).map((_, offset) => {
                                    const logicalIndex = offset + 1;
                                    const y = 40 + offset * 13;

                                    return (
                                        <g key={`left-wall-${logicalIndex}`}>
                                            <rect
                                                x="28"
                                                y={y}
                                                width="11"
                                                height="11"
                                                rx="2"
                                                fill="#d9a450"
                                            />
                                            <rect
                                                x="40"
                                                y={y}
                                                width="11"
                                                height="11"
                                                rx="2"
                                                fill="#e7bb73"
                                            />
                                        </g>
                                    );
                                })}
                                {Array.from({ length: 15 }).map((_, offset) => {
                                    const logicalIndex = offset + 1;
                                    const isDeadWall =
                                        logicalIndex >= 9 && logicalIndex <= 15;
                                    const y = 40 + offset * 13;

                                    return (
                                        <g key={`right-wall-${logicalIndex}`}>
                                            <rect
                                                x="229"
                                                y={y}
                                                width="11"
                                                height="11"
                                                rx="2"
                                                fill={
                                                    isDeadWall
                                                        ? "#f07f7f"
                                                        : "#d9a450"
                                                }
                                            />
                                            <rect
                                                x="241"
                                                y={y}
                                                width="11"
                                                height="11"
                                                rx="2"
                                                fill={
                                                    isDeadWall
                                                        ? "#f7a2a2"
                                                        : "#e7bb73"
                                                }
                                            />
                                        </g>
                                    );
                                })}

                                <circle cx="229" cy="138" r="6" fill="#0ea5e9" />
                                <text
                                    x="229"
                                    y="140"
                                    textAnchor="middle"
                                    fontSize="6"
                                    fill="#ffffff"
                                    fontWeight="700"
                                >
                                    B
                                </text>
                            </svg>
                            <div className="grid grid-cols-3 gap-3 text-center text-xs font-medium">
                                <div className="rounded-md border border-amber-300/60 bg-amber-100/60 px-2 py-1">
                                    {t("visuals.wallLive")}
                                </div>
                                <div className="rounded-md border border-sky-300/60 bg-sky-100/60 px-2 py-1">
                                    {t("visuals.wallBreak")}
                                </div>
                                <div className="rounded-md border border-rose-300/60 bg-rose-100/60 px-2 py-1">
                                    {t("visuals.wallDead")}
                                </div>
                            </div>
                        </div>
                    </article>

                    <article className="rounded-xl border-2 border-sky-200/70 bg-gradient-to-br from-sky-50 via-white to-indigo-50 p-5 dark:border-sky-500/30 dark:from-sky-950/30 dark:via-slate-950 dark:to-indigo-950/20">
                        <h3 className="font-semibold">
                            {t("visuals.turnOrderTitle")}
                        </h3>
                        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                            {t("visuals.turnOrderDescription")}
                        </p>
                        <div className="mx-auto mt-4 grid w-full max-w-xs grid-cols-3 grid-rows-3 items-center justify-items-center gap-1 rounded-lg border border-sky-300/60 bg-white/80 p-3 dark:bg-slate-950/40">
                            <div />
                            <div className="rounded-md border bg-amber-100 px-2 py-1 text-xs font-semibold">
                                E
                            </div>
                            <div />

                            <div className="rounded-md border bg-emerald-100 px-2 py-1 text-xs font-semibold">
                                N
                            </div>
                            <div className="text-muted-foreground text-xs">
                                <ArrowLeft className="mx-auto h-3 w-3" />
                                <ArrowDown className="mx-auto h-3 w-3" />
                            </div>
                            <div className="rounded-md border bg-sky-100 px-2 py-1 text-xs font-semibold">
                                S
                            </div>

                            <div />
                            <div className="rounded-md border bg-rose-100 px-2 py-1 text-xs font-semibold">
                                W
                            </div>
                            <div />
                        </div>
                        <div className="text-muted-foreground mt-2 flex items-center gap-1 text-xs">
                            <ArrowRight className="h-3 w-3" />
                            <ArrowUp className="h-3 w-3" />
                            <span>{t("visuals.turnOrderHint")}</span>
                        </div>
                    </article>
                </div>

                <article className="rounded-xl border-2 border-indigo-200/70 bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-5 dark:border-indigo-500/30 dark:from-indigo-950/30 dark:via-slate-950 dark:to-purple-950/20">
                    <h3 className="font-semibold">{t("visuals.handShapeTitle")}</h3>
                    <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                        {t("visuals.handShapeDescription")}
                    </p>
                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                        <div className="rounded-md border border-indigo-300/60 bg-white/80 p-3 dark:bg-slate-950/40">
                            <div className="mb-2 text-xs font-semibold">
                                {t("visuals.chow")}
                            </div>
                            <div className="flex gap-2">
                                <TileStone
                                    kind="character"
                                    value="4"
                                    label="4"
                                    tone="rose"
                                />
                                <TileStone
                                    kind="character"
                                    value="5"
                                    label="5"
                                    tone="rose"
                                />
                                <TileStone
                                    kind="character"
                                    value="6"
                                    label="6"
                                    tone="rose"
                                />
                            </div>
                        </div>
                        <div className="rounded-md border border-indigo-300/60 bg-white/80 p-3 dark:bg-slate-950/40">
                            <div className="mb-2 text-xs font-semibold">
                                {t("visuals.pung")}
                            </div>
                            <div className="flex gap-2">
                                <TileStone
                                    kind="circle"
                                    value="7"
                                    label="7"
                                    tone="sky"
                                />
                                <TileStone
                                    kind="circle"
                                    value="7"
                                    label="7"
                                    tone="sky"
                                />
                                <TileStone
                                    kind="circle"
                                    value="7"
                                    label="7"
                                    tone="sky"
                                />
                            </div>
                        </div>
                        <div className="rounded-md border border-indigo-300/60 bg-white/80 p-3 dark:bg-slate-950/40">
                            <div className="mb-2 text-xs font-semibold">
                                {t("visuals.kong")}
                            </div>
                            <div className="flex gap-2">
                                <TileStone
                                    kind="wind"
                                    value="S"
                                    label="S"
                                    tone="amber"
                                />
                                <TileStone
                                    kind="wind"
                                    value="S"
                                    label="S"
                                    tone="amber"
                                />
                                <TileStone
                                    kind="wind"
                                    value="S"
                                    label="S"
                                    tone="amber"
                                />
                                <TileStone
                                    kind="wind"
                                    value="S"
                                    label="S"
                                    tone="amber"
                                />
                            </div>
                        </div>
                        <div className="rounded-md border border-indigo-300/60 bg-white/80 p-3 dark:bg-slate-950/40">
                            <div className="mb-2 text-xs font-semibold">
                                {t("visuals.pair")}
                            </div>
                            <div className="flex gap-2">
                                <TileStone
                                    kind="dragon"
                                    value="C"
                                    label="C"
                                    tone="rose"
                                />
                                <TileStone
                                    kind="dragon"
                                    value="C"
                                    label="C"
                                    tone="rose"
                                />
                            </div>
                        </div>
                    </div>
                </article>
            </section>

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

            <section className="space-y-4">
                <h2 className="text-xl font-semibold md:text-2xl">
                    {t("coreFlow.title")}
                </h2>

                <article className="rounded-xl border-2 border-amber-200/70 bg-gradient-to-br from-amber-50 via-white to-orange-50 p-5 dark:border-amber-500/30 dark:from-amber-950/20 dark:via-slate-950 dark:to-orange-950/20">
                    <h3 className="font-semibold">{t("coreFlow.wallTitle")}</h3>
                    <ul className="mt-3 list-disc space-y-1 pl-4 text-sm leading-relaxed">
                        <li>{t("coreFlow.wall1")}</li>
                        <li>{t("coreFlow.wall2")}</li>
                        <li>{t("coreFlow.wall3")}</li>
                        <li>{t("coreFlow.wall4")}</li>
                        <li>{t("coreFlow.wall5")}</li>
                    </ul>
                </article>

                <article className="rounded-xl border-2 border-sky-200/70 bg-gradient-to-br from-sky-50 via-white to-indigo-50 p-5 dark:border-sky-500/30 dark:from-sky-950/30 dark:via-slate-950 dark:to-indigo-950/20">
                    <h3 className="font-semibold">{t("coreFlow.turnTitle")}</h3>
                    <ul className="mt-3 list-disc space-y-1 pl-4 text-sm leading-relaxed">
                        <li>{t("coreFlow.turn1")}</li>
                        <li>{t("coreFlow.turn2")}</li>
                        <li>{t("coreFlow.turn3")}</li>
                        <li>{t("coreFlow.turn4")}</li>
                        <li>{t("coreFlow.turn5")}</li>
                        <li>{t("coreFlow.turn6")}</li>
                    </ul>
                </article>

                <article className="rounded-xl border-2 border-emerald-200/70 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-5 dark:border-emerald-500/30 dark:from-emerald-950/20 dark:via-slate-950 dark:to-teal-950/20">
                    <h3 className="font-semibold">
                        {t("coreFlow.mahjongCheckTitle")}
                    </h3>
                    <ul className="mt-3 list-disc space-y-1 pl-4 text-sm leading-relaxed">
                        <li>{t("coreFlow.mahjongCheck1")}</li>
                        <li>{t("coreFlow.mahjongCheck2")}</li>
                        <li>{t("coreFlow.mahjongCheck3")}</li>
                        <li>{t("coreFlow.mahjongCheck4")}</li>
                        <li>{t("coreFlow.mahjongCheck5")}</li>
                    </ul>
                </article>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-semibold md:text-2xl">
                    {t("points.title")}
                </h2>
                <p className="text-muted-foreground text-sm md:text-base">
                    {t("points.description")}
                </p>

                <div className="grid gap-4 md:grid-cols-2">
                    <article className="rounded-xl border-2 border-indigo-200/70 bg-gradient-to-br from-indigo-50 via-white to-sky-50 p-5 dark:border-indigo-500/30 dark:from-indigo-950/30 dark:via-slate-950 dark:to-sky-950/20">
                        <h3 className="font-semibold">{t("points.orderTitle")}</h3>
                        <ol className="mt-3 list-decimal space-y-1 pl-4 text-sm leading-relaxed">
                            <li>{t("points.order1")}</li>
                            <li>{t("points.order2")}</li>
                            <li>{t("points.order3")}</li>
                            <li>{t("points.order4")}</li>
                            <li>{t("points.order5")}</li>
                        </ol>
                    </article>

                    <article className="rounded-xl border-2 border-emerald-200/70 bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-5 dark:border-emerald-500/30 dark:from-emerald-950/30 dark:via-slate-950 dark:to-sky-950/20">
                        <h3 className="font-semibold">{t("points.formulaTitle")}</h3>
                        <div className="mt-3 rounded-md bg-emerald-500/10 px-3 py-2 font-mono text-sm">
                            {t("points.formula")}
                        </div>
                        <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                            {t("points.formulaDescription")}
                        </p>
                        <div className="mt-3 rounded-md border border-amber-400/50 bg-amber-500/10 px-3 py-2 text-sm">
                            {t("points.capNote")}
                        </div>
                    </article>
                </div>

                <article className="rounded-xl border-2 border-sky-200/70 bg-gradient-to-br from-sky-50 via-white to-indigo-50 p-5 dark:border-sky-500/30 dark:from-sky-950/30 dark:via-slate-950 dark:to-indigo-950/20">
                    <h3 className="font-semibold">{t("points.basePointsTitle")}</h3>
                    <div className="mt-3 overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-2 pr-3">
                                        {t("points.table.kind")}
                                    </th>
                                    <th className="py-2 pr-3">
                                        {t("points.table.openPung")}
                                    </th>
                                    <th className="py-2 pr-3">
                                        {t("points.table.closedPung")}
                                    </th>
                                    <th className="py-2 pr-3">
                                        {t("points.table.openKong")}
                                    </th>
                                    <th className="py-2">
                                        {t("points.table.closedKong")}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b">
                                    <td className="py-2 pr-3">
                                        {t("points.table.simple")}
                                    </td>
                                    <td className="py-2 pr-3">2</td>
                                    <td className="py-2 pr-3">4</td>
                                    <td className="py-2 pr-3">8</td>
                                    <td className="py-2">16</td>
                                </tr>
                                <tr>
                                    <td className="py-2 pr-3">
                                        {t("points.table.honor")}
                                    </td>
                                    <td className="py-2 pr-3">4</td>
                                    <td className="py-2 pr-3">8</td>
                                    <td className="py-2 pr-3">16</td>
                                    <td className="py-2">32</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <ul className="mt-3 list-disc space-y-1 pl-4 text-sm">
                        <li>{t("points.baseExtra1")}</li>
                        <li>{t("points.baseExtra2")}</li>
                        <li>{t("points.baseExtra3")}</li>
                        <li>{t("points.baseExtra4")}</li>
                    </ul>
                </article>

                <div className="grid gap-4 md:grid-cols-2">
                    <article className="rounded-xl border-2 border-rose-200/70 bg-gradient-to-br from-rose-50 via-white to-orange-50 p-5 dark:border-rose-500/30 dark:from-rose-950/20 dark:via-slate-950 dark:to-orange-950/20">
                        <h3 className="font-semibold">
                            {t("points.winnerDoublesTitle")}
                        </h3>
                        <ul className="mt-3 list-disc space-y-1 pl-4 text-sm leading-relaxed">
                            <li>{t("points.winnerDouble1")}</li>
                            <li>{t("points.winnerDouble2")}</li>
                            <li>{t("points.winnerDouble3")}</li>
                            <li>{t("points.winnerDouble4")}</li>
                        </ul>
                    </article>

                    <article className="rounded-xl border-2 border-amber-200/70 bg-gradient-to-br from-amber-50 via-white to-emerald-50 p-5 dark:border-amber-500/30 dark:from-amber-950/20 dark:via-slate-950 dark:to-emerald-950/20">
                        <h3 className="font-semibold">
                            {t("points.allPlayersDoublesTitle")}
                        </h3>
                        <ul className="mt-3 list-disc space-y-1 pl-4 text-sm leading-relaxed">
                            <li>{t("points.allDouble1")}</li>
                            <li>{t("points.allDouble2")}</li>
                            <li>{t("points.allDouble3")}</li>
                            <li>{t("points.allDouble4")}</li>
                        </ul>
                    </article>
                </div>

                <article className="rounded-xl border-2 border-emerald-200/70 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-5 dark:border-emerald-500/30 dark:from-emerald-950/20 dark:via-slate-950 dark:to-teal-950/20">
                    <h3 className="font-semibold">
                        {t("points.settlementExampleTitle")}
                    </h3>
                    <p className="text-muted-foreground mt-2 text-sm">
                        {t("points.settlementExampleIntro")}
                    </p>
                    <ul className="mt-3 list-disc space-y-1 pl-4 text-sm">
                        <li>{t("points.settlementExample1")}</li>
                        <li>{t("points.settlementExample2")}</li>
                        <li>{t("points.settlementExample3")}</li>
                        <li>{t("points.settlementExample4")}</li>
                    </ul>
                </article>

                <article className="rounded-xl border-2 border-violet-200/70 bg-gradient-to-br from-violet-50 via-white to-sky-50 p-5 dark:border-violet-500/30 dark:from-violet-950/20 dark:via-slate-950 dark:to-sky-950/20">
                    <h3 className="font-semibold">{t("points.limitHandsTitle")}</h3>
                    <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                        {t("points.limitHandsDescription")}
                    </p>
                    <ul className="mt-3 list-disc space-y-1 pl-4 text-sm">
                        <li>{t("points.limit1")}</li>
                        <li>{t("points.limit2")}</li>
                        <li>{t("points.limit3")}</li>
                    </ul>
                </article>
            </section>

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
