import posthog from "posthog-js";

export type ConsentStatus = "pending" | "granted" | "denied";

export const getConsentStatus = (): ConsentStatus => {
    if (typeof window === "undefined") {
        return "pending";
    }
    return posthog.get_explicit_consent_status();
};
