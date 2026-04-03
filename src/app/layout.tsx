import type { Metadata } from "next";
import "./[locale]/globals.css";
import { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import TanstackProvider from "@/components/tanstack-provider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
    title: "Game scoreboard manager",
    description: "Manage and track game scores with ease.",
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
                            {children}
                            <Toaster />
                        </TanstackProvider>
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
