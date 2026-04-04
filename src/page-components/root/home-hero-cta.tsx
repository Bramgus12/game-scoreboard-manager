"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useAuth } from "@clerk/nextjs";
import { ArrowRight, ChartColumnBig } from "lucide-react";

export function HomeHeroCta({
    goToScoreboards,
    login,
    createAccount,
}: {
    goToScoreboards: string;
    login: string;
    createAccount: string;
}) {
    const { userId } = useAuth();

    if (userId) {
        return (
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                    <Link href="/scoreboards">
                        <ChartColumnBig />
                        {goToScoreboards}
                    </Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
                <Link href="/sign-in">
                    <ArrowRight />
                    {login}
                </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
                <Link href="/sign-up">{createAccount}</Link>
            </Button>
        </div>
    );
}
