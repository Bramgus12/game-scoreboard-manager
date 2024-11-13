import type { Metadata } from "next";
import { ReactNode } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Roboto } from "next/font/google";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/theme";
import { dir } from "i18next";

const languages = ["en", "nl"] as const;

type Language = (typeof languages)[number];

export function generateStaticParams() {
    return languages.map((lng) => ({ lng }));
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
    params: Promise<{ lng: Language }>;
}>) {
    const { lng } = await params;

    return (
        <html lang={lng} dir={dir(lng)}>
            <body className={roboto.variable}>
                <AppRouterCacheProvider>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        {children}
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
