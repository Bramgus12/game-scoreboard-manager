import { ReactNode } from "react";
import Header from "@/page-components/root/header";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import CookieConsentBanner from "@/components/cookie-consent-banner";

type Props = {
    children: ReactNode;
    params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);

    return (
        <NextIntlClientProvider>
            <div className="bg-background text-foreground flex min-h-screen flex-col antialiased">
                <Header />
                {children}
                <CookieConsentBanner />
            </div>
        </NextIntlClientProvider>
    );
}
