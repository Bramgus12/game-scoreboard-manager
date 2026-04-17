import { getTranslations } from "next-intl/server";

export default async function MahjongCoreFlowSection() {
    const t = await getTranslations("howToPlayMahjong");
    const phases = [
        {
            id: "01",
            title: t("coreFlow.wallTitle"),
            color: "amber",
            items: [t("coreFlow.wall1"), t("coreFlow.wall2"), t("coreFlow.wall3"), t("coreFlow.wall4"), t("coreFlow.wall5")],
        },
        {
            id: "02",
            title: t("coreFlow.turnTitle"),
            color: "sky",
            items: [t("coreFlow.turn1"), t("coreFlow.turn2"), t("coreFlow.turn3"), t("coreFlow.turn4"), t("coreFlow.turn5"), t("coreFlow.turn6")],
        },
        {
            id: "03",
            title: t("coreFlow.mahjongCheckTitle"),
            color: "emerald",
            items: [
                t("coreFlow.mahjongCheck1"),
                t("coreFlow.mahjongCheck2"),
                t("coreFlow.mahjongCheck3"),
                t("coreFlow.mahjongCheck4"),
                t("coreFlow.mahjongCheck5"),
            ],
        },
    ] as const;

    return (
        <section className="space-y-5">
            <h2 className="text-xl font-semibold md:text-2xl">{t("coreFlow.title")}</h2>

            <div className="grid gap-3 md:grid-cols-3">
                {phases.map((phase) => (
                    <div
                        key={phase.id}
                        className="rounded-xl border border-slate-300/80 bg-white/90 px-4 py-3 shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-900/80"
                    >
                        <p className="text-xs font-semibold tracking-[0.14em] text-slate-500 dark:text-slate-400">STEP {phase.id}</p>
                        <p className="mt-1 text-sm font-semibold leading-snug text-slate-900 dark:text-slate-100">{phase.title}</p>
                    </div>
                ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
                {phases.map((phase) => (
                    <article
                        key={phase.id}
                        className={[
                            "rounded-xl border-2 p-5",
                            phase.color === "amber" &&
                                "border-amber-200/70 bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:border-amber-500/30 dark:from-amber-950/20 dark:via-slate-950 dark:to-orange-950/20",
                            phase.color === "sky" &&
                                "border-sky-200/70 bg-gradient-to-br from-sky-50 via-white to-indigo-50 dark:border-sky-500/30 dark:from-sky-950/30 dark:via-slate-950 dark:to-indigo-950/20",
                            phase.color === "emerald" &&
                                "border-emerald-200/70 bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:border-emerald-500/30 dark:from-emerald-950/20 dark:via-slate-950 dark:to-teal-950/20",
                        ]
                            .filter(Boolean)
                            .join(" ")}
                    >
                        <div className="flex items-center gap-2">
                            <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full border border-slate-300 bg-white px-2 text-xs font-semibold text-slate-700 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200">
                                {phase.id}
                            </span>
                            <h3 className="font-semibold">{phase.title}</h3>
                        </div>

                        <ul className="mt-4 space-y-2 text-sm leading-relaxed">
                            {phase.items.map((item, index) => (
                                <li
                                    key={`${phase.id}-${index}`}
                                    className="flex gap-2 rounded-md border border-white/70 bg-white/70 px-3 py-2 shadow-sm dark:border-slate-700/60 dark:bg-slate-900/60"
                                >
                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-600 dark:bg-slate-300" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        {phase.id === "02" ? (
                            <div className="mt-4 rounded-lg border border-sky-200/80 bg-white/80 p-3 dark:border-sky-500/30 dark:bg-slate-900/70">
                                <p className="text-xs font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300">Turn order</p>
                                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs font-semibold">
                                    <span className="rounded-full border border-sky-300 bg-sky-100 px-2 py-1 text-sky-800 dark:border-sky-500/40 dark:bg-sky-950/60 dark:text-sky-200">East</span>
                                    <span className="text-sky-600 dark:text-sky-300">-&gt;</span>
                                    <span className="rounded-full border border-sky-300 bg-sky-100 px-2 py-1 text-sky-800 dark:border-sky-500/40 dark:bg-sky-950/60 dark:text-sky-200">South</span>
                                    <span className="text-sky-600 dark:text-sky-300">-&gt;</span>
                                    <span className="rounded-full border border-sky-300 bg-sky-100 px-2 py-1 text-sky-800 dark:border-sky-500/40 dark:bg-sky-950/60 dark:text-sky-200">West</span>
                                    <span className="text-sky-600 dark:text-sky-300">-&gt;</span>
                                    <span className="rounded-full border border-sky-300 bg-sky-100 px-2 py-1 text-sky-800 dark:border-sky-500/40 dark:bg-sky-950/60 dark:text-sky-200">North</span>
                                </div>
                            </div>
                        ) : null}

                        {phase.id === "03" ? (
                            <div className="mt-4 rounded-lg border border-emerald-200/80 bg-white/80 p-3 dark:border-emerald-500/30 dark:bg-slate-900/70">
                                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Winning shape</p>
                                <div className="mt-2 flex flex-wrap gap-2 text-xs font-semibold">
                                    <span className="rounded-md border border-emerald-300 bg-emerald-100 px-2 py-1 text-emerald-800 dark:border-emerald-500/40 dark:bg-emerald-950/60 dark:text-emerald-200">Set</span>
                                    <span className="rounded-md border border-emerald-300 bg-emerald-100 px-2 py-1 text-emerald-800 dark:border-emerald-500/40 dark:bg-emerald-950/60 dark:text-emerald-200">Set</span>
                                    <span className="rounded-md border border-emerald-300 bg-emerald-100 px-2 py-1 text-emerald-800 dark:border-emerald-500/40 dark:bg-emerald-950/60 dark:text-emerald-200">Set</span>
                                    <span className="rounded-md border border-emerald-300 bg-emerald-100 px-2 py-1 text-emerald-800 dark:border-emerald-500/40 dark:bg-emerald-950/60 dark:text-emerald-200">Set</span>
                                    <span className="rounded-md border border-emerald-300 bg-emerald-100 px-2 py-1 text-emerald-800 dark:border-emerald-500/40 dark:bg-emerald-950/60 dark:text-emerald-200">Pair</span>
                                </div>
                            </div>
                        ) : null}
                    </article>
                ))}
            </div>
        </section>
    );
}
