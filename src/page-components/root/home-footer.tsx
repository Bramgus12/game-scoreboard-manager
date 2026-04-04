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
        <footer className="border-border/70 bg-card/60 mt-4 flex flex-col items-start justify-between gap-3 rounded-xl border px-4 py-3 sm:mt-6 sm:flex-row sm:items-center sm:px-5">
            <Button
                variant="outline"
                size="sm"
                className="border-slate-300 bg-white/80 text-slate-800 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-900/80 dark:text-slate-100 dark:hover:bg-slate-800"
                onClick={handleOpenConsent}
            >
                {t("manageCookies")}
            </Button>
            <a
                href="https://github.com/Bramgus12"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm font-medium underline-offset-4 transition-colors hover:underline"
            >
                <ExternalLink className="size-4" />
                {t("github")}
            </a>
        </footer>
    );
}
