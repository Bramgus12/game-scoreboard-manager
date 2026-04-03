"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export function HeaderAuth({
    loginLabel,
    createAccountLabel,
}: {
    loginLabel: string;
    createAccountLabel: string;
}) {
    const { userId } = useAuth();

    if (userId) {
        return <UserButton />;
    }

    return (
        <>
            <Button asChild variant="outline" size="sm">
                <Link href="/sign-in">{loginLabel}</Link>
            </Button>
            <Button asChild size="sm">
                <Link href="/sign-up">{createAccountLabel}</Link>
            </Button>
        </>
    );
}
