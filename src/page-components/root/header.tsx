import { ThemeSwitch } from "@/components/theme-switch";
import { LanguageSwitch } from "@/components/language-switch";
import Logo from "@/page-components/root/logo";
import { HeaderAuth } from "@/page-components/root/header-auth";
import { getTranslations } from "next-intl/server";

export default async function Header() {
    const t = await getTranslations("home.hero");

    return (
        <div className="flex h-16 w-full items-center justify-between px-4">
            <div className="flex flex-row items-center gap-4">
                <Logo />
            </div>
            <div className="flex items-center gap-4">
                <LanguageSwitch />
                <ThemeSwitch />
                <HeaderAuth
                    loginLabel={t("login")}
                    createAccountLabel={t("createAccount")}
                />
            </div>
        </div>
    );
}
