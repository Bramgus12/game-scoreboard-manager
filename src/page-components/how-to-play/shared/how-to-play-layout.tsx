import type { ReactNode } from "react";

export function HowToPlayLayout({ children }: { children: ReactNode }) {
    return (
        <main className="relative flex flex-1 justify-center overflow-hidden px-4 py-12 md:py-16">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.16),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(14,165,233,0.14),transparent_55%)]" />
            <div className="container flex max-w-4xl flex-col gap-8 md:gap-12">
                {children}
            </div>
        </main>
    );
}
