"use client";

import { useUser } from "@clerk/nextjs";
import posthog from "posthog-js";
import { useEffect, useState } from "react";

type ConsentStatus = "pending" | "granted" | "denied";

export default function PostHogIdentify() {
    const { user, isLoaded } = useUser();
    const [consentStatus, setConsentStatus] = useState<ConsentStatus>(() =>
        typeof window === "undefined"
            ? "pending"
            : posthog.get_explicit_consent_status(),
    );

    useEffect(() => {
        const handleConsentChanged = () => {
            setConsentStatus(posthog.get_explicit_consent_status());
        };

        window.addEventListener("posthog-consent-updated", handleConsentChanged);

        return () => {
            window.removeEventListener(
                "posthog-consent-updated",
                handleConsentChanged,
            );
        };
    }, []);

    useEffect(() => {
        if (!isLoaded) return;
        if (consentStatus !== "granted") {
            return;
        }

        if (user) {
            posthog.identify(user.id, {
                email: user.primaryEmailAddress?.emailAddress,
                name: user.fullName,
            });
        } else {
            posthog.reset();
        }
    }, [consentStatus, user, isLoaded]);

    return null;
}
