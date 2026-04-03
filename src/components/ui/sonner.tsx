"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";
import { CSSProperties } from "react";

const Toaster = ({ ...props }: ToasterProps) => {
    const { theme = "system" } = useTheme();

    const resolvedTheme: ToasterProps["theme"] =
        theme === "dark" || theme === "light" || theme === "system"
            ? theme
            : "system";

    const toasterStyle: CSSProperties &
        Record<"--normal-bg" | "--normal-text" | "--normal-border", string> = {
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
    };

    return (
        <Sonner
            theme={resolvedTheme}
            className="toaster group"
            style={toasterStyle}
            {...props}
        />
    );
};

export { Toaster };
