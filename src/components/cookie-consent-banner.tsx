"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import posthog from "posthog-js";
import { Cookie, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getConsentStatus, type ConsentStatus } from "@/lib/posthog-consent";

export default function CookieConsentBanner() {
    const [consentStatus, setConsentStatus] = useState<ConsentStatus>(() =>
        getConsentStatus(),
    );
    const [isRendered, setIsRendered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const openRafRef = useRef<number | null>(null);
    const t = useTranslations("cookieBanner");

    const openBanner = () => {
        if (openRafRef.current) {
            window.cancelAnimationFrame(openRafRef.current);
            openRafRef.current = null;
        }
        setIsVisible(false);
        setIsRendered(true);
        openRafRef.current = window.requestAnimationFrame(() => {
            setIsVisible(true);
            openRafRef.current = null;
        });
    };

    const closeBanner = () => {
        setIsVisible(false);
    };

    useEffect(() => {
        const syncConsentStatus = () => {
            const nextConsentStatus = getConsentStatus();
            setConsentStatus(nextConsentStatus);
            if (nextConsentStatus !== "pending") {
                closeBanner();
            }
        };

        const handleOpenBanner = () => {
            openBanner();
        };

        window.addEventListener("posthog-consent-updated", syncConsentStatus);
        window.addEventListener("posthog-open-consent-banner", handleOpenBanner);

        return () => {
            window.removeEventListener("posthog-consent-updated", syncConsentStatus);
            window.removeEventListener(
                "posthog-open-consent-banner",
                handleOpenBanner,
            );
            if (openRafRef.current) {
                window.cancelAnimationFrame(openRafRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (consentStatus === "pending") {
            openRafRef.current = window.requestAnimationFrame(() => {
                openBanner();
                openRafRef.current = null;
            });
        }

        return () => {
            if (openRafRef.current) {
                window.cancelAnimationFrame(openRafRef.current);
            }
        };
    }, [consentStatus]);

    const handleAccept = () => {
        posthog.opt_in_capturing();
        window.dispatchEvent(new Event("posthog-consent-updated"));
        closeBanner();
    };

    const handleReject = () => {
        posthog.opt_out_capturing();
        window.dispatchEvent(new Event("posthog-consent-updated"));
        closeBanner();
    };

    const handleTransitionEnd = () => {
        if (!isVisible) {
            setIsRendered(false);
        }
    };

    if (!isRendered) {
        return null;
    }

    return (
        <div
            className={`pointer-events-none fixed right-0 bottom-0 left-0 z-50 px-4 pb-4 transition-all duration-300 sm:px-6 sm:pb-6 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
            onTransitionEnd={handleTransitionEnd}
        >
            <div className="pointer-events-auto mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-sky-200/80 bg-gradient-to-r from-sky-50 via-cyan-50 to-teal-50 shadow-2xl shadow-sky-950/15 dark:border-slate-700 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 dark:shadow-black/40">
                <div className="relative px-5 py-5 sm:px-6 sm:py-6">
                    <div className="pointer-events-none absolute -top-20 -right-10 h-44 w-44 rounded-full bg-sky-300/30 blur-2xl dark:bg-sky-500/15" />
                    <div className="pointer-events-none absolute -bottom-20 -left-10 h-44 w-44 rounded-full bg-teal-300/25 blur-2xl dark:bg-cyan-500/10" />

                    <div className="relative flex flex-col gap-4">
                        <div className="min-w-0 space-y-2">
                            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/90 bg-white/75 px-3 py-1 text-xs font-semibold tracking-wide text-sky-800 uppercase dark:border-slate-600 dark:bg-slate-900/70 dark:text-sky-200">
                                <Cookie className="size-3.5" />
                                {t("badge")}
                            </div>
                            <h2 className="flex items-center gap-2 text-base font-semibold break-words text-slate-900 sm:text-lg dark:text-slate-100">
                                <ShieldCheck className="size-4 text-teal-700 dark:text-teal-300" />
                                {t("title")}
                            </h2>
                            <p className="max-w-2xl text-sm leading-relaxed break-words text-slate-700 dark:text-slate-300">
                                {t("description")}
                            </p>
                        </div>

                        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                            <Button
                                variant="outline"
                                className="w-full border-slate-300 bg-white/80 text-slate-800 hover:bg-slate-100 sm:w-auto dark:border-slate-600 dark:bg-slate-900/80 dark:text-slate-100 dark:hover:bg-slate-800"
                                onClick={handleReject}
                            >
                                {t("reject")}
                            </Button>
                            <Button
                                className="w-full bg-teal-700 text-white hover:bg-teal-600 sm:w-auto dark:bg-teal-600 dark:hover:bg-teal-500"
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
