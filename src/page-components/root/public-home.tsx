import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { auth } from "@clerk/nextjs/server";
import {
    ArrowRight,
    ChartColumnBig,
    Gamepad2,
    ListChecks,
    Plus,
    Rows3,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function PublicHome() {
    const t = await getTranslations("home");
    const { userId } = await auth();
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
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(120,119,198,0.14),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(16,185,129,0.12),transparent_50%)]" />
            <div className="container flex max-w-5xl flex-col gap-10 md:gap-14">
                <section className="border-border/70 bg-card/80 rounded-xl border p-6 backdrop-blur-sm md:p-10">
                    <span className="border-border/70 bg-secondary inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium tracking-wide uppercase">
                        <Gamepad2 size={14} />
                        {t("hero.badge")}
                    </span>
                    <h1 className="mt-4 max-w-3xl text-3xl leading-tight font-semibold md:text-5xl md:leading-tight">
                        {t("hero.title")}
                    </h1>
                    <p className="text-muted-foreground mt-4 max-w-2xl text-base md:text-lg">
                        {t("hero.description")}
                    </p>
                    {userId ? (
                        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                            <Button asChild size="lg">
                                <Link href="/scoreboards">
                                    <ChartColumnBig />
                                    {t("hero.goToScoreboards")}
                                </Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                            <Button asChild size="lg">
                                <Link href="/sign-in">
                                    <ArrowRight />
                                    {t("hero.login")}
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg">
                                <Link href="/sign-up">
                                    {t("hero.createAccount")}
                                </Link>
                            </Button>
                        </div>
                    )}
                </section>

                <section className="grid gap-4 md:grid-cols-2">
                    <article className="border-border/70 bg-card/70 rounded-xl border p-5 md:p-6">
                        <h2 className="text-xl font-semibold md:text-2xl">
                            {t("availableGames.title")}
                        </h2>
                        <p className="text-muted-foreground mt-2 text-sm md:text-base">
                            {t("availableGames.description")}
                        </p>
                        <div className="mt-5 space-y-3">
                            <div className="flex items-center justify-between rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3">
                                <span className="font-medium">
                                    {t("availableGames.klaverjas")}
                                </span>
                                <span className="rounded-full bg-emerald-500/20 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                                    {t("availableGames.availableNow")}
                                </span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3">
                                <span className="font-medium">
                                    {t("availableGames.boerenbridge")}
                                </span>
                                <span className="rounded-full bg-amber-500/20 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:text-amber-300">
                                    {t("availableGames.comingSoon")}
                                </span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3">
                                <span className="font-medium">
                                    {t("availableGames.mahjong")}
                                </span>
                                <span className="rounded-full bg-amber-500/20 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:text-amber-300">
                                    {t("availableGames.comingSoon")}
                                </span>
                            </div>
                        </div>
                    </article>

                    <article className="border-border/70 bg-card/70 rounded-xl border p-5 md:p-6">
                        <h2 className="text-xl font-semibold md:text-2xl">
                            {t("howItWorks.title")}
                        </h2>
                        <div className="mt-4 space-y-3">
                            <div className="border-border/70 bg-background/70 flex items-start gap-3 rounded-lg border p-3">
                                <Plus className="mt-0.5" size={18} />
                                <p className="text-sm md:text-base">
                                    {t("howItWorks.step1")}
                                </p>
                            </div>
                            <div className="border-border/70 bg-background/70 flex items-start gap-3 rounded-lg border p-3">
                                <Rows3 className="mt-0.5" size={18} />
                                <p className="text-sm md:text-base">
                                    {t("howItWorks.step2")}
                                </p>
                            </div>
                            <div className="border-border/70 bg-background/70 flex items-start gap-3 rounded-lg border p-3">
                                <ListChecks className="mt-0.5" size={18} />
                                <p className="text-sm md:text-base">
                                    {t("howItWorks.step3")}
                                </p>
                            </div>
                        </div>
                    </article>
                </section>
            </div>
        </main>
    );
}
