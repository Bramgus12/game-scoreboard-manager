import posthog from "posthog-js";

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!, {
    api_host: "/p",
    ui_host: "https://eu.posthog.com",
    defaults: "2026-01-30",
    cookieless_mode: "on_reject",
    opt_out_capturing_by_default: false,
    capture_exceptions: true,
    debug: process.env.NODE_ENV === "development",
    loaded: () => {
        window.dispatchEvent(new Event("posthog-consent-updated"));
    },
});
