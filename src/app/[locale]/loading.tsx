import { Loader2Icon } from "lucide-react";

export default function Loader() {
    return (
        <div className="flex flex-1 items-center justify-center">
            <Loader2Icon className="h-[40px] w-[40px] animate-spin" />
        </div>
    );
}
