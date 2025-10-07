import { CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
    const t = await getTranslations("scoreboard");

    return (
        <div className="flex flex-1 flex-col items-center justify-center gap-6">
            <CircleX size={36} />
            <h1 className="text-xl">{t("gameNotFound")}</h1>
            <Button asChild>
                <Link href="/">{t("backToGames")}</Link>
            </Button>
        </div>
    );
}
