import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";

export function BackNavigation({ label }: { label: string }) {
    return (
        <div>
            <Button variant="ghost" asChild>
                <Link href="/">
                    <ArrowLeft />
                    {label}
                </Link>
            </Button>
        </div>
    );
}
