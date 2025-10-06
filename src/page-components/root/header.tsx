import { ThemeSwitch } from "@/components/theme-switch";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { LanguageSwitch } from "@/components/language-switch";
import Logo from "@/page-components/root/logo";

export default function Header() {
    return (
        <div className="flex h-16 w-full items-center justify-between px-4">
            <div className="flex flex-row items-center gap-4">
                <Logo />
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Games</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                    <li className="row-span-3">
                                        <NavigationMenuLink asChild>
                                            <Link
                                                className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                                                href="/"
                                            >
                                                <div className="mt-4 mb-2 text-lg font-medium">
                                                    Game scoreboard manager
                                                </div>
                                                <p className="text-muted-foreground text-sm leading-tight">
                                                    Manage and track game scores with
                                                    ease.
                                                </p>
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                    <ListItem href="/docs" title="Introduction">
                                        Re-usable components built using Radix UI and
                                        Tailwind CSS.
                                    </ListItem>
                                    <ListItem
                                        href="/docs/installation"
                                        title="Installation"
                                    >
                                        How to install dependencies and structure
                                        your app.
                                    </ListItem>
                                    <ListItem
                                        href="/docs/primitives/typography"
                                        title="Typography"
                                    >
                                        Styles for headings, paragraphs, lists...etc
                                    </ListItem>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <div className="flex items-center gap-4">
                <LanguageSwitch />
                <ThemeSwitch />
                <UserButton />
            </div>
        </div>
    );
}

function ListItem({
    title,
    children,
    href,
    ...props
}: ComponentPropsWithoutRef<"li"> & { href: string }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link href={href}>
                    <div className="text-sm leading-none font-medium">{title}</div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    );
}
