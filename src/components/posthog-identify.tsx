"use client";

import { useUser } from "@clerk/nextjs";
import posthog from "posthog-js";
import { useEffect, useState } from "react";
import { getConsentStatus, type ConsentStatus } from "@/lib/posthog-consent";

export default function PostHogIdentify() {
    const { user, isLoaded } = useUser();
    const [consentStatus, setConsentStatus] = useState<ConsentStatus>(() =>
        getConsentStatus(),
    );

    useEffect(() => {
        const handleConsentChanged = () => {
            setConsentStatus(getConsentStatus());
        };

        handleConsentChanged();
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
