import { Button } from "@/components/ui/button";
import { BookOpen, Zap } from "lucide-react";
import type { ReactNode } from "react";

export function HeroSection({
    badge,
    title,
    subtitle,
    learnMore,
    cardsFan,
}: {
    badge: string;
    title: string;
    subtitle: string;
    learnMore: string;
    cardsFan: ReactNode;
}) {
    return (
        <section className="relative overflow-hidden rounded-xl border-2 border-emerald-200/70 bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-6 backdrop-blur-sm dark:border-emerald-500/30 dark:from-emerald-950/30 dark:via-slate-950 dark:to-sky-950/20 md:p-10">
            <div className="pointer-events-none absolute -top-14 -right-14 h-40 w-40 rounded-full bg-emerald-300/20 blur-3xl dark:bg-emerald-500/20" />
            <div className="pointer-events-none absolute -bottom-14 -left-12 h-32 w-32 rounded-full bg-sky-300/20 blur-3xl dark:bg-sky-500/20" />
            <span className="relative inline-flex items-center gap-2 rounded-full border border-emerald-300/70 bg-white/80 px-3 py-1 text-xs font-medium tracking-wide uppercase dark:border-emerald-500/40 dark:bg-slate-950/70">
                <BookOpen size={14} />
                {badge}
            </span>
            <h1 className="relative mt-4 max-w-3xl text-3xl leading-tight font-semibold md:text-5xl md:leading-tight">
                {title}
            </h1>
            <p className="text-muted-foreground relative mt-4 max-w-2xl text-base md:text-lg">
                {subtitle}
            </p>
            <div className="relative mt-6 flex flex-col gap-3 sm:flex-row">
                <Button
                    variant="outline"
                    size="lg"
                    className="border-emerald-300/70 bg-white/80 hover:bg-emerald-100/60 dark:border-emerald-500/40 dark:bg-slate-950/70 dark:hover:bg-emerald-900/30"
                    asChild
                >
                    <a href="#app-features">
                        <Zap />
                        {learnMore}
                    </a>
                </Button>
            </div>

            {/* Decorative cards fan */}
            <div className="relative mt-8 flex items-end justify-center gap-2 md:gap-3">
                {cardsFan}
            </div>
        </section>
    );
}
