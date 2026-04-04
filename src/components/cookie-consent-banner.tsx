"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import posthog from "posthog-js";
import { Cookie, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

type ConsentStatus = "pending" | "granted" | "denied";

export default function CookieConsentBanner() {
    const [consentStatus, setConsentStatus] = useState<ConsentStatus>(() =>
        typeof window === "undefined"
            ? "pending"
            : posthog.get_explicit_consent_status(),
    );
    const t = useTranslations("cookieBanner");

    const handleAccept = () => {
        posthog.opt_in_capturing();
        setConsentStatus("granted");
        window.dispatchEvent(new Event("posthog-consent-updated"));
    };

    const handleReject = () => {
        posthog.opt_out_capturing();
        setConsentStatus("denied");
        window.dispatchEvent(new Event("posthog-consent-updated"));
    };

    if (consentStatus !== "pending") {
        return null;
    }

    return (
        <div className="pointer-events-none fixed right-0 bottom-0 left-0 z-50 px-4 pb-4 sm:px-6 sm:pb-6">
            <div className="pointer-events-auto mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-sky-200/80 bg-gradient-to-r from-sky-50 via-cyan-50 to-teal-50 shadow-2xl shadow-sky-950/15 dark:border-slate-700 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 dark:shadow-black/40">
                <div className="relative px-5 py-5 sm:px-6 sm:py-6">
                    <div className="pointer-events-none absolute -top-20 -right-10 h-44 w-44 rounded-full bg-sky-300/30 blur-2xl dark:bg-sky-500/15" />
                    <div className="pointer-events-none absolute -bottom-20 -left-10 h-44 w-44 rounded-full bg-teal-300/25 blur-2xl dark:bg-cyan-500/10" />

                    <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div className="space-y-2">
                            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/90 bg-white/75 px-3 py-1 text-xs font-semibold tracking-wide text-sky-800 uppercase dark:border-slate-600 dark:bg-slate-900/70 dark:text-sky-200">
                                <Cookie className="size-3.5" />
                                {t("badge")}
                            </div>
                            <h2 className="flex items-center gap-2 text-base font-semibold text-slate-900 sm:text-lg dark:text-slate-100">
                                <ShieldCheck className="size-4 text-teal-700 dark:text-teal-300" />
                                {t("title")}
                            </h2>
                            <p className="max-w-xl text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                                {t("description")}
                            </p>
                        </div>

                        <div className="flex flex-col gap-2 sm:min-w-56 sm:flex-row sm:justify-end">
                            <Button
                                variant="outline"
                                className="border-slate-300 bg-white/80 text-slate-800 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-900/80 dark:text-slate-100 dark:hover:bg-slate-800"
                                onClick={handleReject}
                            >
                                {t("reject")}
                            </Button>
                            <Button
                                className="bg-teal-700 text-white hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-500"
                                onClick={handleAccept}
                            >
                                {t("accept")}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
