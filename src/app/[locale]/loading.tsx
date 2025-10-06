import { Loader2Icon } from "lucide-react";

export default function Loader() {
    return (
        <div className="flex h-[100dvh] w-[100dvw] items-center justify-center">
            <Loader2Icon className="h-[40px] w-[40px] animate-spin" />
        </div>
    );
}
