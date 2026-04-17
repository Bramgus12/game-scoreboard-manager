import { getTranslations } from "next-intl/server";

export default async function MahjongPointsSection() {
    const t = await getTranslations("howToPlayMahjong");

    return (
        <section className="space-y-4">
            <h2 className="text-xl font-semibold md:text-2xl">{t("points.title")}</h2>
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
                                <th className="py-2 pr-3">{t("points.table.kind")}</th>
                                <th className="py-2 pr-3">{t("points.table.openPung")}</th>
                                <th className="py-2 pr-3">{t("points.table.closedPung")}</th>
                                <th className="py-2 pr-3">{t("points.table.openKong")}</th>
                                <th className="py-2">{t("points.table.closedKong")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="py-2 pr-3">{t("points.table.simple")}</td>
                                <td className="py-2 pr-3">2</td>
                                <td className="py-2 pr-3">4</td>
                                <td className="py-2 pr-3">8</td>
                                <td className="py-2">16</td>
                            </tr>
                            <tr>
                                <td className="py-2 pr-3">{t("points.table.honor")}</td>
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
                    <h3 className="font-semibold">{t("points.winnerDoublesTitle")}</h3>
                    <ul className="mt-3 list-disc space-y-1 pl-4 text-sm leading-relaxed">
                        <li>{t("points.winnerDouble1")}</li>
                        <li>{t("points.winnerDouble2")}</li>
                        <li>{t("points.winnerDouble3")}</li>
                        <li>{t("points.winnerDouble4")}</li>
                    </ul>
                </article>

                <article className="rounded-xl border-2 border-amber-200/70 bg-gradient-to-br from-amber-50 via-white to-emerald-50 p-5 dark:border-amber-500/30 dark:from-amber-950/20 dark:via-slate-950 dark:to-emerald-950/20">
                    <h3 className="font-semibold">{t("points.allPlayersDoublesTitle")}</h3>
                    <ul className="mt-3 list-disc space-y-1 pl-4 text-sm leading-relaxed">
                        <li>{t("points.allDouble1")}</li>
                        <li>{t("points.allDouble2")}</li>
                        <li>{t("points.allDouble3")}</li>
                        <li>{t("points.allDouble4")}</li>
                    </ul>
                </article>
            </div>

            <article className="rounded-xl border-2 border-emerald-200/70 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-5 dark:border-emerald-500/30 dark:from-emerald-950/20 dark:via-slate-950 dark:to-teal-950/20">
                <h3 className="font-semibold">{t("points.settlementExampleTitle")}</h3>
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
    );
}
