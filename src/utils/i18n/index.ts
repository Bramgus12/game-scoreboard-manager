import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import { scoreboardHomePage as scoreboardHomePageEn } from "utils/i18n/languages/en/scoreboardHomePage";
import { header as headerEN } from "utils/i18n/languages/en/header";
import { scoreboardCreatePage as scoreboardCreatePageEn } from "utils/i18n/languages/en/scoreboardCreatePage";
import { scoreboardCurrentPage as scoreboardCurrentPageEn } from "utils/i18n/languages/en/scoreboardCurrentPage";
import { auth as authEn } from "utils/i18n/languages/en/auth";
import { scoreboardHomePage as scoreboardHomePageNl } from "utils/i18n/languages/nl/scoreboardHomePage";
import { header as headerNl } from "utils/i18n/languages/nl/header";
import { scoreboardCreatePage as scoreboardCreatePageNl } from "utils/i18n/languages/nl/scoreboardCreatePage";
import { scoreboardCurrentPage as scoreboardCurrentPageNl } from "utils/i18n/languages/nl/scoreboardCurrentPage";
import { auth as authNl } from "utils/i18n/languages/nl/auth";
import LanguageDetector from "i18next-browser-languagedetector";

// eslint-disable-next-line import/no-named-as-default-member
void i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        defaultNS: "scoreboardHomePage",
        supportedLngs: ["en", "nl"],
        resources: {
            en: {
                scoreboardHomePage: scoreboardHomePageEn,
                header: headerEN,
                scoreboardCreatePage: scoreboardCreatePageEn,
                scoreboardCurrentPage: scoreboardCurrentPageEn,
                auth: authEn,
            },
            nl: {
                scoreboardHomePage: scoreboardHomePageNl,
                header: headerNl,
                scoreboardCreatePage: scoreboardCreatePageNl,
                scoreboardCurrentPage: scoreboardCurrentPageNl,
                auth: authNl,
            },
        },
        debug: true,
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
    });
