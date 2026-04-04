import type { Metadata } from "next";
import "./[locale]/globals.css";
import { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import TanstackProvider from "@/components/tanstack-provider";
import { Toaster } from "@/components/ui/sonner";
import PostHogIdentify from "@/components/posthog-identify";

export const metadata: Metadata = {
    title: {
        default: "Game Scoreboard Manager",
        template: "%s | Game Scoreboard Manager",
    },
    description: "Track game scores online with easy scoreboards and live totals.",
    metadataBase: new URL(
        process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
    ),
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        languages: {
            en: "/en",
            nl: "/nl",
        },
    },
};

type Props = Readonly<{
    children: ReactNode;
}>;

export default function RootLayout({ children }: Props) {
    return (
        <ClerkProvider
            publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        >
            <html lang="en" suppressHydrationWarning>
                <body>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <TanstackProvider>
                            <PostHogIdentify />
                            {children}
                            <Toaster />
                        </TanstackProvider>
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
