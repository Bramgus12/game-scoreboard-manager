"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";

export default function HomeFooter() {
    const t = useTranslations("home.footer");

    const handleOpenConsent = () => {
        window.dispatchEvent(new Event("posthog-open-consent-banner"));
    };

    return (
        <footer className="relative mt-4 flex flex-col items-start justify-between gap-3 overflow-hidden rounded-xl border-2 border-sky-200/70 bg-gradient-to-br from-sky-50 via-white to-emerald-50 px-4 py-3 dark:border-sky-500/30 dark:from-sky-950/30 dark:via-slate-950 dark:to-emerald-950/20 sm:mt-6 sm:flex-row sm:items-center sm:px-5">
            <div className="pointer-events-none absolute -top-10 -right-10 h-24 w-24 rounded-full bg-sky-300/20 blur-3xl dark:bg-sky-500/20" />
            <Button
                variant="outline"
                size="sm"
                className="relative border-emerald-300/70 bg-white/80 text-slate-800 hover:bg-emerald-100/60 dark:border-emerald-500/40 dark:bg-slate-950/70 dark:text-slate-100 dark:hover:bg-emerald-900/30"
                onClick={handleOpenConsent}
            >
                {t("manageCookies")}
            </Button>
            <a
                href="https://github.com/Bramgus12"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground relative inline-flex items-center gap-2 text-sm font-medium underline-offset-4 transition-colors hover:underline"
            >
                <ExternalLink className="size-4" />
                {t("github")}
            </a>
        </footer>
    );
}
