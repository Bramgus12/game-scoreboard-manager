"use server";

import resourcesToBackend from "i18next-resources-to-backend";
import { UseTranslationOptions } from "react-i18next";
import { createInstance, KeyPrefix } from "i18next";
import { getOptions, Language, Namespace } from "@/app/i18n/settings";

const initI18next = async (lng: Language, ns: Namespace) => {
    const i18nInstance = createInstance();
    await i18nInstance
        .use(
            resourcesToBackend(
                (language: Language, namespace: Namespace) =>
                    import(`./locales/${language}/${namespace}.json`),
            ),
        )
        .init(getOptions(lng, ns));
    return i18nInstance;
};

export async function translation(
    lng: Language,
    ns: Namespace,
    options: UseTranslationOptions<KeyPrefix<Namespace>> = {},
) {
    const i18nextInstance = await initI18next(lng, ns);
    return {
        t: i18nextInstance.getFixedT(lng, ns, options.keyPrefix),
        i18n: i18nextInstance,
    };
}
