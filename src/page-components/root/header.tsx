import { ThemeSwitch } from "@/components/theme-switch";
import { UserButton } from "@clerk/nextjs";
import { LanguageSwitch } from "@/components/language-switch";
import Logo from "@/page-components/root/logo";

export default function Header() {
    return (
        <div className="flex h-16 w-full items-center justify-between px-4">
            <div className="flex flex-row items-center gap-4">
                <Logo />
            </div>
            <div className="flex items-center gap-4">
                <LanguageSwitch />
                <ThemeSwitch />
                <UserButton />
            </div>
        </div>
    );
}
