import { type NextRequest, NextResponse } from "next/server";
import { cookieName, fallbackLng, languages } from "@/app/i18n/settings";
import acceptLanguage from "accept-language";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
    console.log(request, "middleware");

    // Skip processing if the request is for favicon.ico
    if (request.nextUrl.pathname === "/favicon.ico") {
        return NextResponse.next();
    }

    // Language detection logic
    let lng;
    if (request.cookies.has(cookieName)) {
        lng = acceptLanguage.get(request.cookies.get(cookieName)?.value);
    }
    if (lng == null) {
        lng = acceptLanguage.get(request.headers.get("Accept-Language"));
    }
    if (lng == null) {
        lng = fallbackLng;
    }

    // Redirect if lng in path is not supported
    if (
        !languages.some((loc) => request.nextUrl.pathname.startsWith(`/${loc}`)) &&
        !request.nextUrl.pathname.startsWith("/_next")
    ) {
        return NextResponse.redirect(
            new URL(`/${lng}${request.nextUrl.pathname}`, request.url),
        );
    }

    if (request.headers.has("referer")) {
        const refererUrl = new URL(request.headers.get("referer") ?? "");
        const lngInReferer = languages.find((l) =>
            refererUrl.pathname.startsWith(`/${l}`),
        );
        const response = NextResponse.next();
        if (lngInReferer) {
            response.cookies.set(cookieName, lngInReferer);
        }
        return response;
    }

    // Supabase authentication logic
    let supabaseResponse = NextResponse.next({
        request,
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll: () => {
                    return request.cookies.getAll();
                },
                setAll: (cookiesToSet) => {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value),
                    );
                    supabaseResponse = NextResponse.next({
                        request,
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                        supabaseResponse.cookies.set(name, value, options),
                    );
                },
            },
        },
    );

    // IMPORTANT: Avoid logic between createServerClient and supabase.auth.getUser()
    const {
        data: { user },
    } = await supabase.auth.getUser();

    console.log("user", user);

    if (!user && !request.nextUrl.pathname.startsWith(`/${lng}/login`)) {
        const url = request.nextUrl.clone();
        url.pathname = `/${lng}/login`;

        console.log("url", url);

        return NextResponse.redirect(url);
    }

    if (user && request.nextUrl.pathname.startsWith(`/${lng}/login`)) {
        const url = request.nextUrl.clone();
        url.pathname = `/${lng}`;
        return NextResponse.redirect(url);
    }

    // Merge supabaseResponse cookies with language cookies
    const finalResponse = supabaseResponse;
    supabaseResponse.cookies.getAll().forEach(({ name, value }) => {
        finalResponse.cookies.set(name, value);
    });

    return finalResponse;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
