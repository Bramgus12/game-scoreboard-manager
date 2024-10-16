import "i18next";
import { scoreboardHomePage } from "utils/i18n/languages/en/scoreboardHomePage";
import { header } from "utils/i18n/languages/en/header";
import { scoreboardCreatePage } from "utils/i18n/languages/en/scoreboardCreatePage";
import { scoreboardCurrentPage } from "utils/i18n/languages/en/scoreboardCurrentPage";
import { auth } from "utils/i18n/languages/en/auth";

declare module "i18next" {
    interface CustomTypeOptions {
        defaultNS: "scoreboardHomePage";
        resources: {
            scoreboardHomePage: typeof scoreboardHomePage;
            header: typeof header;
            scoreboardCreatePage: typeof scoreboardCreatePage;
            scoreboardCurrentPage: typeof scoreboardCurrentPage;
            auth: typeof auth;
        };
    }
}
