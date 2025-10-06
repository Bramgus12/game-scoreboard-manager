import Image from "next/image";
import { Link } from "@/i18n/navigation";

export default function Logo() {
    return (
        <Link href="/">
            <div className="relative">
                {/* Small logos for mobile */}
                <div className="block sm:hidden">
                    <Image
                        priority
                        src="/light-mode-icon.svg"
                        width={32}
                        height={32}
                        alt="Logo"
                        className="block dark:hidden"
                    />
                    <Image
                        priority
                        src="/dark-mode-icon.svg"
                        width={32}
                        height={32}
                        alt="Logo"
                        className="hidden dark:block"
                    />
                </div>

                {/* Big logos for desktop */}
                <div className="hidden sm:block">
                    <Image
                        priority
                        src="/light-mode-big.svg"
                        width={297}
                        height={37}
                        alt="Logo"
                        className="block dark:hidden"
                    />
                    <Image
                        priority
                        src="/dark-mode-big.svg"
                        width={297}
                        height={37}
                        alt="Logo"
                        className="hidden dark:block"
                    />
                </div>
            </div>
        </Link>
    );
}
