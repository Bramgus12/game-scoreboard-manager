"use client";

import { Button } from "@/components/ui/button";
import { useLocale } from "use-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LanguageSwitch() {
    const locale = useLocale();
    const router = useRouter();
    const pathName = usePathname();

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={() => {
                router.push(pathName, { locale: locale === "nl" ? "en" : "nl" });
            }}
        >
            {locale === "nl" ? "🇬🇧" : "🇳🇱"}
        </Button>
    );
}
