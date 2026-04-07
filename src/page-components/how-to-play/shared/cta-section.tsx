"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useAuth } from "@clerk/nextjs";
import { ArrowRight, ChartColumnBig, Trophy } from "lucide-react";

export function CtaSection({
    title,
    description,
    goToGames,
    loginButton,
    signUpButton,
}: {
    title: string;
    description: string;
    goToGames: string;
    loginButton: string;
    signUpButton: string;
}) {
    const { userId } = useAuth();

    return (
        <section className="relative overflow-hidden rounded-xl border-2 border-emerald-200/70 bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-6 text-center backdrop-blur-sm dark:border-emerald-500/30 dark:from-emerald-950/30 dark:via-slate-950 dark:to-sky-950/20 md:p-10">
            <div className="pointer-events-none absolute -top-14 -right-12 h-36 w-36 rounded-full bg-emerald-300/20 blur-3xl dark:bg-emerald-500/20" />
            <Trophy className="text-primary relative mx-auto h-10 w-10" />
            <h2 className="relative mt-4 text-xl font-semibold md:text-2xl">
                {title}
            </h2>
            <p className="text-muted-foreground relative mx-auto mt-2 max-w-md text-sm md:text-base">
                {description}
            </p>
            {userId ? (
                <div className="relative mt-6 flex justify-center">
                    <Button asChild size="lg">
                        <Link href="/scoreboards">
                            <ChartColumnBig />
                            {goToGames}
                        </Link>
                    </Button>
                </div>
            ) : (
                <div className="relative mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Button asChild size="lg">
                        <Link href="/sign-in">
                            <ArrowRight />
                            {loginButton}
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                        <Link href="/sign-up">{signUpButton}</Link>
                    </Button>
                </div>
            )}
        </section>
    );
}
