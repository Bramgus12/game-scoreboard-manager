import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { Language } from "@/i18n/interfaces";

export default getRequestConfig(async ({ requestLocale }) => {
    // This typically corresponds to the `[locale]` segment
    let locale = await requestLocale;

    // Ensure that a valid locale is used
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (locale == null || !routing.locales.includes(locale as Language)) {
        locale = routing.defaultLocale;
    }

    return {
        locale,
        messages: (await import(`../../messages/${locale}.json`)).default,
    };
});
