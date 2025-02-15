import type { Metadata } from "next";
import { ReactNode } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Roboto } from "next/font/google";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/theme";
import NextTopLoader from "nextjs-toploader";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getMessages, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { enUS, nlNL } from "@clerk/localizations";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

const roboto = Roboto({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
    display: "swap",
    variable: "--font-roboto",
});

export const metadata: Metadata = {
    title: "Game scoreboard manager",
    description:
        "App to manage scoreboards for a list of games. Keep track of scores.",
};

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    const locale = (await params).locale;

    // Ensure that the incoming `locale` is valid
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (!routing.locales.includes(locale as never)) {
        notFound();
    }

    setRequestLocale(locale);

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    function getClerkLocale() {
        switch (locale) {
            case "en":
                return enUS;
            case "nl":
                return nlNL;
            default:
                return enUS;
        }
    }

    return (
        <html lang={locale}>
            <body className={roboto.variable}>
                <ClerkProvider
                    localization={getClerkLocale()}
                    appearance={{ baseTheme: dark }}
                >
                    <NextIntlClientProvider messages={messages}>
                        <AppRouterCacheProvider>
                            <ThemeProvider theme={theme}>
                                <CssBaseline />
                                <NextTopLoader color="#00ff00" showSpinner={false} />
                                {children}
                            </ThemeProvider>
                        </AppRouterCacheProvider>
                    </NextIntlClientProvider>
                </ClerkProvider>
            </body>
        </html>
    );
}
