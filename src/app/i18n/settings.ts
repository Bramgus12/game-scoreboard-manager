export const fallbackLng = "nl";
export const languages = [fallbackLng, "en"] as const;
export const cookieName = "i18next";
export const defaultNS = "scoreboardHomePage";
export const namespaces = [
    defaultNS,
    "auth",
    "header",
    "scoreboardCreatePage",
    "scoreboardCurrentPage",
    "accountSettings",
] as const;

export type Language = (typeof languages)[number];
export type Namespace = (typeof namespaces)[number];

export function getOptions(lng = fallbackLng, ns = defaultNS) {
    return {
        supportedLngs: languages,
        fallbackLng,
        lng,
        namespaces,
        fallbackNS: defaultNS,
        defaultNS,
        ns,
    };
}
