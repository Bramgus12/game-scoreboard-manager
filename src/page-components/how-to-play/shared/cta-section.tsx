import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { ArrowRight, ChartColumnBig, Trophy } from "lucide-react";

export function CtaSection({
    title,
    description,
    goToGames,
    loginButton,
    signUpButton,
    userId,
}: {
    title: string;
    description: string;
    goToGames: string;
    loginButton: string;
    signUpButton: string;
    userId: string | null;
}) {
    return (
        <section className="border-border/70 bg-card/80 rounded-xl border p-6 text-center backdrop-blur-sm md:p-10">
            <Trophy className="text-primary mx-auto h-10 w-10" />
            <h2 className="mt-4 text-xl font-semibold md:text-2xl">{title}</h2>
            <p className="text-muted-foreground mx-auto mt-2 max-w-md text-sm md:text-base">
                {description}
            </p>
            {userId ? (
                <div className="mt-6 flex justify-center">
                    <Button asChild size="lg">
                        <Link href="/scoreboards">
                            <ChartColumnBig />
                            {goToGames}
                        </Link>
                    </Button>
                </div>
            ) : (
                <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
