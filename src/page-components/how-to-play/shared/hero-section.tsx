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
        <section className="border-border/70 bg-card/80 rounded-xl border p-6 backdrop-blur-sm md:p-10">
            <span className="border-border/70 bg-secondary inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium tracking-wide uppercase">
                <BookOpen size={14} />
                {badge}
            </span>
            <h1 className="mt-4 max-w-3xl text-3xl leading-tight font-semibold md:text-5xl md:leading-tight">
                {title}
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl text-base md:text-lg">
                {subtitle}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button variant="outline" size="lg" asChild>
                    <a href="#app-features">
                        <Zap />
                        {learnMore}
                    </a>
                </Button>
            </div>

            {/* Decorative cards fan */}
            <div className="mt-8 flex items-end justify-center gap-2 md:gap-3">
                {cardsFan}
            </div>
        </section>
    );
}
