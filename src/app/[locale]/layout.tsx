import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/page-components/root/header";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import TanstackProvider from "@/components/tanstack-provider";

export const metadata: Metadata = {
    title: "Game scoreboard manager",
    description: "Manage and track game scores with ease.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <ClerkProvider
            publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        >
            <html lang="en" suppressHydrationWarning>
                <body>
                    <NextIntlClientProvider>
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="system"
                            enableSystem
                            disableTransitionOnChange
                        >
                            <TanstackProvider>
                                <div className="bg-background text-foreground flex min-h-screen flex-col antialiased">
                                    <Header />
                                    {children}
                                </div>
                                <Toaster />
                            </TanstackProvider>
                        </ThemeProvider>
                    </NextIntlClientProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
