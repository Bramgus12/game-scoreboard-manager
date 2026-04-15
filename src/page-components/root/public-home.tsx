import { Link } from "@/i18n/navigation";
import { CardVisual } from "@/page-components/how-to-play/shared/card-visual";
import { MahjongStoneVisual } from "@/page-components/how-to-play/shared/mahjong-stone-visual";
import { HomeHeroCta } from "@/page-components/root/home-hero-cta";
import HomeFooter from "@/page-components/root/home-footer";
import { BookOpen, Gamepad2, ListChecks, Plus, Rows3 } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function PublicHome() {
    const t = await getTranslations("home");
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Game Scoreboard Manager",
        applicationCategory: "GameApplication",
        operatingSystem: "Web",
        description: t("hero.description"),
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
        },
        inLanguage: ["en", "nl"],
    };

    return (
        <main className="relative flex flex-1 justify-center overflow-hidden px-4 py-12 md:py-16">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.16),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(14,165,233,0.14),transparent_55%)]" />
            <div className="container flex max-w-5xl flex-col gap-10 md:gap-14">
                <section className="relative overflow-hidden rounded-xl border-2 border-emerald-200/70 bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-6 backdrop-blur-sm md:p-10 dark:border-emerald-500/30 dark:from-emerald-950/30 dark:via-slate-950 dark:to-sky-950/20">
                    <div className="pointer-events-none absolute -top-14 -right-14 h-40 w-40 rounded-full bg-emerald-300/20 blur-3xl dark:bg-emerald-500/20" />
                    <div className="pointer-events-none absolute -bottom-14 -left-12 h-32 w-32 rounded-full bg-sky-300/20 blur-3xl dark:bg-sky-500/20" />
                    <span className="relative inline-flex items-center gap-2 rounded-full border border-emerald-300/70 bg-white/80 px-3 py-1 text-xs font-medium tracking-wide uppercase dark:border-emerald-500/40 dark:bg-slate-950/70">
                        <Gamepad2 size={14} />
                        {t("hero.badge")}
                    </span>
                    <h1 className="relative mt-4 max-w-3xl text-3xl leading-tight font-semibold md:text-5xl md:leading-tight">
                        {t("hero.title")}
                    </h1>
                    <p className="text-muted-foreground relative mt-4 max-w-2xl text-base md:text-lg">
                        {t("hero.description")}
                    </p>
                    <HomeHeroCta
                        goToScoreboards={t("hero.goToScoreboards")}
                        login={t("hero.login")}
                        createAccount={t("hero.createAccount")}
                    />
                    <div className="mt-8 flex items-end justify-center gap-2 md:gap-3">
                        <div className="origin-bottom translate-y-2 -rotate-12">
                            <CardVisual suit="club" value="J" isTrump />
                        </div>
                        <div className="origin-bottom translate-y-1 -rotate-6">
                            <CardVisual suit="diamond" value="A" />
                        </div>
                        <div className="origin-bottom rotate-3">
                            <CardVisual suit="heart" value="10" />
                        </div>
                        <div className="origin-bottom translate-y-1 rotate-9">
                            <CardVisual suit="spade" value="K" />
                        </div>
                        <div className="origin-bottom translate-y-1 rotate-6">
                            <MahjongStoneVisual kind="wind" value="E" tone="amber" />
                        </div>
                        <div className="origin-bottom rotate-12">
                            <MahjongStoneVisual
                                kind="dragon"
                                value="F"
                                tone="emerald"
                            />
                        </div>
                    </div>
                </section>

                <section className="grid gap-4 md:grid-cols-2">
                    <article className="relative overflow-hidden rounded-xl border-2 border-sky-200/70 bg-gradient-to-br from-sky-50 via-white to-indigo-50 p-5 md:p-6 dark:border-sky-500/30 dark:from-sky-950/30 dark:via-slate-950 dark:to-indigo-950/20">
                        <div className="pointer-events-none absolute -top-12 -right-12 h-28 w-28 rounded-full bg-sky-300/20 blur-3xl dark:bg-sky-500/20" />
                        <div className="flex items-start justify-between gap-4">
                            <h2 className="text-xl font-semibold md:text-2xl">
                                {t("availableGames.title")}
                            </h2>
                            <div className="hidden -space-x-2 sm:flex">
                                <div className="origin-bottom -rotate-6">
                                    <CardVisual suit="spade" value="A" small />
                                </div>
                                <div className="origin-bottom rotate-6">
                                    <CardVisual suit="heart" value="Q" small />
                                </div>
                                <div className="origin-bottom translate-y-0.5 rotate-12">
                                    <MahjongStoneVisual
                                        kind="circle"
                                        value="1"
                                        tone="sky"
                                        small
                                    />
                                </div>
                            </div>
                        </div>
                        <p className="text-muted-foreground mt-2 text-sm md:text-base">
                            {t("availableGames.description")}
                        </p>
                        <div className="mt-5 space-y-3">
                            <div className="flex items-center justify-between rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">
                                        {t("availableGames.klaverjas")}
                                    </span>
                                    <Link
                                        href="/how-to-play/klaverjas"
                                        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-xs underline-offset-2 transition-colors hover:underline"
                                    >
                                        <BookOpen size={12} />
                                        {t("availableGames.learnToPlay")}
                                    </Link>
                                </div>
                                <span className="rounded-full bg-emerald-500/20 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                                    {t("availableGames.availableNow")}
                                </span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">
                                        {t("availableGames.boerenbridge")}
                                    </span>
                                    <Link
                                        href="/how-to-play/boerenbridge"
                                        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-xs underline-offset-2 transition-colors hover:underline"
                                    >
                                        <BookOpen size={12} />
                                        {t("availableGames.learnToPlay")}
                                    </Link>
                                </div>
                                <span className="rounded-full bg-emerald-500/20 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                                    {t("availableGames.availableNow")}
                                </span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">
                                        {t("availableGames.mahjong")}
                                    </span>
                                    <Link
                                        href="/how-to-play/mahjong"
                                        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-xs underline-offset-2 transition-colors hover:underline"
                                    >
                                        <BookOpen size={12} />
                                        {t("availableGames.learnToPlay")}
                                    </Link>
                                </div>
                                <span className="rounded-full bg-emerald-500/20 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                                    {t("availableGames.availableNow")}
                                </span>
                            </div>
                        </div>
                    </article>

                    <article className="relative overflow-hidden rounded-xl border-2 border-emerald-200/70 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-5 md:p-6 dark:border-emerald-500/30 dark:from-emerald-950/30 dark:via-slate-950 dark:to-teal-950/20">
                        <div className="pointer-events-none absolute -bottom-12 -left-10 h-28 w-28 rounded-full bg-emerald-300/20 blur-3xl dark:bg-emerald-500/20" />
                        <h2 className="text-xl font-semibold md:text-2xl">
                            {t("howItWorks.title")}
                        </h2>
                        <div className="mt-4 space-y-3">
                            <div className="flex items-start gap-3 rounded-lg border border-emerald-300/70 bg-emerald-100/70 p-3 dark:border-emerald-500/40 dark:bg-emerald-900/25">
                                <Plus className="mt-0.5" size={18} />
                                <p className="text-sm md:text-base">
                                    {t("howItWorks.step1")}
                                </p>
                            </div>
                            <div className="flex items-start gap-3 rounded-lg border border-sky-300/70 bg-sky-100/70 p-3 dark:border-sky-500/40 dark:bg-sky-900/25">
                                <Rows3 className="mt-0.5" size={18} />
                                <p className="text-sm md:text-base">
                                    {t("howItWorks.step2")}
                                </p>
                            </div>
                            <div className="flex items-start gap-3 rounded-lg border border-indigo-300/70 bg-indigo-100/70 p-3 dark:border-indigo-500/40 dark:bg-indigo-900/25">
                                <ListChecks className="mt-0.5" size={18} />
                                <p className="text-sm md:text-base">
                                    {t("howItWorks.step3")}
                                </p>
                            </div>
                        </div>
                    </article>
                </section>

                <HomeFooter />
            </div>
        </main>
    );
}
