import {
    MahjongStoneKind,
    MahjongStoneTone,
    MahjongStoneVisual,
} from "@/page-components/how-to-play/shared/mahjong-stone-visual";
import MahjongWallDiagram from "@/page-components/how-to-play/mahjong/wall-diagram";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
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
            <div className="flex flex-wrap gap-2 pb-1">
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

export default async function MahjongVisualGuideSection() {
    const t = await getTranslations("howToPlayMahjong");

    return (
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
                        { kind: "character", value: "1", label: "1", tone: "rose" },
                        { kind: "character", value: "2", label: "2", tone: "rose" },
                        { kind: "character", value: "3", label: "3", tone: "rose" },
                        { kind: "character", value: "4", label: "4", tone: "rose" },
                        { kind: "character", value: "5", label: "5", tone: "rose" },
                        { kind: "character", value: "6", label: "6", tone: "rose" },
                        { kind: "character", value: "7", label: "7", tone: "rose" },
                        { kind: "character", value: "8", label: "8", tone: "rose" },
                        { kind: "character", value: "9", label: "9", tone: "rose" },
                    ]}
                />
                <TileRow
                    title={t("visuals.bamboos")}
                    tiles={[
                        { kind: "bamboo", value: "1", label: "1", tone: "emerald" },
                        { kind: "bamboo", value: "2", label: "2", tone: "emerald" },
                        { kind: "bamboo", value: "3", label: "3", tone: "emerald" },
                        { kind: "bamboo", value: "4", label: "4", tone: "emerald" },
                        { kind: "bamboo", value: "5", label: "5", tone: "emerald" },
                        { kind: "bamboo", value: "6", label: "6", tone: "emerald" },
                        { kind: "bamboo", value: "7", label: "7", tone: "emerald" },
                        { kind: "bamboo", value: "8", label: "8", tone: "emerald" },
                        { kind: "bamboo", value: "9", label: "9", tone: "emerald" },
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
                            { kind: "wind", value: "E", label: "E", tone: "amber" },
                            { kind: "wind", value: "S", label: "S", tone: "amber" },
                            { kind: "wind", value: "W", label: "W", tone: "amber" },
                            { kind: "wind", value: "N", label: "N", tone: "amber" },
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
                    {" "}
                    <h3 className="font-semibold">{t("visuals.wallTitle")}</h3>
                    <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                        {t("visuals.wallDescription")}
                    </p>
                    <MahjongWallDiagram
                        liveLabel={t("visuals.wallLive")}
                        breakLabel={t("visuals.wallBreak")}
                        deadLabel={t("visuals.wallDead")}
                    />
                </article>

                <article className="rounded-xl border-2 border-sky-200/70 bg-gradient-to-br from-sky-50 via-white to-indigo-50 p-5 dark:border-sky-500/30 dark:from-sky-950/30 dark:via-slate-950 dark:to-indigo-950/20">
                    <h3 className="font-semibold">{t("visuals.turnOrderTitle")}</h3>
                    <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                        {t("visuals.turnOrderDescription")}
                    </p>
                    <div className="mx-auto mt-4 grid w-full max-w-xs grid-cols-3 grid-rows-3 items-center justify-items-center gap-1 rounded-lg border border-sky-300/60 bg-white/80 p-3 dark:bg-slate-950/40">
                        <div />
                        <div className="rounded-md border bg-amber-100 px-2 py-1 text-xs font-semibold dark:text-black">
                            E
                        </div>
                        <div />

                        <div className="rounded-md border bg-emerald-100 px-2 py-1 text-xs font-semibold dark:text-black">
                            N
                        </div>
                        <div className="text-muted-foreground text-xs">
                            <ArrowLeft className="mx-auto h-3 w-3" />
                            <ArrowDown className="mx-auto h-3 w-3" />
                        </div>
                        <div className="rounded-md border bg-sky-100 px-2 py-1 text-xs font-semibold dark:text-black">
                            S
                        </div>

                        <div />
                        <div className="rounded-md border bg-rose-100 px-2 py-1 text-xs font-semibold dark:text-black">
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
    );
}
