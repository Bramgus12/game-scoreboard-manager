import { ThemeSwitch } from "@/components/theme-switch";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { LanguageSwitch } from "@/components/language-switch";
import Logo from "@/page-components/root/logo";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function Header() {
    const t = await getTranslations("home.hero");
    const { userId } = await auth();

    return (
        <div className="flex h-16 w-full items-center justify-between px-4">
            <div className="flex flex-row items-center gap-4">
                <Logo />
            </div>
            <div className="flex items-center gap-4">
                <LanguageSwitch />
                <ThemeSwitch />
                {userId ? (
                    <UserButton />
                ) : (
                    <>
                        <Button asChild variant="outline" size="sm">
                            <Link href="/sign-in">{t("login")}</Link>
                        </Button>
                        <Button asChild size="sm">
                            <Link href="/sign-up">{t("createAccount")}</Link>
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}
