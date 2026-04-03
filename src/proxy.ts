import { clerkMiddleware } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default clerkMiddleware(async (auth, req) => {
    const pathname = req.nextUrl.pathname;

    const isPublicRoute =
        pathname === "/" ||
        /^\/(en|nl)$/.test(pathname) ||
        /^\/(en|nl)\/sign-in(\/.*)?$/.test(pathname) ||
        /^\/(en|nl)\/sign-up(\/.*)?$/.test(pathname) ||
        pathname === "/sign-in" ||
        pathname === "/sign-up" ||
        pathname.startsWith("/api");

    if (!isPublicRoute) {
        await auth.protect();
    }

    if (pathname.startsWith("/api")) {
        return NextResponse.next();
    }

    return intlMiddleware(req);
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
};
