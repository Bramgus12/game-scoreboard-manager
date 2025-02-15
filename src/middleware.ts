import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { clerkMiddleware } from "@clerk/nextjs/server";

const intlMiddleware = createMiddleware(routing);

export default clerkMiddleware(async (middlewareAuth, req) => {
    await middlewareAuth.protect();

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
