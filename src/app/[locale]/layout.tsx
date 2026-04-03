import { ReactNode } from "react";
import Header from "@/page-components/root/header";
import { NextIntlClientProvider } from "next-intl";

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <NextIntlClientProvider>
            <div className="bg-background text-foreground flex min-h-screen flex-col antialiased">
                <Header />
                {children}
            </div>
        </NextIntlClientProvider>
    );
}
